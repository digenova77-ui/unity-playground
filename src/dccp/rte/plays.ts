/** Named systems of play. A spot is a role on the rink, not a person.
 * A situation is not chosen from a sheet that does not name one.
 */

export interface Spot {
  role: string
  x: number
  z: number
}

export interface Play {
  id: string
  name: string
  when: string
  spots: readonly Spot[]
}

export const PLAYS: readonly Play[] = [
  { id: '122', name: '1-2-2 forecheck', when: 'One high, two through the middle, two back.', spots: [{ role: 'F1', x: 3.2, z: 1.1 }, { role: 'F2', x: 2.1, z: -0.5 }, { role: 'F3', x: 1.2, z: 0.7 }, { role: 'D1', x: -0.4, z: 1 }, { role: 'D2', x: -0.4, z: -1 }] },
  { id: '212', name: '2-1-2 forecheck', when: 'Two high, one in the middle, two back.', spots: [{ role: 'F1', x: 3.3, z: 1.1 }, { role: 'F2', x: 3.3, z: -1.1 }, { role: 'F3', x: 1.5, z: 0 }, { role: 'D1', x: -0.3, z: 1 }, { role: 'D2', x: -0.3, z: -1 }] },
  { id: 'trap', name: 'Neutral zone trap', when: 'One up, two at the line, two deeper.', spots: [{ role: 'F1', x: 1, z: 0 }, { role: 'F2', x: -0.2, z: 1.2 }, { role: 'F3', x: -0.2, z: -1.2 }, { role: 'D1', x: -2.2, z: 0.9 }, { role: 'D2', x: -2.2, z: -0.9 }] },
  { id: 'umbrella', name: 'Umbrella', when: 'One in front, two on the walls, one in the slot, one at the point.', spots: [{ role: 'NET', x: 3.5, z: 0 }, { role: 'WL', x: 2.2, z: 1.45 }, { role: 'WR', x: 2.2, z: -1.45 }, { role: 'SLOT', x: 2.5, z: 0.15 }, { role: 'PT', x: 0.7, z: 0 }] },
  { id: 'overload', name: 'Overload', when: 'Four on one side, one high.', spots: [{ role: 'NET', x: 3.4, z: 0.8 }, { role: 'LOW', x: 3.1, z: 1.5 }, { role: 'WALL', x: 2.3, z: 1.5 }, { role: 'SLOT', x: 2, z: 0.35 }, { role: 'PT', x: 0.8, z: 1.15 }] },
  { id: 'box', name: 'Penalty kill box', when: 'Four in a box. No fifth is drawn.', spots: [{ role: 'LR', x: 2.7, z: 0.85 }, { role: 'LL', x: 2.7, z: -0.85 }, { role: 'HR', x: 1.2, z: 0.85 }, { role: 'HL', x: 1.2, z: -0.85 }] },
  { id: 'diamond', name: 'Penalty kill diamond', when: 'One high, two wide, one in front.', spots: [{ role: 'PT', x: 0.9, z: 0 }, { role: 'L', x: 2, z: -1.15 }, { role: 'R', x: 2, z: 1.15 }, { role: 'NET', x: 3.3, z: 0 }] },
  { id: 'breakout', name: 'Breakout', when: 'One behind the net, one on the weak side, three ahead.', spots: [{ role: 'D1', x: -3.5, z: 0 }, { role: 'D2', x: -2.3, z: -1.15 }, { role: 'C', x: -2.5, z: 0.55 }, { role: 'W', x: -1.1, z: 1.35 }, { role: 'S', x: 0.7, z: -1.15 }] },
]

const ASK: { id: string; test: RegExp }[] = [
  { id: '122', test: /\b1[- ]2[- ]2\b|\bone two two\b/ },
  { id: '212', test: /\b2[- ]1[- ]2\b|\btwo one two\b/ },
  { id: 'trap', test: /\bneutral zone\b|\btrap\b/ },
  { id: 'umbrella', test: /\bumbrella\b|\b1[- ]3[- ]1\b/ },
  { id: 'overload', test: /\boverload\b/ },
  { id: 'box', test: /\bkill box\b|\bpk box\b|\bbox kill\b/ },
  { id: 'diamond', test: /\bdiamond\b/ },
  { id: 'breakout', test: /\bbreakout\b/ },
]

export function playById(id: string): Play | null {
  return PLAYS.find(play => play.id === id) ?? null
}

export function playAsk(text: string): Play | { choice: string } | null {
  const t = text.toLowerCase()
  const hits = ASK.filter(row => row.test.test(t)).map(row => playById(row.id)).filter((play): play is Play => !!play)
  if (hits.length === 1) return hits[0]
  if (hits.length > 1) return { choice: hits.map(play => play.name).join(' or ') }
  if (/\bforecheck\b/.test(t)) return { choice: '1-2-2 forecheck or 2-1-2 forecheck' }
  if (/\bpenalty kill\b/.test(t) && /\b(draw|schematic|system)\b/.test(t)) return { choice: 'Penalty kill box or Penalty kill diamond' }
  if (/\b(schematic|schematics|system of play|systems of play)\b/.test(t)) return { choice: PLAYS.map(play => play.name).join(', ') }
  return null
}

/** A sheet that does not name a situation does not choose a play. */
export function modeledPlay(named: string | null): Play | null {
  if (!named) return null
  return playById(named)
}
