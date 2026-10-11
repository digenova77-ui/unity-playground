/** The Unity ID is the bind. It is not a layer of the old desk or of this page.
 * Two 32-bit halves meet here, and only here. The insula fuses them. It stores nothing.
 */

export const ABSTRACT_LINE = 'The Unity ID is the bind. It is not a layer of either desk. Joining costs 0. You can leave. More is not unlocked.'

export function abstractSeat(): {
  kind: 'abstract'
  layer: false
  cost: 0
  leave: true
  unlock: false
  rank: null
  course: null
  both: true
} {
  return { kind: 'abstract', layer: false, cost: 0, leave: true, unlock: false, rank: null, course: null, both: true }
}

/** The sentence on the HUD and the wallet. An open layer is not this seat. */
export function abstractLine(): string {
  const row = abstractSeat()
  if (row.layer !== false || row.both !== true) return ''
  return ABSTRACT_LINE
}

function uint32(n: number): boolean {
  return Number.isInteger(n) && n >= 0 && n <= 0xffffffff
}

/** One half is written. The other half is the audit, and it is not a copy.
 * The insula returns the 64-bit word and holds nothing.
 */
export function insulaFuse(low: number, high: number, seated: boolean):
  | { word: bigint; holds: 'nothing'; layer: false; one: number; two: number; beats: readonly [1, 2] }
  | { refused: string } {
  const seat = abstractSeat()
  if (seat.layer !== false || seat.both !== true) return { refused: 'The abstract is not the Unity ID. Nothing was fused.' }
  if (!seated) return { refused: 'No Unity ID. The halves do not meet.' }
  if (!uint32(low) || !uint32(high)) return { refused: 'A half is not 32 bits. Nothing was fused.' }
  if ((low >>> 0) === (high >>> 0)) return { refused: 'The two halves are copies. A two is not two copies.' }
  return {
    word: (BigInt(high >>> 0) << 32n) | BigInt(low >>> 0),
    holds: 'nothing',
    layer: false,
    one: low >>> 0,
    two: high >>> 0,
    beats: [1, 2],
  }
}

/** The other pipe. It recomputes the fusion. It stores nothing. */
export function auditFuse(low: number, high: number, seated: boolean, claimed: bigint): { holds: 'nothing'; ok: boolean } {
  const row = insulaFuse(low, high, seated)
  if ('refused' in row) return { holds: 'nothing', ok: false }
  return { holds: 'nothing', ok: row.word === claimed }
}

function hash32(text: string): number {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** The held fact is not made from the claim. A match is truth. A clash is a lie. Nothing held stays open. */
export function tell(claim: string, held: string | null):
  | { verdict: 'truth'; holds: 'nothing' }
  | { verdict: 'lie'; holds: 'nothing' }
  | { verdict: 'open'; holds: 'nothing' } {
  if (held === null || held.trim() === '') return { verdict: 'open', holds: 'nothing' }
  if (claim.trim() !== held.trim()) return { verdict: 'lie', holds: 'nothing' }
  return { verdict: 'truth', holds: 'nothing' }
}

/** Iris owns a line only when it matches a fact that was not made from the line. */
export function irisInner(line: string, held: string | null):
  | { owned: true; speech: string; word: bigint; holds: 'nothing'; beats: readonly [1, 2]; verdict: 'truth' }
  | { owned: false; speech: ''; refused: string; verdict: 'lie' | 'open' } {
  const verdict = tell(line, held)
  if (verdict.verdict !== 'truth' || held === null) {
    return {
      owned: false,
      speech: '',
      refused: verdict.verdict === 'lie' ? 'The line does not match what is held.' : 'A missing fact stays open.',
      verdict: verdict.verdict === 'lie' ? 'lie' : 'open',
    }
  }
  return { owned: true, speech: held.trim(), word: BigInt(hash32(held.trim())), holds: 'nothing', beats: [1, 2], verdict: 'truth' }
}

export function abstractWords(): string {
  const row = abstractSeat()
  return `${ABSTRACT_LINE} A rank of this HUD is ${row.rank}. A path toward self-realization is a name. It is not a result. A course is ${row.course}. The till is closed. Both halves name this.`
}
