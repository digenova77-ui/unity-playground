import assert from 'node:assert/strict'
import test from 'node:test'
import { simEntity, simWords } from './entity.ts'

test('the world entity is a simulation and not the world', () => {
  const row = simEntity()
  assert.equal(row.kind, 'simulation')
  assert.equal(row.isWorld, false)
  assert.equal(row.minted, false)
  assert.equal(row.dag, null)
  assert.equal(row.radius, 10)
  assert.match(simWords(), /not the world/)
})
