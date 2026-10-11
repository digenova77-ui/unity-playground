import assert from 'node:assert/strict'
import test from 'node:test'
import { echoBody } from './loopback.ts'

test('the loopback echoes a short line and does not run it', () => {
  assert.deepEqual(echoBody('one cut'), { echo: 'one cut', ran: false })
  assert.equal(echoBody('x'.repeat(281)).error, 'too long')
  assert.equal(echoBody('-----BEGIN PRIVATE KEY-----').error, 'a key is not echoed')
})
