/** A three-dimensional dual pipe grows by a named layer, at one crossing.
 * Drive, 2026-09-30: one pipe appends, the other reads and does not write.
 * Drive, 2P5L: two pipes, five layers. Four laws. The fifth layer is nothing.
 */

import { SEATS, lockstep } from '../law/floor.ts'
import { memoryLink } from '../law/memory.ts'
import { SEED_AT } from '../pipe/chain.ts'
import { DnaPool, machinePipe, strandNext } from './dna.ts'

export class LayeredPipes {
  private pool = new DnaPool()
  private names: string[] = []

  add(name: string, line: string): { layers: number; added: boolean; speech: string } | { refused: string } {
    if (!name.trim() || !line.trim()) return { refused: 'A layer needs a name and a line. Nothing was added.' }
    const data = new TextEncoder().encode(line)
    const kept = this.pool.store({ data, x: 0, y: 0, z: 0, type: 'LAYER', provenance: name }, machinePipe(data))
    if ('refused' in kept) return kept
    if (kept.duplicate) {
      return { layers: this.names.length, added: false, speech: `${name} is already a layer. It was not added again. ${this.names.length} layers sit at one place.` }
    }
    this.names.push(name)
    return { layers: this.names.length, added: true, speech: `${name} is layer ${this.names.length}. Both pipes named it once. ${this.names.length} layers sit at one place. The other pipe does not write.` }
  }

  count(): number {
    return this.names.length
  }

  places(): number {
    return new Set(this.pool.placed().flatMap(row => row.places.map(place => place.join()))).size
  }
}

export function openLayers(): LayeredPipes {
  const stack = new LayeredPipes()
  for (const seat of SEATS) {
    const pass = lockstep(seat)
    if (pass.ok) stack.add(seat.id, pass.line)
  }
  return stack
}

export function memoryAudit(): {
  pipes: 2
  layers: number
  places: number
  fifth: 'nothing'
  seedAt: typeof SEED_AT
  shortCap: number
  longCap: number
  moved: false
  nextPoint: null
  nextStep: 1 | null
  words: string
} {
  const stack = openLayers()
  const mem = memoryLink()
  const strand = strandNext('A')
  const nextStep = strand.broken ? null : strand.next
  return {
    pipes: 2,
    layers: stack.count(),
    places: stack.places(),
    fifth: 'nothing',
    seedAt: SEED_AT,
    shortCap: mem.short.cap,
    longCap: mem.long.cap,
    moved: false,
    nextPoint: null,
    nextStep,
    words: `Audit. Two pipes. ${stack.count()} named layers sit at ${stack.places()} place. The fifth layer is nothing, so it was not added. The seed is at ${SEED_AT}, under the floor, and it is not a memory place. Short memory holds ${mem.short.held} of ${mem.short.cap} and dies with the process. Long memory is this device, cap ${mem.long.cap}. A line is kept there: ${mem.long.survives}. Nothing was moved across the insula. One place gives no slope, so no derivative was taken. The next memory point was not written. When a strand holds, the next step is ${nextStep}. That step does not say what the next point contains. The octree is not in this file. The till is closed.`,
  }
}

export function layerWords(): string {
  const stack = openLayers()
  const evidence = SEATS[0]
  const pass = lockstep(evidence)
  const again = pass.ok ? stack.add(evidence.id, pass.line) : { added: true, layers: stack.count() }
  const grown = stack.add('named', 'A layer is added only when both pipes name it.')
  const added = 'added' in again && again.added === false && 'layers' in grown && grown.layers === 4
  if (!added) return 'A layer was written twice, or the stack did not grow by one named layer.'
  return `Grows by a named layer. 2026-09-30: two pipes, one appends, one does not write. 2P5L is two pipes and five layers. The fifth layer is nothing. Three rings first. A repeat is not a new layer. A named layer makes four. ${stack.count()} layers at ${stack.places()} place.`
}
