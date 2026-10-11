/** Bleed is a frame or a poll that runs when nobody is looking, or when the battery is low.
 * The loop is not removed. A hidden page resumes when it is shown. Nothing is locked.
 * The phone's charger is not controlled.
 */

export interface Power {
  hidden: boolean
  charging: boolean | null
  level: number | null
}

export const GATE = 'The page draws while it is showing. A hidden page does not draw, and it resumes when it is shown. Below one fifth, and not charging, it draws every other frame. Their charger is not controlled. Nothing is locked.'

function sparing(power: Power): boolean {
  return power.charging === false && power.level !== null && power.level < 0.2
}

export function allowDraw(power: Power, frame: number): boolean {
  if (power.hidden) return false
  if (sparing(power)) return frame % 2 === 0
  return true
}

export function allowWake(power: Power, tick: number): boolean {
  if (power.hidden) return false
  if (sparing(power)) return tick % 4 === 0
  return true
}

export function pictureCost(coarse: boolean, presetRatio: number): { power: 'low-power' | 'high-performance'; pixelRatio: number } {
  if (!coarse) return { power: 'high-performance', pixelRatio: presetRatio }
  return { power: 'low-power', pixelRatio: Math.min(3, presetRatio) }
}
