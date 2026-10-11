/** What will not function if this page is rolled out as the whole machine.
 * The kernel and the operating system are not in this page. The list says so.
 */

export interface RolloutRow {
  layer: 'kernel' | 'page'
  works: boolean
  text: string
}

export function rolloutRows(hasFaceBox: boolean): RolloutRow[] {
  return [
    { layer: 'kernel', works: false, text: 'The kernel is not in this page. A rollout here cannot start a daemon in the operating system.' },
    { layer: 'kernel', works: false, text: 'Rooting into their boot is not in this page. Their system partition is not remounted.' },
    { layer: 'page', works: false, text: 'The camera, the microphone, and the kitchen watch stop when the page closes.' },
    { layer: 'page', works: false, text: 'The wallet moves test units. It does not move eFuse, and it does not send a coin on a network.' },
    { layer: 'page', works: false, text: 'A draft room is a correlation on this device. It is not sent to another phone.' },
    { layer: 'page', works: false, text: 'A contact figure is a placeholder. There is no 3D person.' },
    hasFaceBox
      ? { layer: 'page', works: true, text: 'This browser has a face box. A finished pan can be sealed. It is still not a legal identity.' }
      : { layer: 'page', works: false, text: 'This browser has no face box, so a pan cannot be recognized. You can assert the four poses. That assertion can be sealed, and it is not a likeness.' },
    { layer: 'page', works: true, text: 'The nutrition log, the dark ledger, and the close-approach watch run in this page.' },
  ]
}

export function rolloutWords(rows: readonly RolloutRow[] = rolloutRows(false)): string {
  const broken = rows.filter(row => !row.works)
  return `${broken.length} things will not function as a full machine. ${broken.map(row => row.text).join(' ')}`
}

const esc = (s: string): string => s.replace(/[&<>"]/g, c => (c === '&' ? '\u0026amp;' : c === '<' ? '\u0026lt;' : c === '>' ? '\u0026gt;' : '\u0026quot;'))

export function renderRollout(rows: readonly RolloutRow[]): string {
  return `<ul class="rollout-list">${rows.map(row => `<li class="${row.works ? 'ok' : 'no'}"><b>${row.works ? 'Holds' : 'Will not'}</b> ${esc(row.text)}</li>`).join('')}</ul>`
}
