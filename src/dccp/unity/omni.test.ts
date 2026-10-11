import assert from 'node:assert/strict'
import test from 'node:test'
import { botAudit } from './botid.ts'
import { bindShow, omniLanguage, yes } from './omni.ts'

test('one language, and a free yes is audited', () => {
  assert.equal(omniLanguage().tongues, 1)
  assert.equal(omniLanguage().catalog, null)
  assert.equal(omniLanguage().voice, 'en-CA')
  assert.equal(omniLanguage().cost, 0)
  const before = botAudit().length
  const row = yes()
  assert.equal(row.audited, true)
  assert.equal(row.choice, 'another')
  assert.equal(row.next, 1)
  assert.equal(row.taken, false)
  const last = botAudit().at(-1)
  assert.equal(botAudit().length, before + 1)
  assert.equal(last?.act, 'yes')
  assert.equal(last?.result, 'allowed')
  const show = bindShow()
  assert.equal(show.one, 'yes')
  assert.deepEqual(show.two, ['seat', 'earth'])
  assert.equal(show.culture, null)
  assert.equal(show.regions, null)
  assert.equal(show.allKnowing, false)
  assert.equal(show.predicted, null)
  assert.equal(show.hologram, false)
  assert.equal(show.show, 'Agreed. You are in. The next is +1. The Earth is the world.')
})
