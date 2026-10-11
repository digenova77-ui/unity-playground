/** The middle bind. A test unit is not a dollar, and no agency is held. */

import { legacySeam } from './close.ts'

export interface BillBridge {
  sent: false
  dollar: null
  agency: null
  everyCoin: false
  both: true
}

export function billBridge(): BillBridge {
  const legacy = legacySeam()
  return { sent: false, dollar: null, agency: null, everyCoin: false, both: legacy.both && legacy.passes === 0 && legacy.coin === false }
}

export function bridgeWords(): string {
  const row = billBridge()
  return `A bot can ask. It cannot pay a bill. The unit on this page is a test unit, and a dollar is ${row.dollar === null ? 'not held' : 'held'}. No legacy outfit is seated, so nothing is converted and nothing is sent. Not every cryptocurrency is here. Not every person is here. The two sides name the same refusal. The till is closed.`
}
