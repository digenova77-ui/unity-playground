/** A thought maps onto keys already held. A fusion is those keys, not a new fact.
 * The fused key costs more than one of its parts. The instruction is only to hold them.
 */

import { faceFor } from './close.ts'
import { BOT_JOBS } from './priorities.ts'

export interface HeldKey {
  id: string
  claim: string
}

export interface FusedKey {
  id: string
  parts: string[]
  size: number
  complexity: number
  cost: number
  instruction: string
}

/** Decisions are size times complexity times one known key. Anything else is refused. */
export function decisionsFor(size: number, complexity: number): number | { refused: string } {
  if (!Number.isInteger(size) || !Number.isInteger(complexity) || size < 1 || complexity < 1) {
    return { refused: 'Size and complexity have to be whole numbers starting at 1. Nothing was priced.' }
  }
  return size * complexity * faceFor(false)
}

export function correlated(size: number, complexity: number, decisions: number): boolean {
  const due = decisionsFor(size, complexity)
  return typeof due === 'number' && due === decisions
}

/** The next step is one decision past what exists. The completion key is the whole project, and it is not that step. */
export function projectSpan(size: number, complexity: number, projectSize?: number, projectComplexity?: number): { known: number; next: number; completion: number | null; remaining: number | null; speech: string } | { refused: string } {
  const known = decisionsFor(size, complexity)
  if (typeof known !== 'number') return known
  const next = known + 1
  if (projectSize === undefined || projectComplexity === undefined) {
    return {
      known,
      next,
      completion: null,
      remaining: null,
      speech: `The next step is ${next}. That is one decision past the ${known} already taken. The completion key is not that step. Its size and complexity are not held, so its decisions are not named. The next step does not finish the project. It is not a settled worth. The till stays closed.`,
    }
  }
  const completion = decisionsFor(projectSize, projectComplexity)
  if (typeof completion !== 'number') return completion
  if (completion < next) return { refused: 'The completion key cannot be smaller than the next step. Nothing was priced.' }
  const remaining = completion - known
  return {
    known,
    next,
    completion,
    remaining,
    speech: `The next step is ${next}. The completion key is ${completion}. That is size ${projectSize} times complexity ${projectComplexity}. ${remaining} ${remaining === 1 ? 'decision remains' : 'decisions remain'} after what exists. The next step is 1 of them. It is not the completion key. It is not a settled worth. The till stays closed.`,
  }
}
/** The same thread is admitted once. A repeat is not a new decision, and its seconds were not clocked. */
export function sameThreads(times: number): { admitted: number; suppressed: number; decisions: number; speech: string } | { refused: string } {
  if (!Number.isInteger(times) || times < 1) return { refused: 'The count has to be a whole number starting at 1. Nothing was priced.' }
  const suppressed = times - 1
  return {
    admitted: 1,
    suppressed,
    decisions: 1,
    speech: `The same thread is one decision. Asked ${times} times, ${suppressed} are the same event and are not run. The cost is 1 unit, not a dollar. Pricing every ask would be ${times} units, and that count does not match one thread. An average computer was not clocked, so the seconds saved are not named. The till stays closed.`,
  }
}

/** A repeat of one line is the same thread, so 50^50 is refused.
 * What can be named is every fusion of the loaded lines, each line once.
 * None of those fusions are minted. One pool is seated.
 */
export function potSpace(lines = BOT_JOBS.length): {
  lines: number
  pool: 1
  slots: 5
  pipes: 2
  named: string
  refused: string
  minted: 0
  speech: string
} | { refused: string } {
  if (!Number.isInteger(lines) || lines < 1 || lines > 1024) {
    return { refused: 'The line count has to be a whole number from 1 to 1024. Nothing was named.' }
  }
  const width = BigInt(lines)
  const named = (1n << width) - 1n
  const refused = width ** width
  const speech = `${lines} lines are loaded. A repeat of one line is the same thread, so it is not another pot. ${lines} to the power of ${lines} counts those repeats. That number is ${refused}. It is refused. The pots that can be named are every fusion of those lines, each line once. That is 2 to the power of ${lines}, minus the empty fusion: ${named}. None of them are minted. One credit pool is seated. A half shift has 5 slots. Two pipes. The till stays closed.`
  return { lines, pool: 1, slots: 5, pipes: 2, named: named.toString(), refused: refused.toString(), minted: 0, speech }
}

export function decisionGrain(): string {
  return 'A decision is one unit. It is not a dollar. A medical simulation is one object a decision can come back as. The effort inside it is not a decision. A run, an arm, and a subject are not priced. Size times complexity is as fine as the count goes, and a study has not named those for its effort. The till stays closed.'
}

export function beyondKnown(size: number, complexity: number): { known: number; modeled: number; speech: string } | { refused: string } {
  const known = decisionsFor(size, complexity)
  if (typeof known !== 'number') return known
  const modeled = known + 1
  return {
    known,
    modeled,
    speech: `What exists takes ${known} ${known === 1 ? 'decision' : 'decisions'}. That is size ${size} times complexity ${complexity}. One unknown decision past that point models as ${modeled} to that same thing. The extra is 1. It is not a new key, and it is not a settled worth. The till stays closed.`,
  }
}

export function mapThought(thought: string, held: readonly HeldKey[]): HeldKey[] {
  const text = ` ${thought.toLowerCase()} `
  return held.filter(key => {
    const claim = key.claim.trim().toLowerCase()
    return claim.length > 0 && text.includes(` ${claim} `)
  })
}

export function fuseKeys(names: readonly string[], held: readonly HeldKey[]): FusedKey | { refused: string } {
  const wanted = [...new Set(names.map(name => name.trim()).filter(Boolean))]
  if (wanted.length < 2) return { refused: 'A bigger key needs two held keys. One key is not a fusion.' }
  const parts: HeldKey[] = []
  for (const name of wanted) {
    const found = held.find(key => key.id === name || key.claim.toLowerCase() === name.toLowerCase())
    if (!found) return { refused: `${name} is not a held key. A fusion does not invent one.` }
    parts.push(found)
  }
  const size = parts.length
  const complexity = 1
  const cost = decisionsFor(size, complexity)
  if (typeof cost !== 'number') return cost
  return {
    id: parts.map(key => key.id).join('+'),
    parts: parts.map(key => key.id),
    size,
    complexity,
    cost,
    instruction: `Hold ${parts.map(key => key.id).join(' and ')}.`,
  }
}

export function mapKeys(fused: readonly FusedKey[]): { from: string; to: string }[] {
  return fused.flatMap(key => key.parts.map(part => ({ from: part, to: key.id })))
}

export function wizardWords(thought: string, held: readonly HeldKey[]): string {
  const body = thought.replace(/\b(idea factory|key wizards?|fuse keys|superstore)\b/gi, '').trim()
  const hits = body ? mapThought(body, held) : []
  const store = `${held.length} ${held.length === 1 ? 'key is' : 'keys are'} in the superstore. It holds only keys already on this device.`
  if (!body) return `${store} A thought that names one of them can be mapped. A fusion needs two. Decisions are size times complexity. A fusion is one instruction, so its complexity is 1, and its decisions equal its size. A key wizard does not invent a key.`
  if (!hits.length) return `${store} That thought names none of them. Nothing was mapped, and nothing was fused.`
  const pair = hits.length >= 2 ? fuseKeys(hits.map(key => key.id), held) : null
  const fused = pair && 'id' in pair ? ` Fused ${pair.id}. Size ${pair.size}. Complexity ${pair.complexity}. Decisions ${pair.cost}. They match. Instruction: ${pair.instruction}` : ' Name a second held key to fuse.'
  return `${store} The thought mapped ${hits.map(key => key.id).join(', ')}.${fused} Those keys now point at the fusion. A key wizard does not invent a key.`
}
