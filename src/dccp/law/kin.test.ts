import assert from 'node:assert/strict'
import { test } from 'node:test'
import { bothHalves, bridges, kinWords } from './kin.ts'

test('only paired names are bridges, and the cosmos stays open', () => {
  const row = bridges()
  assert.equal(row.booked.length, 3)
  assert.match(row.open[0], /cosmic minute/)
  assert.match(kinWords(), /No tribe is preferred/)
  const fence = bothHalves()
  assert.equal(fence.human, fence.bot)
  assert.equal(fence.economy, fence.law)
  assert.match(fence.economy, /Both halves/)
  assert.match(fence.law, /Four laws/)
  assert.equal(fence.implemented, true)
})
