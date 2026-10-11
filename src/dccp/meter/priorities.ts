/** Fifty real-world jobs for a bot, written and loaded, not running.
 * A cut job already has a path on this page. A planned job is only this line.
 * Opening a gate does not start them. Every launch seat has to be go, the till
 * stays a separate question, and a bot still has to be signed and audited.
 */

import { launchSeats } from './sequence.ts'

export type Hold = 'assets' | 'host' | 'signature' | 'unity' | 'audit'

export interface BotJob {
  n: number
  job: string
  cut: boolean
  hold: Hold
}

export const BOT_JOBS: readonly BotJob[] = [
  { n: 1, job: 'Sign a bot Unity ID before any act outside this page. The audit has no off switch.', cut: true, hold: 'unity' },
  { n: 2, job: 'Read the launch poll and refuse to call a partial count ready.', cut: true, hold: 'signature' },
  { n: 3, job: 'Leave the till closed. A test unit is not a dollar and is not spent.', cut: true, hold: 'assets' },
  { n: 4, job: 'Refuse a private key, a card charge, a domain renewal, and a watch of the phone.', cut: true, hold: 'host' },
  { n: 5, job: 'Refuse a child roster and any dark-ledger record offered for sale.', cut: true, hold: 'audit' },
  { n: 6, job: 'Leave a third-party bot in its own sandbox unless that bot signs.', cut: true, hold: 'unity' },
  { n: 7, job: 'Run two work slots on this page. A finished slot takes the next waiting line. Do not leave the page.', cut: true, hold: 'host' },
  { n: 8, job: 'Index Belleville streets, corners, and addresses that are already in the held index. Do not invent a street.', cut: true, hold: 'host' },
  { n: 9, job: 'Call a place confirmed only when this device is there and a person taps it.', cut: true, hold: 'host' },
  { n: 10, job: 'Cite a Wikipedia page for a place with no telemetry. Call it a cite, not a measurement.', cut: true, hold: 'host' },
  { n: 11, job: 'Read a GameSheet row that was already fetched. Do not write a score that was not on that row.', cut: true, hold: 'host' },
  { n: 12, job: 'Speak a Hockey Canada conduct line only from the page that was held.', cut: true, hold: 'host' },
  { n: 13, job: 'Name an Ontario hockey branch only when that name is already held.', cut: true, hold: 'host' },
  { n: 14, job: 'Keep a nutrition diary on this device. Do not open the camera to fill it.', cut: true, hold: 'host' },
  { n: 15, job: 'Draw a classroom only from counts and names the bound seat supplied.', cut: true, hold: 'unity' },
  { n: 16, job: 'Watch one public close-approach row while this page is open. Do not steer a craft.', cut: true, hold: 'host' },
  { n: 17, job: 'Keep one ICD stem that was checked. Do not download the catalog.', cut: true, hold: 'host' },
  { n: 18, job: 'Name a Messier object that is in the table. Do not add a star.', cut: true, hold: 'host' },
  { n: 19, job: 'Pay a new key only when two sources agree and the key is not already held. A feeling pays nothing.', cut: true, hold: 'audit' },
  { n: 20, job: 'Append a writer line once. The audit recomputes the hash and stores nothing.', cut: true, hold: 'signature' },
  { n: 21, job: 'Report a purity hole as a hole. Do not fill it with a number.', cut: true, hold: 'audit' },
  { n: 22, job: 'Relay a reading to this seat only. Do not show another seat’s swarm.', cut: true, hold: 'unity' },
  { n: 23, job: 'When a person hires a bot, offer one body job back. Do not read a sensor to do it.', cut: true, hold: 'host' },
  { n: 24, job: 'Tell an empty kitchen from one in use while the page is open. Drop an occupied frame. Keep no picture.', cut: true, hold: 'host' },
  { n: 25, job: 'Draft a room only when two series on this device move together.', cut: true, hold: 'host' },
  { n: 26, job: 'Draw a hockey system that is already written, on the board. Do not call it a live game.', cut: true, hold: 'host' },
  { n: 27, job: 'List the positional types that are written. Do not scout a child.', cut: true, hold: 'audit' },
  { n: 28, job: 'Show the credit pool as seated and unpaid until the first shift on this seat.', cut: true, hold: 'assets' },
  { n: 29, job: 'Leave the outside connector inert unless a person turns that bridge on.', cut: true, hold: 'host' },
  { n: 30, job: 'Speak the four laws and stop. Do not add a fifth law. The fifth layer is nothing.', cut: true, hold: 'audit' },
  { n: 31, job: 'Read a municipal transit table only after a public file is supplied. Do not invent a bus.', cut: false, hold: 'host' },
  { n: 32, job: 'Read an air or rail table the same way. No feed is bound.', cut: false, hold: 'host' },
  { n: 33, job: 'Read a local public news item only when its text is supplied. Do not subscribe a person.', cut: false, hold: 'host' },
  { n: 34, job: 'Read a public radio schedule only from a supplied table.', cut: false, hold: 'host' },
  { n: 35, job: 'Fill a country card only from a row already loaded. A blank country stays blank.', cut: false, hold: 'host' },
  { n: 36, job: 'Do not open street view. That grant is not on this page.', cut: false, hold: 'host' },
  { n: 37, job: 'Leave weather, grid, and air blank until a feed answers with a number.', cut: false, hold: 'host' },
  { n: 38, job: 'Map one public food-price row. Do not claim a distribution system.', cut: false, hold: 'assets' },
  { n: 39, job: 'Note an energy reading only when a public number was supplied.', cut: false, hold: 'assets' },
  { n: 40, job: 'List a clinic from a public name in one city. Do not book a patient.', cut: false, hold: 'audit' },
  { n: 41, job: 'Name a fire or police district from a public page. Do not dispatch.', cut: false, hold: 'audit' },
  { n: 42, job: 'List a public company filing that was supplied. Do not open an account.', cut: false, hold: 'assets' },
  { n: 43, job: 'Hold intersection identifiers that are already in the index. Do not mint one from a guess.', cut: false, hold: 'host' },
  { n: 44, job: 'Build a course outline only from text the seat supplied.', cut: false, hold: 'unity' },
  { n: 45, job: 'Compare two public box scores. Do not buy a database.', cut: false, hold: 'assets' },
  { n: 46, job: 'Keep a historical minute only when two pages agree. One page stays one page.', cut: false, hold: 'audit' },
  { n: 47, job: 'When a structure is no longer needed, drop the body and keep the proof hash.', cut: true, hold: 'audit' },
  { n: 48, job: 'Watch one public asteroid or comet row. One catalog line is not a new key.', cut: true, hold: 'host' },
  { n: 49, job: 'After every launch seat is go, take one public job, write the result, and do not undo it.', cut: false, hold: 'signature' },
  { n: 50, job: 'Stop if the audit row cannot be written. No act without a row.', cut: true, hold: 'audit' },
]

export function priorityBoard(): {
  count: 50
  deployed: true
  running: false
  till: 'closed'
  held: string[]
  cut: number
  planned: number
  jobs: readonly BotJob[]
} {
  const held = launchSeats().filter(seat => !seat.go).map(seat => seat.name)
  const cut = BOT_JOBS.filter(job => job.cut).length
  return {
    count: 50,
    deployed: true,
    running: false,
    till: 'closed',
    held,
    cut,
    planned: BOT_JOBS.length - cut,
    jobs: BOT_JOBS,
  }
}

export function priorityWords(): string {
  const board = priorityBoard()
  const lines = board.jobs.map(job => `${job.n}. ${job.job} ${job.cut ? 'Cut. Waiting.' : 'Planned. Not cut.'}`).join(' ')
  return `Fifty jobs are loaded on this page. None are running. The till is closed. Held seats: ${board.held.join(', ')}. ${board.cut} are cut and waiting. ${board.planned} are planned and not cut. A gate opening does not start them. A signed bot Unity ID, a written audit row, and a go on every seat still have to be true. ${lines}`
}
