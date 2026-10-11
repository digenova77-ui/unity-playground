/** Memory is a court. Time walks the plan. A full circuit starts the next level.
 * An exchange that was never stored is not a bay.
 */

export interface Bay {
  index: number
  level: number
  x: number
  z: number
  heard: string
  said: string
  at: number
}

const SIDE = 8
const STEP = 2.55

export function memoryPlan(rows: readonly { at: number; heard: string; said: string }[]): Bay[] {
  const span = SIDE * STEP
  const half = span / 2 - STEP / 2
  return rows.map((row, index) => {
    const level = Math.floor(index / (SIDE * 4))
    const onLevel = index % (SIDE * 4)
    const side = Math.floor(onLevel / SIDE)
    const step = onLevel % SIDE
    const along = -half + step * STEP
    let x = 0
    let z = 0
    if (side === 0) { x = along; z = half }
    else if (side === 1) { x = half; z = -along }
    else if (side === 2) { x = -along; z = -half }
    else { x = -half; z = along }
    return { index, level, x, z, heard: row.heard, said: row.said, at: row.at }
  })
}
