import assert from 'node:assert/strict'
import test from 'node:test'
import { adoptionCriteria, releaseIp, releaseWords } from './release.ts'

test('adoption has four empty facts, and a city lock is not global', () => {
  assert.deepEqual(adoptionCriteria(), { who: null, act: null, share: null, source: null })
  assert.deepEqual(releaseIp(), { released: false, adoption: null })
  assert.match(releaseWords(), /Who counts/)
  assert.match(releaseWords(), /not global/)
  assert.match(releaseWords(), /not a license/)
})
