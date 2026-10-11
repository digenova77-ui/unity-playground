import assert from 'node:assert/strict'
import { test } from 'node:test'
import { plateMaySeat } from './plate-law.ts'

test('a plate needs an anchor and the three layers in order', () => {
  assert.equal(plateMaySeat(true, ['macro', 'logic', 'physics']), true)
  assert.equal(plateMaySeat(false, ['macro', 'logic', 'physics']), false)
  assert.equal(plateMaySeat(true, ['physics', 'logic', 'macro']), false)
  assert.equal(plateMaySeat(true, ['macro', 'logic']), false)
})
