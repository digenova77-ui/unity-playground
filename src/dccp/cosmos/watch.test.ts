import assert from 'node:assert/strict'
import test from 'node:test'
import { bothWays, bodyKind, friction, lunar, parseCad, perspectives, runCycle } from './watch.ts'

const SAMPLE = {
  signature: { source: 'NASA/JPL SBDB Close Approach Data API', version: '1.5' },
  count: 2,
  total: 36,
  fields: ['des', 'orbit_id', 'jd', 'cd', 'dist', 'dist_min', 'dist_max', 'v_rel', 'v_inf', 't_sigma_f', 'h'],
  data: [
    ['2025 UK9', '1', '2461344.6', '2026-Oct-31 02:35', '0.0021032915876806', '0.0005765819642422', '0.00377866262208323', '7.834', '7.67', '01:00', '29.83'],
    ['C/2026 A1', '2', '2461321.9', '2026-Oct-08 10:57', '0.02', '0.019', '0.021', '9.05', '9.0', '00:14', '12'],
  ],
}

test('a JPL page is parsed, a comet is a comet, and the walk returns to Earth', () => {
  const page = parseCad(SAMPLE)
  assert.equal(page?.total, 36)
  assert.equal(page?.rows[0].kind, 'asteroid')
  assert.equal(bodyKind('C/2026 A1'), 'comet')
  assert.equal(bodyKind('1P'), 'comet')
  assert.equal(page?.rows[1].kind, 'comet')
  const pass = bothWays(page!.rows)
  assert.equal(pass.nearest?.des, '2025 UK9')
  assert.match(pass.out, /^Out from Earth, nearest first: 2025 UK9/)
  assert.match(pass.back, /2025 UK9\.$/)
  assert.ok(lunar(page!.rows[0].distAu) < 1)
  assert.ok(friction(page!.rows[0].distAu) > friction(page!.rows[1].distAu))
  const view = perspectives(page!.rows[0])
  assert.match(view.earth, /From Earth/)
  assert.match(view.earth, /not a claim it passes the Moon/)
  assert.match(view.object, /From 2025 UK9/)
  assert.match(view.object, /not a camera/)
  const report = runCycle(SAMPLE, 1)
  assert.deepEqual(report.steps, ['GATHER', 'CALCULATE', 'ANALYZE', 'RECALCULATE'])
  assert.match(report.words, /Do not steer/)
  assert.equal(report.zones.every(zone => zone.real && zone.census === null), true)
  assert.equal(parseCad({}), null)
  assert.equal(runCycle(null, 2).page, null)
})
