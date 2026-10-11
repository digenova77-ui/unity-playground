/** An obscure ask is framed on the three seats. The words are not a place. */

export interface ObscureFrame {
  asked: string
  evidence: string
  claim: string
  check: string
  both: true
}

export function frameObscure(asked: string): ObscureFrame {
  const name = asked.trim().replace(/\s+/g, ' ') || 'that'
  return {
    asked: name,
    evidence: 'Nothing else is held for this.',
    claim: 'The claim stops at the question.',
    check: 'The picture is not the world.',
    both: true,
  }
}

export function obscureLines(frame: ObscureFrame): [string, string, string] {
  return [frame.evidence, frame.claim, frame.check]
}

export function obscureWords(frame: ObscureFrame): string {
  return `You asked about ${frame.asked}. ${frame.evidence} ${frame.claim} ${frame.check} The room is those three, not a place I invented. Both halves name this. The next is +1.`
}
