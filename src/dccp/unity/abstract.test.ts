import assert from 'node:assert/strict'
import test from 'node:test'
import { abstractLine, abstractSeat, abstractWords, auditFuse, insulaFuse, irisInner, tell } from './abstract.ts'
import { pureCadence } from './series.ts'

test('the Unity ID is a bind and not a layer', () => {
  const row = abstractSeat()
  assert.equal(row.layer, false)
  assert.equal(row.cost, 0)
  assert.equal(row.leave, true)
  assert.equal(row.unlock, false)
  assert.equal(row.rank, null)
  assert.equal(abstractLine(), 'The Unity ID is the bind. It is not a layer of either desk. Joining costs 0. You can leave. More is not unlocked.')
  assert.match(abstractWords(), /not a layer/)
})

test('the insula fuses two different 32-bit halves and holds nothing', () => {
  const refused = insulaFuse(1, 2, false)
  assert.equal('refused' in refused, true)
  const copies = insulaFuse(7, 7, true)
  assert.equal('refused' in copies, true)
  const wide = insulaFuse(1.5, 2, true)
  assert.equal('refused' in wide, true)
  const row = insulaFuse(0x01020304, 0x05060708, true)
  assert.equal('word' in row, true)
  if (!('word' in row)) return
  assert.equal(row.holds, 'nothing')
  assert.equal(row.layer, false)
  assert.deepEqual(row.beats, [1, 2])
  assert.equal(pureCadence(row.beats), true)
  assert.equal(row.word, (0x05060708n << 32n) | 0x01020304n)
  assert.deepEqual(auditFuse(0x01020304, 0x05060708, true, row.word), { holds: 'nothing', ok: true })
  assert.equal(auditFuse(0x01020304, 0x05060708, true, 0n).ok, false)
})

test('truth matches a held fact, a clash is a lie, and nothing held stays open', () => {
  const fact = 'The nerve is not lit.'
  assert.equal(tell(fact, null).verdict, 'open')
  assert.equal(tell(fact, 'The nerve is lit.').verdict, 'lie')
  assert.equal(tell(fact, fact).verdict, 'truth')
  assert.equal(irisInner(fact, null).owned, false)
  assert.equal(irisInner('The nerve is lit.', fact).owned, false)
  const row = irisInner(fact, fact)
  assert.equal(row.owned, true)
  if (!row.owned) return
  assert.equal(row.holds, 'nothing')
  assert.equal(row.verdict, 'truth')
  assert.deepEqual(row.beats, [1, 2])
  assert.equal(row.speech, fact)
})
