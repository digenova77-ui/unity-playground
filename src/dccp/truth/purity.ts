/** Purity is the table in front of a region, not a verdict on the whole place.
 * Confirmed numbers are ours. Unconfirmed numbers are cited and still being checked.
 * An agreement does not promote the unconfirmed number. A conflict lowers the score.
 */

export interface Purity {
  score: number
  /** True only when the table is a confirmed number with nothing unconfirmed and no conflict. A gradient never crosses. */
  isPure: boolean
  confirmed: number
  unconfirmed: number
  agreements: number
  conflicts: number
  words: string
}

const AGREE = 0.15

export function populationIn(statement: string): number | null {
  const lead = statement.match(/(?:population|people|residents|inhabitants)[^\d]{0,40}([\d,]{2,15})/i)
  const trail = statement.match(/([\d,]{2,15})[^\d]{0,24}(?:people|residents|inhabitants)/i)
  const raw = (lead ?? trail)?.[1]
  if (!raw) return null
  const n = Number(raw.replace(/,/g, ''))
  return Number.isFinite(n) && n > 0 ? n : null
}

export function crossPurity(confirmedPop: number | null, statements: readonly string[]): Purity {
  const confirmed = confirmedPop && confirmedPop > 0 ? 1 : 0
  let unconfirmed = 0
  let agreements = 0
  let conflicts = 0
  for (const statement of statements) {
    if (!/\d/.test(statement)) continue
    unconfirmed += 1
    const n = populationIn(statement)
    if (n === null || !confirmed) continue
    const gap = Math.abs(n - (confirmedPop as number)) / Math.max(n, confirmedPop as number)
    if (gap <= AGREE) agreements += 1
    else conflicts += 1
  }
  const total = confirmed + unconfirmed
  if (!total) {
    return { score: 0, isPure: false, confirmed: 0, unconfirmed: 0, agreements: 0, conflicts: 0, words: 'No numbers are on the table, so there is no purity score. The gate is shut.' }
  }
  const raw = (confirmed + agreements) / total
  const score = Math.round(raw * (conflicts ? 1 / (1 + conflicts) : 1) * 100) / 100
  const isPure = conflicts === 0 && unconfirmed === 0 && confirmed === 1 && score === 1
  const bare = unconfirmed === 0 ? ' Nothing unconfirmed is beside it, so this is not a verdict on the whole region.' : ''
  const gate = isPure ? ' The gate is pure: one confirmed number, no conflict, nothing unconfirmed beside it.' : ' The gate is not pure. A score is a measurement. It does not cross.'
  return {
    score,
    isPure,
    confirmed,
    unconfirmed,
    agreements,
    conflicts,
    words: `Purity ${score.toFixed(2)}. ${confirmed} confirmed, ${unconfirmed} unconfirmed, ${agreements} agree, ${conflicts} conflict. An agreement stays unconfirmed.${bare}${gate}`,
  }
}
