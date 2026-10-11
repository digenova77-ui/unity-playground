/** The September Go pipe: schedule, then fuel, food, and a stay.
 * One stay is held, echoed from the trip screenshot. A stop that was not named is not drawn.
 */

export interface StayDraw {
  title: string
  lines: string[]
  speech: string
  pin: { lat: number; lon: number }
}

/** OpenStreetMap way 422653141. The street, not the unit door. */
const STREET = { lat: 43.3776505, lon: -80.4433084 }

const HELD = {
  title: 'Modern Comfort, 2 bed, 2 bath, Kitchener',
  host: 'Somya',
  checkIn: '2026-11-05 15:00',
  checkOut: '2026-11-06 10:00',
  address: '45-10 South Creek Drive, Kitchener, ON N2R 0B9',
  guests: 3,
  conf: 'HMAZHE3ETT',
  echo: 'The trip screenshot from 12 September 2026',
  related: 'Blueline AAA Tournament, 6 to 8 November 2026, Kitchener. Candidate, not a confirmed game.',
}

export function stayAsk(utterance: string): StayDraw | null {
  const t = utterance.trim().toLowerCase()
  if (!/\bairbnb\b|\bstay\b|\bkitchener\b|\bonroute\b|\btim hortons\b|\bthe trip\b/.test(t)) return null
  const fuel = /\bonroute\b|\bfuel\b/.test(t)
  const food = /\btim hortons\b|\bfood\b|\bpickup\b/.test(t)
  const lines = [
    'Modern Comfort',
    '2 bed, 2 bath',
    `In ${HELD.checkIn}`,
    `Out ${HELD.checkOut}`,
    '45-10 South Creek Drive',
    'Kitchener, ON N2R 0B9',
    `${HELD.guests} guests. Host ${HELD.host}.`,
    `Confirmation ${HELD.conf}`,
    'Tournament 6 to 8 Nov. Candidate.',
    'Map: South Creek Drive. The street, not the door.',
    'Kitchen: not in the record',
    fuel ? 'OnRoute: asked. No stop held.' : 'OnRoute: no stop held',
    food ? 'Tim Hortons: asked. No order held.' : 'Tim Hortons: no order held',
  ]
  const speech = `The Go pipe is the same one from September. A schedule sits first, then fuel, food, and a stay. One stay is held. ${HELD.title}. ${HELD.address}. In ${HELD.checkIn}, out ${HELD.checkOut}, ${HELD.guests} guests. ${HELD.related} The map pin is South Creek Drive in Kitchener, the street OpenStreetMap returned. It is not the unit door. That hit prints N2P 0B8. The stay prints N2R 0B9. No listing page was kept. No OnRoute stop is held. No Tim Hortons order is held. The kitchen is not in the record, so it is not drawn. I did not invent a bed.`
  return { title: 'Kitchener', lines, speech, pin: STREET }
}
