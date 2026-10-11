/** A locale is drawn from identifiers already in the index.
 * A name in a question is matched to those identifiers. It is not a new search.
 */

import { addressesNear, cornersOf, indexCounts, indexKey, streetsNamed, type IndexKey } from './index.ts'

export interface LocaleDraw {
  title: string
  lines: string[]
  speech: string
  pin?: { lat: number; lon: number }
}

const ASK = /(?:show me |draw |see )?(?:the )?intersection of (.+?) and (.+?) in ([a-z][a-z .'-]+)/
const ID_ASK = /^(?:show me |draw |see )(?:the )?((?:node|way)\/[a-z0-9-]+)/
const STREET = /^(?:show me |draw |see )(?:the )?(.+?) in ([a-z][a-z .'-]+)/

export function localeAsk(utterance: string): LocaleDraw | null {
  const t = utterance.trim().toLowerCase()
  const intersection = t.match(ASK)
  if (intersection) return intersectionOf(intersection)
  const id = t.match(ID_ASK)
  if (id) return identifierOf(id[1])
  const street = t.match(STREET)
  if (street) return streetOf(street[1], street[2])
  return null
}

function intersectionOf(m: RegExpMatchArray): LocaleDraw {
  const place = placeOf(m[3])
  const found = cornersOf(m[1], m[2], place)
  const counts = indexCounts()
  const near = found[0] ? addressesNear(found[0].lat, found[0].lon).slice(0, 6) : []
  const lines = [
    ...found.slice(0, 4).map(keyLine),
    ...near.map(keyLine),
    found.length ? 'Identified by the query. Not stood at.' : `No identifier: ${clean(m[1])} and ${clean(m[2])}`,
    'Street View is not connected.',
  ]
  const corner = found[0]
  const speech = corner
    ? `The sandbox stays Universal. ${found.length === 1 ? 'One corner' : `${found.length} corners`} already identified: ${corner.id}, ${corner.claim}. ${near.length} address identifiers sit within 60 metres. They are door numbers, not business names. ${counts.streets} street ways, ${counts.corners} corners, and ${counts.addresses} addresses are in the Belleville index. Each is a key. The query identified it. None is validated until someone stands there and taps. Street View is not connected. An untagged door is not in the index.`
    : `The sandbox stays Universal. ${clean(m[1])} and ${clean(m[2])} in ${place} are not an identified corner. I did not search for one. The Belleville index holds ${counts.streets} street ways, ${counts.corners} corners, and ${counts.addresses} addresses.`
  return { title: place || 'Locale', lines, pin: corner ? { lat: corner.lat, lon: corner.lon } : undefined, speech }
}

function streetOf(name: string, placeRaw: string): LocaleDraw {
  const place = placeOf(placeRaw)
  const asked = clean(name.replace(/[?.!]+$/g, '').trim())
  const found = streetsNamed(asked, place)
  if (!found[0]) {
    return {
      title: place || 'Locale',
      lines: [`No identifier: ${asked}`],
      speech: `The sandbox stays Universal. ${asked} is not in the Belleville index. I did not search for one.`,
    }
  }
  const ways = found.length === 1 ? 'One way matched' : `${found.length} ways matched`
  return {
    title: place || 'Locale',
    lines: found.slice(0, 6).map(keyLine),
    pin: { lat: found[0].lat, lon: found[0].lon },
    speech: `The sandbox stays Universal. ${ways} ${asked}. ${found[0].id}. They are identified and not stood at. Street View is not connected.`,
  }
}

function identifierOf(id: string): LocaleDraw {
  const key = indexKey(id)
  if (!key) {
    return {
      title: 'Locale',
      lines: [`Not an identifier: ${id}.`],
      speech: `The sandbox stays Universal. ${id} is not an identifier.`,
    }
  }
  return {
    title: 'Belleville',
    lines: [keyLine(key)],
    pin: { lat: key.lat, lon: key.lon },
    speech: `The sandbox stays Universal. ${key.id} ${key.claim}. Identified and not stood at.`,
  }
}

function keyLine(key: IndexKey): string {
  return `${key.id} ${key.claim}`
}

function placeOf(raw: string): string {
  const t = raw.replace(/[?.!]+$/g, '').trim()
  if (/\bbelleville\b/.test(t)) return 'Belleville'
  return t.replace(/\b\w/g, letter => letter.toUpperCase())
}

function clean(name: string): string {
  return name.replace(/\b\w/g, letter => letter.toUpperCase())
}
