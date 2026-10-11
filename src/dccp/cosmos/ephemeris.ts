/** Mean Kepler sky. MODELED, not a JPL ephemeris.
 * Elements are the usual J2000 mean set (a in AU, angles in degrees, n in deg/day).
 * Reverse time is this same function at an earlier instant.
 */

const DAY = 86_400_000
export const J2000 = Date.UTC(2000, 0, 1, 12, 0, 0)
export const AU_M = 149_597_870_700
export const G = 6.6743e-11

export interface Elements {
  name: string
  a: number
  e: number
  i: number
  L: number
  wbar: number
  Omega: number
  n: number
}

export const PLANETS: readonly Elements[] = [
  { name: 'Mercury', a: 0.387098, e: 0.20563, i: 7.00487, L: 252.25084, wbar: 77.45645, Omega: 48.33167, n: 4.09233445 },
  { name: 'Venus', a: 0.723332, e: 0.006772, i: 3.39471, L: 181.97973, wbar: 131.53298, Omega: 76.68069, n: 1.60213034 },
  { name: 'Earth', a: 1, e: 0.016708, i: 0.00005, L: 100.46435, wbar: 102.94719, Omega: -11.26064, n: 0.98564736 },
  { name: 'Mars', a: 1.523679, e: 0.0934, i: 1.84969, L: 355.45332, wbar: 336.04084, Omega: 49.55954, n: 0.52403293 },
  { name: 'Jupiter', a: 5.2026, e: 0.048498, i: 1.30327, L: 34.40438, wbar: 14.33139, Omega: 100.46444, n: 0.08308529 },
  { name: 'Saturn', a: 9.5549, e: 0.055508, i: 2.48888, L: 49.94432, wbar: 93.05679, Omega: 113.66552, n: 0.03344414 },
  { name: 'Uranus', a: 19.2184, e: 0.046381, i: 0.7732, L: 313.23218, wbar: 173.00529, Omega: 74.00595, n: 0.01172834 },
  { name: 'Neptune', a: 30.1104, e: 0.009456, i: 1.76995, L: 304.88003, wbar: 48.12374, Omega: 131.78406, n: 0.00599514 },
]

/** Geocentric. a is in AU so the same solver can place it. */
export const MOON: Elements = {
  name: 'Moon',
  a: 384_400_000 / AU_M,
  e: 0.0549,
  i: 5.145,
  L: 218.316,
  wbar: 83.353,
  Omega: 125.045,
  n: 13.176358,
}

export interface Place {
  x: number
  y: number
  z: number
  au: number
}

const rad = (d: number): number => (d * Math.PI) / 180

function kepler(el: Elements, epochMs: number): Place {
  const days = (epochMs - J2000) / DAY
  const M = rad(el.L - el.wbar + el.n * days)
  let E = M
  for (let k = 0; k < 12; k++) E = M + el.e * Math.sin(E)
  const r = el.a * (1 - el.e * Math.cos(E))
  const nu = Math.atan2(Math.sqrt(1 - el.e * el.e) * Math.sin(E), Math.cos(E) - el.e)
  const w = rad(el.wbar - el.Omega)
  const Om = rad(el.Omega)
  const inc = rad(el.i)
  const u = nu + w
  const x = r * (Math.cos(Om) * Math.cos(u) - Math.sin(Om) * Math.sin(u) * Math.cos(inc))
  const yEcl = r * (Math.sin(Om) * Math.cos(u) + Math.cos(Om) * Math.sin(u) * Math.cos(inc))
  const zEcl = r * Math.sin(u) * Math.sin(inc)
  return { x, y: zEcl, z: yEcl, au: r }
}

export function heliocentric(name: string, epochMs: number): Place {
  const el = PLANETS.find(p => p.name === name)
  if (!el) throw new Error(`no planet ${name}`)
  return kepler(el, epochMs)
}

/** Where a body sits as seen from Earth. Sun is the opposite of Earth's heliocentric place. */
export function geocentric(name: string, epochMs: number): Place {
  const earth = kepler(PLANETS[2], epochMs)
  if (name === 'Sun') {
    const au = Math.hypot(earth.x, earth.y, earth.z)
    return { x: -earth.x, y: -earth.y, z: -earth.z, au }
  }
  if (name === 'Moon') return kepler(MOON, epochMs)
  const body = heliocentric(name, epochMs)
  const x = body.x - earth.x
  const y = body.y - earth.y
  const z = body.z - earth.z
  return { x, y, z, au: Math.hypot(x, y, z) }
}

/** Picture radius only. The AU on the place is the distance. Log so Neptune fits without claiming the picture is to scale. */
export function skyRadius(au: number): number {
  return 22 + 62 * Math.log10(Math.max(au, 0.002) / 0.002)
}

export function pairwiseForce(m1: number, m2: number, metres: number): number {
  return (G * m1 * m2) / (metres * metres)
}

/** Masses Idris tabulated (kg). Used only to check we rank the same pairs. */
export const MASS = {
  Sun: 1.989e30,
  Jupiter: 1.898e27,
  Earth: 5.97e24,
  Moon: 7.3e22,
} as const
