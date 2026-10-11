/** The notice is the free domain. It is posted only where someone is already looking. */

export const DOMAIN = 'https://dualiscapax.ai/'

export function postNotice(looking: boolean): string | null {
  if (!looking) return null
  return `${DOMAIN} Joining costs nothing. You can leave. The domain is the notice. It is not sent to a place that did not ask.`
}
