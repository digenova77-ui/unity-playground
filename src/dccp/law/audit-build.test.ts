import assert from 'node:assert/strict'
import test from 'node:test'
import { auditBuild } from './audit-build.ts'

test('the build audit holds the closed rules and leaves the holes open', () => {
  const a = auditBuild()
  assert.equal(a.holds.length, 6)
  assert.ok(a.holes.length >= 2)
  assert.match(a.holes.join(' '), /till is closed/)
  assert.match(a.holes.join(' '), /host credential/)
})
