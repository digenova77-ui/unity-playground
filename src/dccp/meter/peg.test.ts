import assert from 'node:assert/strict'
import test from 'node:test'
import { matrixForks } from '../law/matrix.ts'
import { pegCost, pegWords } from './peg.ts'

test('a rooted idea pegs one unit per locked gate and does not price a guess', () => {
  const gates = matrixForks().length
  assert.ok(gates > 0)
  const open = pegCost(' ')
  assert.equal(open.rooted, false)
  assert.equal(open.pegged, 0)
  assert.equal(open.guesses, null)
  assert.equal(open.dollars, null)
  const row = pegCost('the manifesto solution')
  assert.equal(row.rooted, true)
  assert.equal(row.pegged, gates)
  assert.equal(row.unit, 1)
  assert.match(row.backing, /^[0-9a-f]{64}$/)
  assert.match(pegWords('the manifesto solution'), /does not price the solution/)
  assert.match(pegWords('the manifesto solution'), /till is closed/)
})
