import assert from 'node:assert/strict'
import test from 'node:test'
import { finishSlot, handoff, queueLine, resetQueue } from './queue.ts'

test('a finished slot takes the next task immediately, and street view is not invented', () => {
  resetQueue()
  const seated = handoff()
  assert.match(seated, /A running: index the streets/)
  assert.match(seated, /B running: show me the intersection/)
  assert.match(seated, /1 waiting/)
  assert.doesNotMatch(seated, /2338 street ways/)
  const first = finishSlot('A')
  assert.match(first?.report ?? '', /2338 street ways/)
  assert.match(queueLine(), /A running: connect street view/)
  assert.match(queueLine(), /B running: show me the intersection/)
  const view = finishSlot('A')
  assert.match(view?.report ?? '', /did not invent a result/)
  const corner = finishSlot('B')
  assert.match(corner?.report ?? '', /node\/697771055/)
  assert.match(queueLine(), /A is open/)
  assert.match(queueLine(), /B is open/)
  assert.match(queueLine(), /0 waiting/)
})
