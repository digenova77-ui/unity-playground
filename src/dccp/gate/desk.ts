/** The Earth is the body. The philosophy is type. The seed is in the Earth.
 */

import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'

const STORY = [
  'The mirror of The Creator: Pure Logic.',
  'The seed pulses. That pulse turns the Earth.',
  'Two chambers. They are not copies. One, then two. A one with no two does not close.',
]

function beat(t: number): number {
  const x = t % 1.35
  const lub = Math.exp(-(((x - 0.08) / 0.065) ** 2))
  const dub = 0.6 * Math.exp(-(((x - 0.28) / 0.055) ** 2))
  return lub + dub
}

export function mountDesk(root: HTMLElement): void {
  const prior = (root as HTMLElement & { _hang?: number })._hang
  if (prior) cancelAnimationFrame(prior)
  root.innerHTML = `<canvas class="hang"></canvas><p class="say"></p><p class="seedline">The mirror of The Creator: Pure Logic.</p><a class="where" href="/where.html">Where this goes</a>`
  const canvas = root.querySelector<HTMLCanvasElement>('.hang')!
  const say = root.querySelector<HTMLParagraphElement>('.say')!
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))
  renderer.setClearColor(0x020203, 1)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
  camera.position.set(0, 0.2, 16)
  camera.lookAt(0, 0, 0)
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(1, 64, 64),
    new THREE.MeshStandardMaterial({
      color: 0x16324a,
      roughness: 0.82,
      metalness: 0.02,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    }),
  )
  earth.rotation.y = 0.9
  earth.renderOrder = 2
  const seed = new THREE.Mesh(
    new THREE.SphereGeometry(0.16, 28, 20),
    new THREE.MeshBasicMaterial({ color: 0xffc56a }),
  )
  seed.scale.set(0.78, 1.28, 0.78)
  const warm = new THREE.PointLight(0xffc56a, 0.35, 1.4, 2)
  seed.add(warm)
  scene.add(seed)
  scene.add(earth)
  const air = new THREE.Mesh(
    new THREE.SphereGeometry(1.06, 64, 64),
    new THREE.MeshBasicMaterial({ color: 0x8ec4de, transparent: true, opacity: 0.18, side: THREE.BackSide }),
  )
  scene.add(air)
  const sun = new THREE.DirectionalLight(0xfff6e4, 2.6)
  sun.position.set(6, 1.4, 4)
  const fill = new THREE.DirectionalLight(0x9ec0dc, 0.55)
  fill.position.set(-5, 0.4, 6)
  scene.add(sun, fill, new THREE.AmbientLight(0x2a3c52, 0.45))
  const loader = new THREE.TextureLoader()
  const paint = (tex: THREE.Texture, night: boolean) => {
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy()
    const mat = earth.material as THREE.MeshStandardMaterial
    if (night) {
      mat.emissiveMap = tex
      mat.emissive = new THREE.Color(0xfff4e0)
      mat.emissiveIntensity = 0.85
    } else mat.map = tex
    mat.needsUpdate = true
  }
  loader.load('/textures/earth-day-2048.jpg', tex => paint(tex, false))
  loader.load('/textures/earth-night-2048.jpg', tex => paint(tex, true))
  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.18, 0.3, 0.92))
  composer.addPass(new OutputPass())
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches
  const size = () => {
    const w = canvas.clientWidth || root.clientWidth
    const h = canvas.clientHeight || root.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    composer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  size()
  new ResizeObserver(size).observe(root)
  addEventListener('resize', size)
  const clock = new THREE.Clock()
  let shown = -1
  let spin = 0
  const frame = () => {
    const t = clock.getElapsedTime()
    if (!still) {
      const b = beat(t)
      spin = spin * 0.94 + b * 0.01
      earth.rotation.y += spin
      const skin = earth.material as THREE.MeshStandardMaterial
      if (skin.emissiveMap) skin.emissiveIntensity = 0.72 + b * 0.2
      air.scale.setScalar(1 + b * 0.018)
      warm.intensity = 0.22 + b * 0.9
      const k = 1 + b * 0.22
      seed.scale.set(0.78 * k, 1.28 * k, 0.78 * k)
      ;(seed.material as THREE.MeshBasicMaterial).color.setRGB(1, 0.7 + b * 0.25, 0.32 + b * 0.2)
    }
    const i = Math.floor(t / 16) % STORY.length
    if (i !== shown) {
      shown = i
      say.textContent = STORY[i]
    }
    composer.render()
    ;(root as HTMLElement & { _hang?: number })._hang = requestAnimationFrame(frame)
  }
  frame()
}
