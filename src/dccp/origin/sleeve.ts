/** Plancksoft is the API v2 sleeve. It is the operating surface of this page.
 * The host kernel stays the host kernel. Receipts stay in memory.
 * Nothing is written to disk. The jacket stays closed.
 */

import { ENV_BITS } from '../pipe/chain.ts'

export const PLANCKSOFT = 'Plancksoft'

export function sleeve(): {
  api_version: '2'
  jacket: 'closed'
  receipts: 'memory'
  disk: false
  holds: 'nothing'
} {
  return { api_version: '2', jacket: 'closed', receipts: 'memory', disk: false, holds: 'nothing' }
}

export function plancksoft(): {
  name: typeof PLANCKSOFT
  api_version: '2'
  jacket: 'closed'
  host: 'kept'
  kernel: 'not this page'
  encompasses: 'the page'
  bits: typeof ENV_BITS
  disk: false
} {
  const row = sleeve()
  return {
    name: PLANCKSOFT,
    api_version: row.api_version,
    jacket: row.jacket,
    host: 'kept',
    kernel: 'not this page',
    encompasses: 'the page',
    bits: ENV_BITS,
    disk: row.disk,
  }
}

export function sleeveWords(): string {
  const row = plancksoft()
  return `${row.name} is the API v2 sleeve. It is the operating surface of this page on a phone or a computer. The host kernel stays the host kernel. This page does not replace it, and it does not write a bootloader. The sleeve is version ${row.api_version}. The jacket is ${row.jacket}. Receipts sit in memory for this process and are dropped when it is cleaned. They are not written to disk. The environment is ${row.bits} bits. A private key, a face, and a person field do not enter. A want is not stored. The machine holds nothing.`
}
