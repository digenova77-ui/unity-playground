import assert from 'node:assert/strict'
import test from 'node:test'
import { ringSeries, ringSeriesWords } from './ringfuse.ts'

test('ring fusions grow as size times complexity and are not a price', () => {
  const rows = ringSeries()
  assert.ok(Array.isArray(rows))
  if (!Array.isArray(rows)) return
  assert.equal(rows.length, 7)
  assert.equal(rows.find(row => row.size === 1)?.cost, 1)
  assert.equal(rows.find(row => row.size === 2)?.cost, 4)
  const all = rows.find(row => row.size === 3)
  assert.equal(all?.id, 'logic+truth+pragmatism')
  assert.equal(all?.complexity, 3)
  assert.equal(all?.cost, 9)
  assert.deepEqual(all?.provedBy, ['logic+truth', 'truth+pragmatism', 'pragmatism+logic'])
  assert.equal(all?.worth, null)
  assert.match(ringSeriesWords(), /proved by the three pairs/)
  assert.match(ringSeriesWords(), /not a price/)
  assert.match(ringSeriesWords(), /till is closed/)
})
