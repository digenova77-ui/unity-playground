import assert from 'node:assert/strict'
import test from 'node:test'
import { clockDelay, liveMeta, metaD, modelGaps, widthRatio, type ConfidenceTrial } from './metad.ts'

test('no ratings are held, and a labeled synthetic observer can be fit', () => {
  assert.equal(liveMeta(), null)
  assert.equal(metaD([]), null)
  let seed = 7
  const next = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 4294967296
  }
  const gaussian = () => Math.sqrt(-2 * Math.log(next())) * Math.cos(2 * Math.PI * next())
  const trials: ConfidenceTrial[] = []
  for (let i = 0; i < 400; i++) {
    const signal = next() < 0.5
    const x = gaussian() + (signal ? 0.75 : -0.75)
    trials.push({ signal, saidYes: x > 0, high: Math.abs(x) > 0.8 })
  }
  const fit = metaD(trials)
  assert.ok(fit)
  assert.ok(fit.meta > 0.8 && fit.meta < 2.2)
  assert.equal(fit.equalWidth, true)
  assert.equal(widthRatio(2, 1), 2)
  assert.equal(widthRatio(null, 1), null)
  assert.equal(clockDelay(10, 40), 30)
  assert.equal(clockDelay(40, 10), null)
  assert.equal(modelGaps().oneSentence, null)
})
