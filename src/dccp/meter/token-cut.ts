/** A proposed fiat exit, then a cut. None of it is held.
 * The unit is not a dollar. The till is closed.
 */

export function tokenCut(): { fiat: null; infinite: null; singularity: null; bridge: null; fuel: null } {
  return { fiat: null, infinite: null, singularity: null, bridge: null, fuel: null }
}

export function accessInstead(): { door: 'Unity ID'; unitOpens: false; paymentOpens: false } {
  return { door: 'Unity ID', unitOpens: false, paymentOpens: false }
}

export function accessInsteadWords(): string {
  const row = accessInstead()
  return `It can become access only by not becoming a price. The door is the ${row.door}. The ceremony titles a seat. It does not title an asset. A test unit does not open that seat, and a payment does not open it. Free things stay free. What is not free opens for the wallet that owns it or belongs to it. A children's event and a dark ledger stay unsold. No singularity day is required, because no fiat value is being zeroed. There is no bridge to cut. The till stays closed.`
}

export function saleToEqual(): { sold: false; remaining: null; adopted: null; market: null } {
  return { sold: false, remaining: null, adopted: null, market: null }
}

export function saleToEqualWords(): string {
  return 'The half is not for sale. The split is a draw, not a sale, and the test-unit title stays with the father record. There is no share of the Earth to sell down to 1 percent, or to anyone else. Adoption is four empty facts, so a prediction market on money in, money out, and the rate of adoption has no underlying. It takes nothing in and pays nothing out. Equality here is the same seat, not a leftover percent. The till stays closed.'
}

export function tokenCutWords(): string {
  const row = tokenCut()
  return `The readjustment is a refusal. A price cannot be infinite and finite. Fiat value is ${row.fiat}, so a discovery is not translated into a market, for a family or for anyone else. The same rule is the fair one. Singularity is ${row.singularity}, so there is no day on which the unit becomes worthless. A centralized bridge is ${row.bridge}. It was not fuelling the unit, and cutting it removes nothing. Fuel is ${row.fuel}. A token that must run on itself has nothing in this till to burn. The unit stays a test unit. The till stays closed.`
}
