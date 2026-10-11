/** Cut a finite span in half. The other pipe sees the same cuts. The next step is not guessed into existence. */

export interface HalfCut {
  at: number
  left: number
  guess: 'not the next'
}

export function halve(span: number, limit = 8): { cuts: HalfCut[]; left: number; forever: false; proved: false; both: true } {
  let left = Math.max(0, Math.floor(span))
  const cap = Math.max(0, Math.min(32, Math.floor(limit)))
  const cuts: HalfCut[] = []
  for (let i = 0; i < cap && left > 1; i += 1) {
    const at = Math.floor(left / 2)
    left -= at
    cuts.push({ at, left, guess: 'not the next' })
  }
  return { cuts, left, forever: false, proved: false, both: true }
}

export function halveWords(span: number): string {
  const row = halve(span)
  const audit = halve(span)
  const same = row.cuts.length === audit.cuts.length && row.left === audit.left
  return `A decision can be cut in half, then in half again. ${row.cuts.length} cuts were made on a finite span, and ${row.left} remains. The other pipe ran the same cuts. ${same ? 'The two pipes match.' : 'The two pipes do not match.'} The guess at each cut is not the next. This does not run forever. It does not say the playground is shrinking, and it does not say the universe is expanding. Those papers are not on this device. Whether logic outweighs illogic was not measured. The till is closed. Both halves name this.`
}
