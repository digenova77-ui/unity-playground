import assert from 'node:assert/strict'
import { test } from 'node:test'
import { SEED_JOBS, translate } from './packet.ts'

test('a person and the seedbot share one clean path, and the spends stay closed', () => {
  const human = translate('human', 'identity')
  const bot = translate('seedbot', 'hud')
  assert.equal('payload' in human && human.payload.authority, 'NONE')
  assert.equal('payload' in bot && bot.payload.actor, 'seedbot')
  assert.match(String(translate('seedbot', 'efuse-settlement') && (translate('seedbot', 'os-watch') as { hole: string }).hole), /phone/)
  assert.equal(SEED_JOBS.length, 11)
  const pii = translate('human', 'identity', { email: 'nope@example.com' })
  assert.equal('hole' in pii, true)
})
