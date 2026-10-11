import assert from 'node:assert/strict'
import test from 'node:test'
import { ROOT } from '../law/root.ts'
import { dayBuckets, dayWords } from './day.ts'

test('the pure is one sentence and the root does not grow', () => {
  const row = dayBuckets()
  assert.equal(row.buckets, 3)
  assert.equal(row.fatherWrote, false)
  assert.equal(row.lit, false)
  assert.equal(row.maturity, 'UNBORN')
  assert.equal(ROOT.length, 9)
  assert.match(dayWords(), /One next/)
  assert.match(dayWords(), /Nothing stays lit/)
})
