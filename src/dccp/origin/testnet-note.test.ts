import assert from 'node:assert/strict'
import test from 'node:test'
import { testnetNote } from './testnet-note.ts'

test('the testnet note is not a stack, and nothing promotes', () => {
  assert.deepEqual(testnetNote(), { present: false, proofsRun: false, promotes: false, delivered: false, shared: 'w3name' })
})
