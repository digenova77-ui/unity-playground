import assert from 'node:assert/strict'
import test from 'node:test'
import { classifyActivity, heldActivity, inBelleville, parseActivitySparql } from './activity.ts'

test('a house and a destroyed theatre do not sit, and an empty class stays a hole', () => {
  const activity = classifyActivity([
    { name: '11 Charlotte Street', types: ['house'] },
    { name: 'Belle Theatre', types: ['destroyed building or structure', 'movie theater'] },
    { name: 'Belleville City Hall', types: ['city hall'] },
    { name: 'Taste of Country', types: ['bakery', 'shop'] },
  ], true)
  const publicLine = activity.lines.find(line => line.bucket === 'Public')
  assert.deepEqual(publicLine?.names, ['Belleville City Hall'])
  assert.equal(activity.lines.some(line => line.names.includes('Belle Theatre')), false)
  assert.equal(activity.holes.some(hole => hole.startsWith('Malls:')), true)
  assert.equal(activity.holes.some(hole => hole.startsWith('Healthcare:')), true)
  assert.equal(inBelleville(44.16, -77.38), true)
  assert.equal(inBelleville(43.65, -79.38), false)
  const held = heldActivity()
  assert.equal(held.live, false)
  assert.equal(held.lines.some(line => line.bucket === 'Grocery'), false)
  assert.equal(held.lines.some(line => line.bucket === 'Radio' && line.names.some(name => name.startsWith('CJBQ'))), true)
  assert.equal(activity.lines.some(line => line.bucket === 'Radio'), false)
  const parsed = parseActivitySparql({ results: { bindings: [{ itemLabel: { value: 'Loyalist College' }, typeLabel: { value: 'college' } }] } })
  assert.equal(parsed[0].name, 'Loyalist College')
})
