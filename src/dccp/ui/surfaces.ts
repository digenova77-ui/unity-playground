/** Two surfaces. The talk is a question. The code line is the next step, and it is not written yet.
 * A Unity handle does not vote. Merit does not buy a vote. Energy was not measured.
 */

export function surfaces(): { talk: 'Speak. A question is not a vote.'; code: 'Next is +1. It is not written yet.'; same: true } {
  return { talk: 'Speak. A question is not a vote.', code: 'Next is +1. It is not written yet.', same: true }
}

export function invokeAsk(handle: string | null): { granted: false; handle: string | null; both: true } {
  return { granted: false, handle, both: true }
}

export function invokeWords(handle: string | null): string {
  const who = handle ? `This handle is ${handle}.` : 'No Unity handle is seated.'
  return `${who} It can ask. It cannot vote. Merit does not buy a vote. A decision spends 1 test unit, and that unit is not a dollar. Energy was not measured, so it is not a peg. Output and results are not held. A derivative is a supplied claim, not a payout. The code surface shows the next step, and that step is not written yet. The talk surface is the question. They are not the same screen. The till is closed. Both halves name this.`
}
