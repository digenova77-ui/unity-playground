import assert from 'node:assert/strict'
import test from 'node:test'
import { warpEase, warpIntensity } from './warp.ts'

test('warp ease starts at rest, commits, and finishes at the body', () => {
  assert.equal(warpEase(0), 0)
  assert.equal(warpEase(1), 1)
  let prev = -1
  for (let i = 0; i <= 20; i++) {
    const v = warpEase(i / 20)
    assert.ok(v >= prev)
    prev = v
  }
  assert.ok(warpEase(0.5) > 0.45)
})

test('warp intensity clears before the jump is over', () => {
  assert.equal(warpIntensity(0), 0)
  assert.equal(warpIntensity(0.4), 1)
  assert.equal(warpIntensity(1), 0)
  assert.ok(warpIntensity(0.9) < 0.5)
})
