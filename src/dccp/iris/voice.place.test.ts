import assert from 'node:assert/strict'
import test from 'node:test'
import { ceilingWords, isNeural, pickVoice, SPEAK, splitSentences, voiceScore } from './voice.ts'

test('a Canadian voice is taken over a British one, and the pitch is flat', () => {
  const picked = pickVoice([
    { name: 'Google UK English Female', lang: 'en-GB' },
    { name: 'Microsoft Aria Online (Natural) - English (Canada)', lang: 'en-CA' },
  ])
  assert.equal(picked?.lang, 'en-CA')
  assert.equal(SPEAK.pitch, 1)
  assert.equal(SPEAK.lang, 'en-CA')
  const none = pickVoice([{ name: 'Google UK English Female', lang: 'en-GB' }, { name: 'Samantha', lang: 'en-US' }])
  assert.equal(none?.lang, 'en-US')
  const line = 'The till is closed. A missing fact stays open, and it is not filled.'
  assert.deepEqual(splitSentences(line), [line])
  assert.equal(splitSentences(line, 24).length > 1, true)
  const neural = pickVoice([
    { name: 'English (Canada)', lang: 'en-CA' },
    { name: 'Microsoft Aria Online (Natural) - English (United States)', lang: 'en-US' },
  ])
  assert.equal(neural?.lang, 'en-US')
  assert.equal(isNeural(neural!), true)
  const home = pickVoice([
    { name: 'Microsoft Aria Online (Natural) - English (United States)', lang: 'en-US' },
    { name: 'Microsoft Aria Online (Natural) - English (Canada)', lang: 'en-CA' },
  ])
  assert.equal(home?.lang, 'en-CA')
  const plain = { name: 'English (Canada)', lang: 'en-CA' }
  const named = { name: 'Microsoft Aria Online (Natural) - English (Canada)', lang: 'en-CA' }
  assert.equal(voiceScore(named) > voiceScore(plain), true)
  assert.match(ceilingWords(), /no network of its own/)
  assert.match(ceilingWords(), /Nothing was trained/)
})
