/** Two models, when the command puts one beside the other.
 * Each side keeps the reading that fits it. A closed ask does not get a pane.
 */

import { composeAsk } from './compose.ts'
import type { ConstructScene } from './construct.ts'
import { liquidAsk } from './liquid.ts'

export interface Pane {
  title: string
  lines: string[]
  form: NonNullable<ConstructScene['form']>
  shape?: 'water' | 'co2'
  frames?: string[]
  granted?: boolean
}

export interface SplitDraw {
  left: Pane
  right: Pane
  speech: string
}

const PAIR = /(.+?) (?:beside|next to|alongside|side by side with) (.+)|^\s*split (.+?) and (.+)\s*$/

export function splitAsk(utterance: string): SplitDraw | null {
  const t = utterance.trim().toLowerCase().replace(/[?.!]+$/g, '')
  const m = t.match(PAIR)
  if (!m) return null
  const leftText = (m[1] || m[3] || '').trim()
  const rightText = (m[2] || m[4] || '').trim()
  if (!leftText || !rightText) return null
  const left = pane(leftText)
  const right = pane(rightText)
  if (left.granted === false || right.granted === false) {
    return {
      left: refused(),
      right: refused(),
      speech: 'Access is not granted. The room does not split onto that, and it does not draw it.',
    }
  }
  return {
    left,
    right,
    speech: `The sandbox stays Universal. I read two models. ${left.title} on the left, ${right.title} on the right. The room split. Each side shows the reading that fits it. Ask again if a reading changes, and that side redraws.`,
  }
}

function pane(text: string): Pane {
  const draw = liquidAsk(text)
  if (draw) return { title: draw.title, lines: ['No number fitted.', ...draw.lines].slice(0, 4), form: draw.form, shape: draw.shape, granted: true }
  const made = composeAsk(/\bwhat does\b|\blook like\b|\bhow is\b|\bmade\b/.test(text) ? text : `what does ${text} look like`)
  if (made) {
    const reading = made.frames.length ? `Parts ${made.frames.length}. By ${made.basis}.` : 'No reading fitted.'
    return { title: made.title, lines: [reading, ...made.lines].slice(0, 4), form: 'make', frames: made.frames, granted: made.granted }
  }
  return { title: 'Not identified', lines: ['No reading fitted.'], form: 'make', frames: [], granted: true }
}

function refused(): Pane {
  return { title: 'Closed', lines: ['Access is not granted.'], form: 'make', frames: [], granted: false }
}
