import assert from 'node:assert/strict'
import test from 'node:test'
import { spokenNumber, spokenTurn } from './dictate.ts'

test('speech routes a tap, and a key is not speech', () => {
  assert.equal(spokenNumber('twenty five'), 25)
  assert.equal(spokenNumber('2,000'), 2000)
  assert.equal(spokenTurn('open the wallet').kind, 'nav')
  const send = spokenTurn('send five units to ada')
  assert.equal(send.kind, 'send')
  if (send.kind === 'send') assert.equal(send.amount, 5)
  assert.equal(spokenTurn('paste the public key').kind, 'key-hole')
  assert.equal(spokenTurn('apple', { nutrition: true }).kind, 'food')
  assert.equal(spokenTurn('what do you remember').kind, 'ask')
})
