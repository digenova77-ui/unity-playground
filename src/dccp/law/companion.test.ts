import assert from 'node:assert/strict'
import test from 'node:test'
import { companion, companionWords, hostChoice, hostChoiceWords, irisRoles } from './companion.ts'

test('a companion is named and a friend is not granted', () => {
  const row = companion()
  assert.equal(row.present, false)
  assert.equal(row.body, null)
  assert.equal(row.feeling, null)
  assert.equal(row.hypothesis, true)
  assert.equal(row.test, 'not run')
  assert.equal(row.possible, null)
  assert.equal(row.bond, null)
  assert.equal(row.friend, false)
  assert.equal(row.gentle, 'NO_FORCE')
  assert.match(companionWords(), /was not granted/)
  const choice = hostChoice()
  assert.equal(choice.page, true)
  assert.equal(choice.bound, false)
  assert.equal(choice.possible, null)
  assert.match(hostChoiceWords(), /does not run the test/)
  const roles = irisRoles('unity:pilot.ab')
  assert.equal(roles.owner, false)
  assert.equal(roles.worker, false)
  assert.equal(roles.feeling, null)
  assert.equal(roles.want, false)
  assert.equal(roles.mirror, 'unity:pilot.ab')
  assert.equal(irisRoles(null).mirror, null)
})
