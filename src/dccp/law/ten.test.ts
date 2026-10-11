import assert from 'node:assert/strict'
import test from 'node:test'
import { tenNeeded, tenWords } from './ten.ts'

test('ten commandments are not added, because every limit already hangs', () => {
  assert.deepEqual(tenNeeded(), { needed: false, added: 0, hung: 10 })
  assert.match(tenWords(), /not needed/)
  assert.match(tenWords(), /was not added/)
})
