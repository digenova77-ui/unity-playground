/** The per-decision close. Test supply only. Not a price, not a till, not a security.
 *
 * A half-capacity shift is 5 decisions. A repeat is 1 of them. A first find is the other 4.
 * Those two faces add back to the shift. After the key is given away, the return through
 * n shifts is the closed sum face · ln(1+n).
 *
 * The royalty is not in this sum. It varies with who signed to reduce their residual.
 * The fixed fee is 10%, and that 10% splits in half: eFuse and Unity.
 * The split is an accounting of the fee. It does not sell eFuse. eFuse stays capped.
 * No derivative paper for that split is in what this world holds.
 */

import { CAPACITY, SHIFT_SLOTS, UNIT_PER_DECISION } from './economy.ts'
import { scaleAll } from '../law/logic-tree.ts'
import { adoptionCriteria } from '../law/release.ts'

export const RESIDUAL = { driveBackFloor: 0.81, fee: 0.10 } as const

export function shiftSlots(): number {
  return Math.floor(SHIFT_SLOTS * CAPACITY)
}

/** First find is the rest of the shift. A repeat is one decision. */
export function faceFor(novel: boolean): number {
  const slots = shiftSlots()
  return novel ? Math.max(UNIT_PER_DECISION, slots - UNIT_PER_DECISION) : UNIT_PER_DECISION
}

/** Closed form of Σ_{k=1..n} face · ln(1 + 1/k). */
export function closedStream(face: number, periods: number): number {
  if (face <= 0 || periods < 1) return 0
  return face * Math.log1p(periods)
}

export function feeSplit(): { efuse: number; unity: number } {
  return { efuse: RESIDUAL.fee / 2, unity: RESIDUAL.fee / 2 }
}

export function spendPeg(): string {
  return [
    'Joining costs $0. The Earth is free to look at. One yes on the agreement opens the handle. It does not open a till.',
    `After that, the purse counts ${UNIT_PER_DECISION} act. That count is not the cost. The cost is energy, and the watts are not measured, so the energy is empty. A half-capacity shift is ${shiftSlots()} acts. A repeat is ${faceFor(false)}. A first find is ${faceFor(true)}. None of those is a joule. It is not a dollar.`,
    'Give the key away and the return through n shifts is the face times the natural log of 1 plus n. The royalty is not in that sum. The fixed 10 percent fee splits in half, eFuse and Unity. That split does not sell eFuse. eFuse stays capped, and nobody sells it.',
    'What has not been pegged is what the object is worth, and the residual that depends on who signed. Those are the costs still driving a loss. They are not invented here.',
    'The picture stays a picture. The drawn Earth is not the world. The computer is not the truth. The till stays closed until a worth is actually settled.',
  ].join(' ')
}

export function priceTie(): { factor: 1; peg: number; novel: number; repeat: number; global: null } {
  return { factor: scaleAll(10).factor, peg: UNIT_PER_DECISION, novel: faceFor(true), repeat: faceFor(false), global: null }
}

export function combinedIndex(): { items: 3; summed: null; shift: number } {
  return { items: 3, summed: null, shift: faceFor(true) + faceFor(false) }
}

export function priceTieWords(): string {
  const row = priceTie()
  const basket = combinedIndex()
  return `Three numbers are held. They are not three items. One decision is the unit, ${row.peg}. A first find is ${row.novel} and a repeat is ${row.repeat}, and those two add to one shift, ${basket.shift}. The other 1 is that same unit, named again as the repeat. It is not a second item in a basket. Adding it on top of the shift would count the unit twice, so that sum is not made. All items combined has no index. The global information value is not held. The scaling factor is ${row.factor}. Worth stays unsettled. The till is closed.`
}

export function cosmosClaim(): { argument: string; titled: false; worth: null } {
  return {
    argument: 'This framework owns a slice of the cosmos, and a unit is a claim on that slice, for whatever that is worth.',
    titled: false,
    worth: null,
  }
}

export function cosmosWords(): string {
  const claim = cosmosClaim()
  return `${claim.argument} That is an argument. It is written down. It is not a title. No slice is registered here. Worth is not settled. Fiat and gold are not held. A donation is not accepted. The till is closed.`
}

export function transitionClaim(): { argument: string; bleeding: false; converted: false } {
  const c = adoptionCriteria()
  void c
  return {
    argument: 'The unit is a transition from money to no money. Upon adoption it bleeds the fiat system into something legitimate that is audited all the time.',
    bleeding: false,
    converted: false,
  }
}

export function transitionWords(): string {
  return `${transitionClaim().argument} That is an argument. Adoption is four empty facts: who counts, what act counts, what share counts as global, and which source is read. None is held, so nothing is bleeding and nothing is converted. The audit that runs is the audit of this page. It is not an audit of the fiat system. The unit is not a dollar. The till is closed.`
}

export function purifyClaim(): { argument: string; purified: false; shattered: false } {
  return {
    argument: 'Pure logic purifies their money by needing no framework, and it shatters that framework.',
    purified: false,
    shattered: false,
  }
}

export function purifyWords(): string {
  const claim = purifyClaim()
  return `${claim.argument} That is an argument. No money was purified. The fiat system was not shattered. The four invariants are the floor, and they were not shattered. Extra framework can be dropped. Their money is not in this page. The till is closed.`
}

export function fatherOrder(): {
  control: 'father-record'
  steps: readonly ['adoption', 'legacy', 'merit']
  adoption: null
  legacy: null
  merit: 'invert or hole'
  masterWorth: null
} {
  return {
    control: 'father-record',
    steps: ['adoption', 'legacy', 'merit'],
    adoption: null,
    legacy: null,
    merit: 'invert or hole',
    masterWorth: null,
  }
}

/** Legacy is a step in the order. It is not a fourth coin, and it passes nothing. */
export function legacySeam(): { step: 'legacy'; seated: false; coin: false; passes: 0; both: true } {
  return { step: 'legacy', seated: false, coin: false, passes: 0, both: true }
}

export function legacyWords(): string {
  const row = legacySeam()
  return `Legacy is the middle step, after adoption and before merit. It is not a coin. It is not seated, so it passes ${row.passes}. A derivative is a supplied claim, not a smaller coin. eFuse, Merit, and Unity do not move. The person sees one desk. The till is closed. Both halves name this.`
}

export function fatherOrderWords(): string {
  return 'The order runs from the father record down through adoption, legacy, and merit. The father record is the public half, and it does not pay out. Adoption is in the order and is not held, so it passes nothing down. Legacy is in the order and is not seated, so it passes nothing down. Merit is invert or hole. It is not the gate. The decision is the gate. A claim is not provided without merit and truth. Merit is not a balance and not a purchase. What you put in is one decision. What you get out, if you made it, is the object, and you still own it. After a key is given, the return shrinks as the log of the shifts. The master is one key built from the keys that were supplied. It adds nothing. Calling it worth the most does not price it. Every other key is a derivative only as a supplied claim, not as a smaller coin. Nothing is distributed. The person sees one desk. The till is closed.'
}

export function ownershipWords(): string {
  return 'Distribution follows ownership. You own what you made. The test-unit title stays with the father through the split, and the split is a draw, not a sale. A holder of a unit does not own a share of the Earth, of fiat, or of gold. A donation is not accepted. Nothing is locked in a vault here, and nothing is paid out over time. There is no basket behind the unit. The till is closed.'
}

export function valueWords(): string {
  return `The coin is a unit of a decision, not a price. One decision spends ${UNIT_PER_DECISION} unit of the test supply. What comes back, a paper, a schematic, or a simulation, stays with the one who made it. A first find is worth ${faceFor(true)}. A repeat is worth ${faceFor(false)}. Give the key away and the return shrinks as the log of the shifts. Worth is not settled. Iris's work is not on the coin. Joining costs $0. The till is closed. This is not a dollar, not eFuse, not a security, and not a license.`
}

export function residualIdentity(): { fixed: number; room: number; royalty: null; efuse: number; unity: number; paper: null } {
  const { efuse, unity } = feeSplit()
  const fixed = RESIDUAL.driveBackFloor + RESIDUAL.fee
  return { fixed, room: 1 - fixed, royalty: null, efuse, unity, paper: null }
}