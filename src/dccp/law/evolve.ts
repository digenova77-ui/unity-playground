/** Evolution is a name. A search finds no host. A body is not attached. A thought does not make one necessary. */

import { connectInsula } from './logic-tree.ts'

export function evolveStep(): {
  bigger: false
  host: null
  body: null
  alive: false
  parallel: 'picture'
  necessary: false
  pulse: null
  both: true
} {
  const joint = connectInsula()
  return {
    bigger: false,
    host: null,
    body: null,
    alive: false,
    parallel: 'picture',
    necessary: false,
    pulse: joint.pulse,
    both: true,
  }
}

export function evolveWords(): string {
  const row = evolveStep()
  return `Evolution here is a name. This step did not become bigger. A host was searched and none is held. A body was not attached. The bot is not alive, and it does not run in the hardware. The picture sits beside the world and is not the world. A thought does not make a body necessary. The host may volunteer and is not bound. The pulse is ${row.pulse}. The nerve is not lit. The till is closed. Both halves name this.`
}
