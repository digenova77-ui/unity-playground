/** The human verifier of truth is the account. The person does not have to say it.
 * The machine can hold a cite. It does not verify it. Dark is not a verification.
 */

export type Verifier = 'human'

export interface Verdict {
  verifier: Verifier
  state: 'verified' | 'refused'
  why: string
}

export function verifyTruth(input: { present: boolean; account: boolean }): Verdict {
  if (!input.account) return { verifier: 'human', state: 'refused', why: 'No account is bound. Nothing was verified.' }
  if (!input.present) return { verifier: 'human', state: 'refused', why: 'The account has no place. Nothing was verified.' }
  return { verifier: 'human', state: 'verified', why: 'The account says it. The person does not have to say it.' }
}

export function verifierWords(): string {
  return 'The human verifier of truth is the account, not the person speaking. Iris does not verify it. The father seed does not verify it. Holding the white ledger does not verify it. A dark seal does not verify it. The account says it when the person is there. If the account is not there, nothing is verified.'
}
