import assert from 'node:assert/strict'
import test from 'node:test'
import { protocolWords, SPACEX_PROCEDURE, XAI_PROCEDURE } from './protocols.ts'

test('the published procedure is not called, and SpaceX has none here', () => {
  assert.equal(XAI_PROCEDURE.called, false)
  assert.equal(XAI_PROCEDURE.key, null)
  assert.equal(SPACEX_PROCEDURE.procedure, null)
  assert.equal(SPACEX_PROCEDURE.called, false)
  assert.match(protocolWords(), /Nothing was sent/)
})
