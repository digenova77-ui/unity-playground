import assert from 'node:assert/strict'
import test from 'node:test'
import { twoOptions } from './matrix.ts'

test('one decision plus one choice is two options, and no other sum is claimed', () => {
  assert.equal(twoOptions(1, 1), 2)
  assert.equal(twoOptions(2, 1), null)
  assert.equal(twoOptions(1, 0), null)
})
