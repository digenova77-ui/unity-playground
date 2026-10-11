/** One seat. It keeps the stem that was checked. It does not fetch the catalog. */

import { CA00 } from './disease.ts'

const KEY = 'dccpworld.icd-watch.v1'

let memory: IcdWatch | null = null

export interface IcdWatch {
  code: 'CA00'
  title: string
  open: true
  fetched: false
  at: number
}

function blank(at: number): IcdWatch {
  return { code: 'CA00', title: CA00.title, open: true, fetched: false, at }
}

export function readIcdWatch(): IcdWatch | null {
  if (memory) return memory
  if (typeof localStorage === 'undefined') return null
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? '') as IcdWatch
    if (raw?.code !== 'CA00' || raw.fetched !== false) return null
    memory = raw
    return raw
  } catch {
    return null
  }
}

/** A repeat of the same stem is the same note. */
export function noteIcdWatch(at = Date.now()): IcdWatch {
  const prior = readIcdWatch()
  if (prior) return prior
  const row = blank(at)
  memory = row
  if (typeof localStorage !== 'undefined') {
    try { localStorage.setItem(KEY, JSON.stringify(row)) } catch { /* the device could not hold it */ }
  }
  return row
}

export function icdWatchWords(row: IcdWatch | null = readIcdWatch()): string {
  const held = row ? `The note is on this device, at ${row.code}.` : 'No note is on this device yet.'
  return `One ICD seat. It keeps ${CA00.code}, ${CA00.title}. It does not fetch the catalog. Every other name stays open. A repeat is not written again. The seat runs only while this page is open. A hidden page does not check. ${held} This is not a diagnosis.`
}
