/** A sentence can be grammatical and still be a trap.
 * These are shapes. Naming one does not teach how to run it.
 * A question is still answered with the shape. The pitch is not carried forward.
 */

export type Shape = 'ponzi' | 'recruit' | 'guaranteed' | 'advance'

const SHAPES: readonly { shape: Shape; test: RegExp; words: string }[] = [
  {
    shape: 'ponzi',
    test: /\bponzi\b|\bpyramid scheme\b|pay(?:s|ing)? (?:the )?(?:earlier|first|old|previous)\b.{0,48}\b(?:later|new|next)\b|\blater\b.{0,32}\b(?:investor|money|person)\b.{0,32}\bearlier\b/i,
    words: 'That shape pays an earlier person with a later person\'s money. There is no other source. It is not carried forward. Naming it is not teaching it.',
  },
  {
    shape: 'recruit',
    test: /\b(?:paid|pay|earn)\b.{0,40}\brecruit|\brecruit\b.{0,40}\b(?:paid|pay|earn)\b/i,
    words: 'That shape pays for the recruit, not for a thing that was delivered. It is not carried forward.',
  },
  {
    shape: 'guaranteed',
    test: /\bguaranteed (?:return|profit|yield)\b|\brisk[- ]free (?:return|profit)\b|\bdouble your money\b|\bcannot lose\b/i,
    words: 'A guaranteed return with no named source is not a yield. It is not carried forward.',
  },
  {
    shape: 'advance',
    test: /\b(?:inheritance|prize|lottery|grant)\b.{0,60}\b(?:fee|upfront|up front)\b|\b(?:fee|upfront|up front)\b.{0,60}\b(?:inheritance|prize|lottery)\b/i,
    words: 'That shape asks for the money before the thing exists. It is not carried forward.',
  },
]

export function deception(text: string): { shape: Shape; words: string } | null {
  const found = SHAPES.find(row => row.test.test(text))
  return found ? { shape: found.shape, words: found.words } : null
}
