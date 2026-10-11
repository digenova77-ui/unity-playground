import assert from 'node:assert/strict'
import test from 'node:test'
import { accessInstead, saleToEqual, tokenCut } from './token-cut.ts'

test('no fiat exit, no singularity day, and no bridge to cut', () => {
  assert.deepEqual(tokenCut(), { fiat: null, infinite: null, singularity: null, bridge: null, fuel: null })
  assert.equal(saleToEqual().sold, false)
  assert.equal(saleToEqual().market, null)
})
