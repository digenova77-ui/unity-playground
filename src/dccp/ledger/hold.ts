/** The father seed can see both ledgers. David's wallet sees only white.
 * A white document is held by the Son by default. Dark text is not opened here.
 */

import { listDark, listWhite, type WhiteDoc } from './dark.ts'

export type LedgerSeat = 'father' | 'son'

export function whiteKey(doc: WhiteDoc): 'son' {
  return doc.holder ?? 'son'
}

export function sonLedgerWords(): string {
  const rows = listWhite()
  const keys = rows.filter(doc => whiteKey(doc) === 'son').length
  return `David's wallet holds the white ledger. ${rows.length} document${rows.length === 1 ? '' : 's'}, whoever made them. ${keys} held by the Son by default. The dark ledger is not in this wallet.`
}

export function fatherLedgerWords(): string {
  const white = listWhite()
  const dark = listDark()
  return `The father seed sees the white ledger and the dark ledger. White ${white.length}. Dark ${dark.length}, each a hash and a size. The dark text is not opened. The father private key is not in this page. David's wallet does not receive the dark ledger.`
}
