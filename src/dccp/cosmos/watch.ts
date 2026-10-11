/** A page-local watch for close approaches and the debris belts agencies already name.
 * It reads NASA/JPL while this page is open. It does not steer a craft.
 * A zone is real only when a named office describes it. A missing census stays a hole.
 */

export const WINDOW_AU = 0.05
export const AU_KM = 149_597_870.7
export const LD_KM = 384_399
const C_KM_S = 299_792.458

export type Kind = 'asteroid' | 'comet'
export type Step = 'GATHER' | 'CALCULATE' | 'ANALYZE' | 'RECALCULATE'

export interface Approach {
  des: string
  when: string
  distAu: number
  distMinAu: number
  distMaxAu: number
  vRel: number
  kind: Kind
}

export interface Zone {
  id: string
  name: string
  where: string
  why: string
  source: string
  href: string
  real: true
  census: null
}

/** Named by an agency. The object count is not in the close-approach feed, so the census is a hole. */
export const ZONES: readonly Zone[] = [
  {
    id: 'leo',
    name: 'Low Earth orbit',
    where: 'About 160 to 2,000 km above Earth',
    why: 'The crowded band. NASA treats this as the region with the most operational risk from debris.',
    source: 'NASA Orbital Debris Program Office',
    href: 'https://orbitaldebris.jsc.nasa.gov/',
    real: true,
    census: null,
  },
  {
    id: 'geo',
    name: 'Geostationary ring',
    where: 'About 35,786 km above the equator',
    why: 'A thin ring where satellites share one altitude. NASA names it as a protected region.',
    source: 'NASA Orbital Debris Program Office',
    href: 'https://orbitaldebris.jsc.nasa.gov/',
    real: true,
    census: null,
  },
  {
    id: 'corridor',
    name: 'Earth close-approach window',
    where: 'Inside 0.05 AU of Earth, which is what this watch asks JPL for',
    why: 'Not a belt. It is the boundary of this observation. A body inside it is real when JPL lists that body.',
    source: 'NASA/JPL SBDB Close Approach Data API',
    href: 'https://ssd-api.jpl.nasa.gov/doc/cad.html',
    real: true,
    census: null,
  },
  {
    id: 'belt',
    name: 'Main asteroid belt',
    where: 'About 2.1 to 3.3 AU from the Sun',
    why: 'A dense small-body population. It is not the highest collision risk for Earth. Most of it never comes here.',
    source: 'NASA/JPL Small-Body Database',
    href: 'https://ssd.jpl.nasa.gov/',
    real: true,
    census: null,
  },
]

export const WATCH_ROLES = [
  { id: 'surveyor', step: 'GATHER' as const, job: 'Read the JPL close-approach page. One request. No second catalog is invented beside it.' },
  { id: 'fitter', step: 'CALCULATE' as const, job: 'Turn the miss into lunar distances, kilometres, and the light-time across it.' },
  { id: 'hazard', step: 'ANALYZE' as const, job: 'Mark the nearest nominal miss as the max friction inside this window. Show JPL\'s distance range beside it.' },
  { id: 'return', step: 'RECALCULATE' as const, job: 'Walk back from the far end of the reading to Earth, and write both perspectives again.' },
] as const

export interface CadPage {
  source: string
  version: string
  total: number
  rows: Approach[]
}

const num = (v: unknown): number => {
  const n = typeof v === 'number' ? v : Number(v)
  return Number.isFinite(n) ? n : NaN
}

export function bodyKind(des: string): Kind {
  return /(?:^|[^A-Z])[PC]\/|^\d+P\b/i.test(des) ? 'comet' : 'asteroid'
}

export function parseCad(json: unknown): CadPage | null {
  const page = json as { signature?: { source?: unknown; version?: unknown }; count?: unknown; total?: unknown; fields?: unknown; data?: unknown }
  const fields = Array.isArray(page?.fields) ? page.fields.map(String) : []
  const data = Array.isArray(page?.data) ? page.data : null
  if (!data || !fields.length) return null
  const at = (name: string) => fields.indexOf(name)
  const iDes = at('des')
  const iWhen = at('cd')
  const iDist = at('dist')
  const iMin = at('dist_min')
  const iMax = at('dist_max')
  const iV = at('v_rel')
  if (iDes < 0 || iDist < 0) return null
  const rows: Approach[] = []
  for (const raw of data) {
    if (!Array.isArray(raw)) continue
    const distAu = num(raw[iDist])
    if (!Number.isFinite(distAu)) continue
    const des = String(raw[iDes] ?? '')
    rows.push({
      des,
      when: iWhen >= 0 ? String(raw[iWhen] ?? '') : '',
      distAu,
      distMinAu: iMin >= 0 ? num(raw[iMin]) : distAu,
      distMaxAu: iMax >= 0 ? num(raw[iMax]) : distAu,
      vRel: iV >= 0 ? num(raw[iV]) : NaN,
      kind: bodyKind(des),
    })
  }
  const total = num(page.total)
  return {
    source: String(page.signature?.source ?? 'NASA/JPL SBDB Close Approach Data API'),
    version: String(page.signature?.version ?? ''),
    total: Number.isFinite(total) ? total : rows.length,
    rows,
  }
}

export function lunar(au: number): number {
  return (au * AU_KM) / LD_KM
}

export function friction(distAu: number, windowAu = WINDOW_AU): number {
  if (!Number.isFinite(distAu) || windowAu <= 0) return 0
  return Math.min(1, Math.max(0, 1 - distAu / windowAu))
}

const fmt = (n: number): string => (Number.isFinite(n) ? (Math.round(n * 100) / 100).toFixed(2) : '—')

export function perspectives(row: Approach): { earth: string; object: string } {
  const ld = lunar(row.distAu)
  const km = row.distAu * AU_KM
  const light = km / C_KM_S
  const near = Number.isFinite(row.distMinAu) ? lunar(row.distMinAu) : NaN
  const far = Number.isFinite(row.distMaxAu) ? lunar(row.distMaxAu) : NaN
  const moon = ld < 1
    ? 'The nominal miss is inside the Moon\'s average distance from Earth. That is not a claim it passes the Moon.'
    : 'The nominal miss is outside the Moon\'s average distance.'
  const range = Number.isFinite(near) && Number.isFinite(far)
    ? `JPL's distance range is ${fmt(near)} to ${fmt(far)} lunar distances. The near edge is the uncertainty, not a second prediction.`
    : 'JPL did not give a distance range on this row.'
  const speed = Number.isFinite(row.vRel) ? `${fmt(row.vRel)} km/s relative` : 'no relative speed on this row'
  return {
    earth: `From Earth, ${row.des} (${row.kind}) is ${fmt(ld)} lunar distances out${row.when ? ` on ${row.when}` : ''}, at ${speed}. ${moon} ${range}`,
    object: `From ${row.des}, Earth is the body that passes, at the same ${fmt(ld)} lunar distances. The direction is the reverse. Light takes ${light.toFixed(1)} seconds to cross that miss, each way. ${row.des} does not report a view. This is the geometry, not a camera on the object.`,
  }
}

export interface Pass {
  out: string
  back: string
  boundary: string
  nearest: Approach | null
}

export function bothWays(rows: Approach[]): Pass {
  if (!rows.length) {
    return {
      out: 'Nothing to walk out from Earth.',
      back: 'Nothing to walk back.',
      boundary: 'The window asked for was 0.05 AU. JPL returned no rows in this reading.',
      nearest: null,
    }
  }
  const out = [...rows].sort((a, b) => a.distAu - b.distAu)
  const near = out[0]
  const far = out[out.length - 1]
  return {
    out: `Out from Earth, nearest first: ${out.map(row => row.des).join(', ')}.`,
    back: `Back in from the far end: ${[...out].reverse().map(row => row.des).join(', ')}.`,
    boundary: `The core of this watch is Earth. The near end is ${near.des} at ${fmt(near.distAu)} AU. The far end of this reading is ${far.des} at ${fmt(far.distAu)} AU. The window asked for was ${WINDOW_AU} AU.`,
    nearest: near,
  }
}

export function guidance(page: CadPage | null, pass: Pass): string {
  if (!page) return 'JPL did not answer. No approach is invented. The debris belts stay named by NASA, and their object count is still not loaded. This page is not a space agency.'
  if (!pass.nearest) return `JPL answered (${page.source}, version ${page.version}) and listed no row in this reading. ${page.total} is their count for the query. LEO and the GEO ring are still the crowded places, and this feed does not count the debris. Do not steer a spacecraft from this page.`
  const ld = lunar(pass.nearest.distAu)
  const comets = page.rows.filter(row => row.kind === 'comet').length
  const score = friction(pass.nearest.distAu)
  return `${page.total} close approaches sit inside 0.05 AU on JPL's count. This reading holds ${page.rows.length}, ${comets} of them comets. Max friction in the window is ${pass.nearest.des} at ${fmt(ld)} lunar distances, friction ${score.toFixed(2)}. Earth is the body being approached. The Moon is only the ruler for distance. The debris belts are real because NASA names them, and their census is a hole. Do not steer a spacecraft from this page.`
}

export interface WatchReport {
  cycle: number
  steps: readonly Step[]
  page: CadPage | null
  pass: Pass
  words: string
  roles: typeof WATCH_ROLES
  zones: readonly Zone[]
}

export function runCycle(json: unknown, cycle: number): WatchReport {
  const page = parseCad(json)
  const pass = bothWays(page?.rows ?? [])
  return {
    cycle,
    steps: ['GATHER', 'CALCULATE', 'ANALYZE', 'RECALCULATE'],
    page,
    pass,
    words: guidance(page, pass),
    roles: WATCH_ROLES,
    zones: ZONES,
  }
}

let held: WatchReport | null = readWatch()

function readWatch(): WatchReport | null {
  try {
    const raw = localStorage.getItem('dccpworld.watch.v1')
    if (!raw) return null
    const parsed = JSON.parse(raw) as WatchReport
    if (!parsed || typeof parsed.words !== 'string' || !Array.isArray(parsed.steps)) return null
    return parsed
  } catch {
    return null
  }
}

export function holdWatch(report: WatchReport): void {
  held = report
  try { localStorage.setItem('dccpworld.watch.v1', JSON.stringify(report)) } catch { /* private mode */ }
}

export function heldWatch(): WatchReport | null {
  return held
}

export function watchWords(): string {
  if (!held) return 'The watch has not read JPL yet. No asteroid, comet, or debris count is invented while it waits. It runs only while this page is open.'
  return held.words
}

function esc(s: string): string {
  return s.replace(/[&<>"]/g, c => (c === '&' ? '\u0026amp;' : c === '<' ? '\u0026lt;' : c === '>' ? '\u0026gt;' : '\u0026quot;'))
}

export function renderWatch(report: WatchReport): string {
  const roles = report.roles.map(role => `<li><strong>${esc(role.id)}</strong> · ${esc(role.step)}. ${esc(role.job)}</li>`).join('')
  const zones = report.zones.map(zone => `<article class="res-row"><p class="res-kicker">real · census not loaded</p><h3>${esc(zone.name)}</h3><p>${esc(zone.where)}</p><p>${esc(zone.why)}</p><p><a href="${esc(zone.href)}" target="_blank" rel="noopener noreferrer">${esc(zone.source)}</a></p></article>`).join('')
  const rows = report.page?.rows.length
    ? report.page.rows.map(row => {
        const view = perspectives(row)
        return `<article class="res-row"><p class="res-kicker">${esc(row.kind)} · friction ${friction(row.distAu).toFixed(2)}</p><h3>${esc(row.des)}</h3><p>${esc(view.earth)}</p><p>${esc(view.object)}</p></article>`
      }).join('')
    : '<p>No row in this reading.</p>'
  const head = report.page
    ? `${esc(report.page.source)} ${esc(report.page.version)} · their count ${report.page.total}`
    : 'JPL did not answer'
  return `<p class="res-kicker">Cycle ${report.cycle} · ${report.steps.join(' → ')}</p><p>${esc(report.words)}</p><h3>The swarm</h3><ol class="watch-roles">${roles}</ol><h3>Out, then back</h3><p>${esc(report.pass.out)}</p><p>${esc(report.pass.back)}</p><p>${esc(report.pass.boundary)}</p><h3>What interacts</h3><p>Earth is the body JPL measured these approaches against. The Moon sets the 1 lunar-distance mark and is not a second target. Planets are outside this query. Other approaches in the same window are the company each object keeps.</p><h3>The rows</h3>${rows}<h3>Friction zones</h3>${zones}`
}
