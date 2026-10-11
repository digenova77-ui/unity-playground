import assert from 'node:assert/strict'
import { test } from 'node:test'
import { frictionCount, huntFriction, resetFriction, resolveFriction } from './friction.ts'

test('a friction mints one key, and the second resolve is the same key', () => {
  resetFriction()
  const friction = huntFriction('purity', 'score 0.73 crosses', 'a gradient is not a gate', 2)
  const first = resolveFriction(friction, 'Gate is conflicts zero and nothing unconfirmed.')
  const second = resolveFriction(friction, 'A different sentence must not mint again.')
  assert.equal('id' in first, true)
  if (!('id' in first) || !('id' in second)) return
  assert.equal(first.id, second.id)
  assert.equal(first.proof, second.proof)
  assert.equal(frictionCount(), 1)
  const blank = resolveFriction(friction, '   ')
  assert.equal('refused' in blank, true)
})
