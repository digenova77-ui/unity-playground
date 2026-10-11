/** The seed is your account. You can trade coins for a derivative of what somebody else found.
 * The find stays theirs. Nothing is seized. The return is booked back into the seed.
 * Test supply only. Not a security, and not a way out of a real liquidation.
 */

import { trickleAt } from './keys.ts'
import type { SolvedKey } from './keys.ts'
import { seedDecision } from './seedgate.ts'
import { deriveOnce } from '../unity/dry.ts'
import { tieObserver } from '../law/ask.ts'

export interface Derivative {
  id: string
  findId: string
  finder: 'bots'
  face: number
  cost: number
  takenOn: number
  /** The idea this derivative climbs back to. Null when none was given. */
  seed: string | null
}

/** One seat, one HUD, two ways to add one answer. No second HUD is copied. */
export function memberHud(handle: string | null): { observer: string | null; brighter: false; copied: false; words: string } {
  const seen = tieObserver(handle)
  const paths = 'Two ways add one answer. A bot can work it, and the key stays with the finder until they give it. Or the seat trades test coins for a derivative, and the find stays theirs. The HUD gains that answer. It does not gain the other seat\'s HUD. A purchase is not Merit. The till is closed.'
  if (!seen.observer) {
    return { observer: null, brighter: false, copied: false, words: `${seen.words} The world can be looked at. No answer is shown for a seat that is not here. ${paths}` }
  }
  return { observer: seen.observer, brighter: false, copied: false, words: `${seen.observer} explores the same world. The observer is that seat. The HUD shows only the answers this seat holds. There is no second, brighter HUD. ${paths}` }
}
export function keyPath(kind: 'work' | 'buy'): { path: 'work' | 'derivative'; findMoves: false; hudCopies: false; words: string } {
  if (kind === 'work') {
    return { path: 'work', findMoves: false, hudCopies: false, words: 'A bot can work the missing answer. If the key is found, it stays with the finder until they give it. Your HUD learns that answer. It does not become another HUD.' }
  }
  return { path: 'derivative', findMoves: false, hudCopies: false, words: 'You can trade test coins for a derivative of a key somebody else found. The find stays theirs. Your HUD gains that derivative, not their HUD. A purchase is not Merit. The till is closed.' }
}

export function liquidate(): { seized: false; reason: string } {
  return { seized: false, reason: 'The seed is not liquidated. A find is not seized. Coins move only if you choose to trade them for a derivative.' }
}

export function takeDerivative(supply: number, key: SolvedKey, shift: number, held: readonly Derivative[]): { supply: number; derivative: Derivative } | { error: string } {
  if (key.holder !== 'bots') return { error: 'That find is already yours. A derivative is of what somebody else found. The seed does not buy itself.' }
  if (held.some(row => row.findId === key.id)) return { error: 'The seed already holds a derivative of that find.' }
  if (supply < key.face) return { error: 'The seed does not have the coins. Nothing is liquidated. The find stays with whoever made it.' }
  return {
    supply: supply - key.face,
    derivative: { id: `derivative:${key.id}`, findId: key.id, finder: 'bots', face: key.face, cost: key.face, takenOn: shift, seed: null },
  }
}

/** The coins leave the seed and arrive in the finder's purse. A further derivative is the same claim. */
export function bookDerivative(
  doctor: number,
  bots: number,
  key: SolvedKey,
  shift: number,
  held: readonly Derivative[],
  idea: string,
  split: boolean,
): { doctor: number; bots: number; derivative: Derivative; words: string } | { error: string } {
  if (!split) return { error: 'The finder has no purse until the supply is split. Nothing moved.' }
  if (key.id.startsWith('derivative:')) return { error: 'A derivative of a derivative is the same claim. It is not a new result.' }
  const rooted = seedDecision(idea)
  if (!rooted.rooted) return { error: 'No idea was given, so the derivative has nothing to climb back to. Nothing moved.' }
  const layer = deriveOnce([{ id: key.id, claim: key.claim }])
  if (layer.length !== 1) return { error: 'Nothing further is a derivative of the last result.' }
  const taken = takeDerivative(doctor, key, shift, held)
  if ('error' in taken) return taken
  const nextDoctor = taken.supply
  const nextBots = bots + taken.derivative.cost
  if (nextDoctor + nextBots !== doctor + bots) return { error: 'The purses did not conserve. Nothing moved.' }
  const derivative = { ...taken.derivative, seed: rooted.seed }
  return {
    doctor: nextDoctor,
    bots: nextBots,
    derivative,
    words: `The seed bought a derivative of their find for ${derivative.cost}. The coins moved to the finder. The find stays theirs. It climbs back to ${derivative.seed}. Worth is not settled.`,
  }
}

/** Marginal return this shift, a claim for the seed. The shift it was taken pays nothing yet. Nothing is minted. */
export function seedReturn(held: readonly Derivative[], shift: number): number {
  let sum = 0
  for (const row of held) {
    const period = shift - row.takenOn
    if (period < 1) continue
    sum += trickleAt(row.face, period)
  }
  return sum
}
