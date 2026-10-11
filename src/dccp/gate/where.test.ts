import assert from 'node:assert/strict'
import test from 'node:test'
import { whereWords } from './where.ts'

test('the direction is one step, and the origin is not filled in', () => {
  const said = whereWords()
  assert.match(said, /one step at a time/)
  assert.match(said, /not known here/)
  assert.match(said, /Retrieval of that CID is HOLE/)
  assert.match(said, /not pinned/)
  assert.equal(/David|Di Genova/i.test(said), false)
})
