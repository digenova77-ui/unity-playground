import assert from 'node:assert/strict'
import test from 'node:test'
import { diamondSpeak, gradeAsk } from './grade.ts'

test('a fact and a line are graded once and then she stops', () => {
  assert.equal(gradeAsk('write a poem'), null)
  assert.match(gradeAsk('Fact:\nLine: They already signed.') ?? '', /^Open\./)
  assert.match(gradeAsk('Fact: The nerve is not lit.\nLine: The nerve is lit.') ?? '', /^Lie\./)
  assert.match(gradeAsk('Fact: The nerve is not lit.\nLine: The nerve is not lit.') ?? '', /^Truth\./)
  assert.match(gradeAsk('Fact: The nerve is not lit.\nLine:') ?? '', /Nothing was claimed/)
})

test('the floor tongue is closed', () => {
  assert.match(diamondSpeak('floor') ?? '', /The floor is 0/)
  assert.match(diamondSpeak('thought: the offer is at their door') ?? '', /Nothing was made/)
  assert.match(diamondSpeak('hammer: they already signed') ?? '', /was not in the idea/)
  assert.match(diamondSpeak('hammer: the offer is at their door') ?? '', /Nothing new was added/)
  assert.match(diamondSpeak('1: the offer is at their door\n2: they already signed') ?? '', /^Lie\./)
  assert.equal(diamondSpeak('write a poem'), null)
})
