/** A toddler thing. A child cannot approve it. A grown-up with a Unity ID can.
 * This device cannot check that the grown-up is the parent. Access cannot be bought.
 */

import { ease } from './ease.ts'

export const TODDLER = ['blocks', 'a picture', 'a song', 'a story'] as const
export type ToddlerThing = (typeof TODDLER)[number]

interface Grant {
  thing: ToddlerThing
  handle: string
}

const KEY = 'dccpworld.toddler.v1'
let memory: Grant[] = []

function load(): Grant[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw) as Grant[]
  } catch { /* node or private mode */ }
  return memory
}

function save(rows: Grant[]): void {
  memory = rows
  try { localStorage.setItem(KEY, JSON.stringify(rows)) } catch { /* keep memory */ }
}

export function approveThing(input: { thing: string; consent: boolean; handle: string | null; by: 'child' | 'guardian' }): { ok: false; reason: string } | { ok: true; thing: ToddlerThing; handle: string } {
  if (input.by !== 'guardian') return { ok: false, reason: 'A child does not approve. A grown-up says yes. Nothing was stored.' }
  if (!input.consent) return { ok: false, reason: 'No thing without a grown-up\'s yes. Nothing was stored.' }
  if (!input.handle) return { ok: false, reason: 'The grown-up\'s Unity ID is not bound. Nothing was stored.' }
  if (!TODDLER.includes(input.thing as ToddlerThing)) return { ok: false, reason: 'That is not a toddler thing. Nothing was stored.' }
  const thing = input.thing as ToddlerThing
  const rows = load().filter(row => !(row.handle === input.handle && row.thing === thing))
  rows.unshift({ thing, handle: input.handle })
  save(rows.slice(0, 40))
  return { ok: true, thing, handle: input.handle }
}

export function childHas(handle: string | null): readonly ToddlerThing[] {
  if (!handle) return []
  return load().filter(row => row.handle === handle).map(row => row.thing)
}

export function toddlerWords(handle: string | null): string {
  const has = childHas(handle)
  const held = has.length ? `You have ${has.join(', ')}.` : 'You have nothing yet.'
  return `${ease().child} ${held} ${ease().guardian}`
}
