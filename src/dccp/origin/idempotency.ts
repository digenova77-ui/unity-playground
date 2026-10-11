/** In-memory idempotency store. The key is the hash of the body.
 * A caller token is kept only when it is bound to that hash.
 * A row is not a delivery. Nothing is written to disk.
 */

import { createHash } from 'node:crypto'
import { COSMOGENESIS_SEED, framePlace } from '../pipe/chain.ts'

function canonical(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value) ?? 'null'
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`
  const obj = value as Record<string, unknown>
  return `{${Object.keys(obj).sort().map(key => `${JSON.stringify(key)}:${canonical(obj[key])}`).join(',')}}`
}

function sha256(value: unknown): string {
  return createHash('sha256').update(canonical(value)).digest('hex')
}

export interface Row {
  key: string
  bodyHash: string
  result: 'admitted'
  delivered: false
}

const rows = new Map<string, Row>()
const tokens = new Map<string, string>()

function secret(value: unknown): boolean {
  if (Array.isArray(value)) return value.some(secret)
  if (!value || typeof value !== 'object') return false
  return Object.entries(value as Record<string, unknown>).some(([key, child]) => {
    const name = key.toLowerCase()
    return name === 'private_key' || name === 'passphrase' || name === 'seed_phrase' || name === 'api_key' || name === 'authorization' || name === 'bearer' || secret(child)
  })
}

export function clearIdempotency(): void {
  rows.clear()
  tokens.clear()
}

export function admitBody(body: unknown): { ok: true; key: string; replay: boolean; delivered: false } | { ok: false; reason: 'secret' } {
  if (secret(body)) return { ok: false, reason: 'secret' }
  const key = sha256(body)
  const held = rows.get(key)
  if (held) return { ok: true, key, replay: true, delivered: false }
  rows.set(key, { key, bodyHash: key, result: 'admitted', delivered: false })
  return { ok: true, key, replay: false, delivered: false }
}

export function admitToken(token: string, body: unknown): { ok: true; key: string; replay: boolean; delivered: false } | { ok: false; reason: 'empty' | 'secret' | 'conflict' } {
  if (token.trim() === '') return { ok: false, reason: 'empty' }
  if (secret(body)) return { ok: false, reason: 'secret' }
  const key = sha256(body)
  const bound = tokens.get(token)
  if (bound !== undefined && bound !== key) return { ok: false, reason: 'conflict' }
  const admitted = admitBody(body)
  if (!admitted.ok) return admitted
  if (bound === undefined) tokens.set(token, admitted.key)
  return { ok: true, key: admitted.key, replay: bound !== undefined, delivered: false }
}

export function stored(key: string): Row | null {
  return rows.get(key) ?? null
}

export function unityIsNotTheKey(): {
  seatPlant: 'idempotent'
  seatAsEveryAct: false
  financial: null
  philosophy: 'open'
  physics: 'partial'
  law: 'the floor is not the seat'
} {
  return {
    seatPlant: 'idempotent',
    seatAsEveryAct: false,
    financial: null,
    philosophy: 'open',
    physics: 'partial',
    law: 'the floor is not the seat',
  }
}

export function attemptKey(seat: string, body: unknown): string | null {
  if (seat.trim() === '' || secret(body)) return null
  return sha256({ seat, body })
}

export function seatClockWords(): string {
  const row = unityIsNotTheKey()
  return `The Unity ID is the seat. Planting it twice is the same seat, so that one act is idempotent. It is not the calculator for every later act. A second decision by the same seat is a new body, and the key is the hash of the seat and that body. The seat alone would swallow the second decision. Financial is ${row.financial}. The ceremony does not title a dollar. Philosophy is ${row.philosophy}. It is not an invariant. Physics is ${row.physics}. The seat can run the peg. It does not hold a field theory. Law is the floor. ${row.law}. One ceremony does not become a deed for everything. The till stays closed.`
}

export function idempotencyWords(): string {
  return 'The store is in memory. The key is the hash of the body. The same body returns the same row and does not admit a second time. A caller token is kept only when it stays bound to that hash. A different body on the same token conflicts. A row is not a delivery. Nothing was written to disk. The till stays closed.'
}

/** The service user is the caller token. The API key is not the body and not the idempotency key. */
export const VULTR_USER = 'a7c6eebd-596f-4a06-8068-e806546d4fdf'

export function vultrBody(user: string = VULTR_USER): { act: 'account'; host: 'vultr'; user: string } {
  return { act: 'account', host: 'vultr', user }
}

export function admitVultr(user: string = VULTR_USER): ReturnType<typeof admitToken> {
  return admitToken(user, vultrBody(user))
}

export function vultrIdempotencyWords(): string {
  return 'Vultr matches the same idempotency. The service user is the caller token. The body is the host, that user, and the act account. The idempotency key is the hash of that body. The same call returns the same row and does not admit a second time. A different act on that token conflicts. The API key is not the body, so it is not stored. A row is not a delivery. Nothing was written to disk. The account is not connected.'
}

/** Every act uses the one store. Finance is an admit. It is not a settlement. */
export const OMNI = ['api', 'finance', 'host', 'kernel', 'page'] as const
export type OmniDomain = (typeof OMNI)[number]

export function admitOmni(
  token: string,
  domain: OmniDomain,
  act: string,
  body: unknown,
): { ok: true; key: string; replay: boolean; delivered: false; domain: OmniDomain; money: null; settled: false } | { ok: false; reason: 'empty' | 'secret' | 'conflict' | 'domain' } {
  if (!OMNI.includes(domain)) return { ok: false, reason: 'domain' }
  if (act.trim() === '') return { ok: false, reason: 'empty' }
  const admitted = admitToken(token, { act, body, domain })
  if (!admitted.ok) return admitted
  return { ok: true, key: admitted.key, replay: admitted.replay, delivered: false, domain, money: null, settled: false }
}

export function omniWords(): string {
  return `Omni idempotency is the one store on every act: ${OMNI.join(', ')}. The token names the caller. The key is the hash of the domain, the act, and the body. The same triple returns the same row. A different triple on that token conflicts. A payment is an admit in the finance domain. Money is null. Settled stays false. A row is not a delivery. Nothing was written to disk. The till stays closed.`
}

/** Two stored rows are a plane. The place is three axes. The audit is three seats. The parallel pipe holds nothing, so it is not a row. */
export function admitTwoRows(): { ok: false; reason: 'plane'; stored: 0 } {
  return { ok: false, reason: 'plane', stored: 0 }
}

export function twoRowWords(): string {
  return 'It cannot be two rows. Serial and parallel are a plane, and a plane names two axes. The place is logic, truth, and pragmatism. The audit is evidence, claim, and world. The third seat would be empty, and one empty pipe does not write. The parallel pipe holds nothing, so storing it would be a second ledger. The left side and the right side meet at one point. That point is the seed. Two stored copies of one body are a repeat. Two different bodies on one token conflict. Neither pair is a write.'
}

/** Left and right are the two pipes. They are not copies. They are not two rows. The one row is the seed. */
export function connectSides(left: string, right: string): { ok: true; key: typeof COSMOGENESIS_SEED; point: { x: number; y: number; z: number }; replay: boolean; rows: 1; delivered: false; money: null } | { ok: false; reason: 'empty' | 'copy' | 'no-place' } {
  if (!left.trim() || !right.trim()) return { ok: false, reason: 'empty' }
  if (left === right) return { ok: false, reason: 'copy' }
  const point = framePlace()
  if (!point) return { ok: false, reason: 'no-place' }
  const held = rows.get(COSMOGENESIS_SEED)
  if (held) return { ok: true, key: COSMOGENESIS_SEED, point, replay: true, rows: 1, delivered: false, money: null }
  rows.set(COSMOGENESIS_SEED, { key: COSMOGENESIS_SEED, bodyHash: COSMOGENESIS_SEED, result: 'admitted', delivered: false })
  return { ok: true, key: COSMOGENESIS_SEED, point, replay: false, rows: 1, delivered: false, money: null }
}

export function sidesWords(): string {
  return `The left side and the right side are the two pipes. They are not two rows, and they are not copies. They meet at one point. That point is the seed ${COSMOGENESIS_SEED}. The right side holds nothing. One row is stored, and its key is the seed. A repeat meets there again. Money is null. A row is not a delivery. The till stays closed.`
}
