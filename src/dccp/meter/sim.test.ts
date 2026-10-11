import assert from 'node:assert/strict'
import test from 'node:test'
import { keyEconomySim, mapFind } from './sim.ts'

test('more keys book more, and a known key is not minted again', () => {
  const sim = keyEconomySim()
  assert.ok(sim.five > sim.one)
  assert.ok(sim.mixed < sim.five)
  assert.match(sim.speech, /not applied/)
  assert.match(sim.speech, /stays 5/)
  const hit = mapFind('find the key schematic', [{ id: 'bot-1', claim: 'schematic' }])
  assert.match(hit, /fast part/)
  assert.match(hit, /not minted/)
  const miss = mapFind('find the key passport', [{ id: 'bot-1', claim: 'schematic' }])
  assert.match(miss, /stays slow/)
})
