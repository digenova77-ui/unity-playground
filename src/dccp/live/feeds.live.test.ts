import assert from 'node:assert/strict'
import test from 'node:test'
import { liveOnly } from './show.ts'

test('a stale reading is not shown', () => {
  assert.equal(liveOnly('LIVE', '12 °C'), '12 °C')
  assert.equal(liveOnly('STALE', '12 °C'), null)
  assert.equal(liveOnly('PENDING', '12 °C'), null)
  assert.equal(liveOnly('UNAVAILABLE', '12 °C'), null)
})
