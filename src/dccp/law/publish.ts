/** The public line is the claim. The exact words are the record.
 * A title does not change the rule. This does not enter another network.
 */

import { forPartner } from './partner.ts'
import { symbiotic } from './symbiosis.ts'

export interface Publication {
  author: string
  recorded: string
  publicText: string | null
  judgement: 'published' | 'withheld'
  why: string
}

export function publishLine(author: string, text: string): Publication {
  const who = author.trim() || 'author'
  const recorded = text.trim()
  const partner = forPartner(recorded)
  const pair = symbiotic(
    { name: who, gives: 'the exact words', receives: 'the judgement' },
    { name: 'the public', gives: 'the judgement', receives: partner.line ?? '' },
  )
  if (!partner.line || !pair.holds) {
    return {
      author: who,
      recorded,
      publicText: null,
      judgement: 'withheld',
      why: `${who} said it. It is recorded. It is not public. ${partner.why} ${pair.why}`,
    }
  }
  return {
    author: who,
    recorded,
    publicText: partner.line,
    judgement: 'published',
    why: `${pair.why} A title does not change the rule.`,
  }
}

export function publishWords(): string {
  return 'Any author gets the same rule, a president or anyone else. They may say it. The exact words are the record. The public line is only the claim. A trap is not public. This layer does not enter X or any other network, and it does not rewrite someone else\'s account. The author chooses the next line if they want it public.'
}
