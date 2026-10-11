import assert from 'node:assert/strict'
import test from 'node:test'
import { launchGate, launchLine, launchWords } from './launch.ts'

test('the launch condition fails, and no host is deployed', () => {
  assert.deepEqual(launchGate(), { launched: false, harmony: false, assets: null, expenses: null, host: null })
  assert.match(launchWords(), /Not launched/)
  assert.match(launchLine(), /not deployed/)
})
