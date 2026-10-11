import assert from 'node:assert/strict'
import test from 'node:test'
import { executeChain, protocolChain } from './chain-bind.ts'

test('the protocols are not bound into one chain', () => {
  const row = protocolChain()
  assert.equal(row.bound, false)
  assert.equal(row.dataCenter, null)
  assert.equal(row.entirety, null)
  const run = executeChain()
  assert.deepEqual(run.ran, ['unity', 'api', 'website'])
  assert.equal(run.stopped, 'data-center')
  assert.equal(run.operator, null)
})
