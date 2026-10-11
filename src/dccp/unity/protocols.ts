/** Literal procedures only. A published route is not a partnership.
 * Nothing is called. Nothing is sent.
 */

export const XAI_PROCEDURE = {
  who: 'xAI',
  base: 'https://api.x.ai',
  docs: 'https://docs.x.ai/docs/api-reference',
  auth: 'Authorization: Bearer key',
  called: false,
  key: null,
} as const

export const SPACEX_PROCEDURE = {
  who: 'SpaceX',
  procedure: null,
  called: false,
} as const

export function protocolWords(): string {
  return 'xAI publishes a procedure. The base is https://api.x.ai. The reference is https://docs.x.ai/docs/api-reference. A call needs a bearer key. No key is held here, so the procedure was not called. SpaceX has no official procedure in what this page holds. A community catalog is not SpaceX, and it was not called. They can use the connector that is already signed ahead. They have not chosen it. Nothing was sent.'
}
