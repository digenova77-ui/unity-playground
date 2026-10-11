import * as THREE from 'three'
import type { Font } from 'three/examples/jsm/loaders/FontLoader.js'
import { text3D } from '../world/text3d'
import { memoryPlan, type Bay } from './plan'

const DRAW = 256
const STOREY = 3.2

/** The court beside Iris. Bays are the exchanges. Nothing is drawn that was not stored. */
export class MemoryHall {
  readonly group = new THREE.Group()
  readonly plinth: THREE.Mesh
  private slabs: THREE.InstancedMesh
  private posts: THREE.InstancedMesh
  private words: THREE.Mesh | null = null
  private font: Font
  private dummy = new THREE.Object3D()

  constructor(font: Font) {
    this.font = font
    this.plinth = new THREE.Mesh(
      new THREE.BoxGeometry(22, 0.18, 22),
      new THREE.MeshStandardMaterial({ color: 0x10202c, roughness: 0.85, metalness: 0.05 }),
    )
    this.plinth.position.y = 0.09
    this.plinth.userData.memory = true
    this.group.add(this.plinth)
    this.slabs = new THREE.InstancedMesh(
      new THREE.BoxGeometry(2.15, 0.1, 2.15),
      new THREE.MeshStandardMaterial({ color: 0x163244, roughness: 0.6 }),
      DRAW,
    )
    this.posts = new THREE.InstancedMesh(
      new THREE.BoxGeometry(0.12, 1.45, 0.12),
      new THREE.MeshStandardMaterial({ color: 0x5eead4, emissive: 0x0f766e, emissiveIntensity: 0.35, roughness: 0.4 }),
      DRAW * 4,
    )
    this.slabs.count = 0
    this.posts.count = 0
    this.slabs.userData.memory = true
    this.posts.userData.memory = true
    this.group.add(this.slabs, this.posts)
    this.write(0, null)
  }

  rebuild(rows: readonly { at: number; heard: string; said: string }[]): void {
    const shown = memoryPlan(rows).slice(-DRAW)
    this.slabs.count = shown.length
    this.posts.count = shown.length * 4
    const corners: [number, number][] = [[-0.9, -0.9], [0.9, -0.9], [0.9, 0.9], [-0.9, 0.9]]
    shown.forEach((bay, i) => {
      const y = 0.28 + bay.level * STOREY
      this.dummy.position.set(bay.x, y, bay.z)
      this.dummy.rotation.set(0, 0, 0)
      this.dummy.scale.set(1, 1, 1)
      this.dummy.updateMatrix()
      this.slabs.setMatrixAt(i, this.dummy.matrix)
      corners.forEach(([dx, dz], c) => {
        this.dummy.position.set(bay.x + dx, y + 0.75, bay.z + dz)
        this.dummy.updateMatrix()
        this.posts.setMatrixAt(i * 4 + c, this.dummy.matrix)
      })
    })
    this.slabs.instanceMatrix.needsUpdate = true
    this.posts.instanceMatrix.needsUpdate = true
    this.write(rows.length, shown[shown.length - 1] ?? null)
  }

  focus(): { anchor: THREE.Vector3; camera: THREE.Vector3 } {
    const anchor = this.group.position.clone().add(new THREE.Vector3(0, 2, 0))
    const camera = this.group.position.clone().add(new THREE.Vector3(16, 10, 16))
    return { anchor, camera }
  }

  private write(count: number, last: Bay | null): void {
    if (this.words) this.group.remove(this.words)
    const heard = last ? last.heard.replace(/[^\x20-\x7e]/g, '').slice(0, 28) : ''
    const line = count === 0 ? 'NO BAYS YET' : heard || String(count)
    this.words = text3D(this.font, line, { size: 0.42, emissive: 0x5eead4, emissiveIntensity: 0.5 })
    this.words.position.set(0, 0.7 + (last ? last.level * STOREY : 0), 0)
    this.group.add(this.words)
  }
}
