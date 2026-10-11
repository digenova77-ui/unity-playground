/** A consumer price index needs distinct goods, priced at two times, with quantities.
 * The peg's three numbers are one unit. They are not a basket, so this page has no CPI.
 */

export interface Quote {
  good: string
  price: number
  quantity: number
}

function sameGoods(base: readonly Quote[], now: readonly Quote[]): boolean {
  if (base.length === 0 || base.length !== now.length) return false
  const names = new Set<string>()
  return base.every((row, i) => {
    if (names.has(row.good) || row.good !== now[i].good) return false
    names.add(row.good)
    return row.price >= 0 && now[i].price >= 0 && row.quantity > 0 && now[i].quantity > 0
  })
}

/** Base-period quantities. Null when the basket is not well formed. */
export function laspeyres(base: readonly Quote[], now: readonly Quote[]): number | null {
  if (!sameGoods(base, now)) return null
  let top = 0
  let bottom = 0
  for (let i = 0; i < base.length; i++) {
    bottom += base[i].price * base[i].quantity
    top += now[i].price * base[i].quantity
  }
  return bottom === 0 ? null : top / bottom
}

/** Current quantities. */
export function paasche(base: readonly Quote[], now: readonly Quote[]): number | null {
  if (!sameGoods(base, now)) return null
  let top = 0
  let bottom = 0
  for (let i = 0; i < base.length; i++) {
    top += now[i].price * now[i].quantity
    bottom += base[i].price * now[i].quantity
  }
  return bottom === 0 ? null : top / bottom
}

/** Geometric mean of the other two. Null if either is null. */
export function fisher(base: readonly Quote[], now: readonly Quote[]): number | null {
  const l = laspeyres(base, now)
  const p = paasche(base, now)
  if (l === null || p === null) return null
  return Math.sqrt(l * p)
}

/** The peg is not a basket of goods. */
export function ourIndex(): null {
  return null
}

/** The unit, the first find, and the repeat are one decision. They are not priced objects. */
export function objectIndex(): null {
  return null
}

/** No reading of the human world is held. */
export function worldNow(): null {
  return null
}

/** All three are empty. The tie is that emptiness. It is not an average. */
export function tiedIndexes(): { cpi: null; objects: null; world: null; same: true; index: null } {
  return { cpi: ourIndex(), objects: objectIndex(), world: worldNow(), same: true, index: null }
}

/** A rate needs two indexes. An empty index has no rate. */
export function inflation(then: number | null, now: number | null): number | null {
  if (then === null || now === null || then === 0) return null
  return (now - then) / then
}

/** No sector has a basket. Healthcare included. */
export function sectorIndex(_name: string): null {
  return null
}

export function derivativeWords(): string {
  return 'The logical next step after an index is a rate: the index now, minus the index then, divided by the index then. Both of ours are empty, so the rate is empty. Healthcare is a named field and a hole. No care is coordinated. The health room takes no patient record. It has no prices, no quantities, and no two periods, so it has no index. Every other sector is the same. Elasticity is not held. A real price is not held, because it would divide a nominal amount by an index this page does not have. CA00 is not a priced good. The till is closed.'
}

export function tiedWords(): string {
  const row = tiedIndexes()
  return `The cost price index is ${row.cpi}. The object index is ${row.objects}, because the unit, the first find, and the repeat are one decision, not priced goods. The human world now is ${row.world}. No prices from it are held. All three are empty, and that is the tie. They are not averaged into an index. The index is ${row.index}. The till is closed.`
}

export function cpiWords(): string {
  return 'A consumer price index divides the cost of a fixed basket now by its cost in a base period. Laspeyres keeps the old quantities. Paasche keeps the new ones. Fisher is the square root of their product. A rate of change needs two of those indexes. This page has no two periods, no distinct goods, and no quantities. The unit, the first find, and the repeat are one decision seen twice, so they are not a basket. Our index is empty. A chained index and a core index are not held. This is not a dollar, and the till is closed.'
}
