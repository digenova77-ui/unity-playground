import assert from 'node:assert/strict'
import test from 'node:test'
import { pureLegal, pureMove, purePhysics, pureThink } from './pure.ts'

test('thinking, legal, and physics each keep only what they hold', () => {
  assert.equal(pureThink(1, 1), 2)
  assert.equal(pureThink(2, 1), null)
  assert.equal(pureLegal('Joining costs nothing.'), 'Joining costs nothing.')
  assert.equal(pureLegal('there is no ownership'), null)
  assert.equal(pureLegal('buy a child roster'), null)
  assert.equal(purePhysics('the span is 3'), null)
  assert.equal(purePhysics('the span is 3 m'), '3 m')
  assert.deepEqual(pureMove({ x: 0.5, y: 0.5 }, 1), { x: 0.5, y: 0.5 })
  assert.deepEqual(pureMove({ x: 0.5, y: 0.5 }, 0), { x: 0, y: 0 })
})
