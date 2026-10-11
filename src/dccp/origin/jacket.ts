/** The record sits inside eFuse. The API jacket is the only conduit.
 * It does not bind, move eFuse, or open a second door.
 */

import { cloudPlus } from '../law/manifest.ts'
import { connectInsula } from '../law/logic-tree.ts'
import { executeCoins } from '../meter/coins.ts'
import { nextBlock } from '../meter/blocks.ts'

export const INSIDE = ['circuit', 'blocks', 'insula', 'plus', 'token'] as const
const SECOND = new Set(['pages', 'github', 'cloud', 'old-world', 'pay', 'host'])

export function apiJacket(ask = '', handle: string | null = null): { conduit: 'api-jacket'; doors: 1; moves: false; till: 'closed'; open: boolean; body: unknown; reason: string | null } {
  const name = ask.trim().toLowerCase()
  const shut = { conduit: 'api-jacket' as const, doors: 1 as const, moves: false as const, till: 'closed' as const }
  if (SECOND.has(name)) return { ...shut, open: false, body: null, reason: 'That is a second door. The jacket does not open it.' }
  if (name && !(INSIDE as readonly string[]).includes(name)) return { ...shut, open: false, body: null, reason: 'That is not inside the token.' }
  const coins = executeCoins(handle)
  const block = nextBlock('letter', 0)
  const body = name === 'circuit'
    ? { unit: 1, priceOn: 'result', next: 'a new idea built on the result' }
    : name === 'blocks'
      ? ('refused' in block ? null : { first: block.next, count: block.cost, childRecorded: false })
      : name === 'insula'
        ? connectInsula()
        : name === 'plus'
          ? cloudPlus()
          : name === 'token'
            ? { peg: coins.efuse.peg, moves: coins.efuse.moves }
            : { inside: INSIDE }
  return { ...shut, open: true, body, reason: null }
}

export function jacketWords(): string {
  const row = apiJacket('')
  const pages = apiJacket('pages')
  return `The record sits inside eFuse. eFuse does not move. The only conduit to the old world is the API jacket. It has ${row.doors} door. It returns what is already inside: the circuit, the blocks, the insula, the plus one, and the token. ${pages.reason} Pages, the cloud, and a payment are not required. The till is ${row.till}.`
}
