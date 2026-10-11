import assert from 'node:assert/strict'
import test from 'node:test'
import { checkFatherPlan, checkWords, fatherPlan, irisInventory } from './inventory.ts'

test('the father plan says 100 and the check says it is not right', () => {
  assert.equal(fatherPlan().claimed, 100)
  assert.equal(fatherPlan().execution, false)
  const check = checkFatherPlan()
  assert.equal(check.right, false)
  assert.equal(check.count, 40)
  assert.equal(check.open.includes('SpaceX'), false)
  assert.equal(check.open.includes('xAI'), false)
  assert.equal(irisInventory().go, 2)
  assert.match(checkWords(), /not right/)
  assert.match(checkWords(), /Twain²/)
  assert.doesNotMatch(checkWords(), /the plan is right/)
})
