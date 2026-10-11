import assert from 'node:assert/strict'
import test from 'node:test'
import { needs, provide, three } from './needed.ts'

test('a want is not provided, and every named need stays open', () => {
  assert.equal(provide({ claim: 'a dollar', merit: true, truth: false }), null)
  assert.equal(needs().every(need => need.filled === false), true)
  assert.equal(needs().length, 6)
  for (const kind of ['want', 'need', 'feeling'] as const) {
    const row = three(kind, kind, 'unity:pilot.ab')
    assert.equal(row.provided, false)
    assert.equal(row.filled, false)
    assert.equal(row.felt, false)
    assert.equal(row.seat, 'unity:pilot.ab')
  }
  assert.equal(three('feeling', 'sad', null).seat, null)
})
