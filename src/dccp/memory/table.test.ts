import assert from 'node:assert/strict'
import test from 'node:test'
import { DnaPool } from './dna.ts'
import { layTable, openTables, readTable, rowPlace, tablePlane } from './table.ts'

test('three tables sit on their own planes, and a second lay does not add a molecule', () => {
  assert.notEqual(tablePlane('rings'), tablePlane('decisions'))
  const place = rowPlace('rings', 0, 3)
  assert.ok(place.y >= -1 && place.y <= 1)
  const pool = new DnaPool()
  const refused = layTable(pool, 'rings', [{ what: '', now: 'missing' }])
  assert.equal('refused' in refused, true)
  assert.equal(pool.stats().molecules, 0)
  const opened = openTables()
  assert.equal(opened.pool.stats().molecules, (3 + 6 + 5) * 2)
  assert.deepEqual(readTable(opened.pool, 'rings').map(row => row.what), ['DCLM', 'Iris', 'Twain'])
  assert.equal(readTable(opened.pool, 'decisions').length, 6)
  assert.match(opened.speech, /same 28/)
})
