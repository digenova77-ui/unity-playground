/** A landing moves the air point and asks again. A step under about one kilometre does not. */
export function airTarget(place: { lat: number; lon: number }, nextAt: number, lat: number, lon: number): { lat: number; lon: number; nextAt: number } {
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return { lat: place.lat, lon: place.lon, nextAt }
  const moved = Math.hypot(lat - place.lat, lon - place.lon) > 0.01
  return { lat, lon, nextAt: moved ? 0 : nextAt }
}
