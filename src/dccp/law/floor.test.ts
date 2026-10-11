import assert from 'node:assert/strict'
import test from 'node:test'
import { SEATS, lawSpeech, lockstep } from './floor.ts'

test('both pipes lock, and a copy or a drift does not', () => {
  const first = SEATS.map(lockstep)
  const second = SEATS.map(lockstep)
  assert.deepEqual(first, second)
  assert.equal(first.every(row => row.ok), true)
  assert.match(lawSpeech(), /NO_FORCE/)
  assert.match(lawSpeech(), /holds nothing/)
  assert.equal(lawSpeech().includes('eFuse'), false)
  assert.equal(lawSpeech().includes('Trinity'), false)
  const drifted = { ...SEATS[0], machine: 'DCLM issues a handle.' }
  assert.equal(lockstep(drifted).ok, false)
  assert.equal(lockstep({ ...SEATS[1], machine: SEATS[1].shown }).ok, false)
})
