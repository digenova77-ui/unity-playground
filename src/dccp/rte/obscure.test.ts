import assert from 'node:assert/strict'
import test from 'node:test'
import { frameObscure, obscureLines } from './obscure.ts'

test('an obscure ask is three seats, and the question is not a place', () => {
  const frame = frameObscure('a lever')
  assert.equal(frame.both, true)
  assert.deepEqual(obscureLines(frame), [
    'Nothing else is held for this.',
    'The claim stops at the question.',
    'The picture is not the world.',
  ])
})
