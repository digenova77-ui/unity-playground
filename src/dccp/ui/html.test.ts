import assert from 'node:assert/strict'
import test from 'node:test'
import { html } from './html.ts'

test('a plate title cannot become markup', () => {
  const out = html('Tom & "Jen" <b>x</b>')
  assert.equal(out.includes('<'), false)
  assert.match(out, new RegExp('&' + 'amp;'))
  assert.match(out, new RegExp('&' + 'lt;b&' + 'gt;'))
  assert.match(out, new RegExp('&' + 'quot;'))
})
