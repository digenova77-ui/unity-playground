/** A launch poll is all or nothing. An unheld seat is no-go. */

export interface Seat {
  name: string
  go: boolean
  why: string
}

export function launchSeats(): readonly Seat[] {
  return [
    { name: 'message', go: true, why: 'The door carries the message and its hash.' },
    { name: 'writer boundary', go: true, why: 'The page does not hold the log.' },
    { name: 'assets', go: false, why: 'No real-world value is tied to the unit.' },
    { name: 'host', go: false, why: 'No derivative host was deployed from here.' },
    { name: 'signature', go: false, why: 'The writer hash is not a signature.' },
  ]
}

export function feasibility(): { score: number; of: 100; ready: false; go: number; seats: number } {
  const seats = launchSeats()
  const go = seats.filter(seat => seat.go).length
  return { score: Math.floor((go * 100) / seats.length), of: 100, ready: false, go, seats: seats.length }
}

export function sequenceWords(): string {
  const poll = feasibility()
  const held = launchSeats().filter(seat => !seat.go).map(seat => `${seat.name}: ${seat.why}`).join(' ')
  return `Not ready. A launch poll is all or nothing. One no-go holds it. ${poll.go} of ${poll.seats} seats are go. The count is ${poll.score} out of 100. Ready is false. ${held} The till stays closed.`
}
