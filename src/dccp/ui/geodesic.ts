/** One shell. Turn it. The name in front is the control, and nothing opens until that name is pressed. */

export interface GeoFace {
  id: string
  label: string
  attr: 't' | 'p'
}

export const CONTROL_FACES: readonly GeoFace[] = [
  { id: 'mic', label: 'Mic', attr: 't' },
  { id: 'sound', label: 'Sound', attr: 't' },
  { id: 'haptics', label: 'Haptics', attr: 't' },
  { id: 'reducedMotion', label: 'Still', attr: 't' },
  { id: 'transcript', label: 'Talk', attr: 't' },
  { id: 'atlas', label: 'Atlas', attr: 'p' },
  { id: 'profile', label: 'Profile', attr: 'p' },
  { id: 'wallet', label: 'Wallet', attr: 'p' },
  { id: 'home', label: 'Home', attr: 'p' },
  { id: 'here', label: 'Here', attr: 'p' },
  { id: 'system', label: 'System', attr: 'p' },
  { id: 'resources', label: 'Needs', attr: 'p' },
  { id: 'watch', label: 'Watch', attr: 'p' },
  { id: 'nutrition', label: 'Food', attr: 'p' },
  { id: 'face', label: 'Face', attr: 'p' },
  { id: 'guide', label: 'Guide', attr: 'p' },
  { id: 'chain', label: 'Chain', attr: 'p' },
  { id: 'story', label: 'Story', attr: 'p' },
  { id: 'fusion', label: 'Fusion', attr: 'p' },
  { id: 'cards', label: 'Cards', attr: 'p' },
]

const PHI = (1 + Math.sqrt(5)) / 2
const RAW = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
]
const VERTS = RAW.map(v => {
  const l = Math.hypot(v[0], v[1], v[2])
  return [v[0] / l, v[1] / l, v[2] / l]
})
const INDEX = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
]

const EDGES: [number, number][] = (() => {
  const seen = new Set<string>()
  const edges: [number, number][] = []
  for (const [a, b, c] of INDEX) {
    for (const pair of [[a, b], [b, c], [c, a]] as [number, number][]) {
      const lo = Math.min(pair[0], pair[1])
      const hi = Math.max(pair[0], pair[1])
      const key = `${lo}-${hi}`
      if (seen.has(key)) continue
      seen.add(key)
      edges.push([lo, hi])
    }
  }
  return edges
})()

const WORD: Record<string, string> = {
  mic: 'Microphone', sound: 'Sound', haptics: 'Haptics', reducedMotion: 'Stillness',
  transcript: 'Transcript', atlas: 'Atlas', profile: 'Profile', wallet: 'Wallet',
  home: 'Home', here: 'Land here', system: 'System', resources: 'Needs',
  watch: 'Watch', nutrition: 'Food', face: 'Face', guide: 'Guide',
  chain: 'Chain', story: 'Story', fusion: 'Fusion', cards: 'Cards',
}

export interface SolidFace {
  label: string
  id: string | null
  attr: 't' | 'p' | null
  normal: [number, number, number]
  matrix: string
}

function faceNormal(i: number): [number, number, number] {
  const [a, b, c] = INDEX[i]
  const x = VERTS[a][0] + VERTS[b][0] + VERTS[c][0]
  const y = VERTS[a][1] + VERTS[b][1] + VERTS[c][1]
  const z = VERTS[a][2] + VERTS[b][2] + VERTS[c][2]
  const l = Math.hypot(x, y, z) || 1
  return [x / l, y / l, z / l]
}

function matrixToward(n: [number, number, number], radius: number): string {
  const [x, y, z] = n
  let qx = 0, qy = 0, qz = 0, qw = 1
  if (z < 0.9999) {
    if (z < -0.9999) { qx = 1; qw = 0 }
    else {
      const ax = -y, ay = x
      const len = Math.hypot(ax, ay) || 1
      const ang = Math.acos(Math.max(-1, Math.min(1, z)))
      const s = Math.sin(ang / 2) / len
      qx = ax * s
      qy = ay * s
      qw = Math.cos(ang / 2)
    }
  }
  const xx = qx * qx, yy = qy * qy, zz = qz * qz
  const xy = qx * qy, xz = qx * qz, yz = qy * qz
  const wx = qw * qx, wy = qw * qy, wz = qw * qz
  const m00 = 1 - 2 * (yy + zz)
  const m01 = 2 * (xy - wz)
  const m02 = 2 * (xz + wy)
  const m10 = 2 * (xy + wz)
  const m11 = 1 - 2 * (xx + zz)
  const m12 = 2 * (yz - wx)
  const m20 = 2 * (xz - wy)
  const m21 = 2 * (yz + wx)
  const m22 = 1 - 2 * (xx + yy)
  return `matrix3d(${m00},${m10},${m20},0,${m01},${m11},${m21},0,${m02},${m12},${m22},0,${n[0] * radius},${n[1] * radius},${n[2] * radius},1)`
}

export function solidFaces(radius = 58): SolidFace[] {
  return INDEX.map((_, i) => {
    const face = CONTROL_FACES[i]
    const up = faceNormal(i)
    const normal: [number, number, number] = [up[0], -up[1], up[2]]
    return {
      label: face?.label ?? '',
      id: face?.id ?? null,
      attr: face?.attr ?? null,
      normal,
      matrix: matrixToward(normal, radius),
    }
  })
}

/** Degrees that turn the solid so this normal faces the camera. */
export function aimDegrees(n: [number, number, number]): { pitch: number; yaw: number } {
  const yaw = Math.atan2(-n[0], n[2])
  const z1 = -Math.sin(yaw) * n[0] + Math.cos(yaw) * n[2]
  const pitch = Math.atan2(n[1], z1)
  return { pitch: pitch * 180 / Math.PI, yaw: yaw * 180 / Math.PI }
}

function project(v: number[], yaw: number, pitch: number): { x: number; y: number; z: number } {
  const cy = Math.cos(yaw), sy = Math.sin(yaw)
  const x1 = cy * v[0] + sy * v[2]
  const z1 = -sy * v[0] + cy * v[2]
  const cp = Math.cos(pitch), sp = Math.sin(pitch)
  const y2 = cp * v[1] - sp * z1
  const z2 = sp * v[1] + cp * z1
  return { x: x1, y: y2, z: z2 }
}

export interface GeoHandle {
  still(on: boolean): void
  front(): GeoFace
}

export function mountGeodesic(stage: HTMLElement, read: HTMLElement): GeoHandle {
  const faces = solidFaces()
  const canvas = document.createElement('canvas')
  canvas.className = 'geo-wire'
  canvas.width = 336
  canvas.height = 336
  stage.append(canvas)
  const open = document.createElement('button')
  open.type = 'button'
  open.className = 'geo-open'
  stage.append(open)
  const hidden = document.createElement('div')
  hidden.className = 'geo-keys'
  const buttons: HTMLButtonElement[] = []
  for (const face of CONTROL_FACES) {
    const b = document.createElement('button')
    b.type = 'button'
    b.className = 'geo-key'
    b.tabIndex = -1
    b.textContent = face.label
    if (face.attr === 't') b.dataset.t = face.id
    else b.dataset.p = face.id
    b.setAttribute('aria-pressed', 'false')
    hidden.append(b)
    buttons.push(b)
  }
  stage.append(hidden)
  const ctx = canvas.getContext('2d')!
  let index = 0
  const draw = (): void => {
    const aim = aimDegrees(faces[index].normal)
    const yaw = aim.yaw * Math.PI / 180
    const pitch = aim.pitch * Math.PI / 180
    const w = canvas.width
    const h = canvas.height
    ctx.clearRect(0, 0, w, h)
    const pts = VERTS.map(v => project([v[0], -v[1], v[2]], yaw, pitch))
    const scale = w * 0.34
    const at = (p: { x: number; y: number }): [number, number] => [w / 2 + p.x * scale, h / 2 + p.y * scale]
    for (const [a, b] of EDGES) {
      const pa = pts[a]
      const pb = pts[b]
      const depth = (pa.z + pb.z) / 2
      const [ax, ay] = at(pa)
      const [bx, by] = at(pb)
      ctx.beginPath()
      ctx.moveTo(ax, ay)
      ctx.lineTo(bx, by)
      ctx.strokeStyle = depth > 0 ? `rgba(94, 234, 212, ${0.35 + depth * 0.6})` : 'rgba(94, 234, 212, 0.16)'
      ctx.lineWidth = depth > 0 ? 2.4 : 1.2
      ctx.stroke()
    }
    const control = CONTROL_FACES[index]
    const name = WORD[control.id] ?? control.label
    open.textContent = name
    const pressed = buttons[index].getAttribute('aria-pressed') === 'true' || buttons[index].getAttribute('aria-expanded') === 'true'
    open.setAttribute('aria-pressed', String(pressed))
    read.textContent = pressed ? `${name} is on. Drag the shell to turn.` : 'Drag the shell. Press the name to open it.'
    stage.setAttribute('aria-label', `${name} is in front. Arrows turn the shell. Enter opens it.`)
  }
  const turn = (delta: number): void => {
    index = (index + delta + CONTROL_FACES.length) % CONTROL_FACES.length
    draw()
  }
  const invoke = (): void => { buttons[index]?.click(); draw() }
  open.addEventListener('click', e => { e.stopPropagation(); invoke() })
  let drag: { x: number; index: number } | null = null
  canvas.addEventListener('pointerdown', e => {
    drag = { x: e.clientX, index }
    canvas.setPointerCapture?.(e.pointerId)
  })
  canvas.addEventListener('pointermove', e => {
    if (!drag) return
    const steps = Math.round((e.clientX - drag.x) / 28)
    if (steps === 0) return
    index = (drag.index + steps + CONTROL_FACES.length * 8) % CONTROL_FACES.length
    draw()
  })
  canvas.addEventListener('pointerup', () => { drag = null })
  canvas.addEventListener('pointercancel', () => { drag = null })
  stage.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { turn(-1); e.preventDefault(); e.stopPropagation() }
    else if (e.key === 'ArrowRight') { turn(1); e.preventDefault(); e.stopPropagation() }
    else if (e.key === 'Enter') { invoke(); e.preventDefault(); e.stopPropagation() }
  })
  const observer = new MutationObserver(draw)
  for (const button of buttons) observer.observe(button, { attributes: true, attributeFilter: ['aria-pressed', 'aria-expanded'] })
  draw()
  return { still() {}, front: () => CONTROL_FACES[index] }
}
