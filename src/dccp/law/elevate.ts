/** The legal system is the four laws. They hang on a named place. They do not amend it. */

import { LAW } from './floor.ts'

export function elevate(names: readonly string[]): { laws: readonly string[]; hung: number; enacted: 0; legislature: null } {
  const seen = new Set(names.map(name => name.trim()).filter(Boolean))
  return { laws: LAW, hung: seen.size, enacted: 0, legislature: null }
}

export function elevateWords(names: readonly string[]): string {
  const row = elevate(names)
  return `The legal system is ${row.laws.join(', ')}. Those four hang on ${row.hung} named jurisdictions and sectors. No legislature is held here, so none was amended. Enacted statutes: ${row.enacted}. A sector grade is not a law. The till is closed.`
}
