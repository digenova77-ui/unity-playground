/** Ontario amateur hockey, as captured 2026-09-12, plus the two outside books.
 * Clubs only. A player pack was not brought. A Unity ID is not a key for either book.
 * OHF is one Hockey Canada branch. HEO and HNO are the other two. They are not inside the OHF.
 */

export interface ClubGrid {
  id: string
  body: string
  clubs: string[]
  hole: string
}

export const BRANCHES = [
  { id: 'ohf', name: 'Ontario Hockey Federation', site: 'https://www.ohf.on.ca/' },
  { id: 'heo', name: 'Hockey Eastern Ontario', site: 'https://www.hockeyeasternontario.ca/' },
  { id: 'hno', name: 'Hockey Northwestern Ontario', site: 'https://www.hockeyhno.com/' },
] as const

export const OHF_MEMBERS = ['ALLIANCE', 'GTHL', 'NOHA', 'OHA', 'OHL', 'OMHA', 'OWHA'] as const

export const GRIDS: ClubGrid[] = [
  {
    id: 'omha',
    body: 'OHF member. East 11, West 9, U16 AAA 2026-27.',
    clubs: ['Ajax Pickering Raiders', 'Barrie Jr Colts', 'Central Ontario Wolves', 'Greater Kingston Gaels', 'Markham Waxers', 'North Central Predators', 'North Shore Whitecaps', 'Peterborough Petes', 'Quinte Red Devils', 'Whitby Wildcats', 'York Simcoe Express', 'Burlington Eagles', 'Credit River Capitals', 'Grey Bruce Highlanders', 'Guelph Jr Gryphons', 'Halton Hurricanes', 'Hamilton Steel', 'Niagara North Stars', 'Oakville Rangers', 'Southern Tier Admirals'],
    hole: 'Markham U16 had no club list. Grey-Bruce was partial. Player packs were not brought.',
  },
  {
    id: 'alliance',
    body: 'OHF member. Southwest. U16 AAA East 5, West 5.',
    clubs: ['Brantford 99ers', 'Cambridge Jr RedHawks', 'Huron-Perth Lakers', 'Kitchener Jr Rangers', 'Waterloo Wolves', 'Chatham-Kent Cyclones', 'Elgin-Middlesex Canucks', 'London Jr Knights', 'Sarnia-Lambton Jr Sting', 'Windsor Jr Spitfires'],
    hole: 'The age grids are not the same. Sun County is not on the U16 sheet.',
  },
  {
    id: 'gthl',
    body: 'OHF member. Toronto. Twelve AAA clubs.',
    clubs: ['Don Mills Flyers', 'Jr. Canadiens', 'Markham Majors', 'Mississauga Rebels', 'Mississauga Senators', 'North York Rangers', 'Reps Hockey Club', 'Toronto Marlboros', 'Toronto Red Wings', 'Toronto Titans', 'Toronto Young Nationals', 'Vaughan Kings'],
    hole: 'No central public roster. A player pack was not brought.',
  },
  {
    id: 'noha',
    body: 'OHF member. Great North Hockey League. U16 AAA is three clubs.',
    clubs: ['North Bay Trappers', 'Sudbury Wolves', 'Soo Jr. Greyhounds'],
    hole: 'U14 and U15 have no standalone sheet in the capture. Not the NOJHL.',
  },
  {
    id: 'heo',
    body: 'Its own branch. Not the OHF. U16 AAA is five clubs.',
    clubs: ['Eastern Ontario Wild', 'Ottawa Jr. 67s', 'Ottawa Myers Automotive', 'Ottawa Valley Titans', 'Upper Canada Cyclones'],
    hole: 'Ontario Hockey Academy is on the U18 grid only.',
  },
  {
    id: 'hno',
    body: 'Its own branch. Northwest, Thunder Bay.',
    clubs: [],
    hole: 'No HNO AAA club list was captured. Thunder Bay Kings were on the Great North sheet, not filed here as HNO.',
  },
]

export function booksFor(unityId: string | null): { found: false; said: string } {
  const who = unityId ? 'That Unity ID' : 'A Unity ID'
  return {
    found: false,
    said: `${who} is not an NCSA key and not an Elite Prospects key. Neither book was asked, and neither returned a person. NCSA is a recruiting network a player joins. It has no public hockey feed. Elite Prospects has an API, and a key is required. Youth coverage is a paid add-on. No key is held, so no player page was opened. The September capture kept clubs only.`,
  }
}

export function ontarioAsk(text: string): { title: string; lines: string[]; speech: string } | null {
  const t = text.toLowerCase()
  if (!/\bohf\b|\bheo\b|\bhno\b|\bncsa\b|elite ?prospects|\btriple-?a\b|\balliance\b|\bgthl\b|\bnoha\b|\bowha\b|\bontario aaa\b/.test(t)) return null
  const books = /\bncsa\b|elite ?prospects/.test(t)
  const grid = GRIDS.find(row => t.includes(row.id))
  const lines = [
    'Three Hockey Canada branches in Ontario: OHF, HEO, HNO.',
    `OHF members: ${OHF_MEMBERS.join(', ')}.`,
    grid ? `${grid.id.toUpperCase()}. ${grid.body} ${grid.clubs.join(' · ') || 'No clubs held.'} ${grid.hole}` : 'AAA is a level those bodies run. It is not a branch.',
    books ? booksFor(null).said : 'NCSA and Elite Prospects are outside books. A Unity ID does not open them.',
  ]
  const speech = `Ontario has three branches. The OHF is the large one, and its members are ${OHF_MEMBERS.join(', ')}. HEO is the east. HNO is the northwest. Triple-A is a level, not a body. The September capture holds the AAA clubs for OMHA, ALLIANCE, GTHL, NOHA, and HEO. ${grid ? grid.hole : 'Name a body and the clubs for that body are the ones held.'} ${booksFor(null).said}`
  return { title: 'Ontario', lines, speech }
}
