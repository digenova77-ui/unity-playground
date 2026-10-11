/** The easier target. A simulation of a world, not the world, and not a title. */

export const EARTH_R = 10

export function simEntity(): {
  kind: 'simulation'
  target: 'easier'
  radius: number
  isWorld: false
  minted: false
  dag: null
  both: true
} {
  return { kind: 'simulation', target: 'easier', radius: EARTH_R, isWorld: false, minted: false, dag: null, both: true }
}

export function simWords(): string {
  const row = simEntity()
  return `The easier target is the picture. The world entity is a ${row.kind}. The drawn radius is ${row.radius}. It is not the world. It does not mint what you already have. There is no DAG driving its time. A finer picture is still a picture. The till is closed. Both halves name this.`
}
