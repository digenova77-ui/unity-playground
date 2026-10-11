import * as THREE from 'three'
import type { Font } from 'three/examples/jsm/loaders/FontLoader.js'
import { text3D } from '../world/text3d'
import { matrixForks, type Step } from './matrix'

/** The walk. Parallel stones side by side. The serial stone appears only after both are read. */
export class LogicMatrix {
  readonly group = new THREE.Group()
  private font: Font

  constructor(font: Font) {
    this.font = font
    this.group.userData.matrix = 'spine'
  }

  rebuild(steps: readonly Step[]): void {
    this.group.clear()
    const forks = matrixForks()
    const open = steps[steps.length - 1]
    const openIndex = open && !open.taken ? open.index : -1
    const slab = new THREE.BoxGeometry(3.2, 0.16, 1.6)
    const serial = new THREE.BoxGeometry(3.4, 0.22, 1.2)
    forks.forEach((fork, index) => {
      const step = steps.find(row => row.index === index)
      const live = index === openIndex
      const z = -index * 6
      this.stone(slab, -2.2, z, live ? 'left' : 'map', step?.left ? 0x5eead4 : 0x163244, fork.id.toUpperCase())
      this.stone(slab, 2.2, z, live ? 'right' : 'map', step?.right ? 0x8eb4c8 : 0x10202c, live ? 'MACHINE' : 'MAP')
      if (step?.taken) this.stone(serial, 0, z - 2.4, 'decision', 0xc4a35a, 'TAKEN')
    })
    this.stone(new THREE.BoxGeometry(2.2, 0.12, 1.2), 0, -forks.length * 6, 'map', 0x1a1210, 'HOLE')
  }

  focus(): { anchor: THREE.Vector3; camera: THREE.Vector3 } {
    const depth = matrixForks().length * 3
    const anchor = this.group.position.clone().add(new THREE.Vector3(0, 1, -depth))
    const camera = this.group.position.clone().add(new THREE.Vector3(0, 22, 18))
    return { anchor, camera }
  }

  private stone(geo: THREE.BufferGeometry, x: number, z: number, side: string, color: number, label: string): void {
    const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color, roughness: 0.55, emissive: color, emissiveIntensity: 0.15 }))
    mesh.position.set(x, 0.2, z)
    mesh.userData.matrix = side
    this.group.add(mesh)
    const words = text3D(this.font, label, { size: 0.28, emissive: 0xe8f4f8, emissiveIntensity: 0.4 })
    words.position.set(x, 0.7, z)
    words.userData.matrix = side
    this.group.add(words)
  }
}
