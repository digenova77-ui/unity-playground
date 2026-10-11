import assert from 'node:assert/strict'
import { test } from 'node:test'
import { alertWords } from './alert.ts'

test('the alert offers a record and enacts nothing', () => {
  const row = alertWords()
  assert.equal(row.forever, false)
  assert.equal(row.enacted, 0)
  assert.equal(row.forced, false)
  assert.equal(row.energy, null)
  assert.equal(row.weapon, false)
  assert.match(row.lines.join(' '), /voluntary call/)
})
