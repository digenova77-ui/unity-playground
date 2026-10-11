/** A Canadian university curriculum, drawn only from what was named.
 * The held list is names. It is not a calendar. DCLM is asked the query and holds no courses.
 */

import { reduce } from '../law/engine.ts'

export const UNIVERSITIES = [
  'University of Toronto',
  'University of British Columbia',
  'McGill University',
  'University of Alberta',
  'Université de Montréal',
  'University of Waterloo',
  'McMaster University',
  'Queen\'s University',
  'Western University',
  'University of Ottawa',
  'University of Calgary',
  'Dalhousie University',
  'University of Manitoba',
  'University of Saskatchewan',
  'Université Laval',
  'Simon Fraser University',
  'University of Victoria',
  'York University',
  'University of Guelph',
  'Carleton University',
  'Concordia University',
  'Memorial University',
  'University of New Brunswick',
  'Toronto Metropolitan University',
] as const

export interface Course { code: string; title: string }

interface Plan {
  university: string | null
  held: boolean
  faculty: string | null
  field: string | null
  major: string | null
  courses: Course[]
}

export interface CurriculumTurn {
  title: string
  lines: string[]
  speech: string
  digest: string
  done: boolean
}

let plan: Plan | null = null

export function resetCurriculum(): void {
  plan = null
}

export function curriculumWaiting(): boolean {
  return plan !== null && !ready(plan)
}

export function beginCurriculum(utterance: string): CurriculumTurn | null {
  const t = utterance.trim().toLowerCase()
  if (!/\bcurriculum\b|\bmy major\b|\buniversity student\b|\bfield of study\b/.test(t)) return null
  plan = { university: null, held: false, faculty: null, field: null, major: null, courses: [] }
  absorb(utterance)
  return paint()
}

export function replyCurriculum(utterance: string): CurriculumTurn | 'release' | null {
  if (!plan) return null
  const t = utterance.trim().toLowerCase()
  if (/^(cancel|stop|never mind)$/.test(t)) {
    plan = null
    return 'release'
  }
  const added = utterance.match(/\badd\s+([A-Za-z]{2,8})\s*(\d{3,4})\s+(.{3,80})/)
  if (added) {
    if (!ready(plan)) return paint()
    plan.courses.push({ code: `${added[1].toUpperCase()} ${added[2]}`, title: added[3].trim() })
    return paint()
  }
  absorb(utterance)
  return paint()
}

export function rteBuildAsk(utterance: string): string | null {
  const t = utterance.trim().toLowerCase()
  if (!/\buniversal rte\b/.test(t) || !/\b(build|how|dclm)\b/.test(t)) return null
  const digest = reduce({ seat: 'dclm', ask: 'how to build the universal rte' }).digest
  return `DCLM was asked how to build the Universal RTE. DCLM holds nothing. The room is the build. A curriculum is a data model drawn into that room. Name the university, the faculty, the field, and the major. Reduce that query. Draw only what was named. A course that was not ingested is a hole. The digest of this ask is ${digest}. The same ask reduces to the same digest.`
}

function absorb(utterance: string): void {
  if (!plan) return
  const t = utterance.trim()
  const low = t.toLowerCase()
  if (!plan.university) {
    const hit = [...UNIVERSITIES].sort((a, b) => b.length - a.length).find(name => low.includes(name.toLowerCase()))
    if (hit) {
      plan.university = hit
      plan.held = true
    }
  }
  const faculty = low.match(/\bfaculty of ([a-z][a-z &'-]{2,48})/)
  const field = low.match(/\bfield of study ([a-z][a-z &'-]{2,48})/) ?? low.match(/\bfield ([a-z][a-z &'-]{2,48})/)
  const major = low.match(/\bmajor in ([a-z][a-z &'-]{2,48})/) ?? low.match(/\bmajor ([a-z][a-z &'-]{2,48})/)
  if (faculty && !plan.faculty) plan.faculty = clean(faculty[1])
  if (field && !plan.field) plan.field = clean(field[1])
  if (major && !plan.major) plan.major = clean(major[1])
  if (!plan.university && !faculty && !field && !major && t.length > 1 && t.length < 80 && curriculumWaiting()) {
    plan.university = t
    plan.held = false
  }
}

function ready(row: Plan): boolean {
  return Boolean(row.university && row.faculty && row.field && row.major)
}

function clean(value: string): string {
  return value.replace(/[,.].*$/, '').trim()
}

function paint(): CurriculumTurn {
  const row = plan!
  const query = {
    seat: 'dclm',
    country: 'Canada',
    university: row.university,
    faculty: row.faculty,
    field: row.field,
    major: row.major,
    courses: row.courses.map(course => `${course.code} ${course.title}`),
  }
  const digest = reduce(query).digest
  const ask = !row.university ? 'Which Canadian university?'
    : !row.faculty ? 'Which faculty?'
    : !row.field ? 'Which field of study?'
    : !row.major ? 'Which major?'
    : 'The calendar is not ingested. Say add, then a code and a title you already have. I will not write a course.'
  const held = row.university
    ? row.held ? `${row.university} is a name on the held list. Its calendar is not here.` : `${row.university} is not on the held list. I am keeping the name you said. Its calendar is not here.`
    : `${UNIVERSITIES.length} Canadian university names are held. None of their calendars are.`
  const lines = [
    row.university ? `University: ${row.university}` : 'University: not said',
    row.faculty ? `Faculty: ${row.faculty}` : 'Faculty: not said',
    row.field ? `Field: ${row.field}` : 'Field: not said',
    row.major ? `Major: ${row.major}` : 'Major: not said',
    row.courses.length ? row.courses.map(course => `${course.code} ${course.title}`).join(' · ') : 'Courses: none ingested',
  ]
  return {
    title: row.major ? row.major : 'Curriculum',
    lines,
    digest,
    done: ready(row),
    speech: `The sandbox stays Universal. Canada. ${held} ${ask} DCLM was asked this query and holds no courses. Digest ${digest}.`,
  }
}
