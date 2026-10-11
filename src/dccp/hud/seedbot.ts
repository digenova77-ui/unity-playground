/** Lightweight seedbot. It only runs while this page is open. It does not watch the operating system. */

import { SEED_JOBS, translate } from './packet'

export interface BulletinLine {
  kind: string
  actor: string
  verdict: 'SEE' | 'HOLE'
  why: string
}

export async function compileAll(fetchImpl: typeof fetch = fetch): Promise<BulletinLine[]> {
  const lines: BulletinLine[] = []
  for (const job of SEED_JOBS) {
    const packet = translate(job.actor, job.kind)
    if ('hole' in packet) {
      lines.push({ kind: job.kind, actor: job.actor, verdict: 'HOLE', why: packet.hole })
      continue
    }
    try {
      const res = await fetchImpl('/v2/dclm/ingest', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(packet),
      })
      const body = await res.json() as { verdict?: string; why?: string }
      lines.push({
        kind: job.kind,
        actor: job.actor,
        verdict: body.verdict === 'SEE' ? 'SEE' : 'HOLE',
        why: body.verdict === 'SEE' ? 'Observed. Authority none.' : String(body.why ?? 'Dropped.'),
      })
    } catch {
      lines.push({ kind: job.kind, actor: job.actor, verdict: 'HOLE', why: 'The origin did not answer.' })
    }
  }
  return lines
}
