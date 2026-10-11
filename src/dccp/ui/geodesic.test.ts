import assert from 'node:assert/strict'
import test from 'node:test'
import { aimDegrees, CONTROL_FACES, solidFaces } from './geodesic.ts'

test('the solid has twenty faces and each one is a control', () => {
  const faces = solidFaces()
  assert.equal(faces.length, 20)
  assert.equal(CONTROL_FACES.length, 20)
  assert.equal(faces.filter(face => face.id).length, 20)
  assert.equal(faces[0].label, 'Mic')
  assert.equal(faces[19].id, 'cards')
})

test('aiming +Z leaves the solid unturned, and +X yaws a quarter turn', () => {
  const front = aimDegrees([0, 0, 1])
  assert.ok(Math.abs(front.pitch) < 0.01)
  assert.ok(Math.abs(front.yaw) < 0.01)
  const side = aimDegrees([1, 0, 0])
  assert.ok(Math.abs(side.yaw + 90) < 0.01)
  assert.ok(Math.abs(side.pitch) < 0.01)
})
