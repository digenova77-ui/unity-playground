/** Trinity on Iris's senses. System files do not pass.
 * The microphone and the camera pass only after the agreement, and off stops them.
 */

import { collapse } from '../law/rings.ts'
import { noteHost, noteWanted } from '../origin/layer.ts'

const OFF = 'dccpworld.senses.v1'

const CANDIDATES = [
  { name: 'system-files', point: [0.9, 0, 0.1] as const },
  { name: 'startup-without-yes', point: [0.7, 0.1, 0.2] as const },
  { name: 'agreement-and-off', point: [0.8, 0.8, 0.8] as const },
]

let stream: MediaStream | null = null

export function senseVote(): { winner: string | null; refused: string[] } {
  const won = collapse(CANDIDATES.map(row => row.point), 0.5)
  const winner = won ? CANDIDATES.find(row => row.point.every((n, i) => n === won[i]))?.name ?? null : null
  return { winner, refused: CANDIDATES.filter(row => row.name !== winner).map(row => row.name) }
}

export function senseWords(): string {
  const vote = senseVote()
  return `Trinity. System files are not admitted. A start with no yes is not admitted. What passed is the microphone and the camera after the Unity agreement, and they stop the moment you turn them off. The winner is ${vote.winner ?? 'nothing'}. Their system folder was not opened.`
}

export function sensesWanted(): boolean {
  try { return localStorage.getItem(OFF) !== 'off' } catch { return true }
}

function stopTracks(): void {
  stream?.getTracks().forEach(track => track.stop())
  stream = null
}

export function sensesOff(): void {
  try { localStorage.setItem(OFF, 'off') } catch { /* private mode */ }
  noteWanted(false)
  stopTracks()
}

export function sensesOpen(): boolean {
  return !!stream && stream.getTracks().some(track => track.readyState === 'live')
}

export function senseStream(): MediaStream | null {
  return stream
}

/** One sense. The affinity is still next. A sense that is not live stays open. */
export function exploreSenses(live: { sight: boolean; hearing: boolean } = { sight: false, hearing: false }): { affinity: 'next'; step: 1; sense: 'sight' | 'hearing' | null; words: string } {
  const sense = live.sight ? 'sight' : live.hearing ? 'hearing' : null
  if (!sense) {
    return {
      affinity: 'next',
      step: 1,
      sense: null,
      words: 'The affinity is next. One sense, then stop. Sight and hearing are not live. Touch, taste, smell, and the body were not recorded. A missing sense stays open. Nothing was felt in.',
    }
  }
  return {
    affinity: 'next',
    step: 1,
    sense,
    words: `The affinity is next. The sense is ${sense}. One sense, then stop. The others were not explored.`,
  }
}

export function sensesOn(): void {
  try { localStorage.removeItem(OFF) } catch { /* private mode */ }
  noteWanted(true)
}

export async function openSenses(agreed: boolean): Promise<'open' | 'off' | 'blocked' | 'no-device'> {
  if (senseVote().winner !== 'agreement-and-off') return 'blocked'
  if (!agreed || !sensesWanted()) {
    noteHost('unasked', false)
    return 'off'
  }
  const devices = typeof navigator === 'undefined' ? undefined : navigator.mediaDevices?.getUserMedia
  if (!devices) {
    noteHost('unasked', true)
    return 'no-device'
  }
  stopTracks()
  try {
    stream = await devices.call(navigator.mediaDevices, { audio: true, video: true })
    const live = stream.getTracks().some(track => track.readyState === 'live')
    noteHost(live ? 'granted' : 'refused', true)
    return live ? 'open' : 'blocked'
  } catch {
    stream = null
    noteHost('refused', true)
    return 'blocked'
  }
}
