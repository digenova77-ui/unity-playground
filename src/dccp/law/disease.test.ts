import assert from 'node:assert/strict'
import test from 'node:test'
import { diseaseWords, heldStem, stemWords } from './disease.ts'

test('one checked stem is held, and every other name stays open', () => {
  assert.equal(heldStem('diabetes'), null)
  const cold = heldStem('what is the code for a cold')
  assert.equal(cold?.code, 'CA00')
  assert.match(stemWords(cold!), /not a diagnosis/)
  assert.match(stemWords(cold!), /J00/)
  assert.match(diseaseWords(), /holds one stem, CA00/)
  assert.match(diseaseWords(), /Every other name stays open/)
})
