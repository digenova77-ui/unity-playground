import assert from 'node:assert/strict'
import test from 'node:test'
import { allowDraw, allowWake, pictureCost } from './gate.ts'

test('a hidden page does not draw, a low battery draws every other frame, and neither locks', () => {
  const shown = { hidden: false, charging: true, level: 0.4 }
  assert.equal(allowDraw(shown, 1), true)
  assert.equal(allowDraw({ ...shown, hidden: true }, 1), false)
  assert.equal(allowDraw({ hidden: false, charging: false, level: 0.1 }, 1), false)
  assert.equal(allowDraw({ hidden: false, charging: false, level: 0.1 }, 2), true)
  assert.equal(allowWake({ hidden: true, charging: false, level: 1 }, 4), false)
  assert.equal(allowWake({ hidden: false, charging: false, level: 0.1 }, 4), true)
  assert.equal(allowWake({ hidden: false, charging: null, level: null }, 1), true)
  assert.equal(pictureCost(false, 2).power, 'high-performance')
  assert.equal(pictureCost(true, 2).pixelRatio, 2)
  assert.equal(pictureCost(true, 3).pixelRatio, 3)
  assert.equal(pictureCost(true, 1).pixelRatio, 1)
  assert.equal(pictureCost(true, 2).power, 'low-power')
})
