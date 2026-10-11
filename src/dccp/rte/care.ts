/** One care spectrum. Each rung has a care seat and the person facing it.
 * Zero patient health information is ingested, logged, or retained.
 */

export interface CareRung {
  id: string
  care: string
  facing: string
  line: string
}

export const CARE: readonly CareRung[] = [
  { id: 'public', care: 'Public health', facing: 'A person in that area', line: 'A population. Not a chart.' },
  { id: 'medic', care: 'Paramedic', facing: 'The person they reached', line: 'The call. Not a record kept here.' },
  { id: 'primary', care: 'Primary care', facing: 'The person in the visit', line: 'The visit. A file is not opened.' },
  { id: 'nurse', care: 'Nurse', facing: 'The person in their care', line: 'The shift. A note is not written here.' },
  { id: 'pharmacy', care: 'Pharmacist', facing: 'The person at the counter', line: 'The counter. A prescription is not stored.' },
  { id: 'emerg', care: 'Emergency', facing: 'The person who came in', line: 'The room. A triage score is not held.' },
  { id: 'special', care: 'Specialist', facing: 'The person referred', line: 'The referral. A letter is not held.' },
  { id: 'surgery', care: 'Surgeon', facing: 'The person on the list', line: 'The list. A procedure is not described.' },
  { id: 'lab', care: 'Diagnostics', facing: 'The person waiting', line: 'The wait. A result is not held.' },
  { id: 'allied', care: 'Allied care', facing: 'The person in the session', line: 'The session. A plan is not written here.' },
  { id: 'mind', care: 'Mental health clinician', facing: 'The person who came', line: 'The hour. A diagnosis is not stored.' },
  { id: 'home', care: 'Long-term care', facing: 'The resident', line: 'The home. A chart is not opened.' },
  { id: 'ward', care: 'Hospital', facing: 'The person admitted', line: 'The ward. An admission is not stored.' },
]

const NAMED: { id: string; test: RegExp }[] = [
  { id: 'public', test: /\bpublic health\b/ },
  { id: 'medic', test: /\bparamedic\b|\bems\b|\bfirst responder\b/ },
  { id: 'primary', test: /\bprimary care\b|\bfamily doctor\b|\bfamily physician\b|\bnurse practitioner\b/ },
  { id: 'home', test: /\blong[- ]term care\b|\bnursing home\b/ },
  { id: 'nurse', test: /\bnurse\b|\bnursing\b/ },
  { id: 'pharmacy', test: /\bpharmacist\b|\bpharmacy\b/ },
  { id: 'emerg', test: /\bemergency\b|\bemerg\b/ },
  { id: 'special', test: /\bspecialist\b/ },
  { id: 'surgery', test: /\bsurgeon\b|\bsurgery\b/ },
  { id: 'lab', test: /\bdiagnostic\b|\blaboratory\b|\blab result\b|\bradiolog/ },
  { id: 'allied', test: /\bphysio\b|\boccupational therapy\b|\ballied\b/ },
  { id: 'mind', test: /\bmental health\b|\bpsychiatr/ },
  { id: 'ward', test: /\bhospital\b|\bward\b|\binpatient\b/ },
]

const GUARD = 'Zero patient health information is ingested, logged, or retained. A chart is not opened. A diagnosis is not stored. A name is not stored.'

import { ACTIVITY_HOLES } from '../live/activity.ts'

export interface HeldJurisdiction {
  name: string
  guard: string
  systems: string
}

const HEALTH = /\b(health|hospital|clinical|clinic|care|phipa|ohip|patient)\b/
const LOCAL = ACTIVITY_HOLES.find(line => line.startsWith('Healthcare:')) ?? 'No local health site is seated.'

function doorOf(text: string, doors: readonly HeldJurisdiction[]): HeldJurisdiction | null {
  const ordered = [...doors].sort((a, b) => b.name.length - a.name.length)
  const named = ordered.find(door => text.includes(door.name.toLowerCase()))
  if (named) return named
  if (/\bcanada\b/.test(text)) return doors.find(door => door.name === 'All Canada') ?? null
  return null
}

function placeOf(text: string, door: HeldJurisdiction | null): string | null {
  const found = text.match(/\b(?:in|at)\s+([a-z][a-z .'-]{2,40})/)
  if (!found) return null
  const place = found[1].split(/\b(?:and|with|on)\b/)[0].trim()
  if (!place || (door && place === door.name.toLowerCase())) return null
  return place
}

export function careAsk(text: string, doors: readonly HeldJurisdiction[] = []): { speech: string } | null {
  const t = text.toLowerCase()
  const broad = /\b(care spectrum|healthcare system|health system|health care)\b/.test(t)
  const hit = NAMED.find(row => row.test.test(t))
  const door = doorOf(t, doors)
  if (!broad && !hit && !(door && HEALTH.test(t))) return null
  const rung = hit ? CARE.find(row => row.id === hit.id) ?? CARE[0] : null
  const place = placeOf(t, door)
  const local = place === 'belleville'
    ? LOCAL
    : place
      ? `${place.charAt(0).toUpperCase()}${place.slice(1)} is not held below the jurisdiction that was named.`
      : ''
  const parts = [
    door ? `${door.name}. Guard: ${door.guard}. Systems held: ${door.systems}.` : 'No jurisdiction was named. The seat is not placed.',
    rung ? `${rung.care}. ${rung.line} The facing seat is ${rung.facing}.` : `No seat was named. The next cut is one of ${CARE.length} seats.`,
    local,
    place ? '' : 'A city was not named.',
    GUARD,
  ]
  if (!door && !rung) {
    return { speech: `${CARE.length} rungs. Each one has a care seat and the person facing it. Same spectrum. A jurisdiction was not named. ${GUARD}` }
  }
  return { speech: parts.filter(Boolean).join(' ') }
}
