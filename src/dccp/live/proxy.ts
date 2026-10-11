/** Same-origin reads of public feeds. The browser does not call those hosts itself.
 * A feed that is not in this list is refused. Nothing here is invented.
 */

import { inBelleville } from './activity.ts'
import { outletById } from './posted.ts'
import { sheetUrl } from './sheet.ts'

const SOURCES: Record<string, string> = {
  iss: 'https://api.wheretheiss.at/v1/satellites/25544',
  kp: 'https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json',
  carbon: 'https://api.carbonintensity.org.uk/intensity',
  generation: 'https://api.carbonintensity.org.uk/generation',
  denmark: 'https://api.energidataservice.dk/dataset/PowerSystemRightNow?limit=1',
  cad: 'https://ssd-api.jpl.nasa.gov/cad.api?dist-max=0.05&date-min=now&sort=dist&limit=8',
  quakes: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson',
  river: 'https://api.weather.gc.ca/collections/hydrometric-realtime/items?f=json&limit=1&STATION_NUMBER=02HM003&sortby=-DATETIME',
}

const WORLD_BANK = new Set(['EG.ELC.ACCS.ZS', 'SH.H2O.SMDW.ZS', 'SN.ITK.DEFC.ZS'])

/** Series the almanac is allowed to read. One code, every country, most recent value. */
export const ALMANAC_SERIES = ['SP.POP.TOTL', 'AG.LND.TOTL.K2', 'EN.POP.DNST', 'SH.H2O.SMDW.ZS', 'EG.ELC.ACCS.ZS', 'SN.ITK.DEFC.ZS', 'SE.ADT.LITR.ZS'] as const

const UA = { 'User-Agent': 'DCCPWorld/1 local' }
const ISO3 = /^[A-Z]{3}$/
const STOP_ID = /^[A-Za-z0-9_.:-]{1,160}$/
const TEAM_ID = /^[0-9]{1,12}$/

function placeOk(lat: number, lon: number): boolean {
  return Number.isFinite(lat) && Number.isFinite(lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180
}

/** Club search is a name, not a URL. */
export function clubName(id: string): string | null {
  if (/[/:]/.test(id)) return null
  const clean = id.normalize('NFKD').replace(/[^\p{L}\p{N}\s.'-]/gu, '').trim().slice(0, 48)
  return clean.length >= 2 ? clean : null
}

export function feedUrl(feed: string, lat: number, lon: number, id = ''): { url: string; headers: Record<string, string> } | null {
  if (feed === 'weather' || feed === 'stops' || feed === 'sewer' || feed === 'craft' || feed === 'activity') {
    if (!placeOk(lat, lon)) return null
  }
  if (feed === 'weather') {
    return {
      url: `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat.toFixed(2)}&lon=${lon.toFixed(2)}`,
      headers: UA,
    }
  }
  if (feed === 'wb') {
    if (!WORLD_BANK.has(id)) return null
    return {
      url: `https://api.worldbank.org/v2/country/WLD/indicator/${id}?format=json&mrv=1`,
      headers: UA,
    }
  }
  if (feed === 'wb-meta') {
    return { url: 'https://api.worldbank.org/v2/country?format=json&per_page=500', headers: UA }
  }
  if (feed === 'wb-series') {
    if (!(ALMANAC_SERIES as readonly string[]).includes(id)) return null
    return { url: `https://api.worldbank.org/v2/country/all/indicator/${id}?format=json&mrv=1&per_page=500`, headers: UA }
  }
  if (feed === 'wb-lang') {
    if (!ISO3.test(id)) return null
    const q = `SELECT ?langLabel WHERE { ?c wdt:P298 "${id}" . ?c wdt:P37 ?lang . SERVICE wikibase:label { bd:serviceParam wikibase:language "en" } }`
    return { url: `https://query.wikidata.org/sparql?format=json&query=${encodeURIComponent(q)}`, headers: { ...UA, Accept: 'application/sparql-results+json' } }
  }
  if (feed === 'stops') {
    const d = 0.09
    const min = `${(lat - d).toFixed(3)},${(lon - d).toFixed(3)}`
    const max = `${(lat + d).toFixed(3)},${(lon + d).toFixed(3)}`
    return { url: `https://api.transitous.org/api/v1/map/stops?min=${min}&max=${max}`, headers: UA }
  }
  if (feed === 'depart') {
    if (!STOP_ID.test(id)) return null
    return { url: `https://api.transitous.org/api/v5/stoptimes?stopId=${encodeURIComponent(id)}&n=5`, headers: UA }
  }
  if (feed === 'sewer') {
    const q = `[out:json][timeout:8];(node(around:12000,${lat.toFixed(3)},${lon.toFixed(3)})["man_made"="wastewater_plant"];way(around:12000,${lat.toFixed(3)},${lon.toFixed(3)})["man_made"="wastewater_plant"];);out tags 12;`
    return { url: `https://overpass.kumi.systems/api/interpreter?data=${encodeURIComponent(q)}`, headers: UA }
  }
  if (feed === 'club') {
    const name = clubName(id)
    if (!name) return null
    return { url: `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(name)}`, headers: UA }
  }
  if (feed === 'fixtures') {
    if (!TEAM_ID.test(id)) return null
    return { url: `https://www.thesportsdb.com/api/v1/json/3/eventsnext.php?id=${id}`, headers: UA }
  }
  if (feed === 'craft') {
    const box = 1.1
    return {
      url: `https://opensky-network.org/api/states/all?lamin=${(lat - box).toFixed(2)}&lomin=${(lon - box).toFixed(2)}&lamax=${(lat + box).toFixed(2)}&lomax=${(lon + box).toFixed(2)}`,
      headers: UA,
    }
  }
  if (feed === 'activity') {
    if (!inBelleville(lat, lon)) return null
    const q = 'SELECT ?itemLabel ?typeLabel WHERE { ?item wdt:P131 wd:Q34227 . ?item wdt:P31 ?type . FILTER(?type != wd:Q5) SERVICE wikibase:label { bd:serviceParam wikibase:language "en" } } LIMIT 200'
    return { url: `https://query.wikidata.org/sparql?format=json&query=${encodeURIComponent(q)}`, headers: { ...UA, Accept: 'application/sparql-results+json' } }
  }
  if (feed === 'board') return { url: 'https://api-web.nhle.com/v1/score/now', headers: UA }
  if (feed === 'sheet') {
    const url = sheetUrl(id)
    if (!url) return null
    return { url, headers: { ...UA, Accept: 'text/html' } }
  }
  if (feed === 'posted') {
    const outlet = outletById(id)
    if (!outlet) return null
    return { url: outlet.url, headers: UA }
  }
  const url = SOURCES[feed]
  return url ? { url, headers: UA } : null
}

/** met.no wind is metres per second. The HUD expects kilometres per hour. */
export function weatherFromMet(json: unknown): { current: { temperature_2m: number; wind_speed_10m: number; weather_code: number; time: string } } | null {
  const row = (json as { properties?: { timeseries?: { time?: string; data?: { instant?: { details?: { air_temperature?: number; wind_speed?: number } } } }[] } })?.properties?.timeseries?.[0]
  const details = row?.data?.instant?.details
  const temp = details?.air_temperature
  if (typeof temp !== 'number' || !Number.isFinite(temp)) return null
  const wind = typeof details?.wind_speed === 'number' ? details.wind_speed * 3.6 : 0
  return { current: { temperature_2m: temp, wind_speed_10m: wind, weather_code: -1, time: String(row?.time ?? '') } }
}
