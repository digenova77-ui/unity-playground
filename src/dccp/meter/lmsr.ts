/** Hanson's logarithmic market maker, as arithmetic.
 * The live book is closed. The till takes nothing.
 */

function stable(q: readonly number[], b: number): { max: number; sum: number } | null {
  if (!(b > 0) || q.length < 2 || q.some(x => !Number.isFinite(x))) return null
  let max = -Infinity
  for (const x of q) max = Math.max(max, x / b)
  let sum = 0
  for (const x of q) sum += Math.exp(x / b - max)
  return { max, sum }
}

export function cost(q: readonly number[], b = 1): number | null {
  const s = stable(q, b)
  if (!s) return null
  return b * (s.max + Math.log(s.sum))
}

export function prices(q: readonly number[], b = 1): number[] | null {
  const s = stable(q, b)
  if (!s) return null
  return q.map(x => Math.exp(x / b - s.max) / s.sum)
}

export function worstLoss(n: number, b = 1): number | null {
  if (!Number.isInteger(n) || n < 2 || !(b > 0)) return null
  return b * Math.log(n)
}

export function settle(quantities: readonly number[], paid: number, winner: number): { pays: number; maker: number } | null {
  if (!Number.isInteger(winner) || winner < 0 || winner >= quantities.length || !Number.isFinite(paid)) return null
  const pays = quantities[winner]
  if (!Number.isFinite(pays) || pays < 0) return null
  return { pays, maker: paid - pays }
}

export function worked(n: number, b = 1): { paid: number; price: number[]; bound: number; settlements: { outcome: number; pays: number; maker: number }[] } | null {
  if (cost(Array(n).fill(0), b) === null) return null
  let q = Array(n).fill(0)
  let paid = 0
  for (const step of [[1, 0], [1, 0], [0, 1]]) {
    const next = q.map((x, i) => x + (step[i] ?? 0))
    const before = cost(q, b)
    const after = cost(next, b)
    if (before === null || after === null) return null
    paid += after - before
    q = next
  }
  const price = prices(q, b)
  const bound = worstLoss(n, b)
  if (!price || bound === null) return null
  const settlements = q.map((_, outcome) => {
    const row = settle(q, paid, outcome)
    return { outcome, pays: row?.pays ?? 0, maker: row?.maker ?? 0 }
  })
  return { paid, price, bound, settlements }
}

export function liveBook(): { open: false; taken: 0 } {
  return { open: false, taken: 0 }
}

export function outcomeWords(): string {
  const two = worked(2)
  const three = worked(3)
  const five = worked(5)
  if (!two || !three || !five) return 'The book could not be defined.'
  return `The cost function is defined for any number of outcomes of two or more. A two-outcome book, a three-outcome book, and a five-outcome book were checked. After two shares of the first outcome and one of the second, the takings are ${two.paid.toFixed(3)}, ${three.paid.toFixed(3)}, and ${five.paid.toFixed(3)}. The maker's bound is the depth times the log of the number of outcomes. The live book is closed. The till takes nothing and pays nothing.`
}
