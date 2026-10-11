import assert from 'node:assert/strict'
import { test } from 'node:test'
import { admitRings, freshBox, fundWallet, loadBox, dumpBox, sendUnits, viewWallet, withdrawUnits } from './unitybox.ts'

test('a funded handle can send, and the recipient can receive', () => {
  const box = freshBox()
  const funded = fundWallet(box, 'unity:pilot.aaaaaaaa', 50)
  assert.equal(funded.ok && funded.taken, 50)
  const again = fundWallet(box, 'unity:pilot.aaaaaaaa', 50)
  assert.equal(again.ok && again.taken, 0)
  const sent = sendUnits(box, 'unity:pilot.aaaaaaaa', 'unity:pilot.bbbbbbbb', 20, '2026-10-04T00:00:00Z', 'abc')
  assert.equal(sent.ok, true)
  const mine = viewWallet(box, 'unity:pilot.aaaaaaaa')
  const theirs = viewWallet(box, 'unity:pilot.bbbbbbbb')
  assert.equal('balance' in mine && mine.balance, 30)
  assert.equal('balance' in theirs && theirs.balance, 20)
  assert.equal(sendUnits(box, 'unity:pilot.aaaaaaaa', 'unity:pilot.aaaaaaaa', 1, 't', 'r').ok, false)
  assert.equal(sendUnits(box, 'unity:pilot.aaaaaaaa', 'unity:pilot.bbbbbbbb', 31, 't', 'r').ok, false)
  const back = withdrawUnits(box, 'unity:pilot.aaaaaaaa', 30, 't', 'r')
  assert.equal(back.ok && back.returned, 30)
  assert.equal(back.ok && back.balance, 0)
  const againFund = fundWallet(box, 'unity:pilot.aaaaaaaa', 10)
  assert.equal(againFund.ok && againFund.taken, 10)
  const restored = loadBox(dumpBox(box))
  const seen = viewWallet(restored, 'unity:pilot.aaaaaaaa')
  assert.equal('balance' in seen && seen.balance, 10)
})

test('a broken ring stops the move', () => {
  const closed = admitRings({ rings: 0, seed: null })
  assert.equal(closed.ok, false)
  const open = admitRings({ rings: 3, seed: 'seed' })
  assert.equal(open.ok, true)
})
