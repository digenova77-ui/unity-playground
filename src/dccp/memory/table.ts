/** A result is a double helix in the silicon pool. One row is one rung.
 * The sense strand carries the bytes. The other strand is the complement, opposite and reversed.
 * Laying the same row again is an alias, not a second helix.
 */

import { DnaPool, complementStrand, machinePipe, sha256, strandOf } from './dna.ts'

export interface MemoryRow {
  what: string
  now: string
}

export function tablePlane(name: string): number {
  const digest = sha256(new TextEncoder().encode(name))
  return ((digest[0] * 256 + digest[1]) / 65535) * 2 - 1
}

export function rowPlace(name: string, index: number, count: number): { x: number; y: number; z: number } {
  const n = Math.max(count, 1)
  const theta = (index / n) * Math.PI * 2
  const radius = 0.3 + 0.25 * ((tablePlane(name) + 1) / 2)
  const pitch = n <= 1 ? 0 : 0.8 / (n - 1)
  const z = Math.min(1, Math.max(-1, tablePlane(name) * 0.15 + (index - (n - 1) / 2) * pitch))
  return { x: radius * Math.cos(theta), y: radius * Math.sin(theta), z }
}

export function pairPlace(place: { x: number; y: number; z: number }): { x: number; y: number; z: number } {
  return { x: -place.x, y: -place.y, z: place.z }
}

function rowBytes(row: MemoryRow): Uint8Array {
  return new TextEncoder().encode(JSON.stringify({ now: row.now, what: row.what }))
}

export function layTable(pool: DnaPool, name: string, rows: readonly MemoryRow[]): { name: string; keys: string[]; molecules: number } | { refused: string } {
  if (!name.trim() || rows.length === 0) return { refused: 'A table needs a name and a row.' }
  const keys: string[] = []
  for (let index = 0; index < rows.length; index++) {
    const row = rows[index]
    if (!row.what.trim() || !row.now.trim()) return { refused: 'A row needs a what and a now. Nothing past it was written.' }
    const data = rowBytes(row)
    const place = rowPlace(name, index, rows.length)
    const kept = pool.store({ data, ...place, type: 'TABLE', provenance: name }, machinePipe(data))
    if ('refused' in kept) return kept
    const other = new TextEncoder().encode(complementStrand(strandOf(data)))
    const paired = pool.store({ data: other, ...pairPlace(place), type: 'COMPLEMENT', provenance: name }, machinePipe(other))
    if ('refused' in paired) return paired
    keys.push(kept.key)
  }
  return { name, keys, molecules: pool.stats().molecules }
}

export function readTable(pool: DnaPool, name: string): MemoryRow[] {
  const found: { z: number; row: MemoryRow }[] = []
  const seen = new Set<string>()
  for (const entry of pool.placed()) {
    if (entry.type !== 'TABLE' || entry.provenance !== name) continue
    for (const [, , z] of entry.places) {
      const parsed = JSON.parse(new TextDecoder().decode(entry.payload)) as MemoryRow
      const id = `${parsed.what}`
      if (seen.has(id)) continue
      seen.add(id)
      found.push({ z, row: { what: parsed.what, now: parsed.now } })
    }
  }
  found.sort((a, b) => a.z - b.z)
  return found.map(item => item.row)
}

export const RINGS: readonly MemoryRow[] = [
  { what: 'DCLM', now: 'Binds logic, on x.' },
  { what: 'Iris', now: 'Binds truth, on y.' },
  { what: 'Twain', now: 'Binds pragmatism, on z.' },
]

export const DECISIONS: readonly MemoryRow[] = [
  { what: 'One known key', now: 'Size 1, complexity 1, decisions 1.' },
  { what: 'Two keys fused', now: 'Size 2, complexity 1, decisions 2.' },
  { what: 'A decision count', now: 'Size times complexity. A count that does not match is refused.' },
  { what: 'Next step', now: 'One decision past what exists.' },
  { what: 'Completion key', now: 'Not named until the project size and complexity are held.' },
  { what: 'A medical simulation', now: 'One object. A run, an arm, and a subject are not a decision.' },
]

export const MEMORY: readonly MemoryRow[] = [
  { what: 'A record', now: 'A place, a minute, and a source. If one is missing, it is not a record.' },
  { what: 'A write', now: 'Both pipes. One pipe does not write.' },
  { what: 'The same bytes again', now: 'The same molecule. The new place is an alias.' },
  { what: 'A DNA key', now: '24 nucleotides for the place, 128 for the bytes, 152 together.' },
  { what: 'An added layer', now: 'Named by both pipes, once, at the same place. A repeat is not a new layer. 2P5L is two pipes and five layers. The fifth is nothing.' },
]

export function heldTables(): { name: string; rows: readonly MemoryRow[] }[] {
  return [
    { name: 'rings', rows: RINGS },
    { name: 'decisions', rows: DECISIONS },
    { name: 'memory', rows: MEMORY },
  ]
}

export function openTables(): { pool: DnaPool; speech: string } {
  const pool = new DnaPool()
  for (const table of heldTables()) {
    const laid = layTable(pool, table.name, table.rows)
    if ('refused' in laid) return { pool, speech: laid.refused }
  }
  const before = pool.stats().molecules
  for (const table of heldTables()) layTable(pool, table.name, table.rows)
  const after = pool.stats().molecules
  return {
    pool,
    speech: `${after} molecules, the same ${before}. A repeat is not stored.`,
  }
}
