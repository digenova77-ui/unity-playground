/** A live reading crosses the page as one line. The body is not kept. Nothing is stored. */

export const PASS = [
  ['quakes', 'Earthquakes'],
  ['iss', 'Station'],
  ['weather', 'Air'],
  ['kp', 'Geomagnetic Kp'],
  ['carbon', 'Grid carbon'],
  ['river', 'Moira River'],
] as const

export function passLive(live: boolean, line: string | null): string | null {
  if (!live || line == null || line === '') return null
  return line
}

function num(v: unknown): number | null {
  const n = typeof v === 'number' ? v : Number(v)
  return Number.isFinite(n) ? n : null
}

/** One line out. The body does not leave this function. */
export function lineOf(key: string, json: unknown): string | null {
  const row = json as Record<string, any>
  if (key === 'quakes') {
    const count = Array.isArray(row?.features) ? row.features.length : num(row?.count)
    return count == null ? null : `${count} events`
  }
  if (key === 'iss') {
    const lat = num(row?.latitude ?? row?.lat)
    const lon = num(row?.longitude ?? row?.lon)
    return lat == null || lon == null ? null : `${lat.toFixed(2)}, ${lon.toFixed(2)}`
  }
  if (key === 'weather') {
    const temp = num(row?.tempC ?? row?.current?.temperature_2m)
    return temp == null ? null : `${temp}°C`
  }
  if (key === 'kp') {
    const direct = num(row?.kp)
    if (direct != null) return String(direct)
    if (!Array.isArray(json)) return null
    const last = json[json.length - 1] as unknown
    const kp = Array.isArray(last) ? num(last[1]) : num((last as { Kp?: unknown })?.Kp)
    return kp == null ? null : String(kp)
  }
  if (key === 'carbon') {
    const intensity = num(row?.data?.[0]?.intensity?.actual ?? row?.data?.[0]?.intensity?.forecast ?? row?.intensity)
    return intensity == null ? null : `${intensity} gCO₂/kWh`
  }
  if (key === 'river') {
    const level = num(row?.features?.[0]?.properties?.LEVEL ?? row?.levelM)
    return level == null ? null : `${level} m`
  }
  return null
}
