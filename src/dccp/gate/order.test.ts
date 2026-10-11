import assert from 'node:assert/strict'
import test from 'node:test'
import { ORDER, advance, orderBody, orderWords } from './order.ts'

test('the handoff is one order, and a banned name is not a step', () => {
  assert.deepEqual(ORDER.map(row => row.n), [1, 2, 1, 2, 1, 2, 1, 2])
  assert.deepEqual(ORDER.map(row => row.id), ['source', 'prefetch', 'fetch', 'hand', 'collapse', 'jacket', 'check', 'next'])
  const done: string[] = []
  for (const row of ORDER) {
    assert.equal(advance(done, 'ipfs').ok, false)
    assert.equal(advance(done, 'ipns').ok, false)
    assert.equal(advance(done, 'cloudflare').ok, false)
    assert.equal(advance(done, row.id === 'source' ? 'fetch' : 'source').ok, false)
    const step = advance(done, row.id)
    assert.equal(step.ok, true)
    if (step.ok) done.push(step.id)
  }
  assert.equal(advance(done, 'source').ok, false)
  const body = orderBody()
  assert.deepEqual(body.banned, ['ipfs', 'ipns', 'cloudflare'])
  assert.equal(body.order.length, 8)
  assert.match(orderWords(), /original source/)
  assert.match(orderWords(), /five pins/)
  assert.equal(JSON.stringify(body).includes('ipfs'), true)
  assert.equal(body.order.some(row => row.id === 'ipfs' || row.id === 'ipns'), false)
})
