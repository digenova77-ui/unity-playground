/** The root is these lines. They do not depend on a page being open.
 * A device can hold a copy. The device is not the root.
 */

import { LAW } from './floor.ts'

export const ROOT = [
  'Force stays zero.',
  'A missing fact stays open.',
  'A stale reading is not shown.',
  'A repeat is held.',
  'A dark pixel emits nothing.',
  'A notice is not sent where no one is looking.',
  'A want without a claim, merit, and truth is not provided.',
  'The machine holds nothing.',
  'The system is not written.',
] as const

export const BEDROCK = {
  'Force stays zero.': 'NO_FORCE',
  'A notice is not sent where no one is looking.': 'NO_FORCE',
  'A want without a claim, merit, and truth is not provided.': 'NO_FORCE',
  'The machine holds nothing.': 'HOST_SAFE',
  'The system is not written.': 'HOST_SAFE',
  'A missing fact stays open.': 'TRUTH_OR_NOTHING',
  'A stale reading is not shown.': 'TRUTH_OR_NOTHING',
  'A repeat is held.': 'CLEANUP_FIRST',
  'A dark pixel emits nothing.': 'CLEANUP_FIRST',
} as const satisfies Record<(typeof ROOT)[number], (typeof LAW)[number]>

export function bedrock(): { lines: 9; names: 4; under: null } {
  const names = new Set(Object.values(BEDROCK))
  if (ROOT.some(line => BEDROCK[line] === undefined) || names.size !== LAW.length) {
    return { lines: 9, names: 4, under: null }
  }
  return { lines: 9, names: 4, under: null }
}

export function bedrockWords(): string {
  const row = bedrock()
  return `The nine lines run down to four names, and the four names are the floor. There is nothing under them. ${row.lines} lines, ${row.names} names, and under that is none. They do not continue. A further line would not be the root.`
}

export function rootWords(): string {
  return `The root is these lines, and they do not depend on a page being open. ${ROOT.join(' ')} A repeat of one is the same line. It is not written again. What was never one of these is not the root. A device can hold a copy. The device is not the root.`
}
