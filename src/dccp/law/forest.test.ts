import assert from 'node:assert/strict'
import test from 'node:test'
import { treeFall, treeFallWords } from './forest.ts'

test('a fall with no recording is a hole', () => {
  const row = treeFall()
  assert.equal(row.fall, null)
  assert.equal(row.recording, null)
  assert.equal(row.heard, null)
  assert.equal(row.hole, true)
  assert.match(treeFallWords(), /The hole is the answer/)
})
