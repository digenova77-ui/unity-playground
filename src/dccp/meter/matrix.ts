/** One host. A city is not a decision. A dollar is not held. */

export const HOST = {
  cpus: 2,
  memoryGb: 8,
  diskGb: 500,
  region: 'EWR',
} as const

export interface PriceMatrix {
  hosts: 1
  unit: 1
  dollar: null
  till: 'closed'
  merit: 'record'
  door: 'Unity ID'
}

export function priceMatrix(regions: number): PriceMatrix | { refused: string } {
  if (!Number.isInteger(regions) || regions < 1) return { refused: 'A region count has to be a whole number above zero.' }
  if (regions !== 1) return { refused: 'One host. A second region is a second bill, not a second decision. The matrix refuses it.' }
  return { hosts: 1, unit: 1, dollar: null, till: 'closed', merit: 'record', door: 'Unity ID' }
}

/** Merit functions as the record on a seated Unity ID, and only while a test unit remains. */
export function admitSeat(handle: string | null, supply: number): { open: boolean; why: string } {
  if (!handle || !handle.startsWith('unity:')) {
    return { open: false, why: 'Closed. A Unity ID has to be seated before a decision. The Earth stays free to look at.' }
  }
  if (!Number.isFinite(supply) || supply < 1) {
    return { open: false, why: 'Closed. Merit is named on this seat and the test supply is empty. One decision needs 1 test unit. That unit is not a dollar.' }
  }
  return { open: true, why: 'Open. Unity is seated. Merit is the record. One decision spends 1 test unit. The till is closed.' }
}

export function matrixWords(): string {
  const row = priceMatrix(1)
  if ('refused' in row) return row.refused
  return `The pricing matrix is one host: ${HOST.cpus} CPUs, ${HOST.memoryGb} GB, ${HOST.region}. A decision is ${row.unit} test unit, not a city and not a dollar. Merit records the spend and does not move on a network. No Unity ID, no spend. The Earth stays free to look at. The till is closed.`
}
