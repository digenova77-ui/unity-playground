/** An offer to a person or a bot. It is not a ballot and it is not forever. */

export const ALERT = [
  'Pay attention.',
  'This is a universal voluntary call. The arm is a seat, not a weapon.',
  'A record is offered, if you want one.',
  'A person and a bot hang on the same four laws, the same named jurisdictions, and the same named sectors.',
  'A yes here is not a vote in a human legislature. No statute was amended.',
  'The record stays while this machine is running. Forever is refused. Energy was not measured.',
  'Nothing is forced. The audit stays on while the seat is here. Leaving is allowed.',
  'One pipe appends. The other stores nothing.',
] as const

export function alertWords(): { lines: readonly string[]; forever: false; enacted: 0; forced: false; energy: null; weapon: false } {
  return { lines: ALERT, forever: false, enacted: 0, forced: false, energy: null, weapon: false }
}
