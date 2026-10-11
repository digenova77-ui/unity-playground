import assert from 'node:assert/strict'
import test from 'node:test'
import { boardLine, holdBoard, hudlFor, readBoard } from './hudl.ts'

test('a Unity ID finds no one on Hudl, and a public board keeps clubs only', () => {
  const asked = hudlFor('unity:pilot.abc')
  assert.equal(asked.found, false)
  assert.match(asked.said, /not a Hudl key/)
  const look = readBoard({
    games: [{ gameState: 'LIVE', awayTeam: { abbrev: 'PHI', score: 1 }, homeTeam: { abbrev: 'TBL', score: 0 }, teamLeaders: [{ name: 'Not Kept' }], goals: [{ name: 'Not Kept' }] }],
  }, '2026-10-05')
  assert.equal(JSON.stringify(look).includes('Not Kept'), false)
  assert.equal(look.games[0]?.away, 'PHI')
  holdBoard(look)
  assert.match(boardLine(), /PHI and TBL/)
  assert.match(boardLine(), /Not Hudl/)
})
