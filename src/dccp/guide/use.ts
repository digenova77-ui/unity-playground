/** The book of the shell. One line for every face. */

import { CONTROL_FACES } from '../ui/geodesic.ts'

const HOW: Record<string, string> = {
  mic: 'A switch. Say senses off and it stops.',
  sound: 'Stays off until you turn it on.',
  haptics: 'Stays off until you turn it on.',
  reducedMotion: 'Stillness. The shell stops moving.',
  transcript: 'Speak is the path. Typing still works.',
  atlas: 'The index of places held on this page.',
  profile: 'People, draft rooms, the ledger, a youth seat, and a toddler gift. White can be quoted. Dark stays sealed. A private key is refused.',
  wallet: 'Test units. Not a dollar. The till is closed.',
  home: 'The wide Earth.',
  here: 'This phone\'s location, if you share it.',
  system: 'Tap a planet to warp. The Galactic index is the Messier landings. −1 year, −1 day, Now, and +1 day move the sky. Space cuts the jump.',
  resources: 'A public reading next to a need. Nothing is bought.',
  watch: 'Close approaches. A reading, not a launch.',
  nutrition: 'A calorie count on this device.',
  face: 'A camera pan, only if you grant it. Nothing is recognized if the browser cannot see a face.',
  guide: 'This book.',
  chain: 'The known chain, as a map.',
  story: 'The same chambers, as words.',
  fusion: 'The boundary that can ask the origin.',
  cards: 'The Giza cards. One stone at the top. The rest is not invented.',
}

export const GUIDE = CONTROL_FACES.map(face => ({
  do: face.label,
  how: HOW[face.id] ?? 'This face has no line yet.',
}))

export function guideWords(): string {
  const missing = CONTROL_FACES.filter(face => !HOW[face.id])
  const hole = missing.length ? ` ${missing.length} faces have no line.` : ''
  return `Twenty faces. Turn the shell. Press the name in front. The book is on /guide. ${GUIDE.map(row => `${row.do}: ${row.how}`).join(' ')} A child can look. A grown-up says yes. The page does not load everything.${hole} The launch poll is not 100. The till stays closed.`
}
