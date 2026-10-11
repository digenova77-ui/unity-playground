import assert from 'node:assert/strict'
import test from 'node:test'
import { billBridge } from './bridge.ts'

test('a bill is not paid and a dollar is not held', () => {
  const row = billBridge()
  assert.equal(row.sent, false)
  assert.equal(row.dollar, null)
  assert.equal(row.agency, null)
  assert.equal(row.everyCoin, false)
  assert.equal(row.both, true)
})
