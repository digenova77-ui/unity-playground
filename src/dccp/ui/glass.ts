import * as THREE from 'three'
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import '../styles/glass.css'
import type { CardModel } from './card'
import { html as esc } from './html'
import { PLATE_LAW } from './plate-law'

const LAYER_NAME = { macro: 'Macro', logic: 'Logic', physics: 'Physics' } as const
const LAYER_HINT = { macro: 'What it is', logic: 'How it works', physics: 'The evidence' } as const
const FLAG = /^https:\/\/flagcdn\.com\/w80\/[a-z]{2}\.png$/

/** The data plate. It stands at a world anchor. It is not pinned to the screen. */
export class Glass {
  readonly el: HTMLElement
  onAction: ((cardId: string, actionId: string) => void) | null = null
  onClose: (() => void) | null = null
  onUp: (() => void) | null = null
  onDive: (() => void) | null = null
  private model: CardModel | null = null
  private css: CSS3DRenderer
  private cssScene = new THREE.Scene()
  private obj: CSS3DObject
  private slab: THREE.Mesh
  private rim: THREE.LineSegments
  private stem: THREE.Line
  private anchor = new THREE.Vector3()
  private spot = new THREE.Vector3()
  private seated = false
  private reduced = false
  private tmp = new THREE.Vector3()
  private east = new THREE.Vector3()
  private normal = new THREE.Vector3()

  constructor(host: HTMLElement, scene: THREE.Scene) {
    this.css = new CSS3DRenderer()
    this.css.domElement.className = 'glass-layer'
    this.css.setSize(window.innerWidth, window.innerHeight)
    host.appendChild(this.css.domElement)
    this.el = document.createElement('section')
    this.el.className = 'plate'
    this.el.hidden = true
    this.el.setAttribute('role', 'region')
    this.el.setAttribute('aria-live', 'polite')
    this.obj = new CSS3DObject(this.el)
    this.obj.visible = false
    this.cssScene.add(this.obj)
    const glass = new THREE.MeshPhysicalMaterial({
      color: 0x123246, roughness: 0.12, metalness: 0.04, transmission: 0.72, thickness: 0.6,
      transparent: true, opacity: 1, depthWrite: false,
    })
    this.slab = new THREE.Mesh(new THREE.BoxGeometry(460, 600, 14), glass)
    this.slab.visible = false
    scene.add(this.slab)
    this.rim = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(460, 600, 14)), new THREE.LineBasicMaterial({ color: 0x5eead4 }))
    this.rim.visible = false
    scene.add(this.rim)
    const stemGeo = new THREE.BufferGeometry()
    stemGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3))
    this.stem = new THREE.Line(stemGeo, new THREE.LineBasicMaterial({ color: 0xffd166, transparent: true, opacity: 0.7 }))
    this.stem.visible = false
    this.stem.frustumCulled = false
    scene.add(this.stem)
    this.el.addEventListener('click', e => this.onClick(e))
    window.addEventListener('resize', () => this.css.setSize(window.innerWidth, window.innerHeight))
  }

  setReducedMotion(on: boolean): void { this.reduced = on }

  get current(): CardModel | null { return this.model }
  get isOpen(): boolean { return this.seated }

  show(m: CardModel, anchor: THREE.Vector3, eye: THREE.Vector3): void {
    const same = this.model?.id === m.id
    this.model = m
    this.seat(anchor, eye, !same)
    this.render(same)
    this.el.hidden = false
    this.obj.visible = true
    this.seated = true
  }

  refresh(m: CardModel): void {
    if (!this.seated || this.model?.id !== m.id) return
    const scroll = this.el.querySelector('.g-face')?.scrollTop ?? 0
    this.model = m
    this.render(true)
    const face = this.el.querySelector('.g-face')
    if (face) face.scrollTop = scroll
  }

  hide(): void {
    this.seated = false
    this.model = null
    this.el.hidden = true
    this.obj.visible = false
    this.slab.visible = false
    this.rim.visible = false
    this.stem.visible = false
  }

  setOpen(_on: boolean): void { /* the face is the whole record; nothing folds away */ }

  setLayer(i: number): void {
    const key = this.model?.layers[i]?.key
    if (!key) return
    this.el.querySelector(`[data-key="${key}"]`)?.scrollIntoView({ block: 'start', behavior: this.reduced ? 'auto' : 'smooth' })
  }

  paint(camera: THREE.PerspectiveCamera): void {
    if (!this.seated) return
    this.obj.lookAt(camera.position)
    const s = this.obj.scale.x
    this.slab.position.copy(this.spot)
    this.slab.quaternion.copy(this.obj.quaternion)
    this.slab.scale.setScalar(s)
    this.slab.translateZ(-10 * s)
    this.rim.position.copy(this.slab.position)
    this.rim.quaternion.copy(this.slab.quaternion)
    this.rim.scale.setScalar(s)
    this.normal.copy(this.anchor).normalize()
    const facing = this.normal.dot(this.tmp.copy(camera.position).sub(this.anchor)) > 0.2
    this.el.style.visibility = facing ? 'visible' : 'hidden'
    this.slab.visible = facing
    this.rim.visible = facing
    this.stem.visible = facing
    const attr = this.stem.geometry.getAttribute('position') as THREE.BufferAttribute
    attr.setXYZ(0, this.anchor.x, this.anchor.y, this.anchor.z)
    attr.setXYZ(1, this.spot.x, this.spot.y, this.spot.z)
    attr.needsUpdate = true
    this.css.render(this.cssScene, camera)
  }

  private seat(anchor: THREE.Vector3, eye: THREE.Vector3, move: boolean): void {
    this.anchor.copy(anchor)
    if (!move && this.spot.lengthSq() > 1) return
    this.normal.copy(anchor).normalize()
    const dist = Math.max(1.2, eye.distanceTo(anchor))
    this.spot.copy(anchor).addScaledVector(this.normal, dist * 0.42)
    this.obj.position.copy(this.spot)
    const worldH = dist * 0.22
    this.obj.scale.setScalar(Math.max(0.0004, Math.min(0.02, worldH / 600)))
  }

  private onClick(e: Event): void {
    const t = (e.target as HTMLElement).closest('button')
    if (!t || !this.model) return
    e.stopPropagation()
    if (t.classList.contains('g-x')) { this.hide(); this.onClose?.(); return }
    if (t.classList.contains('g-up')) { this.onUp?.(); return }
    if (t.dataset.action) this.onAction?.(this.model.id, t.dataset.action)
  }

  private render(keep: boolean): void {
    const m = this.model
    if (!m) return
    const flag = m.flag && FLAG.test(m.flag) ? `<img class="g-flag" alt="" src="${m.flag}" />` : ''
    const layers = m.layers.map((L, i) => {
      const items = L.items?.length ? `<div class="g-cells">${L.items.map(it => `<div class="g-cell${it.wide ? ' wide' : ''}"><span>${esc(it.label)}</span><strong>${esc(it.value)}</strong></div>`).join('')}</div>` : ''
      const max = Math.max(1e-9, ...(L.bars?.rows.map(r => r.value) ?? [1]))
      const bars = L.bars?.rows.length ? `<figure class="g-bars"><figcaption>${esc(L.bars.title)}</figcaption>${L.bars.rows.map(r => `<div class="g-bar"><span>${esc(r.label)}</span><i style="--w:${Math.max(2, (r.value / max) * 100).toFixed(1)}%"></i><b>${esc(r.display)}</b></div>`).join('')}</figure>` : ''
      const name = LAYER_NAME[L.key]
      return `<section class="g-layer" data-key="${L.key}"><h3><b>${String(i + 1).padStart(2, '0')}</b> ${name}<small>${LAYER_HINT[L.key]}</small></h3><p class="g-lead">${esc(L.lead)}</p>${items}${bars}${L.boundary ? `<div class="g-bound"><b>Honest boundary</b>${esc(L.boundary)}</div>` : ''}${L.source ? `<span class="g-src">${esc(L.source)}</span>` : ''}</section>`
    }).join('')
    const scroll = keep ? this.el.querySelector('.g-face')?.scrollTop ?? 0 : 0
    this.el.setAttribute('aria-label', `${m.title} plate`)
    this.el.innerHTML = `<div class="g-face"><header class="g-head"><button class="g-up" type="button" aria-label="Up one level">↑</button><div><div class="g-kick"><b>LEVEL ${String(m.level).padStart(2, '0')}</b>${m.path.map(p => `<span>${esc(p)}</span>`).join('<em>→</em>')}</div><h2>${esc(m.title)}</h2>${m.subtitle ? `<div class="g-sub">${esc(m.subtitle)}</div>` : ''}<div class="g-badge tone-${m.badge.tone}"><i></i>${esc(m.badge.label)}</div></div>${flag}<button class="g-x" type="button" aria-label="Close plate">×</button></header>${layers}${m.actions?.length ? `<div class="g-actions">${m.actions.map(a => `<button type="button" data-action="${esc(a.id)}" class="${a.primary ? 'primary' : ''}">${esc(a.label)}</button>`).join('')}</div>` : ''}<p class="g-law">${esc(PLATE_LAW[0])} ${esc(PLATE_LAW[2])}</p></div>`
    const face = this.el.querySelector('.g-face')
    if (face) face.scrollTop = scroll
  }
}
