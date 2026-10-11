/** A grade classroom inside the Universal sandbox.
 * The framework asks. It does not invent a school, a count, or a child.
 */

import { HELD_BELLEVILLE } from '../live/activity.ts'

export interface ClassTurn {
  title: string
  lines: string[]
  speech: string
  seats: number
  pin?: { lat: number; lon: number }
  done: boolean
}

interface Room {
  grade: string
  place: string
  school: string | null
  count: number | null
  intake: string | null
}

const BELLEVILLE = { lat: 44.1667, lon: -77.3832 }

const HELD_SCHOOLS = HELD_BELLEVILLE
  .filter(row => /school|college/.test(row.types.join(' ').toLowerCase()))
  .map(row => row.name)

let room: Room | null = null

export function resetClass(): void {
  room = null
}

export function classWaiting(): boolean {
  return room !== null && room.intake === null
}

export function beginClass(utterance: string): ClassTurn | null {
  const t = utterance.trim().toLowerCase()
  const grade = /\bgrade\s*two\b|\bgrade\s*2\b|\bsecond grade\b/.test(t)
  const roomWord = /\bclassroom\b|\bclass\b/.test(t)
  if (!grade || !roomWord) return null
  const place = /\bbelleville\b/.test(t) ? 'Belleville, Ontario' : ''
  room = { grade: 'Grade 2', place, school: null, count: null, intake: null }
  return paint(place
    ? 'What is the name of the school?'
    : 'Where is the classroom?')
}

export function replyClass(utterance: string): ClassTurn | 'release' | null {
  if (!room || room.intake) return null
  const text = utterance.trim()
  const t = text.toLowerCase()
  if (/^(cancel|stop|never mind|go home|home)$/.test(t)) {
    room = null
    return 'release'
  }
  if (!room.place) {
    if (/\bbelleville\b/.test(t)) room.place = 'Belleville, Ontario'
    else if (text.length > 1 && text.length < 60 && !looksLikeRoster(text)) room.place = text
    else return paint('Where is the classroom? Name the city, not the children.')
    return paint('What is the name of the school?')
  }
  if (!room.school) {
    if (looksLikeRoster(text) || /^\d+$/.test(t)) return paint('What is the name of the school? Not a count, and not the children\'s names.')
    room.school = text.slice(0, 80)
    const known = HELD_SCHOOLS.some(name => name.toLowerCase() === room!.school!.toLowerCase())
    const note = known
      ? 'That name is on the Belleville list, and that list types it above grade two. Grade two is your statement.'
      : 'That name is not on the Belleville list. I am keeping it as what you said.'
    return paint(`How many children? A count. Not their names. ${note}`)
  }
  if (room.count === null) {
    if (looksLikeRoster(text)) return paint('A count. Not their names.')
    const n = Number(t.match(/\d+/)?.[0])
    if (!Number.isFinite(n) || n < 1 || n > 40) return paint('How many children? Say a count from 1 to 40. Not their names.')
    room.count = n
    return paint('How should the information come in? You can say it here, name a page the school posts, or have someone at the school tap while they are standing there.')
  }
  if (looksLikeRoster(text)) return paint('Do not give me the children\'s names. How should the information come in?')
  room.intake = /tap|standing|at the school|i'm here|i am here/.test(t)
    ? 'Someone at the school taps while standing there'
    : /page|site|post|website|board/.test(t)
      ? 'A page the school posts. None is connected.'
      : 'Said here, in the sandbox'
  return paint('The classroom is set with what you said. Nothing else was added.')
}

function looksLikeRoster(text: string): boolean {
  return (text.match(/,/g) ?? []).length >= 2 || /\bnames are\b|\bthe kids are\b|\bstudents are\b/.test(text.toLowerCase())
}

function paint(ask: string): ClassTurn {
  const current = room!
  const held = HELD_SCHOOLS.length
    ? `Wikidata locates these in Belleville, and none is a grade two class: ${HELD_SCHOOLS.join(', ')}.`
    : 'No school was located in Belleville.'
  const lines = [
    current.place || 'City: not said',
    current.school ? `School: ${current.school}` : 'School: not said',
    current.count === null ? 'Children: not said' : `Children: ${current.count}. No names.`,
    current.intake ? `Comes in: ${current.intake}` : 'Comes in: not said',
  ]
  const speech = `The sandbox stays Universal. ${current.grade}${current.place ? ` in ${current.place}` : ''}. ${held} ${ask}`
  return {
    title: 'Grade 2',
    lines,
    speech,
    seats: current.count ?? 0,
    pin: current.place === 'Belleville, Ontario' ? BELLEVILLE : undefined,
    done: current.intake !== null,
  }
}
