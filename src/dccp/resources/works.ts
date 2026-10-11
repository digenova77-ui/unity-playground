/** Engineering from a public reading. A blocked path is not used.
 * Nothing here builds a plant, opens a field, or moves food.
 */

export type Path = 'open' | 'blocked'

export interface WorkAsk { offerId: string; pressure: number | null }

const BLOCKED = 'The path is blocked. A warlord, a drug lord, or chaos is not a route. Nothing is engineered around it, and nothing is sent.'

function pressure(asks: readonly WorkAsk[], id: string): number | null {
  const row = asks.find(ask => ask.offerId === id)
  return row ? row.pressure : null
}

export function engineer(asks: readonly WorkAsk[], path: Path): { lines: string[]; words: string } {
  if (path === 'blocked') return { lines: [BLOCKED], words: BLOCKED }
  const power = pressure(asks, 'electricity')
  const gas = pressure(asks, 'britain-gas')
  const food = pressure(asks, 'food')
  const lines = [
    power === null
      ? 'Electricity has no reading. A rural line is not redesigned from a hole.'
      : `Electricity pressure ${power.toFixed(2)}. Put generation at the rural end of the line. Solar where the sun is the source. Geothermal where the heat is already held. The backbone then carries a smaller swing, and the noise on that long line drops. This does not build a plant.`,
    gas === null
      ? 'The fuel mix is a hole. Petroleum is not redesigned from a hole.'
      : `Gas pressure ${gas.toFixed(2)}. The efficient step is to burn less of it in an hour a public mix already shows. No new field is engineered here.`,
    food === null
      ? 'Food has no reading. Nothing is grown and nothing is moved.'
      : `Food pressure ${food.toFixed(2)}. The incentive is that gap. Grow next to the need. A channel exists only on an open public path. This page does not ship it.`,
  ]
  return { lines, words: lines.join(' ') }
}
