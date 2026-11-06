/** Three named coins. None is listed. None is sent.
 * eFuse pegs the fee. Merit records the work. Unity is the identity.
 * The first two do not apply until that identity is seated. The till stays closed.
 */

import { feeSplit, faceFor } from './close.ts'
import { SPLIT } from '../gate/collar.ts'
import { POOL, RUN } from '../live/adopt.ts'
import { TWO_FIFTH, COSMOGENESIS_SEED, SEED_AT } from '../pipe/chain.ts'
import { divine } from '../law/divine.ts'

export const COINS = ['eFuse', 'Merit', 'Unity'] as const

const PILOT_PIPE = new RegExp(`^unity:pilot\\.[0-9a-f]{${TWO_FIFTH}}$`)

/** eFuse is the pilot pipe. It audits a handle this device minted. It does not seat the identity. */
export function pilotPipe(handle: string | null): boolean {
  return typeof handle === 'string' && PILOT_PIPE.test(handle)
}

export interface CoinExecution {
  coins: typeof COINS
  listed: false
  network: false
  till: 'closed'
  bound: boolean
  identity: string | null
  efuse: { peg: 'cap'; feeHalf: number; pipe: 'pilot' | null; named: boolean; moves: false }
  merit: { kind: 'invert or hole'; named: boolean; moves: false }
  unity: { kind: 'identity'; handle: string | null; moves: false }
  security: { rings: 0 | 3; seed: typeof COSMOGENESIS_SEED | null; seedAt: typeof SEED_AT; password: false; holds: 'nothing' }
  protocol: { work: 'rings and seed'; supercomputer: false; pi: false; solar: false; geothermal: false; wind: false; magnetism: false; joules: null; watts: null }
}

export function coinSecurity(): { rings: 0 | 3; seed: typeof COSMOGENESIS_SEED | null; seedAt: typeof SEED_AT; password: false; holds: 'nothing'; words: string } {
  const rings = divine()
  if (rings.rings !== 3) {
    return { rings: 0, seed: null, seedAt: SEED_AT, password: false, holds: 'nothing', words: 'A ring did not close. The coins have no other lock. No password was added.' }
  }
  return {
    rings: 3,
    seed: COSMOGENESIS_SEED,
    seedAt: SEED_AT,
    password: false,
    holds: 'nothing',
    words: `Coin security is the three rings and the one seed. DCLM binds logic. Iris binds truth. Twain binds pragmatism. They are not a password. The center is not a ring. The seed is ${COSMOGENESIS_SEED}, at ${SEED_AT}, under the floor. The coins hold nothing else. The till is closed.`,
  }
}

/** The protocol work is the rings and the seed. The joule is not filled in. */
export function protocolCost(): { work: 'rings and seed'; supercomputer: false; pi: false; solar: false; geothermal: false; wind: false; magnetism: false; joules: null; watts: null; words: string } {
  const security = coinSecurity()
  const ran = security.rings === 3 && security.seed !== null
  return {
    work: 'rings and seed',
    supercomputer: false,
    pi: false,
    solar: false,
    geothermal: false,
    wind: false,
    magnetism: false,
    joules: null,
    watts: null,
    words: ran
      ? 'The coin’s protocol work is the three rings and the one seed. That check is small. It is not a supercomputer, and a supercomputer’s cost was not written as nothing. A board the size of a Raspberry Pi could repeat a check this small. This page is not that board. No solar panel, no geothermal well, no wind reading, and no magnetic generator is connected. A field is not a watt. No watt was read, so the joule stays empty. It is not a dollar. The till is closed.'
      : 'A ring did not close. The protocol check did not run. No joule was written.',
  }
}
export function moveCoin(coin: string): { ok: true; coin: 'Merit' } | { ok: false; error: string } {
  const security = coinSecurity()
  if (security.rings !== 3 || !security.seed) return { ok: false, error: 'A ring did not close. The coins do not move.' }
  if (coin !== 'Merit') return { ok: false, error: 'Only Merit moves. eFuse does not. Unity is the seat, not a coin that is sent. It is not a dollar. The till is closed.' }
  return { ok: true, coin: 'Merit' }
}

export function executeCoins(handle: string | null): CoinExecution {
  const bound = typeof handle === 'string' && handle.startsWith('unity:')
  const fused = pilotPipe(handle)
  const split = feeSplit()
  const security = coinSecurity()
  const protocol = protocolCost()
  return {
    coins: COINS,
    listed: false,
    network: false,
    till: 'closed',
    bound,
    identity: bound ? handle : null,
    efuse: { peg: 'cap', feeHalf: split.efuse, pipe: fused ? 'pilot' : null, named: fused, moves: false },
    merit: { kind: 'invert or hole', named: bound, moves: false },
    unity: { kind: 'identity', handle: bound ? handle : null, moves: false },
    security: { rings: security.rings, seed: security.seed, seedAt: security.seedAt, password: false, holds: 'nothing' },
    protocol: { work: protocol.work, supercomputer: false, pi: false, solar: false, geothermal: false, wind: false, magnetism: false, joules: null, watts: null },
  }
}

export function coinWords(handle: string | null): string {
  const row = executeCoins(handle)
  const seat = row.bound
    ? row.efuse.named
      ? `This seat is ${row.identity}. eFuse is the pilot pipe. It audits this handle. Its booking is half of the ten percent fee, ${row.efuse.feeHalf}. It does not sell. Merit can be named here. It records the work. It is not a balance. One decision spends 1 test unit. That unit is not a dollar.`
      : `This seat is ${row.identity}. eFuse is the pilot pipe, and this handle is not it. Merit can be named here. It records the work. Nothing moves.`
    : 'No Unity identity is seated. eFuse does not peg a spend. Merit does not count.'
  return [
    'A voluntary invoke is a choice. The host signs the same contract a bot signs only when it asks to. Joining costs $0. The risk is 0. There is no commitment. The kernel is not bound.',
    'Three coins are named: eFuse, Merit, and Unity.',
    coinSecurity().words,
    protocolCost().words,
    'eFuse is the pilot pipe. It audits the handle this device minted. The fee is ten percent, and half of that fee is the eFuse booking. It is a cap. It is fuel. It is not a sale.',
    'Merit is the record of what was put in. It is invert or hole. It is not a purchase.',
    'Neither applies until it is bound to an identity. That identity is the Unity token. Unity is the seat, not a price.',
    seat,
    'Nothing is listed. Nothing is sent on a network. Only Merit moves, and only as test units from one Unity handle to another. eFuse does not move. Unity is not sent. The father record says the order and does not pay out. The till is closed.',
    `The flow is ${SPLIT.forest} to the forest, ${SPLIT.harvest} to the harvest, and ${SPLIT.seed} to the seed. A first seat is face ${faceFor(true)}. A later seat is face ${faceFor(false)}. A place locks at ${POOL} seats and a run of ${RUN}. The dividend waits for that lock. Saying this did not list a coin.`,
  ].join(' ')
}

export function coinLine(handle: string | null): string {
  const row = executeCoins(handle)
  if (!row.bound) return 'eFuse and Merit wait. Unity is the identity, and none is seated. Nothing is listed.'
  if (!row.efuse.named) return `This HUD is ${row.identity}. Unity is seated. eFuse is the pilot pipe, and this handle is not it. Merit records the work. The till is closed.`
  return `This HUD is ${row.identity}. eFuse is the pilot pipe and does not sell. Merit records the work and is not a balance. The till is closed.`
}
