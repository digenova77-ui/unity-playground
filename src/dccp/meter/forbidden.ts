/** 403 is a refusal. A credential and a payment do not lift it. */

export function forbidden(why: string): { status: 403; retry: false; credential: false; payment: false; words: string } {
  const reason = why.trim() || 'This act is refused.'
  return {
    status: 403,
    retry: false,
    credential: false,
    payment: false,
    words: `403 means the server understood and still refuses. Signing in again does not open it. Paying does not open it. ${reason}`,
  }
}
