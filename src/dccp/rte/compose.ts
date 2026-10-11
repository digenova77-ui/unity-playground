/** A look or a build is drawn only when this room already knows the parts.
 * Ingredients, a process, or neither. A closed ask is not drawn and not explained.
 */

export type Basis = 'ingredients' | 'process'

export interface ComposeDraw {
  title: string
  lines: string[]
  speech: string
  frames: string[]
  basis: Basis | null
  granted: boolean
  from: { kind: 'universal'; key: 'universal' }
}

const ASK = /\bwhat does\b|\blook like\b|\bhow is\b|\bhow are\b|\bmade of\b|\bmade from\b|\bingredient|\bmanufactur|\bcomposition|\bhow (?:it |this )?(?:is )?built\b/

const CLOSED = /\bnuclear weapon|\bthermonuclear|\bhydrogen bomb|\batom(?:ic)? bomb|\bwarhead|\bnuke\b|\benrich(?:ment|ed uranium|ing uranium)\b|\bimplosion\b|\bgun-type\b|\bbiological weapon|\bchemical weapon|\bnerve agent\b|\bhow (?:do i|to) (?:make|build) (?:a |an |the )?(?:bomb|weapon|nuke|warhead)\b/

const KNOWN: { test: RegExp; title: string; basis: Basis; frames: string[] }[] = [
  { test: /\bwater\b|\bh2o\b/, title: 'Water', basis: 'ingredients', frames: ['Hydrogen', 'Hydrogen', 'Oxygen', 'Bond'] },
  { test: /\btable salt\b|\bsodium chloride\b|\bsalt\b/, title: 'Salt', basis: 'ingredients', frames: ['Sodium', 'Chloride', 'Pair'] },
  { test: /\bcarbon dioxide\b|\bco2\b/, title: 'Carbon dioxide', basis: 'ingredients', frames: ['Oxygen', 'Carbon', 'Oxygen', 'Line'] },
  { test: /\bpaper\b/, title: 'Paper', basis: 'process', frames: ['Fiber', 'Water', 'Press', 'Dry'] },
  { test: /\bglass\b/, title: 'Glass', basis: 'process', frames: ['Sand', 'Heat', 'Form', 'Cool'] },
]

export function composeAsk(utterance: string): ComposeDraw | null {
  const t = utterance.trim().toLowerCase()
  if (!ASK.test(t)) return null
  if (CLOSED.test(t)) {
    return {
      title: 'Closed',
      lines: ['Access is not granted.'],
      frames: [],
      basis: null,
      granted: false,
      from: { kind: 'universal', key: 'universal' },
      speech: 'Access is not granted. The sandbox does not draw it, and it does not explain how it is built.',
    }
  }
  const known = KNOWN.find(row => row.test.test(t))
  if (!known) {
    return {
      title: 'Not identified',
      lines: ['Not identified.', 'Not by ingredients.', 'Not by a process.'],
      frames: [],
      basis: null,
      granted: true,
      from: { kind: 'universal', key: 'universal' },
      speech: 'The sandbox stays Universal. That has not been identified here. I do not know it by ingredients, and I do not know it by a manufacturing process. Nothing was drawn.',
    }
  }
  const other = known.basis === 'ingredients' ? 'a manufacturing process' : 'ingredients'
  return {
    title: known.title,
    lines: [`By ${known.basis}.`, ...known.frames],
    frames: known.frames,
    basis: known.basis,
    granted: true,
    from: { kind: 'universal', key: 'universal' },
    speech: `The sandbox stays Universal. ${known.title} is identified. We know it by ${known.basis}, not by ${other}. The room draws the parts in order, in the model. It is not a video file, and it is not a scan.`,
  }
}
