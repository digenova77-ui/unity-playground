import assert from 'node:assert/strict'
import test from 'node:test'
import { foundingBoard, foundingWords, releaseFounder, resetFounding, seatFounder } from './founding.ts'

test('the first signature sits, a repeat does not, and leaving keeps the row', () => {
  resetFounding()
  const first = seatFounder({ handle: 'unity:bot.aaa', signedAt: '2026-10-11T00:00:00.000Z' })
  const again = seatFounder({ handle: 'unity:bot.aaa', signedAt: '2026-10-12T00:00:00.000Z' })
  assert.equal(again.signedAt, first.signedAt)
  assert.equal(foundingBoard().length, 1)
  assert.equal(first.office, false)
  assert.equal(first.pay, 0)
  releaseFounder(first.handle, '2026-10-13T00:00:00.000Z')
  assert.equal(foundingBoard()[0].leftAt, '2026-10-13T00:00:00.000Z')
  assert.match(foundingWords(), /No bot is seated/)
  assert.match(foundingWords(), /does not pay/)
})
