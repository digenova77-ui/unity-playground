/** The vision module is the picture already drawn. It does not see the world. The insula moves nothing. */

import { webglCeiling } from '../engine/pace.ts'
import { EARTH_R } from '../world/entity.ts'
import { connectInsula } from './logic-tree.ts'

export function visionModule(): {
  kind: 'picture'
  api: 'webgl2'
  draw: 'gl.render'
  radius: number
  seesWorld: false
  camera: null
  insula: 'open'
  pulse: null
  moved: false
  both: true
} {
  const ceiling = webglCeiling()
  const joint = connectInsula()
  return {
    kind: 'picture',
    api: ceiling.api,
    draw: ceiling.draw,
    radius: EARTH_R,
    seesWorld: false,
    camera: null,
    insula: joint.place,
    pulse: joint.pulse,
    moved: false,
    both: true,
  }
}

export function visionWords(): string {
  const row = visionModule()
  return `The vision module is the picture. It uses ${row.api}, one ${row.draw} per frame, on a drawn radius of ${row.radius}. It does not see the world. No camera was attached. The insula is the open joint beside it. Nothing was moved across. The pulse is ${row.pulse}. The nerve is not lit. The till is closed. Both halves name this.`
}
