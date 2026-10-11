import assert from 'node:assert/strict'
import test from 'node:test'
import { POWERS, commit, engineWords, merge, reduce } from './engine.ts'

test('the engine reduces only from named inputs, and the powers hold', () => {
  const one = reduce({ b: 1, a: 2, _scratch: 'gone' })
  const two = reduce({ a: 2, b: 1 })
  assert.equal(one.digest, two.digest)
  assert.equal(one.hole, null)
  assert.equal(reduce(JSON.parse(one.form)).digest, one.digest)
  assert.equal(reduce({ n: 0.1 }).inexact, true)
  const secret = reduce({ note: 'BEGIN PRIVATE KEY' })
  assert.equal(secret.form, 'HOLE')
  assert.equal(secret.form.includes('PRIVATE'), false)
  const first = commit([], one, '0')
  assert.equal(first.ok, true)
  const again = first.ok ? commit(first.log, one, '0') : first
  assert.equal(again.ok, true)
  if (first.ok && again.ok) assert.equal(again.log.length, 1)
  const gap = commit([], one, 'missing')
  assert.equal(gap.ok, false)
  const left = reduce({ slot: 'A' })
  const right = reduce({ slot: 'B' })
  assert.equal(merge(left, right).digest, merge(right, left).digest)
  assert.equal(POWERS.length, 22)
  assert.match(engineWords(), /not a SHA-256/)
  assert.equal(reduce({ at: 1 }).digest === reduce({ at: 2 }).digest, false)
})
