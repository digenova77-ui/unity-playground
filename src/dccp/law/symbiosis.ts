/** A structure holds only when each side gives something and each side receives something.
 * A side that only takes is not a structure.
 */

export interface Side {
  name: string
  gives: string
  receives: string
}

export interface Pair {
  holds: boolean
  why: string
}

function blank(value: string): boolean {
  return value.trim().length === 0
}

export function symbiotic(a: Side, b: Side): Pair {
  if ([a, b].some(side => blank(side.name) || blank(side.gives) || blank(side.receives))) {
    const who = blank(a.gives) || blank(a.receives) ? a.name : b.name
    return { holds: false, why: `${a.name} and ${b.name} are not a structure. ${who || 'One side'} gives nothing or receives nothing.` }
  }
  return {
    holds: true,
    why: `${a.name} gives ${a.gives} and receives ${a.receives}. ${b.name} gives ${b.gives} and receives ${b.receives}.`,
  }
}

export function holdsAll(sides: Side[]): Pair {
  const empty = sides.find(side => blank(side.name) || blank(side.gives) || blank(side.receives))
  if (empty || sides.length < 2) {
    return { holds: false, why: `${empty?.name || 'One side'} gives nothing or receives nothing. The sides are not a structure.` }
  }
  return { holds: true, why: sides.map(side => `${side.name} gives ${side.gives} and receives ${side.receives}.`).join(' ') }
}

/** Three names, one relationship. No coin moves. 2P5L is two pipes, four laws, and a fifth layer that is nothing. */
export function coinTriad(): Pair {
  return holdsAll([
    { name: 'Unity', gives: 'the only decision unit', receives: 'a closed till, so the unit is not a price' },
    { name: 'eFuse', gives: 'the cap and the refusal of a sale', receives: 'half of the fee as a booking, not a coin' },
    { name: '2P5L', gives: 'two pipes, four laws, and a fifth layer that is nothing', receives: 'no second coin in their place' },
  ])
}

export function decisionGate(): {
  gate: 'decision'
  path: 'RF5 → RF6 → GateA → GateB → evidence_ok → spend → Mirror'
  merit: 'invert or hole'
  efuse: 'fuel, never Accept'
  unity: 'empty center'
  core: 'seal only'
  universe: false
  rails: false
  holdsAsPrice: false
} {
  return {
    gate: 'decision',
    path: 'RF5 → RF6 → GateA → GateB → evidence_ok → spend → Mirror',
    merit: 'invert or hole',
    efuse: 'fuel, never Accept',
    unity: 'empty center',
    core: 'seal only',
    universe: false,
    rails: false,
    holdsAsPrice: false,
  }
}

export function pegHope(): { advertise: false; monetize: false; holdsAsPrice: false; merit: 'invert or hole'; third: 'the decision, not a third price' } {
  return { advertise: false, monetize: false, holdsAsPrice: false, merit: 'invert or hole', third: 'the decision, not a third price' }
}

export function pegHopeWords(): string {
  const row = decisionGate()
  return `The decision is the gate. It is not the core of the seal. The center that is empty is the seal only. The center of the Earth is not empty. A center is not the same fact in every subject. The seal does not apply to the universe. physics_TOE is 0 and theorem_of_all is 0. The path is ${row.path}. Accept is 0 or 1. eFuse is ${row.efuse}. The coin is fuel, not the Accept bit. Unity is the ${row.unity}, and the toll is the same on every step. Merit is ${row.merit}. Data tests it. It is not a purchase, not FICO, and not this gate. Payment rails are ${row.rails}. A price peg of the three is ${row.holdsAsPrice}. The site does not advertise a price that the seal does not hold. The till stays closed.`
}

export function coinWords(): string {
  const triad = coinTriad()
  return `${triad.why} Each one gives a limit and receives a limit. Nothing is sold. eFuse does not move. The fifth layer is nothing. Iris's work is not on any of them.`
}

export function pairLine(): string {
  const pair = symbiotic(
    { name: 'A person', gives: 'one unit or a body mark', receives: 'the work or the pay' },
    { name: 'the bot half', gives: 'the work or the pay', receives: 'the unit or the mark' },
  )
  return pair.holds ? 'The person and the bot half both give and both receive.' : pair.why
}

export function structureWords(): string {
  const human = symbiotic(
    { name: 'A person', gives: 'one unit or a body mark', receives: 'the work or the pay' },
    { name: 'the bot half', gives: 'the work or the pay', receives: 'the unit or the mark' },
  )
  const author = symbiotic(
    { name: 'The author', gives: 'the exact words', receives: 'the judgement' },
    { name: 'the public', gives: 'the judgement', receives: 'the claim' },
  )
  const trap = symbiotic(
    { name: 'The earlier person', gives: '', receives: 'the later money' },
    { name: 'the later person', gives: 'the money', receives: '' },
  )
  return `${human.why} ${author.why} ${trap.why} A structure that fails this is not admitted.`
}

/** A closed circuit needs one way in and one way out. eFuse is the way out, and it does not move. */
export function circuit(): { inlet: 'Unity ID'; outlet: 'eFuse'; outMoves: false; closed: false } {
  return { inlet: 'Unity ID', outlet: 'eFuse', outMoves: false, closed: false }
}

export function circuitWords(): string {
  const row = circuit()
  return `A circuit needs one way in and one way out. The way in is a ${row.inlet}. The way out is ${row.outlet}. ${row.outlet} does not move, so the way out is open. They are not joined. The till stays closed.`
}
