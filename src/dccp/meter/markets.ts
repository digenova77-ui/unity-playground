/** Derivatives of the bet size, the book, and the price indexes.
 * None of them is a world price. The live index is empty.
 */

export function kelly(p: number | null, c: number | null): number | null {
  if (p === null || c === null || !(p > 0 && p < 1) || !(c > 0 && c < 1) || p <= c) return null
  return (p - c) / (1 - c)
}

export function kellyPartials(p: number | null, c: number | null): { dp: number; dc: number } | null {
  if (p === null || c === null || !(p > 0 && p < 1) || !(c > 0 && c < 1)) return null
  return { dp: 1 / (1 - c), dc: (p - 1) / (1 - c) ** 2 }
}

/** Infinitesimal move in a binary LMSR price per share, at the current price. */
export function priceImpact(price: number | null, depth: number | null): number | null {
  if (price === null || depth === null || !(price > 0 && price < 1) || !(depth > 0)) return null
  return (price * (1 - price)) / depth
}

/** Two quotes in the same numeraire. No quote is held, so the live cross is empty. */
export function crossRate(perNumeraire: number | null, otherPerNumeraire: number | null): number | null {
  if (perNumeraire === null || otherPerNumeraire === null || !(perNumeraire > 0) || !(otherPerNumeraire > 0)) return null
  return otherPerNumeraire / perNumeraire
}

export function pricingIndex(): { kelly: null; fx: null; cpi: null; book: false; assetDoor: 'Unity ID' } {
  return { kelly: null, fx: null, cpi: null, book: false, assetDoor: 'Unity ID' }
}

export function marketWords(): string {
  const row = pricingIndex()
  return `The pricing index holds the derivatives and does not price them. Kelly is ${row.kelly}. A currency cross is ${row.fx}. The consumer price index is ${row.cpi}. The book is closed. Asset control is the ${row.assetDoor}, not a market. A probability of 0.55 against a price of 0.40 would be a quarter of a bankroll, and no bankroll is held. No currency pair was read. They were not summed into one world number. The till is closed.`
}
