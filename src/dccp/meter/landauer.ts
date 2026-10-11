/** Proof of Merit. Land, hour, and one irreversible decision.
 * The decision erases one bit. Landauer's floor is kT ln 2.
 * That floor is not a measured watt. A missing temperature is not filled in.
 * Merit is 0 or 1. A purchase is not the 1.
 */

import { nextChoice } from '../law/light.ts'

/** Exact CODATA value, joule per kelvin. */
export const BOLTZMANN = 1.380649e-23

const HOUR_MS = 3_600_000

export interface Land {
  lat: number
  lon: number
  present: boolean
}

export interface Kelvin {
  value: number
  measured: boolean
}

export interface MeritInput {
  land: Land | null
  at: number | null
  logical: number
  illogical: number
  width: number
  kelvin: Kelvin | null
  bought: boolean
}

export type MeritProof =
  | {
      merit: 1
      joules: number
      bits: 1
      hour: number
      land: string
      step: 1
      bought: false
      floor: 'landauer'
      measuredWatts: null
    }
  | { merit: 0; joules: null; reason: string }
  | { merit: null; joules: null; open: string }

function landCell(lat: number, lon: number): string | null {
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return null
  return `${Math.round(lat * 1e5)}:${Math.round(lon * 1e5)}`
}

/** Least joules to erase `bits` at a measured kelvin. Null if the temperature is not a kelvin. */
export function landauerJoule(kelvin: number, bits = 1): number | null {
  if (!Number.isFinite(kelvin) || kelvin <= 0) return null
  if (!Number.isInteger(bits) || bits < 1) return null
  return BOLTZMANN * kelvin * Math.LN2 * bits
}

export function proveMerit(input: MeritInput): MeritProof {
  if (input.bought) return { merit: 0, joules: null, reason: 'A purchase is not Merit. The 1 is not for sale.' }
  if (!input.land || input.at === null) {
    return { merit: null, joules: null, open: 'A missing land or hour stays open. Merit is not filled in.' }
  }
  if (!input.land.present) {
    return { merit: 0, joules: null, reason: 'You were not on the land. A claim from elsewhere is not a proof.' }
  }
  const land = landCell(input.land.lat, input.land.lon)
  if (!land) return { merit: 0, joules: null, reason: 'That is not a place on the Earth.' }
  if (!Number.isFinite(input.at)) return { merit: 0, joules: null, reason: 'The hour is not a time.' }
  const gate = nextChoice(input.logical, input.illogical, input.width)
  if ('refused' in gate) return { merit: 0, joules: null, reason: gate.refused }
  if (!input.kelvin || !input.kelvin.measured) {
    return { merit: null, joules: null, open: 'The decision burned. The temperature was not measured, so the joule stays open. Merit is not filled in.' }
  }
  const joules = landauerJoule(input.kelvin.value, 1)
  if (joules === null) return { merit: 0, joules: null, reason: 'Temperature is not a kelvin above zero. Nothing was erased.' }
  return {
    merit: 1,
    joules,
    bits: 1,
    hour: Math.floor(input.at / HOUR_MS) * HOUR_MS,
    land,
    step: 1,
    bought: false,
    floor: 'landauer',
    measuredWatts: null,
  }
}

export function landauerWords(): string {
  return 'Merit is proved, not bought. The proof is the land you were on, the hour you were there, and one irreversible decision. Two choices collapse to one. The choice not taken is one bit erased. Landauer’s floor is Boltzmann’s constant times the measured kelvin times the log of 2. That number is the least joule, not the watt-hour this device spent. No land, no hour, and no measured temperature are held on this page, so the joule stays open and Merit is not filled in. A tie does not erase a bit. A purchase is not the 1. The till is closed.'
}
