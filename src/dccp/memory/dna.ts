/** Silicon pool from MEMORY-3D (Drive, ARCHITECTURE.md, 2026-10-05).
 * prototype.py was not in Drive. The wet lab and the octree are not in this file.
 * A second write of the same bytes is an alias. It is not a rewrite.
 */

const NT = ['A', 'C', 'G', 'T'] as const
const K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
]

const rotr = (x: number, n: number): number => (x >>> n) | (x << (32 - n))

export function sha256(bytes: Uint8Array): Uint8Array {
  const bitLen = bytes.length * 8
  const withOne = bytes.length + 1
  const zeros = (64 - ((withOne + 8) % 64)) % 64
  const buf = new Uint8Array(withOne + zeros + 8)
  buf.set(bytes)
  buf[bytes.length] = 0x80
  const view = new DataView(buf.buffer)
  view.setUint32(buf.length - 4, bitLen, false)
  const w = new Uint32Array(64)
  let a0 = 0x6a09e667, b0 = 0xbb67ae85, c0 = 0x3c6ef372, d0 = 0xa54ff53a
  let e0 = 0x510e527f, f0 = 0x9b05688c, g0 = 0x1f83d9ab, h0 = 0x5be0cd19
  for (let i = 0; i < buf.length; i += 64) {
    for (let t = 0; t < 16; t++) w[t] = view.getUint32(i + t * 4, false)
    for (let t = 16; t < 64; t++) {
      const s0 = rotr(w[t - 15], 7) ^ rotr(w[t - 15], 18) ^ (w[t - 15] >>> 3)
      const s1 = rotr(w[t - 2], 17) ^ rotr(w[t - 2], 19) ^ (w[t - 2] >>> 10)
      w[t] = (w[t - 16] + s0 + w[t - 7] + s1) >>> 0
    }
    let a = a0, b = b0, c = c0, d = d0, e = e0, f = f0, g = g0, h = h0
    for (let t = 0; t < 64; t++) {
      const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)
      const ch = (e & f) ^ (~e & g)
      const t1 = (h + S1 + ch + K[t] + w[t]) >>> 0
      const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)
      const maj = (a & b) ^ (a & c) ^ (b & c)
      const t2 = (S0 + maj) >>> 0
      h = g; g = f; f = e; e = (d + t1) >>> 0; d = c; c = b; b = a; a = (t1 + t2) >>> 0
    }
    a0 = (a0 + a) >>> 0; b0 = (b0 + b) >>> 0; c0 = (c0 + c) >>> 0; d0 = (d0 + d) >>> 0
    e0 = (e0 + e) >>> 0; f0 = (f0 + f) >>> 0; g0 = (g0 + g) >>> 0; h0 = (h0 + h) >>> 0
  }
  const out = new Uint8Array(32)
  const o = new DataView(out.buffer)
  ;[a0, b0, c0, d0, e0, f0, g0, h0].forEach((n, i) => o.setUint32(i * 4, n, false))
  return out
}

function bitsToDna(bytes: Uint8Array): string {
  let out = ''
  for (const byte of bytes) {
    for (let shift = 6; shift >= 0; shift -= 2) out += NT[(byte >> shift) & 3]
  }
  return out
}

export function strandOf(bytes: Uint8Array): string {
  return bitsToDna(bytes)
}

/** Antiparallel. A pairs T. C pairs G. The reverse is the direction. */
export function complementStrand(bases: string): string {
  let out = ''
  for (let i = bases.length - 1; i >= 0; i--) {
    const base = bases[i]
    out += base === 'A' ? 'T' : base === 'T' ? 'A' : base === 'C' ? 'G' : base === 'G' ? 'C' : ''
  }
  return out
}

export function quantAxis(value: number): number {
  const clamped = Math.min(1, Math.max(-1, value))
  return Math.round(((clamped + 1) / 2) * 65535)
}

export function coordToPrefix(x: number, y: number, z: number): string {
  let out = ''
  for (const axis of [x, y, z]) {
    const q = quantAxis(axis)
    for (let shift = 14; shift >= 0; shift -= 2) out += NT[(q >> shift) & 3]
  }
  return out
}

export function prefixToCoord(prefix: string): [number, number, number] {
  const axes: number[] = []
  for (let axis = 0; axis < 3; axis++) {
    let q = 0
    for (let i = 0; i < 8; i++) q = (q << 2) | NT.indexOf(prefix[axis * 8 + i] as 'A')
    axes.push((q / 65535) * 2 - 1)
  }
  return axes as [number, number, number]
}

export function fingerprintOf(bytes: Uint8Array): string {
  return bitsToDna(sha256(bytes))
}

interface Molecule {
  fingerprint: string
  payload: Uint8Array
  aliases: { prefix: string }[]
  type: string
  provenance: string
}

export interface ShownPipe {
  data: Uint8Array
  x: number
  y: number
  z: number
  type?: string
  provenance?: string
}

export interface MachinePipe {
  fingerprint: string
  holds: 'nothing'
}

export function machinePipe(data: Uint8Array): MachinePipe {
  return { fingerprint: fingerprintOf(data), holds: 'nothing' }
}

export class DnaPool {
  private molecules = new Map<string, Molecule>()
  private tick = 0

  store(shown: ShownPipe, machine: MachinePipe | null): { key: string; aliased: boolean; duplicate: boolean; rewritten: false; molecules: number } | { refused: string; rewritten: false } {
    if (!machine) return { refused: 'One pipe is not a write. Both pipes have to name it.', rewritten: false }
    if (machine.holds !== 'nothing') return { refused: 'The machine pipe holds nothing. Nothing was written.', rewritten: false }
    const fingerprint = fingerprintOf(shown.data)
    if (machine.fingerprint !== fingerprint) return { refused: 'The pipes do not name the same bytes. Nothing was written.', rewritten: false }
    const prefix = coordToPrefix(shown.x, shown.y, shown.z)
    const prior = this.molecules.get(fingerprint)
    if (prior) {
      if (prior.aliases.some(alias => alias.prefix === prefix)) {
        return { key: prefix + fingerprint, aliased: false, duplicate: true, rewritten: false, molecules: this.molecules.size }
      }
      prior.aliases.push({ prefix })
      return { key: prefix + fingerprint, aliased: true, duplicate: false, rewritten: false, molecules: this.molecules.size }
    }
    this.tick += 1
    this.molecules.set(fingerprint, { fingerprint, payload: shown.data.slice(), aliases: [{ prefix }], type: shown.type ?? 'BLOB', provenance: shown.provenance ?? 'held' })
    return { key: prefix + fingerprint, aliased: false, duplicate: false, rewritten: false, molecules: this.molecules.size }
  }

  retrieve(key: string): { payload: Uint8Array; type: string } | null {
    const fingerprint = key.length === 152 ? key.slice(24) : key.length === 128 ? key : ''
    const row = fingerprint ? this.molecules.get(fingerprint) : undefined
    if (!row) return null
    if (fingerprintOf(row.payload) !== row.fingerprint) throw new Error('The fingerprint does not match. The read was refused.')
    return { payload: row.payload, type: row.type }
  }

  stats(): { molecules: number; tick: number } {
    return { molecules: this.molecules.size, tick: this.tick }
  }

  placed(): { payload: Uint8Array; type: string; provenance: string; places: [number, number, number][] }[] {
    return [...this.molecules.values()].map(row => ({
      payload: row.payload,
      type: row.type,
      places: row.aliases.map(alias => prefixToCoord(alias.prefix)),
      provenance: row.provenance,
    }))
  }
}

export function strandNext(bases: string): { next: 1; broken: false } | { next: null; broken: true } {
  if (bases.length === 0 || [...bases].some(base => !NT.includes(base as (typeof NT)[number]))) return { next: null, broken: true }
  if (complementStrand(bases).length !== bases.length) return { next: null, broken: true }
  return { next: 1, broken: false }
}

export function strandNextWords(bases: string): string {
  const row = strandNext(bases)
  return row.broken
    ? 'The DNA broke down. There is no next. The step is not taken. The price is not changed. The till is closed.'
    : 'The strand holds. The next is +1. It stays +1 until the DNA breaks down. Then there is no next. The price is not changed. The till is closed.'
}

export function dnaWords(): string {
  return 'The 3D DNA memory is the silicon pool from the architecture filed today. A write takes both pipes. The shown side carries the bytes and the place. The machine names the same fingerprint and holds nothing. One pipe does not write. A mismatch does not write. The same bytes at the same place are not stored again. The same bytes at a new place are an alias, not a rewrite. An unknown key reads as nothing. The wet lab is not built. The octree from the prototype is not in this file, because that file was not in Drive.'
}
