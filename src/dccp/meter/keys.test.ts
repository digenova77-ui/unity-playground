import assert from 'node:assert/strict'
import { test } from 'node:test'
import { faceFor, giveKey, mintKey, payTrickle, trickleSum } from './keys.ts'

test('a new key is worth more than one already found', () => {
  assert.equal(faceFor(true), 4)
  assert.equal(faceFor(false), 1)
})

test('the trickle grows as a logarithm and slows down', () => {
  const early = trickleSum(4, 1)
  const later = trickleSum(4, 8) - trickleSum(4, 7)
  assert.ok(early > later)
  assert.ok(Math.abs(trickleSum(4, 5) - 4 * Math.log(6)) < 1e-9)
})

test('a bot key does not pay until a human has taken it', () => {
  const bot = giveKey(mintKey('bot-1', 'schematic', true, 'bots'), 1)
  assert.equal(payTrickle([bot], 1, new Set()).bots, 0)
  assert.ok(payTrickle([bot], 1, new Set(['bot-1'])).bots > 0)
  const held = mintKey('mesh', 'the mesh', true, 'doctor')
  const before = payTrickle([held, bot], 1)
  assert.equal(before.doctor, 0)
  assert.ok(before.bots > 0)
})
