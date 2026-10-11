/** The scale is ten. The picture resolves one order inside the step. */

export function magnitude(step: number): number | null {
  if (!Number.isInteger(step) || step < 0 || step > 4) return null
  return 10 ** step
}

export function sight(step: number): { radiusDeg: number; names: number } | null {
  const span = magnitude(step)
  if (span === null) return null
  return { radiusDeg: Math.min(40, 0.4 * span), names: step <= 1 ? 8 : 4 }
}

/** A pixel at or under this emits nothing. That is the last order an OLED has. */
export const OLED_FLOOR = 0.02

export function emits(luma: number): boolean {
  return luma > OLED_FLOOR
}

export const TIER_STEP = { street: 0, civil: 1, cloud: 2, orbit: 3, cosmic: 4 } as const

export function spirit(step: number): { force: 0; invented: 0; open: true } | null {
  if (magnitude(step) === null) return null
  return { force: 0, invented: 0, open: true }
}

export function spiritWords(): string {
  return 'Spiritual acuity is not a brighter picture and not a louder voice. At every step, force is zero and a missing fact stays open. Nothing is invented to fill it. Past that there is no further step.'
}

export function acuityWords(): string {
  return 'The scale is ten. Each step out is ten times the one inside it. The picture resolves one order inside that step. At the person, names are taken from 0.4 degrees, up to eight. The panel is used up to three layout pixels, and no further. The hologram keeps a dark pixel off. That is the last order. Past a pixel that emits nothing, there is no further step. The Planck length and time are written to seven figures. The span of about 61 orders was not walked, and a finer digit is not held. The sound is not ten times louder. A tap stays 12 milliseconds. Nothing past the record is drawn.'
}
