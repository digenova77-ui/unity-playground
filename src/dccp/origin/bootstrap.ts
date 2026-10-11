/** The layout is written from the floor outward. The state appends. */

import { INDEX_STATEMENT } from '../index/statement.ts'
import { LAW } from '../law/floor.ts'
import { decisionGate } from '../law/symbiosis.ts'
import { purifyLeft } from '../trinity/standing.ts'
import { twoP5L, undoMainnet, writeMainnet } from './write-state.ts'

export function executeLayout(): {
  bill: false
  built: true
  now: 'append'
  reverses: false
  undo: false
  written: number
  audited: boolean
  layers: readonly string[]
  words: string
} {
  const gate = decisionGate()
  const left = purifyLeft()
  const layers = [
    LAW.join(', '),
    `decision gate: ${gate.path}`,
    'seal center empty, Earth not empty, universe not covered',
    `affinity +1 at ${left.next ?? 'nothing'}, hash ${left.hash}`,
    'the page that is already here',
    INDEX_STATEMENT,
  ]
  const writes = layers.map(line => writeMainnet(line))
  const shape = twoP5L()
  const kept = undoMainnet()
  const audited = writes.every(row => row.ok)
  return {
    bill: false,
    built: true,
    now: 'append',
    reverses: false,
    undo: false,
    written: kept.n,
    audited,
    layers,
    words: `The mainnet writer appends. The other pipe only audits that write. It stores nothing. 2P5L is ${shape.pipes} pipes and ${shape.layers.length} layers. The laws are ${shape.laws}. The fifth layer is ${shape.fifth}. ${layers.length} lines are the layout. ${kept.n} lines are kept. Undo does not remove them. Time does not reverse. The writer hash is ${kept.hash}. The map hash is ${left.hash}. The till stays closed.`,
  }
}