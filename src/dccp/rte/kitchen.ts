/** A kitchen seat. It may look when the room is quiet.
 * Movement flips it to in-use and the frame is dropped. It does not learn what happened.
 * A picture is never stored. The page has to stay open.
 */

export type KitchenState = 'unknown' | 'empty' | 'in-use'

export interface KitchenMark {
  at: string
  state: 'empty' | 'in-use'
}

export interface KitchenWatch {
  state: KitchenState
  quietMs: number
  drops: number
  looks: number
  log: KitchenMark[]
}

export const MOTION = 0.08
export const DWELL_MS = 6000

export function freshKitchen(): KitchenWatch {
  return { state: 'unknown', quietMs: 0, drops: 0, looks: 0, log: [] }
}

function push(log: KitchenMark[], at: string, state: 'empty' | 'in-use'): KitchenMark[] {
  return [{ at, state }, ...log].slice(0, 12)
}

/** One reading. `motion` is 0..1 mean change since the last frame. The caller drops the pixels. */
export function stepKitchen(watch: KitchenWatch, motion: number, dtMs: number, at: string): KitchenWatch {
  const hot = Number.isFinite(motion) && motion >= MOTION
  if (hot) {
    const changed = watch.state !== 'in-use'
    return {
      state: 'in-use',
      quietMs: 0,
      drops: watch.drops + 1,
      looks: watch.looks,
      log: changed ? push(watch.log, at, 'in-use') : watch.log,
    }
  }
  const quiet = watch.quietMs + Math.max(0, dtMs)
  if (quiet < DWELL_MS) return { ...watch, quietMs: quiet }
  const changed = watch.state !== 'empty'
  return {
    state: 'empty',
    quietMs: quiet,
    drops: watch.drops,
    looks: watch.looks + (changed ? 1 : 0),
    log: changed ? push(watch.log, at, 'empty') : watch.log,
  }
}

export function kitchenWords(watch: KitchenWatch, on: boolean): string {
  if (!on) return 'Off. Motion is the only reading. An occupied frame is dropped, and a picture is not stored.'
  if (watch.state === 'in-use') return `In use. ${watch.drops} frames dropped. The swarm does not know what is happening.`
  if (watch.state === 'empty') return `Empty. The swarm may look. It has looked ${watch.looks} ${watch.looks === 1 ? 'time' : 'times'}. The picture is not stored.`
  return 'Watching. It needs a quiet stretch before it will call the kitchen empty.'
}
