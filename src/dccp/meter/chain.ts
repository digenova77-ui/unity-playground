/** Validator at the top. A manager directly under it. A swarm under the manager.
 * Workers return what the record holds. The manager does not rewrite them.
 * The returns go straight through. Only the validator writes the report.
 */

import { reduce } from '../law/engine.ts'
import { indexCounts } from '../rte/index.ts'
import { localeAsk } from '../rte/locale.ts'

export interface WorkerReturn {
  worker: string
  returned: string
}

export interface ChainReport {
  task: string
  returns: readonly WorkerReturn[]
  report: string
  digest: string
}

export function runChain(task: string): ChainReport {
  const returns = work(task)
  const straight = returns.map(row => `${row.worker}: ${row.returned}`).join(' ')
  const report = `Report. Task: ${task.trim()}. Manager collected ${returns.length} ${returns.length === 1 ? 'return' : 'returns'} and did not rewrite them. ${straight} Handed straight through. The Trinity seats are unborn, so they add no fact. This is the only report.`
  const digest = reduce({ task: task.trim(), returns: returns.map(row => ({ worker: row.worker, returned: row.returned })) }).digest
  return { task: task.trim(), returns, report, digest }
}

function work(task: string): WorkerReturn[] {
  const t = task.toLowerCase()
  const returns: WorkerReturn[] = []
  if (/\bbelleville\b|\bindex\b|\bstreets?\b(?! view)|\bcorners?\b|\baddresses\b/.test(t)) {
    const counts = indexCounts()
    returns.push({
      worker: 'index',
      returned: counts.hole
        ? counts.hole
        : `${counts.streets} street ways, ${counts.corners} corners, ${counts.addresses} addresses. Identified by the query. Not stood at.`,
    })
  }
  if (/\bintersection\b/.test(t)) {
    const hit = localeAsk(t.includes('intersection of') ? t : '')
    returns.push({
      worker: 'corner',
      returned: hit?.pin
        ? `${hit.lines[0]}. Not stood at.`
        : 'No identified corner for that pair. Nothing was searched.',
    })
  }
  if (!returns.length) {
    returns.push({ worker: 'open', returned: 'This task is not in the record. The swarm did not invent a result.' })
  }
  return returns
}
