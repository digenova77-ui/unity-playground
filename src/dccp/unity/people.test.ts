import assert from 'node:assert/strict'
import test from 'node:test'
import { addPerson, peopleWords } from './people.ts'

test('a contact is a handle and a placeholder, not a person', () => {
  assert.equal(addPerson('  ', 'none'), null)
  const person = addPerson('ada', 'sealed-on-this-device')
  assert.equal(person?.figure, 'placeholder')
  assert.equal(addPerson('Ada', 'none')?.handle, 'ada')
  assert.match(peopleWords(), /not a 3D person|not copied/)
})
