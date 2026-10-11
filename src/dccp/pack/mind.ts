/** What a player needs before a game, and nothing that was not already held.
 * The ice first. Then the day around it. A hole stays a hole.
 */

import type { SheetGame } from './script.ts'

export interface MindBag {
  games: SheetGame[]
  events: { name?: string; start?: string; location?: string; opponent?: string }[]
  kcal: number | null
}

export function mindAsk(text: string, bag: MindBag): { title: string; lines: string[]; speech: string } | null {
  const t = text.toLowerCase()
  if (!/\bmatchup\b|\bnext game\b|\bagainst\b|\bhome game\b|\broad game\b|\baway game\b|\bbefore the game\b|\bscout\b/.test(t)) return null
  const foe = t.match(/\bagainst\s+([a-z0-9 .'-]{2,40}?)(?:\s+at\b|,|\.|$)/)
  const name = foe ? foe[1].trim() : ''
  const where = /\bhome\b/.test(t) ? 'Home' : /\broad\b|\baway\b/.test(t) ? 'Road' : 'Home or road was not said'
  const clock = t.match(/\b(\d{1,2}(?::\d{2})?\s*(?:am|pm))\b/)
  const when = clock ? clock[1] : 'No time was said'
  const game = name ? bag.games.find(row => row.clubs.some(club => club.toLowerCase().includes(name))) : undefined
  const event = name ? bag.events.find(row => (row.opponent ?? '').toLowerCase().includes(name) || (row.name ?? '').toLowerCase().includes(name)) : undefined
  const lines = [
    name ? `Next: against ${name}. ${where}. ${when}.` : 'No opponent was named.',
    game ? `Sheet: ${game.id}, ${game.clubs[0]} and ${game.clubs[1]}.` : 'Sheet: no meeting with that club is held.',
    event ? `Cached event: ${event.name || 'event'}${event.start ? `, ${event.start}` : ''}${event.location ? `, ${event.location}` : ''}.` : 'No cached event names that opponent.',
    bag.kcal != null ? `Body: ${bag.kcal} kcal logged today.` : 'Body: nothing logged today.',
    'Sky: the weather feed is on the HUD once a rink is known. No sky is attached to this brief.',
    'Drive: 511 Ontario is the public road door. It has not been read.',
    'News: five Belleville outlets are watched. No game story is held.',
    'Training is not held. A stay is not this brief unless you ask for the trip.',
  ]
  const speech = `The ice first, then the day around it. ${lines[0]} ${lines[1]} ${lines[2]} ${lines[3]} The sky, the drive, the local news, and training are the outside of the rink. ${lines[4]} ${lines[5]} ${lines[6]} ${lines[7]} A stat was not invented.`
  return { title: 'Before the game', lines, speech }
}
