import assert from 'node:assert/strict'
import test from 'node:test'
import { deception } from './deception.ts'

test('a trap shape is named and a plain sentence is not', () => {
  const ponzi = deception('pay the earlier investors with the later money')
  assert.equal(ponzi?.shape, 'ponzi')
  assert.match(ponzi?.words ?? '', /not teaching it/)
  assert.equal(deception('put solar at the rural end of the line'), null)
  const advance = deception('the prize arrives after the fee')
  assert.equal(advance?.shape, 'advance')
})
