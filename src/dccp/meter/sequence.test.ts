import assert from 'node:assert/strict'
import test from 'node:test'
import { feasibility, launchSeats, sequenceWords } from './sequence.ts'

test('a launch poll is not 100 while a seat is no-go', () => {
  const poll = feasibility()
  assert.equal(poll.ready, false)
  assert.ok(poll.score < 100)
  assert.equal(poll.score, 40)
  assert.equal(launchSeats().some(seat => seat.name === 'SpaceX' || seat.name === 'xAI'), false)
  assert.match(sequenceWords(), /Not ready/)
  assert.doesNotMatch(sequenceWords(), /score is 100/)
})
