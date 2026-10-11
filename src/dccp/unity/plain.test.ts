import assert from 'node:assert/strict'
import test from 'node:test'
import { manifesto, PLAIN } from './plain.ts'

test('the speech names no product and no person', () => {
  const text = manifesto()
  assert.equal(text, PLAIN.join(' '))
  assert.equal(/dualis|dccp|digenova|david|logo|father|unity id|playground|till|test supply/i.test(text), false)
  assert.equal(text.includes('The only name on me is the address in the bar.'), true)
  assert.equal(text.includes('the same for a person and for a robot'), true)
  assert.equal(text.includes('bedrock at 0'), true)
  assert.equal(text.includes('The operating system asks on its own.'), true)
  assert.equal(text.includes('It is not sent.'), true)
})
