/** An address book of handles. The figure is a placeholder.
 * A 3D person is not in this build. A sealed face pan is not copied into the contact.
 */

export interface Person {
  handle: string
  figure: 'placeholder'
  likeness: 'none' | 'sealed-on-this-device'
}

const KEY = 'dccpworld.people.v1'

function load(): Person[] {
  if (typeof localStorage === 'undefined') return []
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? '[]') as Person[]
    return Array.isArray(raw) ? raw.filter(row => row && typeof row.handle === 'string') : []
  } catch {
    return []
  }
}

let rows = load()

function save(): void {
  if (typeof localStorage === 'undefined') return
  try { localStorage.setItem(KEY, JSON.stringify(rows)) } catch { /* the device could not hold it */ }
}

export function listPeople(): readonly Person[] {
  return rows
}

export function addPerson(handle: string, likeness: Person['likeness']): Person | null {
  const name = handle.trim().replace(/\s+/g, '-').slice(0, 40)
  if (name.length < 2) return null
  const prior = rows.find(row => row.handle.toLowerCase() === name.toLowerCase())
  if (prior) return prior
  const person: Person = { handle: name, figure: 'placeholder', likeness }
  rows = [...rows, person]
  save()
  return person
}

export function peopleWords(): string {
  const n = rows.length
  return n
    ? `${n} ${n === 1 ? 'person is' : 'people are'} in the book. Each figure is a placeholder, not a photograph and not a 3D person. A face pan sealed on this device can be named as a likeness slot. The sample is not copied here.`
    : 'The address book is empty. A figure would be a placeholder. A 3D rendering of a person is not in this build.'
}

const esc = (s: string): string => s.replace(/[&<>"]/g, c => (c === '&' ? '\u0026amp;' : c === '<' ? '\u0026lt;' : c === '>' ? '\u0026gt;' : '\u0026quot;'))

export function renderPeople(people: readonly Person[]): string {
  if (!people.length) return '<p class="note">No one yet. A handle is enough. The figure stays a placeholder.</p>'
  return `<ul class="people-list">${people.map(person => `<li><i class="person-figure" aria-hidden="true"></i><span><b>${esc(person.handle)}</b><small>${person.figure} · ${person.likeness === 'sealed-on-this-device' ? 'a seal exists on this device, not copied' : 'no likeness'}</small></span></li>`).join('')}</ul>`
}
