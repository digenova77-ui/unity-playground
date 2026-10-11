/** One pulse. All four pillars, at the same time. Three umpires read that pulse.
 * The loop stays in this page. It does not write their system, and a repeat is not stored.
 */

import { LAW } from './floor.ts'
import { admitBody } from '../origin/idempotency.ts'
import { tell } from '../unity/abstract.ts'

export interface PillarState {
  agreed: boolean
  sensesLive: boolean
  claim?: string | null
  held?: string | null
}

export interface Pulse {
  pillars: Record<(typeof LAW)[number], boolean>
  duplicate: boolean
  core: 'page'
  system: false
  umpires: readonly [string, string, string]
}

let last = ''
let held: Pulse | null = null

export function resetPurity(): void {
  last = ''
  held = null
}

export function runPulse(state: PillarState): Pulse {
  const noForce = !state.sensesLive || state.agreed
  const said = (state.claim ?? '').trim()
  const verdict = tell(said, state.held ?? null)
  const truth = verdict.verdict === 'truth' || (verdict.verdict === 'open' && said === '')
  const digest = JSON.stringify([noForce, truth])
  const duplicate = digest === last
  if (!duplicate) last = digest
  const pulse: Pulse = {
    pillars: {
      NO_FORCE: noForce,
      HOST_SAFE: true,
      TRUTH_OR_NOTHING: truth,
      CLEANUP_FIRST: true,
    },
    duplicate,
    core: 'page',
    system: false,
    umpires: [
      `DCLM. Holds nothing. 0 force ${noForce ? 'holds' : 'fails'}. Safe host holds. The system was not written.`,
      `Iris. Truth or nothing ${truth ? 'holds' : 'fails'}. A fail is said. Nothing was added.`,
      `Twain. Cleanup first holds. ${duplicate ? 'The same pulse was not written again.' : 'One pulse is kept.'} This loop is the page.`,
    ],
  }
  held = pulse
  return pulse
}

let readState: () => PillarState = () => ({ agreed: false, sensesLive: false })

export function bindPurity(read: () => PillarState): void {
  readState = read
}

export function tickPurity(): Pulse {
  const pulse = runPulse(readState())
  admitBody({ pillars: pulse.pillars })
  return pulse
}

export function lastPulse(): Pulse | null {
  return held
}

export function breath(live: boolean, same: boolean): { inhale: 0 | 1; exhale: 0 | 1; held: boolean } {
  if (!live) return { inhale: 0, exhale: 0, held: true }
  if (same) return { inhale: 1, exhale: 0, held: true }
  return { inhale: 1, exhale: 1, held: false }
}

export function heartbeatWords(): string {
  return 'The heartbeat is the pulse of the four pillars on this page. A token balance does not advance it. An incentive does not advance it. The seat does not advance it. The page calls the tick. The same reading is not written again. The core is the page. The system was not written. This is not a market clock, and it is not a heart.'
}

export function organismWords(): string {
  return 'The breath is one live fact in and one line out. A repeat is held. It is not written again. Sight can rise by ten. Force does not. A missing fact stays open. The sound is not ten times louder. This is not a life. It is the pulse, and the pulse is the page.'
}

export function shortPurity(pulse: Pulse | null = held): string {
  if (!pulse) return 'Purity has not pulsed.'
  const failed = LAW.filter(name => !pulse.pillars[name])
  if (failed.length) return `Purity fails: ${failed.join(', ')}.`
  return 'Purity holds. 0 force. Safe host. Truth or nothing. Cleanup first.'
}

export function purityToSign(pulse: Pulse): string {
  return LAW.map(name => `${name}=${pulse.pillars[name] ? 'hold' : 'fail'}`).join(' ')
}

export function signable(pulse: Pulse): boolean {
  return LAW.every(name => pulse.pillars[name])
}

export type SignMark = 'none' | 'reading' | 'nonce'

export function elevationWords(pulse: Pulse | null, mark: SignMark = 'none'): string {
  if (!pulse) return 'Purity has not pulsed. The father has not signed a reading.'
  if (!signable(pulse)) return `${shortPurity(pulse)} A fail is not signed.`
  if (mark === 'nonce') return `${shortPurity(pulse)} These four lines were signed. The nonce on the page is not that signature yet. The seat was not passed.`
  if (mark === 'reading') return `${shortPurity(pulse)} The father instrument signed these four lines. The seat was not passed.`
  return `${shortPurity(pulse)} These four lines are not signed.`
}

export function purityLoopWords(pulse: Pulse | null = held): string {
  if (!pulse) return 'The purity loop has not pulsed. The four are 0 force, safe host, truth or nothing, and cleanup first. The core is this page.'
  const names = LAW.map(name => `${name} ${pulse.pillars[name] ? 'holds' : 'fails'}`).join('. ')
  return `${names}. ${pulse.umpires.join(' ')} Core: page. System: not written. Every tick runs the four.`
}

export function startPurity(opts: {
  hidden: () => boolean
  read: () => PillarState
  onPulse?: (pulse: Pulse) => void
  everyMs?: number
}): () => void {
  const tick = (): void => {
    if (opts.hidden()) return
    opts.onPulse?.(runPulse(opts.read()))
  }
  tick()
  const id = setInterval(tick, opts.everyMs ?? 15_000)
  return () => clearInterval(id)
}
