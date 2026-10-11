/** Words for the 3D welcome. No scene code, so the timing can be tested alone. */

export interface WelcomeBeat {
  at: number
  hold: number
  line: string
}

export const WELCOME_MS = 36_000

export const WELCOME: readonly WelcomeBeat[] = [
  { at: 0, hold: 6_000, line: 'The light came with you.' },
  { at: 6_000, hold: 6_000, line: 'Welcome to the Unity playground.' },
  { at: 12_000, hold: 6_000, line: 'One, then two. The fifth is nothing.' },
  { at: 18_000, hold: 6_000, line: 'That nothing is the room you stand in.' },
  { at: 24_000, hold: 6_000, line: 'Ask. What is known can be drawn.' },
  { at: 30_000, hold: 6_000, line: 'The Earth is open. The next is +1.' },
]

export const WELCOME_SPEECH = 'Welcome to the Unity playground. The light came with you. One, then two. The fifth is nothing. Ask, and what is known can be drawn. The Earth is open.'
