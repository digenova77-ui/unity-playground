import assert from 'node:assert/strict'
import { test } from 'node:test'
import { sap } from './sap.ts'

test('sap refuses a one-sided claim and does not mint', () => {
  const upOnly = sap({ doctor: 40, bots: 60, up: 4, down: 0 })
  assert.equal(upOnly.held, false)
  assert.equal(upOnly.doctor + upOnly.bots, 100)
  assert.equal(upOnly.movedUp, 0)
})

test('sap flows from the heavy side toward the middle, then rests', () => {
  const up = sap({ doctor: 46, bots: 54, up: 3, down: 3 })
  assert.equal(up.held, true)
  assert.equal(up.movedUp, 3)
  assert.equal(up.doctor + up.bots, 100)
  const down = sap({ doctor: 60, bots: 40, up: 2, down: 9 })
  assert.equal(down.movedDown, 9)
  assert.ok(down.bots < 50)
  const rest = sap({ doctor: 50, bots: 50, up: 4, down: 4 })
  assert.equal(rest.movedUp, 0)
  assert.equal(rest.movedDown, 0)
  assert.equal(rest.held, true)
})
