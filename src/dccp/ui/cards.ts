// One storyboard for every genre: Macro (what it is, plain words) → Logic (how it works) → Physics (the evidence, numbers live here).
import type { City, Country, Grade, ModuleIntegrity, Registry } from '../data/types'
import type { FeedStatus, FeedValues } from '../live/feeds'
import { placeWeather, weatherLine, type PlaceWeather } from '../live/place'
import type { Target } from '../iris/brain'
import { arcDeg } from '../world/geo'
import type { CardItem, CardModel, Tone } from './card'
import type { PipeView } from '../pipe/chain'
import { drawnConstruct } from '../rte/construct'
import { gapLine, gapProtocol } from '../iris/nodata'
import { MARKS, companions, correlate, galactocentric, type Mark } from '../cosmos/galaxy'
import { count, pct, type AlmanacRow } from '../live/almanac'
import { departureLine, type GroundReport } from '../live/ground'
import { activityItems } from '../live/activity'
import { easthillCard } from '../live/easthill'
import { confirmFor, phoneFix } from '../live/onsite'
import { groundNow } from '../live/seat'

export interface CardCtx {
  reg: Registry
  integrity: ModuleIntegrity[]
  feeds: { values: FeedValues; status: Map<keyof FeedValues, FeedStatus> }
  discovered: Set<string>
  describe: (t: Target) => string
  /** Called when asynchronous data (weather, almanac, ground) for the shown card arrives. */
  onLate: () => void
  pipe?: PipeView
  /** undefined while the extract is still coming in. null when that country is absent. */
  rowFor?: (a3: string) => AlmanacRow | null | undefined
  langFor?: (a3: string) => string[] | null | undefined
}

const GRADE_WORD: Record<Grade, string> = { 'AT BENCHMARK': 'At benchmark', NEAR: 'Near', GAPPED: 'Gapped', THIN: 'Thin', UNGRADED: 'Not graded' }
const GRADE_SCORE: Record<Grade, number> = { 'AT BENCHMARK': 4, NEAR: 3, GAPPED: 2, THIN: 1, UNGRADED: 0 }

const sentence = (s: string): string => { const t = s.trim(); return !t || /[.!?…"”)]$/.test(t) ? t : `${t}.` }
const firstSentence = (s: string): string => { const m = s.match(/^.*?[.!?](\s|$)/); return sentence(m ? m[0] : s) }
const ago = (ms: number | null): string => {
  if (!ms) return 'no reading yet'
  const s = Math.max(0, Math.round((Date.now() - ms) / 1000))
  return s < 90 ? `${s} seconds ago` : s < 5400 ? `${Math.round(s / 60)} minutes ago` : `${Math.round(s / 3600)} hours ago`
}
export function bigNumber(n: number): string {
  if (!n) return 'not recorded'
  if (n >= 1e12) return `${(n / 1e12).toFixed(1).replace(/\.0$/, '')} trillion`
  if (n >= 1e9) return `${(n / 1e9).toFixed(1).replace(/\.0$/, '')} billion`
  if (n >= 1e6) return `${Math.round(n / 1e6)} million`
  if (n >= 1e3) return `${Math.round(n / 1e3)} thousand`
  return String(n)
}
const statusTone = (status: string): { label: string; tone: Tone } => {
  const s = status.toUpperCase()
  if (s.startsWith('APPROVED')) return { label: 'Approved', tone: 'verified' }
  if (s.startsWith('LANDED') || s.startsWith('LIVE')) return { label: 'Landed', tone: 'pilot' }
  if (s.startsWith('DRAFT')) return { label: 'Draft', tone: 'mock' }
  if (s.includes('PILOT')) return { label: 'Pilot', tone: 'pilot' }
  return { label: 'Design', tone: 'design' }
}

function quakesNear(v: FeedValues, test: (lat: number, lon: number) => boolean): { n: number; strongest?: number } {
  const items = v.quakes?.items ?? []
  let n = 0, strongest: number | undefined
  for (const q of items) if (test(q.lat, q.lon)) { n++; strongest = Math.max(strongest ?? -9, q.mag) }
  return { n, strongest }
}

function capitalOf(reg: Registry, a3: string): City | undefined {
  return reg.cities.cities.find(c => c.a3 === a3 && c.capital) ?? reg.cities.cities.filter(c => c.a3 === a3).sort((a, b) => b.pop - a.pop)[0]
}

function weatherFor(lat: number, lon: number, ctx: CardCtx): PlaceWeather | null | undefined {
  return placeWeather(lat, lon, () => ctx.onLate())
}

export function countryCard(c: Country, ctx: CardCtx, inCountry: (c: Country, lat: number, lon: number) => boolean): CardModel {
  const { reg } = ctx
  const cap = capitalOf(reg, c.a3)
  const w = cap ? weatherFor(cap.lat, cap.lon, ctx) : null
  const graded = reg.jurisdictions.find(j => j.name.toLowerCase() === c.name.toLowerCase())
  const cities = reg.cities.cities.filter(x => x.a3 === c.a3).sort((a, b) => b.pop - a.pop)
  const q = quakesNear(ctx.feeds.values, (lat, lon) => inCountry(c, lat, lon))
  const quakeWord = q.n === 0 ? 'None in the last day' : q.n === 1 ? 'One in the last day' : `${q.n} in the last day`
  const row = ctx.rowFor?.(c.a3)
  const langs = ctx.langFor?.(c.a3)
  const langWord = langs?.length ? langs.join(', ') : langs === undefined ? 'Reading Wikidata' : 'not published'
  const people = row ? count(row.population) : row === undefined ? 'Reading the World Bank' : 'not in the extract'
  const held = row?.held != null ? `${row.held.toFixed(1)} of ${row.heldOf.join(', ')}` : row ? 'needs two series' : row === undefined ? 'Reading the World Bank' : 'not in the extract'
  const live = w || row ? { label: row ? 'Almanac' : 'Live weather', tone: 'live' as Tone } : { label: 'Reference map', tone: 'verified' as Tone }
  const macro: CardItem[] = [
    { label: 'Region', value: row?.region || c.subregion || c.continent },
    { label: 'Income', value: row?.income || 'not published' },
    { label: 'Languages', value: langWord, wide: true },
    { label: 'People', value: people },
    { label: 'Density', value: row?.density ? `${row.density.value.toFixed(1)} / km² · ${row.density.year}` : row === undefined ? 'Reading' : 'not published' },
    { label: 'Held reading', value: held, wide: true },
    { label: cap ? `Weather in ${cap.name}` : 'Weather', value: cap ? weatherLine(w) : 'No city to check' },
    { label: 'Earthquakes', value: quakeWord },
  ]
  return {
    id: `country:${c.a3}`, level: 2, path: ['Earth', c.continent, c.name], title: c.name, subtitle: row?.capital ? `Capital ${row.capital}` : c.subregion || c.continent,
    flag: row?.flag, badge: live,
    layers: [
      { key: 'macro', lead: `${c.name} is ${row?.income ? row.income.toLowerCase() + ' ' : ''}in ${row?.region || c.subregion || c.continent}. The held reading is water, power, and the share not undernourished. It is not a published index.${cap ? ` ${cap.capital ? 'Its capital is' : 'Its largest mapped city is'} ${cap.name}.` : ''}`, items: macro, source: 'World Bank · Wikidata · Natural Earth · MET Norway · USGS' },
      {
        key: 'logic', lead: 'Each figure keeps the feed that returned it. Population, area, density, safely managed drinking water, electricity access, undernourishment, and adult literacy are the latest World Bank values for this code. Official languages are the ones Wikidata lists. The held reading averages water, electricity, and 100 minus undernourishment, and only when at least two of those answered.',
        items: [
          { label: 'Water', value: row ? pct(row.water) : 'Reading', wide: true },
          { label: 'Electricity', value: row ? pct(row.energy) : 'Reading' },
          { label: 'Undernourished', value: row ? pct(row.undernourished) : 'Reading' },
          { label: 'Adult literacy', value: row ? pct(row.literacy) : 'Reading', wide: true },
          ...(graded ? Object.entries(graded.grades).map(([k, g]) => ({ label: reg.sectors.find(s => s.key === k)?.name ?? k, value: GRADE_WORD[g.grade] })) : []),
        ],
        source: 'World Bank API · Wikidata · sector models where graded',
      },
      {
        key: 'physics', lead: `The measurable picture of ${c.name}. Blank means that series was not in the extract.`,
        items: [
          { label: 'People, World Bank', value: people },
          { label: `People, map (${c.popYear || 'year n/a'})`, value: bigNumber(c.pop) },
          { label: 'Land area', value: row?.areaKm2 ? `${Math.round(row.areaKm2.value).toLocaleString('en-US')} km² · ${row.areaKm2.year}` : 'not published' },
          { label: `Economy, map (${c.gdpYear || 'year n/a'})`, value: c.gdpMd ? `$${bigNumber(c.gdpMd * 1e6)}` : 'not recorded' },
          { label: 'Cities in the map', value: String(cities.length) },
          { label: 'Strongest quake, 24 h', value: q.strongest !== undefined ? `M ${q.strongest.toFixed(1)}` : '—' },
          ...(w ? [{ label: 'Wind at the capital', value: `${Math.round(w.windKmh)} km/h` }, { label: 'Weather checked', value: ago(w.at) }] : []),
        ],
        bars: cities.length > 1 ? { title: 'Largest cities · metro population on the map', rows: cities.slice(0, 5).map(x => ({ label: x.name, value: x.pop, display: bigNumber(x.pop) })) } : undefined,
        boundary: 'World Bank years differ by series. Adult literacy is often unpublished for high-income countries, and that blank is left blank. The map population is Natural Earth, not the World Bank count. The held reading is our mean, not a UN score.',
        source: 'World Bank · Natural Earth · MET Norway · USGS',
      },
    ],
    actions: [{ id: 'ask', label: 'Ask Iris', primary: true }, { id: 'lower', label: 'Go to its cities' }],
  }
}

function groundLines(g: GroundReport | undefined): CardItem[] {
  if (!g) return [{ label: 'Boards', value: 'Reading stops, plants, and fixtures', wide: true }]
  const items: CardItem[] = g.departures.slice(0, 6).map(d => ({ label: d.agency || d.stop || 'Departure', value: departureLine(d), wide: true }))
  if (g.plants.length) items.push({ label: 'Wastewater plants', value: g.plants.map(p => p.name).join(', '), wide: true })
  else items.push({ label: 'Wastewater plants', value: g.passes.find(p => p.source === 'OpenStreetMap')?.hole ?? 'none named', wide: true })
  if (g.fixtures.length) items.push(...g.fixtures.slice(0, 3).map(f => ({ label: f.league || 'Fixture', value: `${f.event} · ${f.when}`, wide: true })))
  else items.push({ label: 'Sport', value: g.passes.find(p => p.source === 'TheSportsDB')?.hole ?? 'no fixture', wide: true })
  items.push({ label: 'Aircraft heard', value: g.craft === null ? 'no state returned' : `${g.craft} in the box, not a timetable` })
  const audit = g.passes.find(p => p.role === 'audit')
  if (audit?.hole) items.push({ label: 'Boards not returned', value: audit.hole, wide: true })
  items.push(...activityItems(g.activity))
  return items
}

export function cityCard(city: City, country: Country | undefined, ctx: CardCtx): CardModel {
  const w = weatherFor(city.lat, city.lon, ctx)
  const q = quakesNear(ctx.feeds.values, (lat, lon) => arcDeg(lat, lon, city.lat, city.lon) < 3)
  const others = ctx.reg.cities.cities.filter(x => x.a3 === city.a3 && x !== city).sort((a, b) => arcDeg(city.lat, city.lon, a.lat, a.lon) - arcDeg(city.lat, city.lon, b.lat, b.lon)).slice(0, 3)
  const row = ctx.rowFor?.(city.a3)
  const langs = ctx.langFor?.(city.a3)
  const ground = groundNow(city.lat, city.lon)
  const langWord = langs?.length ? langs.join(', ') : langs === undefined ? 'Reading Wikidata' : 'not published'
  return {
    id: `city:${city.a3}:${city.name}`, level: 3, path: ['Earth', country?.name ?? city.a3, city.name], title: city.name,
    subtitle: city.capital ? `Capital · ${country?.name ?? ''}` : city.region || country?.name,
    flag: row?.flag,
    badge: w || ground ? { label: ground?.departures.length ? 'Boards' : 'Live weather', tone: 'live' } : { label: 'Reference map', tone: 'verified' },
    layers: [
      {
        key: 'macro', lead: `${city.name} is ${city.capital ? 'the capital of' : 'a city in'} ${country?.name ?? 'this country'}. Weather is this spot. The national figures belong to ${country?.name ?? 'the country'}, not a census of these streets. A departure is shown only when a board answered.`,
        items: [
          { label: 'Weather now', value: weatherLine(w) },
          { label: 'Metro on the map', value: bigNumber(city.pop) },
          { label: 'National languages', value: langWord, wide: true },
          { label: 'National density', value: row?.density ? `${row.density.value.toFixed(1)} / km²` : row === undefined ? 'Reading' : 'not published' },
          { label: 'National literacy', value: row ? pct(row.literacy) : 'Reading' },
          { label: 'Next board', value: ground?.departures[0] ? departureLine(ground.departures[0]) : ground ? 'no departure returned' : 'Reading stops', wide: true },
          { label: 'Confirmed here', value: confirmFor(`city:${city.a3}:${city.name}`) ? 'A tap from this phone, at this mapped point' : 'Not confirmed. A page is not a person at the door.', wide: true },
        ],
        source: 'MET Norway · Natural Earth · World Bank · Wikidata · Transitous',
      },
      {
        key: 'logic', lead: 'Weather is fetched for this coordinate. Metro population is the Natural Earth estimate. Water, power, food, literacy, and density are the country series, labeled as national. Stops and departures come from Transitous, which aggregates GTFS. A subway, rail, bus, or air board that does not answer stays missing. Wastewater plants are named OpenStreetMap features in a 12 km radius. A club is the first TheSportsDB name match, and only its next fixtures. Aircraft heard are OpenSky positions, not a departure board. Belleville’s named places are Wikidata items located in that city. A class with no item stays empty.',
        items: (ground?.passes ?? [{ role: 'audit', source: 'ground', found: 'Reading', hole: null }]).map(p => ({ label: p.role, value: p.hole ? `${p.source}: ${p.hole}` : `${p.source}: ${p.found}`, wide: true })),
        boundary: 'National figures are not this municipality. No private-car timetable exists in these feeds. A blank board was not invented.',
        source: 'Transitous · OpenStreetMap · TheSportsDB · OpenSky · World Bank',
      },
      {
        key: 'physics', lead: `What answered for ${city.name}, and what did not.`,
        items: [
          { label: 'Position', value: `${city.lat.toFixed(2)}°, ${city.lon.toFixed(2)}°` },
          { label: 'Metro population', value: bigNumber(city.pop) },
          { label: 'Country held reading', value: row?.held != null ? `${row.held.toFixed(1)}` : 'not seated' },
          { label: 'Earthquakes within 300 km', value: q.n === 0 ? 'None in the last day' : `${q.n}, strongest M ${q.strongest?.toFixed(1) ?? '—'}` },
          ...(w ? [{ label: 'Wind', value: `${Math.round(w.windKmh)} km/h` }, { label: 'Checked', value: ago(w.at) }] : []),
          { label: 'Neighbours on the map', value: others.map(o => o.name).join(', ') || '—', wide: true },
          ...groundLines(ground),
        ],
        boundary: 'Metro population is a Natural Earth estimate, not a census. Departures are the next rows the stop returned, in that stop’s timezone. Realtime is marked only when the feed set the flag.',
        source: 'Natural Earth · MET Norway · USGS · Transitous · OpenStreetMap · TheSportsDB · OpenSky',
      },
    ],
    actions: [{ id: 'ask', label: 'Ask Iris', primary: true }, { id: 'here', label: "I'm here" }, { id: 'street', label: 'Street level' }],
  }
}

const KIND_WORD: Record<Mark['kind'], string> = {
  star: 'Star',
  cluster: 'Cluster',
  nebula: 'Nebula',
  remnant: 'Remnant',
  compact: 'Compact object',
  center: 'Galactic center',
  cloud: 'Cloud',
}

function markCard(id: string): CardModel | null {
  const mark = MARKS.find(row => row.id === id)
  if (!mark) return null
  const seat = correlate(mark)
  const place = galactocentric(mark)
  const near = companions(mark)
  const where = near.length ? ` Drawn with it: ${near.map(row => row.name).join(', ')}.` : ''
  return {
    id: `mark:${mark.id}`,
    level: 5,
    path: ['Milky Way', KIND_WORD[mark.kind], mark.name],
    title: mark.name,
    subtitle: seat.seated ? 'Seated in the disk' : 'Not seated',
    badge: mark.claim === 'REPORTED' ? { label: 'Reported', tone: 'verified' } : { label: 'Modeled', tone: 'empirical' },
    layers: [
      {
        key: 'macro',
        lead: `${mark.name} is a named object in this galaxy. The pass seats it only when the instruments are ones we hold and it has not crossed the stellar disk.${where}`,
        source: 'Milky Way pass',
      },
      {
        key: 'logic',
        lead: 'The way out learns the disk and lights nothing. At the rim the pass turns and fills inward, outer marks first. DCLM correlation here is a local observation. Nothing was sent to the origin, so there is no receipt, and authority stays none.',
        items: [
          { label: 'Verdict', value: seat.verdict },
          { label: 'Authority', value: 'None' },
          { label: 'Instruments', value: mark.by.join(', '), wide: true },
        ],
        source: 'DCLM ingress contract. Not called.',
      },
      {
        key: 'physics',
        lead: 'The numbers this pass holds. Not a new reduction.',
        items: [
          { label: 'From the Sun', value: mark.sunKpc < 0.1 ? `${Math.round(mark.sunKpc * 1000)} parsecs` : `${mark.sunKpc} kpc` },
          { label: 'From the center', value: `${place.r.toFixed(1)} kpc` },
          { label: 'Longitude', value: `${mark.l.toFixed(2)}°` },
          { label: 'Latitude', value: `${mark.b.toFixed(2)}°` },
          { label: 'Note', value: mark.note, wide: true },
        ],
        boundary: 'Spiral arms are not drawn. Gaia, DECaPS2, 2MASS, AllWISE, Hipparcos, and the Harris list are held as counts. Their rows are not plotted. Pictures are not ingested. Past 15 kpc is still the barrier. A Messier landing is in the sky with the planets, not a bead on this disk.',
        source: 'Published positions and catalogue totals. Harris 2010 where a cluster says so.',
      },
    ],
    actions: [{ id: 'ask', label: 'Ask Iris', primary: true }],
  }
}

export function cardFor(t: Target, ctx: CardCtx): CardModel | null {
  const { reg, integrity, feeds, discovered } = ctx
  const ask = { id: 'ask', label: 'Ask Iris', primary: true }
  switch (t.kind) {
    case 'jurisdiction': {
      const j = reg.jurisdictions.find(x => x.name === t.key)
      if (!j) return null
      const g = Object.entries(j.grades)
      const best = g.filter(([, v]) => v.grade === 'AT BENCHMARK').map(([k]) => reg.sectors.find(s => s.key === k)?.name ?? k)
      return {
        id: `jur:${j.name}`, level: 2, path: ['Earth', 'Sector research', j.name], title: j.name, subtitle: 'Sector country model',
        badge: { label: 'Pilot research', tone: 'pilot' },
        layers: [
          { key: 'macro', lead: best.length ? `${j.name} leads the benchmark in ${best.join(' and ')}.` : `How ${j.name} compares with the best in each sector.`, items: g.map(([k, v]) => ({ label: reg.sectors.find(s => s.key === k)?.name ?? k, value: GRADE_WORD[v.grade] })), source: 'Sector country models' },
          { key: 'logic', lead: 'Each sector picks a benchmark country. Every other country is graded against it: at benchmark, near, gapped or thin.', items: g.map(([k, v]) => ({ label: reg.sectors.find(s => s.key === k)?.name ?? k, value: sentence(v.fact), wide: true })), source: 'Sector country models' },
          { key: 'physics', lead: 'Grades on one scale.', bars: { title: 'Grade by sector', rows: g.map(([k, v]) => ({ label: reg.sectors.find(s => s.key === k)?.name ?? k, value: GRADE_SCORE[v.grade], display: GRADE_WORD[v.grade] })) }, boundary: `Pilot research from ${reg.sectors[0]?.researched ?? '2026'}. Modeled analysis, not a live feed.`, source: 'Sector country models' },
        ],
        actions: [ask, { id: 'country', label: 'See the country' }],
      }
    }
    case 'canada': {
      const c = reg.canada.find(x => x.key === t.key)
      if (!c) return null
      return {
        id: `canada:${c.key}`, level: 3, path: ['Earth', 'Canada', c.name], title: c.name, subtitle: 'Pan-Canadian scope',
        badge: { label: 'Specification', tone: 'design' },
        layers: [
          { key: 'macro', lead: `How the health runtime would connect in ${c.name}, without ever holding patient data.`, items: [{ label: 'Systems', value: c.systems, wide: true }], source: 'SIMA-DCLM RTE specification' },
          { key: 'logic', lead: 'The runtime reads through each portal’s own rules and keeps nothing.', items: [{ label: 'Guard', value: c.guard, wide: true }], boundary: 'Invariant: no personal health information is ingested, logged or retained.', source: 'SIMA-DCLM RTE specification' },
        ],
        actions: [ask],
      }
    }
    case 'rte': {
      const [key, depthRaw] = t.key.split('#')
      const r = reg.rtes.find(x => x.key === key)
      if (!r) return null
      const depth = depthRaw === undefined ? null : Number(depthRaw)
      const facts = r.facts
      const parts = (r.about || r.job).split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(Boolean)
      const physicsLead = depth !== null && facts[depth]
        ? sentence(facts[depth])
        : facts.length
          ? `${facts.length} deep. That is the whole record.`
          : gapProtocol(`${r.name} · facts`)
      return {
        id: `rte:${r.key}`, level: 3, path: ['Universal RTE', r.name, depth !== null ? `Depth ${depth + 1}` : 'Full depth'], title: r.name, subtitle: r.kind === 'suite' ? 'RTE room' : r.kind === 'unity' ? 'Unity RTE' : 'RTE specification',
        badge: statusTone(r.status),
        layers: [
          { key: 'macro', lead: sentence(r.job || r.about), items: [{ label: 'Status', value: statusTone(r.status).label }, { label: 'Kind', value: r.kind === 'suite' ? 'Room in the suite' : r.kind === 'unity' ? 'Unity runtime' : 'Specification' }, { label: 'Depth', value: facts.length ? `${facts.length} in the record` : '0:1' }], source: 'RTE suite' },
          { key: 'logic', lead: sentence(parts[0] || r.about || r.job), items: parts.slice(1).map((part, i) => ({ label: String(i + 2).padStart(2, '0'), value: sentence(part), wide: true })), source: 'RTE suite' },
          { key: 'physics', lead: physicsLead, items: facts.length ? facts.map((f, i) => ({ label: String(i + 1).padStart(2, '0'), value: sentence(f), wide: true })) : [{ label: 'Loaded', value: gapLine(`${r.name} · facts`), wide: true }], boundary: `Recorded status: ${r.status}. Opening the room does not change that status.`, source: 'RTE suite manifest' },
        ],
        actions: [ask],
      }
    }
    case 'chamber': {
      const c = reg.chambers.find(x => x.key === t.key)
      if (!c) return null
      return {
        id: `chamber:${c.key}`, level: 2, path: ['Unity playground', c.title], title: c.title, subtitle: 'Chamber',
        badge: discovered.has(c.key) ? { label: 'Discovered', tone: 'verified' } : statusTone(c.status),
        layers: [
          { key: 'macro', lead: sentence(c.headline), items: c.summary.slice(0, 2).map((s, i) => ({ label: i ? 'And' : 'In short', value: sentence(s), wide: true })), source: c.source },
          { key: 'logic', lead: c.quotes[0] ? `“${c.quotes[0].text}”` : 'No quote is on record for this chamber.', items: c.quotes.slice(1, 3).map(q => ({ label: q.who, value: `“${q.text}”`, wide: true })), source: c.source },
          { key: 'physics', lead: 'The record behind this chamber.', items: [{ label: 'Status', value: c.status }, { label: 'Cards in the chamber', value: String(c.cards) }, { label: 'Source', value: c.source, wide: true }], source: c.source },
        ],
        actions: [ask],
      }
    }
    case 'sector': {
      if (t.key === 'pharmacology') {
        const p = reg.pharmacology
        return {
          id: 'sector:pharmacology', level: 1, path: ['Sector layers', 'Pharmacology'], title: 'Pharmacology', subtitle: 'Sector layer',
          badge: { label: 'Design', tone: 'design' },
          layers: [
            { key: 'macro', lead: 'Medicines, from discovery to the pharmacy shelf. Mapped, not yet graded.', items: [{ label: 'State', value: 'Design stage' }, { label: 'Data estates', value: 'Named, not researched' }], source: p.source },
            { key: 'logic', lead: sentence(p.arc), items: p.estates.map(e => ({ label: e.name, value: e.note, wide: true })), boundary: 'No grades are assigned, because the estate research has not been done.', source: p.source },
          ],
          actions: [ask],
        }
      }
      const s = reg.sectors.find(x => x.key === t.key)
      if (!s) return null
      const order: Grade[] = ['AT BENCHMARK', 'NEAR', 'GAPPED', 'THIN']
      return {
        id: `sector:${s.key}`, level: 1, path: ['Sector layers', s.name], title: s.name, subtitle: 'Sector layer',
        badge: { label: 'Pilot research', tone: 'pilot' },
        layers: [
          { key: 'macro', lead: sentence(s.headline), items: [{ label: 'Benchmark', value: s.benchmark }, { label: 'Scope', value: s.scope }], source: s.source },
          { key: 'logic', lead: `Every country is compared with ${s.benchmark}. Tap a pillar on the globe to see one country’s grade.`, items: s.rows.slice(0, 6).map(r => ({ label: r.jurisdiction, value: GRADE_WORD[r.grade] })), source: s.source },
          { key: 'physics', lead: 'How the graded countries spread.', bars: { title: 'Countries per grade', rows: order.map(g => ({ label: GRADE_WORD[g], value: s.counts[g] ?? 0, display: String(s.counts[g] ?? 0) })) }, boundary: `Pilot research from ${s.researched}. ${s.state}`, source: s.source },
        ],
        actions: [ask],
      }
    }
    case 'estates': return cardFor({ kind: 'sector', key: 'pharmacology' }, ctx)
    case 'dclm': {
      const locked = integrity.filter(m => m.state === 'MATCH').length
      const all = integrity.length
      return {
        id: 'dclm', level: 1, path: ['DCLM'], title: 'The DCLM', subtitle: 'Deterministic Compute Logic Machine',
        badge: locked === all ? { label: 'All data checked', tone: 'verified' } : { label: 'Check failed', tone: 'offline' },
        layers: [
          { key: 'macro', lead: 'DCLM holds nothing. It has no framework to bind to. The computer is API v2, the gateway, not a person walking through it. People connect through it with a validated Unity ID. This page has not bound Genesis, and it will not bind you.', items: [{ label: 'Held', value: 'Nothing' }, { label: 'Data checked', value: locked === all ? 'On this device' : `${locked} of ${all} on this device` }, { label: 'Genesis', value: 'Not bound from here' }], source: 'DCLM API v2' },
          { key: 'logic', lead: 'Each data file was sent to the DCLM twice. Both receipts had to agree. Your browser then re-fingerprints each file before using it, and refuses any file that does not match.', boundary: 'Client-side integrity status. Not a seal, not a finalization, not an approval, and not a Trinity verdict.', source: 'DCLM API v2 · public/dclm-receipts.json' },
          { key: 'physics', lead: 'Receipts show only the sequence, input digest, and state digest returned by API v2. The long hash beside them was computed in this browser. It is not from the kernel.', items: integrity.flatMap(m => [
            { label: m.module, value: `${m.state} · client-side integrity, not a seal`, wide: true },
            ...(m.clientSha256 ? [{ label: `${m.module} client hash`, value: m.clientSha256, wide: true }] : []),
            ...(m.receipt?.receipts ?? []).map(r => ({ label: `${m.module} receipt`, value: `sequence ${r.sequence ?? '—'} · input ${r.inputDigest ?? '—'} · state ${r.stateDigest ?? '—'}`, wide: true })),
          ]), source: 'DCLM receipts · packet fields only' },
        ],
        actions: [ask],
      }
    }
    case 'pipe': {
      const pipe = ctx.pipe
      const frame = pipe?.frames[0]
      const short = (hex: string) => hex.length > 18 ? `${hex.slice(0, 10)}…${hex.slice(-6)}` : hex
      return {
        id: `pipe:${t.key}`, level: 2, path: ['DCCP pipe', t.key], title: 'DCCP pipe', subtitle: pipe?.member ? 'Member frame stream' : 'Sealed · members only',
        badge: { label: pipe?.member ? 'Draft' : 'Not public', tone: 'design' },
        layers: [
          { key: 'macro', lead: 'A CID is the name of one exact copy of this world. Change the world, and it needs a new name. You don\'t reuse the old one. This rule is still a draft. Trinity hasn\'t passed it.', items: [{ label: 'Law', value: 'Draft, not in force' }, { label: 'Current CID', value: 'Not published yet' }, { label: 'You are at', value: t.key }], source: 'LAW-CID-MAPPING-DUALIS-2026-10-03-V1' },
          { key: 'logic', lead: 'The check is the same hash coming back out. The other pipe recomputes it and holds nothing. A pin is not an auditor. On this device the same note twice is ignored. A missing step or a clash is refused. Nothing is published.', boundary: 'I can\'t bind a jacket from here. Your key stays offline. Don\'t paste a PEM into this page.', source: 'CID mapping law, draft' },
          { key: 'physics', lead: pipe?.member ? 'One note, on this device only. A fingerprint is not a name, and the old lander name is not this world.' : 'The notes stay closed until a Unity handle is on this device. That still does not publish anything.', items: [
            { label: 'Public page', value: 'dualiscapax.ai/builder', wide: true },
            { label: 'Hosted at', value: 'the Manus world', wide: true },
            { label: 'Old lander name', value: 'History only. Not this world.', wide: true },
            ...(frame ? [{ label: 'Note', value: String(frame.sequence) }, { label: 'Its identity', value: short(frame.eventId) }, { label: 'Chained to', value: short(frame.stateDigest) }] : []),
          ], source: 'Kept in memory. Not a publish.' },
        ],
        actions: [ask],
      }
    }
    case 'universal': {
      if (t.key === 'construct') {
        const scene = drawnConstruct()
        return {
          id: 'construct', level: 2, path: ['Universal RTE', 'Construct'], title: scene.empty ? 'Construct' : scene.title, subtitle: 'Drawn for this look',
          badge: { label: scene.empty ? 'Empty' : 'Drawn', tone: scene.empty ? 'design' : 'verified' },
          layers: [
            { key: 'macro', lead: scene.empty ? 'The room is empty. Say what you want to look at.' : `Iris drew ${scene.title} because you asked to look at it.`, source: 'The record already held' },
            { key: 'logic', lead: 'She builds the room from the record. She does not invent the rest.', items: (scene.lines.length ? scene.lines : ['Nothing loaded.']).map((line, i) => ({ label: String(i + 1).padStart(2, '0'), value: sentence(line), wide: true })), source: 'Universal RTE construct' },
            { key: 'physics', lead: scene.empty ? '0:1. There was nothing to draw.' : `${scene.lines.length} lines, and no more.`, boundary: 'A drawn room is not a live system, and it is not a place you are standing in.', source: 'Universal RTE construct' },
          ],
          actions: [ask],
        }
      }
      return {
      id: 'universal', level: 1, path: ['Universal RTE'], title: 'Universal RTE', subtitle: 'The root runtime',
      badge: { label: 'Doctrine', tone: 'design' },
      layers: [
        { key: 'macro', lead: sentence(reg.doctrine.universal_rte ?? 'The root runtime every RTE grows from.'), items: [{ label: 'Rule', value: 'One RTE per Unity ID' }, { label: 'Construct', value: 'Say what you want to look at' }], source: 'Doctrine' },
        { key: 'logic', lead: 'The plates are the determined landings. They stay put. Ask Iris what you want to see and she draws an offshoot from the record.', source: 'Doctrine' },
      ],
      actions: [ask],
    }
    }
    case 'feed': {
      const st = feeds.status.get(t.key as keyof FeedValues)
      if (!st) return null
      const tone: Tone = st.state === 'LIVE' ? 'live' : st.state === 'STALE' ? 'stale' : st.state === 'UNAVAILABLE' ? 'offline' : 'pilot'
      return {
        id: `feed:${t.key}`, level: 1, path: ['Live feeds', st.title], title: st.title, subtitle: `${st.source} · ${ago(st.lastOk)}`,
        badge: { label: st.state === 'PENDING' ? 'Connecting' : st.state.toLowerCase().replace(/^./, c => c.toUpperCase()), tone },
        layers: [
          { key: 'macro', lead: ctx.describe(t), source: st.source },
          { key: 'logic', lead: st.state === 'LIVE' ? 'The reading is the source\'s own frame. The time between frames is not filled.' : `No number yet. Best path: the source has to answer with a time. DCLM does not draw the frame in between. Failures in a row: ${st.failures}.`, items: [{ label: 'Source', value: st.source, wide: true }, { label: 'Cadence', value: 'The poll is the source\'s pace, not a nano frame.', wide: true }], source: st.source },
          { key: 'physics', lead: 'Feed health.', items: [{ label: 'Last good reading', value: ago(st.lastOk) }, { label: 'Failures in a row', value: String(st.failures) }, ...(st.lastError ? [{ label: 'Last error', value: st.lastError, wide: true }] : [])], source: st.source },
        ],
        actions: [ask],
      }
    }
    case 'earth': return {
      id: 'earth', level: 1, path: ['Earth'], title: 'Earth', subtitle: 'The overlook',
      badge: { label: 'Imagery of record', tone: 'verified' },
      layers: [
        { key: 'macro', lead: 'NASA Blue Marble by day and Black Marble by night, lit by where the sun is right now. Come closer and the borders appear. Tap a country.', source: 'NASA Visible Earth' },
      ],
    }
    case 'ground':
      return t.key === 'easthill' ? easthillCard(phoneFix()) : null
    case 'mark': return markCard(t.key)
    default: return null
  }
}
