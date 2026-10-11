/** Scoring rules for interoceptive tests.
 * No pulse is recorded here, so a live score is empty.
 * The tests are not averaged.
 */

export function countingScore(actual: number, counted: number): number | null {
  if (!Number.isFinite(actual) || !Number.isFinite(counted) || actual <= 0 || counted < 0) return null
  return 1 - Math.abs(actual - counted) / actual
}

export function discrimination(hits: number, trials: number): { rate: number; aboveChance: boolean | null } | null {
  if (!Number.isInteger(hits) || !Number.isInteger(trials) || trials < 1 || hits < 0 || hits > trials) return null
  const rate = hits / trials
  return { rate, aboveChance: trials >= 20 ? rate > 0.5 : null }
}

export function delayPoint(matchedMs: number | null): { point: number | null; threshold: null } {
  if (matchedMs === null || !Number.isFinite(matchedMs)) return { point: null, threshold: null }
  return { point: matchedMs, threshold: null }
}

export function breathLoad(noticed: boolean | null): { lung: boolean | null; heart: false } {
  return { lung: noticed, heart: false }
}

export function oneAccuracy(): null {
  return null
}

export function liveScores(): { counting: null; discrimination: null; delay: null; breath: null; combined: null } {
  return { counting: null, discrimination: null, delay: null, breath: null, combined: null }
}

export function interoceptionWords(): string {
  const live = liveScores()
  return `Counting, discrimination, delay matching, and a breath load are four scores. They are not averaged, so the combined score is ${live.combined}. Counting can look right if someone estimates a pulse. Discrimination is above chance only after 20 trials and a rate over half. A matched delay is a point, not a threshold. A breath load is a lung, not a heart. This page recorded no pulse, so the live scores are empty.`
}
