import assert from 'node:assert/strict'
import test from 'node:test'
import { collapse } from './rings.ts'

test('the balanced point collapses, and a weak one is not forced', () => {
  assert.deepEqual(collapse([[0.9, 0.8, 0.2], [0.3, 0.4, 0.9], [0.7, 0.7, 0.7], [0.1, 0.1, 0.1]]), [0.7, 0.7, 0.7])
  assert.equal(collapse([[0.1, 0.1, 0.1]], 0.5), null)
})
