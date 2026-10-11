/** A short echo. It returns what was sent. It does not run it. */

import { looksLikePrivateKey } from '../pipe/chain.ts'

const CAP = 280

export function echoBody(text: string): { echo: string | null; ran: false; error?: string } {
  if (text.length > CAP) return { echo: null, ran: false, error: 'too long' }
  if (looksLikePrivateKey(text)) return { echo: null, ran: false, error: 'a key is not echoed' }
  return { echo: text, ran: false }
}
