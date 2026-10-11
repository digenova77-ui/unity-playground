/** The same seat as the ICD watch. A checked thing can be kept.
 * Every entity on Earth is not a held set. Better-for-everybody is a want.
 */

export function entitySeat(checked: number): { held: number; catalog: false; better: false } {
  return { held: Math.max(0, checked), catalog: false, better: false }
}

export function entitySeatWords(): string {
  return 'The same seat. It keeps a thing only after that thing was checked. It does not fetch every entity on Earth. A claim to better everything, for everybody, everywhere, is a want, and it is not provided. One stem is held, CA00. Every other name stays open. A repeat is not written again. A hidden page does not check. This is not a diagnosis.'
}
