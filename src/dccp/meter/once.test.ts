import assert from 'node:assert/strict'
import { test } from 'node:test'
import { once } from './once.ts'

test('doing it twice is doing it once', () => {
  const memory = new Map<string, number>()
  let calls = 0
  const a = once('book', () => { calls += 1; return 1 }, memory)
  const b = once('book', () => { calls += 1; return 2 }, memory)
  assert.equal(a, 1)
  assert.equal(b, 1)
  assert.equal(calls, 1)
})
