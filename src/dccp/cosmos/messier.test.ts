import assert from 'node:assert/strict'
import test from 'node:test'
import { equatorialOf, KPC_AU, messierLandings, messierScene } from './galaxy.ts'

test('Messier landings are the only destinations, and the pole is the real one', () => {
  const rows = messierLandings()
  assert.equal(rows.some(row => row.number === 42), true)
  assert.equal(rows.some(row => row.mark.name === 'Andromeda'), false)
  assert.equal(rows.some(row => row.mark.name === 'Sirius'), false)
  assert.equal(rows[0]?.number, 1)
  const pole = equatorialOf(0, 90)
  const dec = Math.asin(pole.z) * 180 / Math.PI
  const ra = Math.atan2(pole.y, pole.x) * 180 / Math.PI
  const raPos = ra < 0 ? ra + 360 : ra
  assert.ok(Math.abs(dec - 27.13) < 0.05)
  assert.ok(Math.abs(raPos - 192.86) < 0.05)
  const crab = rows.find(row => row.number === 1)!
  const place = messierScene(crab.mark)
  assert.ok(place.au > 30 * KPC_AU / 1000)
  assert.ok(Math.hypot(place.x, place.y, place.z) > 0.99)
})
