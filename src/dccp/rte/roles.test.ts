import assert from 'node:assert/strict'
import test from 'node:test'
import { STYLES, styleAsk, styleSaid } from './roles.ts'

test('a named style is one spot, and a seat that is only asked is a list', () => {
  assert.equal(styleAsk('show me a sniper') && 'name' in styleAsk('show me a sniper')! && (styleAsk('show me a sniper') as { name: string }).name, 'Sniper')
  assert.match('list' in (styleAsk('what kind of left winger') ?? {}) ? (styleAsk('what kind of left winger') as { list: string }).list : '', /Power forward/)
  assert.match('list' in (styleAsk('positional play') ?? {}) ? (styleAsk('positional play') as { list: string }).list : '', /Stay-at-home/)
  assert.equal(styleSaid('show me a sniper'), null)
  assert.equal(styleSaid('he is a sniper')?.name, 'Sniper')
  assert.equal(STYLES.filter(style => style.seat === 'forward').length, 14)
  assert.equal(STYLES.filter(style => style.seat === 'defense').length, 10)
  assert.equal(STYLES.filter(style => style.seat === 'goal').length, 9)
  assert.equal('list' in (styleAsk('two-way') ?? {}), true)
  assert.equal(styleAsk('show me a grinder') && 'line' in (styleAsk('show me a grinder') ?? {}), true)
})
