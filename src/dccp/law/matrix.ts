/** The map is every seat both pipes already named.
 * The walk is serial: a decision is placed only after both choices are read.
 * Past the last lock there is no pair. That is not a prediction.
 */

import { SEATS, lockstep } from './floor.ts'

export interface Fork {
  id: string
  left: string
  right: string
  decision: string
}

export interface Step {
  index: number
  left: boolean
  right: boolean
  taken: boolean
}

export function matrixForks(): Fork[] {
  const out: Fork[] = []
  for (const seat of SEATS) {
    const pass = lockstep(seat)
    if (!pass.ok) break
    out.push({ id: seat.id, left: seat.shown, right: seat.machine, decision: pass.line })
  }
  return out
}

export function openMatrix(): Step[] {
  return [{ index: 0, left: false, right: false, taken: false }]
}

export function tapSide(steps: readonly Step[], side: 'left' | 'right'): Step[] {
  const cur = steps[steps.length - 1]
  if (!cur || cur.taken || cur[side]) return [...steps]
  return [...steps.slice(0, -1), { ...cur, [side]: true }]
}

export function tapDecision(steps: readonly Step[], count: number): Step[] {
  const cur = steps[steps.length - 1]
  if (!cur || cur.taken || !cur.left || !cur.right) return [...steps]
  const taken = [...steps.slice(0, -1), { ...cur, taken: true }]
  if (taken.length >= count) return taken
  return [...taken, { index: taken.length, left: false, right: false, taken: false }]
}

export function serialPath(steps: readonly Step[], forks: readonly Fork[]): string[] {
  return steps.filter(step => step.taken && forks[step.index]).map(step => forks[step.index].decision)
}

/** 1 + 1 = 2. One decision and one choice are two options. No other sum is claimed. */
export function twoOptions(decision: number, choice: number): 2 | null {
  if (decision === 1 && choice === 1) return 2
  return null
}

export function twoOptionsWords(): string {
  return '1 + 1 = 2. One decision plus one choice is two options. That is the Universal architecture. No other sum is claimed. The decision stays serial. The two options stay parallel. The room draws only after that pair is read.'
}

export function mapSpeech(forks: readonly Fork[] = matrixForks()): string {
  const lines = forks.map((fork, index) => `${index + 1}. ${fork.id}. One side: ${fork.left} The other side: ${fork.right} The serial line already named: ${fork.decision}`)
  return `The map is only the seats that already lock. ${lines.join(' ')} After ${forks.length}, there is no pair.`
}

export function predictability(): string {
  return 'A line is predictable only when both pipes already named it. That is not a guess about the next seat. DCLM does not choose, so it does not choose right every time. Where the pipes do not agree, the answer is HOLE.'
}

export function matrixSpeech(steps: readonly Step[], forks: readonly Fork[] = matrixForks()): string {
  const cur = steps[steps.length - 1]
  const fork = cur ? forks[cur.index] : undefined
  const waiting = !fork
    ? 'The path has no further pair.'
    : cur.taken
      ? 'That decision is in the line. The next pair is beside the one after it.'
      : !cur.left || !cur.right
        ? `Read both. ${cur.left ? 'The shown side is read.' : 'The shown side is still unread.'} ${cur.right ? 'The machine is read.' : 'The machine is still unread.'} The decision stays unplaced.`
        : `Both are read. The decision can be taken. ${fork.decision}`
  const path = serialPath(steps, forks)
  const walked = path.length ? `Serial path: ${path.join(' Then ')}.` : 'No serial decision yet.'
  const hole = forks.length < SEATS.length ? 'A later seat did not lock, so the path stops there.' : ''
  return `The decision is serial. The two choices are parallel. ${waiting} ${walked} ${hole}`.trim()
}

const KEY = 'dccpworld.logic-path.v1'

export function loadSteps(): Step[] {
  if (typeof localStorage === 'undefined') return openMatrix()
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? '') as Step[]
    if (!Array.isArray(raw) || !raw.length) return openMatrix()
    const clean = raw.filter(step => step && typeof step.index === 'number' && typeof step.left === 'boolean')
    return clean.length ? clean : openMatrix()
  } catch {
    return openMatrix()
  }
}

export function saveSteps(steps: readonly Step[]): void {
  if (typeof localStorage === 'undefined') return
  try { localStorage.setItem(KEY, JSON.stringify(steps)) } catch { /* the device could not hold the path */ }
}
