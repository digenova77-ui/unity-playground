import assert from 'node:assert/strict'
import test from 'node:test'
import { JOINTS, correlates, overlayWords } from './overlay.ts'

test('a joint touches Unity and keeps its hole', () => {
  assert.equal(JOINTS.filter(row => row.hole === null).map(row => row.name).join(','), 'Unity')
  assert.equal(correlates('Unity', 'Decision').touch, true)
  assert.match(correlates('Unity', 'Decision').hole ?? '', /not a dollar/)
  assert.equal(correlates('Unity', 'eFuse').touch, true)
  assert.equal(correlates('Book', 'Bet').touch, false)
  assert.equal(correlates('Unity', 'Missing').touch, false)
  assert.match(overlayWords(), /till is closed/)
  assert.match(overlayWords(), /not utility of wealth/)
  assert.match(overlayWords(), /Nothing below the father/)
})
