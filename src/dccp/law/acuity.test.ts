import assert from 'node:assert/strict'
import test from 'node:test'
import { emits, magnitude, OLED_FLOOR, sight, spirit } from './acuity.ts'

test('each step is ten times the last, and the picture is one order inside it', () => {
  assert.equal(magnitude(0), 1)
  assert.equal(magnitude(2), 100)
  assert.equal(magnitude(1.5), null)
  assert.deepEqual(sight(0), { radiusDeg: 0.4, names: 8 })
  assert.deepEqual(sight(1), { radiusDeg: 4, names: 8 })
  assert.equal(sight(1)!.radiusDeg, sight(0)!.radiusDeg * 10)
  assert.equal(sight(3)!.radiusDeg, 40)
  assert.equal(emits(OLED_FLOOR), false)
  assert.equal(emits(OLED_FLOOR + 0.01), true)
  assert.deepEqual(spirit(0), { force: 0, invented: 0, open: true })
  assert.deepEqual(spirit(4), spirit(0))
  assert.equal(spirit(5), null)
})
