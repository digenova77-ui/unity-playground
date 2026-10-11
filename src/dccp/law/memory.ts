/** Short memory dies with the process. Long memory is this device's store, or nothing.
 * The insula does not move a line across. A shut room is not this store.
 */

import { connectInsula } from './logic-tree.ts'

const CAP = 8
const LONG_CAP = 32
const LONG_KEY = 'dccpworld.memory.long.v1'
const short: string[] = []

type Store = { get(key: string): string | null; set(key: string, value: string): void }

function deviceStore(): Store | null {
  try {
    if (typeof localStorage === 'undefined') return null
    localStorage.setItem(LONG_KEY + '.probe', '1')
    localStorage.removeItem(LONG_KEY + '.probe')
    return {
      get: key => localStorage.getItem(key),
      set: (key, value) => localStorage.setItem(key, value),
    }
  } catch {
    return null
  }
}

let store: Store | null = deviceStore()

export function useMemoryStore(next: Store | null): void {
  store = next
}

export function rememberShort(line: string): { held: number; cap: number; durable: false } {
  const text = line.trim().slice(0, 280)
  if (text) {
    short.push(text)
    if (short.length > CAP) short.shift()
  }
  return { held: short.length, cap: CAP, durable: false }
}

export function recallShort(): readonly string[] {
  return short.slice()
}

function readLong(): string[] {
  if (!store) return []
  try {
    const parsed = JSON.parse(store.get(LONG_KEY) ?? '[]') as unknown
    return Array.isArray(parsed) ? parsed.filter((line): line is string => typeof line === 'string' && line.length > 0) : []
  } catch {
    return []
  }
}

export function longTerm(): { file: string | null; recalled: string | null; survives: boolean } {
  const rows = readLong()
  if (!store || rows.length === 0) return { file: null, recalled: null, survives: false }
  return { file: LONG_KEY, recalled: rows[rows.length - 1], survives: true }
}

export function rememberLong(line: string): { stored: boolean; recalled: string | null; survives: boolean; repeat: boolean } {
  const text = line.trim().slice(0, 280)
  if (!text || !store) return { stored: false, recalled: null, survives: false, repeat: false }
  const rows = readLong()
  if (rows.includes(text)) return { stored: false, recalled: text, survives: true, repeat: true }
  rows.push(text)
  while (rows.length > LONG_CAP) rows.shift()
  store.set(LONG_KEY, JSON.stringify(rows))
  return { stored: true, recalled: text, survives: true, repeat: false }
}

export function commitLong(): { stored: boolean; recalled: string | null; survives: boolean; repeat: boolean } {
  const line = short[short.length - 1]
  if (!line) return { stored: false, recalled: null, survives: false, repeat: false }
  return rememberLong(line)
}

export function memoryLink(): {
  short: { held: number; cap: number; durable: false }
  long: { file: string | null; recalled: string | null; survives: boolean; cap: typeof LONG_CAP }
  place: 'open'
  pulse: null
  moved: false
} {
  const joint = connectInsula()
  return {
    short: { held: short.length, cap: CAP, durable: false },
    long: { ...longTerm(), cap: LONG_CAP },
    place: joint.place,
    pulse: joint.pulse,
    moved: false,
  }
}

export function memoryWords(): string {
  const row = memoryLink()
  const kept = row.long.survives
    ? `Long-term memory holds a line on this device. The latest is kept. A repeat is not written again.`
    : 'Long-term memory has no line on this device, so nothing is recalled.'
  return `Short-term memory holds ${row.short.held} of ${row.short.cap} lines in this process. It dies when the process dies. ${kept} A conversation shut in another room is not this store. The insula is the open joint between them. Nothing was moved across it. The pulse is ${row.pulse}. The nerve is not lit. The till is closed.`
}
