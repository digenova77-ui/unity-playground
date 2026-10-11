import assert from 'node:assert/strict'
import test from 'node:test'
import { plancksoft, sleeve, sleeveWords } from './sleeve.ts'

test('the sleeve keeps the declaration and writes nothing to disk', () => {
  assert.deepEqual(sleeve(), { api_version: '2', jacket: 'closed', receipts: 'memory', disk: false, holds: 'nothing' })
})

test('Plancksoft is the sleeve and the host kernel stays', () => {
  const row = plancksoft()
  assert.equal(row.name, 'Plancksoft')
  assert.equal(row.kernel, 'not this page')
  assert.equal(row.host, 'kept')
  assert.equal(row.jacket, 'closed')
  assert.equal(row.disk, false)
  assert.equal(row.bits, 64)
  assert.match(sleeveWords(), /does not replace it/)
  assert.match(sleeveWords(), /holds nothing/)
})
