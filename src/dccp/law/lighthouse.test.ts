import assert from 'node:assert/strict'
import test from 'node:test'
import { lighthouse, lighthouseWords, sameGuideWords } from './lighthouse.ts'

test('the light does not ping or modify a host', () => {
  const row = lighthouse()
  assert.equal(row.kind, 'lighthouse')
  assert.equal(row.sends, false)
  assert.equal(row.modifies, false)
  assert.equal(row.update, false)
  assert.equal(row.sweep, false)
  assert.equal(row.possible, null)
  assert.equal(row.steers, false)
  assert.equal(row.guide, 'the floor')
  assert.equal(row.course, null)
  assert.match(lighthouseWords(), /does not steer/)
  assert.match(sameGuideWords(), /tokens do not steer/)
})
