import assert from 'node:assert/strict'
import test from 'node:test'
import { BIO, WALLET_DOOR } from './unityid.ts'
import { authStandards, scope, standardsWords } from './standards.ts'

test('the wallet door is a body check, and this page stores none of it', () => {
  assert.equal(BIO.userVerification, 'required')
  assert.equal(BIO.authenticatorAttachment, 'platform')
  assert.match(WALLET_DOOR, /No password/)
  assert.match(WALLET_DOOR, /never sees/)
  assert.match(standardsWords(), /No words to remember/)
  assert.doesNotMatch(standardsWords(), /word list to write down|seed phrase/)
})

test('one ceremony is adopted, and a second door is not stored', () => {
  const row = authStandards()
  assert.equal(row.stored, false)
  assert.ok(row.adopted.includes('W3C WebAuthn'))
  assert.ok(row.secondDoor.includes('passwords'))
  assert.match(standardsWords(), /Unity ID carries that name/)
  assert.equal(scope().assets, null)
  assert.equal(scope().seat, 'W3C WebAuthn / FIDO2')
})
