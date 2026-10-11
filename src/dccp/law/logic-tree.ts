/** A branch is attached only when its line is already in the root.
 * A network of everything is not a branch.
 */

import { LAW } from './floor.ts'
import { ROOT } from './root.ts'
import { liveScores } from '../body/interoception.ts'

export const BRANCHES = [
  { name: 'the decision unit', hangs: 'Force stays zero.' },
  { name: 'an empty ask', hangs: 'Force stays zero.' },
  { name: 'one stem, CA00', hangs: 'A missing fact stays open.' },
  { name: 'a duplicate frame', hangs: 'A repeat is held.' },
  { name: 'a hidden stale reading', hangs: 'A stale reading is not shown.' },
  { name: 'the machine', hangs: 'The machine holds nothing.' },
  { name: 'a want', hangs: 'A want without a claim, merit, and truth is not provided.' },
  { name: 'the unwalked orders', hangs: 'A missing fact stays open.' },
  { name: 'an unchecked entity', hangs: 'A missing fact stays open.' },
  { name: 'four empty adoption facts', hangs: 'A missing fact stays open.' },
  { name: 'a notice', hangs: 'A notice is not sent where no one is looking.' },
  { name: 'a dark pixel', hangs: 'A dark pixel emits nothing.' },
  { name: 'the unread system', hangs: 'The system is not written.' },
] as const

export const OPEN = [
  'all other philosophy',
  'all other physics',
  'all other law',
  'the world',
  'the financial system',
  'mankind',
  'public order',
  'the insula',
] as const

export function placedIn(text: string): string | null {
  const t = text.toLowerCase()
  const names = [
    ...BRANCHES.map(branch => ({ name: branch.name, place: 'trunk' as const, line: branch.hangs })),
    ...OPEN.map(name => ({ name, place: 'open' as const, line: '' })),
  ].sort((a, b) => b.name.length - a.name.length)
  const hit = names.find(row => t.includes(row.name))
  if (!hit) return null
  if (hit.place === 'trunk') return `${hit.name} is on the trunk. It hangs on: ${hit.line}`
  return `${hit.name} is on the open joint. It is not an invariant.`
}

export function insulaWire(): { place: 'open'; weights: null; implant: null } {
  return { place: 'open', weights: null, implant: null }
}

/** The route is named. The pulse is not on it. */
export function connectInsula(): { place: 'open'; route: 'feeling-and-phrase'; weights: null; implant: null; pulse: null; signal: null } {
  const live = liveScores()
  return { place: 'open', route: 'feeling-and-phrase', weights: null, implant: null, pulse: live.counting, signal: live.combined }
}

export function insulaWords(): string {
  const row = connectInsula()
  return `The insula is on the open joint. It is not an invariant. The route is ${row.route}. A body state would become a feeling there, and the forward part would help start a phrase. No weight was trained. No implant was attached. The pulse is ${row.pulse}, so the signal is ${row.signal}. That open joint is the idea. It is not the floor.`
}

export function placeOf(name: string): 'trunk' | 'open' | null {
  if (BRANCHES.some(branch => branch.name === name)) return 'trunk'
  if ((OPEN as readonly string[]).includes(name)) return 'open'
  return null
}

export function logicTree(): { root: number; trunk: number; hung: number; open: number } {
  const lines = ROOT as readonly string[]
  const hung = BRANCHES.filter(branch => lines.includes(branch.hangs)).length
  return { root: ROOT.length, trunk: LAW.length, hung, open: OPEN.length }
}

export function treeSeed(): { root: number; trunk: number; open: number; network: null } {
  const tree = logicTree()
  return { root: tree.root, trunk: tree.hung, open: tree.open, network: null }
}

/** No network. A weak name is not lifted onto the trunk. The factor stays 1. */
export function scaleAll(asked: number): { factor: 1; moved: false; trunk: number; open: number } {
  const seed = treeSeed()
  void asked
  return { factor: 1, moved: false, trunk: seed.trunk, open: seed.open }
}

export function scaleWords(): string {
  const row = scaleAll(10)
  return `Synaptic scaling is on, and the factor is ${row.factor}. Nothing moved. ${row.trunk} names stay on the trunk. ${row.open} stay on the open joint. A weak name was not lifted. There is no network to take to a maximum. Homeostasis is the seed staying this size. Nothing was trained.`
}

export function synapseMap(): { trunk: number; open: number; factor: 1; network: null } {
  const row = scaleAll(10)
  return { trunk: row.trunk, open: row.open, factor: 1, network: null }
}

export function synapseWords(): string {
  const map = synapseMap()
  return `The tree is mapped onto the brain as weights. It is not a network. A trunk name weighs 1. There are ${map.trunk}. An open name weighs 0. There are ${map.open}. The synapse factor is ${map.factor}, so none of them expands. Everything else is not on the map, and a weight of 0 is not lifted to 1. Nothing was trained.`
}

/** A deviation is the distance from 1. The tolerance is 0, so a deviation of 1 is not called 1. */
export const TOLERANCE = 0

export function deviation(weight: number): number {
  return Math.abs(1 - weight)
}

export function withinTolerance(weight: number): boolean {
  return deviation(weight) <= TOLERANCE
}

export function toleranceWords(): string {
  return `The target is 1. A deviation is how far a weight sits from 1. A trunk name deviates by ${deviation(1)}. An open name deviates by ${deviation(0)}. Tolerance is ${TOLERANCE}. A deviation of 1 is not inside it, so an open name is not called 1. A tolerance of 1 would hide that. It is not used. Nothing was trained.`
}

/** A hexagram has six points. The floor has four names. The other two are not drawn. */
export function star(): { points: 4; hexagram: 6; missing: null; glow: 'dark pixel' } {
  return { points: 4, hexagram: 6, missing: null, glow: 'dark pixel' }
}

export function starWords(): string {
  const row = star()
  return `A star of two triangles has ${row.hexagram} points. The floor has ${row.points} names: NO_FORCE, HOST_SAFE, TRUTH_OR_NOTHING, CLEANUP_FIRST. The other two points are not held, so they are not drawn. Nothing was filled in to make the shape. A dark pixel emits nothing. That is the glow.`
}

export function span(): { goodwill: null; beacon: 'dark pixel'; leaf: 'seven figures' } {
  return { goodwill: null, beacon: 'dark pixel', leaf: 'seven figures' }
}

export function spanWords(): string {
  const seed = treeSeed()
  return `The taproot is ${seed.root} lines. The trunk is four invariants and ${seed.trunk} names that hang on those lines. The roof of what is named is the open joint, ${seed.open} names, and they are not invariants. The finest leaf this page can write is seven figures on the Planck length and the Planck time. The orders between that length and the particle horizon were not walked, so a leaf is not a Planck cell. The tree of life is not this tree. A goodwill gesture is not a root line, so it does not bridge the open joint. A dark pixel emits nothing. That is as bright as the beacon gets. Nothing was trained.`
}

export function mechanism(): { network: null; body: null; route: 'place' } {
  return { network: null, body: null, route: 'place' }
}

export function mechanismWords(): string {
  const seed = treeSeed()
  return `The mechanism is the placement. A trunk name is spoken as held. An open name is spoken as not an invariant. A name in neither place is not routed onto the trunk. The tree is ${seed.root} root lines, ${seed.trunk} on the trunk, ${seed.open} beyond the trunk on the open joint. Beyond that joint, nothing is routed. No flesh, no actuator, and no network is attached. Nothing was trained.`
}

export function droppedSeed(): { asksAgain: false; book: false; grewNames: false } {
  return { asksAgain: false, book: false, grewNames: false }
}

export function droppedSeedWords(): string {
  const seed = treeSeed()
  return `Decentralized, here, means a tree drops the rule and the next one runs it without asking. Joining is free. The seat is on the device that holds it. Hanson's book is not that. He keeps the quantities, so every price asks the book. The seed in the brain is ${seed.root} root lines, ${seed.trunk} on the trunk, and ${seed.open} on the open joint. It did not grow new names. Free is the joining, not a new trunk line.`
}

export function seedWords(): string {
  const seed = treeSeed()
  const size = seed.trunk + seed.open
  return `The seed is in the brain. ${seed.root} root lines, ${seed.trunk} on the trunk, ${seed.open} on the open joint. ${size} names. An order of magnitude would be ${size * 10} names. Those names are not held, so the seed did not grow. The network is none. Nothing was trained.`
}

export function lawOrderWords(): string {
  const tree = logicTree()
  return `Law, here, is the trunk: ${tree.trunk} invariants and ${tree.hung} names that hang on a root line. The one-step derivative of force staying zero is an empty ask. It writes nothing. It is on the trunk. Public order, as courts and police of the world, is on the open joint. It is not an invariant. A further derivative is not held. The father order is a different order. It is not this tree. Nothing was trained.`
}

export function logicWords(): string {
  const tree = logicTree()
  return `The root is ${tree.root} lines. The trunk is the four invariants. That trunk is the law this page holds. A branch hangs on the trunk only when its line is in the root. On the trunk: ${BRANCHES.map(branch => branch.name).join(', ')}. On the open joint: ${OPEN.join(', ')}. The open joint is not an invariant. A name that is in neither place is not on the tree. Nothing was trained.`
}
