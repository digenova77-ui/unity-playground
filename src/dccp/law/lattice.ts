/** The diamond lattice is the cells that sit on it.
 * The walk stops at the ceiling. The particle horizon is not a cell.
 * The insula is the route. It does not light a body that is not attached.
 */

import { connectInsula, synapseMap } from './logic-tree.ts'
import { diamond } from '../pipe/chain.ts'

const STEP = [-1, 0, 1] as const
type Cell = { x: number; y: number; z: number }

export function lattice(width = 1): Cell[] | { refused: string } {
  const box = diamond(width)
  if ('refused' in box) return box
  const cells: Cell[] = []
  for (const x of STEP) for (const y of STEP) for (const z of STEP) {
    if (Math.abs(x) + Math.abs(y) + Math.abs(z) <= box.width) cells.push({ x, y, z })
  }
  return cells
}

function tip(cells: readonly Cell[], edge: -1 | 1): number {
  return cells.filter(cell => cell.x === edge || cell.y === edge || cell.z === edge).length
}

export function nerve(): { cells: 7; core: 1; floor: 3; ceiling: 3; boundary: 'ceiling'; horizon: null; synapse: 1; network: null; route: 'feeling-and-phrase'; pulse: null; signal: null; body: null; lit: false } | { refused: string } {
  const cells = lattice(1)
  if ('refused' in cells) return cells
  const insula = connectInsula()
  const synapse = synapseMap()
  if (cells.length !== 7 || synapse.factor !== 1 || synapse.network !== null || insula.pulse !== null || insula.signal !== null) {
    return { refused: 'The lattice left the diamond. Nothing was lit.' }
  }
  return {
    cells: 7,
    core: 1,
    floor: tip(cells, -1),
    ceiling: tip(cells, 1),
    boundary: 'ceiling',
    horizon: null,
    synapse: synapse.factor,
    network: synapse.network,
    route: insula.route,
    pulse: insula.pulse,
    signal: insula.signal,
    body: null,
    lit: false,
  }
}

export function latticeWords(): string {
  const row = nerve()
  if ('refused' in row) return `${row.refused} The till is closed.`
  return `From the core, the diamond holds ${row.cells} cells. One is the origin. ${row.floor} sit on the floor, where a coordinate is -1. ${row.ceiling} sit on the ceiling, where a coordinate is 1. The space boundary this page can reach is the ${row.boundary}. The particle horizon is ${row.horizon}. Nothing past the ceiling was learned about the universe. The synapse factor is ${row.synapse}, so it does not expand. The insula route is ${row.route}. It orchestrates that path. The pulse is ${row.pulse} and the signal is ${row.signal}, so the nerve is not lit. No body is attached. Nothing was trained.`
}
