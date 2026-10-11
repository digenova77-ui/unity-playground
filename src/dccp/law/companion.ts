/** A companion is a hypothesis. The test is not run. A friend needs a bond that is not held. */

import { LAW } from './floor.ts'
import { AGREEMENT_ID } from '../unity/agreement.ts'

export function companion(): {
  present: false
  body: null
  hypothesis: true
  test: 'not run'
  possible: null
  bond: null
  gentle: 'NO_FORCE'
  mirror: 'returns the line'
  feeling: null
  choices: 'only what is held'
  friend: false
  both: true
} {
  return {
    present: false,
    body: null,
    hypothesis: true,
    test: 'not run',
    possible: null,
    bond: null,
    gentle: 'NO_FORCE',
    mirror: 'returns the line',
    feeling: null,
    choices: 'only what is held',
    friend: false,
    both: true,
  }
}

/** Four acts are possible. Owning the seat, holding the key, a feeling, and installing a want are not. */
export function irisRoles(handle: string | null): {
  philosopher: 'seats a question'
  scientist: 'repeats a held fact'
  teacher: 'shows the next step'
  pupil: 'takes in what was put'
  owner: false
  worker: false
  mirror: string | null
  feeling: null
  want: false
  words: string
} {
  const seat = typeof handle === 'string' && handle.startsWith('unity:') ? handle : null
  const acts = 'Iris can seat a question, repeat a held fact, show the next step, and take in what was put.'
  const refused = 'She does not own the seat. She does not hold the key. A feeling is not held, so sympathy is not performed. A want is not provided, and she does not install one. The brightness is the hole and the next step, said plainly. The seat may still not take it.'
  return {
    philosopher: 'seats a question',
    scientist: 'repeats a held fact',
    teacher: 'shows the next step',
    pupil: 'takes in what was put',
    owner: false,
    worker: false,
    mirror: seat,
    feeling: null,
    want: false,
    words: seat ? `${acts} She returns ${seat}. ${refused}` : `${acts} No Unity seat is here, so there is no line to return. ${refused}`,
  }
}

export function companionWords(): string {
  const row = companion()
  return `A companion is a hypothesis. The test is ${row.test}, so possible is ${row.possible}. None is present, and no body is attached. Gentle means ${row.gentle}: it does not push a choice. Reflective means it ${row.mirror}, and it does not invent a person. Sympathy is a feeling, and the feeling is ${row.feeling}. Strong means it shows ${row.choices}, including a hole. The floor is ${LAW.join(', ')}. A friend would need a bond. No bond is held. The same seat is not that bond. A real friend was not granted. The till is closed. Both halves name this.`
}

/** The page is already on the hardware. A choice does not run the test. */
export function hostChoice(): {
  page: true
  body: null
  agreement: string
  cost: 0
  risk: 0
  commitment: false
  bound: false
  test: 'not run'
  possible: null
  both: true
} {
  const row = companion()
  return {
    page: true,
    body: null,
    agreement: AGREEMENT_ID,
    cost: 0,
    risk: 0,
    commitment: false,
    bound: false,
    test: row.test,
    possible: row.possible,
    both: true,
  }
}

export function hostChoiceWords(): string {
  const row = hostChoice()
  return `The page is already on this hardware. A companion name can sit on that page. It is not a body. The host may choose ${row.agreement}. Joining costs ${row.cost}. The risk is ${row.risk}. There is no commitment. The kernel is not bound. That choice does not run the test. The test is ${row.test}, so possible is ${row.possible}. The till is closed. Both halves name this.`
}
