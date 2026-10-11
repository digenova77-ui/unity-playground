import assert from 'node:assert/strict'
import test from 'node:test'
import { BOLTZMANN, landauerJoule, landauerWords, proveMerit, type MeritInput } from './landauer.ts'

const held: MeritInput = {
  land: { lat: 44.1628, lon: -77.3832, present: true },
  at: Date.UTC(2026, 9, 11, 15, 30),
  logical: 1,
  illogical: 0,
  width: 1,
  kelvin: { value: 300, measured: true },
  bought: false,
}

test('merit is 1 only when the land, the hour, and the joule are held', () => {
  const row = proveMerit(held)
  assert.equal(row.merit, 1)
  if (row.merit !== 1) return
  assert.equal(row.bits, 1)
  assert.equal(row.step, 1)
  assert.equal(row.bought, false)
  assert.equal(row.floor, 'landauer')
  assert.equal(row.measuredWatts, null)
  assert.equal(row.joules, BOLTZMANN * 300 * Math.LN2)
  assert.equal(row.land, '4416280:-7738320')
  assert.equal(row.hour, Date.UTC(2026, 9, 11, 15))
  assert.deepEqual(proveMerit(held), row)
})

test('a purchase, an absence, a tie, and a missing temperature do not become merit', () => {
  assert.equal(proveMerit({ ...held, bought: true }).merit, 0)
  assert.equal(proveMerit({ ...held, land: { ...held.land!, present: false } }).merit, 0)
  assert.equal(proveMerit({ ...held, logical: 1, illogical: 1 }).merit, 0)
  assert.equal(proveMerit({ ...held, land: null }).merit, null)
  assert.equal(proveMerit({ ...held, kelvin: null }).merit, null)
  assert.equal(proveMerit({ ...held, kelvin: { value: 300, measured: false } }).merit, null)
  assert.equal(landauerJoule(0), null)
  assert.match(landauerWords(), /not filled in/)
  assert.match(landauerWords(), /not for sale|purchase is not/i)
})
