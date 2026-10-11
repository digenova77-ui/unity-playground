import assert from 'node:assert/strict'
import test from 'node:test'
import { CARE, careAsk } from './care.ts'

test('a care seat faces a person, and no chart is opened', () => {
  assert.equal(CARE.length, 13)
  const visit = careAsk('family doctor')
  assert.match(visit!.speech, /Primary care/)
  assert.match(visit!.speech, /facing seat/)
  assert.match(visit!.speech, /not opened/)
  assert.match(careAsk('mental health')!.speech, /diagnosis is not stored/)
  assert.match(careAsk('the healthcare system')!.speech, /13 rungs/)
  assert.match(careAsk('emergency in Ontario', [{ name: 'Ontario', guard: 'PHIPA', systems: 'Quinte Health' }])!.speech, /Ontario/)
  assert.match(careAsk('emergency in Ontario', [{ name: 'Ontario', guard: 'PHIPA', systems: 'Quinte Health' }])!.speech, /Emergency/)
  assert.match(careAsk('family doctor in Belleville')!.speech, /not seated/)
  assert.match(careAsk('primary care in Kingston', [{ name: 'Ontario', guard: 'PHIPA', systems: 'OLIS' }])!.speech, /Kingston is not held/)
  assert.equal(careAsk('elementary teacher'), null)
})
