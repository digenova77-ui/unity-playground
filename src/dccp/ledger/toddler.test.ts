import assert from 'node:assert/strict'
import test from 'node:test'
import { approveThing, childHas, toddlerWords } from './toddler.ts'

test('a child cannot approve, and a grown-up can grant one thing', () => {
  const child = approveThing({ thing: 'blocks', consent: true, handle: 'unity:grown.up', by: 'child' })
  assert.equal(child.ok, false)
  const bare = approveThing({ thing: 'blocks', consent: true, handle: null, by: 'guardian' })
  assert.equal(bare.ok, false)
  const silent = approveThing({ thing: 'blocks', consent: false, handle: 'unity:grown.up', by: 'guardian' })
  assert.equal(silent.ok, false)
  const other = approveThing({ thing: 'a car', consent: true, handle: 'unity:grown.up', by: 'guardian' })
  assert.equal(other.ok, false)
  const yes = approveThing({ thing: 'blocks', consent: true, handle: 'unity:grown.up', by: 'guardian' })
  assert.equal(yes.ok, true)
  assert.deepEqual(childHas('unity:grown.up'), ['blocks'])
  assert.deepEqual(childHas(null), [])
  assert.match(toddlerWords('unity:grown.up'), /You have blocks/)
  assert.match(toddlerWords(null), /nothing yet/)
  assert.match(toddlerWords('unity:grown.up'), /cannot be bought/)
})
