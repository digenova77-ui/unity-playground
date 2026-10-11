import assert from 'node:assert/strict'
import test from 'node:test'
import { exploreSenses, senseVote, senseWords } from './senses.ts'

test('trinity admits the revocable senses and refuses system files', () => {
  const vote = senseVote()
  assert.equal(vote.winner, 'agreement-and-off')
  assert.equal(vote.refused.includes('system-files'), true)
  assert.equal(vote.refused.includes('startup-without-yes'), true)
  assert.match(senseWords(), /system folder was not opened/)
})

test('explore takes one sense and does not invent the rest', () => {
  const quiet = exploreSenses()
  assert.equal(quiet.sense, null)
  assert.equal(quiet.step, 1)
  assert.match(quiet.words, /stays open/)
  const seen = exploreSenses({ sight: true, hearing: true })
  assert.equal(seen.sense, 'sight')
  assert.match(seen.words, /were not explored/)
})
