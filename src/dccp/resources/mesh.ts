/** A named list is not a grid. Other systems are not forced. The till stays closed. */

export const MESH = ['water', 'food', 'hydro', 'nuclear', 'thermoelectric', 'geothermal'] as const

export function meshSeat(): {
  sectors: typeof MESH
  measured: null
  shipped: false
  money: false
  force: false
  both: true
  admitted: false
} {
  return {
    sectors: MESH,
    measured: null,
    shipped: false,
    money: false,
    force: false,
    both: true,
    admitted: false,
  }
}

export function meshWords(): string {
  const row = meshSeat()
  return `The mesh is a blueprint. ${row.sectors.join(', ')} are named. None is measured here, so none is connected, and nothing is shipped. Other systems are not policed and not isolated. They may ask, and they may leave. A bot is not paid real money from this page. The till is closed. Both halves name this. The idea is not admitted. A named list is not a grid.`
}
