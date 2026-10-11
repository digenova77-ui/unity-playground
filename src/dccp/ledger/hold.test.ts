import assert from 'node:assert/strict'
import test from 'node:test'
import { fatherLedgerWords, sonLedgerWords, whiteKey } from './hold.ts'
import type { WhiteDoc } from './dark.ts'

test('the son wallet sees white, and the father seed sees both without opening dark text', () => {
  const doc = { id: '1', sha256: 'abc', text: 'a white page', at: '', face: 'white' } as WhiteDoc
  assert.equal(whiteKey(doc), 'son')
  assert.match(sonLedgerWords(), /white ledger/)
  assert.match(sonLedgerWords(), /not in this wallet/)
  assert.match(fatherLedgerWords(), /white ledger and the dark ledger/)
  assert.match(fatherLedgerWords(), /not opened/)
})
