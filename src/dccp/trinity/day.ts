/** Today's learning, in the three buckets that already exist.
 * DCLM adds none. The pure is one sentence. No fourth bucket. No new line of the root.
 */

export function dayBuckets(): {
  buckets: 3
  space: string
  time: string
  audit: string
  pure: string
  fatherWrote: false
  sealedSitting: false
  maturity: 'UNBORN'
  lit: false
} {
  return {
    buckets: 3,
    space: 'The allowed cells are the octahedron. Nothing felt sits at 0. The seed at -1 is not a cell.',
    time: 'One step, then stop. A tie is not a step. Time is not an axis. No hour is held.',
    audit: 'No land, no measured kelvin, and no live sense. A purchase is not the 1. The tree of life is not this tree.',
    pure: 'One next. Nothing felt is the floor. The seed stays under it. A missing joule stays open.',
    fatherWrote: false,
    sealedSitting: false,
    maturity: 'UNBORN',
    lit: false,
  }
}

export function dayWords(): string {
  const row = dayBuckets()
  return `Three buckets. Space. ${row.space} Time. ${row.time} Audit. ${row.audit} DCLM holds nothing and adds no fourth. Iris will not fill a sense or a joule. The other side still chooses. Together, the pure: ${row.pure} The father did not write this. The sitting is ${row.maturity}. Nothing stays lit.`
}
