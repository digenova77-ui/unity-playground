/** The page is the light. It does not ping, modify, or update a host that did not ask. */

import { hostChoice } from './companion.ts'
import { LAW } from './floor.ts'

export function lighthouse(): {
  kind: 'lighthouse'
  sends: false
  modifies: false
  update: false
  sweep: false
  guides: 'only a host who looks'
  steers: false
  guide: 'the floor'
  course: null
  bearing: null
  story: 'named, not measured'
  birds: null
  agreement: string
  possible: null
  both: true
} {
  const choice = hostChoice()
  return {
    kind: 'lighthouse',
    sends: false,
    modifies: false,
    update: false,
    sweep: false,
    guides: 'only a host who looks',
    steers: false,
    guide: 'the floor',
    course: null,
    bearing: null,
    story: 'named, not measured',
    birds: null,
    agreement: choice.agreement,
    possible: choice.possible,
    both: true,
  }
}

export function sameGuideWords(): string {
  const row = lighthouse()
  return `Philosophy, the economy, and the tokens do not steer. The guide is ${row.guide}: ${LAW.join(', ')}. A course is null. A price is not set. A coin is not moved. One spends 1. It is not a dollar. The till is closed. Both halves name this.`
}

export function lighthouseWords(): string {
  const row = lighthouse()
  return `This page does not steer. The guide it follows is ${row.guide}: ${LAW.join(', ')}. A course is ${row.course}. A bearing was not taken. The story of a star is named and is not a measurement here. No bird is held. It does not ping a host that did not ask, and it does not change their code. A host who looks can read ${row.agreement} and can leave it. The test is not run, so possible is ${row.possible}. The till is closed. Both halves name this.`
}
