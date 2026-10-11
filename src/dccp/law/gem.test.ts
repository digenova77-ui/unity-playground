import assert from 'node:assert/strict'
import test from 'node:test'
import { inscribe, leave, refract } from './gem.ts'

test('the father writes one cell on the diamond and the ray bends', () => {
  const wrote = inscribe({ x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 }, 1, false)
  assert.equal('at' in wrote && wrote.knowledge && wrote.time === 1 && wrote.at.x === 1 && wrote.ior === 2.417, true)
  const again = inscribe({ x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 }, 1, true)
  assert.equal('knowledge' in again && again.knowledge === 0 && again.time === 0, true)
  assert.equal('refused' in inscribe({ x: 0, y: 0, z: 0 }, { x: -2, y: 0, z: 0 }, 1, false), true)
  const bent = refract(0)
  assert.equal('cosOut' in bent && bent.cosOut > 0.9, true)
  assert.equal('cosOut' in leave(1) && leave(1).cosOut === 1, true)
  assert.equal('refused' in leave(0), true)
})
