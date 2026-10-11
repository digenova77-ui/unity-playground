import assert from 'node:assert/strict'
import test from 'node:test'
import { clearIdempotency } from './idempotency.ts'
import { admitRunner, checkFloor, runChecks } from './runner.ts'

test('the four checks pass here and a repeat is the same row', () => {
  const row = runChecks()
  assert.equal(row.external, false)
  assert.equal(row.door, true)
  assert.equal(row.still, true)
  assert.equal(row.second, true)
  assert.equal(row.till, true)
  assert.equal(row.pass, true)
  const floor = checkFloor(1)
  assert.equal('floor' in floor && floor.floor, -1)
  assert.equal('ceiling' in floor && floor.ceiling, 1)
  assert.equal('refused' in checkFloor(2), true)
  clearIdempotency()
  const first = admitRunner('runner-1')
  const again = admitRunner('runner-1')
  assert.equal(first.ok && again.ok && first.replay === false && again.replay === true && first.key === again.key, true)
  assert.equal(first.ok && first.money === null && first.settled === false && first.delivered === false, true)
  assert.equal(first.ok && first.external === false, true)
  clearIdempotency()
})
