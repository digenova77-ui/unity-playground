import assert from 'node:assert/strict'
import { test } from 'node:test'
import { elevate, elevateWords } from './elevate.ts'

test('the four laws hang on every name and enact nothing', () => {
  const row = elevate(['Canada', 'Canada', 'health', ''])
  assert.equal(row.hung, 2)
  assert.equal(row.enacted, 0)
  assert.equal(row.legislature, null)
  assert.equal(row.laws.length, 4)
  assert.match(elevateWords(['Ontario']), /none was amended/)
})
