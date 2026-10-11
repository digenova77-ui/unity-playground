import assert from 'node:assert/strict'
import test from 'node:test'
import { modeledPlay, playAsk } from './plays.ts'

test('a named schematic is one play, and a sheet that names nothing chooses nothing', () => {
  const drawn = playAsk('draw the 1-2-2')
  assert.equal('spots' in drawn! && drawn.spots.length, 5)
  assert.equal('choice' in (playAsk('draw the forecheck') ?? {}), true)
  assert.equal(modeledPlay(null), null)
  assert.equal(modeledPlay('umbrella')?.name, 'Umbrella')
})
