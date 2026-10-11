import * as THREE from 'three'
import { geocentric, skyRadius } from './ephemeris'
import { messierLandings, messierScene } from './galaxy'

const NAMES = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'] as const

export const SKY_BODIES = ['Earth', ...NAMES] as const

const COLOR: Record<(typeof NAMES)[number], number> = {
  Sun: 0xffd166,
  Moon: 0xd6d3d1,
  Mercury: 0xa8a29e,
  Venus: 0xe7d7b1,
  Mars: 0xc47b5a,
  Jupiter: 0xd6b48a,
  Saturn: 0xe6d3a3,
  Uranus: 0x8fbfc2,
  Neptune: 0x6f8fbf,
}

const SIZE: Record<(typeof NAMES)[number], number> = {
  Sun: 4.2,
  Moon: 0.45,
  Mercury: 0.45,
  Venus: 0.7,
  Mars: 0.55,
  Jupiter: 1.8,
  Saturn: 1.5,
  Uranus: 1.05,
  Neptune: 1.05,
}

/** Bodies as they sit, drawn around the Earth that is already the world.
 * Sphere sizes and skyRadius are the picture. userData.au is the distance.
 */
export class SystemSky {
  readonly root = new THREE.Group()
  private meshes = new Map<string, THREE.Mesh>()
  private ring: THREE.Mesh
  private selected: string | null = null
  private readonly landing = new Map<string, number>()

  constructor() {
    this.root.name = 'system-sky'
    this.root.visible = true
    for (const name of NAMES) {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(SIZE[name], 24, 16),
        new THREE.MeshBasicMaterial({ color: COLOR[name] }),
      )
      mesh.name = name
      mesh.userData.body = name
      const hit = new THREE.Mesh(
        new THREE.SphereGeometry(Math.max(SIZE[name] * 2.4, 2.4), 10, 8),
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
      )
      hit.name = `${name}-hit`
      hit.userData.body = name
      mesh.add(hit)
      mesh.visible = false
      this.root.add(mesh)
      this.meshes.set(name, mesh)
    }
    this.ring = new THREE.Mesh(
      new THREE.RingGeometry(1.45, 1.7, 64),
      new THREE.MeshBasicMaterial({ color: 0xffd166, side: THREE.DoubleSide, transparent: true, opacity: 0.92, depthWrite: false, toneMapped: false }),
    )
    this.ring.name = 'body-ring'
    this.ring.visible = false
    this.root.add(this.ring)
    const glintGeo = new THREE.BufferGeometry()
    glintGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(3), 3))
    const glintMat = new THREE.PointsMaterial({
      color: 0xfff1c7,
      size: 10,
      sizeAttenuation: false,
      depthWrite: false,
      toneMapped: false,
      transparent: true,
      map: messierDot(),
    })
    for (const row of messierLandings()) {
      const name = `Messier ${row.number}`
      this.landing.set(name, row.mark.sunKpc)
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.9, 16, 12),
        new THREE.MeshBasicMaterial({ color: 0xf0b429 }),
      )
      mesh.name = name
      mesh.userData.body = name
      mesh.userData.kpc = row.mark.sunKpc
      mesh.userData.claim = row.mark.claim
      const hit = new THREE.Mesh(
        new THREE.SphereGeometry(3.2, 10, 8),
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
      )
      hit.name = `${name}-hit`
      hit.userData.body = name
      mesh.add(hit)
      const dot = new THREE.Points(glintGeo, glintMat)
      dot.name = `${name}-star`
      dot.userData.body = name
      mesh.add(dot)
      this.root.add(mesh)
      this.meshes.set(name, mesh)
    }
  }

  setVisible(on: boolean): void {
    for (const name of NAMES) {
      const mesh = this.meshes.get(name)
      if (mesh) mesh.visible = on
    }
    if (!on) this.highlight(null)
  }

  /** Stand just off the body, on the side away from Earth, so the sphere fills the view. */
  approach(name: string): { camera: THREE.Vector3; look: THREE.Vector3 } | null {
    const mesh = this.meshes.get(name)
    if (!mesh) return null
    const look = mesh.position.clone()
    const out = look.clone().normalize()
    if (out.lengthSq() < 1e-6) out.set(0, 0, 1)
    const up = new THREE.Vector3(0, 1, 0)
    const side = new THREE.Vector3().crossVectors(out, up)
    if (side.lengthSq() < 1e-6) side.set(1, 0, 0)
    else side.normalize()
    const size = SIZE[name as (typeof NAMES)[number]] ?? 0.9
    const camera = look.clone()
      .addScaledVector(out, size * 4.4 + 3.4)
      .addScaledVector(up, size * 1.15 + 0.8)
      .addScaledVector(side, size * 0.35)
    return { camera, look }
  }

  highlight(name: string | null): void {
    this.selected = name
    for (const [n, mesh] of this.meshes) {
      const mat = mesh.material as THREE.MeshBasicMaterial
      const on = n === name
      const known = COLOR[n as (typeof NAMES)[number]]
      mat.color.setHex(on && known !== undefined ? 0xfff7e8 : (known ?? 0xf0b429))
      mesh.scale.setScalar(on ? 1.18 : 1)
    }
    this.ring.visible = !!name && this.meshes.has(name)
  }

  tick(camera: THREE.Camera): void {
    if (!this.selected || !this.root.visible) {
      this.ring.visible = false
      return
    }
    const mesh = this.meshes.get(this.selected)
    if (!mesh) return
    this.ring.visible = true
    this.ring.position.copy(mesh.position)
    this.ring.lookAt(camera.position)
    const size = SIZE[this.selected as (typeof NAMES)[number]] ?? 0.9
    this.ring.scale.setScalar(size)
  }

  place(epochMs: number): void {
    for (const name of NAMES) {
      const g = geocentric(name, epochMs)
      const radius = skyRadius(g.au)
      const len = Math.hypot(g.x, g.y, g.z) || 1
      const mesh = this.meshes.get(name)!
      mesh.position.set((g.x / len) * radius, (g.y / len) * radius, (g.z / len) * radius)
      mesh.userData.au = g.au
      mesh.userData.claim = 'MODELED'
    }
    for (const [name, mesh] of this.meshes) {
      const kpc = this.landing.get(name)
      if (kpc === undefined) continue
      const row = messierLandings().find(item => `Messier ${item.number}` === name)
      if (!row) continue
      const g = messierScene(row.mark)
      const radius = skyRadius(g.au)
      const len = Math.hypot(g.x, g.y, g.z) || 1
      mesh.position.set((g.x / len) * radius, (g.y / len) * radius, (g.z / len) * radius)
      mesh.userData.au = g.au
    }
  }
}

function messierDot(): THREE.CanvasTexture {
  const cv = document.createElement('canvas')
  cv.width = cv.height = 64
  const x = cv.getContext('2d')!
  const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32)
  gr.addColorStop(0, 'rgba(255,248,230,1)')
  gr.addColorStop(0.35, 'rgba(240,180,41,0.9)')
  gr.addColorStop(1, 'rgba(240,180,41,0)')
  x.fillStyle = gr
  x.fillRect(0, 0, 64, 64)
  const tex = new THREE.CanvasTexture(cv)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export function skyLine(epochMs: number): string {
  const sun = geocentric('Sun', epochMs)
  const moon = geocentric('Moon', epochMs)
  const jupiter = geocentric('Jupiter', epochMs)
  const when = new Date(epochMs).toISOString()
  const moonKm = moon.au * (149_597_870_700 / 1000)
  return `Sky model ${when}. Sun ${sun.au.toFixed(3)} AU. Moon ${moonKm.toFixed(0)} km. Jupiter ${jupiter.au.toFixed(2)} AU from Earth. The picture is a log map so the outer bodies fit. The numbers are the distances. Planets are mean Kepler, not DE421. Messier landings share this sky. Their directions are galactic coordinates turned into the ecliptic. Their picture distances are a log of the published kiloparsecs. Stepping backward moves the planets. It does not move a Messier object, and it does not undo the world.`
}
