/** A spoken turn is a tap with a voice. A typed box is the slow path.
 * A key and a signature are not speech. Those stay a paste.
 */

const SMALL: Record<string, number> = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
  ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16,
  seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50,
  sixty: 60, seventy: 70, eighty: 80, ninety: 90,
}

export function spokenNumber(raw: string): number | null {
  const digit = raw.match(/\d[\d,]*/)
  if (digit) return Number(digit[0].replace(/,/g, ''))
  const words = raw.toLowerCase().split(/[^a-z]+/).filter(Boolean)
  let total = 0
  let current = 0
  let seen = false
  for (const word of words) {
    if (word === 'and') continue
    if (word === 'hundred') { current = (current || 1) * 100; seen = true; continue }
    if (word === 'thousand') { total += (current || 1) * 1000; current = 0; seen = true; continue }
    const n = SMALL[word]
    if (n == null) { if (seen) break; continue }
    current += n
    seen = true
  }
  return seen ? total + current : null
}

export type Spoken =
  | { kind: 'ask' }
  | { kind: 'nav'; id: 'home' | 'atlas' | 'profile' | 'wallet' | 'nutrition' | 'watch' | 'resources' | 'system' | 'here' }
  | { kind: 'page'; href: '/' | '/story' | '/pyramid' | '/fusion' }
  | { kind: 'mic-off' }
  | { kind: 'food'; name: string }
  | { kind: 'goal'; n: number }
  | { kind: 'meal'; id: 'breakfast' | 'lunch' | 'dinner' | 'snack' }
  | { kind: 'contact'; handle: string }
  | { kind: 'send'; to: string; amount: number }
  | { kind: 'fund' }
  | { kind: 'withdraw'; amount: number }
  | { kind: 'ledger'; face: 'white' | 'dark'; text: string }
  | { kind: 'seat'; seatKind: string; consent: boolean; mark: string }
  | { kind: 'key-hole' }
  | { kind: 'agree' }

const NAV: Record<string, Extract<Spoken, { kind: 'nav' }>['id']> = {
  home: 'home', atlas: 'atlas', profile: 'profile', wallet: 'wallet',
  food: 'nutrition', nutrition: 'nutrition', watch: 'watch', needs: 'resources',
  resources: 'resources', system: 'system', here: 'here',
}

export function spokenTurn(text: string, open: { nutrition: boolean } = { nutrition: false }): Spoken {
  const said = text.trim().replace(/\s+/g, ' ')
  const low = said.toLowerCase().replace(/[.?!]+$/g, '')
  if (!low) return { kind: 'ask' }
  if (/\b(private key|public key|signature|begin public key)\b/.test(low)) return { kind: 'key-hole' }
  if (/^(?:mic|microphone) off$|^stop listening$|^stop the mic$/.test(low)) return { kind: 'mic-off' }
  if (/^i agree$/.test(low)) return { kind: 'agree' }
  const page = low.match(/^(?:open |go to |show )?(?:the )?(telling|story|giza|pyramid|fusion|earth|world)$/)
  if (page) {
    const name = page[1]
    if (name === 'telling' || name === 'story') return { kind: 'page', href: '/story' }
    if (name === 'giza' || name === 'pyramid') return { kind: 'page', href: '/pyramid' }
    if (name === 'fusion') return { kind: 'page', href: '/fusion' }
    return { kind: 'page', href: '/' }
  }
  const nav = low.match(/^(?:go |open |show )?(?:the |to )?(home|atlas|profile|wallet|food|nutrition|watch|needs|resources|system|here)$/)
  if (nav && NAV[nav[1]]) return { kind: 'nav', id: NAV[nav[1]] }
  const goal = low.match(/^(?:set )?(?:the )?(?:calorie )?goal(?: to)? (.+)$/)
  if (goal) {
    const n = spokenNumber(goal[1])
    if (n != null) return { kind: 'goal', n }
  }
  if (/^(breakfast|lunch|dinner|snack)$/.test(low)) return { kind: 'meal', id: low as 'breakfast' }
  const food = low.match(/^(?:food|ate|eat|log|find) (.+)$/)
  if (food) return { kind: 'food', name: food[1] }
  const contact = said.match(/^add (?:contact |handle )?(.+)$/i)
  if (contact) return { kind: 'contact', handle: contact[1].trim() }
  const send = low.match(/^send (.+?) (?:units? )?to (.+)$/)
  if (send) {
    const amount = spokenNumber(send[1])
    if (amount != null && amount > 0) return { kind: 'send', to: send[2].trim(), amount }
  }
  if (/^charge(?: the wallet)?$/.test(low)) return { kind: 'fund' }
  const back = low.match(/^withdraw(?: (.+))?$/)
  if (back) return { kind: 'withdraw', amount: back[1] ? spokenNumber(back[1]) ?? 0 : 0 }
  const ledger = said.match(/^take (?:this|it) in (white|dark)\b[:,]?\s*(.*)$/i)
  if (ledger) return { kind: 'ledger', face: ledger[1].toLowerCase() as 'white' | 'dark', text: ledger[2].trim() }
  if (/^take a seat\b/.test(low)) {
    return {
      kind: 'seat',
      seatKind: /other juvenile/.test(low) ? 'other juvenile' : 'minor athletics',
      consent: /consent/.test(low),
      mark: said.replace(/^take a seat\b[:,]?\s*/i, '').trim(),
    }
  }
  if (open.nutrition && low.split(' ').length <= 4 && spokenNumber(low) == null) return { kind: 'food', name: said.trim() }
  return { kind: 'ask' }
}

export function listenOnce(onText: (text: string) => void, onHole: (why: string) => void): void {
  const w = window as unknown as Record<string, new () => {
    lang: string
    start(): void
    onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null
    onerror: (() => void) | null
  }>
  const Rec = w.SpeechRecognition ?? w.webkitSpeechRecognition
  if (!Rec) {
    onHole('This browser has no speech recognition. The links are the tap.')
    return
  }
  const rec = new Rec()
  rec.lang = 'en-US'
  rec.onresult = event => onText(event.results[0]?.[0]?.transcript ?? '')
  rec.onerror = () => onHole('The microphone was not granted.')
  try { rec.start() } catch { onHole('The microphone is already open.') }
}
