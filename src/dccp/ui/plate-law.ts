/** What a plate must be to exist in the world. A screen pin is not a place. */

export const PLATE_LAW = [
  'A plate exists only at a world anchor. A screen pin is not a place.',
  'Macro, then logic, then physics, in that order, on the same object.',
  'A number is shown only when a named feed returned it. A miss is a hole.',
  'A schedule is a departure that feed named. A missing board stays missing.',
] as const

const ORDER = ['macro', 'logic', 'physics'] as const

/** True only when the plate is anchored and the three layers sit in reading order. */
export function plateMaySeat(anchored: boolean, layers: readonly string[]): boolean {
  if (!anchored || layers.length < ORDER.length) return false
  const at = ORDER.map(key => layers.indexOf(key))
  return at.every(i => i >= 0) && at[0] < at[1] && at[1] < at[2]
}
