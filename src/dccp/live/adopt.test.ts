import assert from 'node:assert/strict'
import test from 'node:test'
import { faceFor } from '../meter/close.ts'
import { trickleSum } from '../meter/keys.ts'
import { adoptPlan, dividend, GAP_MS, recordVisit, resetAdopt, tryAdopt, WINDOW_MS } from './adopt.ts'

const day = GAP_MS

test('care pays a dividend after the lock, and a council seat is merit', () => {
  resetAdopt()
  const first = recordVisit({ place: 'node/697771055', seat: 'seat-a', at: 0 })
  assert.equal(first.pay, faceFor(true))
  assert.match(first.said, /not offered twice|first seat/)
  const care = recordVisit({ place: 'node/697771055', seat: 'seat-a', at: day })
  assert.equal(care.pay, 0)
  assert.match(care.said, /Merit 2/)
  const burst = recordVisit({ place: 'node/697771055', seat: 'seat-b', at: 60_000 })
  assert.equal(burst.pay, 0)
  assert.equal(burst.lock.pool, 1)
  recordVisit({ place: 'node/697771055', seat: 'seat-b', at: day * 2 })
  const third = recordVisit({ place: 'node/697771055', seat: 'seat-c', at: day * 3 })
  assert.equal(third.lock.status, 'locked')
  assert.equal(third.lock.council.length, 0)
  const earned = recordVisit({ place: 'node/697771055', seat: 'seat-a', at: day * 4 })
  assert.match(earned.said, /earned a council seat/)
  assert.deepEqual(earned.lock.council, ['seat-a'])
  assert.equal(dividend('node/697771055', 'seat-a', 3), trickleSum(faceFor(true), 3))
  assert.equal(dividend('node/697771055', 'seat-b', 3), trickleSum(faceFor(false), 3))
  assert.equal(dividend('node/697771055', 'seat-d', 3), 0)
  const quiet = recordVisit({ place: 'other', seat: 'seat-a', at: 0 })
  const later = recordVisit({ place: 'other', seat: 'seat-b', at: WINDOW_MS + day })
  assert.match(later.said, /went quiet/)
  assert.equal(later.lock.status, 'logical')
  assert.equal(quiet.lock.status, 'logical')
})

test('a person who is not there does not take the early face', () => {
  resetAdopt()
  const away = tryAdopt({ place: 'node/1', seat: 'seat-a', at: 0, present: false })
  assert.equal(away.pay, 0)
  assert.match(away.said, /not at this place/)
  assert.match(adoptPlan(), /face 4/)
  assert.match(adoptPlan(), /3 seats and a run of 2/)
})
