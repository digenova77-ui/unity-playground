import * as THREE from 'three'
import type { Font } from 'three/examples/jsm/loaders/FontLoader.js'
import { text3D } from '../world/text3d'
import { DIAMOND_IOR, inscribe } from './gem.ts'

const R = 2.2

/** The diamond in the room. The father has written the one cell the lattice allows from the origin. */
export class GemRoom {
  readonly group = new THREE.Group()
  readonly stone: THREE.Mesh

  constructor(font: Font) {
    this.stone = new THREE.Mesh(
      new THREE.OctahedronGeometry(R, 0),
      new THREE.MeshPhysicalMaterial({
        color: 0xe7f6ff,
        metalness: 0,
        roughness: 0.02,
        transmission: 0.94,
        thickness: R,
        ior: DIAMOND_IOR,
        transparent: true,
        clearcoat: 1,
        clearcoatRoughness: 0.04,
      }),
    )
    this.stone.name = 'diamond'
    this.group.add(this.stone)
    const bedrock = new THREE.Mesh(
      new THREE.CircleGeometry(1.4, 32),
      new THREE.MeshStandardMaterial({ color: 0x070b10, roughness: 0.95, metalness: 0 }),
    )
    bedrock.rotation.x = -Math.PI / 2
    bedrock.position.y = -R - 0.04
    this.group.add(bedrock)
    const word = text3D(font, 'BEDROCK', { size: 0.22, emissive: 0xc4a35a, emissiveIntensity: 0.6 })
    word.position.set(0, -R - 0.35, 0)
    this.group.add(word)
    const wrote = inscribe({ x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 }, 1, false)
    if ('at' in wrote && wrote.knowledge) {
      const mark = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 16, 12),
        new THREE.MeshStandardMaterial({ color: 0xffd166, emissive: 0xffd166, emissiveIntensity: 0.8, roughness: 0.3 }),
      )
      mark.position.set(R, 0, 0)
      mark.name = 'written'
      this.group.add(mark)
    }
  }
}
