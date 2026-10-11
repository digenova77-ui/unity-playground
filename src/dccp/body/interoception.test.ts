import assert from 'node:assert/strict'
import test from 'node:test'
import { breathLoad, countingScore, discrimination, liveScores, oneAccuracy } from './interoception.ts'

test('the scores stay separate, and no pulse is recorded', () => {
  assert.equal(countingScore(40, 20), 0.5)
  assert.equal(countingScore(0, 1), null)
  assert.equal(discrimination(12, 20)?.aboveChance, true)
  assert.equal(discrimination(6, 10)?.aboveChance, null)
  assert.equal(breathLoad(true).heart, false)
  assert.equal(oneAccuracy(), null)
  assert.equal(liveScores().combined, null)
})
