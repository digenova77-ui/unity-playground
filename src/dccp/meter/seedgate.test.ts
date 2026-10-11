import assert from 'node:assert/strict'
import test from 'node:test'
import { seedDecision, seedDecisionWords } from './seedgate.ts'

test('an idea seeds one decision and does not price the cosmos', () => {
  const bare = seedDecision(' ')
  assert.equal(bare.rooted, false)
  assert.equal(bare.unit, 0)
  const row = seedDecision('a quieter grid')
  assert.equal(row.rooted, true)
  if (!row.rooted) return
  assert.equal(row.unit, 1)
  assert.equal(row.worth, null)
  assert.equal(row.assets, null)
  assert.equal(row.index, null)
  assert.match(seedDecisionWords('a quieter grid'), /roots the decision/)
  assert.match(seedDecisionWords('a quieter grid'), /no cosmic index/)
  assert.match(seedDecisionWords(''), /no decision is rooted/)
})
