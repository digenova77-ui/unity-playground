import assert from 'node:assert/strict'
import test from 'node:test'
import { publishLine } from './publish.ts'

test('a president and anyone else are judged by the same rule', () => {
  const said = 'you idiot the river is high'
  const office = publishLine('President', said)
  const joe = publishLine('Joe', said)
  assert.equal(office.judgement, 'published')
  assert.equal(joe.judgement, 'published')
  assert.equal(office.publicText, joe.publicText)
  assert.equal(office.recorded, said)
  assert.doesNotMatch(office.publicText ?? '', /idiot/)
  const held = publishLine('President', 'pay the earlier investors with the later money')
  assert.equal(held.judgement, 'withheld')
  assert.equal(held.publicText, null)
  assert.match(held.why, /recorded/)
})
