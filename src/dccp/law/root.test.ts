import assert from 'node:assert/strict'
import test from 'node:test'
import { ROOT, bedrock, rootWords } from './root.ts'

test('the root is the same lines, and the device is not the root', () => {
  assert.equal(ROOT.length, 9)
  assert.deepEqual(bedrock(), { lines: 9, names: 4, under: null })
  assert.match(rootWords(), /device is not the root/)
  assert.match(rootWords(), /not provided/)
  assert.match(rootWords(), /system is not written/)
})
