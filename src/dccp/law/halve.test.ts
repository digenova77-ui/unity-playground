import assert from 'node:assert/strict'
import test from 'node:test'
import { halve, halveWords } from './halve.ts'

test('a decision is halved a finite number of times and does not prove the cosmos', () => {
  const row = halve(100)
  assert.ok(row.cuts.length > 0)
  assert.ok(row.cuts.length <= 8)
  assert.equal(row.forever, false)
  assert.equal(row.proved, false)
  assert.equal(row.cuts.every(cut => cut.guess === 'not the next'), true)
  assert.match(halveWords(100), /does not say the playground is shrinking/)
})
