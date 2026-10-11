import assert from 'node:assert/strict'
import test from 'node:test'
import { divine } from './divine.ts'

test('divine mode is three rings and no framework', () => {
  const run = divine()
  assert.equal(run.rings, 3)
  assert.match(run.speech, /no framework/)
  assert.match(run.speech, /holds nothing/)
  assert.match(run.speech, /three dimensions/)
  assert.match(run.speech, /sequence is not a dimension/)
})
