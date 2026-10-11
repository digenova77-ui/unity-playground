import assert from 'node:assert/strict'
import test from 'node:test'
import { commitLong, longTerm, memoryLink, memoryWords, rememberLong, rememberShort, useMemoryStore } from './memory.ts'

test('short memory dies with the process and an empty device recalls nothing', () => {
  useMemoryStore(null)
  const held = rememberShort('one line')
  assert.equal(held.durable, false)
  assert.equal(held.held >= 1, true)
  assert.equal(longTerm().survives, false)
  assert.equal(longTerm().recalled, null)
  const link = memoryLink()
  assert.equal(link.moved, false)
  assert.equal(link.place, 'open')
  assert.equal(link.pulse, null)
  assert.match(memoryWords(), /another room is not this store/)
})

test('a long line is kept once on the device and a repeat is not written again', () => {
  const bag = new Map<string, string>()
  useMemoryStore({
    get: key => bag.get(key) ?? null,
    set: (key, value) => { bag.set(key, value) },
  })
  const first = rememberLong('a held line')
  const again = rememberLong('a held line')
  assert.equal(first.stored, true)
  assert.equal(first.survives, true)
  assert.equal(again.repeat, true)
  assert.equal(again.stored, false)
  assert.equal(longTerm().recalled, 'a held line')
  rememberShort('from this process')
  const committed = commitLong()
  assert.equal(committed.recalled, 'from this process')
  useMemoryStore(null)
})
