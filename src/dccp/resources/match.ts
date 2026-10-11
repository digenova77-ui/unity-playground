/** A resource offer sat next to a need. The Fetch idea, without their network.
 * An offer and an ask can be neighbours. Neighbours are not a shipment.
 * settles is always false. Nothing here is escrowed.
 */

import { engineer } from './works.ts'

export type Claim = 'LIVE' | 'PUBLISHED' | 'HOLE'

export interface Offer {
  id: string
  agent: string
  resource: string
  place: string
  value: number | null
  unit: string
  at: string
  source: string
  href: string
  claim: Claim
  /** 0 is met, 1 is the whole gap. Null when the reading did not arrive. */
  pressure: number | null
  gauge: string
}

export interface Proposal {
  need: string
  offerId: string
  pressure: number | null
  words: string
  settles: false
}

export interface Snapshot {
  offers: Offer[]
  proposals: Proposal[]
  readAt: string
}

const INDEX_PRESSURE: Record<string, number> = {
  'very low': 0.1,
  low: 0.3,
  moderate: 0.5,
  high: 0.75,
  'very high': 0.95,
}

const clamp = (n: number): number => Math.min(1, Math.max(0, n))
const round = (n: number): string => (Math.round(n * 10) / 10).toFixed(1)

export interface BankRow { value: number; year: string }
export interface MixRow { gas: number; wind: number; from: string }
export interface CarbonRow { intensity: number; index: string; from: string }
export interface DenmarkRow { co2: number; at: string; windMw: number }

export function worldBankRow(json: unknown): BankRow | null {
  const page = Array.isArray(json) ? json[1] : null
  const row = Array.isArray(page) ? page[0] as { value?: unknown; date?: unknown } : null
  if (!row || row.value === null || row.value === undefined || row.value === '') return null
  const value = typeof row.value === 'number' ? row.value : Number(row.value)
  if (!Number.isFinite(value)) return null
  return { value, year: String(row?.date ?? '') }
}

export function britainMix(json: unknown): MixRow | null {
  const data = (json as { data?: { from?: unknown; generationmix?: { fuel?: unknown; perc?: unknown }[] } })?.data
  const mix = data?.generationmix
  if (!Array.isArray(mix)) return null
  const perc = (fuel: string): number => {
    const row = mix.find(item => item?.fuel === fuel)
    const n = typeof row?.perc === 'number' ? row.perc : Number(row?.perc)
    return Number.isFinite(n) ? n : NaN
  }
  const gas = perc('gas')
  const wind = perc('wind')
  if (!Number.isFinite(gas) || !Number.isFinite(wind)) return null
  return { gas, wind, from: String(data?.from ?? '') }
}

export function denmarkNow(json: unknown): DenmarkRow | null {
  const row = (json as { records?: Record<string, unknown>[] })?.records?.[0]
  if (!row) return null
  const co2 = Number(row.CO2Emission)
  const sea = Number(row.OffshoreWindPower)
  const land = Number(row.OnshoreWindPower)
  if (!Number.isFinite(co2)) return null
  const windMw = (Number.isFinite(sea) ? sea : 0) + (Number.isFinite(land) ? land : 0)
  return { co2, at: String(row.Minutes1UTC ?? ''), windMw }
}

export function carbonRow(json: unknown): CarbonRow | null {
  const row = (json as { data?: { from?: unknown; intensity?: { actual?: unknown; forecast?: unknown; index?: unknown } }[] })?.data?.[0]
  const intensity = Number(row?.intensity?.actual ?? row?.intensity?.forecast)
  if (!Number.isFinite(intensity)) return null
  return { intensity, index: String(row?.intensity?.index ?? ''), from: String(row?.from ?? '') }
}

export interface SnapshotInput {
  electricity: BankRow | null
  water: BankRow | null
  food: BankRow | null
  britain: MixRow | null
  carbon: CarbonRow | null
  denmark: DenmarkRow | null
  readAt?: string
}

function hole(id: string, agent: string, resource: string, place: string, source: string, href: string): Offer {
  return {
    id, agent, resource, place, value: null, unit: '', at: '', source, href, claim: 'HOLE', pressure: null,
    gauge: 'No reading. The need stays. No number is filled in.',
  }
}

export function buildSnapshot(input: SnapshotInput): Snapshot {
  const electricity = input.electricity
    ? {
        id: 'electricity',
        agent: 'offer.electricity',
        resource: 'Access to electricity',
        place: 'World',
        value: input.electricity.value,
        unit: '% of people',
        at: input.electricity.year,
        source: 'World Bank, EG.ELC.ACCS.ZS',
        href: 'https://api.worldbank.org/v2/country/WLD/indicator/EG.ELC.ACCS.ZS?format=json&mrv=1',
        claim: 'PUBLISHED' as const,
        pressure: clamp((100 - input.electricity.value) / 100),
        gauge: 'Short of 100%. That ceiling is the indicator, not a promise to connect a house.',
      }
    : hole('electricity', 'offer.electricity', 'Access to electricity', 'World', 'World Bank, EG.ELC.ACCS.ZS', 'https://api.worldbank.org/v2/country/WLD/indicator/EG.ELC.ACCS.ZS?format=json&mrv=1')

  const water = input.water
    ? {
        id: 'water',
        agent: 'offer.water',
        resource: 'Safely managed drinking water',
        place: 'World',
        value: input.water.value,
        unit: '% of people',
        at: input.water.year,
        source: 'World Bank, SH.H2O.SMDW.ZS',
        href: 'https://api.worldbank.org/v2/country/WLD/indicator/SH.H2O.SMDW.ZS?format=json&mrv=1',
        claim: 'PUBLISHED' as const,
        pressure: clamp((100 - input.water.value) / 100),
        gauge: 'Short of 100%. The rest is the gap. Water is not moved.',
      }
    : hole('water', 'offer.water', 'Safely managed drinking water', 'World', 'World Bank, SH.H2O.SMDW.ZS', 'https://api.worldbank.org/v2/country/WLD/indicator/SH.H2O.SMDW.ZS?format=json&mrv=1')

  const food = input.food
    ? {
        id: 'food',
        agent: 'offer.food',
        resource: 'Undernourishment',
        place: 'World',
        value: input.food.value,
        unit: '% of people',
        at: input.food.year,
        source: 'World Bank, SN.ITK.DEFC.ZS',
        href: 'https://api.worldbank.org/v2/country/WLD/indicator/SN.ITK.DEFC.ZS?format=json&mrv=1',
        claim: 'PUBLISHED' as const,
        pressure: clamp(input.food.value / 100),
        gauge: 'Share of people undernourished. 0 would be none. This does not send food.',
      }
    : {
        ...hole('food', 'offer.food', 'Undernourishment', 'World', 'World Bank, SN.ITK.DEFC.ZS', 'https://api.worldbank.org/v2/country/WLD/indicator/SN.ITK.DEFC.ZS?format=json&mrv=1'),
        gauge: 'That indicator is not answering from here, so it is not requested. The need stays. No share is invented.',
      }

  const britain = input.britain
    ? {
        id: 'britain-gas',
        agent: 'offer.britain-gas',
        resource: 'Gas share of electricity',
        place: 'Britain',
        value: input.britain.gas,
        unit: '% this half-hour',
        at: input.britain.from,
        source: 'National Energy System Operator, generation mix',
        href: 'https://api.carbonintensity.org.uk/generation',
        claim: 'LIVE' as const,
        pressure: clamp(input.britain.gas / 100),
        gauge: `Wind is ${round(input.britain.wind)}% in the same half-hour. The gauge is the gas share. 1 would be all gas.`,
      }
    : hole('britain-gas', 'offer.britain-gas', 'Gas share of electricity', 'Britain', 'National Energy System Operator, generation mix', 'https://api.carbonintensity.org.uk/generation')

  const index = (input.carbon?.index ?? '').toLowerCase()
  const indexed = INDEX_PRESSURE[index]
  const carbon = input.carbon && Number.isFinite(input.carbon.intensity)
    ? {
        id: 'britain-carbon',
        agent: 'offer.britain-carbon',
        resource: 'Grid carbon intensity',
        place: 'Britain',
        value: input.carbon.intensity,
        unit: 'gCO₂/kWh',
        at: input.carbon.from,
        source: 'National Energy System Operator, Carbon Intensity API',
        href: 'https://api.carbonintensity.org.uk/intensity',
        claim: 'LIVE' as const,
        pressure: indexed ?? null,
        gauge: indexed === undefined
          ? 'The grams arrived. Their index word did not, so this row is not scored.'
          : `Their index is "${input.carbon.index}". The height is ours, so this hour can sit next to the others.`,
      }
    : hole('britain-carbon', 'offer.britain-carbon', 'Grid carbon intensity', 'Britain', 'National Energy System Operator, Carbon Intensity API', 'https://api.carbonintensity.org.uk/intensity')

  const denmark = input.denmark
    ? {
        id: 'denmark-co2',
        agent: 'offer.denmark',
        resource: 'Electricity CO₂',
        place: 'Denmark',
        value: input.denmark.co2,
        unit: 'g/kWh',
        at: input.denmark.at,
        source: 'Energinet, via Energi Data Service',
        href: 'https://www.energidataservice.dk/tso-electricity/PowerSystemRightNow',
        claim: 'LIVE' as const,
        pressure: clamp(input.denmark.co2 / 100),
        gauge: `Wind on their system is ${round(input.denmark.windMw)} MW. The gauge tops at 100 g/kWh. That top is ours, not theirs.`,
      }
    : hole('denmark-co2', 'offer.denmark', 'Electricity CO₂', 'Denmark', 'Energinet, via Energi Data Service', 'https://www.energidataservice.dk/tso-electricity/PowerSystemRightNow')

  const offers = [electricity, water, food, britain, carbon, denmark]
  const asks: { need: string; offerId: string; met: string }[] = [
    { need: 'A person can turn a light on', offerId: 'electricity', met: 'access reaches everyone in the figure' },
    { need: 'A person has safely managed drinking water', offerId: 'water', met: 'safe water reaches everyone in the figure' },
    { need: 'A person is not undernourished', offerId: 'food', met: 'the undernourished share is none' },
    { need: 'This half-hour in Britain is not a gas hour', offerId: 'britain-gas', met: 'gas is none of the mix' },
    { need: 'This half-hour in Britain is a lower-carbon hour', offerId: 'britain-carbon', met: 'their index is very low' },
    { need: 'This minute in Denmark is under the comparison line', offerId: 'denmark-co2', met: 'the grams sit at the bottom of our 100 g gauge' },
  ]
  const proposals: Proposal[] = asks.map(ask => {
    const offer = offers.find(row => row.id === ask.offerId)!
    const shown = offer.value === null ? 'no reading' : `${round(offer.value)} ${offer.unit}`
    const words = offer.pressure === null
      ? `${offer.place}: ${offer.resource}. ${offer.gauge} ${ask.need} stays asked. Nothing is sent.`
      : `${offer.place}, ${offer.at || 'undated'}: ${shown}. ${offer.gauge} Pressure ${offer.pressure.toFixed(2)}, where 0 means ${ask.met}. Not a delivery.`
    return { need: ask.need, offerId: offer.id, pressure: offer.pressure, words, settles: false as const }
  })
  return { offers, proposals, readAt: input.readAt ?? new Date().toISOString() }
}

let held: Snapshot | null = readSnapshot()

function readSnapshot(): Snapshot | null {
  try {
    const raw = localStorage.getItem('dccpworld.snapshot.v1')
    if (!raw) return null
    const parsed = JSON.parse(raw) as Snapshot
    if (!parsed || !Array.isArray(parsed.offers) || !Array.isArray(parsed.proposals) || typeof parsed.readAt !== 'string') return null
    return parsed
  } catch {
    return null
  }
}

export function holdSnapshot(snapshot: Snapshot): void {
  held = snapshot
  try { localStorage.setItem('dccpworld.snapshot.v1', JSON.stringify(snapshot)) } catch { /* private mode */ }
}

export function heldSnapshot(): Snapshot | null {
  return held
}

export function resourceWords(): string {
  if (!held) return 'The resource snapshot has not been read yet. Nothing is invented in its place. An offer will sit next to an ask. That is the whole match. Nothing is shipped.'
  const people = held.proposals.filter(row => row.offerId === 'water' || row.offerId === 'electricity' || row.offerId === 'food')
  const top = [...people].filter(row => row.pressure !== null).sort((a, b) => (b.pressure ?? 0) - (a.pressure ?? 0))[0]
  const holes = held.proposals.filter(row => row.pressure === null).length
  const lead = top
    ? `The widest gap on this reading is "${top.need}". ${top.words}`
    : 'Every ask is missing its reading, so nothing is scored.'
  const rest = holes ? ` ${holes === 1 ? 'One ask has' : `${holes} asks have`} no reading, and ${holes === 1 ? 'it stays' : 'they stay'} open.` : ''
  return `${lead}${rest} Fetch's agents publish an offer and an ask and sit them together. Their network can also escrow a trade. This one does not. The till stays closed.`
}

function esc(s: string): string {
  return s.replace(/[&<>"]/g, c => (c === '&' ? '\u0026amp;' : c === '<' ? '\u0026lt;' : c === '>' ? '\u0026gt;' : '\u0026quot;'))
}

export function renderSnapshot(snapshot: Snapshot): string {
  const work = engineer(snapshot.proposals, 'open')
  const works = work.lines.map(line => `<article class="res-row"><p>${esc(line)}</p></article>`).join('')
  const offers = snapshot.offers.map(offer => {
    const value = offer.value === null ? 'No reading' : `${round(offer.value)} ${esc(offer.unit)}`
    return `<article class="res-row"><p class="res-kicker">${esc(offer.agent)} · ${esc(offer.claim)}</p><h3>${esc(offer.resource)}</h3><p>${esc(offer.place)} · ${value}${offer.at ? ` · ${esc(offer.at)}` : ''}</p><p><a href="${esc(offer.href)}" target="_blank" rel="noopener noreferrer">${esc(offer.source)}</a></p></article>`
  }).join('')
  const proposals = snapshot.proposals.map(row => {
    const width = row.pressure === null ? 0 : Math.round(row.pressure * 100)
    const mark = row.pressure === null ? 'unscored' : row.pressure.toFixed(2)
    return `<article class="res-row"><p class="res-kicker">ask · pressure ${mark}</p><h3>${esc(row.need)}</h3><div class="res-bar" aria-hidden="true"><span style="width:${width}%"></span></div><p>${esc(row.words)}</p></article>`
  }).join('')
  return `<p class="res-kicker">Read ${esc(snapshot.readAt)}</p><h3>What we can see</h3>${offers}<h3>Sat next to a need</h3>${proposals}<h3>The work</h3>${works}`
}
