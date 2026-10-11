import assert from 'node:assert/strict'
import test from 'node:test'
import { holdSheet, readSheet, sheetLine, sheetUrl } from './sheet.ts'

test('a public game row is two clubs, and a player page is not opened', () => {
  assert.equal(sheetUrl('players'), null)
  assert.match(sheetUrl('scores') ?? '', /15488/)
  const page = 'Game U16-014 Regular Season Quinte Red Devils (1 - 0 - 0) U16 East Barrie AAA ZONE (0 - 1 - 0) U16 East'
  const look = readSheet(page, 'scores', '2026-10-05')
  assert.equal(look.blocked, false)
  assert.equal(look.games[0]?.id, 'U16-014')
  assert.equal(look.games[0]?.clubs[0], 'Quinte Red Devils')
  const wall = readSheet('<title>Just a moment...</title>', 'scores', '2026-10-05')
  assert.equal(wall.blocked, true)
  assert.equal(wall.games.length, 0)
  holdSheet(wall)
  assert.match(sheetLine(), /challenged by the site/)
  assert.match(sheetLine(), /not drawn/)
})
