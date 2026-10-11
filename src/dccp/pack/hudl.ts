/** What Hudl gives away, and what a Unity ID can find there.
 * The ID is not sent. A person is not looked up. Names on a public board are not kept.
 */

export interface BoardGame {
  away: string
  home: string
  awayScore: number | null
  homeScore: number | null
  state: string
}

export interface BoardLook {
  at: string
  games: BoardGame[]
}

const held: BoardGame[] = []

export function hudlFor(unityId: string | null): { found: false; said: string } {
  const who = unityId ? 'That Unity ID' : 'A Unity ID'
  return {
    found: false,
    said: `${who} is not a Hudl key. Hudl was not asked, and it did not return a person. Hockey telemetry is not free there. What is free is a login the person already has, or a highlight they chose to embed. The licensed feeds are Wyscout, StatsBomb, and Hudl IQ. Those are not hockey, and they are not free. The frequent public watch is the league scoreboard. It is not this ID.`,
  }
}

function num(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function club(team: unknown): string {
  const row = team as { abbrev?: unknown; name?: { default?: unknown } }
  if (typeof row?.abbrev === 'string' && row.abbrev) return row.abbrev
  if (typeof row?.name?.default === 'string') return row.name.default
  return ''
}

export function readBoard(json: unknown, at: string): BoardLook {
  const games = (json as { games?: unknown[] })?.games
  if (!Array.isArray(games)) return { at, games: [] }
  const rows: BoardGame[] = []
  for (const game of games) {
    const row = game as { awayTeam?: unknown; homeTeam?: unknown; gameState?: unknown }
    const away = club(row.awayTeam)
    const home = club(row.homeTeam)
    if (!away || !home) continue
    const awayScore = num((row.awayTeam as { score?: unknown })?.score)
    const homeScore = num((row.homeTeam as { score?: unknown })?.score)
    rows.push({ away, home, awayScore, homeScore, state: typeof row.gameState === 'string' ? row.gameState : 'unknown' })
    if (rows.length === 8) break
  }
  rows.sort((a, b) => Number(b.state === 'LIVE') - Number(a.state === 'LIVE'))
  return { at, games: rows }
}

export function holdBoard(look: BoardLook): void {
  held.splice(0, held.length, ...look.games)
}

export function boardLine(): string {
  const game = held[0]
  if (!game) return 'The frequent public watch is the league scoreboard. No look has landed yet. It is not Hudl, and it is not a Unity ID.'
  const score = game.awayScore != null && game.homeScore != null ? `${game.awayScore} to ${game.homeScore}` : 'no score printed'
  return `League board. ${game.away} and ${game.home}, ${score}, ${game.state}. Not Hudl. Not this Unity ID.`
}
