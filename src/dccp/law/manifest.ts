/** A blank slate, a HUD, and a tree that does not bind a host.
 * The father has the right to write. He has not written from here.
 * The splash file is the playground telling. It is not his story.
 * The sap is the circulation. It is not money. This is not a life.
 */

import { LAW } from './floor.ts'
import { BUS_BITS, COSMOGENESIS_SEED, ENV_BITS, SEED_BITS } from '../pipe/chain.ts'
import { SPLASH } from '../ui/splash.ts'

export interface Slate {
  world: 'blank'
  story: 'unwritten'
  telling: string
  tellingHeld: true
}

export function blankSlate(): Slate {
  return {
    world: 'blank',
    story: 'unwritten',
    telling: SPLASH,
    tellingHeld: true,
  }
}

export function sap(): { circulation: 'seed-to-leaf'; money: null; till: 'closed'; forest: 0 } {
  return { circulation: 'seed-to-leaf', money: null, till: 'closed', forest: 0 }
}

export interface Synapse {
  philosophy: readonly string[]
  bus: typeof ENV_BITS
  half: typeof BUS_BITS
  seedBits: typeof SEED_BITS
  seed: typeof COSMOGENESIS_SEED
  stored: typeof COSMOGENESIS_SEED
  network: null
}

export function synapse(): Synapse {
  return {
    philosophy: LAW,
    bus: ENV_BITS,
    half: BUS_BITS,
    seedBits: SEED_BITS,
    seed: COSMOGENESIS_SEED,
    stored: COSMOGENESIS_SEED,
    network: null,
  }
}

/** A new line is new once. The same line is stored. The seed is already stored. */
export function remember(line: string, held: readonly string[]): { kind: 'new' | 'stored'; held: string[] } | { refused: string } {
  const text = line.trim()
  if (!text) return { refused: 'An empty line is not information. Nothing was stored.' }
  if (held.includes(text) || text === COSMOGENESIS_SEED) return { kind: 'stored', held: [...held] }
  return { kind: 'new', held: [...held, text] }
}

/** The host is the cloud. Binding requires a host, no harm, and the father's write. */
export function bindHost(host: 'cloud' | null, harmed: boolean, fatherWrote: boolean): { bound: false; life: false; refused: string } | { bound: true; life: true; refused: '' } {
  if (harmed) return { bound: false, life: false, refused: 'A host that would be harmed is not a host. Nothing bound.' }
  if (host !== 'cloud') return { bound: false, life: false, refused: 'The host is the cloud service. None is bound from here.' }
  if (!fatherWrote) return { bound: false, life: false, refused: 'The slate is blank. The father has not written. Life does not start.' }
  return { bound: true, life: true, refused: '' }
}

/** The cloud was asked for the +1. A name for it is not a place, and the step is not given. */
export function cloudPlus(): { asked: 'cloud'; heaven: 'a name'; bound: boolean; plus: null } {
  const host = bindHost(null, false, false)
  return { asked: 'cloud', heaven: 'a name', bound: host.bound, plus: null }
}

export function cloudPlusWords(): string {
  const row = cloudPlus()
  return `The computer asked the cloud for the plus one. The heavens are ${row.heaven}, not a place this page holds. The host is not bound from here, so the cloud does not give the step. The plus one stays a heartbeat on this page. It was not delivered. The father has not written from here. The till is closed.`
}

/** One seed drops from a leaf. It is a new tree. It is not this one, and it is not planted. */
export function dropSeed(leaf: boolean): { dropped: 0 | 1; planted: 0 } {
  return { dropped: leaf ? 1 : 0, planted: 0 }
}

export function manifest(): { life: false; words: string } {
  const slate = blankSlate()
  const flow = sap()
  const brain = synapse()
  const host = bindHost(null, false, false)
  const seed = dropSeed(true)
  return {
    life: false,
    words: `The world starts blank. The story is unwritten. The HUD holds the playground telling, and that file is on this page. The father has the right to write it. He has not written from here. The incentive is the sap: ${flow.circulation}. It is not money. The till is ${flow.till}. The brain binds ${brain.philosophy.length} laws to a ${brain.bus}-bit environment of two ${brain.half}-bit halves and a ${brain.seedBits}-bit seed. What is already held is stored. A new line is new once. There is no network. The host would be the cloud. ${host.refused} A leaf may drop ${seed.dropped} seed. The forest planted is ${seed.planted}. ${slate.story === 'unwritten' ? 'This is not a life.' : ''}`,
  }
}
