import assert from 'node:assert/strict'
import test from 'node:test'
import { ease } from './ease.ts'

test('a child gets one small sentence and the grown-up holds the id', () => {
  const row = ease()
  assert.match(row.child, /grown-up says yes/)
  assert.doesNotMatch(row.child, /Unity ID/)
  assert.match(row.guardian, /holds the Unity ID/)
  assert.match(row.guardian, /cannot check/)
  assert.match(row.guardian, /cannot be bought/)
})
