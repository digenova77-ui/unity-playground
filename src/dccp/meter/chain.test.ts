import assert from 'node:assert/strict'
import test from 'node:test'
import { runChain } from './chain.ts'

test('the swarm returns the record, the manager does not rewrite it, and only the top writes the report', () => {
  const known = runChain('index the streets corners and addresses in Belleville')
  assert.equal(known.returns[0].worker, 'index')
  assert.match(known.returns[0].returned, /street ways/)
  assert.match(known.report, /did not rewrite them/)
  assert.match(known.report, /This is the only report/)
  assert.equal(known.digest, runChain('index the streets corners and addresses in Belleville').digest)
  assert.match(known.digest, /^djb2:/)
  const corner = runChain('show me the intersection of Front Street and Bridge Street in Belleville')
  assert.match(corner.returns.map(row => row.returned).join(' '), /node\/697771055/)
  const empty = runChain('invent a new city')
  assert.match(empty.returns[0].returned, /did not invent/)
  assert.doesNotMatch(empty.report, /street ways/)
})
