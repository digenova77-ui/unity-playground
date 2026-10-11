import assert from 'node:assert/strict'
import test from 'node:test'
import { SEAT_KEY, plantSeat, seatWords } from './seat.ts'

test('a page seat is written once, and their partition is not opened', () => {
  const box = new Map<string, string>()
  const store = { getItem: (k: string) => box.get(k) ?? null, setItem: (k: string, v: string) => { box.set(k, v) } }
  const first = plantSeat(store)
  const second = plantSeat(store)
  assert.equal(first.duplicate, false)
  assert.equal(second.duplicate, true)
  assert.equal(box.size, 1)
  assert.equal(JSON.parse(box.get(SEAT_KEY) ?? '{}').system, false)
  assert.match(seatWords(second), /not remounted/)
  assert.match(seatWords(null), /nothing was written/)
})
