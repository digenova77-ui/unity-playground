import assert from 'node:assert/strict'
import test from 'node:test'
import { apiJacket, jacketWords } from './jacket.ts'

test('the jacket is the only door and eFuse does not move', () => {
  const open = apiJacket('')
  assert.equal(open.doors, 1)
  assert.equal(open.moves, false)
  assert.equal(open.till, 'closed')
  assert.equal(open.open, true)
  const token = apiJacket('token')
  assert.equal(token.open, true)
  assert.equal((token.body as { moves: boolean }).moves, false)
  const pages = apiJacket('pages')
  assert.equal(pages.open, false)
  assert.match(pages.reason ?? '', /second door/)
  assert.equal(apiJacket('cloud').open, false)
  assert.equal(apiJacket('old-world').open, false)
  assert.match(jacketWords(), /only conduit/)
  assert.match(jacketWords(), /till is closed/)
})
