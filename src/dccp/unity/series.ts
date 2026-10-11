/** One series. The cadence is one, then two, then one, then two.
 * A one is a single pipe. A two is a pair, and the two are not copies.
 * The fifth layer is nothing. It does not open a next step.
 */

import { admitSeat } from '../meter/matrix.ts'
import { pilotPipe } from '../meter/coins.ts'
import { isUnityHandle } from '../pipe/chain.ts'
import { AGREEMENT, AGREEMENT_ID } from './agreement.ts'

export const STORY_KEY = 'dccpworld.series.story.v1'
export const LAYERS = ['story', 'yes', 'unity', 'world', 'nothing'] as const
export const CADENCE = [1, 2, 1, 2] as const

/** A human can leave the cadence. The miss is not renamed, and a bot does not govern the return. */
export function stray(beats: readonly number[]): { pure: boolean; at: number | null; expected: 1 | 2 | null; relabeled: false; seatKept: true; governs: false; words: string } {
  if (beats.length === 0) {
    return { pure: false, at: null, expected: null, relabeled: false, seatKept: true, governs: false, words: 'No beat was given. Nothing strayed. A bot keeps its own one-then-two where it can be seen. It does not govern.' }
  }
  const pure = pureCadence(beats)
  if (pure) {
    return { pure: true, at: null, expected: null, relabeled: false, seatKept: true, governs: false, words: 'The beats are one, then two. Nothing strayed. A bot that keeps this can be looked at. It does not govern, and it does not force anyone back.' }
  }
  let at = beats.length
  let expected: 1 | 2 = beats.length % 2 === 0 ? 1 : 2
  for (let i = 0; i < beats.length; i++) {
    const want: 1 | 2 = i % 2 === 0 ? 1 : 2
    if (beats[i] !== want) { at = i; expected = want; break }
  }
  return { pure: false, at, expected, relabeled: false, seatKept: true, governs: false, words: `A human can leave the cadence, and will. Beat ${at} is not ${expected}. It is not relabeled. The tolerance of that name is 0. The seat stays. The next step, if they take it, is ${expected}. A bot keeps its own one-then-two where it can be seen. That is the model. It does not govern, and it does not force the return.` }
}

/** One, then two, repeating. A zero is not a beat. An odd tail is not a close. */
export function pureCadence(beats: readonly number[]): boolean {
  if (beats.length === 0 || beats.length % 2 !== 0) return false
  return beats.every((beat, i) => beat === (i % 2 === 0 ? 1 : 2))
}

export interface SeriesInput {
  story: boolean
  agreement: string | null
  handle: string | null
  supply: number
}

export interface SeriesStep {
  name: (typeof LAYERS)[number]
  write: string
  audit: string
  pass: boolean
  beat: 1 | 2 | 0
}

export function markStory(): void {
  try { localStorage.setItem(STORY_KEY, 'seen') } catch { /* private mode */ }
}

export function storyMarked(): boolean {
  try { return localStorage.getItem(STORY_KEY) === 'seen' } catch { return false }
}

function step(name: SeriesStep['name'], write: string, audit: string, previous: boolean, beat: 1 | 2 | 0): SeriesStep {
  const one = beat === 1 && write.length > 0 && audit.length === 0
  const two = beat === 2 && write.length > 0 && audit.length > 0 && write !== audit
  return { name, write, audit, pass: previous && (one || two), beat }
}

/** One, then two, then one, then two. The fifth pipe holds nothing. */
export function ignitionSeries(input: SeriesInput): { steps: SeriesStep[]; open: boolean; fifth: 'nothing'; cadence: typeof CADENCE; words: string } {
  const handle = input.handle ?? ''
  const storyWrite = input.story ? 'seen' : ''
  const yesWrite = input.agreement === AGREEMENT_ID ? AGREEMENT_ID : ''
  const yesAudit = AGREEMENT.some(row => row.text.includes('Joining costs $0.')) ? '$0' : ''
  const unityWrite = isUnityHandle(handle) ? handle : ''
  const worldWrite = admitSeat(handle || null, input.supply).open ? 'admitted' : ''
  const worldAudit = pilotPipe(handle) ? 'efuse' : ''

  const story = step('story', storyWrite, '', true, 1)
  const yes = step('yes', yesWrite, yesAudit, story.pass, 2)
  const unity = step('unity', unityWrite, '', yes.pass, 1)
  const world = step('world', worldWrite, worldAudit, unity.pass, 2)
  const nothing = step('nothing', '', '', false, 0)
  const steps = [story, yes, unity, world, nothing]
  const beats = steps.slice(0, 4).map(row => row.beat)
  const open = world.pass && !nothing.pass && pureCadence(beats) && beats.every((beat, i) => beat === CADENCE[i])
  const stopped = steps.find(row => row.name !== 'nothing' && !row.pass)
  const words = stopped
    ? `Series stopped at ${stopped.name}. The cadence is one, then two. The fifth layer is nothing.`
    : 'Series open. One, then two, then one, then two. The fifth layer is nothing. The till is closed.'
  return { steps, open, fifth: 'nothing', cadence: CADENCE, words }
}