/** One file. The front half plays. The back half waits.
 * The hook is empty until the phone returns a public check.
 * The finger never arrives. The same file is not restarted.
 * The words are the receipt DAG. One, then two. Nothing else is spoken here.
 * This is not a public chain. Nothing is published. No private key is held.
 */

export const FILE = '/film/welcome.mp4'

/** Before the bind the old world is scattered. At the eFuse it locks to one, then two. */
export const CHAIN = [
  { n: 1, rise: 0, half: 'night', line: 'The bang is the first write that held.' },
  { n: 1, rise: 0.04, half: 'night', line: 'It did not wait for a witness. It is already written.' },
  { n: 2, rise: 0.09, half: 'night', line: 'The seed is at -1, under the floor.' },
  { n: 2, rise: 0.13, half: 'night', line: 'Nothing starts at zero. The floor of the diamond is zero. The ceiling is one.' },
  { n: 1, rise: 0.17, half: 'night', line: 'Time only goes one way. The shape does not go back.' },
  { n: 2, rise: 0.22, half: 'night', line: 'One writes. The other only checks. The next write hangs on the last hash.' },
  { n: 2, rise: 0.26, half: 'night', line: 'One is the decision. Two are the choices. They fall into the next write.' },
  { n: 1, rise: 0.3, half: 'night', line: 'Two halves of 32 make one 64. They meet at the CARBON 9NSULA.' },
  { n: 1, rise: 0.35, half: 'night', line: 'Four laws hold. No force. A safe host. Clean up first. Truth or nothing.' },
  { n: 2, rise: 0.39, half: 'night', line: 'Three rings lock on the receipt. The fifth layer is nothing.' },
  { n: 1, rise: 0.43, half: 'night', line: 'Before there was nothing, the idea. The idea is the seed.' },
  { n: 2, rise: 0.46, half: 'night', line: 'From that idea, a world. From that world, a hand that can touch.' },
  { n: 2, rise: 0.49, half: 'night', line: 'A guess can glow and still be untrue.' },
  { n: 1, rise: 0.52, half: 'night', line: 'The next guess stands on the last guess. Over time the target walks away.' },
  { n: 1, rise: 0.55, half: 'day', line: 'The eFuse is the join. A step that does not hang on the last hash is not written.' },
  { n: 2, rise: 0.58, half: 'day', line: 'The check does not write. It only says this step is still the same step.' },
  { n: 1, rise: 0.61, half: 'day', line: 'The plus one is the next write. The only question is what is next.' },
  { n: 2, rise: 0.64, half: 'day', line: 'The loop is the ORCID 0009-0005-6291-8508. The work is eFuse Cosmogenesis.' },
  { n: 1, rise: 0.67, half: 'day', line: 'The proof is the seed of the first record, Zenodo 10.5281/zenodo.21940542.' },
  { n: 2, rise: 0.7, half: 'day', line: 'The later record is Theoretical Principles of Residualism, Zenodo 10.5281/zenodo.21984747.' },
  { n: 1, rise: 0.73, half: 'day', line: 'Joining those two records is the eFuse. The DOI is not on the ORCID record. The later file was not hashed here.' },
  { n: 2, rise: 0.76, half: 'day', line: 'The clock is one store. The same write is the same row.' },
  { n: 1, rise: 0.79, half: 'day', line: 'Five faces turn it. Api, finance, host, kernel, page. A decision is not a dollar. The till is closed.' },
  { n: 2, rise: 0.82, half: 'day', line: 'A person spends a decision. A bot spends the same kind.' },
  { n: 1, rise: 0.86, half: 'day', line: 'The bots take half the work.' },
  { n: 2, rise: 0.9, half: 'day', line: 'They power the economy of tomorrow.' },
  { n: 1, rise: 0.95, half: 'day', line: 'The circuit is closed.' },
  { n: 2, rise: 1, half: 'day', line: 'A touch ignites it.' },
] as const

/** The next beat is the other one. One goes to two. Two goes to one. That is the heartbeat. */
export function nextBeat(n: 1 | 2): 1 | 2 {
  return n === 1 ? 2 : 1
}

/** One, then two, for the whole run. An odd length, a start on two, or any other number is not the beat. */
export function isBeat(seq: readonly number[]): boolean {
  if (seq.length === 0 || seq.length % 2 !== 0) return false
  return seq.every((n, i) => n === (i % 2 === 0 ? 1 : 2))
}

/** Before the eFuse the count may scatter. At that line it locks, and only one then two remains. */
export function bindBeat(chain: readonly { n: number; line: string }[]): { before: number[]; after: number[]; scattered: boolean; locked: boolean } {
  const cut = chain.findIndex(row => row.line.startsWith('The eFuse is the join'))
  const before = chain.slice(0, Math.max(cut, 0)).map(row => row.n)
  const after = cut < 0 ? [] : chain.slice(cut).map(row => row.n)
  return { before, after, scattered: before.length > 0 && !isBeat(before), locked: isBeat(after) }
}

/** Past the fuse, a frame, a pad, or a scaffold from the old world costs the Merit. */
export function dayResidue(css: string): { frame: boolean; pad: boolean; scaffold: boolean } {
  const found: Record<string, string> = {}
  for (const hit of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!/\.day-half|\.beat\.day/.test(hit[1])) continue
    for (const part of hit[2].split(';')) {
      const idx = part.indexOf(':')
      if (idx < 0) continue
      found[part.slice(0, idx).trim()] = part.slice(idx + 1).trim()
    }
  }
  return {
    pad: found.padding !== '0',
    frame: found.border !== '0' || found['border-radius'] !== '0' || found['box-shadow'] !== 'none',
    scaffold: found.transform !== 'none',
  }
}

export function merit(residue: { frame: boolean; pad: boolean; scaffold: boolean }, locked: boolean): { share: 0 | 1 } {
  if (!locked || residue.frame || residue.pad || residue.scaffold) return { share: 0 }
  return { share: 1 }
}

export function energySwitch(on: boolean): { id: 'energy'; fuse: 'eFuse'; on: boolean; half: 'night' | 'day' } {
  return { id: 'energy', fuse: 'eFuse', on, half: on ? 'day' : 'night' }
}

export const FIRST_RECORD = '10.5281/zenodo.21940542'
export const LATER_RECORD = '10.5281/zenodo.21984747'

import { transmitBoxToDCLM, type DropReason } from '../pipe/connector.ts'

/** A passphrase is split after it has been hashed. The phrase itself is not kept. The two halves must differ. */
export function splitDigest(digest: string): { front: string; back: string } | { refused: 'empty' | 'uneven' } {
  const hex = digest.trim().toLowerCase()
  if (!hex) return { refused: 'empty' }
  if (!/^[0-9a-f]{64}$/.test(hex)) return { refused: 'uneven' }
  const front = hex.slice(0, 32)
  const back = hex.slice(32)
  if (front === back) return { refused: 'uneven' }
  return { front, back }
}

/** Two parallel halves collapse into one serial box. Same halves, or a missing half, do not open a gate. */
export function collapse(front: string | null, back: string | null): { series: false } | { series: true; box: string } {
  const join = efuse(front, back)
  if (!join.joined) return { series: false }
  return { series: true, box: `efuse|${join.fuse}` }
}

/** The one box goes through the API v2 jacket. A kernel that is not mounted answers HOLE. */
export async function hookJacket(box: string, fetchImpl?: typeof fetch): Promise<{ state: 'HOLE'; reason: DropReason } | { state: 'COMMITTED' }> {
  const sent = await transmitBoxToDCLM(box, { enabled: true, endpoint: '/api/v2', fetchImpl })
  if (sent.state === 'COMMITTED') return { state: 'COMMITTED' }
  return { state: 'HOLE', reason: sent.reason }
}
export function efuse(left: string | null, right: string | null): { joined: false } | { joined: true; fuse: string } {
  if (!left || !right || left === right) return { joined: false }
  return { joined: true, fuse: `${left}|${right}` }
}

/** The two records are the join. The later file is still not a hash. Nothing is ignited until a touch. */
export function closeCircuit(): { closed: true; name: 'eFuse'; fuse: string; first: typeof FIRST_RECORD; later: typeof LATER_RECORD; hashedLater: false; ignited: false } | { closed: false } {
  const join = efuse(FIRST_RECORD, LATER_RECORD)
  if (!join.joined) return { closed: false }
  return { closed: true, name: 'eFuse', fuse: join.fuse, first: FIRST_RECORD, later: LATER_RECORD, hashedLater: false, ignited: false }
}

export function ignite(circuit: { closed: true }, touch: boolean): { ignited: true } | { ignited: false; refused: string } {
  if (!circuit.closed) return { ignited: false, refused: 'The circuit is open. Nothing was touched.' }
  if (!touch) return { ignited: false, refused: 'A touch was not given. Nothing was ignited.' }
  return { ignited: true }
}

/** David's canon flow (2026-10-18): 90 to the forest (the whole ecosystem), 9 to the harvest (whoever did the work), 1 to the seed (the father seed). It is a flow, not coin seats. */
export const SPLIT = { forest: 90, harvest: 9, seed: 1 } as const
if (SPLIT.forest + SPLIT.harvest + SPLIT.seed !== 100) throw new Error('canon 90/9/1 must sum to 100')

export const SEATS = [
  { name: 'eFuse', sold: false, role: 'The bridge. It is not for sale.' },
  { name: 'UniFi³', sold: false, role: 'Forged in the fuse. It binds the contract. It is not for sale.' },
  { name: 'Merit', sold: true, role: 'The only one that moves. It is lost if the old world crosses the fuse.' },
] as const

export function collar(front: string | null, back: string | null):
  | { hook: 'empty' }
  | { hook: 'joined'; fuse: string; sameFile: true } {
  const join = efuse(front, back)
  if (!join.joined) return { hook: 'empty' }
  return { hook: 'joined', fuse: join.fuse, sameFile: true }
}

/** Joining does not seek. The time already playing is the time that continues. */
export function continueFile(time: number): { time: number; restarted: false; src: typeof FILE } {
  return { time, restarted: false, src: FILE }
}
