/** Why sits beside when. A cause is labeled. It does not fill a hole. */

export interface Cause {
  event: string
  why: string
  claim: 'REPORTED' | 'MODELED'
  source: string
}

export const CAUSES: readonly Cause[] = [
  {
    event: 'Tranquility Base',
    why: 'The landing place was picked as a flat mare the descent stage could reach in the July lighting window, after the site surveys. The clock says when. This says why that patch of ground.',
    claim: 'REPORTED',
    source: 'NASA Apollo 11 mission report, site-selection record',
  },
  {
    event: 'Sun Jupiter Earth Moon order',
    why: 'Mean-distance force ranks Sun–Jupiter above Sun–Earth above Earth–Moon because mass times mass over distance squared says so at those means. It is not a vector and it is not a phase.',
    claim: 'MODELED',
    source: 'Newtonian pairwise sum at mean distances',
  },
]

export function whyBeside(speech: string): string | null {
  const lower = speech.toLowerCase()
  const hit = CAUSES.find(cause => {
    if (lower.includes(cause.event.toLowerCase())) return true
    return cause.event === 'Tranquility Base' && /eagle has landed|tranquility/.test(lower)
  })
  if (!hit) return null
  return ` Why: ${hit.why} Claim ${hit.claim}. ${hit.source}.`
}
