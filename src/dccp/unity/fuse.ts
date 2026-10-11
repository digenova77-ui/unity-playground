/** The page, the Unity bind, and the origin are one fuse.
 * Plancksoft OS³ was not an image on Drive. The blueprint and the sleeve are.
 * UniFi³ is the name of this bind. Merit is named in it and does not move.
 * The bind holds only when the page and the origin carry the same corpus mark.
 */

import { executeCoins } from '../meter/coins.ts'
import { plancksoft } from '../origin/sleeve.ts'
import { abstractSeat } from './abstract.ts'

export const CORPUS = [
  'MASTER.md',
  'MANIFEST.md',
  'README.md',
  'rosetta.py',
  'CYCLONE.md',
  'LOOP.md',
] as const

export const FUSE_MARK = '77c26a15529862952c9b0905c5cd337ba8b0dedfb1c331d936271b68ec44001e'

export function fuseSeat(handle: string | null): {
  front: 'page'
  bind: 'Unity'
  back: 'origin'
  layer: false
  os3Image: false
  osFound: 'blueprint'
  sleeve: 'Plancksoft'
  unifi: 'UniFi³'
  merit: 'record'
  meritMoves: false
  till: 'closed'
  bootloader: false
  corpus: typeof CORPUS
  bound: boolean
} {
  const seat = abstractSeat()
  const sleeve = plancksoft()
  const coins = executeCoins(handle)
  if (seat.layer !== false || sleeve.disk !== false || coins.merit.moves !== false || coins.till !== 'closed') {
    throw new Error('The fuse does not open.')
  }
  return {
    front: 'page',
    bind: 'Unity',
    back: 'origin',
    layer: false,
    os3Image: false,
    osFound: 'blueprint',
    sleeve: 'Plancksoft',
    unifi: 'UniFi³',
    merit: 'record',
    meritMoves: false,
    till: 'closed',
    bootloader: false,
    corpus: CORPUS,
    bound: coins.bound,
  }
}

export function bindOrigin(offered: string | null): {
  linked: boolean
  mark: typeof FUSE_MARK
  till: 'closed'
  meritMoves: false
} {
  return { linked: offered === FUSE_MARK, mark: FUSE_MARK, till: 'closed', meritMoves: false }
}

export function fuseWords(handle: string | null): string {
  const row = fuseSeat(handle)
  const seat = row.bound ? 'A Unity identity is seated. Merit can be named. It does not move.' : 'No Unity identity is seated. Merit is not counted.'
  return `The page is the front. The origin is the back. Unity is the bind between them, and it is not a layer of either. The bind holds only when both carry the same mark. Plancksoft is the sleeve. An OS³ image was not on Drive. What was there is the blueprint: ${row.corpus.join(', ')}. UniFi³ is the name of this fuse. Merit is a record inside it. ${seat} Nothing is sent. The till is closed. This package does not write a bootloader.`
}
