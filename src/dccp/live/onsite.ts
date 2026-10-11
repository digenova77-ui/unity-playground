/** A person confirms a mapped point only by standing at it and tapping it.
 * A page on the internet is a posting. It is not a confirmation.
 */

export interface Fix { lat: number; lon: number; accuracyM: number }
export interface HereTarget { lat: number; lon: number }

export interface Confirm {
  id: string
  at: number
  lat: number
  lon: number
  accuracyM: number
}

const MAX_ACCURACY_M = 150
const MAX_DISTANCE_M = 8_000

export function distanceM(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
  const r = 6_371_000
  const p1 = a.lat * Math.PI / 180
  const p2 = b.lat * Math.PI / 180
  const dp = (b.lat - a.lat) * Math.PI / 180
  const dl = (b.lon - a.lon) * Math.PI / 180
  const h = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2
  return 2 * r * Math.asin(Math.min(1, Math.sqrt(h)))
}

export function mayConfirm(fix: Fix | null, target: HereTarget, radiusM = MAX_DISTANCE_M): { ok: true; distanceM: number } | { ok: false; why: string } {
  if (!fix || !Number.isFinite(fix.lat) || !Number.isFinite(fix.lon) || !Number.isFinite(fix.accuracyM)) {
    return { ok: false, why: 'The phone did not share a location. Nothing was confirmed.' }
  }
  if (fix.accuracyM > MAX_ACCURACY_M) {
    return { ok: false, why: `The fix is about ${Math.round(fix.accuracyM)} metres wide. That is too loose to confirm a place.` }
  }
  const away = distanceM(fix, target)
  if (away > radiusM) {
    return { ok: false, why: 'You are not at this place. A confirmation from somewhere else is refused.' }
  }
  return { ok: true, distanceM: away }
}

const KEY = 'dccpworld.onsite.v1'
let phone: Fix | null = null

/** This session's fix. It is not written down as a house. */
export function holdPhoneFix(fix: Fix | null): void { phone = fix }
export function phoneFix(): Fix | null { return phone }

export function readConfirms(): Confirm[] {
  if (typeof localStorage === 'undefined') return []
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? '[]') as Confirm[]
    if (!Array.isArray(raw)) return []
    return raw.filter(row => row && typeof row.id === 'string' && typeof row.at === 'number' && typeof row.accuracyM === 'number')
  } catch {
    return []
  }
}

export function writeConfirm(row: Confirm): void {
  if (typeof localStorage === 'undefined') return
  const next = [row, ...readConfirms().filter(old => old.id !== row.id)].slice(0, 40)
  try { localStorage.setItem(KEY, JSON.stringify(next)) } catch { /* the device could not hold it */ }
}

export function confirmFor(id: string): Confirm | undefined {
  return readConfirms().find(row => row.id === id)
}
