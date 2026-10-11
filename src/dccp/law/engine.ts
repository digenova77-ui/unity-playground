/** The powers of a deterministic engine. Each one is a rule the step can be checked against.
 * The digest is djb2 of the canonical form. It is not a SHA-256, and it is not a CID.
 */

import { looksLikePrivateKey } from '../pipe/chain.ts'

export const POWERS = [
  'function',
  'replay',
  'canonical',
  'idempotent-commit',
  'hole',
  'no-ambient-clock',
  'no-ambient-entropy',
  'ordered-keys',
  'transparent',
  'compose',
  'fixed-point',
  'prefix',
  'gap-reject',
  'conflict-reject',
  'duplicate-suppress',
  'cleanup',
  'isolation',
  'commute',
  'exact-or-named',
  'non-interference',
  'snapshot',
  'confluence',
] as const

export interface Receipt {
  digest: string
  alg: 'djb2-canonical'
  hole: string | null
  inexact: boolean
  form: string
}

export interface EngineFrame {
  sequence: number
  digest: string
  prev: string
}

const HOLE = 'HOLE'

export function reduce(input: unknown): Receipt {
  const walked = walk(input)
  if (walked.blocked) {
    return { digest: digestOf(HOLE), alg: 'djb2-canonical', hole: walked.blocked, inexact: false, form: HOLE }
  }
  const form = JSON.stringify(walked.value)
  return { digest: digestOf(form), alg: 'djb2-canonical', hole: null, inexact: walked.inexact, form }
}

export function commit(log: readonly EngineFrame[], receipt: Receipt, prev: string): { ok: true; log: EngineFrame[] } | { ok: false; reason: 'gap' | 'conflict' | 'duplicate' } {
  if (log.some(frame => frame.digest === receipt.digest)) return { ok: true, log: [...log] }
  const head = log.length ? log[log.length - 1].digest : '0'
  if (prev !== head) return { ok: false, reason: log.some(frame => frame.digest === prev) ? 'conflict' : 'gap' }
  return { ok: true, log: [...log, { sequence: log.length + 1, digest: receipt.digest, prev }] }
}

/** Independent receipts merge by digest order, so finish order does not matter. */
export function merge(left: Receipt, right: Receipt): Receipt {
  const ordered = [left.digest, right.digest].sort()
  return reduce({ merge: ordered })
}

function walk(input: unknown, seen = new WeakSet<object>()): { value: unknown; inexact: boolean; blocked: string | null } {
  if (input === null) return { value: null, inexact: false, blocked: null }
  if (typeof input === 'string') {
    if (looksLikePrivateKey(input)) return { value: HOLE, inexact: false, blocked: 'private material does not enter' }
    return { value: input, inexact: false, blocked: null }
  }
  if (typeof input === 'number') {
    if (!Number.isFinite(input)) return { value: HOLE, inexact: false, blocked: 'a number that is not finite is a hole' }
    if (!Number.isInteger(input)) return { value: { '~float': String(input) }, inexact: true, blocked: null }
    return { value: input, inexact: false, blocked: null }
  }
  if (typeof input === 'boolean') return { value: input, inexact: false, blocked: null }
  if (Array.isArray(input)) {
    let inexact = false
    const value = []
    for (const item of input) {
      const next = walk(item, seen)
      if (next.blocked) return next
      if (next.inexact) inexact = true
      value.push(next.value)
    }
    return { value, inexact, blocked: null }
  }
  if (typeof input === 'object') {
    if (seen.has(input)) return { value: HOLE, inexact: false, blocked: 'a cycle is not an input' }
    seen.add(input)
    let inexact = false
    const value: Record<string, unknown> = {}
    for (const key of Object.keys(input).filter(name => !name.startsWith('_')).sort()) {
      const next = walk((input as Record<string, unknown>)[key], seen)
      if (next.blocked) return next
      if (next.inexact) inexact = true
      value[key] = next.value
    }
    return { value, inexact, blocked: null }
  }
  return { value: HOLE, inexact: false, blocked: 'this value is not an input' }
}

function digestOf(form: string): string {
  let hash = 5381
  for (let i = 0; i < form.length; i++) hash = Math.imul(hash, 33) ^ form.charCodeAt(i)
  return `djb2:${(hash >>> 0).toString(16).padStart(8, '0')}`
}

export function engineWords(): string {
  return `The engine has ${POWERS.length} powers, and they hold whether or not a step was thinking about them. ${POWERS.join(', ')}. The same named inputs reduce to the same form. A clock or a random draw is not read. A float is named as inexact. A private key is a hole and is not in the digest. Scratch is dropped. The same receipt commits once. A gap or a conflict is refused. Two independent receipts merge by digest order, so it does not matter which finished first. The digest is djb2 of that form. It is not a SHA-256 and it is not a CID.`
}
