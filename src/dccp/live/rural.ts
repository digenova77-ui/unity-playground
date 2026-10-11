/** What can follow a point, including a rural one. A feed that cannot is not renamed into one. */

export type Scope = 'point' | 'near' | 'one-station' | 'britain' | 'planetary'

export const SCOPES: Record<string, Scope> = {
  weather: 'point',
  quakes: 'near',
  river: 'one-station',
  carbon: 'britain',
  kp: 'planetary',
  iss: 'planetary',
}

const RIVER = { lat: 44.18, lon: -77.36 }

export function inBritain(lat: number, lon: number): boolean {
  return lat >= 49 && lat <= 61 && lon >= -8 && lon <= 2
}

export function nearRiver(lat: number, lon: number): boolean {
  return Math.hypot(lat - RIVER.lat, lon - RIVER.lon) <= 0.15
}

export function nearQuake(lat: number, lon: number, quake: { lat: number; lon: number } | undefined): boolean {
  if (!quake) return false
  return Math.hypot(lat - quake.lat, lon - quake.lon) <= 2
}

export function ruralWords(lat: number, lon: number, quake?: { lat: number; lon: number }): string {
  const quakeHere = nearQuake(lat, lon, quake) ? 'A quake in the day list is near this point.' : 'No quake in the day list is near this point.'
  const river = nearRiver(lat, lon) ? 'The Moira station is this place.' : 'The Moira station is not this place.'
  const carbon = inBritain(lat, lon) ? 'The British grid covers this point.' : 'The British grid does not cover this point.'
  return `Weather follows this point, rural or not. The ask is the point to three decimals. ${quakeHere} ${river} ${carbon} Kp and the station in orbit stay planetary. A feed that is not here is not shown as here.`
}
