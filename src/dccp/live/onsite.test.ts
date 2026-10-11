import assert from 'node:assert/strict'
import test from 'node:test'
import { mayConfirm } from './onsite.ts'

const belleville = { lat: 44.1667, lon: -77.3833 }

test('only a tight fix at the place can confirm it', () => {
  assert.equal(mayConfirm(null, belleville).ok, false)
  assert.equal(mayConfirm({ lat: 43.65, lon: -79.38, accuracyM: 20 }, belleville).ok, false)
  assert.equal(mayConfirm({ lat: 44.17, lon: -77.38, accuracyM: 4000 }, belleville).ok, false)
  const near = mayConfirm({ lat: 44.17, lon: -77.38, accuracyM: 25 }, belleville)
  assert.equal(near.ok, true)
  assert.equal(mayConfirm({ lat: 44.18, lon: -77.38, accuracyM: 20 }, { lat: 44.16497, lon: -77.36415 }, 200).ok, false)
})
