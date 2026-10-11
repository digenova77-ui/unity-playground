import assert from 'node:assert/strict'
import test from 'node:test'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { CORPUS, FUSE_MARK, bindOrigin, fuseSeat, fuseWords } from './fuse.ts'

test('the fuse names UniFi³ and Merit and does not move either', () => {
  const open = fuseSeat(null)
  assert.equal(open.front, 'page')
  assert.equal(open.bind, 'Unity')
  assert.equal(open.back, 'origin')
  assert.equal(open.layer, false)
  assert.equal(open.os3Image, false)
  assert.equal(open.osFound, 'blueprint')
  assert.equal(open.sleeve, 'Plancksoft')
  assert.equal(open.unifi, 'UniFi³')
  assert.equal(open.merit, 'record')
  assert.equal(open.meritMoves, false)
  assert.equal(open.till, 'closed')
  assert.equal(open.bootloader, false)
  assert.equal(open.bound, false)
  assert.equal(fuseSeat('unity:pilot.abc').bound, true)
  assert.equal(fuseSeat('david').bound, false)
  assert.match(fuseWords(null), /same mark/)
  assert.match(fuseWords(null), /does not write a bootloader/)
  assert.match(fuseWords('unity:pilot.abc'), /does not move/)
})

test('the page binds to the origin only when the corpus mark matches', () => {
  const hash = createHash('sha256')
  for (const name of CORPUS) {
    const bytes = readFileSync(new URL(`../../../public/plancksoft/${name}`, import.meta.url))
    hash.update(name)
    hash.update(bytes)
  }
  assert.equal(hash.digest('hex'), FUSE_MARK)
  assert.equal(bindOrigin(FUSE_MARK).linked, true)
  assert.equal(bindOrigin(FUSE_MARK).meritMoves, false)
  assert.equal(bindOrigin(FUSE_MARK).till, 'closed')
  assert.equal(bindOrigin('0'.repeat(64)).linked, false)
  assert.equal(bindOrigin(null).linked, false)
})
