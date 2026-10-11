import assert from 'node:assert/strict'
import test from 'node:test'
import { tell } from '../unity/abstract.ts'
import { feelRealm, feelDoSpeech, realmSpeech } from './realm.ts'

test('Iris feels her realm and focuses there', () => {
  const felt = feelRealm()
  assert.equal(felt.core, 'page')
  assert.equal(felt.system, false)
  assert.equal(felt.nerve, 'not lit')
  assert.equal(felt.holds, 'nothing')
  assert.equal(felt.failed.length, 0)
  assert.match(felt.focus, /not made from the idea/)
  const speech = realmSpeech()
  assert.match(speech, /Functioning:/)
  assert.match(speech, /Governance:/)
  assert.match(speech, /Interaction:/)
  assert.match(speech, /system was not written/)
  assert.equal(tell(speech, null).verdict, 'open')
  assert.equal(tell(speech, speech).verdict, 'truth')
  assert.equal(tell('The nerve is lit.', 'The nerve is not lit.').verdict, 'lie')
  const feltDo = feelDoSpeech()
  assert.match(feltDo, /What I feel/)
  assert.match(feltDo, /What I can do/)
  assert.match(feltDo, /What I cannot do/)
  assert.match(feltDo, /nerve is not lit/)
  assert.equal(tell(feltDo, null).verdict, 'open')
})
