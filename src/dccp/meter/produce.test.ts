import assert from 'node:assert/strict'
import test from 'node:test'
import { invokeProduction } from './produce.ts'

test('the invoke returns an empty index, an empty map, and no energy', () => {
  const row = invokeProduction()
  assert.equal(row.index, null)
  assert.equal(row.global, null)
  assert.equal(row.energy, null)
  assert.equal(row.watts, null)
  assert.equal(row.peg, 1)
  assert.deepEqual(row.map, [])
  assert.match(row.words, /No joule was written/)
})
