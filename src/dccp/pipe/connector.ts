/** Inert DCLM connector. Fail closed. It does not claim the apex route is live.
 * Disabled unless enabled is true and an endpoint is supplied.
 */

export const TRINITY_MODE = 'Zero-Security-App'
export const DEFAULT_MAX_PAYLOAD_BYTES = 256

/** The public kernel body. Same two fields the gateway console sends. Nothing else. */
export function kernelPayload(payload: string): string {
  return JSON.stringify({ payload, flags: 0 })
}

export type DropReason = 'DISABLED' | 'NO_ENDPOINT' | 'OVERSIZE' | 'NETWORK' | 'HTTP' | 'MALFORMED' | 'REJECTED'

export type TransmitResult =
  | { state: 'COMMITTED'; receipt: { accepted: true } }
  | { state: 'DROPPED'; reason: DropReason }

export async function transmitBoxToDCLM(
  payload: string,
  options: { endpoint?: string; enabled?: boolean; maxPayloadBytes?: number; fetchImpl?: typeof fetch; onDrop?: (drop: { state: 'DROPPED'; reason: DropReason }) => void } = {},
): Promise<TransmitResult> {
  const max = options.maxPayloadBytes ?? DEFAULT_MAX_PAYLOAD_BYTES
  const drop = (reason: DropReason): TransmitResult => {
    const result = { state: 'DROPPED' as const, reason }
    options.onDrop?.(result)
    return result
  }
  if (options.enabled !== true) return drop('DISABLED')
  if (!options.endpoint) return drop('NO_ENDPOINT')
  if (new TextEncoder().encode(payload).length > max) return drop('OVERSIZE')
  const fetchImpl = options.fetchImpl ?? fetch
  let response: Response
  try {
    response = await fetchImpl(`${options.endpoint.replace(/\/$/, '')}/compute`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: kernelPayload(payload),
    })
  } catch {
    return drop('NETWORK')
  }
  let json: unknown
  try {
    json = await response.json()
  } catch {
    return drop('MALFORMED')
  }
  if (!json || typeof json !== 'object' || !('accepted' in json)) return drop('MALFORMED')
  if ((json as { accepted?: boolean }).accepted === true) return { state: 'COMMITTED', receipt: { accepted: true } }
  return drop('REJECTED')
}
