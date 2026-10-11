import assert from 'node:assert/strict'
import test from 'node:test'
import { splitAsk } from './split.ts'

test('a beside command splits two fitted readings, and a closed ask does not get a pane', () => {
  const pair = splitAsk('what does water look like beside paper')
  assert.equal(pair?.left.title, 'Water')
  assert.equal(pair?.right.title, 'Paper')
  assert.match(pair?.left.lines[0] ?? '', /Parts 4/)
  assert.match(pair?.speech ?? '', /room split/)
  const closed = splitAsk('water beside a nuclear weapon')
  assert.equal(closed?.left.granted, false)
  assert.equal(closed?.left.frames?.length, 0)
  assert.match(closed?.speech ?? '', /does not split onto that/)
  assert.equal(splitAsk('what does water look like'), null)
})
