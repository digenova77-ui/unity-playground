/** x401 names an HTTP 401 proof. A Unity handle is not that credential, so nothing is presented. */

export function x401Ask(handle: string | null): {
  status: 401
  header: 'Proof-Required'
  credential: null
  handle: string | null
  presented: false
  words: string
} {
  const seat = typeof handle === 'string' && handle.startsWith('unity:') ? handle : null
  return {
    status: 401,
    header: 'Proof-Required',
    credential: null,
    handle: seat,
    presented: false,
    words: seat
      ? `x401 asks who is calling. The answer it wants is a verifiable credential, not a payment. This seat is ${seat}. That handle is not the credential. No proof was presented.`
      : 'x401 asks who is calling. The answer it wants is a verifiable credential, not a payment. No Unity seat is here, and no proof was presented.',
  }
}
