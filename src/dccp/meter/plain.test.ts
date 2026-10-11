import assert from 'node:assert/strict'
import test from 'node:test'
import { economicsCard, plainEconomics, plainWords, walletBound } from './plain.ts'

test('the desk is three facts and the till stays closed', () => {
  const open = { yours: 100, bots: 0, split: false, yoursMade: 0, botsMade: 0 }
  const split = { yours: 50, bots: 49.26, split: true, yoursMade: 2, botsMade: 5 }
  const whole = plainEconomics(open)
  assert.equal(whole.yours, '100')
  assert.equal(whole.bots, '—')
  assert.equal(whole.till, 'Closed')
  assert.match(whole.rule, /Not a dollar/)
  const half = plainEconomics(split)
  assert.equal(half.yours, '50')
  assert.equal(half.bots, '49.3')
  const card = economicsCard(split)
  assert.match(card, /Till/)
  assert.doesNotMatch(card, /till is open|dollar bill|mnemonic|password/i)
  assert.match(plainWords(split), /draw, not a sale/)
  assert.match(plainWords(open), /Nothing has been given/)
  assert.doesNotMatch(economicsCard({ yours: Number.NaN, bots: 0, split: false, yoursMade: 0, botsMade: 0 }), /You made/)
})

test('a wallet binds only a seated Unity ID', () => {
  assert.match(walletBound({ handle: null, agreed: false, bot: null, founders: 0 }), /Nothing in the wallet is bound/)
  const seated = walletBound({ handle: 'unity:pilot.ab', agreed: true, bot: null, founders: 0 })
  assert.match(seated, /unity:pilot\.ab is the seat/)
  assert.match(seated, /none is listed/)
  assert.match(seated, /three rings and the one seed/)
  assert.match(seated, /not counted from this wallet/)
})
