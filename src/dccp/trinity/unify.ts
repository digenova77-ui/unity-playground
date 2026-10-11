/** What follows from the mirror, and the correlations still missing.
 * This is not a theorem of everything.
 */

import { truthMeshScene } from '../cosmos/history.ts'

export function unifyWords(): { closed: string; open: string[]; words: string } {
  const joints = truthMeshScene().joints
  const one = joints.filter(joint => joint.grade === 'one').length
  const two = joints.filter(joint => joint.grade === 'two').length
  const closed = 'The Trinity has no framework. A record is a place, a minute, and a source. If one is missing, it is not a record. They are not the same. That is why there is a mirror, and nothing passes through. A minute is kept only with its place and its source. The Trinity keeps nothing. A derivative correlation is a second source that names the same minute. Without that pair, it is not booked.'
  const open = [
    `${one} one-page minutes have no second naming.`,
    'The landing is two seconds, not one pair.',
    `${two} minutes are printed alike on two pages, and those pages have not been shown to be two instruments.`,
    'Four star light-times name no minute on Earth.',
    'det(M) has not been computed.',
  ]
  return {
    closed,
    open,
    words: `${closed} This is not a theorem of everything. What is still open: ${open.join(' ')}`,
  }
}
