import assert from 'node:assert/strict'
import { test } from 'node:test'
import { DOOR, absorb, isPlanar } from './geometry.ts'

test('a flat card is refused and a body is not', () => {
  assert.equal(isPlanar(10, 10, 0.2), true)
  assert.equal(isPlanar(4, 4, 4), false)
  assert.equal(isPlanar(8, 3, 2), false)
})

test('the door is copied once and not jammed in twice', () => {
  const once = DOOR.reduce((ledger, line) => absorb(ledger, line), [] as readonly string[])
  const twice = once.reduce((ledger, line) => absorb(ledger, line), once)
  assert.equal(twice.length, DOOR.length)
  assert.match(twice.join(' '), /\$0/)
  assert.match(twice.join(' '), /till is closed/i)
})
