import assert from 'node:assert/strict'
import test from 'node:test'
import { irisInner } from '../unity/abstract.ts'
import { inStep, nerveWords, relay } from './nerve.ts'

test('a relay receives a held fact and does not write it twice', () => {
  const beats = [1, 2, 1, 2]
  const line = 'The nerve is not lit.'
  assert.equal(inStep(beats), true)
  assert.equal(inStep([1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1]), false)
  const owned = irisInner(line, line)
  assert.equal(owned.owned, true)
  assert.equal(irisInner('The nerve is lit.', line).owned, false)
  assert.equal(irisInner(line, null).owned, false)
  if (!owned.owned) return
  const seen = new Set<string>()
  const first = relay(beats, line, seen, line)
  assert.equal(first.received, true)
  if (!first.received) return
  assert.equal(first.replay, false)
  seen.add(`${beats.join('')}:${owned.word}`)
  const second = relay(beats, line, seen, line)
  assert.equal(second.received, true)
  if (!second.received) return
  assert.equal(second.replay, true)
  assert.equal(relay([1, 2, 1], line, seen, line).received, false)
  assert.equal(relay(beats, 'The nerve is lit.', seen, line).received, false)
  const speech = nerveWords()
  assert.match(speech, /nerve is not lit/)
  assert.match(speech, /not a second write/)
  assert.match(speech, /does not close/)
  assert.match(speech, /A lie does not cross/)
})
