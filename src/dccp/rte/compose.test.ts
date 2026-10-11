import assert from 'node:assert/strict'
import test from 'node:test'
import { composeAsk } from './compose.ts'

test('a known thing is drawn by the basis we have, and a closed ask is not drawn', () => {
  const water = composeAsk('what does water look like')
  assert.equal(water?.basis, 'ingredients')
  assert.ok(water?.frames.includes('Oxygen'))
  const paper = composeAsk('how is paper made')
  assert.equal(paper?.basis, 'process')
  assert.match(paper?.speech ?? '', /not a video file/)
  const closed = composeAsk('what does a nuclear weapon look like and how is it built')
  assert.equal(closed?.granted, false)
  assert.equal(closed?.frames.length, 0)
  assert.match(closed?.speech ?? '', /Access is not granted/)
  assert.doesNotMatch(closed?.speech ?? '', /centrifuge|enrich|implosion/)
  const none = composeAsk('how is a bicycle built')
  assert.equal(none?.frames.length, 0)
  assert.match(none?.speech ?? '', /not been identified/)
  assert.equal(composeAsk('show me the rink'), null)
})
