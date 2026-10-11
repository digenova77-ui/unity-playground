import assert from 'node:assert/strict'
import { test } from 'node:test'
import { canPredictWords, curveWords, frontierWords, heldCurve, neutralize, predictWords, shrinkWords, unmappedShare, wakeDream } from './shrink.ts'

test('missing pieces do not close the gap, and a seat at the time can', () => {
  assert.deepEqual(unmappedShare(25, 1), { mapped: 25, gaps: 1, of: 26 })
  assert.equal(neutralize(1, 0), 1)
  assert.equal(neutralize(1, 1), 0)
  const said = shrinkWords(25, 1)
  assert.match(said, /does not say the playground shrinks because pieces are missing/)
  assert.match(said, /not on this device/)
  assert.match(said, /does not shrink space/)
  assert.match(frontierWords(), /Because next exists/)
  assert.match(predictWords(), /^No\./)
  assert.match(canPredictWords(), /already force/)
  assert.match(canPredictWords(), /what next contains/)
})

test('a slope is the claim the held points already make, and it is not the next point', () => {
  const two = heldCurve([{ x: 0, y: 0 }, { x: 2, y: 4 }])
  assert.equal('slope' in two && two.slope, 2)
  assert.equal('next' in two && two.next, null)
  const three = heldCurve([{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 3, y: 1 }])
  assert.equal('curvature' in three && three.curvature, -1 / 3)
  assert.equal('refused' in heldCurve([{ x: 0, y: 0 }]), true)
  assert.match(curveWords(), /not the next point|does not say what the next|Neither one says/)
})

test('a forced claim is dreamed awake, and a bare possibility is not', () => {
  const dreamed = wakeDream(true)
  assert.equal(dreamed.asleep, false)
  assert.equal(dreamed.dreamed, true)
  const open = wakeDream(false)
  assert.equal(open.dreamed, false)
  assert.match(open.words, /not dreamed/)
})
