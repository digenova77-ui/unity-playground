/** What this page holds of the WHO classification.
 * One stem was checked. Every other name stays open.
 * This is not a diagnosis and not a treatment.
 */

export interface Stem {
  revision: 'ICD-11'
  code: string
  title: string
  also: string
  source: string
}

/** WHO reference guide: CA00 is acute nasopharyngitis. ICD-10 J00 names the common cold. */
export const CA00: Stem = {
  revision: 'ICD-11',
  code: 'CA00',
  title: 'Acute nasopharyngitis',
  also: 'ICD-10 J00, Acute nasopharyngitis [common cold]',
  source: 'WHO reference guide. WHO ICD-10 volume.',
}

export function heldStem(ask: string): Stem | null {
  const t = ask.toLowerCase()
  if (/\bca00\b/.test(t) || /\bj00\b/.test(t) || /nasopharyngitis/.test(t) || /\bcommon cold\b/.test(t) || /\bhead cold\b/.test(t) || /\bcoryza\b/.test(t) || /\ba cold\b/.test(t)) return CA00
  return null
}

export function stemWords(stem: Stem): string {
  return `${stem.revision} ${stem.code}. ${stem.title}. Common cold is a synonym, not a second code. The same condition in the previous revision is ${stem.also}. This is not a diagnosis and not a treatment. The record is at icd.who.int. ${stem.source}`
}

export function diseaseWords(): string {
  return 'The World Health Organization keeps three reference classifications. ICD records diseases and related problems. ICF records functioning and disability. ICHI records interventions. They are not three names for one fact. ICD-11 came into effect on 1 January 2022. A foundation holds the clinical detail and the synonyms. A linearization is the statistical list drawn from it. A stem is the category. An extension adds laterality, severity, anatomy, a substance, or a device, and that extension is not a second disease. The May 2026 fact sheet says there are more than 17,000 diagnostic categories. This page holds one stem, CA00, acute nasopharyngitis. Every other name stays open. It is not a diagnosis and not a treatment. The codes are at icd.who.int. The pharmacology estates have had no research yet.'
}
