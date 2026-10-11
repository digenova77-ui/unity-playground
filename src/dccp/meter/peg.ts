/** An idea sets off the locked gates. Each placed decision costs 1.
 * The probabilistic search has no held count and no dollar cost.
 * The manifesto seed backs the sequence. It does not price the solution.
 */

import { matrixForks } from '../law/matrix.ts'
import { COSMOGENESIS_SEED } from '../pipe/chain.ts'
import { seedDecision } from './seedgate.ts'

export function pegCost(idea: string): { rooted: boolean; gates: number; unit: 1; pegged: number; guesses: null; dollars: null; backing: typeof COSMOGENESIS_SEED } {
  const seeded = seedDecision(idea)
  const gates = matrixForks().length
  return {
    rooted: seeded.rooted,
    gates,
    unit: 1,
    pegged: seeded.rooted ? gates : 0,
    guesses: null,
    dollars: null,
    backing: COSMOGENESIS_SEED,
  }
}

export function pegWords(idea: string): string {
  const row = pegCost(idea)
  const start = row.rooted
    ? `The idea sets off the sequence. ${row.gates} gates lock.`
    : 'No idea was given, so the sequence does not start.'
  return `${start} Each placed decision spends ${row.unit}. The pegged cost is ${row.pegged}. A probabilistic search has no held number of tries and no dollar cost, so that side is empty. Unity offers the peg, not the guess. The manifesto seed ${row.backing} backs the sequence. It does not price the solution. The till is closed.`
}
