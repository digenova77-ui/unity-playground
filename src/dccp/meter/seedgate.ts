/** An idea roots and seeds a decision. The decision is the unit.
 * What the manifestation is worth is not held. Global assets are not a basket.
 * There is no cosmic index of them.
 */

import { UNIT_PER_DECISION } from './economy.ts'
import { cosmosClaim, priceTie } from './close.ts'

export function seedDecision(idea: string): { rooted: true; seed: string; unit: 1; worth: null; assets: null; index: null } | { rooted: false; unit: 0; worth: null; assets: null; index: null } {
  const seed = idea.trim().replace(/\s+/g, ' ')
  const tie = priceTie()
  const claim = cosmosClaim()
  if (seed.length < 2 || tie.peg !== UNIT_PER_DECISION || tie.global !== null || claim.worth !== null || claim.titled) {
    return { rooted: false, unit: 0, worth: null, assets: null, index: null }
  }
  return { rooted: true, seed, unit: 1, worth: null, assets: null, index: null }
}

export function seedDecisionWords(idea: string): string {
  const row = seedDecision(idea)
  if (!row.rooted) return 'No idea was given, so no decision is rooted. The unit is not spent. Global assets are not in a basket. There is no cosmic index of them. Worth is not settled. The till is closed.'
  return `The idea roots the decision. The seed is “${row.seed}”. What grows from it is one decision, and that decision is the unit, ${row.unit}. The gate spends that unit. It does not price the idea. What the manifestation is worth in the real world is not held. The abstract layer can carry the idea and cannot carry an asset. Every global asset was asked for. None is in the basket. There is no cosmic index of them. The unit stays ${row.unit} at every scale. Worth stays unsettled. The till is closed.`
}
