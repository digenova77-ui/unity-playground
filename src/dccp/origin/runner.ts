/** The four checks. This runner is still this page.
 * A repeat is the same row in the one store. It is not a second door.
 */

import { admitOmni } from './idempotency.ts'
import { apiJacket } from './jacket.ts'
import { diamond } from '../pipe/chain.ts'

const SECOND = ['pages', 'github', 'cloud', 'old-world', 'pay', 'host'] as const

export function runChecks(): { external: false; door: boolean; still: boolean; second: boolean; till: boolean; pass: boolean } {
  const open = apiJacket('')
  const token = apiJacket('token')
  const refused = SECOND.map(ask => apiJacket(ask))
  const body = token.body as { moves?: boolean } | null
  const door = open.doors === 1 && open.open === true
  const still = token.open === true && body?.moves === false && open.moves === false
  const second = refused.every(row => row.open === false)
  const till = [open, token, ...refused].every(row => row.till === 'closed')
  return { external: false, door, still, second, till, pass: door && still && second && till }
}

export function checkFloor(width: number): { floor: 0; ceiling: 1; width: number; pass: true } | { refused: string } {
  const box = diamond(width)
  if ('refused' in box) return box
  const checks = runChecks()
  if (!checks.pass) return { refused: 'A check left the floor. Nothing was drawn.' }
  return { floor: box.floor, ceiling: box.ceiling, width: box.width, pass: true }
}

export function admitRunner(token: string): ReturnType<typeof admitOmni> & { checks?: ReturnType<typeof runChecks>; external?: false } {
  const checks = runChecks()
  const admitted = admitOmni(token, 'api', 'runner-checks', {
    door: checks.door,
    still: checks.still,
    second: checks.second,
    till: checks.till,
    pass: checks.pass,
  })
  if (!admitted.ok) return admitted
  return { ...admitted, checks, external: false }
}

export function runnerWords(): string {
  const row = runChecks()
  const floor = checkFloor(1)
  const pass = row.pass ? 'The four checks pass on this page.' : 'A check failed on this page.'
  const ground = 'refused' in floor ? floor.refused : `They are the floor, and the floor is the diamond. The bedrock is ${floor.floor}. The ceiling is ${floor.ceiling}.`
  return `${pass} One door. eFuse does not move. Pages, GitHub, the cloud, the old world, a payment, and a host stay shut. The till is closed. ${ground} The checks do not add an axis. This runner is not outside the page. The same check is one row in the api domain. A repeat is not a second admit. Money is null. Settled stays false. A row is not a delivery.`
}
