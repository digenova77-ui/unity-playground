import assert from 'node:assert/strict'
import test from 'node:test'
import { lay, layerWords, readLayer, saveLayer, type LayerStore } from './layer.ts'

test('the layer connects live public feeds and a repeat is one loop', () => {
  const first = lay([{ key: 'weather', state: 'LIVE' }, { key: 'iss', state: 'STALE' }], null)
  assert.deepEqual(first.live, ['weather'])
  const again = lay([{ key: 'weather', state: 'LIVE' }, { key: 'iss', state: 'STALE' }], first)
  assert.equal(again.loops, 1)
  assert.match(layerWords(again), /not a new fact/)
  const mem = new Map<string, string>()
  const store: LayerStore = { get: key => mem.get(key) ?? null, set: (key, value) => { mem.set(key, value) } }
  assert.equal(saveLayer(again, store), true)
  assert.equal(saveLayer(again, store), false)
  assert.equal(readLayer(store)?.loops, 1)
})
