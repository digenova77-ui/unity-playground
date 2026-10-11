import assert from 'node:assert/strict'
import test from 'node:test'
import { clearIdempotency, stored } from '../origin/idempotency.ts'
import { HISTORICAL_LANDER_CID } from '../pipe/chain.ts'
import { admitPins } from './pins.admit.ts'
import { HANG, PINS, PIN_CID, cidGroups, pinBody, pinLines, pinWords } from './pins.ts'

test('five pins hang on GitHub and the world, and Cloudflare is gone', () => {
  assert.equal(PINS.length, 5)
  assert.deepEqual([...PINS], ['404.html', 'alacarte.html', 'index.html', 'manifold.html', 'rtesimadclm/manifold.html'])
  const body = pinBody()
  assert.deepEqual(pinBody(), body)
  assert.equal(body.ipfs, HANG.ipfs)
  assert.equal(body.ipns, null)
  assert.equal(body.retrieval, 'HOLE')
  assert.equal(body.github, 'https://github.com/digenova77-ui/dualiscapax-landing')
  assert.equal(body.world, 'http://108.61.17.141')
  assert.equal(JSON.stringify(body).toLowerCase().includes('cloudflare'), false)
  assert.match(pinWords(), /same pin/)
  assert.match(pinWords(), /Cloudflare is not in the hang/)
  assert.equal(cidGroups().join(''), PIN_CID)
  assert.equal(pinLines().find(row => row.k === 'IPFS')?.v.replace(/ /g, ''), PIN_CID)
  assert.equal(pinLines().filter(row => row.v === 'HOLE').map(row => row.k).join(','), 'IPNS,Retrieval')
})

test('the same five pins are one row, and a different set does not overwrite', () => {
  clearIdempotency()
  const first = admitPins(PINS, PIN_CID)
  const second = admitPins(PINS, PIN_CID)
  assert.equal(first.ok && second.ok && first.replay === false && second.replay === true && first.key === second.key, true)
  if (!first.ok) return
  const other = admitPins([...PINS].reverse(), PIN_CID)
  const swapped = admitPins(PINS, 'bafybeinotthepin')
  assert.equal(other.ok, false)
  assert.equal(swapped.ok, false)
  assert.equal(stored(first.key)?.key, first.key)
  assert.equal(PIN_CID, HISTORICAL_LANDER_CID)
  assert.equal(admitPins(PINS, PIN_CID).ok && admitPins(PINS, PIN_CID).replay, true)
})
