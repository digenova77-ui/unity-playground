/** Local API v2 origin. Read-only. Fail closed. No house key. No PII store.
 * SEE is an observation. It is not settlement and it does not grant authority.
 */

import { createHash } from 'node:crypto'

import { LAW } from '../law/floor'
import { orderBody } from '../gate/order'
import { pinBody } from '../gate/pins'
import { sleeve } from './sleeve'
const PERSON = new Set(['email', 'name', 'phone', 'address', 'prompt', 'passphrase', 'private_key', 'seed_phrase'])
const SOURCES = new Set(['builder', 'unity', 'webgl', 'origin'])
export const MAX_BODY_BYTES = 64 * 1024

export interface Tip { receipt: string; verdict: string }
const tips: Tip[] = []

export function canonical(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value) ?? 'null'
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`
  const obj = value as Record<string, unknown>
  return `{${Object.keys(obj).sort().map(key => `${JSON.stringify(key)}:${canonical(obj[key])}`).join(',')}}`
}

export function sha256(value: unknown): string {
  return createHash('sha256').update(canonical(value)).digest('hex')
}

function carriesPerson(value: unknown): boolean {
  if (Array.isArray(value)) return value.some(carriesPerson)
  if (!value || typeof value !== 'object') return false
  return Object.entries(value as Record<string, unknown>).some(([key, child]) => PERSON.has(key.toLowerCase()) || carriesPerson(child))
}

export function hole(why: string, parent = '0'.repeat(64)): Record<string, unknown> {
  const body: Record<string, unknown> = {
    api_version: '2',
    verdict: 'HOLE',
    authority: 'NONE',
    pii_coefficient: 0,
    law: [...LAW],
    why,
    parent,
    ts: Math.floor(Date.now() / 1000),
  }
  body.receipt = sha256(body)
  tips.push({ receipt: String(body.receipt), verdict: 'HOLE' })
  return body
}

export function admit(ask: Record<string, unknown>): Record<string, unknown> {
  const parent = tips.at(-1)?.receipt ?? '0'.repeat(64)
  if (ask.pii_coefficient != null && ask.pii_coefficient !== 0) return hole('PII coefficient is not 0.00', parent)
  const law = Array.isArray(ask.law) ? ask.law : [...LAW]
  const missing = LAW.filter(name => !law.includes(name))
  if (missing.length) return hole(`law floor drift: ${missing.join(',')}`, parent)
  if (ask.authority != null && ask.authority !== 'NONE') return hole('origin does not grant authority', parent)
  const body: Record<string, unknown> = {
    api_version: '2',
    verdict: 'SEE',
    authority: 'NONE',
    ingress: typeof ask.source === 'string' ? ask.source : 'sandbox',
    input_hash: sha256(ask),
    pii_coefficient: 0,
    law: [...LAW],
    dccp: 'NOT_ATTESTED',
    parent,
    ts: Math.floor(Date.now() / 1000),
    saw: { rings: 6, towers: ['DCLM', 'IRIS'], nodes: typeof ask.nodes === 'number' ? ask.nodes : 0 },
  }
  body.receipt = sha256(body)
  tips.push({ receipt: String(body.receipt), verdict: 'SEE' })
  return body
}

function json(body: Record<string, unknown>, status: number): Response {
  return Response.json(body, { status })
}

async function readObject(request: Request): Promise<{ ok: true; value: Record<string, unknown> } | { ok: false; status: number; body: Record<string, unknown> }> {
  const raw = await request.text()
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return { ok: false, status: 413, body: hole('body exceeds local size limit') }
  let parsed: unknown
  try { parsed = JSON.parse(raw) } catch { return { ok: false, status: 400, body: hole('body is not JSON') } }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return { ok: false, status: 400, body: hole('body is not an object') }
  if (carriesPerson(parsed)) return { ok: false, status: 400, body: hole('payload carried a person field') }
  return { ok: true, value: parsed as Record<string, unknown> }
}

export async function executeRequest(request: Request): Promise<Response> {
  const read = await readObject(request)
  if (!read.ok) return json(read.body, read.status)
  const out = admit(read.value)
  return json(out, out.verdict === 'SEE' ? 200 : 422)
}

export async function ingestRequest(request: Request): Promise<Response> {
  const read = await readObject(request)
  if (!read.ok) return json(read.body, read.status)
  const source = read.value.source
  const payload = read.value.payload
  if (typeof source !== 'string' || !SOURCES.has(source)) return json(hole('ingress source is not allowlisted'), 422)
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return json(hole('ingress payload is not an object'), 422)
  const out = admit({ ...(payload as Record<string, unknown>), source })
  return json(out, out.verdict === 'SEE' ? 200 : 422)
}

export function purgeReceipts(): Response {
  tips.splice(0, tips.length)
  return Response.json({ ok: true, verdict: 'CLEANED', pii_coefficient: 0 })
}

export function listReceipts(): Response {
  return Response.json({ count: tips.length, tip: tips.at(-1) ?? null })
}

export function healthBody(): Record<string, unknown> {
  return { ok: true, api_version: '2', origin: 'this-server', pii_coefficient: 0 }
}

export function protocolBody(): Record<string, unknown> {
  return {
    protocol: 'DCLM-MACHINE/2',
    status: 'DECLARED_NOT_VERIFIED',
    transport: 'HTTPS POST',
    endpoints: {
      protocol: 'GET /v2/protocol',
      ingest: 'POST /v2/dclm/ingest',
      legacy_compute: 'POST /api/v2/compute (compatibility target)',
    },
    limits: { public_compute_payload_utf8_bytes: 256, current_ingress_body_bytes: MAX_BODY_BYTES },
    flags: 0,
    determinism: true,
    write_authority: false,
    auth: {
      agency_signature: 'ECDSA-P256 or hardware/passkey-backed signer',
      private_key_custody: 'agency_only',
      verifier: 'NOT_DEPLOYED',
    },
    receipts: ['status', 'input_digest', 'state_digest', 'artifact', 'compatibility'],
    law: [...LAW],
    sleeve: sleeve(),
    order: orderBody(),
    pins: pinBody(),
  }
}

export function capabilitiesBody(): Record<string, unknown> {
  return {
    api_version: '2',
    jacket: 'SANDBOX',
    access: 'closed',
    house_key: 'disabled',
    pii_coefficient: 0,
    law: [...LAW],
    chat: 'HOLE',
    why_chat: 'no house key on this origin',
  }
}

export function breakerBody(): Record<string, unknown> {
  return { ok: true, pii_coefficient: 0, latency_budget_ms: 4.2, measured: false }
}
