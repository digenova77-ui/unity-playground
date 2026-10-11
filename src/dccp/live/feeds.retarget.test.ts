import assert from 'node:assert/strict'
import test from 'node:test'
import { airTarget } from './air.ts'

test('a landing moves the air point and asks again; a twitch does not', () => {
  const stay = airTarget({ lat: 44.18, lon: -77.36 }, 1_000_000, 44.19, -77.36)
  assert.equal(stay.nextAt, 1_000_000)
  const moved = airTarget({ lat: 44.18, lon: -77.36 }, 1_000_000, 43.65, -79.38)
  assert.equal(moved.lat, 43.65)
  assert.equal(moved.nextAt, 0)
  const bad = airTarget({ lat: 44.18, lon: -77.36 }, 1_000_000, Number.NaN, 0)
  assert.equal(bad.lat, 44.18)
  assert.equal(bad.nextAt, 1_000_000)
})
