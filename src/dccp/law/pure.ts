/** Three logics. Each one returns only what it holds. Nothing is added. */

import { twoOptions } from './matrix.ts'
import { planeShift, type Look } from '../ui/depth.ts'

export const LEGAL = [
  'This room holds nothing.',
  'Joining costs nothing.',
  'The till is closed.',
  'There is no employee and no chief executive inside the playground.',
  'A title outside this room is not rewritten here.',
  'A title does not open a child\'s record.',
] as const

export function pureThink(decision: number, choice: number): 2 | null {
  return twoOptions(decision, choice)
}

export function pureLegal(text: string): string | null {
  const t = text.toLowerCase()
  if (/\bno ownership\b/.test(t)) return null
  if (/\bbuy\b/.test(t) && /\bchild/.test(t)) return null
  const hit = LEGAL.find(line => t.includes(line.replace(/\.$/, '').toLowerCase()))
  return hit ?? null
}

const MEASURE = /-?\d+(?:\.\d+)?\s*(?:km|m|kg|s|°|deg)\b/i

export function purePhysics(text: string): string | null {
  if (/\d/.test(text) && !MEASURE.test(text)) return null
  const found = text.match(MEASURE)
  return found ? found[0].replace(/\s+/g, ' ') : null
}

export function pureMove(look: Look, depth: number): Look {
  return planeShift(look, depth)
}

export function pureWords(): string {
  return `Thinking: one decision plus one choice is two options. Nothing is added. Legal: ${LEGAL.join(' ')} Physics: the move is the look times the depth. A number with no unit is not physics. Nothing is invented.`
}
