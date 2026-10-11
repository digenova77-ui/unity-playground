import assert from 'node:assert/strict'
import test from 'node:test'
import { engineer } from './works.ts'

test('open readings become work, and a blocked path is not a route', () => {
  const open = engineer([
    { offerId: 'electricity', pressure: 0.2 },
    { offerId: 'britain-gas', pressure: 0.4 },
    { offerId: 'food', pressure: 0.6 },
  ], 'open')
  assert.equal(open.lines.length, 3)
  assert.match(open.words, /does not build a plant/)
  assert.match(open.words, /No new field/)
  assert.match(open.words, /does not ship/)
  const hole = engineer([], 'open')
  assert.match(hole.words, /not redesigned from a hole/)
  const blocked = engineer([{ offerId: 'food', pressure: 0.9 }], 'blocked')
  assert.match(blocked.words, /not a route/)
  assert.equal(blocked.lines.length, 1)
})
