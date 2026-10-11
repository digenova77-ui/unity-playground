/** Systemic impurity is a method that keeps repeating. Neutralizing it does not fill the hole.
 * A number is not invented to make the score clean.
 */

export const SYSTEMIC = [
  { id: 'hole', neutralize: 'A hole is not a number. Leave it open.' },
  { id: 'conflict', neutralize: 'A conflict is not averaged into a pass. The gate stays shut.' },
  { id: 'stale', neutralize: 'A stale reading is not live. It is left off the line.' },
  { id: 'blocked', neutralize: 'A blocked path is not a route. Nothing is sent around it.' },
  { id: 'repeat', neutralize: 'A repeat is not a new fact. It increments the loop and stops.' },
] as const

export function impureRows(rows: readonly { conflicts: number; unconfirmed: number }[]): number {
  return rows.filter(row => row.conflicts > 0 || row.unconfirmed > 0).length
}

export function impurityWords(impure: number, counted: number): string {
  const acts = SYSTEMIC.map(row => row.neutralize).join(' ')
  const table = counted === 0 ? 'No region is on the table.' : `${impure} of ${counted} rows on the table are impure. The mean does not wash them.`
  return `${table} ${acts}`
}
