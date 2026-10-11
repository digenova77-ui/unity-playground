import assert from 'node:assert/strict'
import { test } from 'node:test'
import { exploreByNext, exploreNow, verifiedPay } from './explore.ts'

test('an audited explore mints nothing from a feeling', () => {
  const run = exploreNow({ two: 2, conflict: 1, onePage: 22, presentReading: false })
  assert.equal(run.keys, 0)
  assert.equal(run.paid, 0)
  assert.match(run.words, /That is the hunt/)
  assert.match(run.words, /A feeling pays 0/)
})

test('only a new agreement pays', () => {
  assert.equal(verifiedPay({ sources: 2, agrees: true, alreadyHeld: false }), 4)
  assert.equal(verifiedPay({ sources: 2, agrees: true, alreadyHeld: true }), 0)
  assert.equal(verifiedPay({ sources: 2, agrees: false, alreadyHeld: false }), 0)
  assert.equal(verifiedPay({ sources: 1, agrees: true, alreadyHeld: false }), 0)
  const run = exploreNow({
    two: 2, conflict: 1, onePage: 22, presentReading: false,
    claims: [
      { sources: 2, agrees: true, alreadyHeld: true },
      { sources: 2, agrees: false, alreadyHeld: false },
      { sources: 2, agrees: true, alreadyHeld: false },
    ],
  })
  assert.equal(run.keys, 1)
  assert.equal(run.paid, 4)
})

test('explore moves one step because the affinity is next', () => {
  const step = exploreByNext()
  assert.equal('step' in step && step.step, 1)
  assert.equal('everywhere' in step && step.everywhere, false)
  assert.match('words' in step ? step.words : '', /affinity is next/)
  assert.equal('refused' in exploreByNext(1, 1, 1), true)
})
