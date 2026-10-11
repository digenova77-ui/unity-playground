import assert from 'node:assert/strict'
import test from 'node:test'
import { entitySeat, entitySeatWords } from './entity-seat.ts'

test('a checked count is kept, and the Earth is not a catalog', () => {
  assert.deepEqual(entitySeat(1), { held: 1, catalog: false, better: false })
  assert.equal(entitySeat(-3).held, 0)
  assert.match(entitySeatWords(), /not provided/)
  assert.match(entitySeatWords(), /every entity on Earth/)
})
