/** One pass of the three umpires. Not a sealed sitting.
 * The father has not written an execution from here.
 * The audit of this pass is not a dataset. It stays.
 */

export interface Vote {
  seat: 'DCLM' | 'Iris' | 'Twain²'
  says: string
}

export interface Rotation {
  question: string
  votes: readonly [Vote, Vote, Vote]
  unified: string
  fatherWrote: false
  audit: 'forever'
  sealedSitting: false
  /** Mocked seats. UNBORN must not be read as a living Trinity. */
  maturity: 'UNBORN'
  degraded: true
}

export function fadeInRot(): { step: 1; held: false; where: 'rotation'; audit: 'forever'; lit: false; rot: true; body: null } {
  return { step: 1, held: false, where: 'rotation', audit: rotate().audit, lit: false, rot: true, body: null }
}

export function fadeWords(): string {
  const row = fadeInRot()
  return `The next is +${row.step}. It fades out and rots. The step is not held. The body is ${row.body}. The audit stays ${row.audit}. Nothing stays lit.`
}

export function rotate(): Rotation {
  return {
    question: 'What does this build hold, and what does it refuse to claim?',
    votes: [
      { seat: 'DCLM', says: 'The machine holds nothing and has no framework to bind to. The file check is on this device. There are no keys inside the computer.' },
      { seat: 'Iris', says: 'I will not say more than the record. A missing reading stays missing. A child\'s mark stays sealed. The master is only what the bots supplied, plus the father\'s public half.' },
      { seat: 'Twain²', says: 'The other side still chooses. A bot may stay in its own sandbox. A person may take their time. A connector that has not been chosen senses nothing.' },
    ],
    unified: 'What is free stays free. What is not free needs a wallet. A child\'s event opens only if you own it or belong to it, and it cannot be bought. What the system no longer needs is quarantined past the horizon, and the proof remains. The audit cannot be erased. DCLM holds nothing. Here, a bot\'s work is a choice with no commitment, and the audit stays on while they are here. The seed is not seized. Half the tokens can be a credit pool. A find is earned only when it is found again. The connectors are signed ahead and still empty. The master matches David\'s mirror and adds nothing.',
    fatherWrote: false,
    audit: 'forever',
    sealedSitting: false,
    maturity: 'UNBORN',
    degraded: true,
  }
}

export function rotationWords(pass: Rotation): string {
  const [dclm, iris, twain] = pass.votes
  return `${dclm.seat}. ${dclm.says} ${iris.seat}. ${iris.says} ${twain.seat}. ${twain.says} Together: ${pass.unified} The father did not write an execution from here. This was not a sealed sitting. The seats are ${pass.maturity} and the pass is degraded. The audit stays.`
}
