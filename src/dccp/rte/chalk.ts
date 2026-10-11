/** A chalkboard draws two looks. A record is counted only when a game row is already held.
 * Standings are not parsed. A score is not invented. A counter is not chosen.
 */

import { playAsk, type Play } from './plays.ts'
import { styleAsk } from './roles.ts'

export interface ChalkSide {
  name: string
  spots: { role: string; x: number; z: number }[]
}

export function opponentOf(text: string): string | null {
  const found = text.toLowerCase().match(/\bagainst\s+([a-z0-9][a-z0-9 .'-]{1,40})/)
  if (!found) return null
  const name = found[1].split(/\b(?:their|using|on the|in the|with)\b/)[0].replace(/[?.!]/g, '').trim()
  if (!name || playAsk(name) || (styleAsk(name) && 'spot' in (styleAsk(name) ?? {}))) return null
  return name
}

export function priorGames(games: readonly { clubs: readonly [string, string] }[], them: string): number {
  const needle = them.toLowerCase()
  return games.filter(game => game.clubs.some(club => club.toLowerCase().includes(needle))).length
}

export function theirLook(text: string): ChalkSide | null {
  const side = text.toLowerCase().split(/\btheir\b/)[1]
  if (!side) return null
  const play = playAsk(side)
  if (play && 'spots' in play) return { name: play.name, spots: play.spots.map(spot => ({ ...spot })) }
  const style = styleAsk(side)
  if (style && 'spot' in style) return { name: style.name, spots: [{ ...style.spot }] }
  return null
}

export function ourLook(text: string): Play | { choice: string } | null {
  const side = /\b(against|their)\b/.test(text) ? text.split(/\b(?:against|their)\b/)[0] : text
  return playAsk(side)
}

export function chalkLine(text: string, games: readonly { clubs: readonly [string, string] }[]): string | null {
  const them = opponentOf(text)
  const board = /\bchalkboard\b|\bhistorical\b|\bstandings\b|\bagainst\b/.test(text.toLowerCase())
  if (!them && !board) return null
  if (!them) return 'Chalkboard. No opponent is named. Historical rows held: 0. Standings are not held. A counter is not chosen.'
  const held = priorGames(games, them)
  return `Against ${them}. Held games ${held}. Standings are not held. A score is not held. A counter is not chosen.`
}
