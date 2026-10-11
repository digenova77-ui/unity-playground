import assert from 'node:assert/strict'
import { test } from 'node:test'
import { heldReading, joinAlmanac, parseLanguages, parseWbMeta, parseWbSeries, type SeriesPoint } from './almanac.ts'

const point = (value: number, year = '2024'): SeriesPoint => ({ value, year })

test('world bank rows become a held reading, and a missing literacy stays missing', () => {
  const meta = parseWbMeta([{ page: 1 }, [{ id: 'CAN', iso2Code: 'CA', name: 'Canada', capitalCity: 'Ottawa', region: { value: 'North America' }, incomeLevel: { value: 'High income' } }, { id: 'XU', iso2Code: 'XU', name: 'region' }]])
  assert.equal(meta.length, 1)
  assert.equal(meta[0].capital, 'Ottawa')
  const series = parseWbSeries([{ page: 1 }, [{ countryiso3code: 'CAN', date: '2024', value: 96.9 }, { countryiso3code: 'CAN', date: '2023', value: null }]])
  assert.equal(series.get('CAN')?.value, 96.9)
  const held = heldReading(96.9, 100, 2.5)
  assert.equal(held.score, 98.1)
  assert.deepEqual(held.of, ['water', 'energy', 'fed'])
  assert.equal(heldReading(null, null, 2.5).score, null)
  const empty = new Map<string, SeriesPoint>()
  const row = joinAlmanac(meta, {
    population: new Map([['CAN', point(41000000, '2025')]]),
    areaKm2: empty, density: new Map([['CAN', point(4.2, '2023')]]),
    water: new Map([['CAN', point(96.9)]]), energy: new Map([['CAN', point(100)]]),
    undernourished: new Map([['CAN', point(2.5, '2023')]]), literacy: empty,
  }).get('CAN')
  assert.equal(row?.flag, 'https://flagcdn.com/w80/ca.png')
  assert.equal(row?.literacy, null)
  assert.equal(row?.held, 98.1)
  assert.deepEqual(parseLanguages({ results: { bindings: [{ langLabel: { value: 'English' } }, { langLabel: { value: 'French' } }, { langLabel: { value: 'English' } }] } }), ['English', 'French'])
})
