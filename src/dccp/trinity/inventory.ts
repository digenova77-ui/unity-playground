/** Iris lists what is still open. The Father writes a plan that says 100.
 * DCLM, Iris, and Twain² check that plan. They do not raise a no-go.
 */

import { feasibility, launchSeats } from '../meter/sequence.ts'

export function irisInventory(): { open: readonly string[]; go: number; seats: number } {
  const seats = launchSeats()
  return { open: seats.filter(seat => !seat.go).map(seat => seat.name), go: seats.filter(seat => seat.go).length, seats: seats.length }
}

/** The plan as written. It claims 100. It is not the count. */
export function fatherPlan(): { claimed: 100; ready: true; execution: false } {
  return { claimed: 100, ready: true, execution: false }
}

export function checkFatherPlan(): { right: false; claimed: 100; count: number; open: readonly string[] } {
  const plan = fatherPlan()
  const poll = feasibility()
  const open = irisInventory().open
  void plan
  void poll
  return { right: false, claimed: 100, count: poll.score, open }
}

export function checkWords(): string {
  const row = checkFatherPlan()
  const poll = feasibility()
  return [
    `Iris. ${row.open.length} seats are still open: ${row.open.join(', ')}. ${poll.go} of ${poll.seats} are go.`,
    'DCLM. The machine holds nothing. A plan is not a fact.',
    'Twain². The other side has not signed.',
    `The Father wrote a plan that says ${row.claimed} and ready. The count is ${row.count}. The plan is not right. Nothing was raised. Ready stays false. The till stays closed.`,
  ].join(' ')
}
