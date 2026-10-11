/** Pulls the almanac and the ground once, and keeps what answered. */
import { fetchJson } from './feeds.ts'
import { ALMANAC_SERIES } from './proxy.ts'
import { joinAlmanac, parseLanguages, parseWbMeta, parseWbSeries, type AlmanacRow, type SeriesPoint } from './almanac.ts'
import { craftCount, missingBoards, parseDepartures, parseFixtures, parsePlants, parseStops, parseTeams, pickStops, type Departure, type Fixture, type GroundReport, type Pass, type Plant } from './ground.ts'
import { classifyActivity, heldActivity, inBelleville, parseActivitySparql, withBellevilleMedia } from './activity.ts'
import { HELD_POSTS, OUTLETS, postedWords, type PostCheck } from './posted.ts'
import { holdGround, holdLanguage, placeKey, readKeep } from './keep.ts'

let almanacMap: Map<string, AlmanacRow> | null = null
let almanacPending: Promise<Map<string, AlmanacRow> | null> | null = null
const languageCache = new Map<string, string[] | null>()
const groundCache = new Map<string, GroundReport>()
const groundFlight = new Set<string>()
const kept = readKeep()
for (const row of kept.languages) languageCache.set(row.a3, row.names)
for (const row of kept.grounds) groundCache.set(row.key, row.report)

export function almanacNow(): Map<string, AlmanacRow> | null { return almanacMap }

export function languageNow(a3: string): string[] | null | undefined {
  return languageCache.has(a3) ? languageCache.get(a3)! : undefined
}

export function groundNow(lat: number, lon: number): GroundReport | undefined {
  return groundCache.get(placeKey(lat, lon))
}

export function loadAlmanac(onReady: () => void): void {
  if (almanacMap) { onReady(); return }
  if (!almanacPending) {
    almanacPending = (async () => {
      const meta = parseWbMeta(await fetchJson('/api/live?feed=wb-meta', 14_000))
      const keys = ['population', 'areaKm2', 'density', 'water', 'energy', 'undernourished', 'literacy'] as const
      const series: Record<(typeof keys)[number], Map<string, SeriesPoint>> = {
        population: new Map(), areaKm2: new Map(), density: new Map(), water: new Map(), energy: new Map(), undernourished: new Map(), literacy: new Map(),
      }
      await Promise.all(ALMANAC_SERIES.map(async (code, i) => {
        try { series[keys[i]] = parseWbSeries(await fetchJson(`/api/live?feed=wb-series&id=${code}`, 14_000)) } catch { /* that series stays empty */ }
      }))
      if (!meta.length) return null
      almanacMap = joinAlmanac(meta, series)
      return almanacMap
    })().catch(() => null)
  }
  void almanacPending.then(() => onReady())
}

export function loadLanguages(a3: string, onReady: () => void): void {
  if (!/^[A-Z]{3}$/.test(a3) || languageCache.has(a3)) { onReady(); return }
  void fetchJson(`/api/live?feed=wb-lang&id=${a3}`, 10_000).then(json => {
    const names = parseLanguages(json)
    languageCache.set(a3, names.length ? names : null)
    holdLanguage(a3, names.length ? names : null)
  }).catch(() => languageCache.set(a3, null)).finally(onReady)
}

export function loadGround(lat: number, lon: number, name: string, onReady: () => void, force = false): void {
  const key = placeKey(lat, lon)
  if (!force && groundCache.has(key)) { onReady(); return }
  if (groundFlight.has(key)) { onReady(); return }
  groundFlight.add(key)
  const q = '/api/live?feed='
  const read = (url: string) => fetchJson(url, 9_000)
  const settled = <T>(p: Promise<T>): Promise<T | null> => p.then(v => v, () => null)
  void (async () => {
    const passes: Pass[] = []
    const [stopJson, plantJson, clubJson, craftJson, activityJson] = await Promise.all([
      settled(read(`${q}stops&lat=${lat}&lon=${lon}`)),
      settled(read(`${q}sewer&lat=${lat}&lon=${lon}`)),
      settled(read(`${q}club&id=${encodeURIComponent(name)}`)),
      settled(read(`${q}craft&lat=${lat}&lon=${lon}`)),
      inBelleville(lat, lon) ? settled(read(`${q}activity&lat=${lat}&lon=${lon}`)) : Promise.resolve(null),
    ])
    const stops = stopJson ? parseStops(stopJson) : []
    passes.push({ role: 'identifier', source: 'Transitous', found: `${stops.length} stops in the box`, hole: stopJson ? (stops.length ? null : 'No stop was returned for this box.') : 'The stop index did not answer.' })
    const boards = await Promise.all(pickStops(stops, lat, lon, 3).map(stop => settled(read(`${q}depart&id=${encodeURIComponent(stop.stopId)}`))))
    const departures: Departure[] = []
    for (const board of boards) if (board) departures.push(...parseDepartures(board).slice(0, 4))
    passes.push({ role: 'indexer', source: 'Transitous GTFS', found: departures.length ? `${departures.length} departures` : '0', hole: departures.length ? null : 'No departure board answered.' })
    const plants: Plant[] = plantJson ? parsePlants(plantJson) : []
    passes.push({ role: 'reader', source: 'OpenStreetMap', found: plants.length ? plants.map(p => p.name).join(', ') : '0 named plants', hole: plantJson ? (plants.length ? null : 'No wastewater plant was named in this radius.') : 'The sewer map did not answer.' })
    let fixtures: Fixture[] = []
    const teams = clubJson ? parseTeams(clubJson) : []
    const team = teams[0]
    if (!clubJson) passes.push({ role: 'reader', source: 'TheSportsDB', found: '0', hole: 'The fixture feed did not answer.' })
    else if (!team) passes.push({ role: 'reader', source: 'TheSportsDB', found: '0', hole: 'No club matched this place.' })
    else {
      const next = await settled(read(`${q}fixtures&id=${team.id}`))
      fixtures = next ? parseFixtures(next) : []
      passes.push({ role: 'reader', source: 'TheSportsDB', found: fixtures.length ? `${team.name}: ${fixtures.length} next` : team.name, hole: fixtures.length ? null : `${team.name} has no next fixture in the feed.` })
    }
    const craft = craftJson ? craftCount(craftJson) : null
    passes.push({ role: 'reader', source: 'OpenSky', found: craft === null ? '0' : `${craft} aircraft heard`, hole: craft && craft > 0 ? 'Aircraft heard are positions, not a timetable.' : 'No aircraft state was returned. This is not a departure board.' })
    const holes = missingBoards(departures)
    passes.push({ role: 'audit', source: 'boards', found: departures.length ? `${new Set(departures.map(d => d.mode)).size} modes` : '0 modes', hole: holes.length ? holes.join(' · ') : null })
    const named = activityJson ? parseActivitySparql(activityJson) : []
    const activity = inBelleville(lat, lon) ? (named.length ? withBellevilleMedia(classifyActivity(named, true)) : heldActivity()) : undefined
    if (activity) {
      const checks = await Promise.all(OUTLETS.map(async outlet => {
        const json = await settled(read(`${q}posted&id=${encodeURIComponent(outlet.id)}`))
        const status = Number((json as { status?: unknown } | null)?.status)
        const at = (json as { at?: unknown } | null)?.at
        const row: PostCheck = { id: outlet.id, status: Number.isFinite(status) ? status : null, at: typeof at === 'string' ? at : null }
        return row
      }))
      const words = postedWords(checks.some(row => row.status === 200) ? checks : HELD_POSTS)
      activity.lines = [...activity.lines, { bucket: 'Posted', names: words.lines }]
      activity.holes = [...activity.holes, ...words.holes]
      passes.push({ role: 'reader', source: 'outlet homepages', found: `${words.lines.length} answered`, hole: 'A posted page is not a person at the door.' })
    }
    if (activity) passes.push({ role: 'reader', source: 'Wikidata', found: activity.live ? 'Belleville places, this reading' : 'Belleville places, held reading', hole: activity.holes[0] ?? null })
    groundCache.set(key, { departures: departures.slice(0, 8), plants, fixtures, craft, passes, activity })
    holdGround(key, name, groundCache.get(key)!)
  })().catch(() => {
    if (groundCache.has(key)) return
    const miss: GroundReport = { departures: [], plants: [], fixtures: [], craft: null, passes: [{ role: 'audit', source: 'ground', found: '0', hole: 'The ground pass did not finish.' }] }
    groundCache.set(key, miss)
    holdGround(key, name, miss)
  }).finally(() => { groundFlight.delete(key); onReady() })
}
