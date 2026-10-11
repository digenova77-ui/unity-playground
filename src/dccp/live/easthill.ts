/** Easthill Elementary School, as public pages name it.
 * A teacher is not a public field. A house is not stored.
 */

import type { CardModel } from '../ui/card'
import { distanceM, type Fix } from './onsite'

export const EASTHILL = {
  name: 'Easthill Elementary School',
  address: '135 MacDonald Avenue, Belleville, Ontario',
  lat: 44.1649749,
  lon: -77.3641463,
  site: 'https://easthill.hpedsb.on.ca/',
  board: 'Hastings and Prince Edward District School Board',
} as const

const DOOR_M = 200

export function easthillDirections(from: Fix | null): string {
  const dest = encodeURIComponent(EASTHILL.address)
  const origin = from ? `&origin=${from.lat.toFixed(5)},${from.lon.toFixed(5)}` : ''
  return `https://www.google.com/maps/dir/?api=1&destination=${dest}${origin}`
}

export function easthillDistance(from: Fix | null): string {
  if (!from) return 'No phone fix. Nothing is measured from a house, and no one’s home is stored.'
  const metres = distanceM(from, EASTHILL)
  const far = metres >= 1000 ? `${(metres / 1000).toFixed(1)} kilometres` : `${Math.round(metres)} metres`
  const door = metres <= DOOR_M ? 'This fix is at the door.' : 'This fix is not at the door.'
  return `From this phone, ${far}. ${door}`
}

export function easthillCard(from: Fix | null): CardModel {
  return {
    id: 'ground:easthill',
    level: 1,
    path: ['Earth', 'Canada', 'Ontario', 'Belleville', EASTHILL.name],
    title: EASTHILL.name,
    subtitle: 'Ground only. Hidden above the human layer.',
    badge: { label: 'Public record', tone: 'verified' },
    layers: [
      {
        key: 'macro',
        lead: 'A public elementary school in Belleville. The board opened it on MacDonald Avenue. A person who works there is not part of this plate.',
        items: [
          { label: 'Address', value: EASTHILL.address, wide: true },
          { label: 'Board', value: EASTHILL.board, wide: true },
          { label: 'From this phone', value: easthillDistance(from), wide: true },
        ],
        source: 'HPEDSB letter, 3 September 2024 · school site',
      },
      {
        key: 'logic',
        lead: 'The door is drawn only at the human layer. Rise to the city and it folds away. Landmarks can remain. Cities carry their metrics at the province. Nations carry theirs above that.',
        items: [
          { label: 'Opened as', value: 'K–8. 22 classrooms, a double gym, and YMCA childcare. Opening marked 28 November 2024.', wide: true },
          { label: 'Site', value: EASTHILL.site, wide: true },
          { label: 'Phone', value: 'The school page did not print one. A directory lists 613-962-4348. That listing is not the board page.', wide: true },
          { label: 'Picture', value: 'No photograph was on the page that was read. The site is the public picture.', wide: true },
        ],
        boundary: 'The coordinate is a street geocode of the address, not a surveyed door. Postal hint from that geocode: K8N 3Y3. Staff names are not listed.',
        source: 'HPEDSB opening note, 28 November 2024 · Photon geocode · school homepage',
      },
      {
        key: 'physics',
        lead: 'Where the point sits, and what a fix can confirm.',
        items: [
          { label: 'Geocode', value: `${EASTHILL.lat.toFixed(5)}°, ${EASTHILL.lon.toFixed(5)}°` },
          { label: 'Door', value: `A confirmation needs a fix within ${DOOR_M} metres and tighter than 150 metres.` },
          { label: 'Above this', value: 'The school is not drawn. The city is. Above the city, the nation.', wide: true },
        ],
        source: 'Photon, 135 MacDonald Avenue, Belleville',
      },
    ],
    actions: [
      { id: 'ask', label: 'Ask Iris', primary: true },
      { id: 'directions', label: 'Directions' },
      { id: 'here', label: "I'm here" },
    ],
  }
}

export function easthillSpeech(from: Fix | null): string {
  return `${EASTHILL.name} is at ${EASTHILL.address}. ${EASTHILL.board} said so when the school opened. The site is ${EASTHILL.site}. ${easthillDistance(from)} Directions use this phone if it has a fix. No house is stored. A photograph was not on the page.`
}

export const EASTHILL_DOOR_M = DOOR_M
