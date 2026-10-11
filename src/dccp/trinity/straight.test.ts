import assert from 'node:assert/strict'
import test from 'node:test'
import { straightPass } from './straight.ts'

test('the straight pass starts at the floor and stops at the map', () => {
  const pass = straightPass()
  assert.deepEqual(pass.floor, ['NO_FORCE', 'HOST_SAFE', 'CLEANUP_FIRST', 'TRUTH_OR_NOTHING'])
  assert.equal(pass.fifth, 'nothing')
  assert.equal(pass.count, 40)
  assert.deepEqual(pass.open, ['assets', 'host', 'signature'])
  assert.equal(pass.fatherWrote, false)
  assert.match(pass.words, /not a world hole/)
  assert.match(pass.words, /will not call that 100/)
  assert.doesNotMatch(pass.words, /SpaceX|xAI/)
})
