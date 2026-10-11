/** The light stays on only while logical decisions outweigh illogical thought.
 * The place is a diamond. The floor is 0 and the ceiling is 1.
 * The width is set by the one who measures. Time is not an axis.
 * One heartbeat moves one axis by +1 and stays on the diamond. The gate burns.
 */

import { diamond } from '../pipe/chain.ts'

export interface Cell {
  x: number
  y: number
  z: number
}

export function light(logical: number, illogical: number): { on: boolean } | { refused: string } {
  if (!Number.isInteger(logical) || !Number.isInteger(illogical) || logical < 0 || illogical < 0) {
    return { refused: 'A count has to be a whole number from zero. Nothing was weighed.' }
  }
  return { on: logical > illogical }
}

/** The only admitted next step. Forever is not offered. A squeeze is not a force. */
export function nextChoice(logical: number, illogical: number, width: number): { step: 1; floor: 0; ceiling: 1; width: number; forever: false; squeeze: false } | { refused: string } {
  const gate = light(logical, illogical)
  if ('refused' in gate) return gate
  if (!gate.on) return { refused: 'The light is off. A tie is not a next step.' }
  const box = diamond(width)
  if ('refused' in box) return box
  return { step: 1, floor: box.floor, ceiling: box.ceiling, width: box.width, forever: false, squeeze: false }
}

/** What if is the question. Next is +1. Together they name this step, and no later one. */
export function whatIfNext(asked: boolean, next: { step: 1 } | { refused: string }): { equation: 'what if ∧ next = most important'; step: 1; most: 'this next step'; ever: false; both: true } | { refused: string } {
  if (!asked) return { refused: 'A what-if was not asked. The next step was not named most important.' }
  if ('refused' in next) return next
  return { equation: 'what if ∧ next = most important', step: next.step, most: 'this next step', ever: false, both: true }
}

export function whatIfWords(): string {
  return 'The equation is what if and next equals most important. What if is the question. Next is +1, and only while logical decisions outweigh illogical ones. A tie is not a next step. That next step is the most important one that can be named, because an earlier step is already burned and a later step is not written. Ever is not a count. Both halves name this. No title was granted.'
}

/** One heartbeat is +1. A jump, a repeat, and a step backward are not one beat. */
export function beat(before: number, after: number): { step: 1 } | { refused: string } {
  if (!Number.isInteger(before) || !Number.isInteger(after) || before < 0 || after < 0) {
    return { refused: 'A beat has to land on whole numbers from zero. Nothing was counted.' }
  }
  if (after !== before + 1) return { refused: 'One heartbeat is +1. A jump, a repeat, and a step backward are not one beat.' }
  return { step: 1 }
}

function onDiamond(cell: Cell, width: number): true | { refused: string } {
  const box = diamond(width)
  if ('refused' in box) return box
  for (const n of [cell.x, cell.y, cell.z]) {
    if (n < box.floor) return { refused: 'That is below the bedrock. The floor is 0. Nothing was written.' }
    if (n > box.ceiling) return { refused: 'That is above the ceiling. The ceiling is 1. Nothing was written.' }
    if (n !== box.floor && n !== 0 && n !== box.ceiling) return { refused: 'A cell sits on the bedrock, the origin, or the ceiling. Nothing was written.' }
  }
  if (Math.abs(cell.x) + Math.abs(cell.y) + Math.abs(cell.z) > box.width) return { refused: 'That cell is off the diamond. Nothing was written.' }
  return true
}

/** One axis moves +1. The arrival stays on the diamond. A decrease is going back. */
export function step(from: Cell, to: Cell, width: number, burned: boolean): { burned: true; time: 1; knowledge: true; at: Cell } | { burned: true; time: 0; knowledge: 0; at: Cell } | { refused: string } {
  const here = onDiamond(from, width)
  if (here !== true) return here
  const there = onDiamond(to, width)
  if (there !== true) return there
  const delta = [to.x - from.x, to.y - from.y, to.z - from.z]
  if (delta.some(n => n < 0)) return { refused: 'The geometry is irreversible. A decision does not go back in time.' }
  const moved = delta.filter(n => n !== 0)
  if (moved.length !== 1 || moved[0] !== 1) return { refused: 'One heartbeat moves one axis by +1. A jump is not a beat.' }
  if (burned) return { burned: true, time: 0, knowledge: 0, at: from }
  return { burned: true, time: 1, knowledge: true, at: to }
}

/** Each cell is one heartbeat from the last, and every cell stays on the diamond. */
export function forward(cells: readonly Cell[], width: number): { time: number; at: Cell } | { refused: string } {
  if (cells.length < 2) return { refused: 'A path needs two cells.' }
  let time = 0
  for (let i = 1; i < cells.length; i++) {
    const moved = step(cells[i - 1], cells[i], width, false)
    if ('refused' in moved) return moved
    time += moved.time
  }
  return { time, at: cells[cells.length - 1] }
}

export function lightWords(): string {
  return 'The light stays on only while logical decisions outweigh illogical thought. A tie is not enough. The place is a diamond. The floor is the bedrock, and the bedrock is 0. Nothing is written below it. The ceiling is 1. The width is set by the one who measures. Time is not an axis. One heartbeat moves one axis by +1 and stays on the diamond. The geometry is irreversible. The logic gate burns. A burned cell adds no knowledge and time does not go backward. This is not a heart.'
}
