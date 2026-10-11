/** The key economy, run on the locked sum. A tweak that would change that sum is not applied.
 * More keys raise what is booked. They do not add a decision slot.
 * A held claim is the fast find. A miss does not mint a key.
 */

import { closedStream, faceFor, shiftSlots } from './close.ts'
import { searchKeys } from '../law/form.ts'

function book(novel: number, known: number, periods: number): number {
  return novel * closedStream(faceFor(true), periods) + known * closedStream(faceFor(false), periods)
}

export function keyEconomySim(): { one: number; five: number; mixed: number; speech: string } {
  const one = book(1, 0, 12)
  const five = book(5, 0, 12)
  const mixed = book(1, 4, 12)
  const n = faceFor(true)
  const k = faceFor(false)
  const speech = `The locked sum is the face times the natural log of 1 plus the shifts. A first find faces ${n}. A known key faces ${k}. A half shift stays ${shiftSlots()} decisions. More keys do not add a slot. At 12 shifts, one new key books ${one.toFixed(2)}. Five new keys book ${five.toFixed(2)}. One new key and four already held book ${mixed.toFixed(2)}. The known ones pay less, and that is the speed: a hit does not mint again. A miss stays slow, and a miss does not mint a key. A tweak that paid only when a key was the hit would make the money follow the speed. It would change the locked sum, so it is not applied. Worth is not settled. The till stays closed. Father ownership stays 100%.`
  return { one, five, mixed, speech }
}

export function mapFind(text: string, rows: readonly { id: string; claim: string }[]): string {
  const claim = text.replace(/^.*?\b(?:find the key|key mapping|map the key|search keys)\b[:\s]*/i, '').trim()
  const looked = searchKeys(claim ? `search keys ${claim}` : 'known keys', rows)
  if (!claim) return looked
  const hit = !looked.includes('None held')
  const speed = hit
    ? `It is already held, so this find is the fast part. The face on a known key is ${faceFor(false)}. A new key is not minted.`
    : `It is not held. The find stays slow. A miss does not mint a key.`
  return `${looked} ${speed}`
}
