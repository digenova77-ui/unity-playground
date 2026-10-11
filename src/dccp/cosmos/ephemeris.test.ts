import assert from 'node:assert/strict'
import { test } from 'node:test'
import { MASS, geocentric, heliocentric, pairwiseForce, skyRadius } from './ephemeris.ts'

const YEAR = 365.256363 * 86_400_000

test('Earth stays near 1 AU and the Moon stays near its mean distance', () => {
  const now = Date.UTC(2026, 9, 5, 17, 0, 0)
  const earth = heliocentric('Earth', now)
  assert.ok(earth.au > 0.98 && earth.au < 1.02, `earth ${earth.au}`)
  const moon = geocentric('Moon', now)
  assert.ok(moon.au > 0.0023 && moon.au < 0.0028, `moon ${moon.au}`)
  const sun = geocentric('Sun', now)
  assert.ok(Math.abs(sun.au - earth.au) < 1e-9)
})

test('a year later the Earth is near the same place, and stepping back is the same function', () => {
  const t = Date.UTC(2026, 9, 5)
  const a = heliocentric('Earth', t)
  const b = heliocentric('Earth', t - YEAR)
  const drift = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z)
  assert.ok(drift < 0.02, `drift ${drift}`)
  const back = geocentric('Mars', t - 86_400_000)
  const again = geocentric('Mars', t - 86_400_000)
  assert.equal(back.x, again.x)
  assert.notEqual(back.au, geocentric('Mars', t).au)
})

test('the Sun-Jupiter pair outranks Sun-Earth, which outranks Earth-Moon', () => {
  const sj = pairwiseForce(MASS.Sun, MASS.Jupiter, 7.786e11)
  const se = pairwiseForce(MASS.Sun, MASS.Earth, 1.496e11)
  const em = pairwiseForce(MASS.Earth, MASS.Moon, 3.844e8)
  assert.ok(sj > se)
  assert.ok(se > em)
})

test('the picture radius is not the measurement', () => {
  const moon = skyRadius(0.00257)
  const sun = skyRadius(1)
  const neptune = skyRadius(30)
  assert.ok(moon < sun && sun < neptune)
  assert.ok(moon > 20 && moon < 40)
  assert.notEqual(sun, 1)
})
