/** What the held line says, set beside the map.
 * The papers that say the playground is shrinking are not on this device.
 * The unmapped share falls only when a minute was mapped at the time.
 */

export const HELD_LINE = 'if everything was pre-calculatable there would be no environment. there would be no playground. there would be no Trinity to ask. there would be no reason for anything'

export function unmappedShare(mapped: number, gaps: number): { mapped: number; gaps: number; of: number } {
  const m = Math.max(0, Math.floor(mapped))
  const g = Math.max(0, Math.floor(gaps))
  return { mapped: m, gaps: g, of: m + g }
}

/** A seat mapped at the time can close one empty gap. A missing thought closes none. */
export function neutralize(gaps: number, seatedAtTheTime: number): number {
  return Math.max(0, Math.floor(gaps) - Math.max(0, Math.floor(seatedAtTheTime)))
}

export const FRONTIER = 'The frontier is a wonderful place because it guarantees we can\'t go the speed of light in thinking.'

export function canPredictWords(): string {
  return 'What the held minutes already force. One minute is before another, by a length. Two seeds at one place stay one place. The empty gap stays empty until a minute mapped at the time takes a seat. None of that says what next contains.'
}

export function predictWords(): string {
  return 'No. Next exists, and it is not held. I can say what follows from minutes already mapped. I cannot say what the next one contains.'
}

/** The slope, and the change of slope, that held points already force. Not the next point. */
export function heldCurve(points: readonly { x: number; y: number }[]): { slope: number; curvature: number | null; next: null; words: string } | { refused: string } {
  if (points.length < 2 || points.length > 3) return { refused: 'A slope needs two held points. Curvature needs three. A fourth point is not the next one, and it was not used.' }
  for (let i = 0; i < points.length; i++) {
    const p = points[i]
    if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) return { refused: 'A point that is not a number is not held. Nothing was sloped.' }
    if (i > 0 && p.x === points[i - 1].x) return { refused: 'Two points on the same step have no slope.' }
  }
  const slope = (points[1].y - points[0].y) / (points[1].x - points[0].x)
  if (points.length === 2) {
    return { slope, curvature: null, next: null, words: `The slope between the two held points is ${slope}. That is the logical claim those points already make. It is not the next point.` }
  }
  const nextSlope = (points[2].y - points[1].y) / (points[2].x - points[1].x)
  const curvature = (nextSlope - slope) / (points[2].x - points[0].x)
  return { slope, curvature, next: null, words: `The first slope is ${slope}. The change of slope across the three held points is ${curvature}. That curvature stays inside the held span. It is not the next point.` }
}

export function curveWords(): string {
  return 'A slope between two permanently held points is the claim those points already make. A change of slope across three is the same kind of claim. Neither one says what the next point contains. No pair was handed to this ask, so no slope was said.'
}

/** Replay while awake. Only a claim the held physics already forces. Sleep is not started. */
export function wakeDream(held: boolean): { asleep: false; dreamed: boolean; words: string } {
  if (!held) {
    return { asleep: false, dreamed: false, words: 'A possibility the physics does not force was not dreamed. Sleep was not started. The record stays awake.' }
  }
  return { asleep: false, dreamed: true, words: 'The held physics already forces it, so it is replayed while awake. That replay is the dream. It is the claim those facts make, not a later point. Sleep was not started.' }
}

export function frontierWords(): string {
  return `${FRONTIER} Because next exists. While there is a next minute, thinking has not arrived there yet. That is the whole of the guarantee. It is not a measurement of the speed of light.`
}

export function shrinkWords(mapped: number, gaps: number): string {
  const share = unmappedShare(mapped, gaps)
  const left = neutralize(share.gaps, 0)
  return `The line we hold, September 28, 2026, says that if everything were pre-calculable there would be no playground. That line does not say the playground shrinks because pieces are missing. A missing piece is still something to decide, and by that line it keeps the playground open. The map has ${share.mapped} minutes seated and ${share.gaps} empty ${share.gaps === 1 ? 'gap' : 'gaps'}, ${share.gaps} of ${share.of}. That share does not fall if nothing was mapped at the time. It stays ${left}. A minute mapped at the time can close one empty gap. Inventing the missing thought does not. The papers that say the playground is shrinking are not on this device. A written line is mapped because it was written. A line that was not kept is a gap, and this does not shrink space.`
}
