import assert from 'node:assert/strict'
import test from 'node:test'
import { deliver } from './relay.ts'
import type { SheetLook } from '../live/sheet.ts'

const look: SheetLook = { surface: 'scores', at: '2026-10-05', blocked: false, games: [{ id: 'U16-014', clubs: ['Quinte Red Devils', 'Barrie AAA ZONE'] }] }

test('a relayer carries the clubs to the Unity ID, and holds them when there is no ID', () => {
  const held = deliver(null, look, null)
  assert.equal(held.relay.held, true)
  assert.equal(held.inbox, null)
  const sent = deliver(null, look, 'unity:pilot.abc')
  assert.equal(sent.relay.held, false)
  assert.equal(sent.inbox?.id, 'unity:pilot.abc')
  assert.equal(sent.inbox?.looks[0]?.games[0]?.clubs[1], 'Barrie AAA ZONE')
  assert.match(sent.relay.said, /player name was not/)
})
