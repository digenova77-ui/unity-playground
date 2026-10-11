import assert from 'node:assert/strict'
import test from 'node:test'
import { DnaPool, coordToPrefix, fingerprintOf, machinePipe, prefixToCoord, sha256 } from './dna.ts'

test('the key bridge round-trips, and the same bytes are not rewritten', () => {
  const digest = [...sha256(new TextEncoder().encode('abc'))].map(n => n.toString(16).padStart(2, '0')).join('')
  assert.equal(digest, 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad')
  const back = prefixToCoord(coordToPrefix(0.42, -0.18, 0.77))
  assert.ok(Math.abs(back[0] - 0.42) < 3.1e-5)
  assert.equal(fingerprintOf(new Uint8Array([1])).length, 128)
  const pool = new DnaPool()
  const bytes = new TextEncoder().encode('M13')
  const alone = pool.store({ data: bytes, x: 0.42, y: -0.18, z: 0.77 }, null)
  assert.equal('refused' in alone, true)
  assert.equal(pool.stats().molecules, 0)
  const drifted = pool.store({ data: bytes, x: 0.42, y: -0.18, z: 0.77 }, { fingerprint: 'A'.repeat(128), holds: 'nothing' })
  assert.equal('refused' in drifted, true)
  const first = pool.store({ data: bytes, x: 0.42, y: -0.18, z: 0.77, type: 'STAR', provenance: 'messier-catalog' }, machinePipe(bytes))
  const second = pool.store({ data: bytes, x: -0.9, y: 0.9, z: -0.9, type: 'STAR', provenance: 'messier-catalog' }, machinePipe(bytes))
  assert.equal('key' in first, true)
  assert.equal('key' in second, true)
  if (!('key' in first) || !('key' in second)) return
  assert.equal(first.key.length, 152)
  assert.equal(first.key.slice(24), second.key.slice(24))
  assert.equal('aliased' in second && second.aliased, true)
  assert.equal('duplicate' in second && second.duplicate, false)
  const third = pool.store({ data: bytes, x: 0.42, y: -0.18, z: 0.77, type: 'STAR', provenance: 'messier-catalog' }, machinePipe(bytes))
  assert.equal('duplicate' in third && third.duplicate, true)
  assert.equal(pool.placed().reduce((sum, row) => sum + row.places.length, 0), 2)
  assert.equal(second.rewritten, false)
  assert.equal(pool.stats().molecules, 1)
  assert.equal(pool.stats().tick, 1)
  assert.equal(pool.retrieve('not-a-key'), null)
})
