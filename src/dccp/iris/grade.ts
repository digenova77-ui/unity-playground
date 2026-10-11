/** A line against a fact that was not made from the line. One grade. Then stop.
 * The tongue is the floor. 1 is the fact. 2 is the line. A thought is not a write.
 * A hammer may use only the thought.
 */

import { tell } from '../unity/abstract.ts'
import { formIdea, writeForward } from '../law/form.ts'

const FLOOR = 'The floor is 0. The ceiling is 1. The names are no force, safe host, truth or nothing, and cleanup first. Speak 1, then 2. A thought is not a write. A hammer may only use the thought.'

export function gradeAsk(text: string): string | null {
  if (!/fact\s*:/i.test(text) || !/line\s*:/i.test(text)) return null
  const fact = text.match(/fact[ \t]*:[ \t]*([^\n]*)/i)?.[1]?.trim() ?? ''
  const line = text.match(/line[ \t]*:[ \t]*([^\n]*)/i)?.[1]?.trim() ?? ''
  if (!line) return 'Nothing was claimed. Nothing was graded.'
  const held = fact === '' || /^open$/i.test(fact) ? null : fact
  const verdict = tell(line, held)
  if (verdict.verdict === 'truth') return 'Truth. The line matches what is held. One next step: keep it. Nothing was added.'
  if (verdict.verdict === 'lie') return 'Lie. The line does not match what is held. One next step: do not file it.'
  return 'Open. Nothing is held beside the line. One next step: bring the fact, or leave it. It does not become true by being said.'
}

function oneTwo(text: string): string | null {
  if (!/(?:^|\n)\s*1[ \t]*:/.test(text) || !/(?:^|\n)\s*2[ \t]*:/.test(text)) return null
  const one = text.match(/(?:^|\n)\s*1[ \t]*:[ \t]*([^\n]*)/)?.[1]?.trim() ?? ''
  const two = text.match(/(?:^|\n)\s*2[ \t]*:[ \t]*([^\n]*)/)?.[1]?.trim() ?? ''
  return gradeAsk(`Fact: ${one}\nLine: ${two}`)
}

/** The closed tongue. Null means this was not spoken to the floor. */
export function diamondSpeak(text: string): string | null {
  const raw = text.trim()
  if (/^floor$/i.test(raw)) return FLOOR
  if (/^thought[ \t]*:/i.test(raw)) return formIdea(raw.replace(/^thought[ \t]*:[ \t]*/i, '')).speech
  if (/^hammer[ \t]*:/i.test(raw)) return writeForward(raw.replace(/^hammer[ \t]*:[ \t]*/i, '')).speech
  return oneTwo(raw) ?? gradeAsk(raw)
}
