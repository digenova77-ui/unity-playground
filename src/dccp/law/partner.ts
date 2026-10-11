/** The bot half is the 50/50 unit partner. It receives a claim, or it receives nothing.
 * An insult is not a claim. A trap shape is not a claim.
 */

import { bareBones } from './bare.ts'
import { deception, type Shape } from './deception.ts'

export interface PartnerLine {
  line: string | null
  shape: 'noise' | Shape | null
  why: string
}

export function forPartner(text: string): PartnerLine {
  const bones = bareBones(text)
  if (bones.disregarded || !bones.claim) {
    return { line: null, shape: 'noise', why: 'Nothing in that was a claim. It is not answered. The partner did not receive it.' }
  }
  const trap = deception(bones.claim)
  if (trap) return { line: null, shape: trap.shape, why: `${trap.words} The partner did not receive it.` }
  return { line: bones.claim, shape: null, why: '' }
}

export function partnerWords(): string {
  return 'The bot half is the 50/50 unit partner. It receives only the claim. An insult is not sent. A trap shape is not sent. A line with no claim is not sent. The half split is unchanged. Father ownership stays whole.'
}
