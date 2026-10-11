/** In-memory mirror of the DCLM kernel receipt chain.
 * A receipt sits where the three rings interlock. The sequence is not a dimension.
 * Read-only frames for a future 3D client. No jacket binding, no publish, no key material.
 * The operating-system kernel is not in this page.
 */

import { interlock } from '../law/divine.ts'
import { auditFuse, insulaFuse } from '../unity/abstract.ts'

export const LAW_ID = 'LAW-CID-MAPPING-DUALIS-2026-10-03-V1'
/** Spare lander pinned 2026-09-29, the five files in AGENT/IPFS-5-PINS.md.
 * An earlier spelling of this constant differed by two characters. That spelling was not a second release.
 */
export const HISTORICAL_LANDER_CID = 'bafybeian5fkku2cu47iusk3iyt3piwbpms7ri4grkneqiyxtqlzoxag2uy'
export const CURRENT_CID = 'NOT YET PUBLISHED' as const

/** Digests as printed in the draft. They are not 64 hex chars, so they are not treated as verified fingerprints. */
export const DRAFT_FINGERPRINTS = {
  builderHtml: '1ada87decdd91c910795d668edc248e6d679195d7e850c1adbfb',
  generatedAppHtml: '51251356467a5288eb5cabf7f9fa19fb3b13e6419d69bbc',
} as const

export const CID_LAW = {
  documentId: LAW_ID,
  status: 'DRAFT' as const,
  principle: 'New update, new release identity, new CID. Never reuse or relabel a different release’s CID.',
  publicUrl: 'https://dualiscapax.ai/builder.html',
  deployment: 'https://dccpworld-oeyvhz3h.manus.game/',
  cid: CURRENT_CID,
  builderHtmlSha256: DRAFT_FINGERPRINTS.builderHtml,
  generatedAppHtmlSha256: DRAFT_FINGERPRINTS.generatedAppHtml,
  fingerprintNote: 'A SHA-256 fingerprint is the digest of the bytes. It is not a content name.',
  historicalLanderCid: HISTORICAL_LANDER_CID,
  historicalScope: 'Historical evidence only. Not the current builder and not this DCCP World.',
  jacketBinding: 'closed' as const,
  authorizedPublish: false,
}

/** The check is a recompute. A pin is not a second auditor. */
export function auditorWords(): string {
  return 'You do not need another auditor. The check is the same hash coming back out of the bytes. The other pipe recomputes that and holds nothing. If those bytes stay public inside this system, anyone who wants to can do the same check. A person may keep their own log, even every second, on an API they run. That log is theirs. It is not a seat here. A pin, a chain, or any third party, decentralized or not, is not required for the check. A hash is still not a signature, and it does not make the sentence true. This page does not hold the log. Nothing is published.'
}

/** SHA-256 of Unity_Manifesto_for_Mankind_Sealed.pdf.
 * daviddigenova.com opens this document. First Zenodo record 10.5281/zenodo.21940542.
 * The later record on the same concept is 10.5281/zenodo.21984747, Theoretical Principles of Residualism, 17 August 2026.
 * That later file was not hashed here. The seed is the first document.
 * Recomputed from those bytes. The printed hash matched.
 * The attestation names eFuse as +1 ignition. That note is not this hash.
 */
export const COSMOGENESIS_SEED = '3cd9a384f295b12d0bd1c616d8b100438c065e9097ba732c207c1926eef9bf6d'

/** Public ORCID record. One work, no external id. Last modified 2026-08-03. */
export const ORCID_ID = '0009-0005-6291-8508'
export const ORCID_WORK = 'eFuse Cosmogenesis'
export const ORCID_PUT = '222614627'

/** Paperwork is the ORCID. Proof is the seed. The compute is the kernel. A DOI is not on the record. */
export function closeLoop(): { orcid: typeof ORCID_ID; work: typeof ORCID_WORK; put: typeof ORCID_PUT; doi: null; proof: typeof COSMOGENESIS_SEED; compute: 'kernel' } {
  return { orcid: ORCID_ID, work: ORCID_WORK, put: ORCID_PUT, doi: null, proof: COSMOGENESIS_SEED, compute: 'kernel' }
}

export function loopWords(): string {
  const row = closeLoop()
  return `The loop is the ORCID ${row.orcid}. The paperwork on it is ${row.work}, put-code ${row.put}. That record carries no DOI. The proof is the seed ${row.proof}, the hash of the first Zenodo record 10.5281/zenodo.21940542. The later record is Theoretical Principles of Residualism, 10.5281/zenodo.21984747. Joining those two records is the eFuse. That later file was not hashed here. The compute is the kernel routed to the first seed. A DOI was not written onto the ORCID from here.`
}

export type RejectReason = 'gap' | 'conflict' | 'duplicate-body' | 'not-member' | 'jacket-closed' | 'private-key' | 'no-place'

export interface Frame {
  readonly sequence: number
  readonly eventId: string
  readonly inputDigest: string
  readonly stateDigest: string
  readonly prevStateDigest: string
  readonly protocolVersion: 2
  readonly kind: string
  readonly place: { readonly x: number; readonly y: number; readonly z: number }
  readonly bus: number
  readonly high: number
}

/** The seed sits under the floor. A write on the diamond does not land here. */
export const SEED_AT = -1

/** The kernel address is the seed. The sequence is not an axis. */
export function framePlace(): { x: number; y: number; z: number } | null {
  const point = interlock()
  if ('refused' in point) return null
  return { x: SEED_AT, y: SEED_AT, z: SEED_AT }
}

/** 2⁵. One count: 32. The bus half is this many bits. The pilot pipe keeps this many hex characters. */
export const TWO_FIFTH = 2 ** 5
/** One half. Three measured axes and the step that travels them. */
export const BUS_BITS = TWO_FIFTH
/** The environment is the two halves. */
export const ENV_BITS = BUS_BITS * 2
/** The seed is the document hash. It is wider than both halves. */
export const SEED_BITS = 256

const lane = (value: number): number => {
  const clamped = Math.min(1, Math.max(-1, value))
  return Math.round(((clamped + 1) / 2) * 255) & 255
}

/** One 2⁵-bit half. Eight bits for each axis, eight for the step.
 * The step is the travel. It is not a fourth place.
 * A step past 255 does not fit this half. The seed still does not.
 */
export function busWord(x: number, y: number, z: number, step: number): number | null {
  if (!Number.isInteger(step) || step < 0 || step > 255) return null
  return ((lane(x) << 24) | (lane(y) << 16) | (lane(z) << 8) | step) >>> 0
}

/** Two halves. The low half is the place. The high half is that word on the other strand. */
export function busEnv(x: number, y: number, z: number, step: number): { low: number; high: number } | null {
  const low = busWord(x, y, z, step)
  const high = busWord(-x, -y, z, step)
  if (low === null || high === null) return null
  return { low, high }
}

/** The two halves as one 64-bit word. */
export function envBits(env: { low: number; high: number }): bigint {
  return (BigInt(env.high) << BigInt(BUS_BITS)) | BigInt(env.low >>> 0)
}

/** The diamond's floor is the bedrock of this realm. The ceiling is fixed. The width is the one who measures. */
export const BEDROCK = 0

export function diamond(width: number): { floor: typeof BEDROCK; ceiling: 1; width: number } | { refused: string } {
  if (!Number.isFinite(width) || width < 0 || width > 1) return { refused: 'The width is set by the one who measures, between the floor and the ceiling. Nothing was drawn.' }
  return { floor: BEDROCK, ceiling: 1, width }
}

export function kernelSpace(): string {
  const point = interlock()
  if ('refused' in point) return point.refused
  return `The kernel is routed to the seed. The seed is ${COSMOGENESIS_SEED}, the SHA-256 of the sealed manifesto that daviddigenova.com opens. The ORCID ${ORCID_ID} names ${ORCID_WORK} and carries no DOI. Logic is x. Truth is y. Pragmatism is z. The step travels those three. That is a ${ENV_BITS}-bit environment, two halves of ${BUS_BITS} bits. The low half is the place. The high half is the same word on the other strand. The seed is ${SEED_BITS} bits, so the seed still goes past both halves. The seed sits at -1, under the floor. The diamond's floor is 0 and its ceiling is 1. The width is set by the one who measures. The sequence is not an axis. The operating-system kernel is not in this page.`
}

export interface PipeView {
  member: boolean
  jacketBinding: 'closed'
  lawStatus: 'DRAFT'
  currentCid: typeof CURRENT_CID
  historicalLanderCid: string
  principle: string
  publicUrl: string
  deployment: string
  frames: Frame[]
}

export async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('')
}

export function canonicalEvent(kind: string, body: unknown): string {
  return `${kind}|${JSON.stringify(body)}`
}

export function looksLikePrivateKey(value: string): boolean {
  const s = value.toLowerCase()
  return s.includes('private key') || s.includes('begin ') || s.includes('.pem') || s.includes('father.pem')
}

export function isUnityHandle(value: string): boolean {
  return /^unity:[a-z0-9._-]{8,128}$/i.test(value)
}

export interface Offer {
  sequence: number
  kind: string
  body: unknown
  prevStateDigest: string
}

export type OfferResult =
  | { ok: true; duplicate: boolean; frame: Frame }
  | { ok: false; reason: RejectReason }

export class ReceiptPipe {
  private member: string | null = null
  private seq = 0
  private state = ''
  private ready: Promise<void>
  private readonly seen = new Map<string, string>()
  private readonly log: Frame[] = []

  constructor() {
    this.ready = Promise.resolve().then(() => { this.state = COSMOGENESIS_SEED })
  }

  get seated(): string | null { return this.member }

  async genesis(): Promise<string> {
    await this.ready
    return this.state
  }

  /** Seat a Dualis Unity handle already on the device. Refuses PEM and private keys. */
  seat(handle: string | null): 'member' | 'guest' | 'private-key' {
    if (!handle) { this.member = null; return 'guest' }
    if (looksLikePrivateKey(handle)) { this.member = null; return 'private-key' }
    if (!isUnityHandle(handle)) { this.member = null; return 'guest' }
    this.member = handle
    return 'member'
  }

  frames(): readonly Frame[] {
    if (!this.member) return []
    return this.log.map(frame => ({ ...frame }))
  }

  head(): Frame | null {
    const frames = this.frames()
    return frames.length ? frames[frames.length - 1] : null
  }

  /** Admit one link. Identical event identity is suppressed. Gaps and forks are rejected. */
  async offer(offer: Offer): Promise<OfferResult> {
    await this.ready
    if (!this.member) return { ok: false, reason: 'not-member' }
    if (offer.kind === 'jacket' || offer.kind === 'bind') return { ok: false, reason: 'jacket-closed' }
    const canonical = canonicalEvent(offer.kind, offer.body)
    const eventId = await sha256Hex(canonical)
    const prior = this.seen.get(eventId)
    if (prior !== undefined) {
      if (prior !== canonical) return { ok: false, reason: 'conflict' }
      const frame = this.log.find(item => item.eventId === eventId)
      if (!frame) return { ok: false, reason: 'conflict' }
      return { ok: true, duplicate: true, frame: { ...frame } }
    }
    if (offer.sequence !== this.seq + 1) return { ok: false, reason: offer.sequence > this.seq + 1 ? 'gap' : 'conflict' }
    if (offer.prevStateDigest !== this.state) return { ok: false, reason: 'conflict' }
    const inputDigest = eventId
    const stateDigest = await sha256Hex(`${this.state}|${inputDigest}|${offer.sequence}`)
    const place = framePlace()
    if (!place) return { ok: false, reason: 'no-place' }
    const env = busEnv(place.x, place.y, place.z, offer.sequence)
    if (!env) return { ok: false, reason: 'no-place' }
    const fused = insulaFuse(env.low, env.high, true)
    if ('refused' in fused) return { ok: false, reason: 'no-place' }
    const audit = auditFuse(env.low, env.high, true, fused.word)
    if (!audit.ok || audit.holds !== 'nothing') return { ok: false, reason: 'no-place' }
    const frame: Frame = {
      sequence: offer.sequence,
      eventId,
      inputDigest,
      stateDigest,
      prevStateDigest: this.state,
      protocolVersion: 2,
      kind: offer.kind,
      place,
      bus: env.low,
      high: env.high,
    }
    this.seq = offer.sequence
    this.state = stateDigest
    this.seen.set(eventId, canonical)
    this.log.push(frame)
    return { ok: true, duplicate: false, frame: { ...frame } }
  }

  /** Record the CID mapping law once. A second call is the same event, not a new release. */
  async ensureLaw(): Promise<OfferResult> {
    await this.ready
    const existing = this.log.find(frame => frame.kind === 'cid-law')
    if (existing) {
      if (!this.member) return { ok: false, reason: 'not-member' }
      return { ok: true, duplicate: true, frame: { ...existing } }
    }
    return this.offer({ sequence: this.seq + 1, kind: 'cid-law', body: CID_LAW, prevStateDigest: this.state })
  }

  view(): PipeView {
    return {
      member: !!this.member,
      jacketBinding: 'closed',
      lawStatus: 'DRAFT',
      currentCid: CURRENT_CID,
      historicalLanderCid: HISTORICAL_LANDER_CID,
      principle: CID_LAW.principle,
      publicUrl: CID_LAW.publicUrl,
      deployment: CID_LAW.deployment,
      frames: [...this.frames()],
    }
  }

  /** The only object a future 3D client may hold. No bind, no publish, no append. */
  readOnlyStream(): {
    readonly schema: 'dccp.pipe.frames/1'
    readonly jacketBinding: 'closed'
    readonly publish: 'not-authorized'
    readonly lawStatus: 'DRAFT'
    readonly currentCid: typeof CURRENT_CID
    readonly historicalLanderCid: string
    frames: () => readonly Frame[]
    head: () => Frame | null
  } {
    return Object.freeze({
      schema: 'dccp.pipe.frames/1' as const,
      jacketBinding: 'closed' as const,
      publish: 'not-authorized' as const,
      lawStatus: 'DRAFT' as const,
      currentCid: CURRENT_CID,
      historicalLanderCid: HISTORICAL_LANDER_CID,
      frames: () => this.frames(),
      head: () => this.head(),
    })
  }
}
