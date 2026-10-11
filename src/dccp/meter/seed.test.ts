import assert from 'node:assert/strict'
import { test } from 'node:test'
import { mintKey } from './keys.ts'
import { keyPath, liquidate, memberHud, seedReturn, takeDerivative, bookDerivative } from './seed.ts'
import { COSMOGENESIS_SEED } from '../pipe/chain.ts'

test('a derivative of someone else\'s find pays the seed, and nothing is seized', () => {
  const mine = mintKey('mine', 'my paper', true, 'doctor')
  assert.ok('error' in takeDerivative(10, mine, 1, []))
  const theirs = mintKey('bots:1', 'their schematic', true, 'bots')
  const short = takeDerivative(1, theirs, 1, [])
  assert.ok('error' in short)
  if (!('error' in short)) return
  assert.match(short.error, /not liquidated|does not have/)
  const taken = takeDerivative(10, theirs, 1, [])
  assert.ok(!('error' in taken))
  if ('error' in taken) return
  assert.equal(taken.supply, 6)
  assert.equal(theirs.holder, 'bots')
  assert.equal(seedReturn([taken.derivative], 1), 0)
  assert.ok(seedReturn([taken.derivative], 2) > 0)
  assert.equal(liquidate().seized, false)
})

test('booking a derivative pays the finder and climbs back to the same seed', () => {
  const theirs = mintKey('bots:1', 'their schematic', true, 'bots')
  const closed = bookDerivative(50, 50, theirs, 1, [], COSMOGENESIS_SEED, false)
  assert.ok('error' in closed)
  const booked = bookDerivative(50, 50, theirs, 1, [], COSMOGENESIS_SEED, true)
  assert.ok(!('error' in booked))
  if ('error' in booked) return
  assert.equal(booked.doctor + booked.bots, 100)
  assert.equal(booked.doctor, 46)
  assert.equal(booked.bots, 54)
  assert.equal(booked.derivative.seed, COSMOGENESIS_SEED)
  const again = bookDerivative(booked.doctor, booked.bots, theirs, 2, [booked.derivative], COSMOGENESIS_SEED, true)
  assert.ok('error' in again)
})

test('buying a key takes the derivative, not the find', () => {
  const bought = keyPath('buy')
  assert.equal(bought.path, 'derivative')
  assert.equal(bought.findMoves, false)
  assert.equal(bought.hudCopies, false)
  assert.equal(keyPath('work').path, 'work')
  const hud = memberHud('unity:pilot.ab')
  assert.equal(hud.observer, 'unity:pilot.ab')
  assert.equal(hud.brighter, false)
  assert.equal(hud.copied, false)
  assert.match(hud.words, /no second, brighter HUD/i)
  assert.equal(memberHud(null).observer, null)
})
