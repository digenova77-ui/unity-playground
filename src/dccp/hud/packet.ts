/** One path for a person and for the seedbot. The page does not read the phone. */

import { LAW } from '../law/floor'
const PERSON = new Set(['email', 'name', 'phone', 'address', 'prompt', 'passphrase', 'private_key', 'seed_phrase'])
const REFUSED = new Set(['efuse-settlement', 'card-charge', 'domain-renewal', 'os-watch', 'zk-passport'])

export type Actor = 'human' | 'seedbot'

export interface HudPacket {
  source: 'unity'
  payload: {
    api_version: '2'
    law: typeof LAW[number][]
    authority: 'NONE'
    pii_coefficient: 0
    actor: Actor
    kind: string
  }
}

function carriesPerson(value: unknown): boolean {
  if (Array.isArray(value)) return value.some(carriesPerson)
  if (!value || typeof value !== 'object') return false
  return Object.entries(value as Record<string, unknown>).some(([key, child]) => PERSON.has(key.toLowerCase()) || carriesPerson(child))
}

export function translate(actor: Actor, kind: string, extra: Record<string, unknown> = {}): HudPacket | { hole: string } {
  if (REFUSED.has(kind)) {
    if (kind === 'os-watch') return { hole: 'This page cannot read the phone. Nothing was sent.' }
    if (kind === 'zk-passport') return { hole: 'No ZK passport is implemented. A handle is not a compliance proof.' }
    return { hole: 'That spend is not open. eFuse is not for sale, and no card or domain is charged.' }
  }
  if (extra.authority != null && extra.authority !== 'NONE') return { hole: 'The HUD does not grant authority.' }
  if (carriesPerson(extra)) return { hole: 'A person field does not enter the HUD.' }
  return {
    source: 'unity',
    payload: {
      api_version: '2',
      law: [...LAW],
      authority: 'NONE',
      pii_coefficient: 0,
      actor,
      kind,
    },
  }
}

export const SEED_JOBS: { actor: Actor; kind: string }[] = [
  { actor: 'human', kind: 'identity' },
  { actor: 'seedbot', kind: 'identity' },
  { actor: 'human', kind: 'wallet-receive' },
  { actor: 'seedbot', kind: 'wallet-receive' },
  { actor: 'human', kind: 'treasury-draw' },
  { actor: 'seedbot', kind: 'hud' },
  { actor: 'seedbot', kind: 'zk-passport' },
  { actor: 'seedbot', kind: 'efuse-settlement' },
  { actor: 'seedbot', kind: 'card-charge' },
  { actor: 'seedbot', kind: 'domain-renewal' },
  { actor: 'seedbot', kind: 'os-watch' },
]
