/** What the ground returned for one city: stops, departures, sewer plants, a club, aircraft heard.
 * A feed that does not answer is a hole. It is not filled in.
 */

import type { Activity } from './activity.ts'

export interface StopHit { stopId: string; name: string; modes: string[]; lat: number; lon: number }

export interface Departure {
  mode: string
  route: string
  head: string
  agency: string
  stop: string
  tz: string
  depart: string
  scheduled: string
  live: boolean
}

export interface Plant { name: string }
export interface Fixture { event: string; when: string; league: string }

export interface Pass { role: string; source: string; found: string; hole: string | null }

export interface GroundReport {
  departures: Departure[]
  plants: Plant[]
  fixtures: Fixture[]
  craft: number | null
  passes: Pass[]
  activity?: Activity
}

const MODE_WORD: Record<string, string> = {
  BUS: 'Bus', COACH: 'Coach', SUBWAY: 'Subway', RAIL: 'Rail', TRAM: 'Tram', FERRY: 'Ferry', AIRPLANE: 'Air',
}

export function modeWord(mode: string): string {
  return MODE_WORD[mode] ?? mode.toLowerCase()
}

export function parseStops(json: unknown): StopHit[] {
  if (!Array.isArray(json)) return []
  const out: StopHit[] = []
  for (const row of json) {
    const stopId = String(row?.stopId ?? '')
    const lat = Number(row?.lat)
    const lon = Number(row?.lon)
    if (!stopId || !Number.isFinite(lat) || !Number.isFinite(lon)) continue
    const modes = Array.isArray(row?.modes) ? row.modes.map((m: unknown) => String(m)) : []
    out.push({ stopId, name: String(row?.name ?? 'Stop'), modes, lat, lon })
  }
  return out
}

/** One stop from each mode, nearest the landing, capped so we do not fan out. */
export function pickStops(stops: StopHit[], lat: number, lon: number, limit = 3): StopHit[] {
  const ranked = [...stops].sort((a, b) => (a.lat - lat) ** 2 + (a.lon - lon) ** 2 - ((b.lat - lat) ** 2 + (b.lon - lon) ** 2))
  const seen = new Set<string>()
  const out: StopHit[] = []
  for (const stop of ranked) {
    const mode = stop.modes[0] ?? 'OTHER'
    if (seen.has(mode)) continue
    seen.add(mode)
    out.push(stop)
    if (out.length >= limit) break
  }
  return out
}

export function parseDepartures(json: unknown): Departure[] {
  const rows = (json as { stopTimes?: {
    mode?: string
    routeShortName?: string
    displayName?: string
    headsign?: string
    agencyName?: string
    realTime?: boolean
    place?: { departure?: string; arrival?: string; scheduledDeparture?: string; scheduledArrival?: string; name?: string; tz?: string; modes?: string[] }
  }[] })?.stopTimes
  if (!Array.isArray(rows)) return []
  const out: Departure[] = []
  for (const row of rows) {
    const place = row.place ?? {}
    const depart = String(place.departure ?? place.arrival ?? '')
    if (!depart) continue
    out.push({
      mode: String(row.mode ?? place.modes?.[0] ?? 'TRANSIT'),
      route: String(row.routeShortName || row.displayName || '').trim(),
      head: String(row.headsign ?? '').trim(),
      agency: String(row.agencyName ?? '').trim(),
      stop: String(place.name ?? ''),
      tz: String(place.tz ?? 'UTC'),
      depart,
      scheduled: String(place.scheduledDeparture ?? place.scheduledArrival ?? ''),
      live: row.realTime === true,
    })
  }
  return out
}

export function clock(iso: string, tz: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  try {
    return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: tz || 'UTC' }).format(d)
  } catch {
    return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: 'UTC' }).format(d)
  }
}

export function departureLine(d: Departure): string {
  const when = clock(d.depart, d.tz)
  const sched = d.scheduled ? clock(d.scheduled, d.tz) : ''
  const slip = d.live && sched && sched !== when ? ` live, board said ${sched}` : d.live ? ' live' : ''
  const route = d.route ? `${d.route} ` : ''
  return `${modeWord(d.mode)} ${route}${d.head || d.stop} · ${when}${slip}`.replace(/\s+/g, ' ').trim()
}

export function parsePlants(json: unknown): Plant[] {
  const elements = (json as { elements?: { tags?: { name?: string } }[] })?.elements
  if (!Array.isArray(elements)) return []
  const names = elements.map(el => String(el?.tags?.name ?? '').trim()).filter(Boolean)
  return [...new Set(names)].slice(0, 6).map(name => ({ name }))
}

export function parseTeams(json: unknown): { id: string; name: string; league: string; country: string }[] {
  const teams = (json as { teams?: { idTeam?: string; strTeam?: string; strLeague?: string; strCountry?: string }[] | null })?.teams
  if (!Array.isArray(teams)) return []
  return teams.filter(t => t?.idTeam && t?.strTeam).map(t => ({
    id: String(t.idTeam), name: String(t.strTeam), league: String(t.strLeague ?? ''), country: String(t.strCountry ?? ''),
  }))
}

export function parseFixtures(json: unknown): Fixture[] {
  const events = (json as { events?: { strEvent?: string; dateEvent?: string; strTime?: string; strLeague?: string }[] | null })?.events
  if (!Array.isArray(events)) return []
  return events.slice(0, 4).map(ev => ({
    event: String(ev.strEvent ?? 'Fixture'),
    when: [ev.dateEvent, ev.strTime].filter(Boolean).join(' '),
    league: String(ev.strLeague ?? ''),
  }))
}

export function craftCount(json: unknown): number | null {
  const states = (json as { states?: unknown })?.states
  return Array.isArray(states) ? states.length : null
}

const WANT = ['BUS', 'COACH', 'SUBWAY', 'RAIL', 'TRAM', 'FERRY', 'AIRPLANE'] as const

export function missingBoards(departures: Departure[]): string[] {
  const have = new Set(departures.map(d => d.mode))
  return WANT.filter(mode => !have.has(mode)).map(mode => `${modeWord(mode)}: no departure was returned`)
}
