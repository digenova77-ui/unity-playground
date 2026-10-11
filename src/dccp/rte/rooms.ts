/** A draft room from two series this device already holds.
 * Bots may mesh drafts that share a source. A share stays on this device, and only with a Unity ID.
 * A correlation is not a new fact about the world.
 */

export interface Series {
  id: string
  name: string
  values: number[]
}

export interface Draft {
  id: string
  title: string
  sources: string[]
  score: number
  lines: string[]
}

export function pearson(a: readonly number[], b: readonly number[]): number | null {
  const n = Math.min(a.length, b.length)
  if (n < 3) return null
  let meanA = 0
  let meanB = 0
  for (let i = 0; i < n; i++) {
    meanA += a[i]
    meanB += b[i]
  }
  meanA /= n
  meanB /= n
  let dot = 0
  let normA = 0
  let normB = 0
  for (let i = 0; i < n; i++) {
    const x = a[i] - meanA
    const y = b[i] - meanB
    dot += x * y
    normA += x * x
    normB += y * y
  }
  if (normA === 0 || normB === 0) return null
  return dot / Math.sqrt(normA * normB)
}

export function draftFrom(series: readonly Series[], minAbs = 0.7): Draft[] {
  const out: Draft[] = []
  for (let i = 0; i < series.length; i++) {
    for (let j = i + 1; j < series.length; j++) {
      const score = pearson(series[i].values, series[j].values)
      if (score === null || Math.abs(score) < minAbs) continue
      const sources = [series[i].id, series[j].id].sort()
      out.push({
        id: sources.join('~'),
        title: `${series[i].name} and ${series[j].name}`,
        sources,
        score,
        lines: [
          `${series[i].name} and ${series[j].name} move together at ${score.toFixed(2)} on this device.`,
          'This is a draft room. It is not a new fact about the world.',
        ],
      })
    }
  }
  return out
}

/** Drafts that share a source become one room. The score is the strongest link, not an average invention. */
export function meshDrafts(drafts: readonly Draft[]): Draft[] {
  const groups: Draft[][] = []
  for (const draft of drafts) {
    const group = groups.find(rows => rows.some(row => row.sources.some(source => draft.sources.includes(source))))
    if (group) group.push(draft)
    else groups.push([draft])
  }
  return groups.map(group => {
    const sources = [...new Set(group.flatMap(row => row.sources))].sort()
    const strongest = group.reduce((best, row) => Math.abs(row.score) > Math.abs(best.score) ? row : best)
    return {
      id: sources.join('~'),
      title: group.map(row => row.title).join(' · '),
      sources,
      score: strongest.score,
      lines: [
        ...group.flatMap(row => row.lines),
        group.length > 1 ? 'Meshed because the drafts share a source. The strongest link is the one named.' : 'Nothing else shared a source, so this draft stays alone.',
      ],
    }
  })
}

export function roomWords(drafts: readonly Draft[], shared: number, bound: boolean): string {
  if (!drafts.length) return 'No two series on this device moved together. A flat log is not a room. Nothing was invented.'
  const titles = drafts.map(draft => draft.title).join('; ')
  const share = bound
    ? `${shared} ${shared === 1 ? 'draft is' : 'drafts are'} shared on this device, under your Unity ID. They were not sent to another phone.`
    : 'A Unity ID is not bound, so the drafts were not shared.'
  return `${drafts.length} ${drafts.length === 1 ? 'room' : 'rooms'}: ${titles}. ${share}`
}
