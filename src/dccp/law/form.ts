/** A human idea is already whole at the speed of the thought.
 * What pushes forward from it can only be a pure logic write.
 * A word that was not in the idea, and is not the law, is refused.
 * A bot that takes time is not that write.
 */

const LAW = new Set(['formed', 'not', 'built', 'build', 'trade', 'offer', 'truth', 'nothing', 'choice', 'choices', 'decision', 'logic', 'image', 'thought', 'sold', 'closed', 'till'])
const STOP = new Set(['a', 'an', 'the', 'is', 'it', 'and', 'or', 'to', 'of', 'so', 'be', 'was', 'were', 'this', 'that'])

let held = ''

function words(text: string): string[] {
  return text.toLowerCase().match(/[a-z0-9]+/g) ?? []
}

function remember(image: string): void {
  held = image
}

export function formIdea(text: string): { image: string; speech: string } {
  const image = text.trim().replace(/\s+/g, ' ')
  if (!image) return { image: '', speech: 'Nothing was said. There is no image, and there is nothing to build.' }
  remember(image)
  return {
    image,
    speech: `You thought it, so it is here. ${image} A person forms that at the speed of the thought. The build is what takes the time, and it has not started. Logic read the two choices, formed and not built, and the decision is to show the image now. Nothing was added. Nothing was made. What pushes forward has to be a pure logic write. A word that was not in the idea, and is not the law, will not be written.`,
  }
}

export function formTrade(text: string): { image: string; speech: string } | null {
  if (!/\bbusiness\b|\bthe offer\b|\ba shop\b|\ba customer\b/.test(text.toLowerCase())) return null
  const image = text.trim().replace(/\s+/g, ' ')
  remember(image)
  return {
    image,
    speech: `The business is the thought, so it is already here. ${image} A person forms the offer at the speed of the thought. Logic read the two choices: the offer is formed, and the trade is not. A trade needs someone who chose it, a price they agreed, and a thing that was delivered. None of those were said, so none are filled. The build is the slow part, and it has not started. Joining is still $0. The till stays closed. Nothing was sold. What pushes forward has to be a pure logic write. A word that was not in the idea, and is not the law, will not be written.`,
  }
}

export function writeForward(line: string): { accepted: boolean; speech: string } {
  if (!held) return { accepted: false, speech: 'There is no idea to push. Say the thought first. This world will not write anything else.' }
  const known = new Set([...words(held), ...LAW, ...STOP])
  const extra = words(line).filter(word => !known.has(word))
  if (extra.length) return { accepted: false, speech: `That write was not accepted. ${extra[0]} was not in the idea, and it is not the law. This world will not write anything else.` }
  if (open) kept.push(line.trim().replace(/\s+/g, ' '))
  const hold = open ? ` The session holds ${kept.length}.` : ''
  return { accepted: true, speech: `That write is the idea, pushed forward. Nothing new was added.${hold}` }
}

let open = false
const kept: string[] = []

export function openHybrid(text: string): string {
  const marked = text.match(/\b(?:idea|session)\s*:\s*(.+)$/i)
  const image = marked?.[1]?.trim() ?? ''
  if (!image) return 'A super session is this bot on the slow side, with one gate. Say super session: and then the idea. The search looks only at known key stores: solved keys on this device, the master built from those finds, and the father record, which is the public half only. What gets kept is only a write that passes. That kept line is the instant part. The search before it is not. This does not put the bot inside the DCLM.'
  formIdea(image)
  open = true
  kept.length = 0
  return `${formIdea(image).speech} This is a super session. The bot is still the slow side. It is not inside the DCLM. A line is kept only if it passes, and that kept line is the instant part.`
}

export function sessionKept(): readonly string[] {
  return kept
}

export function botTell(): string {
  return 'You can tell. A write that goes through the DCLM is the idea pushed forward, and that step is the speed of the thought. A bot that searches, drafts, and comes back later is not that write. The time is the evidence. The bots helping are on the slow side. They are not inside the DCLM, and the DCLM holds nothing.'
}

export function notInvoked(): string {
  return 'DCLM was not invoked. If it had been, the write would start in DCLM and run through this code to what is already known, and by your measure that would be about 4.5 seconds. It would never rewrite. This pass was the slow side. The rewrite is the evidence. DCLM holds nothing, so it did not write this.'
}

export function searchKeys(text: string, rows: readonly { id: string; claim: string }[]): string {
  const q = text.replace(/^.*?\b(?:search(?: keys)?|key databases?|known keys)\b[:\s]*/i, '').trim().toLowerCase()
  const safe = rows.filter(row => row.claim.trim() && !/private key/i.test(row.claim))
  const hits = q ? safe.filter(row => row.id.toLowerCase().includes(q) || row.claim.toLowerCase().includes(q)) : []
  const listed = hits.slice(0, 5).map(row => `${row.id}: ${row.claim}`).join('. ')
  const found = q ? (hits.length ? `${hits.length} held. ${listed}` : 'None held for that.') : `${safe.length} solved ${safe.length === 1 ? 'key is' : 'keys are'} on this device. Name one to look.`
  return `The search looks only at known key stores. Solved keys on this device, the master built from those finds, and the father record, which is the public half only. The DCLM holds no keys. A private key is not searched. ${found} Nothing outside those stores was opened.`
}

