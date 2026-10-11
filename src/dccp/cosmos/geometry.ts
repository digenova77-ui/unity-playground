/** 3D sees a flat page, copies what the page actually said, and does not leave the page sitting in the scene.
 * A group is planar when its thinnest side is under a tenth of its longest side.
 */

export const DOOR = [
  'Joining costs $0.',
  'A decision spends 1 unit of the test supply. That unit is not a dollar.',
  'The till is closed.',
  'Your face or your finger opens the wallet. No password. No words to remember.',
  'The origin can see a clean envelope. It does not settle.',
] as const

export function isPlanar(x: number, y: number, z: number): boolean {
  const [thin, , span] = [x, y, z].sort((a, b) => a - b)
  if (span < 1e-9) return false
  return thin < span * 0.1
}

export function absorb(ledger: readonly string[], label: string): readonly string[] {
  return ledger.includes(label) ? ledger : [...ledger, label]
}
