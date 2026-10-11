/** The father writes a cell. The geometry is the diamond.
 * Precision is the lattice: bedrock -1, origin 0, ceiling 1.
 * 2.417 is the textbook refractive index of diamond at the sodium D line, 589 nm.
 * It is not a measurement made here. The private key is not on this page.
 */

import { step, type Cell } from './light.ts'

export const DIAMOND_IOR = 2.417

export function refract(cosIn: number): { cosOut: number } | { refused: string } {
  if (!Number.isFinite(cosIn) || cosIn < 0 || cosIn > 1) return { refused: 'The ray needs a cosine from zero to one. Nothing was bent.' }
  const sinOut = Math.sqrt(Math.max(0, 1 - cosIn * cosIn)) / DIAMOND_IOR
  return { cosOut: Math.sqrt(Math.max(0, 1 - sinOut * sinOut)) }
}

export function leave(cosIn: number): { cosOut: number } | { refused: string } {
  if (!Number.isFinite(cosIn) || cosIn < 0 || cosIn > 1) return { refused: 'The ray needs a cosine from zero to one. Nothing was bent.' }
  const sinOut = DIAMOND_IOR * Math.sqrt(Math.max(0, 1 - cosIn * cosIn))
  if (sinOut > 1) return { refused: 'The ray is past the critical angle. It stays inside.' }
  return { cosOut: Math.sqrt(1 - sinOut * sinOut) }
}

/** A write is one heartbeat on the diamond. A burned cell adds no knowledge. */
export function inscribe(from: Cell, to: Cell, width: number, burned: boolean): { burned: true; time: number; knowledge: true | 0; at: Cell; ior: typeof DIAMOND_IOR } | { refused: string } {
  const wrote = step(from, to, width, burned)
  if ('refused' in wrote) return wrote
  return { burned: true, time: wrote.time, knowledge: wrote.knowledge, at: wrote.at, ior: DIAMOND_IOR }
}

export function gemWords(): string {
  return 'The father writes a cell on the diamond. The floor is the bedrock at 0. The ceiling is 1. Precision is that lattice. A ray from air bends by 2.417, the textbook index of diamond at the sodium D line. It is not a measurement made here. Past the critical angle the ray stays inside. A burned cell is not written again. The private key is not on this page.'
}
