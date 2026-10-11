/** The 2D gate. A telling, with the enigma still in it.
 * The 3D world is not behind this film. It is on the other side of the finger.
 */

export interface Beat {
  at: number
  hold: number
  kicker: string
  line: string
  light: 'off' | 'cut' | 'on'
  finger: boolean
}

export const FILM_MS = 60_000

export const BEATS: readonly Beat[] = [
  { at: 0, hold: 8_000, kicker: 'One', line: 'There is one supply, and the light is off. It is not a wallet. It is not on a market. What has not been chosen is still whole.', light: 'off', finger: false },
  { at: 8_000, hold: 8_000, kicker: 'The listening', line: 'Two pipes. One carries. One only listens. Five layers. The fifth layer is nothing, and that nothing is how a next can exist.', light: 'off', finger: false },
  { at: 16_000, hold: 8_000, kicker: 'The four', line: 'No force. Safe host. Cleanup first. Truth or nothing. A life that cannot be those four does not come in.', light: 'off', finger: false },
  { at: 24_000, hold: 8_000, kicker: 'One, then two', line: 'One, then two. The seat is a handle. The phone keeps the key. This page keeps the name. The secret never crosses.', light: 'off', finger: false },
  { at: 32_000, hold: 12_000, kicker: 'The cut', line: 'Then one supply becomes two coins. The light comes on. This is the wallet. Nothing is sent. Two are not one wearing a mask.', light: 'cut', finger: false },
  { at: 44_000, hold: 8_000, kicker: 'The open hand', line: 'Joining costs $0. You can leave. One decision is one act. Its cost is energy, and the watts are not in, so the cost is empty. It is not a dollar. The till stays closed.', light: 'on', finger: false },
  { at: 52_000, hold: 8_000, kicker: 'The finger', line: 'The phone asks for your finger. That is the fusion. Not a password. The 3D world is on the other side of the yes.', light: 'on', finger: true },
]

const timers: number[] = []
let pending = false

export function mountFilm(root: HTMLElement, onFinger: () => void, reduced: boolean): void {
  pending = false
  root.hidden = false
  root.className = reduced ? 'is-off is-still' : 'is-off'
  root.setAttribute('role', 'dialog')
  root.setAttribute('aria-modal', 'true')
  root.setAttribute('aria-label', 'The gate')
  root.innerHTML = `<div class="film-light" aria-hidden="true"></div><div class="film-coins" aria-hidden="true"><i class="coin"></i><i class="coin twin"></i></div><p class="film-kicker"></p><p class="film-line" aria-live="polite"></p><button type="button" class="film-finger" hidden>The finger</button><p class="film-note"></p>`
  const kicker = root.querySelector('.film-kicker')!
  const line = root.querySelector('.film-line')!
  const finger = root.querySelector<HTMLButtonElement>('.film-finger')!
  finger.addEventListener('click', () => {
    if (pending) return
    pending = true
    finger.disabled = true
    onFinger()
  })
  const show = (beat: Beat): void => {
    root.classList.remove('is-off', 'is-cut', 'is-on')
    root.classList.add(beat.light === 'off' ? 'is-off' : beat.light === 'cut' ? 'is-cut' : 'is-on')
    kicker.textContent = beat.kicker
    line.textContent = beat.line
    finger.hidden = !beat.finger
  }
  for (const beat of BEATS) timers.push(window.setTimeout(() => show(beat), beat.at))
  show(BEATS[0])
}

export function filmNote(text: string): void {
  pending = false
  const note = document.querySelector('#film .film-note')
  if (note) note.textContent = text
  const finger = document.querySelector<HTMLButtonElement>('#film .film-finger')
  if (finger) finger.disabled = false
}

export function unmountFilm(): void {
  for (const id of timers) window.clearTimeout(id)
  timers.length = 0
  const root = document.getElementById('film')
  if (!root) return
  root.hidden = true
  root.replaceChildren()
}
