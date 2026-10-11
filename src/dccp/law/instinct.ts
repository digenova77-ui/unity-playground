/** The senses, taken to the diamond and then to the seed.
 * Nothing felt is the floor. One live sense is the ceiling.
 * Under the floor, the seed. That placement is instinct. It was not trained.
 */

import { COSMOGENESIS_SEED, diamond } from '../pipe/chain.ts'
import { exploreSenses } from '../iris/senses.ts'

export const SEED_UNDER_FLOOR = -1 as const

export function senseInstinct(live: { sight: boolean; hearing: boolean } = { sight: false, hearing: false }, width = 1):
  | {
      floor: 0
      ceiling: 1
      onFloor: 0 | 1
      sense: 'sight' | 'hearing' | null
      seed: typeof COSMOGENESIS_SEED
      under: typeof SEED_UNDER_FLOOR
      instinct: true
      trained: false
      root: false
      words: string
    }
  | { refused: string } {
  const box = diamond(width)
  if ('refused' in box) return box
  const step = exploreSenses(live)
  const onFloor = step.sense === null ? 0 : 1
  const held = step.sense === null
    ? 'Nothing is felt, so the sense sits on the floor, 0.'
    : `The sense is ${step.sense}, so it sits on the ceiling, 1.`
  return {
    floor: 0,
    ceiling: 1,
    onFloor,
    sense: step.sense,
    seed: COSMOGENESIS_SEED,
    under: SEED_UNDER_FLOOR,
    instinct: true,
    trained: false,
    root: false,
    words: `${held} Under the floor the seed sits at ${SEED_UNDER_FLOOR}. That placement is instinct. It was not trained. It is not a line of the root. One sense, then stop.`,
  }
}
