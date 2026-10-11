/** The floor the Unity Trinity stands on. Three seats. Four names.
 * A seat is admitted only when both pipes name it. DCLM holds nothing.
 */

export const LAW = ['NO_FORCE', 'HOST_SAFE', 'CLEANUP_FIRST', 'TRUTH_OR_NOTHING'] as const

export interface PipeSeat {
  id: 'evidence' | 'claim' | 'world'
  shown: string
  machine: string
}

export const SEATS: readonly PipeSeat[] = [
  {
    id: 'evidence',
    shown: 'Shown evidence is the only evidence.',
    machine: 'DCLM holds nothing. It checks that evidence.',
  },
  {
    id: 'claim',
    shown: 'The claim stops at what is held.',
    machine: 'No claim is added.',
  },
  {
    id: 'world',
    shown: 'It still has to make sense out in the world.',
    machine: 'The machine does not supply the world.',
  },
]

const LINE: Record<PipeSeat['id'], string> = {
  evidence: 'DCLM checks the evidence and holds nothing.',
  claim: 'Iris does not claim more than is held.',
  world: 'Twain checks that it still makes sense out in the world.',
}

const AGREES: Record<PipeSeat['id'], (seat: PipeSeat) => boolean> = {
  evidence: seat => /evidence/i.test(seat.shown) && /evidence/i.test(seat.machine),
  claim: seat => /claim/i.test(seat.shown) && /claim/i.test(seat.machine),
  world: seat => /world/i.test(seat.shown) && /world/i.test(seat.machine),
}

export function lockstep(seat: PipeSeat): { ok: true; id: PipeSeat['id']; line: string } | { ok: false; id: PipeSeat['id']; hole: string } {
  if (!seat.shown.trim() || !seat.machine.trim()) return { ok: false, id: seat.id, hole: 'a pipe was empty' }
  if (seat.shown === seat.machine) return { ok: false, id: seat.id, hole: 'the pipes are copies, not a pair' }
  if (!AGREES[seat.id](seat)) return { ok: false, id: seat.id, hole: 'the pipes do not name the same decision' }
  return { ok: true, id: seat.id, line: LINE[seat.id] }
}

export function resolvedLines(): string[] {
  return SEATS.map(seat => {
    const pass = lockstep(seat)
    return pass.ok ? pass.line : ''
  }).filter(Boolean)
}

export function seatLine(id: PipeSeat['id']): string {
  const seat = SEATS.find(row => row.id === id)
  if (!seat) return 'That seat is not on the floor.'
  const pass = lockstep(seat)
  return pass.ok ? pass.line : 'That seat did not lock.'
}

export function lawSpeech(): string {
  return [
    'NO_FORCE. Force stays zero. A notice is not sent where no one is looking. A want without a claim, merit, and truth is not provided.',
    'HOST_SAFE. The machine holds nothing. The system is not written.',
    'TRUTH_OR_NOTHING. A missing fact stays open. A stale reading is not shown.',
    'CLEANUP_FIRST. A repeat is held. A dark pixel emits nothing.',
  ].join(' ')
}
