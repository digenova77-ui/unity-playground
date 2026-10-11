/** What Hockey Canada prints, and nothing that was not on the page.
 * The rule book was not copied. A penalty was not invented.
 */

export interface Door {
  id: string
  title: string
  url: string
  holds: string
}

export const DOORS: Door[] = [
  {
    id: 'bylaws',
    title: 'By-laws, Regulations and History, effective 2026-27',
    url: 'https://cdn.hockeycanada.ca/hockey-canada/Corporate/About/Downloads/2026-27-bylaws-e.pdf',
    holds: 'Playing Rules means the Official Rule Book, published as its own booklet. This edition was amended to June 2026.',
  },
  {
    id: 'downloads',
    title: 'Officiating downloads',
    url: 'https://www.hockeycanada.ca/en-ca/hockey-programs/officiating/downloads',
    holds: 'The rule book is a download and a free app. This page does not print the penalties.',
  },
  {
    id: 'rulebook',
    title: 'Official rule book',
    url: 'http://rulebook.hockeycanada.ca/',
    holds: 'The book is online. Rule 10.5 was opened: a player may not throw a stick or any other object on the playing surface. The rest of the book is not stored here.',
  },
  {
    id: 'safety',
    title: 'Safety programs',
    url: 'https://www.hockeycanada.ca/en-ca/hockey-programs/safety',
    holds: 'The Canadian Safe Sport Program is in effect as of April 1, 2025. Hockey Canada has adopted the Universal Code of Conduct to Prevent and Address Maltreatment in Sport. An independent third party handles complaints outside the Office of the Sport Integrity Commissioner.',
  },
  {
    id: 'report',
    title: 'Where a report goes',
    url: 'https://cces.ca/report-safe-sport',
    holds: 'The safety page points a national-level report to the Canadian Centre for Ethics in Sport, and other maltreatment complaints to sportcomplaints.ca.',
  },
  {
    id: 'guidelines',
    title: 'Community guidelines',
    url: 'https://www.hockeycanada.ca/en-ca/community-engagement/community-guidelines',
    holds: 'On their own platforms they do not allow personal attacks, discriminatory language, harassment, NSFW images, commercial pitches, or spam.',
  },
  {
    id: 'ethics',
    title: 'Safety person code of ethics',
    url: 'https://cdn.hockeycanada.ca/hockey-canada/Hockey-Programs/Safety/Safety-Program/Downloads/code_of_ethics_e.pdf',
    holds: 'Participant information is confidential. It is not disclosed without the consent of the participant and their parents or guardians, except where the law requires it or in an emergency.',
  },
]

export function canadaAsk(text: string): { title: string; lines: string[]; speech: string } | null {
  const t = text.toLowerCase()
  if (!/hockey canada|playing rules|rule book|code of conduct|\buccms\b|safe sport|maltreatment|community guidelines/.test(t)) return null
  const lines = DOORS.map(door => `${door.title}. ${door.holds}`)
  const speech = `Hockey Canada prints this in public. The by-laws for 2026-27 say the Playing Rules are the Official Rule Book, and that book is separate. It is online, and it is a free app. One rule was opened, 10.5, and the rest was not copied. Conduct sits on the safety page: the Canadian Safe Sport Program from April 1, 2025, the Universal Code of Conduct, and an independent third party for complaints. Their community guidelines bar personal attacks, discriminatory language, and harassment on their platforms. Their safety person code says a participant's information is confidential. A penalty minute was not invented.`
  return { title: 'Hockey Canada', lines, speech }
}
