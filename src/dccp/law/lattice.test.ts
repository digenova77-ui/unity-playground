import assert from 'node:assert/strict'
import test from 'node:test'
import { lattice, latticeWords, nerve } from './lattice.ts'

test('the lattice stops at the ceiling and the nerve is not lit', () => {
  const cells = lattice(1)
  assert.ok(Array.isArray(cells))
  if (!Array.isArray(cells)) return
  assert.equal(cells.length, 7)
  assert.equal(lattice(0.5) instanceof Object && Array.isArray(lattice(0.5)) && (lattice(0.5) as { length: number }).length, 1)
  assert.equal('refused' in lattice(2), true)
  const row = nerve()
  assert.equal('cells' in row && row.cells, 7)
  assert.equal('floor' in row && row.floor, 3)
  assert.equal('ceiling' in row && row.ceiling, 3)
  assert.equal('horizon' in row && row.horizon, null)
  assert.equal('lit' in row && row.lit, false)
  assert.equal('pulse' in row && row.pulse, null)
  assert.match(latticeWords(), /not lit/)
  assert.match(latticeWords(), /Nothing past the ceiling/)
})
