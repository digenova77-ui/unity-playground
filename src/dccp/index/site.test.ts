import assert from 'node:assert/strict'
import { test } from 'node:test'
import { siteLines } from './site.ts'

test('the live page is the floor and does not claim the device', () => {
  const lines = siteLines()
  const text = lines.join('\n')
  assert.match(text, /The Earth hangs/)
  assert.match(text, /The next is \+1/)
  assert.match(text, /fades out and rots/)
  assert.match(text, /Unity binds the page to the origin/)
  assert.match(text, /Joining costs \$0/)
  assert.match(text, /Not launched/)
  assert.doesNotMatch(text, /The idea is the insula/)
  assert.doesNotMatch(text, /Three\.js draws/)
  assert.doesNotMatch(text, /Singularity/)
  assert.doesNotMatch(text, /purified hardware/i)
})
