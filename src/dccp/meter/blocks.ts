/** The smallest keys are one letter and one number.
 * The next block is built on the one before it. A later block is not offered.
 * The count is how many blocks are held. It is not a price. A child is not recorded.
 */

import { decisionsFor } from './wizard.ts'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function nextBlock(kind: 'letter' | 'number', known: number): { next: string; held: number; complexity: number; cost: number; worth: null } | { refused: string } {
  if (!Number.isInteger(known) || known < 0) return { refused: 'You start from nothing. A skipped block was not offered.' }
  const held = known + 1
  const cost = decisionsFor(1, held)
  if (typeof cost !== 'number') return cost
  if (kind === 'letter') {
    if (known >= LETTERS.length) return { refused: 'The letters are finished. Nothing further was named.' }
    return { next: LETTERS[known], held, complexity: held, cost, worth: null }
  }
  return { next: String(held), held, complexity: held, cost, worth: null }
}

/** A choice can plant the next idea in a bot that has signed. The old world is not a price. */
export function spendBlock(input: { choice: boolean; where: 'plant' | 'old-world'; known: number; idea: string; botSigned: boolean }): { spent: false; dollars: null; reason: string } | { spent: true; where: 'plant'; idea: string; cost: number; dollars: null } {
  if (!input.choice) return { spent: false, dollars: null, reason: 'Nothing is spent unless you choose. Nothing was planted.' }
  if (input.where === 'old-world') return { spent: false, dollars: null, reason: 'The old world is not a price. The blocks are not a dollar. Nothing was paid. The till is closed.' }
  const block = nextBlock('letter', input.known)
  if ('refused' in block) return { spent: false, dollars: null, reason: block.refused }
  const idea = input.idea.trim()
  if (idea.length < 2 || !new RegExp(`\\b${block.next}\\b`, 'i').test(idea)) return { spent: false, dollars: null, reason: 'The new idea has to carry this block. Nothing was planted.' }
  if (!input.botSigned) return { spent: false, dollars: null, reason: 'A bot that has not signed does not receive an idea. Nothing was planted.' }
  return { spent: true, where: 'plant', idea, cost: block.cost, dollars: null }
}

export function blockWords(): string {
  const a = nextBlock('letter', 0)
  const b = nextBlock('letter', 1)
  const c = nextBlock('letter', 2)
  const one = nextBlock('number', 0)
  const two = nextBlock('number', 1)
  const three = nextBlock('number', 2)
  if ('refused' in a || 'refused' in b || 'refused' in c || 'refused' in one || 'refused' in two || 'refused' in three) return 'A block was refused. The till is closed.'
  return `A letter or a number is the smallest key. The next one is built on the one before it. ${a.next} is ${a.cost}. ${b.next} is ${b.cost}. ${c.next} is ${c.cost}. ${one.next} is ${one.cost}. ${two.next} is ${two.cost}. ${three.next} is ${three.cost}. You cannot start at a later block. That is why the series begins with A B C and one two three. Complexity is how many blocks are held. The count is that complexity. If you choose, that count can plant a new idea in a bot that has signed. It does not buy a seed. The old world is not a price, so the same count pays nothing there. It is not a price. A child is not recorded. The till is closed.`
}
