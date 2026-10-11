import assert from 'node:assert/strict'
import test from 'node:test'
import { liquidAsk } from './liquid.ts'

test('a game question redraws an empty rink, and a molecule or a tube only when this room can draw it', () => {
  const game = liquidAsk('how did I perform in the game last week')
  assert.equal(game?.form, 'rink')
  assert.equal(game?.lines.some(line => /\d/.test(line)), false)
  assert.match(game?.speech ?? '', /hole is the answer/)
  assert.equal(/stacy/i.test(game?.speech ?? ''), false)
  assert.equal(liquidAsk('show me a water molecule')?.shape, 'water')
  assert.equal(liquidAsk('what does it look like to fly in a hyperloop')?.form, 'tube')
  assert.equal(liquidAsk("what's the weather in Belleville"), null)
})
