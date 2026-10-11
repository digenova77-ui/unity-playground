import assert from 'node:assert/strict'
import test from 'node:test'
import { rolloutRows, rolloutWords } from './rollout.ts'

test('a page rollout does not pretend to be the kernel', () => {
  const rows = rolloutRows(false)
  assert.equal(rows.some(row => row.layer === 'kernel' && row.works), false)
  assert.match(rolloutWords(rows), /operating system/)
  assert.match(rolloutRows(true).map(row => row.text).join(' '), /not a legal identity/)
})
