/** The welcome bodies. No lines and no screen are parented to them.
 */

import * as THREE from 'three'
import type { Font } from 'three/examples/jsm/loaders/FontLoader.js'
import { WELCOME_MS } from './welcome-lines'

export type { WelcomeBeat } from './welcome-lines'
export { WELCOME, WELCOME_MS, WELCOME_SPEECH } from './welcome-lines'

export interface WelcomePlay {
  update(dt: number): boolean
  dispose(): void
}

export const WELCOME_VIDEO = '/film/welcome.mp4'
export const WELCOME_VIDEO_MS = 15_000

export function mountWelcome(opts: {
  font: Font
  scene: THREE.Scene
  camera: THREE.Camera
  reduced: boolean
}): WelcomePlay {
  void opts.font
  const root = new THREE.Group()
  root.name = 'playground-welcome'
  const light = new THREE.Mesh(
    new THREE.SphereGeometry(0.55, 24, 16),
    new THREE.MeshBasicMaterial({ color: 0xffd166, transparent: true, opacity: 0.85 }),
  )
  root.add(light)
  const coins: THREE.Mesh[] = []
  for (const side of [-1, 1]) {
    const coin = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 20, 14),
      new THREE.MeshBasicMaterial({ color: side < 0 ? 0xffd166 : 0x14b8a6, transparent: true, opacity: 0.9 }),
    )
    coin.position.set(side * 0.7, -0.9, 0)
    root.add(coin)
    coins.push(coin)
  }
  opts.scene.add(root)
  let elapsed = 0

  return {
    update(dt) {
      elapsed += dt * 1000
      const ahead = new THREE.Vector3()
      opts.camera.getWorldDirection(ahead)
      root.position.copy(opts.camera.position).addScaledVector(ahead, 8)
      root.lookAt(opts.camera.position)
      const fade = Math.max(0, 1 - Math.max(0, elapsed - 18_000) / 18_000)
      coins.forEach(coin => {
        const mat = coin.material as THREE.MeshBasicMaterial
        mat.opacity = 0.9 * fade
        if (!opts.reduced) coin.position.y = -0.9 + Math.sin(elapsed / 600) * 0.06
      })
      ;(light.material as THREE.MeshBasicMaterial).opacity = 0.35 + 0.5 * fade
      if (!opts.reduced) light.scale.setScalar(1 + Math.sin(elapsed / 400) * 0.08)
      return elapsed < WELCOME_MS
    },
    dispose() {
      opts.scene.remove(root)
      light.geometry.dispose()
      ;(light.material as THREE.Material).dispose()
      for (const coin of coins) {
        coin.geometry.dispose()
        ;(coin.material as THREE.Material).dispose()
      }
    },
  }
}
