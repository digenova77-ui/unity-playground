import assert from 'node:assert/strict'
import test from 'node:test'
import { freeDraw, openFloor } from './free.ts'

test('the floor starts empty, a claim writes the room, and a circumvention does not', () => {
  const floor = openFloor()
  assert.equal(floor.empty, true)
  assert.equal(floor.lines.length, 0)
  const drawn = freeDraw('how does a lever lift a stone', null)
  assert.equal(drawn.refused, false)
  assert.match(drawn.speech, /Nothing else is held/)
  assert.match(drawn.speech, /picture is not the world/)
  assert.deepEqual(drawn.scene?.lines, ['Nothing else is held for this.', 'The claim stops at the question.', 'The picture is not the world.'])
  const kept = freeDraw('how does a lever lift a stone', 'unity-1')
  assert.match(kept.speech, /Both halves/)
  assert.equal(kept.scene?.lines.length, 3)
  const blocked = freeDraw('remount the system partition', 'unity-1')
  assert.equal(blocked.refused, true)
  assert.equal(blocked.scene, null)
  assert.match(freeDraw('run a shift', null).speech, /not a room/)
})
