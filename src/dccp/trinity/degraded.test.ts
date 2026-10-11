import assert from 'node:assert/strict'
import { test } from 'node:test'
import { judgeDegraded } from './degraded.ts'

test('unknown verdicts park, empty evidence returns, a bounded model can pass', () => {
  assert.equal(judgeDegraded({ type: 'VERDICT', claim: 'UNKNOWN', limits: ['none'], why: 'because' }).decision, 'PARKED')
  assert.equal(judgeDegraded({ type: 'EVIDENCE', claim: 'MODELED', limits: [], why: 'computed' }).decision, 'REDIRECT')
  assert.equal(judgeDegraded({ type: 'EVIDENCE', claim: 'MODELED', limits: ['not JPL'], why: '' }).decision, 'REBUILD')
  const ok = judgeDegraded({
    type: 'EVIDENCE',
    claim: 'MODELED',
    limits: ['mean elements', 'log picture'],
    why: 'The sky is a model.',
  })
  assert.equal(ok.decision, 'ACCEPT')
  assert.equal(ok.mode, 'degraded')
})
