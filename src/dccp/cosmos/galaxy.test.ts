import assert from 'node:assert/strict'
import { test } from 'node:test'
import { BEYOND, DISK_KPC, MARKS, SCOPES, SURVEYS, companions, correlate, drawnMarks, galactocentric, galaxySpeech, milkPass, surveyLine } from './galaxy.ts'

test('the center is the center, and every seated mark stays inside the disk', () => {
  const core = galactocentric(MARKS.find(mark => mark.id === 'sgr-a')!)
  assert.ok(core.r < 0.05)
  const sun = galactocentric(MARKS.find(mark => mark.id === 'sun')!)
  assert.ok(Math.abs(sun.r - 8.2) < 0.05)
  for (const mark of MARKS) {
    assert.ok(galactocentric(mark).r <= DISK_KPC, mark.id)
    assert.equal(correlate(mark).seated, true, mark.id)
    assert.equal(correlate(mark).verdict, 'SEE')
    for (const name of mark.by) assert.ok(SCOPES.some(scope => scope.name === name), name)
  }
})

test('catalogues are counts, every instrument is used, and the near stars share the Sun', () => {
  assert.match(surveyLine(), /1,811,709,771 sources/)
  assert.match(surveyLine(), /not plotted/)
  const used = new Set<string>([...MARKS.flatMap(mark => [...mark.by]), ...SURVEYS.flatMap(survey => (survey.by ? [survey.by] : []))])
  for (const scope of SCOPES) assert.ok(used.has(scope.name), scope.name)
  assert.ok(SURVEYS.some(survey => survey.by === null))
  assert.ok(companions(MARKS.find(mark => mark.id === 'sun')!).some(mark => mark.id === 'proxima'))
  assert.ok(drawnMarks().some(mark => mark.id === 'pleiades'))
  assert.equal(drawnMarks().some(mark => mark.id === 'proxima'), false)
  assert.ok(drawnMarks().length < MARKS.length)
})

test('an instrument this pass does not hold is not seated, and the fill turns at the rim', () => {
  const refused = correlate({ id: 'm31', name: 'Andromeda', kind: 'cloud', l: 121, b: -22, sunKpc: 750, claim: 'REPORTED', by: ['Hubble'], note: '' })
  assert.equal(refused.seated, false)
  assert.equal(refused.verdict, 'HOLE')
  for (const mark of BEYOND) assert.equal(correlate(mark).seated, false, mark.id)
  const unnamed = correlate({ ...MARKS[0], by: ['A telescope we did not name'] })
  assert.equal(unnamed.seated, false)
  const outward = milkPass(1)
  assert.equal(outward.phase, 'out')
  assert.equal(outward.lit.length, 0)
  assert.ok(outward.radius < DISK_KPC)
  const turned = milkPass(16.2)
  assert.equal(turned.phase, 'back')
  assert.equal(turned.lit.includes('sgr-a'), false)
  const held = milkPass(100)
  assert.equal(held.phase, 'held')
  assert.equal(held.lit.includes('sgr-a'), true)
  assert.equal(held.lit.length, MARKS.length)
  assert.match(galaxySpeech('what about andromeda') ?? '', /does not cross/)
  assert.match(galaxySpeech('james webb') ?? '', /not ingested/)
  assert.match(galaxySpeech('messier 15') ?? '', /Messier 15/)
  assert.match(galaxySpeech('ngc 2419') ?? '', /not seated/)
})
