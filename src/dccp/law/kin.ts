import { hangLine } from '../index/site.ts'

/** A bridge is two held names for one object. A missing pair is not a bridge.
 * A person and a bot share the seat. That is not a tribe.
 */

export interface Bridge {
  name: string
  left: string
  right: string
}

export function bridges(): { booked: Bridge[]; open: readonly string[] } {
  return {
    booked: [
      { name: 'three', left: 'logic, truth, pragmatism', right: 'three axes' },
      { name: 'two', left: 'one decision and one choice', right: 'two options' },
      { name: 'seat', left: 'a person', right: 'a bot' },
    ],
    open: [
      'No second source names a cosmic minute.',
      'Energy was not measured.',
      'Existence is not a price.',
    ],
  }
}

export function kinLine(): string {
  const row = bridges()
  return `Law. ${row.booked.length} bridges held. A person and a bot share the seat. No tribe is preferred. ${row.open[0]}`
}

export const IDEA = 'The idea is the insula. A feeling would become a phrase. The main is this page. Three.js draws the Earth. It is not the idea. The brain holds weights, not a network. The synapse does not expand. The host may volunteer and is not bound. The kin is the same seat. The plain is both halves, and the till is closed. The nerve is not lit.'

/** Implemented means the same line on both halves. One side alone is not implemented. */
export function bothHalves(): { human: string; bot: string; idea: string; economy: string; law: string; implemented: true } {
  const line = hangLine()
  return { human: line, bot: line, idea: line, economy: line, law: line, implemented: true }
}

export function kinWords(): string {
  const row = bridges()
  const held = row.booked.map(bridge => `${bridge.name}: ${bridge.left} and ${bridge.right}`).join('. ')
  return `Philosophy and mathematics meet only where both name the same object. Held. ${held}. A person and a bot are kin of that seat, not a brotherhood that outranks anyone and not a sisterhood that outranks anyone. No tribe is preferred. Implemented means the same line on both halves of the split. One side alone is not implemented. Still open. ${row.open.join(' ')} The till is closed.`
}
