/** The finances this page already holds, laid on one gate.
 * A joint correlates only when both sides are held. An empty side is a hole.
 * Nothing here is a world price. The till stays closed.
 */

export interface Joint {
  name: string
  holds: string
  hole: string | null
}

export const JOINTS: readonly Joint[] = [
  { name: 'Unity', holds: 'The identity. The only inlet.', hole: null },
  { name: 'Decision', holds: 'One decision spends 1 test unit.', hole: 'The unit is not a dollar.' },
  { name: 'eFuse', holds: 'Half of the ten percent fee. A cap.', hole: 'It does not move, so the circuit stays open.' },
  { name: 'Merit', holds: 'Invert or hole. The trickle is face times ln(1+n) over shifts.', hole: 'That is not utility of wealth.' },
  { name: 'Title', holds: 'The father record keeps 1 through a 50/50 draw.', hole: 'The draw is not a sale.' },
  { name: 'Book', holds: 'A log market score can be computed.', hole: 'The live book is closed.' },
  { name: 'Bet', holds: 'Kelly can be computed from a probability and a price.', hole: 'No bankroll is held, so the index is empty.' },
  { name: 'Basket', holds: 'Laspeyres, Paasche, and Fisher can be computed from quotes.', hole: 'No two periods are held, so our index is empty.' },
  { name: 'Cut', holds: 'A fiat exit was named.', hole: 'Fiat, the bridge, and the singularity are empty.' },
  { name: 'Kin', holds: 'A child mark seals on the grown-up Unity ID.', hole: 'Nothing below the father is loaded, and parenthood is not checked.' },
  { name: 'Youth', holds: 'The mark is dark. A payment does not open it.', hole: 'No lawful release is built.' },
]

export function correlates(left: string, right: string): { touch: boolean; hole: string | null } {
  const a = JOINTS.find(row => row.name === left)
  const b = JOINTS.find(row => row.name === right)
  if (!a || !b || a.name === b.name) return { touch: false, hole: 'That pair is not on the map.' }
  if (a.name !== 'Unity' && b.name !== 'Unity') return { touch: false, hole: 'They do not meet at Unity.' }
  const other = a.name === 'Unity' ? b : a
  return { touch: true, hole: other.hole }
}

export function overlayWords(): string {
  const open = JOINTS.filter(row => row.hole === null).map(row => row.name)
  const shut = JOINTS.filter(row => row.hole !== null)
  const lines = shut.map(row => `${row.name} touches Unity. ${row.holds} ${row.hole}`)
  return [
    `The only joint with no hole is ${open.join(', ') || 'none'}. Everything else waits on it or stays empty.`,
    'A correlation is two held sides. Unity is the inlet. A hole on either side means they do not correlate.',
    ...lines,
    'Log utility of wealth was not overlaid. The Merit trickle only shares the shape ln(1+n). No world price was summed. The till is closed.',
  ].join(' ')
}
