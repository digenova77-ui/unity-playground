import assert from 'node:assert/strict'
import test from 'node:test'
import { lineOf, passLive } from './cloud.ts'

test('a live line passes through and the body is not kept', () => {
  const fat = 'x'.repeat(4000)
  const quakes = { features: [{ properties: { place: fat } }] }
  const line = lineOf('quakes', quakes)
  assert.equal(line, '1 events')
  assert.equal(passLive(true, line), '1 events')
  assert.equal(passLive(false, line), null)
  assert.equal(String(line).includes(fat), false)
  assert.equal(lineOf('weather', { tempC: 12 }), '12°C')
  assert.equal(lineOf('weather', {}), null)
})
