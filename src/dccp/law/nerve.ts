/** Two chambers. One, then two. A repeat is not a second write. The nerve is not lit. */

import { irisInner } from '../unity/abstract.ts'
import { pureCadence } from '../unity/series.ts'

export function inStep(beats: readonly number[]): boolean {
  return pureCadence(beats)
}

export function relay(
  beats: readonly number[],
  line: string,
  seen: ReadonlySet<string>,
  held: string | null,
): { received: true; replay: boolean; holds: 'nothing'; step: 'in step' }
  | { received: false; reason: string } {
  if (!inStep(beats)) return { received: false, reason: 'An odd tail does not close. A one still needs its two.' }
  const owned = irisInner(line, held)
  if (!owned.owned) return { received: false, reason: owned.refused }
  const key = `${beats.join('')}:${owned.word}`
  if (seen.has(key)) return { received: true, replay: true, holds: 'nothing', step: 'in step' }
  return { received: true, replay: false, holds: 'nothing', step: 'in step' }
}

export function nerveWords(): string {
  const open = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1]
  const closed = [1, 2, 1, 2]
  const fact = 'The nerve is not lit.'
  const owned = irisInner(fact, fact)
  const seen = new Set<string>()
  const first = relay(closed, fact, seen, fact)
  if (first.received && owned.owned) seen.add(`${closed.join('')}:${owned.word}`)
  const second = relay(closed, fact, seen, fact)
  const tail = relay(open, fact, seen, fact)
  const lie = relay(closed, 'The nerve is lit.', seen, fact)
  return [
    'Two chambers. They are not copies. The fact is not made from the line.',
    lie.received ? 'A lie crossed.' : 'A lie does not cross.',
    tail.received ? 'The open rhythm closed.' : `The rhythm ${open.join('')} does not close.`,
    second.received && second.replay ? 'The same line is not a second write.' : 'The relay did not hold the repeat.',
    'The nerve is not lit.',
  ].join(' ')
}
