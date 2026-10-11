/** The circuit is the idea in and the result out.
 * The price sits on the result. No result, no price.
 * eFuse does not move. The count is not a dollar.
 */

import { matrixForks } from '../law/matrix.ts'
import { pegCost } from './peg.ts'
import { ringSeries } from './ringfuse.ts'
import { seedDecision } from './seedgate.ts'

export function resultPrice(result: string): number | null {
  const named = result.trim()
  if (!named) return null
  const rings = ringSeries()
  if (Array.isArray(rings)) {
    const hit = rings.find(row => row.id === named)
    if (hit) return hit.cost
  }
  const forks = matrixForks()
  if (forks.length && named === forks.map(fork => fork.decision).join(' ')) return forks.length
  return null
}

export function ideaCircuit(idea: string, result: string): { inlet: 'idea'; outlet: 'result' | null; price: number | null; next: number | null; keptGoing: false; dollars: null; efuseMoves: false; closed: boolean } {
  const seeded = seedDecision(idea)
  const price = seeded.rooted ? resultPrice(result) : null
  return { inlet: 'idea', outlet: price === null ? null : 'result', price, next: price === null ? null : 1, keptGoing: false, dollars: null, efuseMoves: false, closed: price !== null }
}

export function ideaCircuitWords(idea: string, result: string): string {
  const row = ideaCircuit(idea, result)
  const gates = pegCost(idea).gates
  const live = row.closed ? `This result closes it. The price is ${row.price}. The next is +${row.next}. To keep going you make a new decision. That decision needs a new idea, built on this result. The same idea does not seed it.` : 'No result is on the outlet, so the circuit stays open and the price is empty. There is no next to consider.'
  return `The circuit is the idea in and the result out. The price is tied to the result, not to the idea alone. One ring, if that is the result, is 1. A pair is 4. All three rings are 9. The locked gates, if that is the result, are ${gates}. ${live} It is not a dollar. eFuse does not move. Worth is not settled. The till is closed.`
}

export function nextFrom(idea: string, result: string, fresh: string): { rooted: boolean; unit: 0 | 1; price: number | null; builtOn: string | null } {
  const row = ideaCircuit(idea, result)
  const seed = fresh.trim().replace(/\s+/g, ' ')
  const same = seed.toLowerCase() === idea.trim().replace(/\s+/g, ' ').toLowerCase()
  const base = result.trim().toLowerCase()
  const carries = base.length > 0 && seed.toLowerCase().includes(base)
  if (!row.closed || seed.length < 2 || same || !carries || !seedDecision(seed).rooted) return { rooted: false, unit: 0, price: row.price, builtOn: null }
  return { rooted: true, unit: 1, price: row.price, builtOn: result.trim() }
}

