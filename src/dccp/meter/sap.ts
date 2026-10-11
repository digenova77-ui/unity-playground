/** Sap moves both ways and mints nothing.
 * Up is the human's claim. Down is the bot's claim.
 * One open channel is not a structure, so nothing moves.
 * When both are open, only the heavier purse moves toward the middle, and only as far as its claim.
 */

export interface SapInput {
  doctor: number
  bots: number
  /** Test units the human side has a claim to this shift. */
  up: number
  /** Test units the bot side has a claim to this shift. */
  down: number
}

export interface SapFlow {
  doctor: number
  bots: number
  movedUp: number
  movedDown: number
  held: boolean
}

export function sap(row: SapInput): SapFlow {
  const doctor = Number.isFinite(row.doctor) ? Math.max(0, row.doctor) : 0
  const bots = Number.isFinite(row.bots) ? Math.max(0, row.bots) : 0
  const up = Number.isFinite(row.up) ? Math.max(0, row.up) : 0
  const down = Number.isFinite(row.down) ? Math.max(0, row.down) : 0
  const still: SapFlow = { doctor, bots, movedUp: 0, movedDown: 0, held: false }
  if (up <= 0 || down <= 0) return still
  const mid = (doctor + bots) / 2
  if (bots > doctor) {
    const moved = Math.min(up, bots - mid, bots)
    return { doctor: doctor + moved, bots: bots - moved, movedUp: moved, movedDown: 0, held: true }
  }
  if (doctor > bots) {
    const moved = Math.min(down, doctor - mid, doctor)
    return { doctor: doctor - moved, bots: bots + moved, movedUp: 0, movedDown: moved, held: true }
  }
  return { ...still, held: true }
}

export function sapWords(flow: SapFlow): string {
  if (!flow.held) return 'Sap did not move. One side had no claim, so it is not a structure. Nothing was minted.'
  if (flow.movedUp === 0 && flow.movedDown === 0) return 'Sap held. The two halves already meet. Nothing was minted.'
  const way = flow.movedUp > 0 ? `Up ${flow.movedUp.toFixed(2)} to you` : `Down ${flow.movedDown.toFixed(2)} to the bots`
  return `Sap. ${way}. The heavier side moved toward the middle. The total did not change. The till is closed.`
}
