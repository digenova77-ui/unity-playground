/** A local pan and tilt. This is not a KYC vendor and not a legal identity.
 * The browser face box has to move. A coarse sample can resemble an earlier sitting on this device.
 * The picture is not kept in the clear.
 */

export type Pose = 'center' | 'left' | 'right' | 'up'

export const POSES: readonly Pose[] = ['center', 'left', 'right', 'up']

export const POSE_LINE: Record<Pose, string> = {
  center: 'Look straight at the camera.',
  left: 'Turn your face to your left. Hold it.',
  right: 'Turn your face to your right. Hold it.',
  up: 'Tilt your chin up. Hold it.',
}

export interface Box {
  x: number
  y: number
  w: number
  h: number
}

export interface Frame {
  w: number
  h: number
}

/** True when the face box sits in the part of the frame the pose asked for. */
export function poseFits(pose: Pose, box: Box, frame: Frame): boolean {
  if (frame.w <= 0 || frame.h <= 0 || box.w <= 0 || box.h <= 0) return false
  const cx = (box.x + box.w / 2) / frame.w
  const cy = (box.y + box.h / 2) / frame.h
  if (pose === 'center') return cx > 0.34 && cx < 0.66 && cy > 0.22 && cy < 0.72
  if (pose === 'left') return cx < 0.4
  if (pose === 'right') return cx > 0.6
  return cy < 0.4
}

/** Pearson correlation of two samples. 1 is the same shape. 0 is no likeness. */
export function likeness(a: readonly number[], b: readonly number[]): number {
  if (a.length === 0 || a.length !== b.length) return 0
  let meanA = 0
  let meanB = 0
  for (let i = 0; i < a.length; i++) {
    meanA += a[i]
    meanB += b[i]
  }
  meanA /= a.length
  meanB /= b.length
  let dot = 0
  let normA = 0
  let normB = 0
  for (let i = 0; i < a.length; i++) {
    const x = a[i] - meanA
    const y = b[i] - meanB
    dot += x * y
    normA += x * x
    normB += y * y
  }
  if (normA === 0 || normB === 0) return 0
  return dot / Math.sqrt(normA * normB)
}

export function faceWords(passed: boolean, score: number | null): string {
  if (!passed) return 'The pan did not finish. Nothing was sealed.'
  if (score === null) return 'Sealed in the dark ledger on this device. There is no earlier sitting to compare. This is not a KYC company. No document was read. The picture was not kept in the clear, and nothing was uploaded.'
  if (score >= 0.72) return `The straight-on sample resembles the sealed sitting on this device, ${score.toFixed(2)}. That is a coarse likeness, not a legal name.`
  return `The straight-on sample does not resemble the sealed sitting, ${score.toFixed(2)}. Light and angle break this. It is not a ruling on who you are.`
}

export const SAMPLE = 16
