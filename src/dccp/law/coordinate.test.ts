import assert from 'node:assert/strict'
import test from 'node:test'
import { coordinate } from './coordinate.ts'

test('only held fields are joined, and the rest stay refused', () => {
  const run = coordinate()
  assert.deepEqual(run.joined, ['energy', 'resources'])
  assert.ok(run.refused.includes('help'))
  assert.ok(run.refused.includes('healthcare'))
  assert.match(run.words, /does not operate a grid/)
  assert.match(run.words, /not claimed/)
  assert.equal(coordinate(['energy']).joined.length, 1)
  assert.match(coordinate(['energy']).words, /Nothing was joined/)
})
