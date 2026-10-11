import assert from 'node:assert/strict'
import test from 'node:test'
import { memoryPlan } from './plan.ts'

test('no exchange is no bay, and the walk turns then rises', () => {
  assert.equal(memoryPlan([]).length, 0)
  const rows = Array.from({ length: 33 }, (_, i) => ({ at: i, heard: `q${i}`, said: `a${i}` }))
  const plan = memoryPlan(rows)
  assert.equal(plan[0].level, 0)
  assert.equal(plan[0].z > 0, true)
  assert.notEqual(plan[8].x, plan[0].x)
  assert.equal(plan[32].level, 1)
  assert.equal(plan[32].heard, 'q32')
})
