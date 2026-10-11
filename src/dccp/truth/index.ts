/** The purity index. One row per region that has a number on the table.
 * A region with nothing on the table is left off. The mean is not a verdict on the Earth.
 */

import { crossPurity } from './purity.ts'
import { impureRows } from './impurity.ts'

export interface IndexRow {
  name: string
  score: number
  confirmed: number
  unconfirmed: number
  conflicts: number
}

export interface PurityIndex {
  rows: IndexRow[]
  counted: number
  skipped: number
  mean: number | null
  words: string
}

export function purityIndex(regions: readonly { name: string; pop: number | null; statements?: readonly string[] }[]): PurityIndex {
  let skipped = 0
  const rows: IndexRow[] = []
  for (const region of regions) {
    const purity = crossPurity(region.pop, region.statements ?? [])
    if (!region.pop || region.pop <= 0) {
      if (purity.unconfirmed === 0) { skipped += 1; continue }
    }
    if (purity.confirmed + purity.unconfirmed === 0) { skipped += 1; continue }
    rows.push({ name: region.name, score: purity.score, confirmed: purity.confirmed, unconfirmed: purity.unconfirmed, conflicts: purity.conflicts })
  }
  rows.sort((a, b) => a.score - b.score || a.name.localeCompare(b.name))
  const mean = rows.length ? Math.round((rows.reduce((sum, row) => sum + row.score, 0) / rows.length) * 100) / 100 : null
  const impure = impureRows(rows)
  const bare = rows.length > 0 && rows.every(row => row.unconfirmed === 0)
  const words = mean === null
    ? 'The purity index is empty. No region has a number on the table.'
    : `Purity index. ${rows.length} ${rows.length === 1 ? 'region' : 'regions'} on the table. ${skipped} left off. Mean ${mean.toFixed(2)}. ${impure} of ${rows.length} ${rows.length === 1 ? 'row is' : 'rows are'} impure. The mean does not wash them.${bare ? ' Every row is a confirmed population with nothing unconfirmed beside it.' : ''} The mean is not a verdict on the Earth.`
  return { rows, counted: rows.length, skipped, mean, words }
}
