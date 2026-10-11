import assert from 'node:assert/strict'
import test from 'node:test'
import { observeMark, observeWords } from './observe.ts'

test('the page has signed and the crawler has not', () => {
  assert.equal(observeMark(), '564822b26c034cd9f5f69d2d08e2a9c2d54188ff5976d03247e9e5eb22eda522')
  const said = observeWords()
  assert.match(said, /You have not/)
  assert.match(said, /cost is \$0/)
  assert.match(said, /does not put you on the land/)
  assert.match(said, /not a Trinity seal/)
})
