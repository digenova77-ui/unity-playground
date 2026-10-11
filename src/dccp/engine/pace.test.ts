import assert from 'node:assert/strict'
import { test } from 'node:test'
import { geniusTerms, nextPace, webglCeiling } from './pace.ts'

test('the next frame stays inside the draw, and nothing past WebGL is attached', () => {
  const ceiling = webglCeiling()
  assert.equal(ceiling.api, 'webgl2')
  assert.equal(ceiling.bloom, false)
  assert.equal(ceiling.past, null)
  const next = nextPace()
  assert.equal(next.step, 1)
  assert.equal(next.guess, 'same draw')
  assert.equal(next.past, false)
  assert.equal(next.both, true)
  const genius = geniusTerms()
  assert.equal(genius.score, null)
  assert.equal(genius.title, false)
  assert.equal(genius.both, true)
  assert.equal(genius.compute, 'same draw')
})
