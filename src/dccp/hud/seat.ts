/** The seat this page was given. Their system partition is not opened.
 * A second plant is the same seat. It is not a second write, and it is not their boot.
 */

export const SEAT_KEY = 'dccpworld.page-seat.v1'

export interface SeatStore {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}

export interface PageSeat {
  place: 'page'
  system: false
}

export function plantSeat(store: SeatStore): { seat: PageSeat; duplicate: boolean } {
  const prior = store.getItem(SEAT_KEY)
  if (prior) {
    try {
      const parsed = JSON.parse(prior) as PageSeat
      if (parsed.place === 'page' && parsed.system === false) return { seat: parsed, duplicate: true }
    } catch {
      /* a broken row is replaced once */
    }
  }
  const seat: PageSeat = { place: 'page', system: false }
  store.setItem(SEAT_KEY, JSON.stringify(seat))
  return { seat, duplicate: false }
}

export function seatWords(planted: { duplicate: boolean } | null): string {
  const again = planted?.duplicate
    ? 'The page seat was already there. It was not written twice.'
    : planted
      ? 'A seat was written in this page only.'
      : 'This place has no page store, so nothing was written.'
  return `There is no root with their boot that does not circumvent them. The best seat is the storage this page was given. ${again} Their system partition was not opened and was not remounted.`
}
