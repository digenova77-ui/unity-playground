/** The standard table, seated by period and group.
 * The notes this workspace holds do not contain a second schematic.
 * A property that is not the seat is not printed.
 */

export interface Element {
  z: number
  symbol: string
  name: string
  period: number
  group: number
  block: 's' | 'p' | 'd' | 'f'
}

const MAIN: [number, number, string, string][] = [
  [1, 1, 'H', 'Hydrogen'], [2, 18, 'He', 'Helium'],
  [3, 1, 'Li', 'Lithium'], [4, 2, 'Be', 'Beryllium'], [5, 13, 'B', 'Boron'], [6, 14, 'C', 'Carbon'], [7, 15, 'N', 'Nitrogen'], [8, 16, 'O', 'Oxygen'], [9, 17, 'F', 'Fluorine'], [10, 18, 'Ne', 'Neon'],
  [11, 1, 'Na', 'Sodium'], [12, 2, 'Mg', 'Magnesium'], [13, 13, 'Al', 'Aluminium'], [14, 14, 'Si', 'Silicon'], [15, 15, 'P', 'Phosphorus'], [16, 16, 'S', 'Sulfur'], [17, 17, 'Cl', 'Chlorine'], [18, 18, 'Ar', 'Argon'],
  [19, 1, 'K', 'Potassium'], [20, 2, 'Ca', 'Calcium'], [21, 3, 'Sc', 'Scandium'], [22, 4, 'Ti', 'Titanium'], [23, 5, 'V', 'Vanadium'], [24, 6, 'Cr', 'Chromium'], [25, 7, 'Mn', 'Manganese'], [26, 8, 'Fe', 'Iron'], [27, 9, 'Co', 'Cobalt'], [28, 10, 'Ni', 'Nickel'], [29, 11, 'Cu', 'Copper'], [30, 12, 'Zn', 'Zinc'], [31, 13, 'Ga', 'Gallium'], [32, 14, 'Ge', 'Germanium'], [33, 15, 'As', 'Arsenic'], [34, 16, 'Se', 'Selenium'], [35, 17, 'Br', 'Bromine'], [36, 18, 'Kr', 'Krypton'],
  [37, 1, 'Rb', 'Rubidium'], [38, 2, 'Sr', 'Strontium'], [39, 3, 'Y', 'Yttrium'], [40, 4, 'Zr', 'Zirconium'], [41, 5, 'Nb', 'Niobium'], [42, 6, 'Mo', 'Molybdenum'], [43, 7, 'Tc', 'Technetium'], [44, 8, 'Ru', 'Ruthenium'], [45, 9, 'Rh', 'Rhodium'], [46, 10, 'Pd', 'Palladium'], [47, 11, 'Ag', 'Silver'], [48, 12, 'Cd', 'Cadmium'], [49, 13, 'In', 'Indium'], [50, 14, 'Sn', 'Tin'], [51, 15, 'Sb', 'Antimony'], [52, 16, 'Te', 'Tellurium'], [53, 17, 'I', 'Iodine'], [54, 18, 'Xe', 'Xenon'],
  [55, 1, 'Cs', 'Caesium'], [56, 2, 'Ba', 'Barium'],
  [72, 4, 'Hf', 'Hafnium'], [73, 5, 'Ta', 'Tantalum'], [74, 6, 'W', 'Tungsten'], [75, 7, 'Re', 'Rhenium'], [76, 8, 'Os', 'Osmium'], [77, 9, 'Ir', 'Iridium'], [78, 10, 'Pt', 'Platinum'], [79, 11, 'Au', 'Gold'], [80, 12, 'Hg', 'Mercury'], [81, 13, 'Tl', 'Thallium'], [82, 14, 'Pb', 'Lead'], [83, 15, 'Bi', 'Bismuth'], [84, 16, 'Po', 'Polonium'], [85, 17, 'At', 'Astatine'], [86, 18, 'Rn', 'Radon'],
  [87, 1, 'Fr', 'Francium'], [88, 2, 'Ra', 'Radium'],
  [104, 4, 'Rf', 'Rutherfordium'], [105, 5, 'Db', 'Dubnium'], [106, 6, 'Sg', 'Seaborgium'], [107, 7, 'Bh', 'Bohrium'], [108, 8, 'Hs', 'Hassium'], [109, 9, 'Mt', 'Meitnerium'], [110, 10, 'Ds', 'Darmstadtium'], [111, 11, 'Rg', 'Roentgenium'], [112, 12, 'Cn', 'Copernicium'], [113, 13, 'Nh', 'Nihonium'], [114, 14, 'Fl', 'Flerovium'], [115, 15, 'Mc', 'Moscovium'], [116, 16, 'Lv', 'Livermorium'], [117, 17, 'Ts', 'Tennessine'], [118, 18, 'Og', 'Oganesson'],
]

const LANTHANIDE = ['La', 'Lanthanum', 'Ce', 'Cerium', 'Pr', 'Praseodymium', 'Nd', 'Neodymium', 'Pm', 'Promethium', 'Sm', 'Samarium', 'Eu', 'Europium', 'Gd', 'Gadolinium', 'Tb', 'Terbium', 'Dy', 'Dysprosium', 'Ho', 'Holmium', 'Er', 'Erbium', 'Tm', 'Thulium', 'Yb', 'Ytterbium', 'Lu', 'Lutetium']
const ACTINIDE = ['Ac', 'Actinium', 'Th', 'Thorium', 'Pa', 'Protactinium', 'U', 'Uranium', 'Np', 'Neptunium', 'Pu', 'Plutonium', 'Am', 'Americium', 'Cm', 'Curium', 'Bk', 'Berkelium', 'Cf', 'Californium', 'Es', 'Einsteinium', 'Fm', 'Fermium', 'Md', 'Mendelevium', 'No', 'Nobelium', 'Lr', 'Lawrencium']

function blockOf(group: number, symbol: string): Element['block'] {
  if (symbol === 'He') return 'p'
  if (group <= 2) return 's'
  if (group <= 12) return 'd'
  return 'p'
}

function periodOf(z: number): number {
  if (z <= 2) return 1
  if (z <= 10) return 2
  if (z <= 18) return 3
  if (z <= 36) return 4
  if (z <= 54) return 5
  if (z <= 86) return 6
  return 7
}

function shelf(rows: string[], z0: number): Element[] {
  const out: Element[] = []
  for (let i = 0; i < rows.length; i += 2) out.push({ z: z0 + i / 2, symbol: rows[i], name: rows[i + 1], period: z0 === 57 ? 6 : 7, group: 0, block: 'f' })
  return out
}

export const ELEMENTS: Element[] = [
  ...MAIN.map(([z, group, symbol, name]) => ({ z, symbol, name, period: periodOf(z), group, block: blockOf(group, symbol) })),
  ...shelf(LANTHANIDE, 57),
  ...shelf(ACTINIDE, 89),
].sort((a, b) => a.z - b.z)

export const LIFE = ['H', 'C', 'N', 'O', 'P', 'S'] as const

export function elementBy(token: string): Element | undefined {
  const t = token.trim().toLowerCase()
  return ELEMENTS.find(el => el.name.toLowerCase() === t || el.symbol.toLowerCase() === t)
}

export function seatOf(el: Element): { x: number; z: number } {
  if (el.block === 'f') {
    const i = el.z >= 89 ? el.z - 89 : el.z - 57
    return { x: (i - 7) * 0.4, z: el.z >= 89 ? 3.15 : 2.6 }
  }
  return { x: (el.group - 9.5) * 0.4, z: (el.period - 4) * 0.46 }
}

export type Desk = 'math' | 'physics' | 'chemistry' | 'biology' | 'life'

export interface TableAsk {
  desk: Desk
  mark: string | null
  life: boolean
  lines: string[]
  speech: string
}

const NOTE = 'The notes this pass can read do not hold a second periodic schematic. This is the standard table, 118 elements, seated by period and group.'

export function tableAsk(utterance: string): TableAsk | null {
  const t = utterance.trim().toLowerCase()
  if (/\bcarbon dioxide\b|\bco2\b/.test(t)) return null
  const named = ELEMENTS.find(el => new RegExp(`\\b${el.name.toLowerCase()}\\b`).test(t))
  const sym = t.match(/\belement\s+([a-z]{1,2})\b/)
  const bySymbol = sym ? ELEMENTS.find(el => el.symbol.toLowerCase() === sym[1]) : undefined
  const el = named ?? bySymbol
  const desk: Desk | null = /\blife sciences?\b|\blife science\b/.test(t) ? 'life'
    : /\bbiology\b/.test(t) ? 'biology'
    : /\bphysics\b/.test(t) ? 'physics'
    : /\bchemistry\b|\bperiodic\b|\bthe elements\b/.test(t) ? 'chemistry'
    : /\bengineering\b/.test(t) ? 'chemistry'
    : /\bmath\b/.test(t) && !/\bclose the math\b|\bmathematics\b|\bworth\b/.test(t) ? 'math'
    : null
  if (!el && !desk && !/\bperiodic table\b/.test(t)) return null
  const life = desk === 'life' || desk === 'biology'
  const mark = el?.symbol ?? null
  const lines = el
    ? [`${el.symbol} ${el.z}`, `Period ${el.period}`, el.group ? `Group ${el.group}` : 'f-block shelf', `${el.block}-block`]
    : ['118 elements', 'Period and group', 'No extra property']
  const where = el
    ? `${el.name}, ${el.symbol}, number ${el.z}. ${el.group ? `Period ${el.period}, group ${el.group}.` : `Period ${el.period}, on the f-block shelf.`}`
    : 'The table is up.'
  const bay = desk === 'math'
    ? 'Math on this bay is the decision matrix. No new number is printed on an element.'
    : desk === 'physics'
      ? 'Physics on this bay is the mesh and the engine. No new constant is printed on an element.'
      : life
        ? 'Life sciences and biology use this table. Hydrogen, carbon, nitrogen, oxygen, phosphorus, and sulfur are lit. A cell, a species, or a pathway is not on this desk.'
        : 'Chemistry is this table. Math, physics, biology, and life sciences are the other desks around it.'
  return { desk: desk ?? 'chemistry', mark, life, lines, speech: `The sandbox stays Universal. ${where} ${bay} ${NOTE}` }
}
