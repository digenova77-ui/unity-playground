import * as THREE from 'three'
import type { Font } from 'three/examples/jsm/loaders/FontLoader.js'
import { bandLines, DISK_KPC, drawnMarks, galactocentric, MARKS, milkPass, R0_KPC, type Kind, type Pass } from './galaxy'
import { text3D } from '../world/text3d'

const SCALE = 2.4

const LIT: Record<Kind, number> = {
  center: 0xffd166,
  star: 0xfff1c7,
  cluster: 0xf0b429,
  nebula: 0xf0a0c0,
  remnant: 0x9db4ff,
  compact: 0x5eead4,
  cloud: 0xd6d3d1,
}

/** The disk above the Earth. The rim is the 15 kpc barrier this pass holds.
 * Marks are the seated objects. Travel to a Messier landing is the sky, not this disk.
 */
export class GalaxyScene {
  readonly root = new THREE.Group()
  private elapsed = 0
  private bead: THREE.Mesh
  private sweep: THREE.Mesh
  private marks = new Map<string, THREE.Mesh>()
  private pass: Pass = milkPass(0)

  constructor(font: Font) {
    this.root.name = 'milky-way'
    this.root.position.set(-R0_KPC * SCALE, 26, 0)

    const disk = new THREE.Mesh(
      new THREE.CircleGeometry(DISK_KPC * SCALE, 96),
      new THREE.MeshBasicMaterial({ color: 0x1c3d66, transparent: true, opacity: 0.72, side: THREE.DoubleSide, depthWrite: false, toneMapped: false }),
    )
    disk.rotation.x = Math.PI / 2
    const dust = new THREE.Mesh(
      new THREE.CircleGeometry(6.4 * SCALE, 64),
      new THREE.MeshBasicMaterial({ color: 0x8a5a32, transparent: true, opacity: 0.42, side: THREE.DoubleSide, depthWrite: false, toneMapped: false }),
    )
    dust.rotation.x = Math.PI / 2
    dust.position.y = 0.04
    const rim = new THREE.Mesh(
      new THREE.RingGeometry(DISK_KPC * SCALE - 1.15, DISK_KPC * SCALE + 0.35, 128),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.95, side: THREE.DoubleSide, depthWrite: false, toneMapped: false }),
    )
    rim.rotation.x = Math.PI / 2
    const bar = new THREE.Mesh(
      new THREE.BoxGeometry(4.6 * SCALE, 0.18, 1.35 * SCALE),
      new THREE.MeshBasicMaterial({ color: 0xf6d58a, transparent: true, opacity: 0.55, depthWrite: false, toneMapped: false }),
    )
    bar.rotation.y = (28 * Math.PI) / 180
    bar.position.y = 0.08
    this.root.add(disk, dust, rim, bar)

    const edge = text3D(font, '15 KPC', { size: 1.15, emissive: 0xfbbf24, emissiveIntensity: 0.9 })
    edge.position.set(DISK_KPC * SCALE + 1.2, 1.2, 0)
    const title = text3D(font, 'MILKY WAY', { size: 2.1, emissive: 0x93c5fd, emissiveIntensity: 0.7 })
    title.position.set(0, 3.2, -DISK_KPC * SCALE * 0.72)
    this.root.add(edge, title)

    for (const mark of drawnMarks()) {
      const place = galactocentric(mark)
      const core = mark.id === 'sgr-a'
      const mesh = new THREE.Mesh(
        new THREE.OctahedronGeometry(core ? 1.35 : mark.id === 'sun' ? 0.85 : 0.55, 0),
        new THREE.MeshBasicMaterial({ color: 0x94a3b8, toneMapped: false }),
      )
      mesh.position.set(place.x * SCALE, Math.max(0.35, place.z * SCALE), place.y * SCALE)
      mesh.name = mark.id
      const hit = new THREE.Mesh(
        new THREE.SphereGeometry(core ? 2.2 : 1.7, 8, 6),
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
      )
      hit.name = `${mark.id}-hit`
      mesh.add(hit)
      this.marks.set(mark.id, mesh)
      this.root.add(mesh)
    }
    const coreLabel = text3D(font, 'SGR A*', { size: 0.85, emissive: 0xffd166, emissiveIntensity: 0.9 })
    coreLabel.position.set(0, 2.2, 0)
    const sunLabel = text3D(font, 'SUN', { size: 0.8, emissive: 0xffd166, emissiveIntensity: 0.85 })
    sunLabel.position.set(R0_KPC * SCALE, 1.8, 0)
    this.bead = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 12, 8),
      new THREE.MeshBasicMaterial({ color: 0xf8fafc, toneMapped: false }),
    )
    this.sweep = new THREE.Mesh(
      new THREE.RingGeometry(0.9, 1, 96),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.85, side: THREE.DoubleSide, depthWrite: false, toneMapped: false }),
    )
    this.sweep.rotation.x = Math.PI / 2
    this.root.add(coreLabel, sunLabel, this.bead, this.sweep)
    this.root.visible = false
  }

  mesh(id: string): THREE.Mesh | undefined {
    return this.marks.get(id)
  }

  words(): string {
    return this.pass.words
  }

  band(): string[] {
    return bandLines(this.pass)
  }

  step(dt: number, cosmic: boolean, reduced: boolean): void {
    this.root.visible = cosmic
    if (!cosmic) return
    if (!reduced && this.pass.phase !== 'held') this.elapsed += dt
    this.pass = milkPass(this.elapsed, reduced)
    const moving = this.pass.phase === 'out' || this.pass.phase === 'back'
    const radius = moving ? this.pass.radius : 0
    this.bead.position.set(radius * SCALE, 0.55, 0)
    this.bead.visible = moving
    this.sweep.visible = moving
    if (moving) {
      const s = Math.max(0.2, radius * SCALE)
      this.sweep.scale.set(s, s, 1)
      const mat = this.sweep.material as THREE.MeshBasicMaterial
      mat.color.setHex(this.pass.phase === 'back' ? 0x5eead4 : 0xfbbf24)
    }
    const lit = new Set(this.pass.lit)
    for (const mark of MARKS) {
      const mesh = this.marks.get(mark.id)
      if (!mesh) continue
      const on = lit.has(mark.id)
      const mat = mesh.material as THREE.MeshBasicMaterial
      mat.color.setHex(on ? LIT[mark.kind] : 0x64748b)
    }
  }
}
