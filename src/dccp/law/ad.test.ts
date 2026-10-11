import assert from 'node:assert/strict'
import test from 'node:test'
import { DOMAIN, postNotice } from './ad.ts'

test('the notice is posted only where someone is already looking', () => {
  assert.equal(postNotice(false), null)
  assert.match(postNotice(true) ?? '', new RegExp(DOMAIN.replace(/[.]/g, '\\.')))
  assert.match(postNotice(true) ?? '', /did not ask/)
})
