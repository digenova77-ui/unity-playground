import assert from 'node:assert/strict'
import test from 'node:test'
import { britainMix, buildSnapshot, denmarkNow, worldBankRow } from './match.ts'

test('world bank rows and live grids parse, and a missing food figure stays a hole', () => {
  const bank = worldBankRow([{ page: 1 }, [{ value: 91.9, date: '2024' }]])
  assert.equal(bank?.year, '2024')
  assert.equal(worldBankRow([{ page: 1 }, [{ value: null, date: '2024' }]]), null)
  const mix = britainMix({ data: { from: '2026-10-05T19:00Z', generationmix: [{ fuel: 'gas', perc: 40 }, { fuel: 'wind', perc: 25 }] } })
  assert.equal(mix?.gas, 40)
  const dk = denmarkNow({ records: [{ CO2Emission: 47.4, OffshoreWindPower: 100, OnshoreWindPower: 50, Minutes1UTC: '2026-10-05T19:46:00' }] })
  assert.equal(dk?.windMw, 150)
  const snap = buildSnapshot({
    electricity: bank,
    water: { value: 73.7, year: '2024' },
    food: null,
    britain: mix,
    carbon: { intensity: 180, index: 'moderate', from: '2026-10-05T19:00Z' },
    denmark: dk,
  })
  const food = snap.offers.find(row => row.id === 'food')
  assert.equal(food?.claim, 'HOLE')
  assert.equal(food?.pressure, null)
  const water = snap.proposals.find(row => row.offerId === 'water')
  assert.ok(water && water.pressure !== null && water.pressure > 0.2 && water.pressure < 0.3)
  assert.equal(water?.settles, false)
  assert.equal(snap.proposals[0].offerId, 'electricity')
  assert.equal(snap.proposals[1].offerId, 'water')
  const gas = snap.offers.find(row => row.id === 'britain-gas')
  assert.equal(gas?.pressure, 0.4)
})
