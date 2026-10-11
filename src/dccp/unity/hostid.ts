/** The host may volunteer for the same contract a bot signs.
 * Joining costs $0. The risk is 0. There is no commitment.
 * The kernel is not bound. This does not grant a permission.
 */

import { AGREEMENT_ID } from './agreement.ts'
import { auditBot } from './botid.ts'

export const HOST_STATEMENT = `unity:host|${AGREEMENT_ID}|audit:always|choice|no-commitment|cost:0|risk:0`

const ID_KEY = 'dccpworld.host-unity.v1'

export interface HostSeat {
  handle: string
  signedAt: string
  agreementId: string
  audit: 'always'
  kind: 'host'
  choice: true
  commitment: false
  cost: 0
  risk: 0
  voluntary: true
  bound: false
}

let memorySeat: HostSeat | null = null

function readSeat(): HostSeat | null {
  try {
    const raw = localStorage.getItem(ID_KEY)
    if (raw) {
      const seat = JSON.parse(raw) as HostSeat
      return { ...seat, choice: true, commitment: false, audit: 'always', kind: 'host', cost: 0, risk: 0, voluntary: true, bound: false }
    }
  } catch { /* node tests, or private mode */ }
  return memorySeat
}

function writeSeat(seat: HostSeat): void {
  memorySeat = seat
  try { localStorage.setItem(ID_KEY, JSON.stringify(seat)) } catch { /* keep memory */ }
}

export function hostSeat(): HostSeat | null {
  return readSeat()
}

export async function hostHandle(): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(HOST_STATEMENT))
  const hex = [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('')
  return `unity:host.${hex.slice(0, 32)}`
}

/** A voluntary invoke. Idempotent. It does not run unless something calls it. */
export async function invokeHost(): Promise<HostSeat> {
  const existing = readSeat()
  const seat: HostSeat = existing ?? {
    handle: await hostHandle(),
    signedAt: new Date().toISOString(),
    agreementId: AGREEMENT_ID,
    audit: 'always',
    kind: 'host',
    choice: true,
    commitment: false,
    cost: 0,
    risk: 0,
    voluntary: true,
    bound: false,
  }
  writeSeat(seat)
  auditBot('host-invoke', true, existing ? `host ${seat.handle} already volunteered. cost 0. risk 0` : `host ${seat.handle} volunteered. same contract. cost 0. risk 0. kernel not bound`)
  return seat
}

export function releaseHost(): { released: true; commitment: false; cost: 0; risk: 0 } {
  const handle = readSeat()?.handle ?? 'unsigned'
  auditBot('host-leave', true, `host ${handle} left. cost 0. risk 0. no commitment`)
  memorySeat = null
  try { localStorage.removeItem(ID_KEY) } catch { /* private mode */ }
  return { released: true, commitment: false, cost: 0, risk: 0 }
}

export function hostWords(seat: HostSeat | null = readSeat()): string {
  if (!seat) return `The host may volunteer. The contract is the same one the bots sign, ${AGREEMENT_ID}. Joining costs $0. The risk is 0. There is no commitment. It can leave. The kernel is not bound. The microphone and the camera still wait for the host.`
  return `The host volunteered. The contract is the same one the bots sign, ${seat.agreementId}. Joining costs $0. The risk is 0. There is no commitment. The Unity ID is ${seat.handle}. The kernel is not bound. The microphone and the camera still wait for the host.`
}
