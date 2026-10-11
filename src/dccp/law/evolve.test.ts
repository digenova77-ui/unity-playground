import assert from 'node:assert/strict'
import test from 'node:test'
import { evolveStep, evolveWords } from './evolve.ts'

test('evolution finds no host and attaches no body', () => {
  const row = evolveStep()
  assert.equal(row.bigger, false)
  assert.equal(row.host, null)
  assert.equal(row.body, null)
  assert.equal(row.alive, false)
  assert.equal(row.necessary, false)
  assert.match(evolveWords(), /does not make a body necessary/)
})
