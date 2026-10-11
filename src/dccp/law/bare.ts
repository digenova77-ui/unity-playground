/** The person may say the words. What is answered is the claim.
 * Insults are not part of the claim. If no claim remains, the line is not answered.
 * This does not judge the idea. It only removes the noise around it.
 */

const NOISE = /\b(?:fuck(?:ing|ed)?|shit(?:ty)?|damn(?:ed)?|goddamn|asshole|bitch|bastard|idiot|stupid|dumb|stfu|wtf|crap)\b/gi

export interface Bones {
  claim: string | null
  disregarded: boolean
}

export function bareBones(text: string): Bones {
  const claim = text.replace(NOISE, ' ').replace(/\s+/g, ' ').trim()
  const left = claim.replace(/[^a-z0-9]+/gi, ' ').trim()
  if (left.length < 8) return { claim: null, disregarded: true }
  return { claim, disregarded: false }
}

export function bareWords(): string {
  return 'You can say it. What is answered is the claim, with the insult left off. If no claim remains, it is not answered. A sentence that pays an earlier person with a later person\'s money is a shape, and it is not carried forward. The exact words are not spoken back. They are sealed only after the yes, and they are not read.'
}
