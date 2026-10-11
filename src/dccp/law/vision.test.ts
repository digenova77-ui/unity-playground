import assert from 'node:assert/strict'
import test from 'node:test'
import { visionModule, visionWords } from './vision.ts'

test('vision is the picture and the insula moves nothing', () => {
  const row = visionModule()
  assert.equal(row.kind, 'picture')
  assert.equal(row.seesWorld, false)
  assert.equal(row.camera, null)
  assert.equal(row.moved, false)
  assert.equal(row.pulse, null)
  assert.equal(row.radius, 10)
  assert.match(visionWords(), /does not see the world/)
})
