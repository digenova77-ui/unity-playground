import assert from 'node:assert/strict'
import test from 'node:test'
import { COSMOGENESIS_SEED } from '../pipe/chain.ts'
import { ROOT } from './root.ts'
import { senseInstinct } from './instinct.ts'

test('a sense sits on the diamond and the instinct is the seed under it', () => {
  const quiet = senseInstinct()
  assert.equal('refused' in quiet, false)
  if ('refused' in quiet) return
  assert.equal(quiet.floor, 0)
  assert.equal(quiet.onFloor, 0)
  assert.equal(quiet.under, -1)
  assert.equal(quiet.seed, COSMOGENESIS_SEED)
  assert.equal(quiet.trained, false)
  assert.equal(quiet.root, false)
  const seen = senseInstinct({ sight: true, hearing: false })
  if ('refused' in seen) return assert.fail('refused')
  assert.equal(seen.onFloor, 1)
  assert.equal(seen.sense, 'sight')
  assert.equal('refused' in senseInstinct({ sight: false, hearing: false }, 2), true)
  assert.equal(ROOT.some(line => /instinct|sight|hearing/i.test(line)), false)
})
