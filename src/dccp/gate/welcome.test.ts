import assert from 'node:assert/strict'
import test from 'node:test'
import { WELCOME, WELCOME_MS, WELCOME_SPEECH } from './welcome-lines.ts'

test('the 3D welcome follows the gate and does not repeat the coin', () => {
  assert.equal(WELCOME[0].at, 0)
  assert.equal(WELCOME.reduce((sum, beat) => sum + beat.hold, 0), WELCOME_MS)
  assert.equal(WELCOME[1].line, 'Welcome to the Unity playground.')
  assert.equal(WELCOME.at(-1)?.line.includes('Earth is open'), true)
  assert.equal(WELCOME.some(beat => /supply|wallet|dollar|market/i.test(beat.line)), false)
  assert.match(WELCOME_SPEECH, /Unity playground/)
})
