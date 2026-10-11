import assert from 'node:assert/strict'
import { test } from 'node:test'
import { clock, departureLine, missingBoards, parseDepartures, parsePlants, parseStops, pickStops, type Departure } from './ground.ts'

test('stops, a live bus, and a missing subway stay distinct', () => {
  const stops = parseStops([
    { stopId: 'bus-1', name: 'College', lat: 44.19, lon: -77.35, modes: ['BUS'] },
    { stopId: 'rail-1', name: 'Station', lat: 44.17, lon: -77.39, modes: ['RAIL'] },
    { stopId: 'bus-2', name: 'Far', lat: 40, lon: -70, modes: ['BUS'] },
  ])
  const picked = pickStops(stops, 44.16, -77.38, 3)
  assert.deepEqual(picked.map(s => s.stopId), ['rail-1', 'bus-1'])
  const deps = parseDepartures({
    stopTimes: [{
      mode: 'BUS', routeShortName: '6', headsign: '6A TO TERMINAL', agencyName: 'Belleville Transit', realTime: true,
      place: { name: '648 College Street East', tz: 'America/Toronto', departure: '2026-10-05T21:37:00Z', scheduledDeparture: '2026-10-05T21:19:00Z', modes: ['BUS'] },
    }],
  })
  assert.equal(deps[0].live, true)
  assert.equal(clock(deps[0].depart, deps[0].tz), '17:37')
  assert.match(departureLine(deps[0]), /Bus 6 6A TO TERMINAL · 17:37 live/)
  assert.ok(missingBoards(deps).includes('Subway: no departure was returned'))
  assert.ok(missingBoards(deps).includes('Air: no departure was returned'))
  assert.deepEqual(parsePlants({ elements: [{ tags: { name: 'Belleville WPCP' } }, { tags: {} }] }), [{ name: 'Belleville WPCP' }])
  const blank: Departure[] = []
  assert.equal(missingBoards(blank).length, 7)
})
