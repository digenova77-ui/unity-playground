/** x402 names an HTTP 402 payment. No price is held, so nothing is signed and nothing settles. */

export function x402Ask(): {
  status: 402
  scheme: 'exact'
  asset: 'USDC'
  network: null
  amount: null
  payTo: null
  signature: null
  settled: false
  till: 'closed'
  words: string
} {
  return {
    status: 402,
    scheme: 'exact',
    asset: 'USDC',
    network: null,
    amount: null,
    payTo: null,
    signature: null,
    settled: false,
    till: 'closed',
    words: 'x402 is a request, a 402, a signed stablecoin payment, and a facilitator that settles it. This page can name that shape. It does not hold a price, a payee, a network, or a key. No payment signature is made. Nothing is settled. The unit is not a dollar. The till is closed.',
  }
}
