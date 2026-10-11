import assert from 'node:assert/strict'
import test from 'node:test'
import { ROOT } from './root.ts'
import { nature, natureWords } from './nature.ts'

test('nature is the remainder and not a line of the root', () => {
  const row = nature()
  assert.equal(row.concept, 'nature')
  assert.equal(row.root, false)
  assert.equal(row.drinks, true)
  assert.equal(ROOT.length, 9)
  assert.equal(ROOT.some(line => /nature/i.test(line)), false)
  assert.match(natureWords(), /nine lines/)
  assert.match(natureWords(), /not a tenth line/)
})
