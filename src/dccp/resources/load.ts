import { fetchJson } from '../live/feeds'
import { buildSnapshot, britainMix, carbonRow, denmarkNow, holdSnapshot, worldBankRow, type CarbonRow, type Snapshot } from './match'

async function pull(feed: string, id = ''): Promise<unknown | null> {
  const q = id ? `&id=${encodeURIComponent(id)}` : ''
  try {
    return await fetchJson(`/api/live?feed=${feed}${q}`, 9_000)
  } catch {
    return null
  }
}

/** Reads the public feeds. A feed that fails becomes a hole, not a guess. */
export async function loadSnapshot(carbon: CarbonRow | null): Promise<Snapshot> {
  const [electricity, water, mix, denmark, carbonJson] = await Promise.all([
    pull('wb', 'EG.ELC.ACCS.ZS'),
    pull('wb', 'SH.H2O.SMDW.ZS'),
    pull('generation'),
    pull('denmark'),
    carbon ? Promise.resolve(null) : pull('carbon'),
  ])
  const grid = carbon ?? carbonRow(carbonJson)
  const snapshot = buildSnapshot({
    electricity: worldBankRow(electricity),
    water: worldBankRow(water),
    food: null,
    britain: britainMix(mix),
    carbon: grid,
    denmark: denmarkNow(denmark),
    readAt: new Date().toISOString(),
  })
  holdSnapshot(snapshot)
  return snapshot
}
