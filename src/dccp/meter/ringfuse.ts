/** The three rings are three keys. A larger key is proved by the keys under it.
 * Complexity is how many rings are in the key. The count is size times complexity.
 * That count is not a price. A skipped proof does not grow.
 */

import { divine } from '../law/divine.ts'
import { decisionsFor } from './wizard.ts'

export const RING_KEYS = [
  { id: 'logic', claim: 'DCLM binds logic' },
  { id: 'truth', claim: 'Iris binds truth' },
  { id: 'pragmatism', claim: 'Twain binds pragmatism' },
] as const

const PAIRS = [
  ['logic', 'truth'],
  ['truth', 'pragmatism'],
  ['pragmatism', 'logic'],
] as const

export interface RingKey {
  id: string
  parts: readonly string[]
  size: number
  complexity: number
  cost: number
  worth: null
  provedBy: readonly string[]
}

function fuse(parts: readonly string[], provedBy: readonly string[]): RingKey | { refused: string } {
  const size = parts.length
  const complexity = size
  const cost = decisionsFor(size, complexity)
  if (typeof cost !== 'number') return cost
  return { id: parts.join('+'), parts, size, complexity, cost, worth: null, provedBy }
}

export function ringSeries(): RingKey[] | { refused: string } {
  if (divine().rings !== 3) return { refused: 'A ring did not close. No key was proved.' }
  const proved = new Map<string, RingKey>()
  for (const key of RING_KEYS) {
    const row = fuse([key.id], ['rings-closed'])
    if ('refused' in row) return row
    proved.set(row.id, row)
  }
  for (const parts of PAIRS) {
    const missing = parts.filter(id => !proved.has(id))
    if (missing.length) return { refused: `${missing.join(', ')} is not proved. The pair was not made.` }
    const row = fuse(parts, [...parts])
    if ('refused' in row) return row
    proved.set(row.id, row)
  }
  const pairIds = PAIRS.map(parts => parts.join('+'))
  const missingPairs = pairIds.filter(id => !proved.has(id))
  if (missingPairs.length) return { refused: `${missingPairs.join(', ')} is not proved. The three-ring key was not made.` }
  const all = fuse(['logic', 'truth', 'pragmatism'], pairIds)
  if ('refused' in all) return all
  proved.set(all.id, all)
  return [...proved.values()]
}

export function ringSeriesWords(): string {
  const rows = ringSeries()
  if ('refused' in rows) return `${rows.refused} Worth is not settled. The till is closed.`
  const one = rows.find(row => row.size === 1)
  const pair = rows.find(row => row.size === 2)
  const all = rows.find(row => row.size === 3)
  return `The three rings are three keys: logic, truth, and pragmatism. Each one is proved because the rings closed. One ring is complexity ${one?.complexity}. It costs ${one?.cost}. A pair is proved by those two rings. It is complexity ${pair?.complexity}. It costs ${pair?.cost}. All three are one key, ${all?.id}, proved by the three pairs. Complexity ${all?.complexity}. It costs ${all?.cost}. A larger key is not made if the proof under it is missing. The count is size times complexity. It grows only through that series. A fusion does not invent a fact. The count is not a price. Worth is not settled. The till is closed.`
}
