import assert from 'node:assert/strict'
import test from 'node:test'
import { mindAsk } from './mind.ts'

test('a matchup uses a held meeting and does not invent the rest', () => {
  const brief = mindAsk('next game against Barrie at home at 7 pm', {
    games: [{ id: 'U16-014', clubs: ['Quinte Red Devils', 'Barrie Jr Colts'] }],
    events: [],
    kcal: 400,
  })
  assert.match(brief?.lines[0] ?? '', /Home/)
  assert.match(brief?.lines[0] ?? '', /7 pm/)
  assert.match(brief?.lines[1] ?? '', /U16-014/)
  assert.match(brief?.speech ?? '', /511 Ontario/)
  assert.match(brief?.speech ?? '', /not invented/)
  const empty = mindAsk('scout the next game', { games: [], events: [], kcal: null })
  assert.match(empty?.lines[1] ?? '', /no meeting/)
  assert.equal(mindAsk('the rink', { games: [], events: [], kcal: null }), null)
})
