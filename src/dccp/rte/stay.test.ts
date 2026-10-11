import assert from 'node:assert/strict'
import test from 'node:test'
import { stayAsk } from './stay.ts'

test('the September stay is the one held trip, and a stop is not invented', () => {
  const stay = stayAsk('show the airbnb for the kitchener trip')
  assert.match(stay?.lines.join(' ') ?? '', /South Creek Drive/)
  assert.match(stay?.speech ?? '', /No OnRoute stop is held/)
  assert.equal(stay?.pin.lat, 43.3776505)
  assert.match(stay?.speech ?? '', /not the unit door/)
  const fuel = stayAsk('onroute and tim hortons for the stay')
  assert.match(fuel?.lines.join(' ') ?? '', /OnRoute: asked/)
  assert.match(fuel?.lines.join(' ') ?? '', /No order held/)
  assert.equal(stayAsk('the rink'), null)
})
