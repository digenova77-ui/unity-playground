/** A field is joined only when the registry holds it. A hole is named. It is not filled. */

export const FIELDS = ['communication', 'transportation', 'society', 'healthcare', 'education', 'energy', 'resources', 'help'] as const
export type Field = (typeof FIELDS)[number]

export interface AuditRow {
  field: Field
  state: 'held' | 'hole'
  why: string
}

export const AUDIT: readonly AuditRow[] = [
  { field: 'communication', state: 'hole', why: 'No communication record is held.' },
  { field: 'transportation', state: 'hole', why: 'No transportation record is held.' },
  { field: 'society', state: 'hole', why: 'No society record is held.' },
  { field: 'healthcare', state: 'hole', why: 'Pharmacology is named, and it is at design stage. No care is coordinated.' },
  { field: 'education', state: 'hole', why: 'No education record is held.' },
  { field: 'energy', state: 'held', why: 'Energy is a sector in the registry. This does not operate a grid.' },
  { field: 'resources', state: 'held', why: 'Water, food, and climate are sectors in the registry. This does not move a shipment.' },
  { field: 'help', state: 'hole', why: 'Help everywhere is not a record. It is not claimed.' },
]

export function coordinate(fields: readonly Field[] = FIELDS): { joined: Field[]; refused: Field[]; words: string } {
  const wanted = fields.filter((field, i) => fields.indexOf(field) === i)
  const joined = wanted.filter(field => AUDIT.find(row => row.field === field)?.state === 'held')
  const refused = wanted.filter(field => !joined.includes(field))
  const lines = AUDIT.map(row => `${row.field}: ${row.state}. ${row.why}`)
  const join = joined.length >= 2 ? `Joined: ${joined.join(' and ')}. They can be read together. Nothing else was joined.` : 'Nothing was joined. One held field is not a coordination.'
  const deny = refused.length ? `Refused: ${refused.join(', ')}.` : 'Nothing was refused.'
  return { joined, refused, words: `${join} ${deny} ${lines.join(' ')}` }
}
