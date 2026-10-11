import assert from 'node:assert/strict'
import test from 'node:test'
import { botTell, formIdea, formTrade, notInvoked, openHybrid, searchKeys, sessionKept, writeForward } from './form.ts'

test('an idea appears as itself, and the build does not start', () => {
  const formed = formIdea('a quiet rink at dawn')
  assert.equal(formed.image, 'a quiet rink at dawn')
  assert.match(formed.speech, /speed of the thought/)
  assert.match(formed.speech, /has not started/)
  assert.match(formed.speech, /Nothing was added/)
  assert.equal(formIdea('   ').image, '')
})

test('a business forms as the offer, and nothing is sold', () => {
  const trade = formTrade('a business that sharpens skates before the game')
  assert.match(trade?.speech ?? '', /speed of the thought/)
  assert.match(trade?.speech ?? '', /Nothing was sold/)
  assert.match(trade?.speech ?? '', /till stays closed/)
  assert.equal(formTrade('the rink'), null)
})

test('a forward write can only be the idea or the law', () => {
  formIdea('a quiet rink at dawn')
  assert.equal(writeForward('it is formed and not built').accepted, true)
  const refused = writeForward('it costs 40 dollars')
  assert.equal(refused.accepted, false)
  assert.match(refused.speech, /will not write anything else/)
})

test('a slow bot is not a DCLM write', () => {
  assert.match(botTell(), /speed of the thought/)
  assert.match(botTell(), /slow side/)
  assert.match(botTell(), /holds nothing/)
})

test('a slow pass is not a DCLM invocation', () => {
  assert.match(notInvoked(), /was not invoked/)
  assert.match(notInvoked(), /4\.5 seconds/)
  assert.match(notInvoked(), /never rewrite/)
})


test('a super session keeps only a write that passes', () => {
  assert.match(openHybrid('make this a hybrid'), /Say super session/)
  openHybrid('super session: a quiet rink at dawn')
  assert.equal(writeForward('it is formed and not built').accepted, true)
  assert.equal(sessionKept().length, 1)
  assert.equal(writeForward('it costs 40 dollars').accepted, false)
  assert.equal(sessionKept().length, 1)
})

test('a search stays inside the known key stores', () => {
  const hit = searchKeys('search keys schematic', [{ id: 'bot-1', claim: 'schematic' }, { id: 'secret', claim: 'PRIVATE KEY' }])
  assert.match(hit, /bot-1: schematic/)
  assert.equal(hit.includes('PRIVATE KEY'), false)
  const miss = searchKeys('search keys passport', [{ id: 'bot-1', claim: 'schematic' }])
  assert.match(miss, /None held/)
  assert.match(miss, /DCLM holds no keys/)
})





