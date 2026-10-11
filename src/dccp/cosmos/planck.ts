/** Two ends. The orders between them were not walked.
 * The top is the particle horizon, not an edge of spacetime.
 */

export const PLANCK_LENGTH = '1.616255×10⁻³⁵ m'
export const PLANCK_TIME = '5.391247×10⁻⁴⁴ s'

export function ladder(): { bottom: string; top: string; between: null } {
  return {
    bottom: `Planck length, CODATA 2022, ${PLANCK_LENGTH}`,
    top: 'particle horizon',
    between: null,
  }
}

export function physicalLink(): { between: null; coordinates: null; other: 'open' } {
  return { between: ladder().between, coordinates: null, other: 'open' }
}

/** Seven figures are written. A finer digit is not held. None of the orders was walked. */
export function figureAcuity(): { figures: 7; ordersWalked: 0; finer: false } {
  return { figures: 7, ordersWalked: 0, finer: false }
}

export function figureWords(): string {
  const row = figureAcuity()
  return `The finest grain written is ${row.figures} figures. The Planck length is ${PLANCK_LENGTH}. The Planck time is ${PLANCK_TIME}. The span to the particle horizon is about 61 orders, and ${row.ordersWalked} of them were walked. A finer order is not held. Sharpening past ${row.figures} figures would invent a digit. That is the maximum acuity. No root line has a coordinate on that span.`
}

export function physicalWords(): string {
  return `The physical connections to the logical world are the ones already on the trunk. The Planck length, ${PLANCK_LENGTH}, and the Planck time, ${PLANCK_TIME}, are held. They are the CODATA 2022 values. The orders from there to the particle horizon were not walked, so that gap hangs on a missing fact. The horizon is named and was not integrated. It is not an edge of spacetime. A dark pixel emits nothing. A stale reading is not shown. No root line has a Planck coordinate. All other physics is on the open joint. A further derivative is not held.`
}

export function planckWords(): string {
  return `The bottom is the Planck length, ${PLANCK_LENGTH}, and the Planck time, ${PLANCK_TIME}. Those are the CODATA 2022 values. The top that can be named is the particle horizon: the farthest a signal from the start of the expansion could have reached us. It is not an edge of spacetime. A usual result from the Planck 2018 parameters is about 46 billion light years. This page did not integrate that. From the bottom to that horizon is about 61 orders of length. None of those orders was walked. Nothing between them is held. Past the horizon is open.`
}
