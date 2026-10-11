import assert from 'node:assert/strict'
import test from 'node:test'
import { beginCurriculum, replyCurriculum, resetCurriculum, rteBuildAsk } from './curriculum.ts'

test('a Canadian curriculum draws only what was named, and DCLM keeps the digest', () => {
  resetCurriculum()
  const opened = beginCurriculum('draw my curriculum at the University of Toronto, faculty of arts and science, field of study chemistry, major in chemistry')
  assert.match(opened?.lines.join(' ') ?? '', /University of Toronto/)
  assert.match(opened?.lines.join(' ') ?? '', /Faculty: arts and science/)
  assert.match(opened?.lines.join(' ') ?? '', /none ingested/)
  assert.match(opened?.speech ?? '', /DCLM was asked/)
  const again = beginCurriculum('draw my curriculum at the University of Toronto, faculty of arts and science, field of study chemistry, major in chemistry')
  assert.equal(opened?.digest, again?.digest)
  const course = replyCurriculum('add CHEM 101 structure')
  assert.match(course && course !== 'release' ? course.lines.join(' ') : '', /CHEM 101/)
  resetCurriculum()
  const other = beginCurriculum('my major at a school')
  const named = replyCurriculum('Harbourview College')
  assert.match(named && named !== 'release' ? named.speech : '', /not on the held list/)
  assert.match(named && named !== 'release' ? named.lines.join(' ') : '', /none ingested/)
  assert.match(rteBuildAsk('ask dclm how to build the universal rte') ?? '', /DCLM holds nothing/)
  assert.equal(other?.done, false)
})
