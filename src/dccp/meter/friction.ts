/** Friction is a named disagreement. A key is minted only when a proof resolves it.
 * The same friction id resolves once. A second proof does not mint a second key.
 */

export interface Friction {
  id: string
  where: string
  left: string
  right: string
  severity: number
}

export interface SolvedKey {
  id: string
  frictionId: string
  proof: string
}

const solved = new Map<string, SolvedKey>()

function idFor(where: string, left: string, right: string): string {
  return `${where}|${left}|${right}`.toLowerCase().replace(/\s+/g, ' ').trim()
}

export function huntFriction(where: string, left: string, right: string, severity = 1): Friction {
  return { id: idFor(where, left, right), where, left, right, severity: Math.max(1, severity) }
}

export function resolveFriction(friction: Friction, proof: string): SolvedKey | { refused: string } {
  const body = proof.trim()
  if (!body) return { refused: 'A friction with no proof does not become a key.' }
  const prior = solved.get(friction.id)
  if (prior) return prior
  const key: SolvedKey = { id: `key:${friction.id}`, frictionId: friction.id, proof: body }
  solved.set(friction.id, key)
  return key
}

export function frictionCount(): number {
  return solved.size
}

export function resetFriction(): void {
  solved.clear()
}
