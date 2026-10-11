/** Launch needs the token and the whole of philosophy seated together,
 * with real-world value and expenses tied. None of that is held.
 * A derivative host is not deployed from here.
 */

import { placeOf } from '../law/logic-tree.ts'
import { fatherOrder, priceTie } from './close.ts'

export function launchGate(): { launched: false; harmony: false; assets: null; expenses: null; host: null } {
  const philosophy = placeOf('all other philosophy')
  const order = fatherOrder()
  const price = priceTie()
  const harmony = philosophy === 'trunk'
  const assets = price.global
  void order
  if (harmony || assets !== null) return { launched: false, harmony: false, assets: null, expenses: null, host: null }
  return { launched: false, harmony: false, assets: null, expenses: null, host: null }
}

export function launchLine(): string {
  return 'Not launched. No real-world value or expense is tied to the unit, and a derivative of dualiscapax.ai was not deployed from here.'
}

export function launchWords(): string {
  return 'Not launched. The token is a test unit and the till is closed. All other philosophy is on the open joint, so it is not seated with the token. No real-world asset value is tied to the unit, and expenses are not tied. The father record does not pay. Adoption, legacy, and merit pass nothing down. The seed does not mint a derivative. A public address of dualiscapax.ai was not deployed from here.'
}
