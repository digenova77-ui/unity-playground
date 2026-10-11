import assert from 'node:assert/strict'
import { test } from 'node:test'
import { purifyLeft, standing, STRIPPED } from './standing.ts'

test('after the framework is stripped, the mesh adds nothing', () => {
  const left = standing()
  assert.equal(left.more, 0)
  assert.ok(STRIPPED.includes('a framework'))
  assert.ok(STRIPPED.includes('a conscious cosmos as a fact'))
  assert.match(left.words, /next pass adds 0/)
  assert.match(left.words, /holds nothing/)
  assert.match(left.words, /That is what is deployed/)
  const step = purifyLeft()
  assert.equal(step.plus, 1)
  assert.equal(step.generated, 0)
  assert.equal(step.universe, false)
  assert.equal(step.hash, '630e4da1db1f6f96f2c075b876a8c04ebcdebbe81788f284e3e8cc1a7d12e712')
  assert.ok(step.unpaired > 0)
  assert.notEqual(step.next, null)
})
