/** Belleville, Ontario, only as far as a named source locates it.
 * A type with no name is a hole. A title that states no place is not seated.
 * A posted page is not a person standing at the mapped point.
 */

import { HELD_POSTS, postedWords } from './posted.ts'

export interface SourcedPlace { name: string; types: string[] }

export interface ActivityLine { bucket: string; names: string[] }

export interface Activity {
  live: boolean
  lines: ActivityLine[]
  holes: string[]
  jurisdiction: string[]
}

export function inBelleville(lat: number, lon: number): boolean {
  return lat >= 44.1 && lat <= 44.25 && lon >= -77.55 && lon <= -77.25
}

const ORDER = ['public', 'corporate', 'leisure', 'trade', 'faith', 'settlements', 'ground'] as const

const LABEL: Record<(typeof ORDER)[number], string> = {
  public: 'Public',
  corporate: 'Named buildings',
  leisure: 'Leisure',
  trade: 'Trade',
  faith: 'Faith buildings',
  settlements: 'Settlements inside the city item',
  ground: 'Water and crossings',
}

function bucketOf(types: string[]): (typeof ORDER)[number] | null {
  const text = types.join(' | ').toLowerCase()
  if (/house|duplex|clergy|locomotive/.test(text)) return null
  if (/destroyed/.test(text)) return null
  if (/city hall|library|archives|conservation|public office|prison|jail|school|college|armou?ry/.test(text)) return 'public'
  if (/bank|office building|commercial building|industrial/.test(text)) return 'corporate'
  if (/movie theater|arena|park|marina|orchestra|sports club|hockey|museum|harbor|harbour/.test(text)) return 'leisure'
  if (/shop|bakery|market|railway station|station/.test(text)) return 'trade'
  if (/church/.test(text)) return 'faith'
  if (/settlement|rural community|township/.test(text)) return 'settlements'
  if (/river|stream|bay|bridge|cemetery|burying/.test(text)) return 'ground'
  return null
}

export function classifyActivity(rows: readonly SourcedPlace[], live: boolean): Activity {
  const grouped = new Map<string, string[]>()
  for (const row of rows) {
    const bucket = bucketOf(row.types)
    if (!bucket || !row.name.trim()) continue
    const list = grouped.get(bucket) ?? []
    if (!list.includes(row.name)) list.push(row.name)
    grouped.set(bucket, list)
  }
  const lines = ORDER.filter(bucket => grouped.has(bucket)).map(bucket => ({
    bucket: LABEL[bucket],
    names: grouped.get(bucket) ?? [],
  }))
  return { live, lines, holes: [...ACTIVITY_HOLES], jurisdiction: [...JURISDICTION] }
}

export const ACTIVITY_HOLES = [
  'Healthcare: no hospital, pharmacy, or doctor’s office is located on this query. An item titled Belleville General Hospital is typed hospital and states no place, so it is not seated.',
  'Clinics: none named.',
  'Malls: none named.',
  'Grocery: none named. A bakery is not a supermarket.',
  'Social services: no social facility was named.',
  'Legal entities: no courthouse or law office was named. The jail is a public building, not a firm.',
  'First responders: no police station, fire station, or ambulance station was named.',
  'Corporate entities: no business registry was read. A named building is not a list of firms.',
] as const

export const JURISDICTION = [
  'Canada. Ontario single-tier separated municipality. The administrative territory is Hastings County.',
  'Shares a border with Prince Edward County and Centre Hastings.',
  'Wikidata population 49,454 in 2011 and 50,716 in 2016. Not a later census.',
] as const

/** Entities whose Wikidata statement P131 is Belleville (Q34227), read 2026-10-05. Houses omitted. */
export const HELD_BELLEVILLE: readonly SourcedPlace[] = [
  { name: 'Belleville City Hall', types: ['city hall'] },
  { name: 'Belleville Public Library', types: ['public library'] },
  { name: 'Community Archives of Belleville and Hastings County', types: ['archives'] },
  { name: 'Quinte Conservation', types: ['conservation authority'] },
  { name: 'City Councillor of Belleville, Ontario', types: ['public office'] },
  { name: 'Belleville Jail', types: ['prison'] },
  { name: 'Armoury', types: ['armory'] },
  { name: 'Albert College', types: ['school'] },
  { name: 'Loyalist College', types: ['college'] },
  { name: 'Belleville Collegiate Institute and Vocational School', types: ['school building'] },
  { name: 'Centennial Secondary School', types: ['high school'] },
  { name: 'Eastside Secondary School', types: ['secondary school'] },
  { name: 'Nicholson Catholic College', types: ['school'] },
  { name: 'St. Theresa Catholic Secondary School', types: ['high school'] },
  { name: 'Canadian Imperial Bank of Commerce', types: ['bank building'] },
  { name: 'Old Houston Building', types: ['office building'] },
  { name: '258 Front Street', types: ['commercial building'] },
  { name: "Meyer's Mill", types: ['industrial building'] },
  { name: 'Empire Theatre', types: ['movie theater'] },
  { name: 'Galaxy Cinemas Belleville', types: ['movie theater'] },
  { name: 'Park Theatre', types: ['movie theater'] },
  { name: 'CAA Arena', types: ['arena'] },
  { name: 'Memorial Arena', types: ['arena'] },
  { name: 'Belleville Senators', types: ['ice hockey team', 'sports club'] },
  { name: 'Quinte Symphony', types: ['orchestra'] },
  { name: 'Hastings and Prince Edward Regiment Museum', types: ['military museum'] },
  { name: "Meyer's Pier Marina", types: ['marina'] },
  { name: 'Taste of Country', types: ['bakery', 'shop'] },
  { name: 'Belleville Market Square', types: ['market square'] },
  { name: 'Belleville Railway Station', types: ['railway station'] },
  { name: 'Bridge Street United Church', types: ['church building'] },
  { name: 'Church of St. Michael the Archangel', types: ['church building'] },
  { name: 'Cannifton', types: ['dispersed rural community'] },
  { name: 'Corbyville', types: ['human settlement'] },
  { name: 'Foxboro', types: ['compact rural community'] },
  { name: 'Thurlow', types: ['geographic township of Ontario'] },
  { name: 'Moira River', types: ['river'] },
  { name: 'Bay of Quinte', types: ['bay'] },
  { name: 'Norris Whitney Bridge', types: ['road bridge'] },
]

const MEDIA: ActivityLine[] = [
  { bucket: 'Radio', names: ['CJBQ 800 kHz, Quinte Broadcasting', 'CJLX-FM 91.3, Loyalist College', 'CJOJ-FM 95.5 Hits 95.5, Starboard', 'CIGL-FM 97.1 Mix 97', 'CHCQ-FM 100.1 Cool 100, country', 'CKJJ-FM 102.3, United Christian Broadcasters'] },
  { bucket: 'News', names: ['The Intelligencer, daily except Sundays and certain holidays'] },
  { bucket: 'Neighbouring signal', names: ['CJTN-FM 107.1 Rock 107, licensed in Trenton, serves the Quinte region'] },
]

const MEDIA_HOLES = [
  'No CBC or Ici relay was confirmed from the station articles read, so none is seated.',
  'No second newspaper or news site is in the Belleville mass-media category. This plate does not carry headlines.',
]

export function withBellevilleMedia(activity: Activity): Activity {
  return {
    ...activity,
    lines: [...activity.lines, ...MEDIA],
    holes: [...activity.holes, ...MEDIA_HOLES],
  }
}

export function heldActivity(): Activity {
  return withBellevilleMedia(classifyActivity(HELD_BELLEVILLE, false))
}

export function parseActivitySparql(json: unknown): SourcedPlace[] {
  const rows = (json as { results?: { bindings?: { itemLabel?: { value?: string }; typeLabel?: { value?: string } }[] } })?.results?.bindings
  if (!Array.isArray(rows)) return []
  const byName = new Map<string, Set<string>>()
  for (const row of rows) {
    const name = String(row?.itemLabel?.value ?? '').trim()
    const type = String(row?.typeLabel?.value ?? '').trim()
    if (!name || !type || name.startsWith('Q')) continue
    const set = byName.get(name) ?? new Set<string>()
    set.add(type)
    byName.set(name, set)
  }
  return [...byName.entries()].map(([name, types]) => ({ name, types: [...types] }))
}

export function activityItems(activity: Activity | undefined): { label: string; value: string; wide: true }[] {
  if (!activity) return []
  const shown = activity.lines.map(line => ({
    label: line.bucket,
    value: line.names.slice(0, 8).join(', ') + (line.names.length > 8 ? `, and ${line.names.length - 8} more` : ''),
    wide: true as const,
  }))
  return [
    ...activity.jurisdiction.map(value => ({ label: 'Jurisdiction', value, wide: true as const })),
    ...shown,
    ...activity.holes.map(value => ({ label: 'Not named', value, wide: true as const })),
  ]
}

export function activitySpeech(): string {
  const held = heldActivity()
  const posted = postedWords(HELD_POSTS)
  const named = held.lines.map(line => `${line.bucket}: ${line.names.slice(0, 6).join(', ')}.`).join(' ')
  return `Belleville, Ontario. Places are what Wikidata locates in the city. Radio and the paper are the Wikipedia articles. Posted pages that answered: ${posted.lines.join(' ')} ${posted.holes.join(' ')} ${held.jurisdiction.join(' ')} ${named} ${held.holes.join(' ')} Nothing here was confirmed by a person standing at the mapped point.`
}
