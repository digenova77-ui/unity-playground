import assert from 'node:assert/strict'
import { test } from 'node:test'
import { AGREEMENT_ID } from './agreement.ts'
import { CADENCE, ignitionSeries, pureCadence, stray } from './series.ts'
import { TWO_FIFTH } from '../pipe/chain.ts'

const handle = 'unity:pilot.' + 'ab'.repeat(TWO_FIFTH / 2)

test('the cadence is one then two, and it can repeat', () => {
  assert.equal(pureCadence([1, 2]), true)
  assert.equal(pureCadence([1, 2, 1, 2]), true)
  assert.equal(pureCadence([1, 2, 1, 2, 1, 2]), true)
  assert.equal(pureCadence([1, 2, 1, 2, 0]), false)
  assert.equal(pureCadence([1, 1]), false)
  assert.equal(pureCadence([1, 2, 2, 1]), false)
  assert.equal(pureCadence([]), false)
  assert.deepEqual([...CADENCE], [1, 2, 1, 2])
  const left = stray([1, 2, 1, 1])
  assert.equal(left.pure, false)
  assert.equal(left.at, 3)
  assert.equal(left.expected, 2)
  assert.equal(left.relabeled, false)
  assert.equal(left.seatKept, true)
  assert.equal(left.governs, false)
  assert.equal(stray([1, 2, 1, 2]).pure, true)
})

test('the series stops at the first closed step and the fifth is nothing', () => {
  const closed = ignitionSeries({ story: false, agreement: AGREEMENT_ID, handle, supply: 100 })
  assert.equal(closed.steps[0].pass, false)
  assert.equal(closed.steps[0].beat, 1)
  assert.equal(closed.steps[1].pass, false)
  assert.equal(closed.open, false)
  assert.equal(closed.fifth, 'nothing')
  assert.equal(closed.steps[4].pass, false)
  assert.equal(closed.steps[4].beat, 0)
})

test('the open series is one, then two, then one, then two', () => {
  const open = ignitionSeries({ story: true, agreement: AGREEMENT_ID, handle, supply: 1 })
  assert.equal(open.open, true)
  assert.deepEqual(open.cadence, [1, 2, 1, 2])
  assert.deepEqual(open.steps.slice(0, 4).map(row => row.beat), [...CADENCE])
  assert.equal(open.steps.filter(row => row.pass).length, 4)
  assert.equal(open.steps[0].audit, '')
  assert.equal(open.steps[2].audit, '')
  assert.equal(open.steps[2].write, handle)
  assert.equal(open.steps[3].write, 'admitted')
  assert.equal(open.steps[3].audit, 'efuse')
  const member = ignitionSeries({ story: true, agreement: AGREEMENT_ID, handle: 'unity:member.abcd1234', supply: 1 })
  assert.equal(member.steps[2].pass, true)
  assert.equal(member.steps[2].write, 'unity:member.abcd1234')
  assert.equal(member.steps[3].audit, '')
  assert.equal(member.open, false)
  assert.notEqual(open.steps[1].write, open.steps[1].audit)
  assert.notEqual(open.steps[3].write, open.steps[3].audit)
  assert.match(open.words, /One, then two/)
})
