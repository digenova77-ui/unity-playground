/** Every exchange stays on this device. Nothing here deletes one.
 * What was never put in is not held. That is the sandbox, and it is not hers.
 */

import { forPartner } from '../law/partner.ts'

export interface Exchange {
  at: number
  heard: string
  said: string
}

const KEY = 'dccpworld.iris.exchanges.v1'

function norm(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function load(): Exchange[] {
  if (typeof localStorage === 'undefined') return []
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? '[]') as Exchange[]
    return Array.isArray(raw) ? raw.filter(row => row && typeof row.heard === 'string' && typeof row.said === 'string') : []
  } catch {
    return []
  }
}

let rows = load()

function save(): void {
  if (typeof localStorage === 'undefined') return
  try { localStorage.setItem(KEY, JSON.stringify(rows)) } catch { /* the device could not hold it */ }
}

export function heldExchanges(): readonly Exchange[] {
  return rows
}

export function remember(heard: string, said: string, at = Date.now()): Exchange | null {
  const partner = forPartner(heard)
  if (!partner.line) return null
  const row = { at, heard: partner.line, said: said.trim() }
  if (!row.heard || !row.said) return null
  const prior = rows.find(r => r.heard === row.heard && r.said === row.said)
  if (prior) return prior
  rows = [...rows, row]
  save()
  return row
}

export function recall(heard: string): Exchange | null {
  const key = norm(heard)
  if (!key) return null
  for (let i = rows.length - 1; i >= 0; i--) if (norm(rows[i].heard) === key) return rows[i]
  return null
}

export function memorySpeech(): string {
  const n = rows.length
  const last = rows[n - 1]
  const recent = last ? ` The last thing put in was: ${last.heard}` : ''
  return `I hold ${n} ${n === 1 ? 'exchange' : 'exchanges'} on this device. I do not drop one.${recent} They stand as a court. Time walks the plan, and a full circuit starts the next level. What has not been put in is not here. That is the sandbox, and it is on the side that has not spoken. The record does not sleep. A closed page is not a pair of eyes. When you return, what you put in is still here.`
}
