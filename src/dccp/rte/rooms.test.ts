import assert from 'node:assert/strict'
import test from 'node:test'
import { draftFrom, meshDrafts, pearson, roomWords } from './rooms.ts'

test('a flat log is not a room, and shared sources mesh into one', () => {
  assert.equal(pearson([1, 1, 1], [2, 2, 2]), null)
  assert.ok((pearson([1, 2, 3, 4], [2, 4, 6, 8]) ?? 0) > 0.99)
  const flat = draftFrom([
    { id: 'kcal', name: 'Calories logged', values: [0, 0, 0, 0] },
    { id: 'protein', name: 'Protein logged', values: [0, 0, 0, 0] },
  ])
  assert.equal(flat.length, 0)
  assert.match(roomWords(flat, 0, true), /not a room/)
  const drafts = draftFrom([
    { id: 'kcal', name: 'Calories logged', values: [1, 2, 3, 4] },
    { id: 'protein', name: 'Protein logged', values: [2, 4, 6, 8] },
    { id: 'carbs', name: 'Carbs logged', values: [1, 2, 3, 4] },
  ])
  assert.equal(drafts.length, 3)
  const meshed = meshDrafts(drafts)
  assert.equal(meshed.length, 1)
  assert.deepEqual(meshed[0].sources, ['carbs', 'kcal', 'protein'])
  assert.match(roomWords(meshed, 1, false), /not shared/)
})
