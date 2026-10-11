import assert from 'node:assert/strict'
import test from 'node:test'
import { compile, handToWorker } from './compile.ts'

test('common language becomes one closed instruction, and a trap is NOP', () => {
  assert.equal(compile('please run a shift').code, 'SHIFT')
  assert.equal(compile('hire a bot').code, 'HIRE 1')
  assert.equal(compile('the river is high').code, 'HOLD')
  assert.equal(compile('pay the earlier investors with the later money').code, 'NOP')
  assert.equal(compile('the night shift is long').code, 'HOLD')
  const handed = handToWorker('hire a bot to grind')
  assert.equal(handed.given, 'HIRE 1')
  assert.equal(handToWorker('the river is high').given, '')
})
