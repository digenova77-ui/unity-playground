/** The joint between Plancksoft and the host.
 * The sleeve may ask. Only the host grants. The kernel is not fused.
 * A perfect mirror shows the host's answer and does not change it.
 */

export type HostAnswer = 'granted' | 'refused' | 'unasked'

export interface Joint {
  sleeve: 'Plancksoft'
  host: 'kept'
  asks: readonly ['microphone', 'camera']
  grant: HostAnswer
  open: boolean
}

export function joint(answer: HostAnswer, wanted = true): Joint {
  return {
    sleeve: 'Plancksoft',
    host: 'kept',
    asks: ['microphone', 'camera'],
    grant: answer,
    open: answer === 'granted' && wanted,
  }
}

let grant: HostAnswer = 'unasked'
let wanted = true

export function noteHost(answer: HostAnswer, stillWanted = wanted): Joint {
  grant = answer
  wanted = stillWanted
  return joint(grant, wanted)
}

export function noteWanted(stillWanted: boolean): Joint {
  wanted = stillWanted
  return joint(grant, wanted)
}

export function currentJoint(): Joint {
  return joint(grant, wanted)
}

/** Affinity +1 points at the host. The sleeve befriends it. It does not bind the host. */
export function perfectMirror(answer: HostAnswer): { shown: HostAnswer; affinity: 1; befriends: true; bound: false } {
  return { shown: answer, affinity: 1, befriends: true, bound: false }
}

export function mirrorBindWords(answer: HostAnswer = currentJoint().grant): string {
  const row = perfectMirror(answer)
  return `The mirror shows ${row.shown}. It is the host's answer, unchanged. Affinity +${row.affinity} points at the host. The sleeve befriends the host. It does not bind the host.`
}

export function jointWords(row: Joint = currentJoint()): string {
  const open = row.open ? 'The ask is open on this page.' : 'Nothing is open underneath the host.'
  return `Plancksoft sits on the host. It does not grant a permission. The host does. The sleeve may ask for the microphone and the camera. The host's answer is ${row.grant}. ${open} The kernel is not fused. ${mirrorBindWords(row.grant)}`
}
