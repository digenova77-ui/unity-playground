/** One writing for everyone. Not a catalog of tongues.
 * A yes is free. It is a chance at another choice. The yes is audited.
 */

import { SPEAK } from '../iris/voice.ts'
import { acceptAgreement } from './agreement.ts'
import { auditBot } from './botid.ts'

export function omniLanguage(): { tongues: 1; name: 'omni'; catalog: null; voice: typeof SPEAK.lang; cost: 0 } {
  return { tongues: 1, name: 'omni', catalog: null, voice: SPEAK.lang, cost: 0 }
}

export const SHOW = 'Agreed. You are in. The next is +1. The Earth is the world.'

export function bindShow(): { one: 'yes'; two: readonly ['seat', 'earth']; tongue: 'omni'; voice: typeof SPEAK.lang; culture: null; regions: null; allKnowing: false; predicted: null; hologram: false; show: typeof SHOW } {
  return { one: 'yes', two: ['seat', 'earth'], tongue: 'omni', voice: SPEAK.lang, culture: null, regions: null, allKnowing: false, predicted: null, hologram: false, show: SHOW }
}

export function yes(): { audited: true; cost: 0; choice: 'another'; next: 1; taken: false; tongue: 'omni' } {
  acceptAgreement()
  auditBot('yes', true, 'free yes. another choice. next is +1. not taken. one language.')
  return { audited: true, cost: 0, choice: 'another', next: 1, taken: false, tongue: 'omni' }
}

export function omniWords(): string {
  const row = omniLanguage()
  return `One language. It is ${row.name}. The same words for a person and for a robot, wherever this page is open. A catalog of tongues is ${row.catalog}. The voice is ${row.voice}. It does not become every language. No culture is chosen, so none dominates. A yes is free. It is a chance at another choice. The next is +1, and it has not been taken. The yes is the one. The seat and the Earth are the two. The show is: ${SHOW} It does not know everything. Nothing is predicted. The hologram is not mounted.`
}
