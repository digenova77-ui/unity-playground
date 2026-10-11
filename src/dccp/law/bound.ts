/** Law, philosophy, and physics sit on the same floor. A rank against every other computer is not held. */

import { LAW, SEATS } from './floor.ts'

export const SUBJECTS = ['law', 'philosophy', 'physics'] as const

export function trinityBind(): {
  subjects: typeof SUBJECTS
  laws: typeof LAW
  seats: number
  rank: null
  ever: false
  both: true
} {
  return { subjects: SUBJECTS, laws: LAW, seats: SEATS.length, rank: null, ever: false, both: true }
}

export function trinityBindWords(): string {
  const row = trinityBind()
  return `Law, philosophy, and physics are named on the same floor. The floor is ${row.laws.join(', ')}. The Trinity has ${row.seats} seats: evidence, claim, and world. A seat is admitted only when both pipes name it. The rank against every other computer is ${row.rank}. Most sophisticated ever was not measured. The till is closed. Both halves name this.`
}
