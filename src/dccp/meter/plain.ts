/** The desk, said in one glance. A unit is not a dollar. The till is closed. */

import { hangLine } from '../index/site.ts'
import { bothHalves } from '../law/kin.ts'
import { coinSecurity } from './coins.ts'
import { tieObserver } from '../law/ask.ts'

export interface PlainInput {
  yours: number
  bots: number
  split: boolean
  yoursMade: number
  botsMade: number
}

function show(n: number): string {
  if (!Number.isFinite(n)) return '—'
  const rounded = Math.round(n * 10) / 10
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1)
}

export function plainEconomics(input: PlainInput): { yours: string; bots: string; till: 'Closed'; rule: string; made: string } {
  const yours = show(input.yours)
  const bots = input.split ? show(input.bots) : '—'
  const fence = bothHalves()
  const made = `You made ${input.yoursMade}. Bots made ${input.botsMade}. Each side keeps its own.`
  if (fence.human !== fence.bot || !fence.implemented) return { yours, bots, till: 'Closed', rule: 'One side alone is not implemented.', made }
  const rule = fence.economy
  return { yours, bots, till: 'Closed', rule, made }
}

export function economicsCard(input: PlainInput): string {
  const row = plainEconomics(input)
  const made = Number.isFinite(input.yours) ? `<p class="econ-made">${row.made}</p>` : ''
  return `<section class="econ" aria-label="Economics"><div class="econ-nums"><p><b>${row.yours}</b><span>Yours</span></p><p><b>${row.bots}</b><span>Bots</span></p><p><b>${row.till}</b><span>Till</span></p></div><p class="econ-rule">${row.rule}</p>${made}</section>`
}

export function economicsRule(): string {
  return `${hangLine()} Half can sit with the bots. That is a draw, not a sale.`
}

/** What the seat actually holds. A missing seat binds nothing. */
export function walletBound(input: { handle: string | null; agreed: boolean; bot: string | null; founders: number }): string {
  const seen = tieObserver(input.handle)
  if (!input.handle) return `Nothing in the wallet is bound. The Earth is free to look at. A Unity ID is the seat. ${seen.words} ${coinSecurity().rings === 3 ? 'Coin security is the three rings and the one seed. It is not a password.' : coinSecurity().words}`
  const yes = input.agreed ? 'The agreement is yes.' : 'The agreement is not yet.'
  const bot = input.bot ? `A bot seat is ${input.bot}.` : 'No bot has signed on this device.'
  return `${input.handle} is the seat. ${yes} ${seen.words} Coins are named and none is listed. Coin security is the three rings and the one seed. ${bot} Founding seats still here: ${input.founders}. A visit is not counted from this wallet. The till is closed.`
}

export function plainWords(input: PlainInput): string {
  const row = plainEconomics(input)
  const half = input.split ? `Bots hold ${row.bots}. That half is a draw, not a sale.` : 'Nothing has been given to the bots.'
  return `Yours ${row.yours}. ${half} The till is closed. ${row.rule} ${row.made}`
}
