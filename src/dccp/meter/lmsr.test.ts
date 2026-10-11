import assert from 'node:assert/strict'
import test from 'node:test'
import { liveBook, prices, worked, worstLoss } from './lmsr.ts'

test('two, three, and five outcomes match the worked book, and the live book is closed', () => {
  const two = worked(2)
  const three = worked(3)
  const five = worked(5)
  assert.ok(two && three && five)
  assert.ok(Math.abs(two.paid - 1.620) < 0.001)
  assert.ok(Math.abs(three.paid - 1.309) < 0.001)
  assert.ok(Math.abs(five.paid - 0.964) < 0.001)
  assert.ok(Math.abs(two.price[0] - 0.731) < 0.001)
  assert.ok(Math.abs(three.price[0] - 0.665) < 0.001)
  assert.ok(Math.abs(five.price[0] - 0.564) < 0.001)
  assert.ok(Math.abs((prices([0, 0]) ?? []).reduce((s, x) => s + x, 0) - 1) < 1e-12)
  assert.ok(Math.abs((worstLoss(2) ?? 0) - Math.log(2)) < 1e-12)
  assert.ok(Math.abs((worstLoss(5) ?? 0) - Math.log(5)) < 1e-12)
  assert.equal(two.settlements[0].pays, 2)
  assert.ok(Math.abs(two.settlements[0].maker - (two.paid - 2)) < 1e-9)
  assert.deepEqual(liveBook(), { open: false, taken: 0 })
  assert.equal(worked(1), null)
})
