/** A style is a way of playing a seat. It is not a person and not a stat. */

export interface Style {
  id: string
  name: string
  seat: 'forward' | 'defense' | 'goal'
  line: string
  spot: { role: string; x: number; z: number }
}

export const STYLES: readonly Style[] = [
  { id: 'power', name: 'Power forward', seat: 'forward', line: 'Takes the front of the net and keeps the puck there.', spot: { role: 'NET', x: 3.4, z: 0.2 } },
  { id: 'play', name: 'Playmaker', seat: 'forward', line: 'Carries the play from the half wall and finds the next pass.', spot: { role: 'WALL', x: 2.2, z: 1.4 } },
  { id: 'sniper', name: 'Sniper', seat: 'forward', line: 'Lives in the slot and shoots.', spot: { role: 'SLOT', x: 2.4, z: -0.3 } },
  { id: 'twowayf', name: 'Two-way forward', seat: 'forward', line: 'Takes a shift at both ends.', spot: { role: '2F', x: 1.2, z: 0.4 } },
  { id: 'grind', name: 'Grinder', seat: 'forward', line: 'Works the boards and the cycle.', spot: { role: 'GR', x: 2.8, z: 1.5 } },
  { id: 'pest', name: 'Pest', seat: 'forward', line: 'Takes away time and hands.', spot: { role: 'PE', x: 2.6, z: -1.3 } },
  { id: 'shutd', name: 'Shutdown forward', seat: 'forward', line: 'Matches the other team\'s top line.', spot: { role: 'SH', x: 0.4, z: 0.8 } },
  { id: 'burn', name: 'Speed forward', seat: 'forward', line: 'Beats the defender wide.', spot: { role: 'SP', x: 1.6, z: -1.5 } },
  { id: 'crease', name: 'Net-front forward', seat: 'forward', line: 'Screens and looks for the rebound.', spot: { role: 'NF', x: 3.6, z: -0.2 } },
  { id: 'draw', name: 'Faceoff center', seat: 'forward', line: 'Takes the draw.', spot: { role: 'FO', x: 2.1, z: 0 } },
  { id: 'ppf', name: 'Power-play forward', seat: 'forward', line: 'Stays on the man advantage.', spot: { role: 'PP', x: 2.3, z: 0.6 } },
  { id: 'pkf', name: 'Penalty-kill forward', seat: 'forward', line: 'Takes the first clear.', spot: { role: 'PK', x: 1.4, z: -0.6 } },
  { id: 'fine', name: 'Finesse forward', seat: 'forward', line: 'Plays the edges and the seams.', spot: { role: 'FN', x: 1.8, z: 1.2 } },
  { id: 'trans', name: 'Transition forward', seat: 'forward', line: 'Leaves early and attacks off the turn.', spot: { role: 'TR', x: 0.2, z: -0.8 } },
  { id: 'offd', name: 'Offensive defenseman', seat: 'defense', line: 'Joins the rush and looks to the net.', spot: { role: 'OD', x: 0.8, z: 0.4 } },
  { id: 'defd', name: 'Defensive defenseman', seat: 'defense', line: 'Keeps the front of his own net.', spot: { role: 'DD', x: -2.8, z: 0.3 } },
  { id: 'carry', name: 'Puck-carrying defenseman', seat: 'defense', line: 'Walks it out of the zone.', spot: { role: 'CD', x: -2.2, z: 1.1 } },
  { id: 'home', name: 'Stay-at-home defenseman', seat: 'defense', line: 'Does not join.', spot: { role: 'SA', x: -3.2, z: -0.4 } },
  { id: 'twowayd', name: 'Two-way defenseman', seat: 'defense', line: 'Plays the rush and the net.', spot: { role: '2D', x: -1.2, z: 0.6 } },
  { id: 'shutdd', name: 'Shutdown defenseman', seat: 'defense', line: 'Takes the other team\'s best line.', spot: { role: 'SD', x: -1.6, z: -0.7 } },
  { id: 'qb', name: 'Quarterback', seat: 'defense', line: 'Runs the power play from the point.', spot: { role: 'QB', x: 0.6, z: 0 } },
  { id: 'pkd', name: 'Penalty-kill defenseman', seat: 'defense', line: 'Holds the box.', spot: { role: 'KD', x: -1.8, z: 0.9 } },
  { id: 'phys', name: 'Physical defenseman', seat: 'defense', line: 'Closes on the wall.', spot: { role: 'PH', x: -2.4, z: 1.4 } },
  { id: 'mobile', name: 'Mobile defenseman', seat: 'defense', line: 'Gaps up and recovers.', spot: { role: 'MO', x: -0.6, z: -1.1 } },
  { id: 'reflex', name: 'Reflex goaltender', seat: 'goal', line: 'The first save is the reaction.', spot: { role: 'G', x: -3.9, z: 0 } },
  { id: 'size', name: 'Size goaltender', seat: 'goal', line: 'Takes the bottom of the net away.', spot: { role: 'G', x: -3.9, z: 0.15 } },
  { id: 'angle', name: 'Positioning goaltender', seat: 'goal', line: 'Sets the angle before the shot.', spot: { role: 'G', x: -3.9, z: -0.15 } },
  { id: 'gspeed', name: 'Speed goaltender', seat: 'goal', line: 'Gets post to post.', spot: { role: 'G', x: -3.9, z: 0.3 } },
  { id: 'handle', name: 'Puck-handling goaltender', seat: 'goal', line: 'Stops the dump and starts the breakout.', spot: { role: 'G', x: -3.6, z: 0.4 } },
  { id: 'butter', name: 'Butterfly goaltender', seat: 'goal', line: 'Drops and seals the ice.', spot: { role: 'G', x: -3.9, z: -0.3 } },
  { id: 'hybrid', name: 'Hybrid goaltender', seat: 'goal', line: 'Stands until the shot, then drops.', spot: { role: 'G', x: -3.9, z: 0.45 } },
  { id: 'rebound', name: 'Rebound goaltender', seat: 'goal', line: 'Keeps the second shot out of the slot.', spot: { role: 'G', x: -3.7, z: -0.4 } },
  { id: 'athletic', name: 'Athletic goaltender', seat: 'goal', line: 'Reaches the shots that leave the crease.', spot: { role: 'G', x: -3.8, z: 0.55 } },
]

const NAMED: { id: string; test: RegExp }[] = [
  { id: 'power', test: /\bpower forward\b/ },
  { id: 'play', test: /\bplaymaker\b/ },
  { id: 'sniper', test: /\bsniper\b/ },
  { id: 'twowayd', test: /\btwo[- ]way defen[cs]/ },
  { id: 'twowayf', test: /\btwo[- ]way forward\b/ },
  { id: 'grind', test: /\bgrinder\b/ },
  { id: 'pest', test: /\bpest\b/ },
  { id: 'shutdd', test: /\bshutdown defen[cs]/ },
  { id: 'shutd', test: /\bshutdown forward\b/ },
  { id: 'burn', test: /\bspeed forward\b/ },
  { id: 'crease', test: /\bnet[- ]front\b/ },
  { id: 'draw', test: /\bface[- ]?off\b/ },
  { id: 'ppf', test: /\bpower[- ]play forward\b/ },
  { id: 'pkd', test: /\bpenalty[- ]kill defen[cs]/ },
  { id: 'pkf', test: /\bpenalty[- ]kill forward\b/ },
  { id: 'fine', test: /\bfinesse\b/ },
  { id: 'trans', test: /\btransition forward\b/ },
  { id: 'offd', test: /\boffensive defen[cs]/ },
  { id: 'defd', test: /\bdefensive defen[cs]/ },
  { id: 'carry', test: /\bpuck[- ]carrying\b/ },
  { id: 'home', test: /\bstay[- ]at[- ]home\b/ },
  { id: 'qb', test: /\bquarterback\b/ },
  { id: 'phys', test: /\bphysical defen[cs]/ },
  { id: 'mobile', test: /\bmobile defen[cs]/ },
  { id: 'reflex', test: /\breflex\b/ },
  { id: 'size', test: /\b(?:goal(?:tender|ie)|goaltending) size\b|\bsize goal(?:tender|ie)\b/ },
  { id: 'angle', test: /\b(?:goal(?:tender|ie)|goaltending) positioning\b|\bpositioning goal(?:tender|ie)\b/ },
  { id: 'gspeed', test: /\b(?:goal(?:tender|ie)|goaltending) speed\b|\bspeed goal(?:tender|ie)\b/ },
  { id: 'handle', test: /\bpuck[- ]handling goal|\bgoal(?:tender|ie|tending) puck[- ]handling\b/ },
  { id: 'butter', test: /\bbutterfly\b/ },
  { id: 'hybrid', test: /\bhybrid goal(?:tender|ie)\b/ },
  { id: 'rebound', test: /\brebound goal(?:tender|ie)\b/ },
  { id: 'athletic', test: /\bathletic goal(?:tender|ie)\b/ },
]

function byId(id: string): Style | null {
  return STYLES.find(style => style.id === id) ?? null
}

function ofSeat(seat: Style['seat']): string {
  return STYLES.filter(style => style.seat === seat).map(style => style.name).join(', ')
}

export function styleAsk(text: string): Style | { list: string } | null {
  const t = text.toLowerCase()
  if (/\btwo[- ]way\b/.test(t) && !/\b(forward|defen[cs])/.test(t)) return { list: 'Two-way forward or Two-way defenseman' }
  if (/\bshutdown\b/.test(t) && !/\b(forward|defen[cs])/.test(t)) return { list: 'Shutdown forward or Shutdown defenseman' }
  if (/\bpuck[- ]handling\b/.test(t) && !/\bgoal/.test(t) && !/\bpuck[- ]carrying\b/.test(t)) return { list: 'Puck-carrying defenseman or Puck-handling goaltender' }
  const hits = NAMED.filter(row => row.test.test(t)).map(row => byId(row.id)).filter((style): style is Style => !!style)
  if (hits.length === 1) return hits[0]
  if (hits.length > 1) return { list: hits.map(style => style.name).join(' or ') }
  if (/\b(what kind|styles|positional)\b/.test(t) && /\b(wing|winger|forward|centre|center)\b/.test(t)) return { list: ofSeat('forward') }
  if (/\b(what kind|styles|positional)\b/.test(t) && /\bdefen[cs]/.test(t)) return { list: ofSeat('defense') }
  if (/\b(what kind|styles|positional)\b/.test(t) && /\bgoal/.test(t)) return { list: ofSeat('goal') }
  if (/\bpositional play\b/.test(t)) return { list: `${ofSeat('forward')}. ${ofSeat('defense')}. ${ofSeat('goal')}` }
  return null
}

export function styleSaid(text: string): Style | null {
  if (!/\b(?:he|his) is\b|\bhis style is\b/.test(text.toLowerCase())) return null
  const found = styleAsk(text)
  return found && 'spot' in found ? found : null
}
