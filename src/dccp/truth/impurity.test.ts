import assert from 'node:assert/strict'
import test from 'node:test'
import { impureRows, impurityWords, SYSTEMIC } from './impurity.ts'

test('a conflict or an unconfirmed number is impure, and the hole is not filled', () => {
  assert.equal(impureRows([{ conflicts: 0, unconfirmed: 0 }, { conflicts: 1, unconfirmed: 0 }]), 1)
  assert.equal(SYSTEMIC.length, 5)
  assert.match(impurityWords(1, 2), /does not wash/)
  assert.match(impurityWords(0, 0), /Leave it open/)
})
