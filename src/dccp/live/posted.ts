/** Latest posted pages. A host that answers is not a person at the door. */

export interface Outlet {
  id: string
  name: string
  url: string
  note: string
}

export const OUTLETS: readonly Outlet[] = [
  { id: 'intelligencer', name: 'The Intelligencer', url: 'https://www.intelligencer.ca/', note: 'Homepage title read: Belleville News & Headlines | Belleville Intelligencer.' },
  { id: 'quinte-news', name: 'Quinte News', url: 'https://www.quintenews.com/', note: 'The page states location Belleville, ON, Canada.' },
  { id: 'mix97', name: 'Mix 97', url: 'https://mix97.com/', note: 'Homepage title read: Mix 97.' },
  { id: 'cool100', name: 'Cool 100.1', url: 'https://www.cool100.ca/', note: 'Homepage title read: Cool 100.1 FM.' },
  { id: 'hits955', name: 'Hits 95.5', url: 'https://www.hits955.ca/', note: 'Homepage title read: Hits 95.5.' },
]

export interface PostCheck { id: string; status: number | null; at: string | null }

/** What answered from this workspace on 2026-10-05. A later check replaces it. */
export const HELD_POSTS: readonly PostCheck[] = [
  { id: 'intelligencer', status: 200, at: '2026-10-05T22:23:00Z' },
  { id: 'quinte-news', status: 200, at: '2026-10-05T22:23:00Z' },
  { id: 'mix97', status: 200, at: '2026-10-05T22:23:00Z' },
  { id: 'cool100', status: 200, at: '2026-10-05T22:23:00Z' },
  { id: 'hits955', status: 200, at: '2026-10-05T22:23:00Z' },
]

export function outletById(id: string): Outlet | undefined {
  return OUTLETS.find(row => row.id === id)
}

export function postedWords(checks: readonly PostCheck[]): { lines: string[]; holes: string[] } {
  const lines: string[] = []
  const holes: string[] = ['www.800cjbq.com did not resolve. That host does not prove CJBQ.', 'A posted page is not a confirmation. Confirmation is a tap while this phone is at the mapped point.']
  for (const outlet of OUTLETS) {
    const check = checks.find(row => row.id === outlet.id)
    if (!check || check.status !== 200) {
      holes.push(`${outlet.name}: the host did not answer on the last check.`)
      continue
    }
    const when = check.at ? ` Checked ${check.at}.` : ''
    lines.push(`${outlet.name}. Host answered.${when} ${outlet.note}`)
  }
  return { lines, holes }
}
