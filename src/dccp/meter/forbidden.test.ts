import assert from 'node:assert/strict'
import test from 'node:test'
import { forbidden } from './forbidden.ts'

test('403 stays shut when a credential or a payment is offered', () => {
  const row = forbidden('A child\'s record cannot be bought.')
  assert.equal(row.status, 403)
  assert.equal(row.retry, false)
  assert.equal(row.credential, false)
  assert.equal(row.payment, false)
  assert.match(row.words, /Paying does not open it/)
})
