import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

test('the page does not import the writer log', () => {
  const brain = readFileSync(new URL('../iris/brain.ts', import.meta.url), 'utf8')
  const note = readFileSync(new URL('./testnet-note.ts', import.meta.url), 'utf8')
  assert.doesNotMatch(brain, /write-state/)
  assert.doesNotMatch(brain, /origin\/bootstrap/)
  assert.doesNotMatch(note, /write-state/)
})
