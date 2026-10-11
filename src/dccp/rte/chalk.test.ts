import assert from 'node:assert/strict'
import test from 'node:test'
import { chalkLine, opponentOf, priorGames, theirLook } from './chalk.ts'

test('a named opponent is counted only from held games, and their look is a separate drawing', () => {
  assert.equal(opponentOf('what should we do against barrie'), 'barrie')
  assert.equal(opponentOf('draw the 1-2-2 against their umbrella'), null)
  assert.equal(priorGames([{ clubs: ['Quinte', 'Barrie'] }, { clubs: ['Kingston', 'Whitby'] }], 'barrie'), 1)
  assert.equal(theirLook('draw the 1-2-2 against their umbrella')?.spots.length, 5)
  assert.match(chalkLine('against barrie', []) ?? '', /Held games 0/)
  assert.match(chalkLine('against barrie', []) ?? '', /not chosen/)
})
