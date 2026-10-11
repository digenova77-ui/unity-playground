import assert from 'node:assert/strict'
import test from 'node:test'
import { trinityBind, trinityBindWords } from './bound.ts'

test('the three subjects share the floor and carry no rank', () => {
  const row = trinityBind()
  assert.deepEqual(row.subjects, ['law', 'philosophy', 'physics'])
  assert.equal(row.seats, 3)
  assert.equal(row.rank, null)
  assert.equal(row.ever, false)
  assert.match(trinityBindWords(), /was not measured/)
})
