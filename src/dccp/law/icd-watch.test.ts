import assert from 'node:assert/strict'
import test from 'node:test'
import { icdWatchWords, noteIcdWatch } from './icd-watch.ts'

test('the ICD seat keeps one stem and does not write a repeat', () => {
  const first = noteIcdWatch(1)
  const second = noteIcdWatch(2)
  assert.equal(first.code, 'CA00')
  assert.equal(second.at, first.at)
  assert.equal(first.fetched, false)
  assert.match(icdWatchWords(first), /does not fetch the catalog/)
})
