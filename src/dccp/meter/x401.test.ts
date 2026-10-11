import assert from 'node:assert/strict'
import test from 'node:test'
import { x401Ask } from './x401.ts'

test('x401 asks who, and a handle is not the proof', () => {
  const open = x401Ask(null)
  assert.equal(open.status, 401)
  assert.equal(open.credential, null)
  assert.equal(open.presented, false)
  const seated = x401Ask('unity:pilot.abc')
  assert.equal(seated.handle, 'unity:pilot.abc')
  assert.equal(seated.presented, false)
  assert.match(seated.words, /not the credential/)
})
