/** One spectrum. Each rung has a teaching seat and the student seat facing it.
 * A school, a roster, and a mark are not invented.
 */

export interface Rung {
  id: string
  teach: string
  learn: string
  line: string
}

export const RUNGS: readonly Rung[] = [
  { id: 'early', teach: 'Kindergarten teacher', learn: 'Kindergarten student', line: 'The first room.' },
  { id: 'elem', teach: 'Elementary teacher', learn: 'Elementary student', line: 'One class.' },
  { id: 'middle', teach: 'Middle school teacher', learn: 'Middle school student', line: 'A subject starts to split from the room.' },
  { id: 'high', teach: 'High school teacher', learn: 'High school student', line: 'A course.' },
  { id: 'college', teach: 'College instructor', learn: 'College student', line: 'A program.' },
  { id: 'uni', teach: 'University professor', learn: 'University student', line: 'A faculty and a major.' },
  { id: 'grad', teach: 'Graduate supervisor', learn: 'Graduate student', line: 'One question, carried further.' },
  { id: 'adult', teach: 'Adult education instructor', learn: 'Adult learner', line: 'The same room, later.' },
  { id: 'trades', teach: 'Trades instructor', learn: 'Apprentice', line: 'The work is the room.' },
  { id: 'special', teach: 'Special education teacher', learn: 'Student in that room', line: 'The room is adjusted.' },
  { id: 'tutor', teach: 'Tutor', learn: 'Tutee', line: 'One seat across from one seat.' },
]

const NAMED: { id: string; side: 'teach' | 'learn'; test: RegExp }[] = [
  { id: 'early', side: 'teach', test: /\bkindergarten teacher\b|\bearly childhood teacher\b/ },
  { id: 'early', side: 'learn', test: /\bkindergarten student\b/ },
  { id: 'elem', side: 'teach', test: /\belementary(?: school)? teacher\b/ },
  { id: 'elem', side: 'learn', test: /\belementary(?: school)? student\b/ },
  { id: 'middle', side: 'teach', test: /\bmiddle school teacher\b/ },
  { id: 'middle', side: 'learn', test: /\bmiddle school student\b/ },
  { id: 'high', side: 'teach', test: /\bhigh school teacher\b/ },
  { id: 'high', side: 'learn', test: /\bhigh school student\b/ },
  { id: 'college', side: 'teach', test: /\bcollege (?:instructor|teacher)\b/ },
  { id: 'college', side: 'learn', test: /\bcollege student\b/ },
  { id: 'uni', side: 'teach', test: /\buniversity professor\b|\bprofessor\b/ },
  { id: 'grad', side: 'teach', test: /\bgraduate supervisor\b|\bthesis supervisor\b/ },
  { id: 'grad', side: 'learn', test: /\bgraduate student\b/ },
  { id: 'adult', side: 'teach', test: /\badult education\b/ },
  { id: 'adult', side: 'learn', test: /\badult learner\b/ },
  { id: 'trades', side: 'teach', test: /\btrades instructor\b/ },
  { id: 'trades', side: 'learn', test: /\bapprentice\b/ },
  { id: 'special', side: 'teach', test: /\bspecial education teacher\b/ },
  { id: 'tutor', side: 'teach', test: /\btutor\b/ },
  { id: 'tutor', side: 'learn', test: /\btutee\b/ },
]

export interface SpectrumTurn {
  title: string
  lines: string[]
  speech: string
  seats: number
}

function byId(id: string): Rung {
  return RUNGS.find(rung => rung.id === id) ?? RUNGS[0]
}

export function spectrumAsk(text: string): SpectrumTurn | null {
  const t = text.toLowerCase()
  if (/\bcurriculum\b|\bmy major\b|\bfield of study\b|\bgrade\s*two\b|\bgrade\s*2\b/.test(t)) return null
  if (/\b(teaching spectrum|teach environment|teaching environment|student environment|polar opposite)\b/.test(t)) {
    return {
      title: 'Spectrum',
      seats: 2,
      lines: ['Two seats', 'Same rung', 'No roster', `${RUNGS.length} rungs`],
      speech: `${RUNGS.length} rungs. Each one has a teaching seat and the student seat facing it. It is the same spectrum, not a second ladder. A school is not named. A roster is not taken. A mark is not invented.`,
    }
  }
  const hits = NAMED.filter(row => row.test.test(t))
  if (!hits.length) return null
  const hit = hits[0]
  const rung = byId(hit.id)
  const seat = hit.side === 'teach' ? rung.teach : rung.learn
  const facing = hit.side === 'teach' ? rung.learn : rung.teach
  return {
    title: seat,
    seats: 2,
    lines: [seat, `Facing ${facing}`, rung.line, 'No roster'],
    speech: `${seat}. ${rung.line} The facing seat is ${facing}. Same rung. A school is not named. A roster is not taken. A mark is not invented.`,
  }
}
