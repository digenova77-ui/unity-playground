import assert from 'node:assert/strict'
import test from 'node:test'
import { GUIDE, guideWords } from './use.ts'

test('the book has one line for every face', () => {
  const text = guideWords()
  assert.equal(GUIDE.length, 20)
  assert.match(text, /Twenty faces/)
  assert.match(text, /\/guide/)
  assert.match(text, /A child can look/)
  assert.doesNotMatch(text, /no line yet/)
  assert.doesNotMatch(text, /holy grail/)
  assert.ok(GUIDE.some(row => row.do === 'Guide'))
  assert.ok(GUIDE.some(row => row.do === 'Cards'))
})
