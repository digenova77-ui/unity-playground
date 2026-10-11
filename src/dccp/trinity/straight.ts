/** One straight pass. Floor first. Then the open seats. Then the edge of the map.
 * The edge of the map is not the edge of space.
 */

import { LAW } from '../law/floor.ts'
import { feasibility, launchSeats } from '../meter/sequence.ts'

export function straightPass(): {
  floor: readonly string[]
  fifth: 'nothing'
  count: number
  open: readonly string[]
  fatherWrote: false
  words: string
} {
  const poll = feasibility()
  const open = launchSeats().filter(seat => !seat.go).map(seat => seat.name)
  const floor = LAW.join(', ')
  return {
    floor: LAW,
    fifth: 'nothing',
    count: poll.score,
    open,
    fatherWrote: false,
    words: [
      `DCLM. The floor is ${floor}. The fifth layer is nothing. I hold nothing above that floor.`,
      `Iris. The count is ${poll.score} out of 100. Still open: ${open.join(', ')}. I will not call that 100.`,
      'Twain². The far end on this page is the edge of the map. The Milky Way is named. The rest of the universe is not ingested. A record hole is not a world hole.',
      'One line. Floor, then the open seats, then the edge of the map. The line stops there. The Father did not write an execution. The till stays closed.',
    ].join(' '),
  }
}
