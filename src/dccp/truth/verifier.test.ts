import assert from 'node:assert/strict'
import test from 'node:test'
import { verifierWords, verifyTruth } from './verifier.ts'

test('only a present human verifies truth', () => {
  assert.equal(verifyTruth({ present: false, account: true }).state, 'refused')
  assert.equal(verifyTruth({ present: true, account: false }).state, 'refused')
  assert.equal(verifyTruth({ present: true, account: true }).state, 'verified')
  assert.match(verifierWords(), /account says it/)
})
