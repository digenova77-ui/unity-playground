import * as THREE from 'three'

/** Slow charge, fast commit, soft arrival. Monotone on [0, 1]. */
export function warpEase(t: number): number {
  const x = Math.min(1, Math.max(0, t))
  if (x < 0.16) return (x / 0.16) ** 2 * 0.04
  if (x > 0.84) {
    const u = (x - 0.84) / 0.16
    return 0.9 + (1 - (1 - u) ** 3) * 0.1
  }
  const u = (x - 0.16) / 0.68
  return 0.04 + (1 - (1 - u) ** 3) * 0.86
}

/** Streak brightness. Rises, holds, then clears so the body is what you arrive on. */
export function warpIntensity(t: number): number {
  const x = Math.min(1, Math.max(0, t))
  if (x < 0.18) return x / 0.18
  if (x > 0.78) return Math.max(0, (1 - x) / 0.22)
  return 1
}

interface Streak { angle: number; radius: number; z: number; speed: number; stretch: number }

const TINT = [
  [0.85, 0.98, 1],
  [0.37, 0.92, 0.83],
  [1, 0.82, 0.4],
  [1, 1, 1],
]

/**
 * Streaks in front of the camera, rushing along the travel direction.
 * A picture of the jump. Not a claim about light speed.
 */
export class WarpTunnel {
  readonly root = new THREE.Group()
  private readonly streaks: Streak[]
  private readonly geo: THREE.BufferGeometry
  private readonly mat: THREE.MeshBasicMaterial
  private readonly glow: THREE.Sprite
  private readonly dir = new THREE.Vector3(0, 0, -1)
  private readonly ahead = new THREE.Vector3()
  private readonly yUp = new THREE.Vector3(0, 1, 0)
  private readonly altUp = new THREE.Vector3(1, 0, 0)

  constructor(count = 420) {
    this.root.name = 'warp-tunnel'
    this.root.visible = false
    this.streaks = Array.from({ length: count }, () => this.seed(true))
    const positions = new Float32Array(count * 6 * 3)
    const colors = new Float32Array(count * 6 * 3)
    for (let i = 0; i < count; i++) {
      const tint = TINT[i % TINT.length]
      for (let v = 0; v < 6; v++) {
        const tail = v === 2 || v === 4 || v === 5
        const fade = tail ? 0.05 : 1
        const o = (i * 6 + v) * 3
        colors[o] = tint[0] * fade
        colors[o + 1] = tint[1] * fade
        colors[o + 2] = tint[2] * fade
      }
    }
    this.geo = new THREE.BufferGeometry()
    this.geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    this.geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    this.mat = new THREE.MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
      side: THREE.DoubleSide,
    })
    const lanes = new THREE.Mesh(this.geo, this.mat)
    lanes.frustumCulled = false
    lanes.name = 'warp-lanes'
    this.root.add(lanes)
    const cv = document.createElement('canvas')
    cv.width = cv.height = 128
    const g = cv.getContext('2d')!
    const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64)
    gr.addColorStop(0, 'rgba(255,255,255,1)')
    gr.addColorStop(0.18, 'rgba(186,250,245,0.85)')
    gr.addColorStop(0.45, 'rgba(255,209,102,0.28)')
    gr.addColorStop(1, 'rgba(255,209,102,0)')
    g.fillStyle = gr
    g.fillRect(0, 0, 128, 128)
    this.glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(cv),
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      toneMapped: false,
    }))
    this.glow.position.set(0, 0, -78)
    this.glow.scale.setScalar(48)
    this.glow.frustumCulled = false
    this.root.add(this.glow)
  }

  private seed(spread: boolean): Streak {
    const angle = Math.random() * Math.PI * 2
    const radius = 1.4 + Math.sqrt(Math.random()) * 16
    return {
      angle,
      radius,
      z: spread ? -2 - Math.random() * 168 : -150 - Math.random() * 40,
      speed: 0.45 + Math.random() * 1.05,
      stretch: 0.55 + Math.random() * 1.1,
    }
  }

  update(dt: number, camera: THREE.Camera, direction: THREE.Vector3, intensity: number): void {
    const on = intensity > 0.02
    this.root.visible = on
    this.mat.opacity = intensity
    const glowMat = this.glow.material as THREE.SpriteMaterial
    glowMat.opacity = intensity * 0.72
    if (!on) return
    this.dir.copy(direction)
    if (this.dir.lengthSq() < 1e-8) this.dir.set(0, 0, -1)
    else this.dir.normalize()
    this.root.position.copy(camera.position)
    this.root.up.copy(Math.abs(this.dir.y) > 0.92 ? this.altUp : this.yUp)
    this.ahead.copy(camera.position).add(this.dir)
    this.root.lookAt(this.ahead)
    this.glow.scale.setScalar(12 + intensity * 26)
    const attr = this.geo.getAttribute('position') as THREE.BufferAttribute
    const arr = attr.array as Float32Array
    const rush = 90 + intensity * 460
    for (let i = 0; i < this.streaks.length; i++) {
      const s = this.streaks[i]
      s.z += dt * s.speed * rush
      if (s.z > -1.4) Object.assign(s, this.seed(false))
      const ca = Math.cos(s.angle)
      const sa = Math.sin(s.angle)
      const x = ca * s.radius
      const y = sa * s.radius
      const w = Math.abs(s.z) * 0.02 + 0.11
      const len = (3 + intensity * 62) * s.stretch
      const z0 = s.z
      const z1 = s.z - len
      const quad = [
        x - sa * w, y + ca * w, z0,
        x + sa * w, y - ca * w, z0,
        x + sa * w, y - ca * w, z1,
        x - sa * w, y + ca * w, z0,
        x + sa * w, y - ca * w, z1,
        x - sa * w, y + ca * w, z1,
      ]
      arr.set(quad, i * 18)
    }
    attr.needsUpdate = true
  }
}

/** Straight jump between two stands. The orbit control is fed the same look it would have held. */
export class WarpJump {
  active = false
  intensity = 0
  readonly direction = new THREE.Vector3(0, 0, -1)
  private t = 0
  private dur = 2.1
  private p0 = new THREE.Vector3()
  private p1 = new THREE.Vector3()
  private l1 = new THREE.Vector3()
  private look = new THREE.Vector3()
  private side = new THREE.Vector3()
  private camera: THREE.PerspectiveCamera
  private target: THREE.Vector3
  private baseFov: number
  private done: (() => void) | null = null

  constructor(camera: THREE.PerspectiveCamera, target: THREE.Vector3) {
    this.camera = camera
    this.target = target
    this.baseFov = camera.fov
  }

  to(cam: THREE.Vector3, lookAt: THREE.Vector3, reduced: boolean, onDone?: () => void): void {
    this.done = onDone ?? null
    this.p1.copy(cam)
    this.l1.copy(lookAt)
    const dist = this.camera.position.distanceTo(cam)
    if (reduced || dist < 1.2) {
      this.camera.position.copy(cam)
      this.target.copy(lookAt)
      this.restoreFov()
      this.active = false
      this.intensity = 0
      this.finish()
      return
    }
    this.p0.copy(this.camera.position)
    this.direction.copy(cam).sub(this.p0)
    if (this.direction.lengthSq() < 1e-8) this.direction.set(0, 0, -1)
    else this.direction.normalize()
    this.dur = THREE.MathUtils.clamp(1.35 + dist / 240, 1.45, 2.55)
    this.t = 0
    this.active = true
    this.intensity = 0
  }

  abort(): void {
    if (!this.active) return
    this.active = false
    this.intensity = 0
    this.done = null
    this.restoreFov()
  }

  private restoreFov(): void {
    if (this.camera.fov === this.baseFov) return
    this.camera.fov = this.baseFov
    this.camera.updateProjectionMatrix()
  }

  private finish(): void {
    const d = this.done
    this.done = null
    try { d?.() } catch (e) { console.warn('warp callback failed', e) }
  }

  update(dt: number): void {
    if (!this.active) {
      this.intensity = 0
      return
    }
    this.t = Math.min(1, this.t + dt / this.dur)
    const k = warpEase(this.t)
    this.intensity = warpIntensity(this.t)
    this.camera.position.copy(this.p0).lerp(this.p1, k)
    this.side.set(this.direction.z, this.direction.x, this.direction.y).cross(this.direction)
    if (this.side.lengthSq() > 1e-8) {
      this.side.normalize()
      const shake = Math.sin(this.t * 46) * this.intensity * 0.18
      this.camera.position.addScaledVector(this.side, shake)
    }
    const arrive = THREE.MathUtils.smoothstep(this.t, 0.72, 1)
    this.look.copy(this.camera.position).addScaledVector(this.direction, 42)
    this.look.lerp(this.l1, arrive)
    this.target.copy(this.look)
    const fov = this.baseFov + 30 * this.intensity
    if (this.camera.fov !== fov) {
      this.camera.fov = fov
      this.camera.updateProjectionMatrix()
    }
    if (this.t >= 1) {
      this.camera.position.copy(this.p1)
      this.target.copy(this.l1)
      this.active = false
      this.intensity = 0
      this.restoreFov()
      this.finish()
    }
  }
}
