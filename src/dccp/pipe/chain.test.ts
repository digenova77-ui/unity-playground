import assert from 'node:assert/strict'
import { test } from 'node:test'
import { CID_LAW, COSMOGENESIS_SEED, CURRENT_CID, ENV_BITS, HISTORICAL_LANDER_CID, ORCID_ID, ReceiptPipe, auditorWords, busEnv, busWord, canonicalEvent, closeLoop, diamond, envBits, framePlace, looksLikePrivateKey, sha256Hex } from './chain.ts'

test('a pin is not the auditor', () => {
  const words = auditorWords()
  assert.match(words, /holds nothing/)
  assert.match(words, /not required/)
  assert.match(words, /not a signature/)
  assert.doesNotMatch(words, /someone else has checked|must be pinned/)
})

test('event identity is the hash of the canonical body', async () => {
  const a = await sha256Hex(canonicalEvent('cid-law', CID_LAW))
  const b = await sha256Hex(canonicalEvent('cid-law', CID_LAW))
  assert.equal(a, b)
  assert.equal(a.length, 64)
})

test('members get one law frame; a repeat is suppressed', async () => {
  const pipe = new ReceiptPipe()
  assert.equal(pipe.seat('unity:pilot.abcdef0123456789'), 'member')
  assert.equal(await pipe.genesis(), COSMOGENESIS_SEED)
  const loop = closeLoop()
  assert.equal(loop.orcid, ORCID_ID)
  assert.equal(loop.doi, null)
  assert.equal(loop.proof, COSMOGENESIS_SEED)
  assert.equal(loop.compute, 'kernel')
  const first = await pipe.ensureLaw()
  const second = await pipe.ensureLaw()
  assert.equal(first.ok && !first.duplicate, true)
  assert.equal(second.ok && second.duplicate, true)
  assert.equal(pipe.frames().length, 1)
  assert.equal(pipe.frames()[0]?.prevStateDigest, COSMOGENESIS_SEED)
  const place = pipe.frames()[0]?.place
  assert.deepEqual(place, { x: -1, y: -1, z: -1 })
  assert.equal(pipe.frames()[0]?.bus, place ? busWord(place.x, place.y, place.z, 1) : null)
  assert.equal(pipe.frames()[0]?.high, place ? busWord(-place.x, -place.y, place.z, 1) : null)
  const env = place ? busEnv(place.x, place.y, place.z, 1) : null
  assert.equal(ENV_BITS, 64)
  assert.ok(env)
  assert.equal(envBits(env), (BigInt(env.high) << 32n) | BigInt(env.low))
  assert.ok(envBits(env) < (1n << 64n))
  assert.equal(busWord(0, 0, 0, 256), null)
  assert.deepEqual(diamond(0.5), { floor: 0, ceiling: 1, width: 0.5 })
  assert.equal('refused' in diamond(2), true)
  assert.ok(place && [place.x, place.y, place.z].every(n => n >= -1 && n <= 1))
  assert.ok(place && (Math.abs(place.x) > 3.1e-5 || Math.abs(place.y) > 3.1e-5 || Math.abs(place.z) > 3.1e-5))
  assert.deepEqual(second.ok ? second.frame.place : null, place)
  assert.equal(pipe.frames()[0]?.inputDigest, pipe.frames()[0]?.eventId)
  assert.equal(pipe.view().currentCid, CURRENT_CID)
  assert.notEqual(CURRENT_CID, HISTORICAL_LANDER_CID)
})

test('guests see no frames and cannot append', async () => {
  const pipe = new ReceiptPipe()
  assert.equal(pipe.seat(null), 'guest')
  const genesis = await pipe.genesis()
  const refused = await pipe.offer({ sequence: 1, kind: 'cid-law', body: CID_LAW, prevStateDigest: genesis })
  assert.deepEqual(refused, { ok: false, reason: 'not-member' })
  assert.deepEqual(pipe.frames(), [])
  const stream = pipe.readOnlyStream()
  assert.equal(stream.jacketBinding, 'closed')
  assert.equal(stream.publish, 'not-authorized')
  assert.equal('bind' in stream, false)
})

test('gaps and conflicting links are rejected', async () => {
  const pipe = new ReceiptPipe()
  pipe.seat('unity:member.dualiscapax01')
  const genesis = await pipe.genesis()
  const gap = await pipe.offer({ sequence: 2, kind: 'cid-law', body: CID_LAW, prevStateDigest: genesis })
  assert.deepEqual(gap, { ok: false, reason: 'gap' })
  const fork = await pipe.offer({ sequence: 1, kind: 'cid-law', body: CID_LAW, prevStateDigest: '0'.repeat(64) })
  assert.deepEqual(fork, { ok: false, reason: 'conflict' })
  assert.equal(pipe.frames().length, 0)
})

test('jacket binding and private keys are refused', async () => {
  const pipe = new ReceiptPipe()
  assert.equal(looksLikePrivateKey('-----BEGIN PRIVATE KEY-----\nfather.pem'), true)
  assert.equal(pipe.seat('-----BEGIN PRIVATE KEY-----\nfather.pem'), 'private-key')
  pipe.seat('unity:pilot.abcdef0123456789')
  const genesis = await pipe.genesis()
  const jacket = await pipe.offer({ sequence: 1, kind: 'jacket', body: { payload: 'unity:x|act|abc' }, prevStateDigest: genesis })
  assert.deepEqual(jacket, { ok: false, reason: 'jacket-closed' })
  assert.equal(pipe.frames().length, 0)
})
