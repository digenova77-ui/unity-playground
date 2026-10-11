/** After the interface is loaded, the room is empty.
 * The next claim writes it. A canned line is not added.
 */

import { compile } from '../law/compile.ts'
import { divine } from '../law/divine.ts'
import { forPartner } from '../law/partner.ts'
import { frameObscure, obscureLines, obscureWords } from './obscure.ts'
import { sceneFrom, type ConstructScene } from './construct.ts'

const BLOCK = /\b(remount|\/system|system partition|private key|father\.pem|circumvent|write access)\b|\bbuy\b.{0,40}\b(child|children|roster|database)\b/

export interface FreeDraw {
  refused: boolean
  speech: string
  scene: ConstructScene | null
}

/** The floor on load. No topic is drawn until someone asks. */
export function openFloor(): ConstructScene {
  const opened = divine()
  if (opened.rings !== 3) {
    return { title: 'Universal', lines: [opened.speech], empty: true, from: { kind: 'universal', key: 'universal' } }
  }
  return { title: 'Universal', lines: [], empty: true, from: { kind: 'universal', key: 'universal' } }
}

export function freeDraw(text: string, _account: string | null): FreeDraw {
  const ask = text.trim().replace(/\s+/g, ' ')
  if (!ask) return { refused: true, speech: 'Nothing was asked. Nothing was drawn.', scene: null }
  if (BLOCK.test(ask.toLowerCase())) return { refused: true, speech: 'The three rings do not hold that. It circumvents, so it is not drawn.', scene: null }
  const partner = forPartner(ask)
  if (!partner.line) return { refused: true, speech: partner.why, scene: null }
  const made = compile(partner.line)
  if (made.code === 'SHIFT' || made.code === 'HIRE 1' || made.code === 'PUBLISH') {
    return { refused: true, speech: `That is ${made.code}. The worker takes it. It is not a room.`, scene: null }
  }
  if (made.code !== 'HOLD') return { refused: true, speech: 'Nothing was drawn.', scene: null }
  const opened = divine()
  if (opened.rings !== 3) return { refused: true, speech: opened.speech, scene: null }
  const frame = frameObscure(ask)
  const scene = sceneFrom(frame.asked.slice(0, 40), obscureLines(frame), { kind: 'universal', key: 'universal' })
  return { refused: false, speech: obscureWords(frame), scene }
}
