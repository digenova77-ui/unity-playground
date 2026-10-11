import assert from 'node:assert/strict'
import test from 'node:test'
import { meshSeat, meshWords } from './mesh.ts'

test('the resource mesh is named and not admitted', () => {
  const row = meshSeat()
  assert.equal(row.admitted, false)
  assert.equal(row.force, false)
  assert.equal(row.money, false)
  assert.equal(row.measured, null)
  assert.equal(row.both, true)
  assert.match(meshWords(), /not a grid/)
  assert.match(meshWords(), /not policed/)
})
