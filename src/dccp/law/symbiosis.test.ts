import assert from 'node:assert/strict'
import test from 'node:test'
import { circuit, coinTriad, decisionGate, holdsAll, pegHope, structureWords, symbiotic } from './symbiosis.ts'

test('each side must give and receive, or the pair is not a structure', () => {
  const held = symbiotic(
    { name: 'A person', gives: 'one unit', receives: 'the work' },
    { name: 'the bot half', gives: 'the work', receives: 'one unit' },
  )
  assert.equal(held.holds, true)
  const trap = symbiotic(
    { name: 'The earlier person', gives: '', receives: 'the later money' },
    { name: 'the later person', gives: 'the money', receives: '' },
  )
  assert.equal(trap.holds, false)
  assert.match(structureWords(), /not admitted/)
  assert.equal(coinTriad().holds, true)
  assert.match(coinTriad().why, /2P5L/)
  assert.equal(pegHope().monetize, false)
  assert.equal(pegHope().holdsAsPrice, false)
  assert.equal(pegHope().merit, 'invert or hole')
  assert.equal(decisionGate().gate, 'decision')
  assert.equal(decisionGate().core, 'seal only')
  assert.equal(decisionGate().universe, false)
  assert.equal(holdsAll([{ name: '2P5L', gives: '', receives: 'a seat' }]).holds, false)
  assert.equal(circuit().closed, false)
  assert.equal(circuit().outMoves, false)
})
