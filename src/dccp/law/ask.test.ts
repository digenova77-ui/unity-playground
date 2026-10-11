import assert from 'node:assert/strict'
import test from 'node:test'
import { ROOT } from './root.ts'
import { beyondAsk, fiveAsk, rightQuestion, tieObserver } from './ask.ts'

test('the asker is seated and no escape writes a cell', () => {
  const asked = fiveAsk()
  assert.equal(asked.who, 'the asker')
  assert.equal(asked.everything, false)
  assert.equal(asked.written, false)
  assert.match(asked.words, /does not seat the answers/)
  for (const kind of ['dimensions', 'light', 'wave'] as const) {
    const row = beyondAsk(kind)
    assert.equal(row.written, false)
    assert.equal(row.axes, 3)
  }
  assert.equal(ROOT.length, 9)
  const open = tieObserver(null)
  assert.equal(open.observer, null)
  assert.equal(open.mapped, false)
  const seated = tieObserver('unity:pilot.abc')
  assert.equal(seated.observer, 'unity:pilot.abc')
  assert.equal(seated.credential, false)
  assert.match(seated.words, /only that/)
  const truth = rightQuestion('held', 'held')
  assert.equal(truth.verdict, 'truth')
  assert.equal(truth.step, 1)
  assert.equal(rightQuestion('said', null).verdict, 'open')
  assert.equal(rightQuestion('said', 'other').verdict, 'lie')
})
