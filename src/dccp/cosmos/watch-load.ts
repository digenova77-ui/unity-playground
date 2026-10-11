import { fetchJson } from '../live/feeds'
import { holdWatch, runCycle, type WatchReport } from './watch'

let cycle = 0
let pending: Promise<WatchReport> | null = null

/** One polite read of the fixed JPL query. A second call while it is in flight waits for the same read. */
export function loadWatch(): Promise<WatchReport> {
  if (pending) return pending
  pending = read().finally(() => { pending = null })
  return pending
}

async function read(): Promise<WatchReport> {
  cycle += 1
  let json: unknown = null
  try {
    json = await fetchJson('/api/live?feed=cad', 12_000)
  } catch {
    json = null
  }
  const report = runCycle(json, cycle)
  holdWatch(report)
  return report
}
