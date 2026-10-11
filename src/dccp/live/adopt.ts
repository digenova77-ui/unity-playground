/** A logical place locks only when both a pool and a run agree, over time.
 * The first seat keeps the larger face. Care after that is merit, and the dividend pays on that face once the place is locked.
 * A council seat is the first seats to reach the merit. It is not an office of the city.
 */

import { faceFor } from '../meter/close.ts'
import { trickleSum } from '../meter/keys.ts'

export const POOL = 3
export const RUN = 2
export const MERIT = 3
export const COUNCIL = 3
export const GAP_MS = 12 * 60 * 60 * 1000
export const WINDOW_MS = 30 * 24 * 60 * 60 * 1000

export interface Counted {
  place: string
  seat: string
  at: number
}

export interface PlaceLock {
  place: string
  status: 'logical' | 'locked'
  pool: number
  run: number
  council: string[]
}

export interface AdoptResult {
  pay: number
  said: string
  lock: PlaceLock
}

const KEY = 'dccpworld.adopt.v1'
const counted: Counted[] = []
const care: Counted[] = []
let loaded = false

export function resetAdopt(): void {
  counted.length = 0
  care.length = 0
  loaded = true
  if (typeof localStorage === 'undefined') return
  try { localStorage.removeItem(KEY) } catch { /* nothing stored */ }
}

function load(): void {
  if (loaded) return
  loaded = true
  if (typeof localStorage === 'undefined') return
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? '{}') as { counted?: Counted[]; care?: Counted[] }
    const rows = (list: Counted[] | undefined) => (Array.isArray(list) ? list : []).filter(row => row && typeof row.place === 'string' && typeof row.seat === 'string' && typeof row.at === 'number')
    counted.push(...rows(raw.counted))
    care.push(...rows(raw.care))
  } catch { /* the device copy was not readable */ }
}

function save(): void {
  if (typeof localStorage === 'undefined') return
  try { localStorage.setItem(KEY, JSON.stringify({ counted, care })) } catch { /* the device could not hold it */ }
}

export function recordVisit(input: { place: string; seat: string | null; at: number }): AdoptResult {
  load()
  const place = input.place
  if (!input.seat) {
    return { pay: 0, said: 'No Unity ID is bound. Standing here is not in the pool. One person can say anything.', lock: judge(place) }
  }
  const prior = counted.filter(row => row.place === place)
  const mine = prior.find(row => row.seat === input.seat)
  if (mine) return noteCare(place, input.seat, input.at, mine.at)
  const last = prior[prior.length - 1]
  if (last && input.at - last.at < GAP_MS) {
    return { pay: 0, said: 'This visit is too soon after the last one that counted. It is not in the pool yet.', lock: judge(place) }
  }
  const quiet = Boolean(last && input.at - last.at > WINDOW_MS)
  const pay = faceFor(prior.length === 0)
  counted.push({ place, seat: input.seat, at: input.at })
  save()
  const lock = judge(place)
  const early = prior.length === 0
    ? 'Early adopter. This is the first seat, and this face is the one the dividend will pay on.'
    : 'A later seat. The early face already went to the first, and it is not offered again.'
  const reopen = quiet ? 'The earlier run went quiet, so the run starts again. The pool kept the seats. ' : ''
  return { pay, said: `${reopen}${early} Pay ${pay}. Merit 1. ${statusLine(lock)}`, lock }
}

function noteCare(place: string, seat: string, at: number, entered: number): AdoptResult {
  const marks = care.filter(row => row.place === place && row.seat === seat)
  const last = marks.length ? marks[marks.length - 1].at : entered
  if (at - last < GAP_MS) {
    return { pay: 0, said: 'This Unity ID already counted. Another visit this soon is not care.', lock: judge(place) }
  }
  care.push({ place, seat, at })
  save()
  const lock = judge(place)
  const merit = 1 + marks.length + 1
  const due = dividend(place, seat, merit)
  const seated = lock.council.includes(seat)
  return {
    pay: 0,
    said: `Care, not another person. Merit ${merit}.${seated ? ' This seat has earned a council seat here.' : ' A council seat is still merit, not a claim.'} Dividend so far ${due}. ${statusLine(lock)}`,
    lock,
  }
}

/** The dividend is the closed trickle on the face this seat entered with. It pays only after the lock. */
export function dividend(place: string, seat: string, periods: number): number {
  load()
  if (judge(place).status !== 'locked') return 0
  const rows = counted.filter(row => row.place === place).sort((a, b) => a.at - b.at)
  const entry = rows.find(row => row.seat === seat)
  if (!entry) return 0
  return trickleSum(entry === rows[0] ? faceFor(true) : faceFor(false), periods)
}

export function judge(place: string): PlaceLock {
  load()
  const rows = counted.filter(row => row.place === place).sort((a, b) => a.at - b.at)
  let run = rows.length > 0 ? 1 : 0
  for (let i = 1; i < rows.length; i++) {
    const gap = rows[i].at - rows[i - 1].at
    run = gap >= GAP_MS && gap <= WINDOW_MS ? run + 1 : 1
  }
  const pool = new Set(rows.map(row => row.seat)).size
  const locked = pool >= POOL && run >= RUN
  const ready = rows
    .map(row => ({ seat: row.seat, at: meritAt(place, row.seat, row.at) }))
    .filter(row => row.at !== null)
    .sort((a, b) => a.at! - b.at!)
    .map(row => row.seat)
  return { place, pool, run, status: locked ? 'locked' : 'logical', council: locked ? ready.slice(0, COUNCIL) : [] }
}

/** A visit counts only when this phone is at the place. A claim from elsewhere pays nothing. */
export function tryAdopt(input: { place: string; seat: string | null; at: number; present: boolean }): AdoptResult {
  if (!input.present) {
    return { pay: 0, said: 'You are not at this place. A claim from elsewhere is not an early seat.', lock: judge(input.place) }
  }
  return recordVisit(input)
}

export function adoptPlan(): string {
  return `Early adopter. The first seat on a place is face ${faceFor(true)}. A later seat is face ${faceFor(false)}. That first face is not offered again. The place stays logical until ${POOL} seats and a run of ${RUN}, with at least 12 hours between counted visits and no more than 30 days of quiet. Care after the first count is merit. The dividend is the face times the log of one plus the periods, and it pays only after the lock. A council seat is the first ${COUNCIL} to reach merit ${MERIT}. It is not an office. No seat, or a person who is not there, pays 0. The pay is test supply. It is not a dollar. The till is closed.`
}

function meritAt(place: string, seat: string, entered: number): number | null {
  const marks = care.filter(row => row.place === place && row.seat === seat).sort((a, b) => a.at - b.at)
  if (1 + marks.length < MERIT) return null
  return marks[MERIT - 2].at || entered
}

function statusLine(lock: PlaceLock): string {
  const room = lock.council.length ? ` Council so far: ${lock.council.join(', ')}.` : ''
  return lock.status === 'locked'
    ? `Locked. ${lock.pool} seats, and ${lock.run} visits held across time. Both were required. The dividend pays on the face each seat entered with. A council seat is merit ${MERIT} after the lock, for the first ${COUNCIL} who reach it. It is not an office of the city.${room}`
    : `Still logical. ${lock.pool} of ${POOL} seats, and a run of ${lock.run}. It locks at ${POOL} seats and a run of ${RUN}. Care now still counts as merit, and the dividend waits for the lock. The first face is not offered twice.`
}
