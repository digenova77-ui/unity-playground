import assert from 'node:assert/strict'
import test from 'node:test'
import { heldClaim, heldWords } from './held.ts'

test('what you already have is not minted into a title', () => {
  const row = heldClaim()
  assert.equal(row.minted, false)
  assert.equal(row.title, false)
  assert.equal(row.dag, null)
  assert.equal(row.time, 'not driven here')
  assert.match(heldWords(), /does not mint it/)
})
