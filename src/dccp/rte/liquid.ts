/** A question redraws the room. The picture is only a form this build can actually draw.
 * A number that was not supplied is not written on the board.
 */

export type LiquidForm = 'rink' | 'molecule' | 'tube'

export interface LiquidDraw {
  title: string
  lines: string[]
  speech: string
  form: LiquidForm
  shape?: 'water' | 'co2'
  from: { kind: 'universal'; key: 'universal' }
}

const GAME = /\b(how did i|how'?d i|my performance|my stats|last week)\b[\s\S]{0,40}\b(game|play|perform|stats|hockey|score)\b|\b(game|hockey|stats)\b[\s\S]{0,40}\b(last week|how did i|my performance)\b/

export function liquidAsk(utterance: string): LiquidDraw | null {
  const t = utterance.trim().toLowerCase()
  if (!t) return null
  if (GAME.test(t) || (/\b(show|see|look at|draw)\b/.test(t) && /\b(my game|the game last|my stats)\b/.test(t))) return rink(t)
  if (/\bmolecule|molecular|ball and stick|\bh2o\b|carbon dioxide|\bco2\b/.test(t)) return molecule(t)
  if (/\bhyperloop\b|\bvactrain\b|\bfly (?:through|around|in) (?:a |the )?(?:tube|tunnel|loop)\b/.test(t)) return tube()
  return null
}

export function liquidHole(): string {
  return 'Liquid is a hole you do not know. That is the answer, and it has no answer inside it. A form this build can draw is not that hole. A number that was not supplied is not written. The till is closed. Both halves name this.'
}

function rink(t: string): LiquidDraw {
  const power = /power ?play/.test(t)
  const kill = /penalty kill/.test(t)
  const slots = power
    ? ['Power play time', 'Entries', 'Chances', 'Shots', 'Goals for', 'Zone time']
    : kill
      ? ['Kill time', 'Clears', 'Entries against', 'Shots against', 'Goals against', 'Faceoffs']
      : ['Ice time', 'Shots', 'Faceoffs', 'Passes', 'Hits', 'Plus minus']
  return {
    title: 'Hole',
    form: 'rink',
    from: { kind: 'universal', key: 'universal' },
    lines: slots.map(slot => `${slot}: hole`),
    speech: 'The sandbox stays Universal. No game is bound to this ID. The hole is the answer. There is no number inside it. I did not invent one, and I did not use a name.',
  }
}

function molecule(t: string): LiquidDraw {
  const co2 = /carbon dioxide|\bco2\b/.test(t)
  return {
    title: co2 ? 'Carbon dioxide' : 'Water',
    form: 'molecule',
    shape: co2 ? 'co2' : 'water',
    from: { kind: 'universal', key: 'universal' },
    lines: co2
      ? ['Carbon dioxide. A model.', 'Linear. O C O.', 'Not a scan of a sample.']
      : ['Water. H2O. A model.', 'Bond angle about 104.5 degrees.', 'Taught geometry, not a sample.'],
    speech: co2
      ? 'The sandbox stays Universal. What it shows is carbon dioxide as a straight O C O model, because that is a shape it can build. It is not a scan of a sample.'
      : 'The sandbox stays Universal. What it shows is water, oxygen and two hydrogens, about 104.5 degrees. That is taught geometry, not a scan of a sample.',
  }
}

function tube(): LiquidDraw {
  return {
    title: 'Tube',
    form: 'tube',
    from: { kind: 'universal', key: 'universal' },
    lines: ['A tube. The pod moves in the model.', 'No line reported a speed.', 'No passenger is aboard.'],
    speech: 'The sandbox stays Universal. What it shows is a tube and a pod, because you asked what that flight looks like. No hyperloop reported a speed, a pressure, or a passenger. The pod moves in the model only.',
  }
}
