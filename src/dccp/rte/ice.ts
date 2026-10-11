import { sheetGames, sheetLine } from '../live/sheet.ts'
import { relayLine } from '../unity/relay.ts'
import { boardLine } from '../pack/hudl.ts'
import { chalkLine, ourLook, theirLook } from './chalk.ts'
import { modeledPlay, playAsk } from './plays.ts'
import { styleAsk, styleSaid } from './roles.ts'

/** One ice room. A look changes the cut. A name is not stored.
 * GameSheet is watched from the public page. Huddle is not connected. TeamSnap is the seat bind already built.
 */

export interface IceFuel {
  kcal: number | null
  protein: number | null
}

export interface SnapEvent {
  name?: string
  start?: string
  location?: string
  opponent?: string
}

export interface IceAudit {
  cut: string
  at: string
}

export interface IceRoom {
  title: string
  lines: string[]
  speech: string
  place: 'rink' | 'dressing' | 'office'
  spots?: { role: string; x: number; z: number }[]
  chalk?: { role: string; x: number; z: number }[]
}

interface Sheet {
  team: string | null
  parent: boolean | null
  position: string | null
  shoots: string | null
  teamsnap: boolean | null
  style: string | null
}

const RECORD = 'The numbers are not in yet. They will be here as soon as it\'s available.'
const sheet: Sheet = { team: null, parent: null, position: null, shoots: null, teamsnap: null, style: null }
const audit: IceAudit[] = []
let snap: SnapEvent[] = []

export function snapFromStorage(raw: string | null): SnapEvent[] {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as { events?: SnapEvent[] }
    return Array.isArray(parsed.events) ? parsed.events.filter(row => row && typeof row === 'object').slice(0, 8) : []
  } catch {
    return []
  }
}

export function resetIce(): void {
  sheet.team = sheet.position = sheet.shoots = sheet.style = null
  sheet.parent = sheet.teamsnap = null
  snap = []
  audit.splice(0, audit.length)
}

export function iceLook(): { looks: number; cut: string } {
  const last = audit.at(-1)
  return { looks: audit.length, cut: last?.cut ?? 'U16 AAA' }
}

export function iceAudit(): IceAudit[] {
  return audit
}

function aboutIce(t: string): boolean {
  return /\bhockey\b|\brink\b|\bice\b|\bu\d{1,2}\b|\baaa\b|\bhouse\b|\bgamesheet\b|\bhuddle\b|\bpower ?play\b|\bpenalty kill|\bdressing\b|\bboard office\b|\bnutrition\b|\bgoalie\b|\bforecheck\b|\bbreakout\b|\bumbrella\b|\boverload\b|\bschematic\b|\btrap\b|\bsniper\b|\bplaymaker\b|\bpositional\b|\bdefenceman\b|\bdefenseman\b|\bchalkboard\b|\bhistorical\b|\bstandings\b|\bagainst\b|\bopponent\b/.test(t) || playAsk(t) !== null || styleAsk(t) !== null
}

function cutOf(t: string): string {
  const found = t.match(/\bu(\d{1,2})\s*aaa\b/)
  if (found) return `U${found[1]} AAA`
  if (/all ages/.test(t)) return 'All ages, all levels'
  return 'U16 AAA'
}

function situation(t: string): string {
  if (/power ?play/.test(t)) return 'Chances on the power play'
  if (/penalty kill/.test(t)) return 'Penalty kill'
  return 'Ice time, the whole game'
}

function placeOf(t: string): 'rink' | 'dressing' | 'office' | 'other' {
  if (/dressing|addressing room/.test(t)) return 'dressing'
  if (/board office/.test(t)) return 'office'
  if (/penalty box/.test(t)) return 'other'
  return 'rink'
}

function nextYours(): string | null {
  if (!sheet.team) return 'Which club is the U16 team? The club, not a player.'
  if (sheet.parent === null) return 'Are you the parent on this Unity ID?'
  if (sheet.teamsnap === null && snap.length === 0) return 'The schedule pipe is TeamSnap, already built. This browser has no cached events. Say skip, or connect on the ice seat.'
  return null
}

function nextHis(): string | null {
  if (!sheet.position) return 'On his Unity ID: forward, defense, or goalie?'
  if (!sheet.shoots) return 'Which side does he shoot?'
  return null
}

function snapLine(): string {
  if (!snap.length) return 'TeamSnap APIv3 is the seat bind already built. Scope is read. The secret stays on the worker. This browser has no cached events. A roster is not drawn.'
  const next = snap[0]
  const when = next.start ? ` ${next.start}` : ''
  const where = next.location ? ` at ${next.location}` : ''
  return `TeamSnap. Next: ${next.name || 'event'}${when}${where}. ${snap.length} cached. A roster is not drawn.`
}

function render(text: string, fuel?: IceFuel): IceRoom {
  const t = text.toLowerCase()
  const cut = cutOf(t)
  const roomPlace = placeOf(t)
  const picked = ourLook(t)
  const play = picked && 'spots' in picked ? picked : null
  const them = theirLook(t)
  const board = chalkLine(t, sheetGames())
  const said = styleSaid(t)
  if (said) sheet.style = said.name
  const style = said ?? (styleAsk(t) && 'spot' in (styleAsk(t) ?? {}) ? styleAsk(t) as { name: string; line: string; spot: { role: string; x: number; z: number } } : null)
  const listed = !style && styleAsk(t) && 'list' in (styleAsk(t) ?? {}) ? styleAsk(t) as { list: string } : null
  const place = play || style ? 'rink' : roomPlace === 'other' ? 'rink' : roomPlace
  const look = situation(t)
  const yours = nextYours()
  const his = nextHis()
  const fuelBit = fuel?.kcal != null ? `${fuel.kcal} kcal and ${fuel.protein ?? 0} g protein on the board.` : ''
  const prescribe = /\bwhat should (?:we|i|he) do\b/.test(t)
  const lines = [
    board ?? '',
    cut,
    'U16 AAA',
    play ? play.name : style ? style.name : look,
    roomPlace === 'dressing' ? 'Dressing room' : roomPlace === 'office' ? 'Board office. No budget is held.' : roomPlace === 'other' ? 'That room is not drawn. The rink stays.' : 'The rink',
    play ? play.spots.map(spot => spot.role).join(' ') : '',
    sheet.team ? `Club ${sheet.team}.` : 'No club yet.',
    sheet.position ? `His position ${sheet.position}. Shoot ${sheet.shoots ?? 'not said'}.` : 'His position is not said.',
    sheet.style ? `His style ${sheet.style}.` : '',
    snapLine(),
  ].filter(Boolean)
  const speech = [
    `One ice room. This look is ${cut}. The room held is U16 AAA.`,
    board ?? '',
    play ? `${play.name}. ${play.when} Drawn because you asked. It is a schematic, not a stat.` : style ? `${style.name}. ${style.line} A style is not a stat. A name is not stored.` : look,
    them ? `Their look is ${them.name}. It is drawn on the other color. It is not a scouting report.` : '',
    listed ? `The styles held: ${listed.list}. None is assigned.` : '',
    picked && 'choice' in picked ? `More than one is held: ${picked.choice}. None was drawn.` : '',
    prescribe || (play && !modeledPlay(null)) ? 'No gamesheet stat names the situation. A play is not prescribed.' : '',
    RECORD,
    fuelBit,
    sheetLine(),
    relayLine(),
    boardLine(),
    'Huddle is not connected.',
    snapLine(),
    `Your Unity ID asks: ${yours ?? 'nothing further.'}`,
    `His room asks: ${his ?? 'nothing further.'}`,
    'No name goes in either room.',
    roomPlace === 'office' ? 'No budget is held.' : '',
    roomPlace === 'other' ? 'That room is not drawn.' : '',
    'I did not invent a stat.',
  ].filter(Boolean).join(' ')
  return { title: 'Ice', lines, speech, place, spots: play?.spots.map(spot => ({ ...spot })) ?? (style ? [{ ...style.spot }] : undefined), chalk: them?.spots }
}

export function iceRoom(text: string, fuel?: IceFuel, events?: SnapEvent[]): IceRoom | null {
  const t = text.toLowerCase()
  if (!aboutIce(t)) return null
  if (events) snap = events
  if (snap.length) sheet.teamsnap = true
  const room = render(t, fuel)
  audit.push({ cut: cutOf(t), at: '' })
  return room
}

export function answerIce(text: string, fuel?: IceFuel): IceRoom | null {
  const t = text.trim().toLowerCase()
  if (!t || aboutIce(t)) return null
  const club = t.match(/\bthe club is ([a-z0-9 .'-]{2,40})/)
  if (club) sheet.team = club[1].replace(/[.?!]/g, '').trim()
  const pos = t.match(/\b(?:he|his) is an? (forward|defense|defence|goalie)\b/)
  if (pos) sheet.position = pos[1] === 'defence' ? 'defense' : pos[1]
  const side = t.match(/\bshoots (left|right)\b/)
  if (side) sheet.shoots = side[1]
  if (!club && !pos && !side) return null
  return render('u16 aaa hockey', fuel)
}
