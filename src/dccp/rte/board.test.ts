import assert from 'node:assert/strict'
import test from 'node:test'
import { boardAsk, boardClock, noteBoard, resetBoard } from './board.ts'
import { emptyScene, sceneFrom } from './construct.ts'

test('voice clears, undoes, holds, and focuses the board', () => {
  resetBoard()
  noteBoard(sceneFrom('Water', ['Parts 4'], { kind: 'universal', key: 'universal' }))
  const cleared = boardAsk('clear the screen')
  assert.equal(cleared?.scene.empty, true)
  noteBoard(cleared!.scene)
  const back = boardAsk('undo')
  assert.equal(back?.scene.title, 'Water')
  assert.match(back?.speech ?? '', /Undone/)
  noteBoard(back!.scene)
  assert.equal(boardAsk('freeze')?.speech.includes('Held'), true)
  boardAsk('next frame')
  assert.ok(boardClock(99) < 3)
  const one = boardAsk('focus left')
  assert.match(one?.speech ?? '', /one model/)
  noteBoard({ ...sceneFrom('Water', ['Hydrogen']), empty: false, beside: { title: 'Paper', lines: ['Fiber'], form: 'make' } })
  assert.equal(boardAsk('focus right')?.scene.focus, 'right')
  assert.equal(boardAsk('clear the right')?.scene.beside?.title, 'Cleared')
  assert.equal(boardAsk('resume')?.speech.includes('Going'), true)
  assert.equal(boardClock(4), 4)
  assert.equal(boardAsk('hello'), null)
  assert.equal(emptyScene().title, 'Empty')
})
