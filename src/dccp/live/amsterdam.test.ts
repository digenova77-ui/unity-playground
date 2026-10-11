import assert from 'node:assert/strict'
import test from 'node:test'
import { amsterdamStore } from './amsterdam.ts'

test('Amsterdam is named and no row was read', () => {
  const row = amsterdamStore()
  assert.equal(row.place, 'Amsterdam')
  assert.equal(row.connected, false)
  assert.equal(row.rows, 0)
  assert.match(row.words, /not this database/)
})
