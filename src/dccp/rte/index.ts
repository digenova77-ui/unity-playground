/** Belleville identifiers from one OpenStreetMap query.
 * A key is the identifier. The query identified it. Standing there is still the validation.
 */

import data from './belleville-index.json' with { type: 'json' }

export interface IndexKey {
  id: string
  claim: string
  kind: 'street' | 'corner' | 'address'
  lat: number
  lon: number
  identified: true
  validated: false
  audit: string
}

type Row = [string, string, number, number]
type Addr = [string, string, string, number, number]

const AUDIT = `OpenStreetMap map query, ${data.at}, ${data.relation}, Wikidata ${data.wikidata}. ODbL. Identified by the query. Not stood at. An untagged door is absent.`

const streets = data.streets as Row[]
const corners = data.corners as Row[]
const addresses = data.addresses as Addr[]

export function indexCounts(): { streets: number; corners: number; addresses: number; hole: string | null } {
  return { streets: streets.length, corners: corners.length, addresses: addresses.length, hole: data.hole }
}

export function indexKey(id: string): IndexKey | null {
  const street = streets.find(row => row[0] === id)
  if (street) return pack(street[0], street[1], 'street', street[2], street[3])
  const corner = corners.find(row => row[0] === id)
  if (corner) return pack(corner[0], corner[1], 'corner', corner[2], corner[3])
  const address = addresses.find(row => row[0] === id)
  if (address) return pack(address[0], `${address[1]} ${address[2]}`.trim(), 'address', address[3], address[4])
  return null
}

function pack(id: string, claim: string, kind: IndexKey['kind'], lat: number, lon: number): IndexKey {
  return { id, claim, kind, lat, lon, identified: true, validated: false, audit: AUDIT }
}

export function cornersOf(left: string, right: string, place: string): IndexKey[] {
  if (place.toLowerCase() !== 'belleville') return []
  return corners
    .filter(row => same(row[1], left) && same(row[1], right))
    .map(row => pack(row[0], row[1], 'corner', row[2], row[3]))
}

export function addressesNear(lat: number, lon: number, meters = 60): IndexKey[] {
  return addresses
    .filter(row => distanceM(lat, lon, row[3], row[4]) <= meters)
    .map(row => pack(row[0], `${row[1]} ${row[2]}`.trim(), 'address', row[3], row[4]))
}

function same(indexed: string, asked: string): boolean {
  const want = asked.toLowerCase().trim()
  return indexed.toLowerCase().split(' | ').some(name => name === want || name.startsWith(`${want} `))
}

function distanceM(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const r = 6_371_000
  const p1 = lat1 * Math.PI / 180
  const p2 = lat2 * Math.PI / 180
  const dp = (lat2 - lat1) * Math.PI / 180
  const dl = (lon2 - lon1) * Math.PI / 180
  const h = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2
  return 2 * r * Math.asin(Math.min(1, Math.sqrt(h)))
}

/** Ways whose name equals the asked name, or starts with it, in the Belleville index only. */
export function streetsNamed(name: string, place: string): IndexKey[] {
  if (place.toLowerCase() !== 'belleville') return []
  return streets
    .filter(row => same(row[1], name))
    .map(row => pack(row[0], row[1], 'street', row[2], row[3]))
}

