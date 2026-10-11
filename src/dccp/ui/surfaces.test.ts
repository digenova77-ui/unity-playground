import assert from 'node:assert/strict'
import test from 'node:test'
import { invokeAsk, surfaces } from './surfaces.ts'

test('talk and code are separate, and a handle cannot vote', () => {
  const row = surfaces()
  assert.notEqual(row.talk, row.code)
  assert.equal(row.same, true)
  assert.equal(invokeAsk('unity:1').granted, false)
  assert.equal(invokeAsk(null).granted, false)
})
