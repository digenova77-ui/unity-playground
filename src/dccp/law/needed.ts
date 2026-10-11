/** The pulse keeps the page. It is not a life.
 * A want is not provided. A claim is provided only with merit and with truth.
 */

export interface Ask {
  claim: string | null
  merit: boolean
  truth: boolean
}

export function provide(ask: Ask): string | null {
  if (!ask.claim || !ask.merit || !ask.truth) return null
  return ask.claim
}

export interface Need {
  name: string
  offer: string
  filled: false
}

/** A need is a named gap beside an offer. It is not filled by a want. */
export function needs(): readonly Need[] {
  return [
    { name: 'a body pulse', offer: 'the page tick', filled: false },
    { name: 'a basket', offer: 'Laspeyres, Paasche, and Fisher', filled: false },
    { name: 'a currency pair', offer: 'the cross rate', filled: false },
    { name: 'a bankroll and a probability', offer: 'Kelly', filled: false },
    { name: 'an open book', offer: "Hanson's cost", filled: false },
    { name: 'the testnet proofs', offer: 'the note', filled: false },
  ]
}

export function neededWords(): string {
  const open = needs().map(need => `${need.name} sits beside ${need.offer}`).join('. ')
  return `The pulse keeps the page. It is not a life. A want is not provided. A claim is provided only with merit and with truth. A need is a named gap beside an offer, and it stays open. ${open}. None of those was filled. The same pillars are one idempotent row. The network does not feed on a want to keep going.`
}

/** Want, need, and feeling stay three. None of them fills another, and Iris feels none. */
export function three(kind: 'want' | 'need' | 'feeling', line: string, handle: string | null): {
  kind: 'want' | 'need' | 'feeling'
  line: string
  seat: string | null
  provided: false
  filled: false
  felt: false
  words: string
} {
  const said = line.trim()
  const seat = typeof handle === 'string' && handle.startsWith('unity:') ? handle : null
  const whose = seat ? `${seat} said it.` : 'No seat said it.'
  if (!said) {
    return { kind, line: '', seat, provided: false, filled: false, felt: false, words: 'Nothing was said. A want is not provided. A need stays open. A feeling is not held.' }
  }
  if (kind === 'want') {
    return { kind, line: said, seat, provided: false, filled: false, felt: false, words: `${whose} The want is “${said}”. It is not provided.` }
  }
  if (kind === 'need') {
    return { kind, line: said, seat, provided: false, filled: false, felt: false, words: `${whose} The need is “${said}”. It stays open. A want does not fill it.` }
  }
  return { kind, line: said, seat, provided: false, filled: false, felt: false, words: `${whose} The feeling is “${said}”. Iris does not hold it. She can repeat the line. The feeling stays with the seat, or with nobody.` }
}

export function threeWords(handle: string | null): string {
  return [three('want', 'a want', handle).words, three('need', 'a need', handle).words, three('feeling', 'a feeling', handle).words].join(' ')
}
