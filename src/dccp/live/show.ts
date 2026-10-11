/** A reading is shown only while it is live. A stale figure is not a figure. */
export function liveOnly(state: string, value: string): string | null {
  return state === 'LIVE' ? value : null
}
