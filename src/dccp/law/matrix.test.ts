import assert from 'node:assert/strict'
import test from 'node:test'
import { mapSpeech, matrixForks, openMatrix, predictability, serialPath, tapDecision, tapSide } from './matrix.ts'

test('a decision waits for both choices, then the next pair opens', () => {
  const forks = matrixForks()
  assert.equal(forks.length >= 2, true)
  let steps = openMatrix()
  assert.equal(tapDecision(steps, forks.length).length, 1)
  steps = tapSide(steps, 'left')
  steps = tapDecision(steps, forks.length)
  assert.equal(steps[0].taken, false)
  steps = tapSide(steps, 'right')
  steps = tapDecision(steps, forks.length)
  assert.equal(steps[0].taken, true)
  assert.equal(steps[1].left, false)
  assert.equal(serialPath(steps, forks)[0], forks[0].decision)
  const again = tapSide(steps, 'left')
  assert.equal(again[1].left, true)
  assert.deepEqual(tapSide(again, 'left'), again)
  assert.match(mapSpeech(), /evidence/)
  assert.match(mapSpeech(), /After 3, there is no pair/)
  assert.match(predictability(), /does not choose/)
})
