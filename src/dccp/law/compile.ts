/** Common language becomes one instruction. A sentence is not run as code.
 * The set is closed. Anything outside it is NOP.
 */

import { forPartner } from './partner.ts'

export type Op = 'shift' | 'hire' | 'publish' | 'hold' | 'none'

export interface Instruction {
  op: Op
  code: 'SHIFT' | 'HIRE 1' | 'PUBLISH' | 'HOLD' | 'NOP'
  claim: string
}

export function compile(text: string): Instruction {
  const partner = forPartner(text)
  if (!partner.line) return { op: 'none', code: 'NOP', claim: '' }
  const line = partner.line.toLowerCase()
  if (/\b(run|start|do)\b[^.]*\bshift\b|\bshift\b[^.]*\b(run|start)\b/.test(line)) return { op: 'shift', code: 'SHIFT', claim: partner.line }
  if (/\bhire (?:a |the )?bot\b/.test(line)) return { op: 'hire', code: 'HIRE 1', claim: partner.line }
  if (/\bpublish\b/.test(line)) return { op: 'publish', code: 'PUBLISH', claim: partner.line }
  if (/\b(execution code|common language|precise execution)\b/.test(line)) return { op: 'none', code: 'NOP', claim: '' }
  return { op: 'hold', code: 'HOLD', claim: partner.line }
}

/** The translator hands the worker the instruction. The sentence stays here. */
export function handToWorker(text: string): { code: Instruction['code']; given: string } {
  const made = compile(text)
  if (made.code === 'NOP' || made.code === 'HOLD') return { code: made.code, given: '' }
  return { code: made.code, given: made.code }
}

export function expertWords(text = ''): string {
  const made = text ? compile(text) : { op: 'none' as const, code: 'NOP' as const, claim: '' }
  const shown = made.op === 'hold' || made.op === 'shift' || made.op === 'hire' || made.op === 'publish'
    ? ` This line is ${made.code}.`
    : ''
  return `A translator sits between the person and the worker. The worker receives one instruction. The worker does not receive the sentence. SHIFT. HIRE 1. PUBLISH. HOLD keeps the claim and is not handed on. Anything that is not a claim is NOP. The person gives the claim and receives the instruction. The worker gives the work and receives the instruction. It does not write a new language, and it does not run a sentence as code.${shown}`
}
