import assert from 'node:assert/strict'
import test from 'node:test'
import { canadaAsk, DOORS } from './canada.ts'

test('Hockey Canada conduct is what the site prints, and a penalty is not invented', () => {
  assert.equal(DOORS.some(door => door.url.startsWith('https://www.hockeycanada.ca/')), true)
  const asked = canadaAsk('what does Hockey Canada say about conduct')
  assert.match(asked?.speech ?? '', /April 1, 2025/)
  assert.match(asked?.speech ?? '', /confidential/)
  assert.match(asked?.speech ?? '', /not invented/)
  assert.equal(canadaAsk('the rink'), null)
})
