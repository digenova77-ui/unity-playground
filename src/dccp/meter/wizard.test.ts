import assert from 'node:assert/strict'
import test from 'node:test'
import { beyondKnown, correlated, decisionGrain, fuseKeys, mapKeys, mapThought, potSpace, projectSpan, sameThreads, wizardWords } from './wizard.ts'

const held = [
  { id: 'schematic', claim: 'schematic' },
  { id: 'mesh', claim: 'mesh' },
]

test('fifty to the fiftieth is refused, and the named pots are two to the fiftieth minus one', () => {
  const space = potSpace()
  assert.equal('named' in space && space.named, '1125899906842623')
  assert.equal('refused' in space && space.refused, (50n ** 50n).toString())
  assert.equal('minted' in space && space.minted, 0)
  assert.equal('pool' in space && space.pool, 1)
  assert.equal('slots' in space && space.slots, 5)
  assert.match('speech' in space ? space.speech : '', /It is refused/)
  assert.equal('refused' in potSpace(0), true)
})

test('a thought maps onto held keys, and a fusion costs more for a shorter instruction', () => {
  assert.equal(mapThought('a passport office', held).length, 0)
  assert.deepEqual(mapThought('the schematic on the mesh', held).map(key => key.id), ['schematic', 'mesh'])
  const one = fuseKeys(['schematic'], held)
  assert.equal('refused' in one, true)
  const fused = fuseKeys(['schematic', 'mesh'], held)
  assert.equal('cost' in fused && fused.cost, 2)
  assert.equal('instruction' in fused && fused.instruction, 'Hold schematic and mesh.')
  assert.equal('size' in fused && 'complexity' in fused && correlated(fused.size, fused.complexity, fused.cost), true)
  assert.equal(correlated(2, 1, 3), false)
  const past = beyondKnown(2, 1)
  assert.equal('modeled' in past && past.known, 2)
  assert.equal('modeled' in past && past.modeled, 3)
  assert.match('speech' in past ? past.speech : '', /not a settled worth/)
  const open = projectSpan(1, 1)
  assert.equal('next' in open && open.next, 2)
  assert.equal('completion' in open && open.completion, null)
  const full = projectSpan(1, 1, 4, 2)
  assert.equal('completion' in full && full.completion, 8)
  assert.equal('remaining' in full && full.remaining, 7)
  assert.equal('refused' in projectSpan(2, 1, 1, 1), true)
  assert.match(decisionGrain(), /effort inside it is not a decision/)
  const repeated = sameThreads(100000000)
  assert.equal('suppressed' in repeated && repeated.suppressed, 99999999)
  assert.equal('decisions' in repeated && repeated.decisions, 1)
  assert.match('speech' in repeated ? repeated.speech : '', /seconds saved are not named/)
  assert.equal('refused' in sameThreads(1.5), true)
  assert.deepEqual('id' in fused ? mapKeys([fused]) : [], [
    { from: 'schematic', to: 'schematic+mesh' },
    { from: 'mesh', to: 'schematic+mesh' },
  ])
  assert.match(wizardWords('a passport office', held), /Nothing was mapped/)
})
