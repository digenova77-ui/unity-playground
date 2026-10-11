import * as THREE from 'three'
import type { Font } from 'three/examples/jsm/loaders/FontLoader.js'
import type { Grade, ModuleIntegrity, Registry } from '../data/types'
import type { FeedStatus, FeedValues } from '../live/feeds'
import { liveOnly } from '../live/show'
import type { Target } from '../iris/brain'
import { text3D, textPlate } from './text3d'
import { rememberConstruct, type ConstructScene } from '../rte/construct'
import { boardClock, noteBoard } from '../rte/board'
import { ELEMENTS, LIFE, seatOf } from '../rte/elements'
import { truthMeshScene } from '../cosmos/history'
import { GeoLayer, tierOf, type Tier } from './geo'
import { GalaxyScene } from '../cosmos/galaxy-scene'
import { drawnMarks } from '../cosmos/galaxy'
import { EASTHILL } from '../live/easthill'
import { OLED_FLOOR } from '../law/acuity'
import { HOLO, planeShift, type Look } from '../ui/depth.ts'
import { GemRoom } from '../law/gem-scene'

import { EARTH_R } from './entity.ts'
export { EARTH_R }
export const GRADE_COLOR: Record<Grade, number> = { 'AT BENCHMARK': 0xffd166, NEAR: 0x14b8a6, GAPPED: 0xf59e0b, THIN: 0xef4444, UNGRADED: 0x5b6b7a }
const GRADE_HEIGHT: Record<Grade, number> = { 'AT BENCHMARK': 2.6, NEAR: 1.9, GAPPED: 1.25, THIN: 0.7, UNGRADED: 0.25 }
export const SECTOR_COLOR: Record<string, number> = { water: 0x38bdf8, energy: 0xfacc15, climate: 0x34d399, food: 0xfb923c, pandemic: 0xf472b6, pharmacology: 0xa78bfa }
const STATUS_COLOR = (s: string): number => (s.startsWith('APPROVED') ? 0x22c55e : s.startsWith('DRAFT') ? 0xf59e0b : s.startsWith('LANDED') ? 0x14b8a6 : 0xa855f7)

export function latLonToVec(lat: number, lon: number, r: number, out = new THREE.Vector3()): THREE.Vector3 {
  const phi = THREE.MathUtils.degToRad(90 - lat)
  const theta = THREE.MathUtils.degToRad(lon + 180)
  return out.set(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta))
}

/** Approximate subsolar point (declination + hour angle; equation of time ignored, ±4°). */
export function subsolar(date: Date): { lat: number; lon: number } {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0)
  const doy = (date.getTime() - start) / 86_400_000
  const lat = -23.44 * Math.cos(((2 * Math.PI) / 365) * (doy + 10))
  const hours = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600
  let lon = -(hours - 12) * 15
  if (lon < -180) lon += 360
  if (lon > 180) lon -= 360
  return { lat, lon }
}

export interface Focus { anchor: THREE.Vector3; camera: THREE.Vector3 }
interface Pickable { target: Target; object: THREE.Object3D; label: string; focus: () => Focus }

export class World {
  readonly root = new THREE.Group()
  readonly pickables: Pickable[] = []
  readonly sunDir = new THREE.Vector3(1, 0, 0)
  sector = 'water'
  private earthMat!: THREE.ShaderMaterial
  private pillars = new Map<string, THREE.Mesh>()
  private sectorTokens = new Map<string, THREE.Group>()
  private chambers = new Map<string, THREE.Group>()
  private estates = new THREE.Group()
  private quakes!: THREE.InstancedMesh
  private quakeData: { lat: number; lon: number; mag: number }[] = []
  private iss = new THREE.Group()
  private issTarget = new THREE.Vector3()
  private issTrail!: THREE.Line
  private issTrailPts: THREE.Vector3[] = []
  private dclmNodes: THREE.Mesh[] = []
  private hung: THREE.Object3D[] = []
  private seenFold = ''
  private dclmCore = new THREE.Group()
  private pipeMat!: THREE.ShaderMaterial
  private instruments = new Map<string, { group: THREE.Group; phase: number; radius: number; plate?: THREE.Group; rendered: number; alt: string; state: string }>()
  private seats = new Map<string, { lat: number; lon: number; lift: number }>()
  private offerPins = new Map<string, { group: THREE.Group; plate?: THREE.Group }>()
  private auditGeo!: THREE.BufferGeometry
  private auditMat!: THREE.LineBasicMaterial
  private auditRing!: THREE.Mesh
  private auditWave!: THREE.LineLoop
  private auditN = 96
  private auditLive = 0
  private detail?: THREE.Group
  private purityPlate: THREE.Group | null = null
  private purityKey = ''
  private hologram: THREE.Group | null = null
  private holoLook: Look = { x: 0, y: 0 }
  private sunSprite!: THREE.Sprite
  private universalCore!: THREE.Mesh
  private construct = new THREE.Group()
  private spur: THREE.Mesh | null = null
  private tmp = new THREE.Vector3()
  private labels: THREE.Object3D[] | null = null
  private qa = new THREE.Quaternion()
  private qb = new THREE.Quaternion()
  private yAxis = new THREE.Vector3(0, 1, 0)
  private wp = new THREE.Vector3()
  private dummy = new THREE.Object3D()
  readonly geo: GeoLayer
  /** Kind of the place the visitor last chose; keeps its cluster unfolded at any altitude. */
  focusKind: string | null = null
  tier: Tier = 'orbit'
  private globe!: THREE.Mesh
  private unityRing!: THREE.Mesh
  private canadaRings: THREE.Mesh[] = []
  private marker!: THREE.Mesh
  private markerAt: THREE.Vector3 | null = null
  private groundPin: THREE.Object3D | null = null
  private labelSize = new Map<THREE.Object3D, number>()
  private box = new THREE.Box3()
  private sz = new THREE.Vector3()
  private galaxy!: GalaxyScene

  constructor(private font: Font, private reg: Registry, private integrity: ModuleIntegrity[], private textures: { day: THREE.Texture; night: THREE.Texture }, private quality: 'low' | 'medium' | 'high') {
    this.buildSky()
    this.buildEarth()
    this.buildPillars()
    this.buildCanada()
    this.buildSectorTokens()
    this.buildEstates()
    this.buildQuakes()
    this.buildIss()
    this.buildUnityRing()
    this.buildRteRoot()
    this.buildDclm()
    const gem = new GemRoom(this.font)
    gem.group.position.set(7, 21, 0)
    this.root.add(gem.group)
    this.add({ kind: 'dclm', key: 'diamond' }, gem.stone, 'Diamond', () => {
      const anchor = new THREE.Vector3()
      gem.stone.getWorldPosition(anchor)
      return { anchor, camera: anchor.clone().add(new THREE.Vector3(4.2, 1.6, 5)) }
    })
    this.buildPipe()
    this.buildInstruments()
    this.buildAudit()
    this.galaxy = new GalaxyScene(this.font)
    this.root.add(this.galaxy.root)
    for (const mark of drawnMarks()) {
      const mesh = this.galaxy.mesh(mark.id)
      if (!mesh) continue
      this.add({ kind: 'mark', key: mark.id }, mesh, mark.name, () => {
        const anchor = new THREE.Vector3()
        mesh.getWorldPosition(anchor)
        return { anchor, camera: anchor.clone().add(new THREE.Vector3(7, 11, 9)) }
      })
    }
    this.geo = new GeoLayer(this.font, this.reg.countries.countries, this.reg.cities.cities)
    this.root.add(this.geo.group)
    const door = new THREE.Mesh(new THREE.SphereGeometry(0.04, 14, 10), new THREE.MeshBasicMaterial({ color: 0xffd166, toneMapped: false }))
    latLonToVec(EASTHILL.lat, EASTHILL.lon, EARTH_R + 0.04, door.position)
    door.visible = false
    this.groundPin = door
    this.add({ kind: 'ground', key: 'easthill' }, door, EASTHILL.name, () => {
      const anchor = door.position.clone()
      return { anchor, camera: anchor.clone().add(new THREE.Vector3(0.4, 0.7, 0.8)) }
    })
    this.marker = new THREE.Mesh(new THREE.RingGeometry(0.82, 1, 64), new THREE.MeshBasicMaterial({ color: 0xffd166, transparent: true, opacity: 0.8, side: THREE.DoubleSide, depthWrite: false, toneMapped: false }))
    this.marker.visible = false
    this.root.add(this.marker)
    this.setSector('water')
  }

  private add(target: Target, object: THREE.Object3D, label: string, focus: () => Focus): void {
    object.traverse(o => { o.userData.pick = target })
    this.pickables.push({ target, object, label, focus })
  }

  findPickable(target: Target): Pickable | undefined {
    return this.pickables.find(p => p.target.kind === target.kind && p.target.key === target.key)
  }

  // ---------- sky ----------
  private buildSky(): void {
    // The night sky is the Messier landings on the system sky. A random shell is not a catalogue.
    const cv = document.createElement('canvas')
    cv.width = cv.height = 128
    const x = cv.getContext('2d')!
    const gr = x.createRadialGradient(64, 64, 0, 64, 64, 64)
    gr.addColorStop(0, 'rgba(255,250,230,1)')
    gr.addColorStop(0.2, 'rgba(255,220,150,0.8)')
    gr.addColorStop(1, 'rgba(255,180,80,0)')
    x.fillStyle = gr
    x.fillRect(0, 0, 128, 128)
    const tex = new THREE.CanvasTexture(cv)
    this.sunSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }))
    this.sunSprite.scale.setScalar(60)
    this.root.add(this.sunSprite)
    this.root.add(new THREE.AmbientLight(0x6b7f99, 0.55))
    const key = new THREE.DirectionalLight(0xfff1dc, 1.6)
    key.name = 'sun'
    this.root.add(key)
    const rim = new THREE.DirectionalLight(0x14b8a6, 0.5)
    rim.position.set(-30, 10, -20)
    this.root.add(rim)
  }

  // ---------- earth ----------
  private buildEarth(): void {
    const seg = this.quality === 'low' ? 64 : 128
    this.earthMat = new THREE.ShaderMaterial({
      uniforms: { uDay: { value: this.textures.day }, uNight: { value: this.textures.night }, uSun: { value: this.sunDir } },
      vertexShader: 'varying vec2 vUv; varying vec3 vN; varying vec3 vW; void main(){ vUv=uv; vN=normalize(mat3(modelMatrix)*normal); vec4 w=modelMatrix*vec4(position,1.0); vW=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }',
      fragmentShader: /* glsl */ `
        uniform sampler2D uDay; uniform sampler2D uNight; uniform vec3 uSun;
        varying vec2 vUv; varying vec3 vN; varying vec3 vW;
        void main(){
          vec3 n = normalize(vN);
          float ndl = dot(n, normalize(uSun));
          vec3 day = texture2D(uDay, vUv).rgb;
          vec3 night = texture2D(uNight, vUv).rgb;
          float dayMix = smoothstep(-0.12, 0.18, ndl);
          vec3 lit = day * (0.08 + 1.15 * max(ndl, 0.0));
          vec3 lights = pow(night, vec3(1.6)) * vec3(1.6, 1.25, 0.85) * 1.8;
          vec3 col = mix(lights + day * 0.025, lit, dayMix);
          float ocean = smoothstep(0.05, 0.25, day.b - max(day.r, day.g));
          vec3 V = normalize(cameraPosition - vW);
          vec3 H = normalize(normalize(uSun) + V);
          col += ocean * pow(max(dot(n, H), 0.0), 60.0) * 0.6 * dayMix;
          float rim = pow(1.0 - max(dot(n, V), 0.0), 3.0);
          col += vec3(0.25, 0.55, 1.0) * rim * (0.25 + 0.6 * dayMix);
          gl_FragColor = vec4(col, 1.0);
          #include <colorspace_fragment>
        }`,
    })
    const earth = new THREE.Mesh(new THREE.SphereGeometry(EARTH_R, seg, seg / 2), this.earthMat)
    earth.name = 'earth'
    this.globe = earth
    this.root.add(earth)
    const atmo = new THREE.Mesh(new THREE.SphereGeometry(EARTH_R * 1.035, 64, 32), new THREE.ShaderMaterial({
      uniforms: { uSun: { value: this.sunDir } },
      vertexShader: 'varying vec3 vN; varying vec3 vW; void main(){ vN=normalize(mat3(modelMatrix)*normal); vec4 w=modelMatrix*vec4(position,1.0); vW=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }',
      fragmentShader: 'uniform vec3 uSun; varying vec3 vN; varying vec3 vW; void main(){ vec3 V=normalize(cameraPosition-vW); float f=pow(1.0-abs(dot(normalize(vN),V)),2.5); float d=smoothstep(-0.3,0.4,dot(normalize(vN),normalize(uSun))); gl_FragColor=vec4(vec3(0.3,0.6,1.0)*f*(0.25+d), f*0.8); }',
      transparent: true, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false,
    }))
    this.root.add(atmo)
    this.add({ kind: 'earth', key: 'home' }, earth, 'Earth — NASA imagery of record, lit by the current sun', () => this.homeFocus())
  }

  homeFocus(): Focus {
    return { anchor: new THREE.Vector3(0, -1, 0), camera: latLonToVec(28, -62, 1, new THREE.Vector3()).multiplyScalar(44).add(new THREE.Vector3(0, 4, 0)) }
  }

  /** Standing in the room. Not the view from outside it. */
  hudFocus(): Focus {
    const anchor = this.construct.position.clone().add(new THREE.Vector3(0, 0.6, 0))
    const camera = this.construct.position.clone().add(new THREE.Vector3(0, 2.2, 5.2))
    return { anchor, camera }
  }

  private earthFocus(lat: number, lon: number, dist = 10): Focus {
    const anchor = latLonToVec(lat, lon, EARTH_R)
    const n = anchor.clone().normalize()
    return { anchor, camera: anchor.clone().add(n.multiplyScalar(dist)).add(new THREE.Vector3(0, 2, 0)) }
  }

  // ---------- jurisdictions ----------
  private buildPillars(): void {
    const geo = new THREE.CylinderGeometry(0.16, 0.22, 1, 12, 1)
    geo.translate(0, 0.5, 0)
    const cap = new THREE.SphereGeometry(0.24, 16, 8)
    for (const j of this.reg.jurisdictions) {
      const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.6, metalness: 0.3, roughness: 0.4 })
      const m = new THREE.Mesh(geo, mat)
      const capM = new THREE.Mesh(cap, mat)
      m.add(capM)
      const p = latLonToVec(j.lat, j.lon, EARTH_R)
      m.position.copy(p)
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), p.clone().normalize())
      m.name = `pillar:${j.name}`
      this.root.add(m)
      this.pillars.set(j.name, m)
      this.add({ kind: 'jurisdiction', key: j.name }, m, `${j.name} — sector grades`, () => this.earthFocus(j.lat, j.lon, 9))
    }
  }

  private buildCanada(): void {
    const geo = new THREE.TorusGeometry(0.42, 0.07, 8, 32)
    for (const c of this.reg.canada) {
      const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0xff4d5e, emissive: 0xff4d5e, emissiveIntensity: 0.9 }))
      const p = latLonToVec(c.lat, c.lon, EARTH_R + 0.06)
      m.position.copy(p)
      m.lookAt(p.clone().multiplyScalar(2))
      m.name = `canada:${c.key}`
      this.root.add(m)
      this.canadaRings.push(m)
      this.add({ kind: 'canada', key: c.key }, m, `${c.name} — pan-Canadian clinical informatics scope`, () => this.earthFocus(c.lat, c.lon, 8))
    }
  }

  private buildSectorTokens(): void {
    const keys = ['water', 'energy', 'climate', 'food', 'pandemic', 'pharmacology']
    const names: Record<string, string> = { water: 'WATER', energy: 'ENERGY', climate: 'CLIMATE', food: 'FOOD', pandemic: 'PANDEMIC', pharmacology: 'PHARMA' }
    keys.forEach((k, i) => {
      const g = new THREE.Group()
      const a = THREE.MathUtils.degToRad(-50 + i * 20)
      g.position.set(Math.sin(a) * 15, 13.5 - Math.abs(i - 2.5) * 0.6, Math.cos(a) * 15)
      const shape = new THREE.Mesh(new THREE.TorusKnotGeometry(0.55, 0.16, 80, 10, 2, 3), new THREE.MeshStandardMaterial({ color: SECTOR_COLOR[k], emissive: SECTOR_COLOR[k], emissiveIntensity: 0.5, metalness: 0.6, roughness: 0.25 }))
      const label = text3D(this.font, names[k], { size: 0.42, color: 0xffffff, emissive: SECTOR_COLOR[k], emissiveIntensity: 0.6 })
      label.position.y = -1.25
      g.add(shape, label)
      g.lookAt(0, g.position.y, 0)
      g.rotateY(Math.PI)
      this.root.add(g)
      this.sectorTokens.set(k, g)
      this.add({ kind: 'sector', key: k }, g, `${names[k]} sector layer`, () => ({ anchor: new THREE.Vector3(0, 0, 0), camera: g.position.clone().multiplyScalar(2.4).setY(16) }))
    })
  }

  private buildEstates(): void {
    const est = this.reg.pharmacology.estates
    est.forEach((e, i) => {
      const a = (i / est.length) * Math.PI * 2
      const m = new THREE.Mesh(new THREE.OctahedronGeometry(0.35), new THREE.MeshStandardMaterial({ color: 0xa78bfa, emissive: 0xa78bfa, emissiveIntensity: 1.2 }))
      m.position.set(Math.cos(a) * 13.5, 6 + Math.sin(a * 2) * 1.2, Math.sin(a) * 13.5)
      m.name = `estate:${e.name}`
      this.estates.add(m)
    })
    this.estates.visible = false
    this.root.add(this.estates)
    this.add({ kind: 'estates', key: 'pharmacology' }, this.estates, 'Pharmacology data estates — design stage, ungraded', () => ({ anchor: new THREE.Vector3(0, 6, 0), camera: new THREE.Vector3(0, 22, 26) }))
  }

  setSector(key: string): void {
    this.sector = key
    for (const [k, g] of this.sectorTokens) {
      const on = k === key
      g.scale.setScalar(on ? 1.35 : 1)
      g.traverse(o => {
        const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined
        if (m && 'emissiveIntensity' in m) m.emissiveIntensity = on ? 1.4 : 0.35
      })
    }
    this.estates.visible = key === 'pharmacology'
    for (const j of this.reg.jurisdictions) {
      const m = this.pillars.get(j.name)!
      const g: Grade = key === 'pharmacology' ? 'UNGRADED' : (j.grades[key]?.grade ?? 'UNGRADED')
      const mat = m.material as THREE.MeshStandardMaterial
      mat.color.setHex(GRADE_COLOR[g])
      mat.emissive.setHex(GRADE_COLOR[g])
      mat.emissiveIntensity = g === 'UNGRADED' ? 0.15 : 0.7
      m.userData.targetHeight = GRADE_HEIGHT[g]
    }
  }

  // ---------- live: quakes / ISS ----------
  private buildQuakes(): void {
    this.quakes = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 10, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85, toneMapped: false }), 400)
    this.quakes.count = 0
    this.quakes.name = 'quakes'
    this.root.add(this.quakes)
    this.add({ kind: 'feed', key: 'quakes' }, this.quakes, 'Earthquakes M2.5+ past day — USGS', () => this.earthFocus(this.quakeData[0]?.lat ?? 35, this.quakeData[0]?.lon ?? 140, 16))
  }

  setQuakes(items: { lat: number; lon: number; mag: number }[]): void {
    this.quakeData = items.slice(0, 400)
    this.quakes.count = this.quakeData.length
    const c = new THREE.Color()
    this.quakeData.forEach((q, i) => {
      c.setHSL(Math.max(0, 0.14 - (q.mag - 2.5) * 0.035), 1, 0.55)
      this.quakes.setColorAt(i, c)
    })
    if (this.quakes.instanceColor) this.quakes.instanceColor.needsUpdate = true
  }

  private buildIss(): void {
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.18, 0.18), new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.8, roughness: 0.3 }))
    const panelMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, emissive: 0x2563eb, emissiveIntensity: 0.6, side: THREE.DoubleSide })
    const p1 = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.9), panelMat)
    p1.position.x = -0.32
    const p2 = p1.clone()
    p2.position.x = 0.32
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }))
    this.iss.add(body, p1, p2, beacon)
    this.iss.visible = false
    this.root.add(this.iss)
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(240 * 3), 3))
    g.setDrawRange(0, 0)
    this.issTrail = new THREE.Line(g, new THREE.LineBasicMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.6 }))
    this.root.add(this.issTrail)
    this.add({ kind: 'feed', key: 'iss' }, this.iss, 'International Space Station — live position, altitude exaggerated four times', () => {
      const a = this.iss.position.clone()
      return { anchor: a, camera: a.clone().normalize().multiplyScalar(EARTH_R + 9).add(new THREE.Vector3(0, 1.5, 0)) }
    })
  }

  setIss(lat: number, lon: number, altKm: number): void {
    const r = EARTH_R * (1 + (altKm / 6371) * 4)
    latLonToVec(lat, lon, r, this.issTarget)
    if (!this.iss.visible) { this.iss.position.copy(this.issTarget); this.iss.visible = true }
    this.issTrailPts.push(this.issTarget.clone())
    if (this.issTrailPts.length > 240) this.issTrailPts.shift()
    const pos = this.issTrail.geometry.getAttribute('position') as THREE.BufferAttribute
    this.issTrailPts.forEach((p, i) => pos.setXYZ(i, p.x, p.y, p.z))
    pos.needsUpdate = true
    this.issTrail.geometry.setDrawRange(0, this.issTrailPts.length)
  }

  // ---------- Unity ring ----------
  private buildUnityRing(): void {
    const R = 25
    const n = this.reg.chambers.length
    const ringGeo = new THREE.TorusGeometry(R, 0.05, 6, 240)
    const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0x14b8a6, transparent: true, opacity: 0.45, toneMapped: false }))
    ring.rotation.x = Math.PI / 2
    this.unityRing = ring
    this.root.add(ring)
    this.reg.chambers.forEach((c, i) => {
      const a = (i / n) * Math.PI * 2 + Math.PI / 2
      const g = new THREE.Group()
      g.position.set(Math.cos(a) * R, Math.sin(a * 3) * 0.6, Math.sin(a) * R)
      const edge = new THREE.MeshStandardMaterial({ color: 0x14b8a6, emissive: 0x14b8a6, emissiveIntensity: 0.8 })
      const glass = new THREE.MeshPhysicalMaterial({ color: 0x0c2230, metalness: 0.2, roughness: 0.08, clearcoat: 1, transparent: true, opacity: 0.78, emissive: 0x062a2a, emissiveIntensity: 0.6 })
      const mono = new THREE.Mesh(new THREE.BoxGeometry(2.1, 3.2, 0.3), [edge, edge, edge, edge, glass, glass])
      const frame = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.12, 0.42), edge)
      frame.position.y = -1.66
      const title = text3D(this.font, c.title.replace(/^The /, '').toUpperCase().slice(0, 22), { size: 0.3, emissive: 0x14b8a6, emissiveIntensity: 0.55 })
      title.position.y = 2.15
      const glyph = new THREE.Mesh(new THREE.IcosahedronGeometry(0.42, 0), new THREE.MeshStandardMaterial({ color: 0xe6fffb, emissive: c.status === 'LANDED' ? 0x14b8a6 : 0x8eb4c8, emissiveIntensity: 1.1, flatShading: true }))
      glyph.position.set(0, 0.2, 0.3)
      glyph.name = 'glyph'
      g.add(mono, frame, title, glyph)
      g.lookAt(0, g.position.y, 0)
      g.rotateY(Math.PI)
      g.userData.edge = edge
      this.root.add(g)
      this.chambers.set(c.key, g)
      this.add({ kind: 'chamber', key: c.key }, g, `Unity chamber: ${c.title} — ${c.headline}`, () => {
        const out = g.position.clone().setY(0).normalize()
        return { anchor: g.position.clone(), camera: g.position.clone().add(out.multiplyScalar(7.5)).add(new THREE.Vector3(0, 1.2, 0)) }
      })
    })
  }

  setDiscovered(keys: Set<string>): void {
    for (const [k, g] of this.chambers) {
      const on = keys.has(k)
      const edge = g.userData.edge as THREE.MeshStandardMaterial
      edge.color.setHex(on ? 0xffd166 : 0x14b8a6)
      edge.emissive.setHex(on ? 0xffd166 : 0x14b8a6)
      edge.emissiveIntensity = on ? 1.3 : 0.8
    }
  }

  // ---------- Universal RTE root ----------
  private buildRteRoot(): void {
    const Y = -21
    this.universalCore = new THREE.Mesh(new THREE.OctahedronGeometry(2.2, 0), new THREE.MeshPhysicalMaterial({ color: 0x5eead4, emissive: 0x14b8a6, emissiveIntensity: 0.9, metalness: 0.1, roughness: 0.05, clearcoat: 1, flatShading: true }))
    this.universalCore.scale.y = 1.8
    this.universalCore.position.set(0, Y, 0)
    this.root.add(this.universalCore)
    const label = text3D(this.font, 'UNIVERSAL RTE', { size: 0.95, emissive: 0x14b8a6, emissiveIntensity: 0.7 })
    label.position.set(0, Y + 5.4, 3)
    this.root.add(label)
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.5, Math.abs(Y) - EARTH_R, 12, 1, true), new THREE.MeshBasicMaterial({ color: 0x14b8a6, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }))
    beam.position.set(0, (Y - EARTH_R) / 2, 0)
    this.root.add(beam)
    const disk = new THREE.Mesh(new THREE.RingGeometry(9.5, 13.5, 96), new THREE.MeshBasicMaterial({ color: 0x0f766e, transparent: true, opacity: 0.25, side: THREE.DoubleSide, toneMapped: false }))
    disk.rotation.x = -Math.PI / 2
    disk.position.y = Y - 0.6
    this.root.add(disk)
    this.add({ kind: 'universal', key: 'universal' }, this.universalCore, 'The Universal RTE — the root every room is seated into', () => ({ anchor: new THREE.Vector3(0, Y, 0), camera: new THREE.Vector3(0, Y + 7, 24) }))
    this.construct.position.set(0, -36, 0)
    this.root.add(this.construct)
    this.add({ kind: 'universal', key: 'construct' }, this.construct, 'The HUD. The room you are standing in.', () => this.hudFocus())
    const mesh = truthMeshScene()
    this.drawConstruct({ title: 'Truth mesh', lines: [mesh.speech], empty: false, form: 'mesh', steps: mesh.steps, joints: mesh.joints, ties: mesh.ties, shell: mesh.shell, unknown: mesh.unknown, from: { kind: 'universal', key: 'universal' } })
    const n = this.reg.rtes.length
    this.reg.rtes.forEach((r, i) => {
      const a = (i / n) * Math.PI * 2 + Math.PI / 2
      const g = new THREE.Group()
      g.position.set(Math.cos(a) * 11.5, Y, Math.sin(a) * 11.5)
      const color = STATUS_COLOR(r.status)
      const base = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.6, 0.55, 6), new THREE.MeshStandardMaterial({ color: 0x0f1d2b, metalness: 0.7, roughness: 0.3, emissive: color, emissiveIntensity: 0.15 }))
      const emblem = new THREE.Mesh(r.kind === 'spec' ? new THREE.OctahedronGeometry(0.6, 0) : r.kind === 'unity' ? new THREE.DodecahedronGeometry(0.6, 0) : new THREE.IcosahedronGeometry(0.62, 0), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 1.1, flatShading: true }))
      emblem.position.y = 1.5
      emblem.name = 'emblem'
      const title = text3D(this.font, r.name.replace('Athletic Intelligence RTE', 'ATHLETIC RTE').replace('Baseball Diamond Module', 'BASEBALL DIAMOND').replace('DCCP Crypto Flight HUD', 'CRYPTO FLIGHT HUD').replace('Public Sector à la carte', 'PUBLIC SECTOR').replace('Energy & SCADA RTE', 'ENERGY · SCADA').toUpperCase(), { size: 0.34, emissive: color, emissiveIntensity: 0.6 })
      title.position.y = 2.7
      const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 9.5, 6), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.4, toneMapped: false }))
      spoke.rotation.z = Math.PI / 2
      spoke.position.set(-5.4, 0.1, 0)
      g.add(base, emblem, title)
      g.lookAt(0, Y, 0)
      g.rotateY(Math.PI)
      const spokeHolder = new THREE.Group()
      spokeHolder.position.copy(g.position)
      spokeHolder.lookAt(0, Y, 0)
      spokeHolder.rotateY(Math.PI / 2)
      spoke.position.set(-4.9 + 0.0, 0, 0)
      spokeHolder.add(spoke)
      g.name = 'rte'
      spokeHolder.name = 'rte'
      this.hung.push(g, spokeHolder)
      this.root.add(g, spokeHolder)
      this.add({ kind: 'rte', key: r.key }, g, `${r.name} — ${r.status}`, () => {
        const out = g.position.clone().setY(0).normalize()
        return { anchor: g.position.clone().add(new THREE.Vector3(0, 1.4, 0)), camera: g.position.clone().add(out.multiplyScalar(7)).add(new THREE.Vector3(0, 3.2, 0)) }
      })
      const depths = r.facts.length ? r.facts : ['0:1']
      depths.forEach((_, fi) => {
        const plate = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.08, 0.62), new THREE.MeshStandardMaterial({ color: 0x0f1d2b, emissive: color, emissiveIntensity: 0.45, metalness: 0.4, roughness: 0.35 }))
        plate.position.y = -0.9 - fi * 0.95
        const tag = text3D(this.font, r.facts.length ? String(fi + 1).padStart(2, '0') : '0:1', { size: 0.22, emissive: color, emissiveIntensity: 0.7 })
        tag.position.y = plate.position.y + 0.28
        g.add(plate, tag)
        this.add({ kind: 'rte', key: `${r.key}#${fi}` }, plate, `${r.name} depth ${fi + 1}`, () => {
          const out = g.position.clone().setY(0).normalize()
          const anchor = g.position.clone().add(new THREE.Vector3(0, plate.position.y, 0))
          return { anchor, camera: anchor.clone().add(out.multiplyScalar(4.2)).add(new THREE.Vector3(0, 1.1, 0)) }
        })
      })
    })
  }

  /** Replace the construct with a room drawn from the record. An empty scene stays a bare floor. */
  drawConstruct(scene: ConstructScene): void {
    rememberConstruct(scene)
    noteBoard(scene)
    while (this.construct.children.length) {
      const child = this.construct.children[0]
      this.construct.remove(child)
      child.traverse(o => {
        const mesh = o as THREE.Mesh
        if (mesh.geometry && !String(mesh.name).startsWith('text:')) mesh.geometry.dispose()
        if (mesh.material && !Array.isArray(mesh.material)) mesh.material.dispose()
      })
    }
    const floor = new THREE.Mesh(new THREE.CircleGeometry(7, 48), new THREE.MeshStandardMaterial({ color: 0x070b10, roughness: 0.9, metalness: 0.1 }))
    floor.rotation.x = -Math.PI / 2
    floor.userData.pick = { kind: 'universal', key: 'construct' }
    this.construct.add(floor)
    this.drawSandboxShell()
    if (scene.form === 'table') {
      this.drawTable(scene.mark ?? null, Boolean(scene.life))
      this.placeOffshoot(scene)
      return
    }
    if (scene.beside) {
      this.drawSplit(scene)
      this.placeOffshoot(scene)
      return
    }
    if (scene.form === 'mesh') {
      this.drawTruthMesh(scene.steps ?? 2, scene.joints, scene.ties, scene.shell, scene.unknown)
      this.placeOffshoot(scene)
      return
    }
    if (scene.form === 'rink' || scene.form === 'dressing' || scene.form === 'office' || scene.form === 'stay' || scene.form === 'molecule' || scene.form === 'tube' || scene.form === 'class' || scene.form === 'locale' || scene.form === 'make' || scene.form === 'curriculum') {
      this.drawLiquid(scene)
      this.placeOffshoot(scene)
      return
    }
    const title = text3D(this.font, (scene.empty ? 'UNIVERSAL' : scene.title).replace(/[^\x20-\x7e]/g, '').slice(0, 22).toUpperCase() || 'UNIVERSAL', { size: 0.55, emissive: 0x14b8a6, emissiveIntensity: 0.8 })
    title.position.y = 3.2
    title.userData.pick = { kind: 'universal', key: 'construct' }
    this.construct.add(title)
    const lines = scene.empty ? ['NOTHING LOADED'] : scene.lines
    lines.slice(0, 8).forEach((line, i) => {
      const a = (i / Math.max(lines.length, 1)) * Math.PI * 2
      const slab = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.15, 0.12), new THREE.MeshStandardMaterial({ color: 0x10241f, emissive: 0x14b8a6, emissiveIntensity: scene.empty ? 0.15 : 0.45, roughness: 0.4 }))
      slab.position.set(Math.cos(a) * 4.2, 0.7, Math.sin(a) * 4.2)
      slab.lookAt(0, 0.7, 0)
      slab.userData.pick = { kind: 'universal', key: 'construct' }
      const tag = text3D(this.font, line.replace(/[^\x20-\x7e]/g, '').slice(0, 28).toUpperCase() || '0:1', { size: 0.16, emissive: 0xe8fbff, emissiveIntensity: 0.5 })
      tag.position.copy(slab.position)
      tag.position.y += 0.85
      tag.userData.pick = { kind: 'universal', key: 'construct' }
      this.construct.add(slab, tag)
    })
    this.placeOffshoot(scene)
  }

  /** Time along the length. Height is floor, stretch, and ceiling. No new fact is added. */
  private drawTruthMesh(steps: number, joints?: { end: boolean; grade?: 'two' | 'one' | 'conflict' }[], ties?: { from: number; to: number }[], shell?: { from: number; to: number }[], unknown?: { from: number; to: number }[]): void {
    const n = Math.max(2, Math.min(40, joints?.length || Math.floor(steps)))
    const span = 0.42
    const xOf = (i: number) => (i - (n - 1) / 2) * span
    const zOf = (i: number) => (joints?.[i]?.end === false ? 1.35 : 0)
    const dot = (end: boolean) => new THREE.SphereGeometry(end ? 0.09 : 0.055, 8, 8)
    const floorMat = new THREE.MeshBasicMaterial({ color: 0x8eb4c8 })
    const twoMat = new THREE.MeshBasicMaterial({ color: 0x22c55e })
    const clashMat = new THREE.MeshBasicMaterial({ color: 0xef4444 })
    const upMat = new THREE.MeshBasicMaterial({ color: 0x14b8a6 })
    const ceilMat = new THREE.MeshBasicMaterial({ color: 0xe8fbff })
    const link = (a: THREE.Vector3, b: THREE.Vector3, color: number) => {
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([a, b]), new THREE.LineBasicMaterial({ color }))
      line.userData.pick = { kind: 'universal', key: 'construct' }
      this.construct.add(line)
    }
    const at = (i: number, y: number) => new THREE.Vector3(xOf(i), y, zOf(i))
    for (let i = 0; i < n; i++) {
      const end = joints?.[i]?.end !== false
      const grade = joints?.[i]?.grade
      const mat = grade === 'two' ? twoMat : grade === 'conflict' ? clashMat : floorMat
      const node = new THREE.Mesh(dot(end || grade === 'conflict'), mat)
      node.position.copy(at(i, 0.15))
      node.userData.pick = { kind: 'universal', key: 'construct' }
      this.construct.add(node)
      if (i < n - 1) {
        const left = at(i, 0.15)
        const right = at(i + 1, 0.15)
        const mid = left.clone().add(right).multiplyScalar(0.5)
        mid.y = 1.15
        link(left, mid, 0x14b8a6)
        link(mid, right, 0x14b8a6)
        link(mid, new THREE.Vector3(mid.x, 2.35, 0.35), 0x5b6b7a)
        const knot = new THREE.Mesh(dot(false), upMat)
        knot.position.copy(mid)
        knot.userData.pick = { kind: 'universal', key: 'construct' }
        this.construct.add(knot)
      }
    }
    for (const tie of ties ?? []) {
      if (tie.from < 0 || tie.to < 0 || tie.from >= n || tie.to >= n) continue
      link(at(tie.from, 0.45), at(tie.to, 0.45), 0x8a7340)
    }
    for (const gap of unknown ?? []) {
      if (gap.from < 0 || gap.to < 0 || gap.from >= n || gap.to >= n) continue
      const a = at(gap.from, 0.15)
      const b = at(gap.to, 0.15)
      const mid = a.clone().add(b).multiplyScalar(0.5)
      mid.y = 0.55
      mid.z += 0.7
      const mark = new THREE.Mesh(new THREE.OctahedronGeometry(0.12), new THREE.MeshBasicMaterial({ color: 0xf59e0b }))
      mark.position.copy(mid)
      mark.userData.pick = { kind: 'universal', key: 'construct' }
      this.construct.add(mark)
      link(a, mid, 0x8a7340)
      link(mid, b, 0x8a7340)
      const tag = text3D(this.font, 'UNKNOWN', { size: 0.22, emissive: 0xf59e0b, emissiveIntensity: 0.7 })
      tag.position.copy(mid)
      tag.position.y += 0.35
      this.construct.add(tag)
    }
    const capAt = new THREE.Vector3(0, 2.35, 0.35)
    for (const tie of shell ?? []) {
      if (tie.from < 0 || tie.to < 0 || tie.from >= n || tie.to >= n) continue
      const a = at(tie.from, 1.75)
      const b = at(tie.to, 1.75)
      link(a, b, 0xffd166)
    }
    if (joints) {
      joints.forEach((joint, index) => {
        if (joint.end && index < n) link(at(index, 0.15), capAt, 0xe8fbff)
      })
    }
    link(new THREE.Vector3(xOf(0), 2.35, 0.35), new THREE.Vector3(xOf(n - 1), 2.35, 0.35), 0xe8fbff)
    const cap = new THREE.Mesh(dot(true), ceilMat)
    cap.position.set(0, 2.35, 0.35)
    cap.userData.pick = { kind: 'universal', key: 'construct' }
    this.construct.add(cap)
    const time = text3D(this.font, 'TIME', { size: 0.28, emissive: 0xffd166, emissiveIntensity: 0.7 })
    time.position.set(xOf(0), 0.55, 0.4)
    const ceiling = text3D(this.font, 'CEILING', { size: 0.28, emissive: 0xe8fbff, emissiveIntensity: 0.7 })
    ceiling.position.set(0, 2.7, 0.35)
    const legend = [
      ['TWO PAGES', 0x22c55e],
      ['ONE PAGE', 0x8eb4c8],
      ['CONFLICT', 0xef4444],
    ] as const
    const tags = legend.map(([label, color], i) => {
      const tag = text3D(this.font, label, { size: 0.2, emissive: color, emissiveIntensity: 0.8 })
      tag.position.set(xOf(0), 1.6 - i * 0.38, 2.2)
      return tag
    })
    this.construct.add(time, ceiling, ...tags)
  }

  /** The room stays Universal. Only what it shows changes. */
  private drawSandboxShell(): void {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(6.4, 0.035, 8, 72), new THREE.MeshBasicMaterial({ color: 0x14b8a6 }))
    ring.rotation.x = Math.PI / 2
    ring.position.y = 0.05
    const gold = new THREE.Mesh(new THREE.TorusGeometry(6.15, 0.015, 6, 72), new THREE.MeshBasicMaterial({ color: 0xffd166 }))
    gold.rotation.x = Math.PI / 2
    gold.position.y = 0.07
    const word = text3D(this.font, 'UNIVERSAL', { size: 0.28, emissive: 0xffd166, emissiveIntensity: 0.75 })
    word.position.set(0, 0.22, -5.5)
    this.construct.add(ring, gold, word)
  }

  private drawTable(mark: string | null, life: boolean): void {
    const lit = new Set<string>(life ? LIFE : [])
    if (mark) lit.add(mark)
    const tone: Record<string, number> = { s: 0xffd166, p: 0x14b8a6, d: 0x8eb4c8, f: 0xc4b5fd }
    for (const el of ELEMENTS) {
      const seat = seatOf(el)
      const on = lit.has(el.symbol)
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.32, on ? 0.46 : 0.18, 0.32), new THREE.MeshStandardMaterial({ color: 0x10241f, emissive: tone[el.block], emissiveIntensity: on ? 0.85 : 0.28, roughness: 0.4 }))
      box.position.set(seat.x, on ? 0.28 : 0.12, seat.z)
      const tag = text3D(this.font, el.symbol, { size: 0.1, emissive: on ? 0xffd166 : 0xe8fbff, emissiveIntensity: on ? 0.9 : 0.35 })
      tag.position.set(seat.x, on ? 0.62 : 0.32, seat.z)
      this.construct.add(box, tag)
    }
    ;([['MATH', -4.4, -1.6], ['PHYSICS', 4.4, -1.6], ['BIOLOGY', -4.4, 1.8], ['LIFE', 4.4, 1.8]] as const).forEach(([label, x, z]) => {
      const desk = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.35, 0.7), new THREE.MeshStandardMaterial({ color: 0x10241f, emissive: 0x8eb4c8, emissiveIntensity: 0.2, roughness: 0.5 }))
      desk.position.set(x, 0.2, z)
      const word = text3D(this.font, label, { size: 0.14, emissive: 0xffd166, emissiveIntensity: 0.6 })
      word.position.set(x, 0.55, z)
      this.construct.add(desk, word)
    })
  }

  private drawSplit(scene: ConstructScene): void {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(0.04, 3.2, 0.04), new THREE.MeshBasicMaterial({ color: 0xffd166 }))
    wall.position.y = 1.5
    const left = new THREE.Group()
    const right = new THREE.Group()
    const focus = scene.focus
    left.position.x = focus === 'right' ? -5.4 : focus === 'left' ? -1.4 : -3.1
    right.position.x = focus === 'left' ? 5.4 : focus === 'right' ? 1.4 : 3.1
    left.scale.setScalar(focus === 'left' ? 0.82 : focus === 'right' ? 0.28 : 0.52)
    right.scale.setScalar(focus === 'right' ? 0.82 : focus === 'left' ? 0.28 : 0.52)
    const host = this.construct
    const other = scene.beside!
    this.construct = left
    this.drawLiquid(scene)
    this.construct = right
    this.drawLiquid({ ...scene, title: other.title, lines: other.lines, form: other.form, shape: other.shape, frames: other.frames, granted: other.granted, beside: undefined })
    this.construct = host
    host.add(wall, left, right)
  }

  /** A question picks the form. The geometry is only what this room can build. */
  private drawLiquid(scene: ConstructScene): void {
    const title = text3D(this.font, scene.title.replace(/[^\x20-\x7e]/g, '').slice(0, 18).toUpperCase() || 'ROOM', { size: 0.42, emissive: 0xffd166, emissiveIntensity: 0.7 })
    title.position.y = 3.4
    this.construct.add(title)
    if (scene.form === 'rink') this.drawRink(scene)
    else if (scene.form === 'dressing') this.drawDressing(scene.lines)
    else if (scene.form === 'office') this.drawOffice(scene.lines)
    else if (scene.form === 'stay') this.drawStay(scene.lines)
    else if (scene.form === 'molecule') this.drawMolecule(scene.shape === 'co2' ? 'co2' : 'water')
    else if (scene.form === 'class') this.drawClass(scene.seats ?? 0)
    else if (scene.form === 'locale') this.drawLocale(scene.lines)
    else if (scene.form === 'curriculum') this.drawCurriculum(scene.lines)
    else if (scene.form === 'make') this.drawMake(scene.frames ?? [], scene.granted !== false)
    else this.drawTube()
    scene.lines.slice(0, 3).forEach((line, i) => {
      const tag = text3D(this.font, line.replace(/[^\x20-\x7e]/g, '').slice(0, 34).toUpperCase() || '0:1', { size: 0.14, emissive: 0xe8fbff, emissiveIntensity: 0.45 })
      tag.position.set(0, 2.5 - i * 0.28, 3.4)
      this.construct.add(tag)
    })
  }

  private drawRink(scene: ConstructScene): void {
    const ice: THREE.Vector3[] = []
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2
      ice.push(new THREE.Vector3(Math.cos(a) * 4.6, 0.08, Math.sin(a) * 2.2))
    }
    const rim = new THREE.Line(new THREE.BufferGeometry().setFromPoints(ice), new THREE.LineBasicMaterial({ color: 0xe8fbff }))
    this.construct.add(rim)
    for (const end of [-1, 1]) {
      const goal = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.7, 1.1), new THREE.MeshStandardMaterial({ color: 0x14b8a6, emissive: 0x14b8a6, emissiveIntensity: 0.4, wireframe: true }))
      goal.position.set(end * 4.1, 0.4, 0)
      this.construct.add(goal)
    }
    const spots = scene.spots ?? []
    const chalk = scene.chalk ?? []
    if (spots.length || chalk.length) {
      for (const x of [-2.1, 0, 2.1]) {
        const stripe = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x, 0.1, -2), new THREE.Vector3(x, 0.1, 2)]), new THREE.LineBasicMaterial({ color: x === 0 ? 0xef4444 : 0x38bdf8 }))
        this.construct.add(stripe)
      }
      const mark = (row: { role: string; x: number; z: number }, color: number) => {
        const dot = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 8), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.6 }))
        dot.position.set(row.x, 0.24, row.z)
        const tag = text3D(this.font, row.role.replace(/[^\x20-\x7e]/g, '').slice(0, 4).toUpperCase() || 'X', { size: 0.14, emissive: 0xe8fbff, emissiveIntensity: 0.7 })
        tag.position.set(row.x, 0.55, row.z)
        this.construct.add(dot, tag)
      }
      for (const spot of spots) mark(spot, 0xffd166)
      for (const spot of chalk) mark({ ...spot, x: -spot.x }, 0x14b8a6)
      return
    }
    scene.lines.slice(0, 6).forEach((line, i) => {
      const board = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.5, 0.08), new THREE.MeshStandardMaterial({ color: 0x10241f, emissive: 0x8a7340, emissiveIntensity: 0.25, roughness: 0.45 }))
      board.position.set(-2.6 + (i % 3) * 2.6, 0.85, i < 3 ? -1.15 : 1.15)
      const label = line.split(':')[0] ?? 'EMPTY'
      const tag = text3D(this.font, label.replace(/[^\x20-\x7e]/g, '').slice(0, 12).toUpperCase() || 'EMPTY', { size: 0.12, emissive: 0xffd166, emissiveIntensity: 0.6 })
      tag.position.copy(board.position)
      tag.position.y += 0.95
      this.construct.add(board, tag)
    })
  }

  private drawDressing(lines: string[]): void {
    for (let i = 0; i < 6; i++) {
      const stall = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.6, 0.45), new THREE.MeshStandardMaterial({ color: 0x1a2740, emissive: 0x8eb4c8, emissiveIntensity: 0.2, roughness: 0.6 }))
      stall.position.set(-2.6 + i * 1.05, 0.8, -1.6)
      this.construct.add(stall)
    }
    const board = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.1, 0.08), new THREE.MeshStandardMaterial({ color: 0x10241f, emissive: 0xffd166, emissiveIntensity: 0.3, roughness: 0.45 }))
    board.position.set(0, 1.5, 1.8)
    const fuel = lines.find(line => line.startsWith('Fuel')) ?? 'Fuel'
    const tag = text3D(this.font, fuel.replace(/[^\x20-\x7e]/g, '').slice(0, 28).toUpperCase(), { size: 0.12, emissive: 0xffd166, emissiveIntensity: 0.7 })
    tag.position.set(0, 2.3, 1.8)
    this.construct.add(board, tag)
  }

  private drawOffice(lines: string[]): void {
    const desk = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.7, 1.1), new THREE.MeshStandardMaterial({ color: 0x1a2740, emissive: 0x14b8a6, emissiveIntensity: 0.25, roughness: 0.5 }))
    desk.position.set(0, 0.4, 0)
    const board = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.4, 0.08), new THREE.MeshStandardMaterial({ color: 0x10241f, emissive: 0xf59e0b, emissiveIntensity: 0.25, roughness: 0.45 }))
    board.position.set(0, 1.7, -2)
    this.construct.add(desk, board)
    lines.filter(line => /roster|budget|Fuel|GameSheet|Held/i.test(line)).slice(0, 3).forEach((line, i) => {
      const tag = text3D(this.font, line.replace(/[^\x20-\x7e]/g, '').slice(0, 22).toUpperCase(), { size: 0.11, emissive: 0xffd166, emissiveIntensity: 0.6 })
      tag.position.set(0, 2.2 - i * 0.28, -1.9)
      this.construct.add(tag)
    })
  }

  private drawStay(lines: string[]): void {
    const house = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.5, 1.8), new THREE.MeshStandardMaterial({ color: 0x1a2740, emissive: 0x14b8a6, emissiveIntensity: 0.28, roughness: 0.5 }))
    house.position.set(-1.6, 0.75, 0)
    const roof = new THREE.Mesh(new THREE.ConeGeometry(1.6, 0.7, 4), new THREE.MeshStandardMaterial({ color: 0x10241f, emissive: 0xf59e0b, emissiveIntensity: 0.3, roughness: 0.45 }))
    roof.position.set(-1.6, 1.85, 0)
    roof.rotation.y = Math.PI / 4
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.8, 0.06), new THREE.MeshStandardMaterial({ color: 0xffd166, emissive: 0xf59e0b, emissiveIntensity: 0.35 }))
    door.position.set(-1.6, 0.45, 0.92)
    this.construct.add(house, roof, door)
    const board = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.6, 0.06), new THREE.MeshStandardMaterial({ color: 0x10241f, emissive: 0x0f766e, emissiveIntensity: 0.2, roughness: 0.4, transparent: true, opacity: 0.92 }))
    board.position.set(1.5, 1.4, 0)
    this.construct.add(board)
    lines.slice(0, 8).forEach((line, i) => {
      const tag = text3D(this.font, line.replace(/[^\x20-\x7e]/g, '').slice(0, 26).toUpperCase() || 'STAY', { size: 0.1, emissive: 0xffd166, emissiveIntensity: 0.7 })
      tag.position.set(1.5, 2.35 - i * 0.28, 0.08)
      this.construct.add(tag)
    })
    ;['FUEL', 'FOOD', 'KITCHEN'].forEach((label, i) => {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.9, 0.08), new THREE.MeshStandardMaterial({ color: 0x10241f, emissive: 0xf59e0b, emissiveIntensity: 0.2, roughness: 0.5 }))
      post.position.set(-1.6 + i * 1.6, 0.45, 2.2)
      const tag = text3D(this.font, label, { size: 0.1, emissive: 0xffd166, emissiveIntensity: 0.55 })
      tag.position.set(post.position.x, 1.05, 2.2)
      this.construct.add(post, tag)
    })
  }

  private drawMolecule(shape: 'water' | 'co2'): void {
    const group = new THREE.Group()
    group.name = 'liquid'
    group.userData.spin = 0.7
    const oxygen = new THREE.Mesh(new THREE.SphereGeometry(0.42, 20, 14), new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0x7f1d1d, emissiveIntensity: 0.35, roughness: 0.35 }))
    group.add(oxygen)
    const bond = (to: THREE.Vector3) => {
      const len = to.length()
      const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, len, 8), new THREE.MeshStandardMaterial({ color: 0xe8fbff, roughness: 0.4 }))
      stick.position.copy(to).multiplyScalar(0.5)
      stick.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), to.clone().normalize())
      group.add(stick)
    }
    const hydrogen = (at: THREE.Vector3) => {
      bond(at)
      const ball = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 12), new THREE.MeshStandardMaterial({ color: 0xe8fbff, emissive: 0x8eb4c8, emissiveIntensity: 0.25, roughness: 0.3 }))
      ball.position.copy(at)
      group.add(ball)
    }
    if (shape === 'co2') {
      hydrogen(new THREE.Vector3(-1.35, 0, 0))
      hydrogen(new THREE.Vector3(1.35, 0, 0))
    } else {
      const angle = 104.5 * Math.PI / 180
      hydrogen(new THREE.Vector3(Math.sin(angle / 2) * 1.25, -Math.cos(angle / 2) * 1.25, 0))
      hydrogen(new THREE.Vector3(-Math.sin(angle / 2) * 1.25, -Math.cos(angle / 2) * 1.25, 0))
    }
    group.position.y = 1.3
    this.construct.add(group)
  }

  private drawMake(frames: string[], granted: boolean): void {
    if (!granted || frames.length === 0) {
      const word = text3D(this.font, granted ? 'NOT IDENTIFIED' : 'NOT GRANTED', { size: 0.28, emissive: 0xf59e0b, emissiveIntensity: 0.7 })
      word.position.set(0, 1.4, 0)
      this.construct.add(word)
      return
    }
    frames.slice(0, 6).forEach((frame, i) => {
      const part = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 12), new THREE.MeshStandardMaterial({ color: i % 2 ? 0xe8fbff : 0x14b8a6, emissive: 0xffd166, emissiveIntensity: 0.35, roughness: 0.35 }))
      part.position.set(-2.2 + i * 1.1, 1.2, 0)
      part.scale.setScalar(0.001)
      part.userData.frameAt = i
      part.userData.frames = frames.length
      const tag = text3D(this.font, frame.replace(/[^\x20-\x7e]/g, '').slice(0, 12).toUpperCase(), { size: 0.12, emissive: 0xffd166, emissiveIntensity: 0.6 })
      tag.position.set(part.position.x, 1.9, 0)
      tag.scale.setScalar(0.001)
      tag.userData.frameAt = i
      tag.userData.frames = frames.length
      this.construct.add(part, tag)
    })
  }

  private drawTube(): void {
    for (let i = 0; i < 9; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.035, 8, 28), new THREE.MeshBasicMaterial({ color: i % 2 ? 0x14b8a6 : 0xffd166 }))
      ring.position.set(0, 1.2, -3.2 + i * 0.8)
      this.construct.add(ring)
    }
    const pod = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.7, 6, 12), new THREE.MeshStandardMaterial({ color: 0xe8fbff, emissive: 0x14b8a6, emissiveIntensity: 0.45, metalness: 0.4, roughness: 0.25 }))
    pod.rotation.x = Math.PI / 2
    pod.position.set(0, 1.2, 0)
    pod.userData.glide = 0.55
    this.construct.add(pod)
  }

  private drawClass(seats: number): void {
    const board = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.3, 0.08), new THREE.MeshStandardMaterial({ color: 0x10241f, emissive: 0x14b8a6, emissiveIntensity: 0.25, roughness: 0.45 }))
    board.position.set(0, 1.7, -2.2)
    this.construct.add(board)
    const n = Math.max(0, Math.min(8, seats))
    for (let i = 0; i < n; i++) {
      const desk = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.45, 0.5), new THREE.MeshStandardMaterial({ color: 0x1a2740, emissive: 0xffd166, emissiveIntensity: 0.15, roughness: 0.6 }))
      desk.position.set(-2.4 + (i % 4) * 1.6, 0.28, i < 4 ? 0.4 : 1.6)
      this.construct.add(desk)
    }
  }

  private drawCurriculum(lines: string[]): void {
    lines.slice(0, 5).forEach((line, i) => {
      const stone = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.9, 0.7), new THREE.MeshStandardMaterial({ color: 0x10241f, emissive: i === 4 ? 0xf59e0b : 0x14b8a6, emissiveIntensity: 0.35, roughness: 0.45 }))
      stone.position.set(-3 + i * 1.5, 0.5, 0)
      const tag = text3D(this.font, line.replace(/[^\x20-\x7e]/g, '').slice(0, 18).toUpperCase() || 'NOT SAID', { size: 0.1, emissive: 0xffd166, emissiveIntensity: 0.65 })
      tag.position.set(stone.position.x, 1.2, 0)
      this.construct.add(stone, tag)
    })
  }

  private drawLocale(lines: string[]): void {
    const blocks = lines.filter(line => /^(osm:|way\/|node\/)/.test(line)).slice(0, 8)
    blocks.forEach((line, i) => {
      const block = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.4, 1.3), new THREE.MeshStandardMaterial({ color: 0x10241f, emissive: 0x14b8a6, emissiveIntensity: 0.35, roughness: 0.45 }))
      block.position.set(-2.4 + (i % 4) * 1.6, 0.7, i < 4 ? 0 : 1.5)
      const tag = text3D(this.font, line.slice(0, 18).toUpperCase(), { size: 0.12, emissive: 0xffd166, emissiveIntensity: 0.7 })
      tag.position.set(block.position.x, 1.7, block.position.z)
      this.construct.add(block, tag)
    })
    const marked = lines.some(line => line.includes('No corner') || line.includes('Not stood'))
    const label = blocks.length > 0 && marked ? 'NO CORNER' : blocks.length === 0 ? 'NOT INDEXED' : ''
    if (!label) return
    const hole = text3D(this.font, label, { size: 0.24, emissive: 0xf59e0b, emissiveIntensity: 0.7 })
    hole.position.set(0, 0.4, 2.2)
    this.construct.add(hole)
  }

  /** Branch the drawn room off a determined plate. The plate stays where it was set. */
  private placeOffshoot(scene: ConstructScene): void {
    this.root.updateMatrixWorld(true)
    const plate = scene.from ? this.findPickable({ kind: scene.from.kind as Target['kind'], key: scene.from.key }) : undefined
    const origin = new THREE.Vector3()
    if (plate) plate.object.getWorldPosition(origin)
    else this.universalCore.getWorldPosition(origin)
    const away = origin.clone()
    away.y = 0
    if (away.lengthSq() < 1) away.set(0, 0, 1)
    away.normalize().multiplyScalar(plate ? 9 : 0)
    const spot = origin.clone().add(away).add(new THREE.Vector3(0, plate ? -4 : -15, 0))
    this.construct.position.copy(spot)
    this.linkSpur(scene.empty && !scene.from ? null : origin, spot)
  }

  private linkSpur(from: THREE.Vector3 | null, to: THREE.Vector3): void {
    if (this.spur) {
      this.root.remove(this.spur)
      this.spur.geometry.dispose()
      ;(this.spur.material as THREE.Material).dispose()
      this.spur = null
    }
    if (!from) return
    const dir = to.clone().sub(from)
    const len = dir.length()
    if (len < 0.5) return
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, len, 6), new THREE.MeshBasicMaterial({ color: 0x5eead4, transparent: true, opacity: 0.45 }))
    mesh.position.copy(from).add(to).multiplyScalar(0.5)
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize())
    this.root.add(mesh)
    this.spur = mesh
  }

  // ---------- DCLM machine ----------
  private buildDclm(): void {
    const Y = 21
    this.dclmCore.position.set(0, Y, 0)
    const core = new THREE.Mesh(new THREE.SphereGeometry(1.2, 32, 16), new THREE.MeshStandardMaterial({ color: 0xe9d5ff, emissive: 0xa855f7, emissiveIntensity: 1.2, metalness: 0.3, roughness: 0.2 }))
    this.dclmCore.add(core)
    for (let i = 0; i < 3; i++) {
      const cube = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(2.6 + i * 1.1, 2.6 + i * 1.1, 2.6 + i * 1.1)), new THREE.LineBasicMaterial({ color: i === 1 ? 0x14b8a6 : 0xa855f7, transparent: true, opacity: 0.8 - i * 0.2 }))
      cube.userData.spin = (i + 1) * 0.18 * (i % 2 ? -1 : 1)
      this.dclmCore.add(cube)
    }
    this.root.add(this.dclmCore)
    const glass = new THREE.Mesh(new THREE.CircleGeometry(5.5, 48), new THREE.MeshBasicMaterial({ color: 0xc4b5fd, transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false }))
    glass.name = 'kernel'
    glass.position.set(0, 10.5, 0)
    this.hung.push(glass)
    this.root.add(glass)
    const mirrorLabel = text3D(this.font, 'TRINITY', { size: 0.42, emissive: 0xc4b5fd, emissiveIntensity: 0.6 })
    mirrorLabel.name = 'kernel'
    mirrorLabel.position.set(0, 11.2, 0)
    this.hung.push(mirrorLabel)
    this.root.add(mirrorLabel)
    const label = text3D(this.font, 'DCLM', { size: 1.1, emissive: 0xa855f7, emissiveIntensity: 0.8 })
    label.name = 'kernel'
    label.position.set(0, Y + 4.2, 0)
    this.hung.push(label)
    this.root.add(label)
    const seq = Math.max(0, ...this.integrity.flatMap(m => m.receipt?.receipts.map(r => r.sequence ?? 0) ?? [0]))
    const seqLabel = text3D(this.font, `KERNEL SEQ ${seq}`, { size: 0.36, emissive: 0x14b8a6, emissiveIntensity: 0.5 })
    seqLabel.position.set(0, Y - 3.4, 0)
    seqLabel.name = 'kernel'
    this.hung.push(seqLabel)
    this.root.add(seqLabel)
    this.integrity.forEach((m, i) => {
      const color = m.state === 'MATCH' ? 0x22c55e : m.state === 'UNCHECKED' ? 0xf59e0b : 0xef4444
      const node = new THREE.Mesh(new THREE.OctahedronGeometry(0.28), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 1.3 }))
      node.userData.phase = (i / this.integrity.length) * Math.PI * 2
      node.name = `module:${m.module}`
      this.dclmNodes.push(node)
      this.root.add(node)
    })
    this.add({ kind: 'dclm', key: 'dclm' }, this.dclmCore, 'The DCLM machine — module receipts and client-side integrity status', () => ({ anchor: new THREE.Vector3(0, Y, 0), camera: new THREE.Vector3(0, Y + 2, 12) }))
  }

  // ---------- DCCP pipe ----------
  private buildPipe(): void {
    const pts = [new THREE.Vector3(0, 21, 0), new THREE.Vector3(10, 23.5, -7), new THREE.Vector3(19, 21, -13), new THREE.Vector3(26, 14, -16), new THREE.Vector3(30, 6, -15), new THREE.Vector3(32, -2, -10)]
    const curve = new THREE.CatmullRomCurve3(pts)
    this.pipeMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
      fragmentShader: 'uniform float uTime; varying vec2 vUv; void main(){ float p=fract(vUv.x*6.0-uTime*0.35); float pulse=smoothstep(0.0,0.08,p)*smoothstep(0.22,0.08,p); vec3 c=mix(vec3(0.08,0.72,0.65),vec3(0.66,0.33,0.97),vUv.x); gl_FragColor=vec4(c*(0.35+2.2*pulse), 0.55+0.45*pulse); }',
      transparent: true, depthWrite: false, toneMapped: false,
    })
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 200, 0.2, 10, false), this.pipeMat)
    tube.name = 'pipe'
    this.hung.push(tube)
    this.root.add(tube)
    const stages: [string, string][] = [['404.html', '404'], ['alacarte.html', 'ALACARTE'], ['index.html', 'INDEX'], ['manifold.html', 'MANIFOLD'], ['rtesimadclm/manifold.html', 'RTE']]
    stages.forEach(([key, name], i) => {
      const p = pts[i + 1]
      const g = new THREE.Group()
      g.position.copy(p)
      const node = new THREE.Mesh(new THREE.SphereGeometry(0.6, 20, 12), new THREE.MeshStandardMaterial({ color: 0xc4b5fd, emissive: 0x7c3aed, emissiveIntensity: 0.9, metalness: 0.4, roughness: 0.3 }))
      const label = text3D(this.font, name, { size: 0.42, emissive: 0xa855f7, emissiveIntensity: 0.5 })
      label.position.y = 1.5
      g.add(node, label)
      g.name = 'pipe'
      g.lookAt(p.x * 0.4, p.y, 30)
      this.hung.push(g)
      this.root.add(g)
      this.add({ kind: 'pipe', key }, g, `DCCP release pipe: ${name} — design, not deployed`, () => ({ anchor: p.clone(), camera: p.clone().add(new THREE.Vector3(2, 2.5, 9)) }))
    })
    const design = text3D(this.font, 'IPFS · FIVE PINS · IPNS HOLE', { size: 0.42, emissive: 0x0ea5e9, emissiveIntensity: 0.5 })
    design.name = 'pipe'
    design.position.set(21, 25.5, -10)
    design.lookAt(0, 25.5, 30)
    this.hung.push(design)
    this.root.add(design)
  }

  // ---------- live instruments ----------
  private buildInstruments(): void {
    const keys = ['weather', 'river', 'quakes', 'iss', 'kp', 'carbon']
    keys.forEach(k => {
      const g = new THREE.Group()
      g.visible = false
      const beacon = new THREE.Mesh(new THREE.OctahedronGeometry(0.28), new THREE.MeshStandardMaterial({ color: 0x8eb4c8, emissive: 0x8eb4c8, emissiveIntensity: 0.45, flatShading: true }))
      beacon.name = 'beacon'
      g.add(beacon)
      this.root.add(g)
      this.instruments.set(k, { group: g, phase: 0, radius: 0, rendered: 0, alt: `Live instrument: ${k}. Not seated until the reading has a place.`, state: 'PENDING' })
      this.add({ kind: 'feed', key: k }, g, `Live instrument: ${k}`, () => {
        const p = g.position.clone()
        const facing = p.clone().normalize()
        return { anchor: p, camera: p.clone().add(facing.multiplyScalar(8)) }
      })
    })
  }

  /** A reading with a real coordinate. A feed with no place stays hidden. */
  seatFeed(key: string, lat: number, lon: number, lift = 0.4): void {
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return
    this.seats.set(key, { lat, lon, lift })
  }

  placeOffers(rows: { id: string; lat: number; lon: number; title: string; line: string; note: string }[]): void {
    const keep = new Set(rows.map(row => row.id))
    for (const [id, pin] of this.offerPins) {
      if (keep.has(id)) continue
      this.root.remove(pin.group)
      this.offerPins.delete(id)
    }
    for (const row of rows) {
      let pin = this.offerPins.get(row.id)
      if (!pin) {
        const group = new THREE.Group()
        const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 8), new THREE.MeshBasicMaterial({ color: 0xf0b429, toneMapped: false }))
        group.add(beacon)
        this.root.add(group)
        pin = { group }
        this.offerPins.set(row.id, pin)
      }
      latLonToVec(row.lat, row.lon, EARTH_R + 0.55, pin.group.position)
      if (pin.plate) pin.group.remove(pin.plate)
      const plate = textPlate({ width: 5.2, title: row.title, lines: [row.line, row.note], accent: '#f0b429' })
      plate.position.y = 0.9
      pin.group.add(plate)
      pin.plate = plate
    }
  }

  private buildAudit(): void {
    this.auditGeo = new THREE.BufferGeometry()
    this.auditGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(this.auditN * 3), 3))
    this.auditMat = new THREE.LineBasicMaterial({ color: 0x8eb4c8, transparent: true, opacity: 0.9 })
    const loop = new THREE.LineLoop(this.auditGeo, this.auditMat)
    loop.name = 'audit-wave'
    this.auditWave = loop
    this.auditRing = new THREE.Mesh(
      new THREE.TorusGeometry(21, 0.22, 10, 160),
      new THREE.MeshBasicMaterial({ color: 0x5eead4, transparent: true, opacity: 0.5, toneMapped: false, depthWrite: false }),
    )
    this.auditRing.rotation.x = Math.PI / 2
    this.auditRing.name = 'audit-ring'
    this.root.add(loop, this.auditRing)
    this.auditRing.visible = false
    this.auditWave.visible = false
  }

  renderInstrument(key: string, st: FeedStatus | undefined, v: FeedValues, _now: number): void {
    const inst = this.instruments.get(key)
    if (!inst || !st) return
    let value = 'not live'
    let detail = 'A reading that is not live is not shown.'
    if (liveOnly(st.state, 'live')) {
      value = '—'
      detail = ''
      if (key === 'weather' && v.weather) { value = `${Math.round(v.weather.tempC)} °C`; detail = `Wind ${Math.round(v.weather.windKmh)} km/h · observation ${v.weather.at.replace('T', ' ')} local` }
      if (key === 'river' && v.river) { value = v.river.levelM !== undefined ? `${v.river.levelM.toFixed(2)} m` : 'no level'; detail = `${v.river.dischargeM3s !== undefined ? `Discharge ${v.river.dischargeM3s.toFixed(1)} m³/s · ` : ''}provisional · ${v.river.at.slice(0, 16).replace('T', ' ')} UTC${v.river.lat === undefined ? ' · The gauge did not send a coordinate, so it is not pinned.' : ''}` }
      if (key === 'quakes' && v.quakes) { value = `${v.quakes.count} quakes`; detail = v.quakes.strongest ? `Strongest M${v.quakes.strongest.mag.toFixed(1)} · ${v.quakes.strongest.place}` : '' }
      if (key === 'iss' && v.iss) { value = `${Math.round(v.iss.altKm)} km up`; detail = `${v.iss.lat.toFixed(1)}°, ${v.iss.lon.toFixed(1)}° · ${Math.round(v.iss.speedKmh).toLocaleString('en-US')} km/h · ${v.iss.visibility}` }
      if (key === 'kp' && v.kp) { value = `Kp ${v.kp.kp.toFixed(1)}`; detail = `${v.kp.kp >= 5 ? 'Geomagnetic storm' : v.kp.kp >= 4 ? 'Active' : 'Quiet'} · ${v.kp.at.replace('T', ' ').slice(0, 16)} UTC · Not seated. A planetary index has no station.` }
      if (key === 'carbon' && v.carbon) { value = `${Math.round(v.carbon.intensity)} gCO₂/kWh`; detail = `Index ${v.carbon.index} · from ${v.carbon.from.replace('T', ' ').replace('Z', ' UTC')} · Seated on the United Kingdom label. The grid is national.` }
    }
    const alt = `${st.title}. ${st.state}. ${value}. ${detail}`
    if (alt === inst.alt) return
    const accent = st.state === 'LIVE' ? '#22c55e' : st.state === 'STALE' ? '#f59e0b' : st.state === 'PENDING' ? '#8eb4c8' : '#ef4444'
    if (inst.plate) { inst.group.remove(inst.plate); inst.plate.userData.dispose?.() }
    const plate = textPlate({ width: 8.2, title: `${st.title}`, lines: [`${value}`, detail || (st.state === 'UNAVAILABLE' ? `Source did not answer${st.lastError ? ` (${st.lastError})` : ''}; retrying with backoff.` : 'Waiting for first reading.'), `Source: ${st.source}`], accent, footer: st.state === 'LIVE' ? 'LIVE' : 'not live' })
    plate.traverse(o => { o.userData.pick = { kind: 'feed', key } })
    inst.group.add(plate)
    inst.plate = plate
    inst.alt = alt
    const beacon = inst.group.getObjectByName('beacon') as THREE.Mesh | undefined
    if (beacon) {
      const bm = beacon.material as THREE.MeshStandardMaterial
      bm.color.set(accent)
      bm.emissive.set(accent)
      bm.emissiveIntensity = st.state === 'LIVE' ? 2.4 : st.state === 'STALE' ? 0.9 : 0.25
    }
    inst.state = st.state
    inst.rendered = _now
    let live = 0
    for (const row of this.instruments.values()) if (row.state === 'LIVE') live += 1
    this.auditLive = live
  }

  galaxyWords(): string {
    return this.galaxy.words()
  }

  galaxyBand(): string[] {
    return this.galaxy.band()
  }

  galaxyAnchor(): THREE.Vector3 {
    return this.galaxy.root.getWorldPosition(new THREE.Vector3())
  }

  sceneText(): string {
    return [...this.instruments.values()].map(i => i.alt).filter(Boolean).join(' ')
  }

  instrumentAge(key: string): number {
    return this.instruments.get(key)?.rendered ?? 0
  }

  /** The welcome is one picture, cut into three planes by brightness. A dark pixel is on none. */
  layHologram(video: HTMLVideoElement): () => void {
    this.clearHologram()
    const map = new THREE.VideoTexture(video)
    map.colorSpace = THREE.SRGBColorSpace
    map.minFilter = THREE.LinearFilter
    map.magFilter = THREE.LinearFilter
    map.generateMipmaps = false
    const group = new THREE.Group()
    group.name = 'hologram'
    for (const band of HOLO) {
      const plate = new THREE.Mesh(
        new THREE.PlaneGeometry(3.2, 1.8),
        new THREE.ShaderMaterial({
          uniforms: {
            map: { value: map },
            floorLuma: { value: OLED_FLOOR },
            lo: { value: band.lo },
            hi: { value: band.hi },
          },
          transparent: true,
          depthWrite: false,
          toneMapped: false,
          side: THREE.DoubleSide,
          vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
          fragmentShader: 'uniform sampler2D map; uniform float floorLuma; uniform float lo; uniform float hi; varying vec2 vUv; void main(){ vec4 c = texture2D(map, vUv); float y = dot(c.rgb, vec3(0.2126, 0.7152, 0.0722)); if (y <= floorLuma || y <= lo || y > hi) discard; gl_FragColor = vec4(c.rgb, 1.0); }',
        }),
      )
      plate.name = band.name
      plate.userData.depth = band.depth
      plate.userData.baseZ = -1.15 - (1 - band.depth) * 0.85
      plate.position.z = plate.userData.baseZ
      group.add(plate)
    }
    group.position.set(0, 1.7, -0.2)
    this.construct.add(group)
    this.hologram = group
    return () => this.clearHologram()
  }

  setHoloLook(look: Look): void {
    this.holoLook = look
  }

  private clearHologram(): void {
    if (!this.hologram) return
    this.construct.remove(this.hologram)
    let map: THREE.Texture | undefined
    for (const child of this.hologram.children) {
      const mesh = child as THREE.Mesh
      const mat = mesh.material as THREE.ShaderMaterial
      map = mat.uniforms?.map?.value as THREE.Texture | undefined
      mat.dispose()
      mesh.geometry.dispose()
    }
    map?.dispose()
    this.hologram = null
  }

  /** The unity ring hangs. A purity plate is not added beside it. */
  layPurity(_line: string): void {
    if (!this.purityPlate) return
    this.root.remove(this.purityPlate)
    this.purityPlate = null
    this.purityKey = ''
  }

  showDetail(_anchor: THREE.Vector3, _title: string, _lines: string[], _accent: string, _footer?: string): void {
    this.clearDetail()
  }

  /** The giant sun sprite is a lamp for the globe. The system sky draws its own sun. */
  lamp(on: boolean): void {
    this.sunSprite.visible = on
  }

  /** A soft gold ring that marks the chosen place. Replaces in-world text plates (the card carries the words). */
  mark(anchor: THREE.Vector3 | null): void {
    this.markerAt = anchor ? anchor.clone() : null
    this.marker.visible = !!anchor
  }

  clearDetail(): void {
    if (!this.detail) return
    this.root.remove(this.detail)
    this.detail.userData.dispose?.()
    this.detail = undefined
  }

  // ---------- per-frame ----------
  update(dt: number, t: number, camera: THREE.Camera, now: Date, reducedMotion: boolean): void {
    const ss = subsolar(now)
    latLonToVec(ss.lat, ss.lon, 1, this.sunDir).normalize()
    this.sunSprite.position.copy(this.sunDir).multiplyScalar(380)
    const sun = this.root.getObjectByName('sun') as THREE.DirectionalLight | undefined
    sun?.position.copy(this.sunDir).multiplyScalar(100)
    const motion = reducedMotion ? 0.15 : 1
    for (const m of this.pillars.values()) {
      const h = m.userData.targetHeight ?? 0.3
      m.scale.y += (h - m.scale.y) * Math.min(1, dt * 4)
      const cap = m.children[0] as THREE.Mesh
      cap.position.y = 1
      cap.scale.set(1, 1 / Math.max(0.05, m.scale.y), 1)
    }
    for (const g of this.sectorTokens.values()) g.children[0].rotation.y += dt * 0.6 * motion
    for (const g of this.chambers.values()) { const gl = g.getObjectByName('glyph'); if (gl) gl.rotation.y += dt * 0.5 * motion }
    this.universalCore.rotation.y += dt * 0.25 * motion
    this.root.traverse(o => { if (o.name === 'emblem') o.rotation.y += dt * 0.8 * motion })
    this.dclmCore.children.forEach(c => { if (c.userData.spin) { c.rotation.x += dt * c.userData.spin * motion; c.rotation.y += dt * c.userData.spin * 0.7 * motion } })
    this.construct.traverse(o => {
      const spin = o.userData.spin as number | undefined
      if (spin) o.rotation.y += dt * spin * motion
      const glide = o.userData.glide as number | undefined
      if (glide) o.position.z = Math.sin(t * glide * motion) * 2.4
      const frameAt = o.userData.frameAt as number | undefined
      if (frameAt !== undefined) {
        const n = Math.max(1, o.userData.frames as number)
        const on = boardClock(t * motion) % (n * 1.2) > frameAt * 1.2
        o.scale.setScalar(on ? 1 : 0.001)
      }
    })
    if (this.hologram) {
      for (const child of this.hologram.children) {
        const depth = child.userData.depth as number
        const shift = planeShift(reducedMotion ? { x: 0, y: 0 } : this.holoLook, depth)
        child.position.x = shift.x * 0.35
        child.position.y = shift.y * 0.35
        child.position.z = (child.userData.baseZ as number) ?? child.position.z
      }
    }
    this.dclmNodes.forEach(n => {
      const a = n.userData.phase + t * 0.4 * motion
      n.position.set(Math.cos(a) * 3.8, 21 + Math.sin(a * 2) * 0.5, Math.sin(a) * 3.8)
      n.rotation.y += dt
    })
    this.estates.rotation.y += dt * 0.05 * motion
    this.pipeMat.uniforms.uTime.value = t * motion
    for (const [, inst] of this.instruments) inst.group.visible = false
    for (const pin of this.offerPins.values()) pin.group.visible = false
    // quakes pulse
    for (let i = 0; i < this.quakes.count; i++) {
      const q = this.quakeData[i]
      latLonToVec(q.lat, q.lon, EARTH_R + 0.05, this.tmp)
      const s = (0.07 + (q.mag - 2.5) * 0.045) * (1 + 0.25 * Math.sin(t * 3 * motion + i))
      this.dummy.position.copy(this.tmp)
      this.dummy.scale.setScalar(Math.max(0.05, s))
      this.dummy.updateMatrix()
      this.quakes.setMatrixAt(i, this.dummy.matrix)
    }
    this.quakes.instanceMatrix.needsUpdate = true
    if (this.iss.visible) {
      this.iss.position.lerp(this.issTarget, Math.min(1, dt * 0.8))
      this.iss.lookAt(0, 0, 0)
    }
    // ---- folding: the far view shows the planet and the main holograms; detail unfolds as you approach ----
    const h = camera.position.length() - EARTH_R
    this.tier = tierOf(h)
    if (this.groundPin) this.groundPin.visible = this.tier === 'street'
    const fk = this.focusKind
    // Pillars belong to the cloud layer: they fold away at orbit (unless asked for) and again near the ground.
    const cosmos = this.tier === 'cosmic'
    if (cosmos) this.globe.rotation.y += dt * 0.05 * motion
    this.galaxy.step(dt, cosmos, reducedMotion)
    const atCore = camera.position.distanceTo(this.universalCore.position) < camera.position.distanceTo(this.construct.position)
    const fold = `${fk ?? ''}:${cosmos ? 1 : 0}:${atCore ? 1 : 0}`
    if (fold !== this.seenFold) {
      this.seenFold = fold
      this.unityRing.visible = !cosmos
      this.universalCore.visible = fk === 'universal' && atCore
      this.dclmCore.visible = fk === 'dclm'
      for (const node of this.dclmNodes) node.visible = fk === 'dclm'
      this.estates.visible = fk === 'estates'
      for (const o of this.hung) o.visible = o.name === 'kernel' ? fk === 'dclm' : o.name === 'rte' ? fk === 'rte' : fk === 'pipe'
      for (const chamber of this.chambers.values()) chamber.visible = !cosmos
      for (const m of this.pillars.values()) m.visible = fk === 'sector' || fk === 'jurisdiction'
      for (const g of this.sectorTokens.values()) g.visible = fk === 'sector'
      for (const m of this.canadaRings) m.visible = fk === 'canada'
      for (const [key, inst] of this.instruments) {
        inst.group.visible = this.seats.has(key) && fk === 'feed'
        if (inst.plate) inst.plate.visible = fk === 'feed' && inst.state !== 'PENDING'
        const b = inst.group.getObjectByName('beacon')
        if (b) b.visible = fk === 'feed' && inst.state === 'PENDING'
      }
    }
    if (fk === 'feed') {
      for (const inst of this.instruments.values()) {
        const b = inst.group.getObjectByName('beacon')
        if (b?.visible) b.rotation.y += dt * 0.9 * motion
      }
    }
    this.geo.update(camera, (camera as THREE.PerspectiveCamera).userData.lookAt ?? this.tmp.set(0, 0, 0), dt)
    if (this.markerAt) {
      const d = camera.position.distanceTo(this.markerAt)
      this.marker.position.copy(this.markerAt)
      this.marker.quaternion.copy(camera.quaternion)
      this.marker.scale.setScalar(Math.max(0.05, d * 0.035) * (1 + (reducedMotion ? 0 : 0.08 * Math.sin(t * 3))))
    }
    // Every extruded label turns (upright, yaw only) to face the visitor, so text never reads backwards.
    // Labels fold away with distance: big hub titles stay, small titles appear only when you are near them.
    if (!this.labels) {
      this.labels = []
      this.root.traverse(o => { if (o.name.startsWith('text:')) this.labels!.push(o) })
      for (const o of this.labels) {
        this.box.setFromObject(o).getSize(this.sz)
        this.labelSize.set(o, Math.min(this.sz.y, 2))
      }
    }
    for (const o of this.labels) {
      if (!o.parent) continue
      const size = this.labelSize.get(o) ?? 0.4
      const reach = size >= 0.6 ? 80 : size >= 0.36 ? 34 : 19
      o.getWorldPosition(this.wp)
      o.visible = camera.position.distanceTo(this.wp) < reach
      if (!o.visible) continue
      o.getWorldPosition(this.wp)
      const yaw = Math.atan2(camera.position.x - this.wp.x, camera.position.z - this.wp.z)
      this.qa.setFromAxisAngle(this.yAxis, yaw)
      o.parent.getWorldQuaternion(this.qb)
      o.quaternion.copy(this.qb.invert().multiply(this.qa))
    }
    if (this.detail) {
      // Camera-space placement: the slab always fits (≤ 42% of view width, ≤ 72% of height),
      // sits beside the subject (right on landscape, low on portrait) and floats with slight parallax.
      const cam = camera as THREE.PerspectiveCamera
      const w = 6.4
      const h = (this.detail.userData.height as number | undefined) ?? 4
      const d = 9
      const viewH = 2 * d * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2))
      const viewW = viewH * cam.aspect
      const portrait = cam.aspect < 0.9
      const scale = Math.min((viewW * (portrait ? 0.9 : 0.42)) / w, (viewH * (portrait ? 0.42 : 0.72)) / h)
      const offX = portrait ? 0 : viewW / 2 - (w * scale) / 2 - viewW * 0.04
      const offY = portrait ? -viewH / 2 + (h * scale) / 2 + viewH * 0.12 : viewH * 0.02
      const target = this.tmp.set(offX, offY, -d).applyMatrix4(cam.matrixWorld)
      if (!this.detail.userData.placed) { this.detail.position.copy(target); this.detail.userData.placed = true }
      else this.detail.position.lerp(target, Math.min(1, dt * (reducedMotion ? 30 : 6)))
      this.detail.scale.setScalar(scale)
      this.detail.quaternion.copy(cam.quaternion)
      if (!reducedMotion) this.detail.rotateY(portrait ? 0 : -0.12 + Math.sin(t * 0.6) * 0.015)
    }
  }
}
