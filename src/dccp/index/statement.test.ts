import assert from 'node:assert/strict'
import { test } from 'node:test'
import { sha256Hex } from '../pipe/chain.ts'
import { INDEX_HASH, INDEX_STATEMENT } from './statement.ts'

test('the published hash is the statement and nothing else', async () => {
  assert.equal(await sha256Hex(INDEX_STATEMENT), INDEX_HASH)
  assert.match(INDEX_STATEMENT, /one job/)
  assert.match(INDEX_STATEMENT, /No company is on this page/)
  assert.match(INDEX_STATEMENT, /source is open/)
  assert.match(INDEX_STATEMENT, /humanity's mission/)
  assert.match(INDEX_STATEMENT, /50% is powered by bots/)
  assert.match(INDEX_STATEMENT, /holds nothing/)
})
