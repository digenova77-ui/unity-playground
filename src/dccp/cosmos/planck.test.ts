import assert from 'node:assert/strict'
import test from 'node:test'
import { figureAcuity, figureWords, ladder, physicalLink, physicalWords, planckWords } from './planck.ts'

test('the ladder has two ends and nothing held between them', () => {
  const row = ladder()
  assert.equal(row.between, null)
  assert.match(row.bottom, /CODATA 2022/)
  assert.match(planckWords(), /not an edge of spacetime/)
  assert.match(planckWords(), /None of those orders was walked/)
  assert.equal(physicalLink().between, null)
  assert.equal(physicalLink().coordinates, null)
  assert.match(physicalWords(), /further derivative is not held/)
  assert.equal(figureAcuity().finer, false)
  assert.equal(figureAcuity().ordersWalked, 0)
  assert.equal(figureAcuity().figures, 7)
  assert.match(figureWords(), /invent a digit/)
})
