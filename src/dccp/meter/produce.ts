/** An idea taken toward production, invoked from what is already held.
 * The index is empty. The key map does not invent a key. The energy matrix is a hole.
 */

import { priceTie } from './close.ts'
import { tiedIndexes } from './cpi.ts'
import { energyWords } from './decision.ts'
import { mapKeys, type FusedKey } from './wizard.ts'

export function invokeProduction(fused: readonly FusedKey[] = []): {
  index: null
  peg: number
  novel: number
  repeat: number
  global: null
  map: { from: string; to: string }[]
  energy: null
  watts: null
  words: string
} {
  const price = priceTie()
  const tie = tiedIndexes()
  const map = mapKeys(fused)
  const words = [
    `Invoked. The price index is ${tie.index}. The peg is ${price.peg}. A first find is ${price.novel}. A repeat is ${price.repeat}. The global figure is ${price.global}.`,
    map.length === 0
      ? 'The key map is empty. A solution key is size times complexity times one repeat, and only for keys already held. None were handed in, so nothing was mapped and nothing was fused.'
      : `The key map has ${map.length} ${map.length === 1 ? 'edge' : 'edges'}: ${map.map(edge => `${edge.from} to ${edge.to}`).join(', ')}.`,
    'The energy matrix from idea to production has no cell. One decision leaves the watt-hours empty. A sum of empty cells is not a global cost. No joule was written.',
    energyWords(),
  ].join(' ')
  return {
    index: tie.index,
    peg: price.peg,
    novel: price.novel,
    repeat: price.repeat,
    global: price.global,
    map,
    energy: null,
    watts: null,
    words,
  }
}
