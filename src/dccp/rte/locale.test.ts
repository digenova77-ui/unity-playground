import assert from 'node:assert/strict'
import test from 'node:test'
import { indexCounts, indexKey } from './index.ts'
import { localeAsk } from './locale.ts'

test('Belleville corners and addresses are keys, identified and not yet stood at', () => {
  const counts = indexCounts()
  assert.ok(counts.streets > 2000)
  assert.ok(counts.corners > 1000)
  assert.ok(counts.addresses > 6000)
  const hit = localeAsk('show me the intersection of Front Street and Bridge Street in Belleville')
  assert.match(hit?.lines.join(' ') ?? '', /node\/697771055/)
  assert.match(hit?.speech ?? '', /Not stood at|None is validated/)
  assert.match(hit?.speech ?? '', /Street View is not connected/)
  const key = indexKey('node/697771055')
  assert.equal(key?.identified, true)
  assert.equal(key?.validated, false)
  assert.match(key?.audit ?? '', /OpenStreetMap/)
  const none = localeAsk('show me the intersection of King and Queen in Toronto')
  assert.equal(none?.pin, undefined)
})

test('a Belleville street or identifier is drawn from the index only', () => {
  const street = localeAsk('show me Dundas Street in Belleville')
  assert.ok(street?.pin)
  assert.match(`${street?.lines.join(' ')} ${street?.speech}`, /way\/\d+/)
  assert.match(street?.speech ?? '', /^The sandbox stays Universal\./)
  assert.match(street?.speech ?? '', /ways matched/)
  assert.match(street?.speech ?? '', /identified and not stood at/i)
  assert.match(street?.speech ?? '', /Street View is not connected/)
  assert.ok((street?.lines.length ?? 0) > 0)
  assert.ok((street?.lines.length ?? 0) <= 6)
  const listed = street?.lines[0]?.split(' ')[0] ?? ''
  const way = indexKey(listed)
  assert.equal(listed.startsWith('way/'), true)
  assert.deepEqual(street?.pin, way ? { lat: way.lat, lon: way.lon } : undefined)

  const node = localeAsk('show me node/697771055')
  const key = indexKey('node/697771055')
  assert.deepEqual(node?.pin, key ? { lat: key.lat, lon: key.lon } : undefined)
  assert.match(node?.lines.join(' ') ?? '', /node\/697771055/)
  assert.equal(node?.lines.length, 1)
  assert.match(node?.speech ?? '', /identified and not stood at/i)

  const missing = localeAsk('show me way/does-not-exist')
  assert.equal(missing?.pin, undefined)
  assert.match(`${missing?.speech ?? ''} ${missing?.lines.join(' ') ?? ''}`, /not an identifier/i)
})

