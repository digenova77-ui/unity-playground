/** Three rings. The center is not a ring. A collapse is not forced. */

export const RINGS = [
  { name: 'DCLM', axis: 'x', binds: 'logic' },
  { name: 'Iris', axis: 'y', binds: 'truth' },
  { name: 'Twain', axis: 'z', binds: 'pragmatism' },
] as const

type P = readonly [number, number, number]

function balance(p: P): number {
  const m = [Math.abs(p[0]), Math.abs(p[1]), Math.abs(p[2])]
  const mean = (m[0] + m[1] + m[2]) / 3
  if (mean === 0) return 0
  return 1 - Math.sqrt(m.reduce((s, n) => s + (n - mean) ** 2, 0) / 3) / mean
}

export function collapse(candidates: readonly P[], binding = 0): P | null {
  const live = candidates.filter(p => p.every(n => n >= -1 && n <= 1 && Math.abs(n) >= binding))
  if (!live.length) return null
  return live.reduce((best, p) => {
    const score = balance(p) - balance(best)
    if (score > 0) return p
    if (score < 0) return best
    const strength = (q: P) => (Math.abs(q[0]) + Math.abs(q[1]) + Math.abs(q[2])) / 3
    return strength(p) > strength(best) ? p : best
  })
}

export function ringWords(): string {
  return 'There is no framework. DCLM binds logic. Iris binds truth. Twain binds pragmatism. These are three dimensions. The center is not a ring. If none pass, it does not collapse. The sequence is not a dimension. DCLM holds nothing.'
}
