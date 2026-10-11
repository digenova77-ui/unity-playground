import assert from 'node:assert/strict'
import test from 'node:test'
import { ELEMENTS, seatOf, tableAsk } from './elements.ts'

test('the table seats 118, and a life-science ask only lights the six', () => {
  assert.equal(ELEMENTS.length, 118)
  assert.equal(ELEMENTS.at(-1)?.symbol, 'Og')
  const carbon = ELEMENTS.find(el => el.symbol === 'C')
  assert.equal(carbon?.z, 6)
  assert.equal(carbon?.group, 14)
  const iron = ELEMENTS.find(el => el.symbol === 'Fe')
  assert.equal(iron?.group, 8)
  const lanthanum = ELEMENTS.find(el => el.symbol === 'La')
  assert.equal(lanthanum?.block, 'f')
  assert.ok(seatOf(lanthanum!).z > seatOf(carbon!).z)
  const life = tableAsk('open life sciences')
  assert.equal(life?.life, true)
  assert.match(life?.speech ?? '', /do not hold a second/)
  const one = tableAsk('show me iron')
  assert.equal(one?.mark, 'Fe')
  assert.equal(tableAsk('what does carbon dioxide look like'), null)
})
