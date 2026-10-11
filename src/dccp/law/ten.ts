/** A ten-item code is a second telling. It is applied only if a limit has nowhere to hang. */

import { LAW } from './floor.ts'

const HUNG: readonly { limit: string; on: (typeof LAW)[number] }[] = [
  { limit: 'Unity is the only unit, and it is not a price', on: 'NO_FORCE' },
  { limit: 'eFuse is not sold', on: 'NO_FORCE' },
  { limit: 'A want is not provided', on: 'NO_FORCE' },
  { limit: 'The system is not written', on: 'HOST_SAFE' },
  { limit: 'The machine holds nothing', on: 'HOST_SAFE' },
  { limit: 'A repeat is not stored again', on: 'CLEANUP_FIRST' },
  { limit: 'A dark pixel emits nothing', on: 'CLEANUP_FIRST' },
  { limit: 'A missing fact stays open', on: 'TRUTH_OR_NOTHING' },
  { limit: 'The fifth 2P5L layer is nothing', on: 'TRUTH_OR_NOTHING' },
  { limit: 'A stale reading is not shown', on: 'TRUTH_OR_NOTHING' },
]

export function tenNeeded(): { needed: false; added: 0; hung: number } {
  const loose = HUNG.filter(row => !LAW.includes(row.on))
  if (loose.length > 0) return { needed: false, added: 0, hung: HUNG.length - loose.length }
  return { needed: false, added: 0, hung: HUNG.length }
}

export function tenWords(): string {
  const row = tenNeeded()
  return `Ten commandments are not needed. ${row.hung} limits already hang on ${LAW.join(', ')}. None of them is loose. A tenth list would be a second telling, and it was not added. The three coins stay three limits.`
}
