import assert from 'node:assert/strict'
import test from 'node:test'
import { booksFor, BRANCHES, GRIDS, OHF_MEMBERS, ontarioAsk } from './ontario.ts'

test('HEO is not inside the OHF, and the books do not take a Unity ID', () => {
  assert.deepEqual(BRANCHES.map(row => row.id), ['ohf', 'heo', 'hno'])
  assert.equal(OHF_MEMBERS.includes('OMHA'), true)
  assert.equal((OHF_MEMBERS as readonly string[]).includes('HEO'), false)
  const quinte = GRIDS.find(row => row.id === 'omha')
  assert.equal(quinte?.clubs.includes('Quinte Red Devils'), true)
  assert.equal(JSON.stringify(GRIDS).includes('first'), false)
  const books = booksFor('unity:pilot.abc')
  assert.equal(books.found, false)
  const asked = ontarioAsk('what is the OHF and HEO')
  assert.match(asked?.speech ?? '', /HNO/)
  assert.equal(ontarioAsk('the rink'), null)
})
