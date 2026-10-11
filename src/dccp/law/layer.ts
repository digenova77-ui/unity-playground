/** The logic layer on the world. One record. A public feed that is live is connected.
 * What-if does not add a fact. The same next is a loop, not a new step.
 */

const KEY = 'dccpworld.layer.v1'
const WHAT_IF = 'What if the next reading is the same. It is not a new fact.'

export interface PublicLink { key: string; state: string }

export interface LayerSave {
  live: string[]
  whatIf: string
  loops: number
}

export interface LayerStore { get(key: string): string | null; set(key: string, value: string): void }

let held: LayerSave | null = null

export function lay(links: readonly PublicLink[], prior: LayerSave | null): LayerSave {
  const live = links.filter(link => link.state === 'LIVE').map(link => link.key).sort()
  const same = prior !== null && prior.whatIf === WHAT_IF && prior.live.join() === live.join()
  return { live, whatIf: WHAT_IF, loops: same ? prior.loops + 1 : prior?.loops ?? 0 }
}

export function layerWords(row: LayerSave | null = held): string {
  if (!row) return 'The logic layer is not on the world yet.'
  const connected = row.live.length ? row.live.join(', ') : 'none'
  return `Logic on the world. Public and live: ${connected}. ${row.whatIf} Loop ${row.loops}.`
}

export function holdLayer(row: LayerSave): void {
  held = row
}

export function lastLayer(): LayerSave | null {
  return held
}

export function saveLayer(row: LayerSave, store: LayerStore): boolean {
  const raw = JSON.stringify(row)
  if (store.get(KEY) === raw) return false
  store.set(KEY, raw)
  return true
}

export function readLayer(store: LayerStore): LayerSave | null {
  const raw = store.get(KEY)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as Partial<LayerSave>
    if (!parsed || !Array.isArray(parsed.live) || parsed.whatIf !== WHAT_IF || typeof parsed.loops !== 'number') return null
    return { live: parsed.live.filter((key): key is string => typeof key === 'string'), whatIf: WHAT_IF, loops: parsed.loops }
  } catch {
    return null
  }
}
