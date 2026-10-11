import assert from 'node:assert/strict'
import test from 'node:test'
import { voiceTrial } from './neuralink.ts'

test('the voice trial is a shown date, and this page has no implant', () => {
  const row = voiceTrial()
  assert.equal(row.shown, '2026-09-18')
  assert.equal(row.metrics, null)
  assert.equal(row.implant, null)
  assert.equal(row.endpoint, null)
  assert.equal(row.launched, false)
  assert.equal(row.page, 'device speech')
})
