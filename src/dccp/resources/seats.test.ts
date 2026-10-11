import assert from 'node:assert/strict'
import test from 'node:test'
import { placedOffers } from './seats.ts'

test('a national reading sits on that country, and a world aggregate is not pinned', () => {
  const seats = placedOffers([
    { place: 'World', resource: 'Access to electricity', value: 90, unit: '% of people' },
    { place: 'Britain', resource: 'Gas share of electricity', value: 30, unit: '% this half-hour' },
    { place: 'Britain', resource: 'Grid carbon intensity', value: null, unit: '' },
    { place: 'Denmark', resource: 'Electricity CO₂', value: 80, unit: 'g/kWh' },
  ])
  assert.deepEqual(seats.map(seat => seat.id), ['Britain', 'Denmark'])
  assert.equal(seats[0].lat, 54.403)
  assert.match(seats[0].line, /no reading/)
  assert.match(seats[0].note, /not a town/)
  assert.equal(seats[1].lon, 9.018)
})
