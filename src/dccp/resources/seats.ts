/** Country readings sit on the label this map already uses. A world aggregate has no city, so it is not pinned. */

export interface OfferSeat {
  id: string
  lat: number
  lon: number
  title: string
  line: string
  note: string
}

const LABEL: Record<string, { lat: number; lon: number; note: string }> = {
  Britain: { lat: 54.403, lon: -2.116, note: 'Seated at the United Kingdom label on this map. The figure is national, not a town.' },
  Denmark: { lat: 55.967, lon: 9.018, note: 'Seated at the Denmark label on this map. The figure is the system, not a town.' },
}

export function placedOffers(offers: readonly { place: string; resource: string; value: number | null; unit: string }[]): OfferSeat[] {
  const out: OfferSeat[] = []
  for (const [place, seat] of Object.entries(LABEL)) {
    const rows = offers.filter(offer => offer.place === place)
    if (!rows.length) continue
    const line = rows.map(offer => offer.value === null ? `${offer.resource}: no reading` : `${offer.resource}: ${offer.value} ${offer.unit}`).join(' · ')
    out.push({ id: place, lat: seat.lat, lon: seat.lon, title: place, line, note: seat.note })
  }
  return out
}
