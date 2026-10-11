import assert from 'node:assert/strict'
import test from 'node:test'
import { AGREEMENT_ID } from './agreement.ts'
import { hostHandle, hostSeat, hostWords, invokeHost, releaseHost } from './hostid.ts'
import { currentJoint } from '../origin/layer.ts'

test('the host is unsigned until it volunteers', () => {
  assert.equal(hostSeat(), null)
  assert.match(hostWords(), /\$0/)
  assert.match(hostWords(), /risk is 0/)
  assert.equal(currentJoint().grant, 'unasked')
})

test('a voluntary invoke signs the same contract at $0 and 0 risk', async () => {
  const seat = await invokeHost()
  assert.equal(seat.agreementId, AGREEMENT_ID)
  assert.equal(seat.kind, 'host')
  assert.equal(seat.cost, 0)
  assert.equal(seat.risk, 0)
  assert.equal(seat.commitment, false)
  assert.equal(seat.voluntary, true)
  assert.equal(seat.bound, false)
  assert.equal(seat.handle, await hostHandle())
  assert.match(seat.handle, /^unity:host\.[0-9a-f]{32}$/)
  const again = await invokeHost()
  assert.equal(again.handle, seat.handle)
  assert.equal(currentJoint().open, false)
  assert.match(hostWords(seat), /not bound/)
  const left = releaseHost()
  assert.equal(left.cost, 0)
  assert.equal(left.risk, 0)
  assert.equal(hostSeat(), null)
})
