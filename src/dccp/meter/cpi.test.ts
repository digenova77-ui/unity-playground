import assert from 'node:assert/strict'
import test from 'node:test'
import { cpiWords, derivativeWords, fisher, inflation, laspeyres, objectIndex, ourIndex, paasche, sectorIndex, tiedIndexes, type Quote, worldNow } from './cpi.ts'

const base: Quote[] = [
  { good: 'bread', price: 1, quantity: 2 },
  { good: 'milk', price: 2, quantity: 1 },
]
const now: Quote[] = [
  { good: 'bread', price: 2, quantity: 2 },
  { good: 'milk', price: 3, quantity: 1 },
]

test('a well formed basket has an index, and the peg does not', () => {
  assert.equal(laspeyres(base, now), 7 / 4)
  assert.equal(paasche(base, now), 7 / 4)
  assert.equal(fisher(base, now), 7 / 4)
  assert.equal(laspeyres([{ good: 'unit', price: 1, quantity: 1 }, { good: 'unit', price: 1, quantity: 1 }], [{ good: 'unit', price: 1, quantity: 1 }, { good: 'unit', price: 1, quantity: 1 }]), null)
  assert.equal(ourIndex(), null)
  assert.equal(objectIndex(), null)
  assert.equal(worldNow(), null)
  assert.deepEqual(tiedIndexes(), { cpi: null, objects: null, world: null, same: true, index: null })
  assert.equal(inflation(ourIndex(), ourIndex()), null)
  assert.equal(inflation(1, 2), 1)
  assert.equal(sectorIndex('healthcare'), null)
  assert.match(derivativeWords(), /not a priced good/)
  assert.match(cpiWords(), /Our index is empty/)
})
