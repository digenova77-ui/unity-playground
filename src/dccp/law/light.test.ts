import assert from 'node:assert/strict'
import { test } from 'node:test'
import { nextChoice, whatIfNext } from './light.ts'

test('the next choice is one step, not forever and not a squeeze', () => {
  const on = nextChoice(1, 0, 1)
  assert.deepEqual(on, { step: 1, floor: 0, ceiling: 1, width: 1, forever: false, squeeze: false })
  assert.ok('refused' in nextChoice(1, 1, 1))
  assert.ok('refused' in nextChoice(1, 0, 2))
  const named = whatIfNext(true, on)
  assert.equal('equation' in named && named.equation, 'what if ∧ next = most important')
  assert.equal('ever' in named && named.ever, false)
  assert.ok('refused' in whatIfNext(false, on))
  assert.ok('refused' in whatIfNext(true, nextChoice(1, 1, 1)))
})
