import assert from 'node:assert/strict'
import test from 'node:test'
import { bareBones } from './bare.ts'

test('an insult drops and a claim remains, and noise alone is not answered', () => {
  const kept = bareBones('you idiot the river is high')
  assert.equal(kept.disregarded, false)
  assert.match(kept.claim ?? '', /river is high/)
  assert.doesNotMatch(kept.claim ?? '', /idiot/)
  assert.equal(bareBones('you idiot').disregarded, true)
  assert.equal(bareBones('the river is high').claim, 'the river is high')
})
