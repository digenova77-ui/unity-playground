import assert from 'node:assert/strict'
import test from 'node:test'
import { layerWords, memoryAudit, openLayers } from './layers.ts'

test('a dual pipe grows only by a named layer, at one place', () => {
  const stack = openLayers()
  assert.equal(stack.count(), 3)
  assert.equal(stack.places(), 1)
  assert.equal('refused' in stack.add('', 'missing'), true)
  assert.equal(stack.count(), 3)
  const words = layerWords()
  assert.match(words, /makes four/)
  assert.match(words, /fifth layer is nothing/)
  assert.match(words, /1 place/)
  const audit = memoryAudit()
  assert.equal(audit.pipes, 2)
  assert.equal(audit.layers, 3)
  assert.equal(audit.places, 1)
  assert.equal(audit.fifth, 'nothing')
  assert.equal(audit.seedAt, -1)
  assert.equal(audit.moved, false)
  assert.equal(audit.nextPoint, null)
  assert.equal(audit.nextStep, 1)
})
