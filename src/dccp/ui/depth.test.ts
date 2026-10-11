import assert from 'node:assert/strict'
import test from 'node:test'
import { bandOf, HOLO, lookShift, planeShift, takeLook } from './depth.ts'

test('the picture is three planes and a dark pixel is on none', () => {
  assert.deepEqual(lookShift(2, -3, true), { x: 0, y: 0 })
  const look = lookShift(0.5, -0.5, false)
  assert.deepEqual(planeShift(look, 1), look)
  assert.deepEqual(planeShift(look, 0), { x: 0, y: 0 })
  assert.deepEqual(planeShift({ x: 1, y: 1 }, 0.5), { x: 0.5, y: 0.5 })
  assert.equal(takeLook('pointer', 'tilt', { x: 0, y: 0 }), null)
  assert.deepEqual(takeLook('pointer', 'tilt', { x: 0.2, y: 0.2 })?.look, { x: 0.2, y: 0.2 })
  assert.equal(bandOf(0.02), null)
  assert.equal(bandOf(0.1), 'far')
  assert.equal(bandOf(0.4), 'mid')
  assert.equal(bandOf(0.8), 'near')
  assert.deepEqual(HOLO.map(row => row.depth), [1, 0.5, 0.15])
})
