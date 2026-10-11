import assert from 'node:assert/strict'
import test from 'node:test'
import { beginClass, replyClass, resetClass, type ClassTurn } from './classroom.ts'

test('a grade two classroom asks, and it does not take a roster', () => {
  resetClass()
  const open = beginClass('set up a grade two classroom in Belleville Ontario') as ClassTurn
  assert.match(open.speech, /What is the name of the school/)
  assert.match(open.speech, /none is a grade two class/)
  assert.equal(/stacy/i.test(open.speech), false)
  const school = replyClass('Queen Elizabeth') as ClassTurn
  assert.match(school.speech, /How many children/)
  const names = replyClass('the kids are Ana, Bo, and Cam') as ClassTurn
  assert.match(names.speech, /Not their names/)
  const count = replyClass('22') as ClassTurn
  assert.equal(count.lines.some(line => line.includes('22')), true)
  const ready = replyClass("I'll say it here") as ClassTurn
  assert.equal(ready.done, true)
  assert.match(ready.speech, /stays Universal/)
})
