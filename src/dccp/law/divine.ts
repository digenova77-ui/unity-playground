/** No framework. Three rings, and each one is a different dimension.
 * They interlock where the three axes cross. The sequence is not a dimension.
 */

import { SEATS, lockstep } from './floor.ts'
import { ringWords } from './rings.ts'

export const RING_AXES = [
  { id: 'logic', axis: 'x' },
  { id: 'truth', axis: 'y' },
  { id: 'pragmatism', axis: 'z' },
] as const

export function interlock(): { x: number; y: number; z: number; speech: string } | { refused: string } {
  const closed = SEATS.map(lockstep)
  if (!closed.every(row => row.ok)) return { refused: 'A ring did not close. They do not interlock.' }
  return { x: 0, y: 0, z: 0, speech: ringWords() }
}

export function divine(): { rings: 3; speech: string } | { rings: 0; speech: string } {
  const point = interlock()
  if ('refused' in point) return { rings: 0, speech: point.refused }
  return { rings: 3, speech: point.speech }
}