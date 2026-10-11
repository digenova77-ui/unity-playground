/** One side writes the joints. The other side checks them against the sources.
 * A hole is not filled. A failed check is not rewritten into a pass.
 */

import { UNIT_PER_DECISION, emptyEconomy, fatherHolds } from './economy.ts'
import { feeSplit } from './close.ts'
import { trickleSum } from './keys.ts'
import { pricingIndex } from './markets.ts'
import { ourIndex } from './cpi.ts'
import { liveBook } from './lmsr.ts'
import { saleToEqual, tokenCut, accessInstead } from './token-cut.ts'
import { JOINTS } from './overlay.ts'
import { circuit } from '../law/symbiosis.ts'
import { LINEAGE } from '../unity/lineage.ts'
import { canView } from '../ledger/access.ts'

export interface AuditRow {
  name: string
  pass: boolean
  why: string
}

export function writeSide(): readonly string[] {
  return JOINTS.map(row => `${row.name}: ${row.holds}`)
}

function check(name: string, pass: boolean, why: string): AuditRow {
  return { name, pass, why: pass ? why : `Refused. ${why}` }
}

/** Independent of the written sentences. It reads the sources again. */
export function auditSide(): AuditRow[] {
  const fee = feeSplit()
  const title = fatherHolds(emptyEconomy())
  const loop = circuit()
  const price = pricingIndex()
  const book = liveBook()
  const cut = tokenCut()
  const youth = canView({ viewer: 'buyer', owner: 'owner', belongs: false, paid: true })
  return [
    check('Unity', accessInstead().door === 'Unity ID', 'The inlet is the Unity ID.'),
    check('Decision', UNIT_PER_DECISION === 1, 'One decision spends 1.'),
    check('eFuse', fee.efuse === 0.05 && fee.unity === 0.05 && loop.outMoves === false, 'The fee half is 0.05 and eFuse does not move.'),
    check('Merit', trickleSum(1, 1) === Math.log(2), 'The first period sums to ln(2). It is not a wealth utility.'),
    check('Title', title.share === 1 && saleToEqual().sold === false, 'The father share is 1. Nothing was sold.'),
    check('Book', book.open === false && book.taken === 0, 'The live book is closed.'),
    check('Bet', price.kelly === null && price.fx === null, 'No bankroll and no currency pair are held.'),
    check('Basket', ourIndex() === null && price.cpi === null, 'Our index is empty.'),
    check('Cut', cut.fiat === null && cut.bridge === null && cut.singularity === null, 'The exit is empty.'),
    check('Kin', LINEAGE.loaded === false, 'Nothing below the father is loaded.'),
    check('Youth', youth.open === false, 'A payment does not open a child\'s event.'),
  ]
}

export function bothAtOnce(): { when: 'same time'; leftOnRight: boolean; rightOnLeft: boolean; pass: boolean; rows: 1 } {
  const left = writeSide().map(line => line.split(':')[0])
  const right = auditSide()
  const covered = left.length === right.length && left.every((name, i) => name === right[i].name)
  const passed = right.every(row => row.pass)
  return { when: 'same time', leftOnRight: covered && passed, rightOnLeft: covered && passed, pass: covered && passed, rows: 1 }
}

export function dualWords(): string {
  const written = writeSide()
  const rows = auditSide()
  const passed = rows.filter(row => row.pass).length
  const failed = rows.filter(row => !row.pass).map(row => row.name)
  const verdict = failed.length ? `Failed: ${failed.join(', ')}.` : 'Every named joint passed.'
  const both = bothAtOnce()
  return `Write side. ${written.join(' ')} Audit side. ${passed} of ${rows.length} passed. ${verdict} Both sides audit each other at the ${both.when}. ${both.pass ? 'Both passed.' : 'One side refused.'} It is ${both.rows} row. The holes were not filled. The till stays closed.`
}
