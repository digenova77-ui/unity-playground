/** The package, written once.
 * A public page is read. Two clubs may be kept. A name is not.
 * Three relayers carry that look to the Unity ID on this device.
 * No ID means the look stays here. It is not handed to anyone else.
 * Players, goalies, a box score, and live play-by-play are mapped and not opened.
 * Huddle is not in this script. TeamSnap is a cache already on the ice seat, not this read.
 */

export const SEASON = '15488'
export const SEASON_NAME = 'OMHA AAA 2026-2027'

export const SURFACES = [
  { id: 'scores', open: true, offers: 'Completed games. The game id and the two clubs.' },
  { id: 'schedule', open: true, offers: 'Games not played yet. The game id and the two clubs.' },
  { id: 'standings', open: true, offers: 'The page is read. A club row is kept only when one is printed.' },
  { id: 'players', open: false, offers: 'A skater table. Not opened. A name is on that page.' },
  { id: 'goalies', open: false, offers: 'A goalie table. Not opened. A name is on that page.' },
  { id: 'box', open: false, offers: 'One box score. Not opened. A name is on that page.' },
  { id: 'live', open: false, offers: 'Play by play. Not opened. A name is on that page.' },
] as const

const KEY = 'dccpworld.unity-relay.v1'

export interface SheetGame {
  id: string
  clubs: [string, string]
}

export interface SheetLook {
  surface: string
  at: string
  blocked: boolean
  games: SheetGame[]
}

export interface Inbox {
  id: string
  looks: SheetLook[]
}

export interface Relay {
  surface: string
  to: string | null
  games: number
  held: boolean
  said: string
}

export interface Carried {
  look: SheetLook
  relay: Relay
  inbox: Inbox | null
}

export function sheetUrl(id: string): string | null {
  const row = SURFACES.find(surface => surface.id === id)
  if (!row?.open) return null
  if (id === 'standings') return `https://gamesheetstats.com/seasons/${SEASON}/standings`
  const status = id === 'scores' ? 'completed' : 'scheduled'
  return `https://gamesheetstats.com/seasons/${SEASON}/games?filter[status]=${status}`
}

function tidy(name: string): string {
  return name.replace(/^(?:Regular Season|Playoff)\s+/i, '').replace(/^U\d+[A-Z]?\s+[A-Za-z]+\s+/, '').replace(/\s+/g, ' ').trim()
}

export function readSheet(html: string, surface: string, at: string): SheetLook {
  const plain = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, '\n')
  if (/just a moment|cf-chl|challenge-platform|enable javascript and cookies/i.test(plain)) {
    return { surface, at, blocked: true, games: [] }
  }
  const games: SheetGame[] = []
  const re = /Game\s+(U\d+[A-Z]?-\d+)[\s\S]{0,220}?([A-Z][A-Za-z0-9.' -]{2,60})\([^)\n]{0,24}\)[\s\S]{0,180}?([A-Z][A-Za-z0-9.' -]{2,60})\([^)\n]{0,24}\)/g
  let found: RegExpExecArray | null
  while ((found = re.exec(plain)) && games.length < 8) {
    games.push({ id: found[1], clubs: [tidy(found[2]), tidy(found[3])] })
  }
  return { surface, at, blocked: false, games }
}

const looks: SheetLook[] = []
const carried: Relay[] = []

export function sheetGames(): SheetGame[] {
  return looks.flatMap(row => row.games)
}

export function holdSheet(look: SheetLook): void {
  const rest = looks.filter(row => row.surface !== look.surface)
  looks.splice(0, looks.length, look, ...rest)
}

export function deliver(inbox: Inbox | null, look: SheetLook, unityId: string | null): { relay: Relay; inbox: Inbox | null } {
  const games = look.games.length
  if (!unityId) {
    return {
      relay: { surface: look.surface, to: null, games, held: true, said: `${look.surface} relayer held the look. No Unity ID is bound, so it was not delivered.` },
      inbox,
    }
  }
  const prior = inbox && inbox.id === unityId ? inbox.looks : []
  const next = [look, ...prior.filter(row => row.surface !== look.surface)].slice(0, 3)
  const game = look.games[0]
  const row = game ? `${game.id}: ${game.clubs[0]} and ${game.clubs[1]}.` : look.blocked ? 'The site challenged the page.' : 'No game row was in it.'
  return {
    relay: { surface: look.surface, to: unityId, games, held: false, said: `${look.surface} relayer carried it to your Unity ID. ${row} A player name was not in the packet.` },
    inbox: { id: unityId, looks: next },
  }
}

function noteRelay(relay: Relay): void {
  const rest = carried.filter(row => row.surface !== relay.surface)
  carried.splice(0, carried.length, relay, ...rest)
}

export function sheetLine(): string {
  if (!looks.length) return `GameSheet is watched. ${SEASON_NAME}, season ${SEASON}. Scores, schedule, and standings are open. A player page is not drawn. No look has landed yet.`
  const blocked = looks.filter(row => row.blocked).map(row => row.surface)
  const game = looks.flatMap(row => row.games)[0]
  const row = game ? `Newest game ${game.id}: ${game.clubs[0]} and ${game.clubs[1]}.` : 'No game row was read.'
  const wall = blocked.length ? ` ${blocked.join(', ')} ${blocked.length === 1 ? 'was' : 'were'} challenged by the site.` : ''
  return `GameSheet. Season ${SEASON}. ${row}${wall} A player page is not drawn. No score was invented.`
}

export function relayLine(): string {
  if (!carried.length) return 'Three relayers are standing: scores, schedule, and standings. Nothing has been carried yet.'
  return carried.map(row => row.said).join(' ')
}

export function carry(inbox: Inbox | null, html: string, surface: string, at: string, unityId: string | null): Carried {
  const look = readSheet(html, surface, at)
  holdSheet(look)
  const next = deliver(inbox, look, unityId)
  noteRelay(next.relay)
  return { look, relay: next.relay, inbox: next.inbox }
}

export function relayToDevice(look: SheetLook, unityId: string | null): Relay {
  holdSheet(look)
  const next = deliver(readInbox(), look, unityId)
  if (next.inbox) writeInbox(next.inbox)
  noteRelay(next.relay)
  return next.relay
}

function readInbox(): Inbox | null {
  try {
    if (typeof localStorage === 'undefined') return null
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Inbox) : null
  } catch {
    return null
  }
}

function writeInbox(inbox: Inbox): void {
  try {
    if (typeof localStorage === 'undefined') return
    localStorage.setItem(KEY, JSON.stringify(inbox))
  } catch { /* the device could not hold it */ }
}
