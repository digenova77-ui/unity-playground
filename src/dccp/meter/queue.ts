/** Two slots. A finished slot takes the next waiting task immediately. */

import { runChain, type ChainReport } from './chain.ts'

export type Slot = 'A' | 'B'

export interface Queued {
  id: number
  task: string
  state: 'waiting' | 'running' | 'reported'
  slot: Slot | null
  report: string | null
}

const tasks: Queued[] = []
let seq = 0

export function enqueue(task: string): Queued {
  const row: Queued = { id: ++seq, task: task.trim(), state: 'waiting', slot: null, report: null }
  tasks.push(row)
  fill()
  return row
}

/** An open slot takes the next waiting task. It does not write the report. */
export function fill(): void {
  for (const slot of ['A', 'B'] as const) {
    if (tasks.some(row => row.state === 'running' && row.slot === slot)) continue
    const next = tasks.find(row => row.state === 'waiting')
    if (!next) return
    next.state = 'running'
    next.slot = slot
  }
}

/** The slot finished. The report is written, then that same slot takes the next task. */
export function finishSlot(slot: Slot): ChainReport | null {
  const running = tasks.find(row => row.state === 'running' && row.slot === slot)
  if (!running) return null
  const done = runChain(running.task)
  running.state = 'reported'
  running.report = done.report
  fill()
  return done
}

export function queueLine(): string {
  const a = tasks.find(row => row.state === 'running' && row.slot === 'A')
  const b = tasks.find(row => row.state === 'running' && row.slot === 'B')
  const waiting = tasks.filter(row => row.state === 'waiting').length
  const reported = tasks.filter(row => row.state === 'reported').length
  const slot = (name: Slot, row: Queued | undefined) => row ? `${name} running: ${row.task}` : `${name} is open`
  return `Dual pipe. ${slot('A', a)}. ${slot('B', b)}. ${waiting} waiting. ${reported} reported.`
}

export function resetQueue(): void {
  tasks.length = 0
  seq = 0
}

export const HANDOFF = [
  'index the streets corners and addresses in Belleville',
  'show me the intersection of Front Street and Bridge Street in Belleville',
  'connect street view',
] as const

export function handoff(): string {
  for (const task of HANDOFF) enqueue(task)
  return queueLine()
}
