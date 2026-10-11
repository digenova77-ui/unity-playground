import assert from 'node:assert/strict'
import test from 'node:test'
import { crossRate, kelly, kellyPartials, priceImpact, pricingIndex } from './markets.ts'

test('the formulas run on supplied numbers, and the pricing index is empty', () => {
  assert.ok(Math.abs((kelly(0.55, 0.4) ?? 0) - 0.25) < 1e-12)
  assert.equal(kelly(0.4, 0.4), null)
  assert.equal(kellyPartials(0.55, 0.4)?.dp, 1 / 0.6)
  assert.equal(priceImpact(0.5, 1), 0.25)
  assert.equal(crossRate(null, 1), null)
  assert.equal(crossRate(1.1, 0.9), 0.9 / 1.1)
  assert.deepEqual(pricingIndex(), { kelly: null, fx: null, cpi: null, book: false, assetDoor: 'Unity ID' })
})
