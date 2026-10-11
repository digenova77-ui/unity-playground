import assert from 'node:assert/strict'
import { test } from 'node:test'
import { whyBeside } from './why.ts'

test('a held landing keeps its why, and an unnamed minute does not grow one', () => {
  const line = whyBeside('The Eagle is at Tranquility Base.')
  assert.match(line ?? '', /Claim REPORTED/)
  assert.equal(whyBeside('A minute with no name.'), null)
})
