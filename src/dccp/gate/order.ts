/** The only handoff order. A skipped step is refused. IPFS and IPNS hang. They are not steps. */

import { pinWords } from './pins.ts'

export const ORDER = [
  { n: 1 as const, id: 'source', from: 'upstream', to: 'cloud', line: 'The original source is asked. A copy is not the source.' },
  { n: 2 as const, id: 'prefetch', from: 'cloud', to: 'cloud', line: 'The cloud prefetches the body and holds it. The page does not.' },
  { n: 1 as const, id: 'fetch', from: 'cloud', to: 'seat', line: 'The seat fetches one reading. A body over 256 bytes stays on the cloud. A miss is HOLE.' },
  { n: 2 as const, id: 'hand', from: 'seat', to: 'seat', line: 'The same reading is handed to the human and the bot. It is one row.' },
  { n: 1 as const, id: 'collapse', from: 'two halves', to: 'one box', line: 'Two halves collapse into one box. A missing half opens nothing.' },
  { n: 2 as const, id: 'jacket', from: 'box', to: '/api/v2/compute', line: 'The one box goes through the jacket to the mounted kernel. A miss is HOLE.' },
  { n: 1 as const, id: 'check', from: 'hash', to: 'other pipe', line: 'The other pipe checks the hash and writes nothing.' },
  { n: 2 as const, id: 'next', from: 'last hash', to: 'next write', line: 'The next write hangs on the last hash. A gap or a clash is refused.' },
] as const

const BANNED = new Set(['ipfs', 'ipns', 'pinata', 'cid', 'cloudflare'])

export function advance(done: readonly string[], ask: string): { ok: true; id: string } | { ok: false; reason: string } {
  const name = ask.trim().toLowerCase()
  if (BANNED.has(name)) return { ok: false, reason: 'That name is not a step.' }
  const next = ORDER[done.length]
  if (!next) return { ok: false, reason: 'The order is already complete.' }
  if (name !== next.id) return { ok: false, reason: `The next step is ${next.id}.` }
  return { ok: true, id: next.id }
}

export function orderBody(): { order: { n: 1 | 2; id: string; from: string; to: string }[]; banned: string[]; beat: '1,2,1,2' } {
  return {
    order: ORDER.map(row => ({ n: row.n, id: row.id, from: row.from, to: row.to })),
    banned: ['ipfs', 'ipns', 'cloudflare'],
    beat: '1,2,1,2',
  }
}

export function orderWords(): string {
  return `${ORDER.map(row => `${row.n} ${row.id}. ${row.line}`).join(' ')} IPFS is not a step. IPNS is not a step. ${pinWords()}`
}
