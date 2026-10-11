/** Names the page may say. This file has no log and no write. */

export const TESTNET_WRITER = 'dualis.writer.v1.testnet' as const
export const MAINNET_WRITER = 'dualis.writer.v1' as const

export function mainnetWords(): string {
  return `The mainnet writer is ${MAINNET_WRITER}. The page does not hold the log and cannot reset it. One pipe appends. The other pipe only audits that write and stores nothing. The hash is not a signature. The till stays closed.`
}

export function layoutWords(): string {
  return 'The layout is written off this page. The page does not hold the log and cannot reset it. The hash is not a signature. The till stays closed.'
}
