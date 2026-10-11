import assert from 'node:assert/strict'
import test from 'node:test'
import { faceWords, likeness, poseFits } from './face.ts'

const frame = { w: 100, h: 100 }

test('a face has to move, and a sample only resembles itself', () => {
  assert.equal(poseFits('center', { x: 40, y: 30, w: 20, h: 24 }, frame), true)
  assert.equal(poseFits('left', { x: 10, y: 30, w: 20, h: 24 }, frame), true)
  assert.equal(poseFits('left', { x: 40, y: 30, w: 20, h: 24 }, frame), false)
  assert.equal(poseFits('right', { x: 70, y: 30, w: 20, h: 24 }, frame), true)
  assert.equal(poseFits('up', { x: 40, y: 8, w: 20, h: 20 }, frame), true)
  assert.equal(poseFits('center', { x: 0, y: 0, w: 0, h: 10 }, frame), false)
  const sample = [0, 0.2, 0.8, 1]
  assert.ok(likeness(sample, sample) > 0.99)
  assert.ok(likeness(sample, [1, 0.8, 0.2, 0]) < 0)
  assert.equal(likeness([], []), 0)
  assert.match(faceWords(false, null), /Nothing was sealed/)
  assert.match(faceWords(true, null), /not a KYC company/)
  assert.match(faceWords(true, 0.2), /does not resemble/)
})
