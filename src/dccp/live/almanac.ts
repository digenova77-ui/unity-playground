/** Country almanac from the World Bank, plus official languages from Wikidata.
 * Nothing here is a published "global index". The held reading is the mean of the series that answered.
 */

export interface SeriesPoint { value: number; year: string }

export interface AlmanacRow {
  a3: string
  a2: string
  name: string
  capital: string
  region: string
  income: string
  flag: string
  population: SeriesPoint | null
  areaKm2: SeriesPoint | null
  density: SeriesPoint | null
  water: SeriesPoint | null
  energy: SeriesPoint | null
  undernourished: SeriesPoint | null
  literacy: SeriesPoint | null
  /** Mean of water, electricity access, and (100 − undernourishment), when at least two answered. */
  held: number | null
  heldOf: string[]
}

export interface CountryMeta {
  a3: string
  a2: string
  name: string
  capital: string
  region: string
  income: string
}

const num = (v: unknown): number | null => (typeof v === 'number' && Number.isFinite(v) ? v : null)

export function parseWbMeta(json: unknown): CountryMeta[] {
  const rows = Array.isArray(json) ? json[1] : null
  if (!Array.isArray(rows)) return []
  const out: CountryMeta[] = []
  for (const row of rows) {
    const a3 = String(row?.id ?? '')
    const a2 = String(row?.iso2Code ?? '')
    if (!/^[A-Z]{3}$/.test(a3) || !/^[A-Z]{2}$/.test(a2)) continue
    out.push({
      a3,
      a2,
      name: String(row?.name ?? a3),
      capital: String(row?.capitalCity ?? ''),
      region: String(row?.region?.value ?? ''),
      income: String(row?.incomeLevel?.value ?? ''),
    })
  }
  return out
}

export function parseWbSeries(json: unknown): Map<string, SeriesPoint> {
  const rows = Array.isArray(json) ? json[1] : null
  const out = new Map<string, SeriesPoint>()
  if (!Array.isArray(rows)) return out
  for (const row of rows) {
    const a3 = String(row?.countryiso3code ?? '')
    const value = num(row?.value)
    if (!/^[A-Z]{3}$/.test(a3) || value === null) continue
    out.set(a3, { value, year: String(row?.date ?? '') })
  }
  return out
}

export function parseLanguages(json: unknown): string[] {
  const bindings = (json as { results?: { bindings?: { langLabel?: { value?: string } }[] } })?.results?.bindings
  if (!Array.isArray(bindings)) return []
  const names = bindings.map(b => String(b?.langLabel?.value ?? '')).filter(s => s && !/^Q\d+$/.test(s))
  return [...new Set(names)]
}

/** Held reading. Not a UN index. Fed share is the complement of undernourishment. */
export function heldReading(water: number | null, energy: number | null, undernourished: number | null): { score: number | null; of: string[] } {
  const parts: { name: string; v: number }[] = []
  if (water !== null) parts.push({ name: 'water', v: water })
  if (energy !== null) parts.push({ name: 'energy', v: energy })
  if (undernourished !== null) parts.push({ name: 'fed', v: Math.min(100, Math.max(0, 100 - undernourished)) })
  if (parts.length < 2) return { score: null, of: parts.map(p => p.name) }
  const score = parts.reduce((sum, p) => sum + p.v, 0) / parts.length
  return { score: Math.round(score * 10) / 10, of: parts.map(p => p.name) }
}

export function joinAlmanac(meta: CountryMeta[], series: {
  population: Map<string, SeriesPoint>
  areaKm2: Map<string, SeriesPoint>
  density: Map<string, SeriesPoint>
  water: Map<string, SeriesPoint>
  energy: Map<string, SeriesPoint>
  undernourished: Map<string, SeriesPoint>
  literacy: Map<string, SeriesPoint>
}): Map<string, AlmanacRow> {
  const out = new Map<string, AlmanacRow>()
  for (const m of meta) {
    const water = series.water.get(m.a3) ?? null
    const energy = series.energy.get(m.a3) ?? null
    const under = series.undernourished.get(m.a3) ?? null
    const held = heldReading(water?.value ?? null, energy?.value ?? null, under?.value ?? null)
    out.set(m.a3, {
      ...m,
      flag: `https://flagcdn.com/w80/${m.a2.toLowerCase()}.png`,
      population: series.population.get(m.a3) ?? null,
      areaKm2: series.areaKm2.get(m.a3) ?? null,
      density: series.density.get(m.a3) ?? null,
      water,
      energy,
      undernourished: under,
      literacy: series.literacy.get(m.a3) ?? null,
      held: held.score,
      heldOf: held.of,
    })
  }
  return out
}

export function pct(p: SeriesPoint | null): string {
  if (!p) return 'not published'
  return `${p.value.toFixed(1).replace(/\.0$/, '')}% · ${p.year}`
}

export function count(p: SeriesPoint | null): string {
  if (!p) return 'not published'
  const n = p.value
  const body = n >= 1e9 ? `${(n / 1e9).toFixed(2)} billion` : n >= 1e6 ? `${(n / 1e6).toFixed(1)} million` : String(Math.round(n))
  return `${body} · ${p.year}`
}
