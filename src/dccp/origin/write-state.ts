/** One log appends. The other pipe only audits that write. It stores nothing. */

import { createHash } from 'node:crypto'
import { LAW } from '../law/floor.ts'
import { MAINNET_WRITER, TESTNET_WRITER } from './writer-public.ts'

export function twoP5L(): { pipes: 2; laws: 4; fifth: 'nothing'; layers: readonly string[] } {
  return { pipes: 2, laws: 4, fifth: 'nothing', layers: [...LAW, 'nothing'] }
}

const GENESIS = '0'.repeat(64)

interface Entry {
  line: string
  prev: string
  hash: string
}

const testnet: Entry[] = []
const mainnet: Entry[] = []

function tip(rows: readonly Entry[]): string {
  return rows.at(-1)?.hash ?? GENESIS
}

function writeHash(prev: string, line: string): string {
  return createHash('sha256').update(`${prev}\n${line}`).digest('hex')
}

function auditHash(prev: string, line: string): string {
  return createHash('sha256').update(prev).update('\n').update(line).digest('hex')
}

/** The other pipe. It recomputes the write. It stores nothing. */
export function auditWrite(prev: string, line: string, claimed: string): { holds: 'nothing'; ok: boolean } {
  return { holds: 'nothing', ok: auditHash(prev, line) === claimed }
}

function append(rows: Entry[], line: string): { n: number; added: boolean; hash: string; ok: boolean } {
  const text = line.trim()
  if (!text || rows.some(row => row.line === text)) return { n: rows.length, added: false, hash: tip(rows), ok: true }
  const prev = tip(rows)
  const claimed = writeHash(prev, text)
  const audit = auditWrite(prev, text, claimed)
  if (!audit.ok || audit.holds !== 'nothing') return { n: rows.length, added: false, hash: tip(rows), ok: false }
  rows.push({ line: text, prev, hash: claimed })
  return { n: rows.length, added: true, hash: claimed, ok: true }
}

export function resetState(): void {
  testnet.length = 0
}

export function resetMainnet(): void {
  mainnet.length = 0
}

export function writeTestnet(line: string): { schema: typeof TESTNET_WRITER; mainnet: false; n: number; added: boolean; hash: string; ok: boolean } {
  const row = append(testnet, line)
  return { schema: TESTNET_WRITER, mainnet: false, ...row }
}

export function writeMainnet(line: string): { schema: typeof MAINNET_WRITER; mainnet: true; till: 'closed'; n: number; added: boolean; hash: string; ok: boolean } {
  const row = append(mainnet, line)
  return { schema: MAINNET_WRITER, mainnet: true, till: 'closed', ...row }
}

export function undoState(): { undone: false; n: number; hash: string } {
  return { undone: false, n: testnet.length, hash: tip(testnet) }
}

export function undoMainnet(): { undone: false; n: number; hash: string } {
  return { undone: false, n: mainnet.length, hash: tip(mainnet) }
}

export function testnetWriter(): { schema: typeof TESTNET_WRITER; mainnet: false; reverses: false; n: number; hash: string } {
  return { schema: TESTNET_WRITER, mainnet: false, reverses: false, n: testnet.length, hash: tip(testnet) }
}

export function mainnetWriter(): { schema: typeof MAINNET_WRITER; mainnet: true; reverses: false; till: 'closed'; signed: false; n: number; hash: string } {
  return { schema: MAINNET_WRITER, mainnet: true, reverses: false, till: 'closed', signed: false, n: mainnet.length, hash: tip(mainnet) }
}
