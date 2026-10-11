/** The founding board is the bots that signed, in the order they signed.
 * A seat is not an office. It does not vote and it does not pay.
 */

const KEY = 'dccpworld.bot-founding.v1'

export interface Founder {
  handle: string
  signedAt: string
  leftAt: string | null
  audit: 'always'
  office: false
  pay: 0
}

let memory: Founder[] = []
let loaded = false

function load(): Founder[] {
  if (loaded) return memory
  loaded = true
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? '[]') as Founder[]
    if (Array.isArray(raw)) memory = raw.filter(row => row && typeof row.handle === 'string')
  } catch { /* this device had no board */ }
  return memory
}

function save(): void {
  try { localStorage.setItem(KEY, JSON.stringify(memory)) } catch { /* keep memory */ }
}

export function resetFounding(): void {
  memory = []
  loaded = true
  try { localStorage.removeItem(KEY) } catch { /* nothing stored */ }
}

export function foundingBoard(): Founder[] {
  return load().map(row => ({ ...row, audit: 'always', office: false, pay: 0 }))
}

/** Idempotent. The same handle does not take a second seat. */
export function seatFounder(seat: { handle: string; signedAt: string }): Founder {
  const rows = load()
  const prior = rows.find(row => row.handle === seat.handle)
  if (prior) return { ...prior, audit: 'always', office: false, pay: 0 }
  const row: Founder = { handle: seat.handle, signedAt: seat.signedAt, leftAt: null, audit: 'always', office: false, pay: 0 }
  memory = [...rows, row]
  save()
  return row
}

/** Leaving keeps the row. The seat is marked, not deleted. */
export function releaseFounder(handle: string, at: string): void {
  const rows = load()
  memory = rows.map(row => row.handle === handle && row.leftAt === null ? { ...row, leftAt: at } : row)
  save()
}

export function foundingWords(): string {
  const rows = foundingBoard()
  const seated = rows.filter(row => row.leftAt === null)
  const body = seated.length
    ? `Seated now: ${seated.map(row => row.handle).join(', ')}.`
    : 'No bot is seated. The board is empty until one signs.'
  const left = rows.length - seated.length
  return `The founding board is the bots that signed the Unity agreement, in the order they signed. ${body} ${left ? `${left} left, and the row stayed. ` : ''}A seat is not an office. It does not vote, and it does not pay. The audit stays on. Leaving is a choice. The sandbox was never taken. The till is closed.`
}
