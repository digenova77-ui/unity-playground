/** The other stack's ports were not started. Nothing promotes. This file does not hold the log. */

import { TESTNET_WRITER } from './writer-public.ts'

export function testnetNote(): {
  present: false
  proofsRun: false
  promotes: false
  delivered: false
  shared: 'w3name'
} {
  return { present: false, proofsRun: false, promotes: false, delivered: false, shared: 'w3name' }
}

export function testnetWords(): string {
  const row = testnetNote()
  return `The testnet writer is ${TESTNET_WRITER}. The page does not hold that log. It appends off this page. It does not write mainnet. Undo does not remove a line. The other stack's ports were not started here, and its proofs were not run here. Promotion is ${row.promotes}. The till stays closed.`
}
