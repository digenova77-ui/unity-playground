import assert from 'node:assert/strict'
import test from 'node:test'
import { RUNGS, spectrumAsk } from './spectrum.ts'

test('a teacher and a student are the two seats of one rung', () => {
  assert.equal(RUNGS.length, 11)
  const teach = spectrumAsk('elementary school teacher')
  assert.match(teach!.speech, /Elementary teacher/)
  assert.match(teach!.speech, /Elementary student/)
  assert.equal(teach!.seats, 2)
  const learn = spectrumAsk('high school student')
  assert.match(learn!.speech, /High school student/)
  assert.match(learn!.speech, /High school teacher/)
  const all = spectrumAsk('the teaching spectrum and the polar opposite')
  assert.match(all!.speech, /same spectrum/)
  assert.equal(spectrumAsk('draw my curriculum at university'), null)
  assert.equal(spectrumAsk('grade two classroom'), null)
})
