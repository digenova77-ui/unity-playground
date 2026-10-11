/** A judge that only applies the rules we can actually run.
 * It is not DCLM, not Iris, and not Twain². Living judges are still unborn.
 * Mode stays 'degraded' so a pass here cannot be dressed up as a Trinity seal.
 */

export type Claim = 'REPORTED' | 'MODELED' | 'UNKNOWN'
export type Decision = 'ACCEPT' | 'REDIRECT' | 'REBUILD' | 'PARKED'

export interface JudgeInput {
  type: string
  claim: Claim
  limits: readonly string[]
  why: string
}

export interface JudgeResult {
  decision: Decision
  why: string
  mode: 'degraded'
}

export function judgeDegraded(input: JudgeInput): JudgeResult {
  if (input.type === 'VERDICT' && input.claim === 'UNKNOWN') {
    return { decision: 'PARKED', why: 'A verdict with an unknown claim is theater. It is refused.', mode: 'degraded' }
  }
  if ((input.type === 'EVIDENCE' || input.type === 'VERDICT') && input.limits.length === 0) {
    return { decision: 'REDIRECT', why: 'No limits were stated. Send it back with the boundary.', mode: 'degraded' }
  }
  if (!input.why.trim()) {
    return { decision: 'REBUILD', why: 'No reason was stated.', mode: 'degraded' }
  }
  if (input.claim === 'UNKNOWN') {
    return { decision: 'PARKED', why: 'Unknown stays parked. This check does not invent a source.', mode: 'degraded' }
  }
  return { decision: 'ACCEPT', why: input.why, mode: 'degraded' }
}
