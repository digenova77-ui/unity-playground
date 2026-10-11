/** Server only. The page does not import this. The same five pins are one row. */

import { admitToken } from '../origin/idempotency.ts'
import { PIN_CID, PIN_TOKEN, PINS, pinSet } from './pins.ts'

export function admitPins(files: readonly string[], cid: string): { ok: true; key: string; replay: boolean; cid: typeof PIN_CID } | { ok: false; reason: 'mismatch' | 'conflict' } {
  const same = files.length === PINS.length && files.every((file, i) => file === PINS[i]) && cid === PIN_CID
  if (!same) return { ok: false, reason: 'mismatch' }
  const row = admitToken(PIN_TOKEN, pinSet())
  if (!row.ok) return { ok: false, reason: 'conflict' }
  return { ok: true, key: row.key, replay: row.replay, cid: PIN_CID }
}
