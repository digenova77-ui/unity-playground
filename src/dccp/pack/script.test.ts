import assert from 'node:assert/strict'
import test from 'node:test'
import { carry, sheetUrl } from './script.ts'

test('one carry reads two clubs and will not open a player page', () => {
  assert.equal(sheetUrl('players'), null)
  const page = 'Game U16-014 Regular Season Quinte Red Devils (1 - 0 - 0) U16 East Barrie AAA ZONE (0 - 1 - 0)'
  const sent = carry(null, page, 'scores', '2026-10-05', 'unity:pilot.abc')
  assert.equal(sent.look.games[0]?.clubs[0], 'Quinte Red Devils')
  assert.equal(sent.relay.held, false)
  assert.equal(sent.inbox?.looks.length, 1)
  const held = carry(null, '<title>Just a moment...</title>', 'schedule', '2026-10-05', null)
  assert.equal(held.look.blocked, true)
  assert.equal(held.look.games.length, 0)
  assert.equal(held.relay.held, true)
  assert.equal(held.inbox, null)
})
