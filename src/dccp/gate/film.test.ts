import assert from 'node:assert/strict'
import test from 'node:test'
import { BEATS, FILM_MS } from './film.ts'

test('the 2D gate is one minute and the finger is last', () => {
  assert.equal(BEATS[0].at, 0)
  assert.equal(BEATS.reduce((sum, beat) => sum + beat.hold, 0), FILM_MS)
  assert.equal(BEATS.at(-1)?.at, FILM_MS - BEATS.at(-1)!.hold)
  assert.equal(BEATS.filter(beat => beat.finger).length, 1)
  assert.equal(BEATS.at(-1)?.finger, true)
  assert.equal(BEATS.at(-1)?.kicker, 'The finger')
  assert.equal(BEATS.some(beat => beat.finger && beat.at < 52_000), false)
  assert.match(BEATS.find(beat => beat.light === 'cut')?.line ?? '', /two coins/)
  assert.equal(BEATS.find(beat => beat.light === 'cut')?.finger, false)
})
