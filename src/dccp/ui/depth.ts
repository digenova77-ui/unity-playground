/** One OLED holds one view. A light field would need a different picture for each eye.
 * This screen cannot do that. It can hold a near plane and a deep plane, and shift them when you move.
 */

import { Vector3, type PerspectiveCamera, type Quaternion } from 'three'
import { OLED_FLOOR } from '../law/acuity.ts'

export interface Look {
  x: number
  y: number
}

export function lookShift(x: number, y: number, reduced: boolean): Look {
  if (reduced) return { x: 0, y: 0 }
  return { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) }
}

const STEP = 12

/** One picture, cut by brightness. A dark pixel is on no plane. Near moves most. */
export const HOLO = [
  { name: 'near', depth: 1, lo: 0.55, hi: 1.01 },
  { name: 'mid', depth: 0.5, lo: 0.22, hi: 0.55 },
  { name: 'far', depth: 0.15, lo: -1, hi: 0.22 },
] as const

export function bandOf(luma: number): 'near' | 'mid' | 'far' | null {
  if (!(luma > OLED_FLOOR) || luma > 1) return null
  if (luma > 0.55) return 'near'
  if (luma > 0.22) return 'mid'
  return 'far'
}

export function planeShift(look: Look, depth: number): Look {
  const d = Math.max(0, Math.min(1, depth))
  if (d === 0) return { x: 0, y: 0 }
  return { x: look.x * d, y: look.y * d }
}

/** A resting tilt does not wipe a pointer. One source is held. */
export function takeLook(held: 'pointer' | 'tilt' | 'none', source: 'pointer' | 'tilt', next: Look): { held: 'pointer' | 'tilt'; look: Look } | null {
  const still = next.x === 0 && next.y === 0
  if (source === 'tilt' && still && held === 'pointer') return null
  return { held: source, look: next }
}

const saved = new Vector3()
const axis = new Vector3()

export function lean(camera: PerspectiveCamera, look: Look, amount = 0.04): () => void {
  saved.copy(camera.position)
  const shift = planeShift(look, 1)
  nudge(camera.position, camera.quaternion, shift, amount)
  return () => { camera.position.copy(saved) }
}

function nudge(position: Vector3, rotation: Quaternion, look: Look, amount: number): void {
  axis.set(1, 0, 0).applyQuaternion(rotation)
  position.addScaledVector(axis, look.x * amount)
  axis.set(0, 1, 0).applyQuaternion(rotation)
  position.addScaledVector(axis, look.y * amount)
}

export function paintDepth(root: HTMLElement, look: Look): void {
  const near = planeShift(look, 1)
  root.style.setProperty('--nx', `${(near.x * STEP).toFixed(2)}px`)
  root.style.setProperty('--ny', `${(near.y * STEP).toFixed(2)}px`)
}

export function lightFieldWords(): string {
  return 'This screen is one view. The picture is cut by brightness into three planes. A dark pixel is on none of them. Each plane moves by the look times its depth. It is not a second picture for the other eye.'
}
