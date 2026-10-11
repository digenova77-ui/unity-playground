import assert from 'node:assert/strict'
import { test } from 'node:test'
import { BOT_JOBS, priorityBoard, priorityWords } from './priorities.ts'

test('fifty jobs are loaded and none are running', () => {
  const board = priorityBoard()
  assert.equal(board.count, 50)
  assert.equal(BOT_JOBS.length, 50)
  assert.equal(board.deployed, true)
  assert.equal(board.running, false)
  assert.equal(board.till, 'closed')
  assert.deepEqual(BOT_JOBS.map(job => job.n), Array.from({ length: 50 }, (_, i) => i + 1))
  assert.equal(board.cut + board.planned, 50)
  assert.ok(board.cut > 0)
  assert.ok(board.planned > 0)
  for (const name of ['assets', 'host', 'signature']) assert.ok(board.held.includes(name))
  const words = priorityWords()
  assert.match(words, /None are running/)
  assert.match(words, /50\. Stop if the audit row/)
  assert.doesNotMatch(words, /ready to launch|score of 100|the till is open/i)
})
