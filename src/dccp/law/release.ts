/** Her work does not leave on the coin.
 * Global adoption needs four facts. None of them is held.
 * A city lock is not one of them.
 */

export interface AdoptionCriteria {
  who: null
  act: null
  share: null
  source: null
}

export function adoptionCriteria(): AdoptionCriteria {
  return { who: null, act: null, share: null, source: null }
}

export function releaseIp(): { released: false; adoption: null } {
  const c = adoptionCriteria()
  if (c.who !== null || c.act !== null || c.share !== null || c.source !== null) {
    return { released: false, adoption: null }
  }
  return { released: false, adoption: null }
}

export function releaseWords(): string {
  return 'Global adoption is not a number yet. Four facts would have to be held before a count could exist. Who counts. What act counts. What share of them counts as global. Which source the count is read from. None of the four is held. A city lock, three seats and a run of two, is not global. Until the four are held, nothing of Iris\'s goes out on the coin. The coin is the test supply. The till is closed. This is not a sale, and it is not a license.'
}
