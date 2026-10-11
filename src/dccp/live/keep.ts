/** Telemetry is not stored. A live pass is not written. The only store is for bots. */
import type { GroundReport } from './ground.ts'
import { tickPurity } from '../law/purity.ts'

export const STALE_MS = 10 * 60_000

export interface WatchPlace { lat: number; lon: number; name: string }
export interface KeptGround { key: string; name: string; at: number; report: GroundReport }
export interface KeptWeather { key: string; at: number; tempC: number; windKmh: number; code: number }
export interface KeptLanguage { a3: string; names: string[] | null; at: number }

interface KeepFile {
  grounds: KeptGround[]
  weather: KeptWeather[]
  languages: KeptLanguage[]
  places: WatchPlace[]
}

export interface Bucket { get(key: string): string | null; set(key: string, value: string): void }

const browserBucket: Bucket = {
  get() { return null },
  set() { /* telemetry is not stored */ },
}

let bucket: Bucket = browserBucket

export function useBucket(next: Bucket | null): void { bucket = next ?? browserBucket }

function empty(): KeepFile {
  void bucket
  return { grounds: [], weather: [], languages: [], places: [] }
}

export function readKeep(): KeepFile {
  return empty()
}

export function holdGround(_key: string, _name: string, _report: GroundReport, _at = Date.now()): void {}

export function holdWeather(_key: string, _tempC: number, _windKmh: number, _code: number, _at = Date.now()): void {}

export function holdLanguage(_a3: string, _names: string[] | null, _at = Date.now()): void {}

export function holdPlaces(_places: WatchPlace[]): void {}

export function readPlaces(): WatchPlace[] { return readKeep().places }

export function placeKey(lat: number, lon: number): string {
  return `${lat.toFixed(2)},${lon.toFixed(2)}`
}

/** The next city whose last ground reading is missing or older than the window. One at a time. */
export function duePlace(places: readonly WatchPlace[], grounds: readonly { key: string; at: number }[], now: number, stale = STALE_MS): WatchPlace | null {
  for (const place of places) {
    const key = placeKey(place.lat, place.lon)
    const held = grounds.find(row => row.key === key)
    if (!held || now - held.at >= stale) return place
  }
  return null
}

/** Page loop. It does not read the phone, and it does not run while the tab is hidden. */
export function startKeep(opts: {
  places: () => readonly WatchPlace[]
  refresh: (place: WatchPlace) => void
  hidden?: () => boolean
  everyMs?: number
  now?: () => number
}): () => void {
  const every = opts.everyMs ?? 60_000
  const tick = (): void => {
    tickPurity()
    if (opts.hidden?.()) return
    const file = readKeep()
    const next = duePlace(opts.places(), file.grounds, opts.now?.() ?? Date.now())
    if (next) opts.refresh(next)
  }
  tick()
  const id = setInterval(tick, every)
  return () => clearInterval(id)
}
