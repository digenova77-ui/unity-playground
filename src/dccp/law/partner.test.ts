import assert from 'node:assert/strict'
import test from 'node:test'
import { forPartner } from './partner.ts'

test('the partner receives a claim and nothing else', () => {
  assert.equal(forPartner('you idiot the river is high').line, 'you the river is high')
  assert.equal(forPartner('you idiot').line, null)
  assert.equal(forPartner('pay the earlier investors with the later money').line, null)
  assert.match(forPartner('put solar at the rural end of the line').line ?? '', /solar/)
})
