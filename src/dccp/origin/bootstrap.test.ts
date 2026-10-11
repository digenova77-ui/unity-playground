import assert from 'node:assert/strict'
import test from 'node:test'
import { executeLayout } from './bootstrap.ts'
import { resetMainnet, undoMainnet } from './write-state.ts'

test('the layout is appended and undo does not remove it', () => {
  resetMainnet()
  const built = executeLayout()
  const again = executeLayout()
  assert.equal(built.bill, false)
  assert.equal(built.now, 'append')
  assert.equal(built.undo, false)
  assert.equal(built.written, 6)
  assert.equal(again.written, 6)
  assert.equal(undoMainnet().undone, false)
  assert.equal(undoMainnet().n, 6)
  assert.equal(built.audited, true)
  assert.match(built.words, /fifth layer is nothing/)
  assert.doesNotMatch(built.words, /Warning/)
  assert.match(built.words, /Undo does not remove/)
})
