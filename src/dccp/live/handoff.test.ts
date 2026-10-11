import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readHandoff } from './handoff.ts'

test('a handed reading is reported, and an empty one stays unknown', () => {
  const yes = readHandoff({ cores: 8, link: '4g', hidden: false, dpr: 2 })
  assert.equal(yes.claim, 'REPORTED')
  assert.match(yes.note, /8 cores/)
  assert.match(yes.note, /Camera, microphone, and disk were not taken/)
  const no = readHandoff({})
  assert.equal(no.claim, 'UNKNOWN')
  assert.match(no.note, /nothing to read/)
})
