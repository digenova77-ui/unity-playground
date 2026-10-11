import assert from 'node:assert/strict'
import test from 'node:test'
import { inBritain, nearQuake, nearRiver, ruralWords } from './rural.ts'

test('a rural point keeps only the feeds that actually cover it', () => {
  assert.equal(nearRiver(44.2, -77.4), true)
  assert.equal(nearRiver(51.5, -0.1), false)
  assert.equal(inBritain(51.5, -0.1), true)
  assert.equal(inBritain(44.16, -77.38), false)
  assert.equal(nearQuake(44, -77, { lat: 45, lon: -78 }), true)
  assert.equal(nearQuake(44, -77, { lat: 35, lon: -120 }), false)
  assert.match(ruralWords(44.16, -77.38), /Weather follows/)
  assert.match(ruralWords(44.16, -77.38), /not shown as here/)
})
