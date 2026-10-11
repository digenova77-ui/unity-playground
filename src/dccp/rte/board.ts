/** Voice on the board. Clear, undo, freeze, step, and focus.
 * The room redraws from the scene already held. A command does not invent a model.
 */

import { emptyScene, type ConstructScene } from './construct.ts'

export interface BoardMove {
  scene: ConstructScene
  speech: string
}

const stack: ConstructScene[] = []
let skip = false
let hold = false
let frame = 0

export function resetBoard(): void {
  stack.length = 0
  skip = false
  hold = false
  frame = 0
}

export function noteBoard(scene: ConstructScene): void {
  if (skip) {
    skip = false
    return
  }
  stack.push(copy(scene))
  if (stack.length > 8) stack.shift()
}

export function boardClock(live: number): number {
  return hold ? frame * 1.2 + 0.05 : live
}

export function boardAsk(utterance: string): BoardMove | null {
  const t = utterance.trim().toLowerCase().replace(/[?.!]+$/g, '')
  const current = stack[stack.length - 1] ?? emptyScene()
  if (/^(?:please |can you )?clear(?: the)? (?:screen|board|room)$|^wipe(?: the)? (?:screen|board)$|^erase(?: the)? (?:screen|board)$/.test(t)) {
    hold = false
    frame = 0
    return { scene: emptyScene(), speech: 'The screen is clear. The models are off the board. Say undo to put the last one back.' }
  }
  if (/^clear(?: the)? left$|^erase(?: the)? left$/.test(t)) return clearSide(current, 'left')
  if (/^clear(?: the)? right$|^erase(?: the)? right$/.test(t)) return clearSide(current, 'right')
  if (t === 'undo') {
    if (stack.length < 2) return { scene: current, speech: 'Nothing is behind this. The board stays as it is.' }
    stack.pop()
    skip = true
    return { scene: copy(stack[stack.length - 1]), speech: 'Undone. The board is the one before this.' }
  }
  if (/^freeze$|^hold(?: the)? (?:board|screen)$/.test(t)) {
    hold = true
    return { scene: current, speech: 'Held. The frames stay where they are. Say next frame, or resume.' }
  }
  if (/^resume$|^unfreeze$/.test(t)) {
    hold = false
    return { scene: current, speech: 'Going. The frames move again.' }
  }
  if (/^next frame$|^step$/.test(t)) {
    hold = true
    frame += 1
    return { scene: current, speech: `Frame ${frame}. The board is held. Say resume to let it run.` }
  }
  if (/^focus left$|^spotlight left$/.test(t)) return focus(current, 'left')
  if (/^focus right$|^spotlight right$/.test(t)) return focus(current, 'right')
  if (/^show both$|^both sides$/.test(t)) {
    if (!current.beside) return { scene: current, speech: 'There is one model. Both sides are the same board.' }
    return { scene: { ...copy(current), focus: undefined }, speech: 'Both sides. Neither one is pulled forward.' }
  }
  return null
}

function clearSide(current: ConstructScene, side: 'left' | 'right'): BoardMove {
  if (!current.beside) return { scene: current, speech: 'There is one model. Say clear the screen.' }
  const blank = { title: 'Cleared', lines: ['Cleared.'], form: 'make' as const, frames: [] as string[], granted: true }
  if (side === 'left') {
    return {
      scene: { ...current, title: 'Cleared', lines: ['Cleared.'], form: 'make', frames: [], granted: true, beside: current.beside },
      speech: 'The left is clear. The right stays.',
    }
  }
  return { scene: { ...copy(current), beside: blank }, speech: 'The right is clear. The left stays.' }
}

function focus(current: ConstructScene, side: 'left' | 'right'): BoardMove {
  if (!current.beside) return { scene: current, speech: 'There is one model. Nothing beside it to pull forward.' }
  return { scene: { ...copy(current), focus: side }, speech: side === 'left' ? 'The left is forward. The right stays small.' : 'The right is forward. The left stays small.' }
}

function copy(scene: ConstructScene): ConstructScene {
  return {
    ...scene,
    lines: [...scene.lines],
    frames: scene.frames ? [...scene.frames] : undefined,
    beside: scene.beside ? { ...scene.beside, lines: [...scene.beside.lines], frames: scene.beside.frames ? [...scene.beside.frames] : undefined } : undefined,
  }
}
