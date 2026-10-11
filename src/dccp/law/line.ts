/** A deterministic gate has one successor. That is a straight step.
 * The step is right only when the gate matches the specification.
 * An unknown gate is not smashed. A guess is not a smash.
 */

export interface Step {
  straight: true
  right: boolean
}

export function smash(known: boolean, matches: boolean): Step | { refused: string } {
  if (!known) return { refused: 'The gate is not known. It is not smashed. A guess is not a smash.' }
  return { straight: true, right: matches }
}

export function line(steps: readonly Step[]): { straight: true; right: boolean; length: number } | { refused: string } {
  if (steps.length === 0) return { refused: 'A path with no gate is not a line. Nothing was proved.' }
  return { straight: true, right: steps.every(step => step.right), length: steps.length }
}

export function lineWords(): string {
  return 'A deterministic gate has one successor, so the path is a straight line. The same smash lands in the same place. That is not a guess. The line is the right answer only when every gate matches the specification. One gate that does not match still goes straight, and it arrives at the wrong place every time. An unknown gate is not smashed. A guess is not a smash. Nothing was proved past the gates that match.'
}
