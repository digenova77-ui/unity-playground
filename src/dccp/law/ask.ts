/** The five questions, and the escapes that do not add a cell.
 * The who seats the question. The who is not handed the world.
 */

import { tell } from '../unity/abstract.ts'

export function rightQuestion(claim: string, held: string | null): { step: 1; verdict: 'truth' | 'lie' | 'open'; words: string } {
  const verdict = tell(claim, held).verdict
  const guide = verdict === 'truth'
    ? 'The guidance is the fact that was already held.'
    : verdict === 'lie'
      ? 'The guidance is that this claim does not match what is held.'
      : 'The guidance is that the fact is still open. Nothing was filled in.'
  return {
    step: 1,
    verdict,
    words: `Ask the right question. ${guide} Then one step, and stop. Step by step is the path to the truth. The sentence is not the truth.`,
  }
}

export function fiveAsk(): {
  who: 'the asker'
  everything: false
  written: false
  words: string
} {
  return {
    who: 'the asker',
    everything: false,
    written: false,
    words: 'You are the who that asked. That seats the question. It does not seat the answers. Why: next exists, so thinking has not arrived at the one after this. What: one cell, or a refusal, or an open. Everything is not a source. Where: a held place, or no place. The seed is under the floor and is not a where. When: one heartbeat, a whole number plus one. Not every time. How: the gate, without force. The record is repeated. A missing fact is not added. The audit is why everywhere does not pay.',
  }
}

export function tieObserver(handle: string | null): { observer: string | null; credential: false; mapped: false; words: string } {
  const seat = typeof handle === 'string' && handle.startsWith('unity:') ? handle : null
  if (!seat) {
    return { observer: null, credential: false, mapped: false, words: 'No Unity seat is here. The observer is not named. A question does not map a place or a minute.' }
  }
  return { observer: seat, credential: false, mapped: false, words: `The observer is ${seat}. That is the Unity seat, and only that. It is not a credential. It does not map a place or a minute the seat was not in.` }
}

export function beyondAsk(kind: 'dimensions' | 'light' | 'wave'): { written: false; axes: 3; words: string } {
  const words = kind === 'dimensions'
    ? 'Three axes are already seated: logic, truth, and pragmatism. The step is travel, not a fourth place. A new parameter with no measurement is not a cell. Nothing was written.'
    : kind === 'light'
      ? 'Next exists, so thinking has not arrived. That is not a measurement of the speed of light. The mesh was not timed against light. Nothing was written.'
      : 'The quantum record has no pair, no counts, and no fidelity. The wave is not a register. A leaf is not a Planck cell. Nothing was written.'
  return { written: false, axes: 3, words }
}
