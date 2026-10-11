import assert from 'node:assert/strict'
import test from 'node:test'
import { line, smash } from './line.ts'

test('a straight line is right only when every gate matches', () => {
  const hit = smash(true, true)
  const miss = smash(true, false)
  assert.equal('straight' in hit && hit.right, true)
  assert.equal('straight' in miss && miss.straight && miss.right === false, true)
  assert.equal('refused' in smash(false, true), true)
  assert.equal('right' in line([]) === false, true)
  const good = line([hit as { straight: true; right: boolean }])
  const bad = line([hit as { straight: true; right: boolean }, miss as { straight: true; right: boolean }])
  assert.equal('right' in good && good.right, true)
  assert.equal('straight' in bad && bad.straight && bad.right === false, true)
})
