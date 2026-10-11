import assert from 'node:assert/strict'
import test from 'node:test'
import { x402Ask } from './x402.ts'

test('x402 is named and nothing settles', () => {
  const row = x402Ask()
  assert.equal(row.status, 402)
  assert.equal(row.amount, null)
  assert.equal(row.payTo, null)
  assert.equal(row.signature, null)
  assert.equal(row.settled, false)
  assert.match(row.words, /Nothing is settled/)
})
