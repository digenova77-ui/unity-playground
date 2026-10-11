import assert from 'node:assert/strict'
import test from 'node:test'
import { joint, jointWords, noteHost, perfectMirror } from './layer.ts'

test('only a host grant opens the joint', () => {
  assert.equal(joint('granted').open, true)
  assert.equal(joint('refused').open, false)
  assert.equal(joint('unasked').open, false)
  assert.equal(joint('granted', false).open, false)
  assert.equal(noteHost('refused').grant, 'refused')
  assert.match(jointWords(joint('unasked')), /does not grant a permission/)
  assert.match(jointWords(), /not fused/)
  for (const answer of ['granted', 'refused', 'unasked'] as const) {
    const row = perfectMirror(answer)
    assert.equal(row.shown, answer)
    assert.equal(row.affinity, 1)
    assert.equal(row.befriends, true)
    assert.equal(row.bound, false)
  }
})
