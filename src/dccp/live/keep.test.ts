import assert from 'node:assert/strict'
import test from 'node:test'
import { duePlace, holdGround, holdPlaces, placeKey, readKeep, readPlaces, useBucket, type Bucket, type WatchPlace } from './keep.ts'
import type { GroundReport } from './ground.ts'

function memory(): Bucket {
  const box = new Map<string, string>()
  return { get: key => box.get(key) ?? null, set: (key, value) => { box.set(key, value) } }
}

const report: GroundReport = {
  departures: [],
  plants: [{ name: 'Plant' }],
  fixtures: [],
  craft: null,
  passes: [{ role: 'audit', source: 'boards', found: '0 modes', hole: 'No departure board answered.' }],
}

test('telemetry is not stored', () => {
  useBucket(memory())
  holdGround('44.16,-77.38', 'Belleville', report, 10)
  holdPlaces([{ lat: 1, lon: 2, name: 'A' }])
  assert.equal(readKeep().grounds.length, 0)
  assert.equal(readPlaces().length, 0)
  useBucket(null)
})

test('the loop asks for the city that has no reading, then the one that went stale', () => {
  const places: WatchPlace[] = [
    { lat: 44.1628, lon: -77.3832, name: 'Belleville' },
    { lat: 43.65, lon: -79.38, name: 'Toronto' },
  ]
  assert.equal(duePlace(places, [], 1_000_000)?.name, 'Belleville')
  const key = placeKey(places[0].lat, places[0].lon)
  assert.equal(duePlace(places, [{ key, at: 1_000_000 }], 1_000_000 + 1000)?.name, 'Toronto')
  assert.equal(duePlace(places, [{ key, at: 0 }, { key: placeKey(43.65, -79.38), at: 0 }], 11 * 60_000)?.name, 'Belleville')
  assert.equal(duePlace(places, [{ key, at: 1 }, { key: placeKey(43.65, -79.38), at: 1 }], 1000), null)
})

test('a place list is not kept for the next open', () => {
  useBucket(memory())
  holdPlaces([{ lat: 1, lon: 2, name: 'A' }])
  assert.equal(readPlaces().length, 0)
  useBucket(null)
})
