import assert from 'node:assert/strict'
import { test } from 'node:test'
import { admitSeat, matrixWords, priceMatrix } from './matrix.ts'

test('one host is the matrix, and a fleet is refused', () => {
  const one = priceMatrix(1)
  assert.equal('hosts' in one && one.hosts, 1)
  assert.equal('dollar' in one && one.dollar, null)
  const fleet = priceMatrix(30)
  assert.ok('refused' in fleet)
  assert.match(fleet.refused, /second bill/)
  assert.match(matrixWords(), /not a dollar/)
  assert.match(matrixWords(), /EWR/)
})

test('a decision opens only for a seated Unity ID with a test unit left', () => {
  assert.equal(admitSeat(null, 100).open, false)
  assert.equal(admitSeat('unity:seat', 0).open, false)
  assert.equal(admitSeat('unity:seat', 1).open, true)
  assert.match(admitSeat('guest', 100).why, /Unity ID/)
})
