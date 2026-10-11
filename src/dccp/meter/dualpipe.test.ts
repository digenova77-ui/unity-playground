import assert from 'node:assert/strict'
import test from 'node:test'
import { JOINTS } from './overlay.ts'
import { auditSide, bothAtOnce, dualWords, writeSide } from './dualpipe.ts'

test('the audit side passes only what the sources still hold', () => {
  const rows = auditSide()
  assert.deepEqual(rows.map(row => row.name), JOINTS.map(row => row.name))
  assert.equal(rows.every(row => row.pass), true)
  assert.equal(writeSide().length, rows.length)
  assert.match(dualWords(), /11 of 11 passed/)
  assert.match(dualWords(), /holes were not filled/)
  assert.match(dualWords(), /till stays closed/)
  const both = bothAtOnce()
  assert.equal(both.when, 'same time')
  assert.equal(both.leftOnRight, true)
  assert.equal(both.rightOnLeft, true)
  assert.equal(both.rows, 1)
})
