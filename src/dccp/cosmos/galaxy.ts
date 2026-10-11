/** The Milky Way pass. Named instruments, named objects, and catalogue counts.
 * The stellar disk is the barrier. The rows of those catalogues are not plotted.
 * A seat is a local observation. It is not an origin receipt and it grants nothing.
 */

export const R0_KPC = 8.2
export const DISK_KPC = 15
const OUT_S = 16
const BACK_S = 20
/** Objects closer than this, in kiloparsecs, are drawn as one bead. */
const GROUP_KPC = 0.05

export interface Scope {
  name: string
  where: 'ground' | 'orbit'
  band: string
}

export const SCOPES: readonly Scope[] = [
  { name: 'James Webb', where: 'orbit', band: 'infrared' },
  { name: 'Hubble', where: 'orbit', band: 'optical, ultraviolet, near-infrared' },
  { name: 'Gaia', where: 'orbit', band: 'astrometry' },
  { name: 'Hipparcos', where: 'orbit', band: 'astrometry' },
  { name: 'Chandra', where: 'orbit', band: 'X-ray' },
  { name: 'XMM-Newton', where: 'orbit', band: 'X-ray' },
  { name: 'Fermi', where: 'orbit', band: 'gamma ray' },
  { name: 'TESS', where: 'orbit', band: 'visible transits' },
  { name: 'Kepler', where: 'orbit', band: 'visible transits' },
  { name: 'Spitzer', where: 'orbit', band: 'infrared' },
  { name: 'WISE', where: 'orbit', band: 'mid-infrared' },
  { name: 'ALMA', where: 'ground', band: 'millimeter' },
  { name: 'VLT', where: 'ground', band: 'optical and infrared' },
  { name: 'Keck', where: 'ground', band: 'optical and infrared' },
  { name: 'Event Horizon Telescope', where: 'ground', band: 'millimeter very-long-baseline' },
  { name: 'VLA', where: 'ground', band: 'radio' },
  { name: 'Parkes', where: 'ground', band: 'radio' },
  { name: 'Blanco', where: 'ground', band: 'optical, DECam' },
  { name: '2MASS', where: 'ground', band: 'near-infrared, two 1.3 m telescopes' },
]

export type Kind = 'star' | 'cluster' | 'nebula' | 'remnant' | 'compact' | 'center' | 'cloud'

export interface Mark {
  id: string
  name: string
  kind: Kind
  /** Degrees. Zero looks from the Sun toward the center. */
  l: number
  b: number
  /** Kiloparsecs from the Sun. */
  sunKpc: number
  claim: 'REPORTED' | 'MODELED'
  by: readonly string[]
  note: string
}

export const MARKS: readonly Mark[] = [
  { id: 'sun', name: 'Sun', kind: 'star', l: 0, b: 0, sunKpc: 0, claim: 'REPORTED', by: ['Gaia'], note: 'Where this map sits. R0 is 8.2 kpc, a record, not a live reduction.' },
  { id: 'proxima', name: 'Proxima Centauri', kind: 'star', l: 313.94, b: -1.93, sunKpc: 0.0013, claim: 'REPORTED', by: ['Gaia'], note: 'The nearest star, about 1.3 parsecs. Drawn with the Sun. The disk scale cannot separate it.' },
  { id: 'barnard', name: "Barnard's Star", kind: 'star', l: 31.01, b: 14.06, sunKpc: 0.00183, claim: 'REPORTED', by: ['Gaia'], note: 'About 1.8 parsecs. Drawn with the Sun.' },
  { id: 'sirius', name: 'Sirius', kind: 'star', l: 227.23, b: -8.89, sunKpc: 0.00264, claim: 'REPORTED', by: ['Hipparcos', 'Gaia'], note: 'About 2.6 parsecs. Drawn with the Sun.' },
  { id: 'vega', name: 'Vega', kind: 'star', l: 67.45, b: 19.24, sunKpc: 0.00768, claim: 'REPORTED', by: ['Hipparcos'], note: 'About 7.7 parsecs. Drawn with the Sun.' },
  { id: 'trappist', name: 'TRAPPIST-1', kind: 'star', l: 69.71, b: -56.64, sunKpc: 0.0124, claim: 'REPORTED', by: ['Gaia', 'Spitzer', 'TESS'], note: 'About 12 parsecs. The planets were identified from transits. The TRAPPIST telescope itself is not in the instrument set this pass holds.' },
  { id: 'hyades', name: 'Hyades', kind: 'cluster', l: 180.08, b: -22.32, sunKpc: 0.046, claim: 'REPORTED', by: ['Gaia'], note: 'About 46 parsecs. Drawn with the Sun.' },
  { id: 'pleiades', name: 'Pleiades', kind: 'cluster', l: 166.6, b: -23.5, sunKpc: 0.136, claim: 'REPORTED', by: ['Gaia', 'Hubble'], note: 'About 136 parsecs. A record.' },
  { id: 'polaris', name: 'Polaris', kind: 'star', l: 123.28, b: 26.46, sunKpc: 0.137, claim: 'MODELED', by: ['Hipparcos'], note: 'Often given near 137 parsecs. Bright-star distances still move, so this stays a model.' },
  { id: 'betelgeuse', name: 'Betelgeuse', kind: 'star', l: 199.8, b: -8.9, sunKpc: 0.168, claim: 'MODELED', by: ['Hubble', 'Hipparcos'], note: 'Identified. The parsec is not one number, so this distance stays a model.' },
  { id: 'kepler-452', name: 'Kepler-452', kind: 'star', l: 77.86, b: 9.99, sunKpc: 0.55, claim: 'MODELED', by: ['Kepler'], note: 'The planet is the identified object. About 550 parsecs, near 1,800 light-years. Not a reduction redone here.' },
  { id: 'vela', name: 'Vela Pulsar', kind: 'compact', l: 263.55, b: -2.79, sunKpc: 0.287, claim: 'REPORTED', by: ['Chandra', 'Parkes'], note: 'About 287 parsecs, from the parallax. The supernova remnant is the same place at this scale.' },
  { id: 'orion', name: 'Orion Nebula', kind: 'nebula', l: 209, b: -19.4, sunKpc: 0.414, claim: 'REPORTED', by: ['Hubble', 'James Webb', 'Spitzer'], note: 'Messier 42. Drawn at 0.414 kpc, the published figure near 414 parsecs.' },
  { id: 'rosette', name: 'Rosette Nebula', kind: 'nebula', l: 206.31, b: -2.08, sunKpc: 1.4, claim: 'MODELED', by: ['Spitzer'], note: 'About 1.4 kpc. Papers do not share one distance.' },
  { id: 'cygnus-x', name: 'Cygnus X', kind: 'nebula', l: 80.03, b: 0.94, sunKpc: 1.4, claim: 'MODELED', by: ['Spitzer'], note: 'A star-forming complex, about 1.4 kpc. One distance does not cover every cloud in it.' },
  { id: 'lagoon', name: 'Lagoon Nebula', kind: 'nebula', l: 5.96, b: -1.17, sunKpc: 1.25, claim: 'MODELED', by: ['Hubble'], note: 'Messier 8. About 1.25 kpc.' },
  { id: 'trifid', name: 'Trifid Nebula', kind: 'nebula', l: 7, b: -0.25, sunKpc: 1.4, claim: 'MODELED', by: ['Hubble'], note: 'Messier 20. About 1.4 kpc. Not one published figure.' },
  { id: 'eagle', name: 'Eagle Nebula', kind: 'nebula', l: 16.95, b: 0.79, sunKpc: 1.8, claim: 'MODELED', by: ['Hubble', 'James Webb', 'Spitzer'], note: 'Messier 16. The pillars are this nebula. Near 1.8 kpc. Papers do not share one distance.' },
  { id: 'omega-nebula', name: 'Omega Nebula', kind: 'nebula', l: 15.05, b: -0.67, sunKpc: 1.8, claim: 'MODELED', by: ['Hubble', 'Spitzer'], note: 'Messier 17. About 1.8 kpc.' },
  { id: 'crab', name: 'Crab Nebula', kind: 'remnant', l: 184.6, b: -5.8, sunKpc: 2, claim: 'REPORTED', by: ['Hubble', 'Chandra', 'Fermi'], note: 'Messier 1, and the pulsar in it. About 2 kpc. Not a new reduction.' },
  { id: 'cygx1', name: 'Cygnus X-1', kind: 'compact', l: 71.34, b: 3.07, sunKpc: 2.22, claim: 'REPORTED', by: ['Chandra', 'XMM-Newton', 'VLA', 'Gaia'], note: 'A stellar black hole. About 2.22 kpc, Miller-Jones and collaborators, 2021.' },
  { id: 'carina', name: 'Carina Nebula', kind: 'nebula', l: 287.4, b: -0.6, sunKpc: 2.3, claim: 'REPORTED', by: ['Hubble', 'James Webb'], note: 'About 2.3 kpc. Eta Carinae sits in this complex. The Cosmic Cliffs are the edge of it.' },
  { id: 'casa', name: 'Cassiopeia A', kind: 'remnant', l: 111.73, b: -2.13, sunKpc: 3.4, claim: 'REPORTED', by: ['Chandra', 'Hubble', 'James Webb'], note: 'About 3.4 kpc.' },
  { id: 'm4', name: 'Messier 4', kind: 'cluster', l: 350.97, b: 15.97, sunKpc: 2.2, claim: 'REPORTED', by: ['Hubble', 'Gaia'], note: 'Globular cluster. Harris catalogue, 2010 edition, 2.2 kpc.' },
  { id: 'ngc6397', name: 'NGC 6397', kind: 'cluster', l: 338.17, b: -11.96, sunKpc: 2.3, claim: 'REPORTED', by: ['Hubble', 'Gaia'], note: 'Globular cluster. Harris 2010, 2.3 kpc.' },
  { id: 'm22', name: 'Messier 22', kind: 'cluster', l: 9.89, b: -7.55, sunKpc: 3.2, claim: 'REPORTED', by: ['Hubble', 'Gaia'], note: 'Globular cluster. Harris 2010, 3.2 kpc.' },
  { id: 'm71', name: 'Messier 71', kind: 'cluster', l: 56.75, b: -4.56, sunKpc: 4, claim: 'REPORTED', by: ['Hubble'], note: 'Globular cluster. Harris 2010, 4.0 kpc.' },
  { id: 'ngc6752', name: 'NGC 6752', kind: 'cluster', l: 336.49, b: -25.63, sunKpc: 4, claim: 'REPORTED', by: ['Hubble', 'Gaia'], note: 'Globular cluster. Harris 2010, 4.0 kpc.' },
  { id: 'm10', name: 'Messier 10', kind: 'cluster', l: 15.14, b: 23.08, sunKpc: 4.4, claim: 'REPORTED', by: ['Hubble'], note: 'Globular cluster. Harris 2010, 4.4 kpc.' },
  { id: '47tuc', name: '47 Tucanae', kind: 'cluster', l: 305.89, b: -44.89, sunKpc: 4.5, claim: 'REPORTED', by: ['Hubble', 'VLT', 'Gaia'], note: 'Globular cluster. Harris 2010, 4.5 kpc. Later work sits near 4.45. This pass holds the catalogue figure.' },
  { id: 'm12', name: 'Messier 12', kind: 'cluster', l: 15.72, b: 26.31, sunKpc: 4.8, claim: 'REPORTED', by: ['Hubble'], note: 'Globular cluster. Harris 2010, 4.8 kpc.' },
  { id: 'omega', name: 'Omega Centauri', kind: 'cluster', l: 309.1, b: 14.97, sunKpc: 5.2, claim: 'REPORTED', by: ['Gaia', 'Hubble'], note: 'Globular cluster. Harris 2010, 5.2 kpc. A later figure near 5.4 is not the one held.' },
  { id: 'm107', name: 'Messier 107', kind: 'cluster', l: 3.37, b: 23.01, sunKpc: 6.4, claim: 'REPORTED', by: ['Hubble'], note: 'Globular cluster. Harris 2010, 6.4 kpc.' },
  { id: 'terzan5', name: 'Terzan 5', kind: 'cluster', l: 3.84, b: 1.69, sunKpc: 6.9, claim: 'REPORTED', by: ['Hubble', 'VLT'], note: 'A bulge cluster. Harris 2010, 6.9 kpc.' },
  { id: 'm13', name: 'Messier 13', kind: 'cluster', l: 59.01, b: 40.91, sunKpc: 7.1, claim: 'REPORTED', by: ['Hubble'], note: 'Globular cluster. Harris 2010, 7.1 kpc.' },
  { id: 'm5', name: 'Messier 5', kind: 'cluster', l: 3.86, b: 46.8, sunKpc: 7.5, claim: 'REPORTED', by: ['Hubble'], note: 'Globular cluster. Harris 2010, 7.5 kpc.' },
  { id: 'm92', name: 'Messier 92', kind: 'cluster', l: 68.34, b: 34.86, sunKpc: 8.3, claim: 'REPORTED', by: ['Hubble', 'Gaia'], note: 'Globular cluster. Harris 2010, 8.3 kpc.' },
  { id: 'sgr-a', name: 'Sagittarius A*', kind: 'center', l: 0, b: 0, sunKpc: R0_KPC, claim: 'REPORTED', by: ['Event Horizon Telescope', 'VLT', 'Keck', 'VLA'], note: 'The center. The shadow image is the 2022 array result. The distance is the R0 we hold.' },
  { id: 'arches', name: 'Arches Cluster', kind: 'cluster', l: 0.12, b: 0.02, sunKpc: R0_KPC, claim: 'MODELED', by: ['Hubble', 'VLT', 'Keck'], note: 'Drawn with the center. The distance is the R0 we hold, not a separate reduction.' },
  { id: 'quintuplet', name: 'Quintuplet Cluster', kind: 'cluster', l: 0.16, b: -0.06, sunKpc: R0_KPC, claim: 'MODELED', by: ['Hubble', 'Keck'], note: 'Drawn with the center. The distance is the R0 we hold.' },
  { id: 'sgr-b2', name: 'Sagittarius B2', kind: 'cloud', l: 0.67, b: -0.04, sunKpc: R0_KPC, claim: 'MODELED', by: ['ALMA'], note: 'A molecular cloud at the center. The distance is the R0 we hold. ALMA resolved the chemistry. The rows are not loaded.' },
  { id: 'm80', name: 'Messier 80', kind: 'cluster', l: 352.67, b: 19.46, sunKpc: 10, claim: 'REPORTED', by: ['Hubble'], note: 'Globular cluster. Harris 2010, 10.0 kpc.' },
  { id: 'm3', name: 'Messier 3', kind: 'cluster', l: 42.22, b: 78.71, sunKpc: 10.2, claim: 'REPORTED', by: ['Hubble'], note: 'Globular cluster. Harris 2010, 10.2 kpc.' },
  { id: 'm15', name: 'Messier 15', kind: 'cluster', l: 65.01, b: -27.31, sunKpc: 10.4, claim: 'REPORTED', by: ['Hubble', 'Chandra'], note: 'Globular cluster. Harris 2010, 10.4 kpc.' },
  { id: 'm2', name: 'Messier 2', kind: 'cluster', l: 53.37, b: -35.77, sunKpc: 11.5, claim: 'REPORTED', by: ['Hubble'], note: 'Globular cluster. Harris 2010, 11.5 kpc.' },
]

/** Known, and not seated. Past the stellar disk. */
export const BEYOND: readonly Mark[] = [
  { id: 'lmc', name: 'Large Magellanic Cloud', kind: 'cloud', l: 280.47, b: -32.89, sunKpc: 50, claim: 'REPORTED', by: ['Hubble', 'Gaia'], note: 'A satellite, about 50 kpc.' },
  { id: 'smc', name: 'Small Magellanic Cloud', kind: 'cloud', l: 302.81, b: -44.33, sunKpc: 62, claim: 'REPORTED', by: ['Hubble', 'Gaia'], note: 'A satellite, about 62 kpc.' },
  { id: 'ngc2419', name: 'NGC 2419', kind: 'cluster', l: 180.37, b: 25.24, sunKpc: 82.6, claim: 'REPORTED', by: ['Hubble'], note: 'Harris 2010. A globular in the outer halo, 82.6 kpc from the Sun.' },
  { id: 'm31', name: 'Andromeda', kind: 'cloud', l: 121.17, b: -21.57, sunKpc: 765, claim: 'REPORTED', by: ['Hubble'], note: 'Another galaxy.' },
]

export interface Survey {
  id: string
  name: string
  /** Null when the count is a compiled catalogue, not one telescope. */
  by: string | null
  count: string
  note: string
}

export const SURVEYS: readonly Survey[] = [
  { id: 'gaia-dr3', name: 'Gaia Data Release 3', by: 'Gaia', count: '1,811,709,771 sources', note: 'ESA, 13 June 2022. Positions for that many. The rows are not plotted.' },
  { id: 'decaps2', name: 'DECaPS2', by: 'Blanco', count: '3.32 billion objects', note: 'Southern galactic plane, optical and near-infrared. Saydjari and collaborators, 2023. The rows are not plotted.' },
  { id: 'twomass', name: '2MASS Point Source Catalog', by: '2MASS', count: '470,992,970 sources', note: 'All-sky near-infrared. The rows are not plotted.' },
  { id: 'allwise', name: 'AllWISE', by: 'WISE', count: '747,634,026 objects', note: 'All-sky mid-infrared. The rows are not plotted.' },
  { id: 'hipparcos', name: 'Hipparcos', by: 'Hipparcos', count: '118,218 stars', note: 'ESA, 1997. The rows are not plotted.' },
  { id: 'harris', name: 'Harris globular catalogue', by: null, count: '157 clusters in the 2010 edition', note: 'A compiled catalogue, not one telescope. The named clusters in this pass are seated. The rest of the rows are not plotted.' },
]

export interface Place {
  x: number
  y: number
  z: number
  /** Kiloparsecs from the galactic center. */
  r: number
}

/** Center at the origin. The Sun sits on +x at R0. */
export function galactocentric(mark: Pick<Mark, 'l' | 'b' | 'sunKpc'>): Place {
  const l = (mark.l * Math.PI) / 180
  const b = (mark.b * Math.PI) / 180
  const x = R0_KPC - mark.sunKpc * Math.cos(b) * Math.cos(l)
  const y = mark.sunKpc * Math.cos(b) * Math.sin(l)
  const z = mark.sunKpc * Math.sin(b)
  return { x, y, z, r: Math.hypot(x, y, z) }
}

function apart(a: Place, b: Place): number {
  return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z)
}

/** One bead per place. Neighbors closer than GROUP_KPC share it. */
export function drawnMarks(): readonly Mark[] {
  const kept: Mark[] = []
  for (const mark of MARKS) {
    const here = galactocentric(mark)
    if (kept.some(other => apart(here, galactocentric(other)) < GROUP_KPC)) continue
    kept.push(mark)
  }
  return kept
}

export function companions(mark: Mark): Mark[] {
  const here = galactocentric(mark)
  return MARKS.filter(other => other.id !== mark.id && apart(here, galactocentric(other)) < GROUP_KPC)
}

const M_NOTE = /Messier\s+(\d+)/i

/** Landings only. A Messier number in the name or the note. Nothing else is a destination. */
export function messierLandings(): { mark: Mark; label: string; number: number }[] {
  const rows: { mark: Mark; label: string; number: number }[] = []
  for (const mark of MARKS) {
    const hit = `${mark.name} ${mark.note}`.match(M_NOTE)
    if (!hit) continue
    rows.push({ mark, label: `M${hit[1]} ${mark.name}`, number: Number(hit[1]) })
  }
  return rows.sort((a, b) => a.number - b.number)
}

/** IAU J2000: equatorial = Mᵀ × galactic. North galactic pole checks near 192.86°, +27.13°. */
const GAL_TO_EQ = [
  [-0.0548755604162154, 0.4941094278755837, -0.8676661490190047],
  [-0.873437090234885, -0.4448296299600112, -0.1980763734312015],
  [-0.4838350155487132, 0.7469822444972189, 0.4559837761750669],
] as const

export function equatorialOf(lDeg: number, bDeg: number): { x: number; y: number; z: number } {
  const l = (lDeg * Math.PI) / 180
  const b = (bDeg * Math.PI) / 180
  const g = [Math.cos(b) * Math.cos(l), Math.cos(b) * Math.sin(l), Math.sin(b)]
  return {
    x: GAL_TO_EQ[0][0] * g[0] + GAL_TO_EQ[0][1] * g[1] + GAL_TO_EQ[0][2] * g[2],
    y: GAL_TO_EQ[1][0] * g[0] + GAL_TO_EQ[1][1] * g[1] + GAL_TO_EQ[1][2] * g[2],
    z: GAL_TO_EQ[2][0] * g[0] + GAL_TO_EQ[2][1] * g[1] + GAL_TO_EQ[2][2] * g[2],
  }
}

const OBL = (23.4392911 * Math.PI) / 180
/** 1 parsec in AU. A kiloparsec is a thousand of these. */
export const KPC_AU = 206_264.806247 * 1000

/** Same axes as the solar system: x ecliptic, y ecliptic north, z the other ecliptic axis. */
export function messierScene(mark: Pick<Mark, 'l' | 'b' | 'sunKpc'>): { x: number; y: number; z: number; au: number } {
  const eq = equatorialOf(mark.l, mark.b)
  const c = Math.cos(OBL)
  const s = Math.sin(OBL)
  const xe = eq.x
  const ye = eq.y * c + eq.z * s
  const ze = -eq.y * s + eq.z * c
  return { x: xe, y: ze, z: ye, au: mark.sunKpc * KPC_AU }
}

export function correlate(mark: Mark): { seated: boolean; verdict: 'SEE' | 'HOLE'; words: string } {
  const known = new Set(SCOPES.map(scope => scope.name))
  const missing = mark.by.filter(name => !known.has(name))
  const place = galactocentric(mark)
  if (missing.length || place.r > DISK_KPC) {
    const why = missing.length ? `This pass does not hold ${missing.join(', ')}.` : `It sits ${place.r.toFixed(1)} kpc from the center, past the ${DISK_KPC} kpc disk.`
    return {
      seated: false,
      verdict: 'HOLE',
      words: `${mark.name} is not seated. ${why} DCLM is not asked. There is no origin receipt. Authority stays none.`,
    }
  }
  const instruments = mark.by.map(name => SCOPES.find(scope => scope.name === name)!)
  return {
    seated: true,
    verdict: 'SEE',
    words: `${mark.name} is seated. ${mark.claim}. ${mark.note} Instruments: ${instruments.map(scope => `${scope.name}, ${scope.where}, ${scope.band}`).join('; ')}. DCLM correlation on this page: the instrument is named here, and the mark is inside the disk. Local observation only. No ingest was sent, so there is no origin receipt. Authority none.`,
  }
}

export function surveyLine(): string {
  return `${SURVEYS.map(survey => `${survey.name}, ${survey.count}`).join('. ')}. Those rows are not plotted.`
}

export interface Pass {
  phase: 'out' | 'back' | 'held'
  radius: number
  lit: string[]
  words: string
}

function scopeCount(): string {
  const orbit = SCOPES.filter(scope => scope.where === 'orbit').length
  const ground = SCOPES.length - orbit
  return `${orbit} instruments in orbit and ${ground} on the ground are named. Not every telescope. Only the ones a seated mark or a held count uses.`
}

export function milkPass(elapsed: number, reduced = false): Pass {
  const all = MARKS.filter(mark => correlate(mark).seated).map(mark => mark.id)
  if (reduced || elapsed >= OUT_S + BACK_S) {
    return {
      phase: 'held',
      radius: 0,
      lit: all,
      words: `Filled back to Sagittarius A*. ${all.length} marks inside ${DISK_KPC} kpc. ${scopeCount()} ${SURVEYS.length} catalogues are counts, not dots. Archives are not loaded. Past the stellar disk is still the barrier.`,
    }
  }
  if (elapsed < OUT_S) {
    const radius = R0_KPC + ((DISK_KPC - R0_KPC) * elapsed) / OUT_S
    return {
      phase: 'out',
      radius,
      lit: [],
      words: `Outward, ${radius.toFixed(1)} of ${DISK_KPC} kpc. Correlating before the barrier. ${scopeCount()} Nothing past the disk is seated. Nothing lights until the turn.`,
    }
  }
  const radius = DISK_KPC * (1 - (elapsed - OUT_S) / BACK_S)
  const lit = MARKS.filter(mark => correlate(mark).seated && galactocentric(mark).r + 0.2 >= radius).map(mark => mark.id)
  const waiting = lit.length === 0 ? ' No named mark sits on the rim. The first lights when the front reaches it.' : ''
  return {
    phase: 'back',
    radius,
    lit,
    words: `Turned at ${DISK_KPC} kpc. Filling inward. The front is ${radius.toFixed(1)} kpc from the center. ${lit.length} of ${all.length} marks lit.${waiting}`,
  }
}

export function bandLines(pass: Pass): string[] {
  const seated = MARKS.filter(mark => correlate(mark).seated).length
  if (pass.phase === 'out') {
    return [
      `Going out. Front at ${pass.radius.toFixed(1)} of ${DISK_KPC} kpc. Nothing lights until the rim.`,
      `${seated} named marks inside the disk. ${SURVEYS.length} catalogues held as counts, not plotted.`,
      'DCLM correlation is local. No ingest, no origin receipt. Authority none.',
    ]
  }
  if (pass.phase === 'back') {
    const waiting = pass.lit.length === 0 ? ' None on the rim yet.' : ''
    return [
      `Turned at the rim. Filling inward. Front ${pass.radius.toFixed(1)} kpc from the core.${waiting}`,
      `${pass.lit.length} of ${seated} marks lit, outer ones first.`,
      'Tap a lit mark. Archives are not loaded.',
    ]
  }
  return [
    `Back at Sagittarius A*. ${seated} marks lit inside ${DISK_KPC} kpc.`,
    'Counts, not dots: Gaia 1,811,709,771. DECaPS2 3.32 billion. 2MASS 470,992,970. AllWISE 747,634,026. Hipparcos 118,218. Harris 157.',
    'Satellites and Andromeda stay past the barrier. Tap a mark to read the seat.',
  ]
}

function bestMark(rows: readonly Mark[], lower: string): Mark | undefined {
  let best: Mark | undefined
  let score = 0
  for (const row of rows) {
    const name = row.name.toLowerCase()
    const id = row.id.replace(/-/g, ' ')
    const hit = lower.includes(name) ? name.length : lower.includes(id) ? id.length : 0
    if (hit > score) {
      best = row
      score = hit
    }
  }
  return best
}

export function galaxySpeech(text: string): string | null {
  const lower = text.toLowerCase()
  if (/\bandromeda\b|\bm31\b|\bmagellanic\b|\blmc\b|\bsmc\b|\bquasar\b|\bother galax/.test(lower)) {
    return `That sits past the stellar disk we hold, ${DISK_KPC} kpc. This pass does not cross it. The Milky Way is the barrier until the marks we have are filled back to the center.`
  }
  const beyond = bestMark(BEYOND, lower)
  if (beyond) return correlate(beyond).words
  const mark = bestMark(MARKS, lower)
  if (mark) return correlate(mark).words
  if (/\bmilky way\b|\bgalaxy\b|\bwebb\b|\bhubble\b|\bgaia\b|\balma\b|\btelescope\b|\bgalactic\b|\bcatalogue\b|\bcatalog\b/.test(lower)) {
    const held = milkPass(OUT_S + BACK_S)
    return `The Milky Way, not the rest of the universe. ${held.words} ${surveyLine()} James Webb and Hubble are named. Their pictures are not ingested.`
  }
  return null
}
