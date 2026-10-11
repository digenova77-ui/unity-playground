import assert from 'node:assert/strict'
import test from 'node:test'
import { welcomeFor } from './splash.ts'

test('every watcher gets the same welcome', () => {
  assert.equal(welcomeFor(), welcomeFor())
  assert.match(welcomeFor(), /Truth prevails/)
  assert.match(welcomeFor(), /not rewritten/)
  assert.doesNotMatch(welcomeFor(), /no ownership/i)
})
