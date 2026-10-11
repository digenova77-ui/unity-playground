import assert from 'node:assert/strict'
import test from 'node:test'
import { DWELL_MS, freshKitchen, kitchenWords, MOTION, stepKitchen } from './kitchen.ts'

test('movement drops the frame, and a look happens only after the room stays quiet', () => {
  let watch = freshKitchen()
  watch = stepKitchen(watch, MOTION, 500, 't1')
  assert.equal(watch.state, 'in-use')
  assert.equal(watch.drops, 1)
  assert.equal(watch.looks, 0)
  watch = stepKitchen(watch, 0, DWELL_MS - 1, 't2')
  assert.equal(watch.state, 'in-use')
  assert.equal(watch.looks, 0)
  watch = stepKitchen(watch, 0, 1, 't3')
  assert.equal(watch.state, 'empty')
  assert.equal(watch.looks, 1)
  watch = stepKitchen(watch, 0, 500, 't4')
  assert.equal(watch.looks, 1)
  watch = stepKitchen(watch, 0.2, 500, 't5')
  assert.equal(watch.state, 'in-use')
  assert.equal(watch.log[0]?.state, 'in-use')
  assert.match(kitchenWords(watch, true), /does not know/)
  assert.match(kitchenWords(freshKitchen(), false), /not stored/)
})
