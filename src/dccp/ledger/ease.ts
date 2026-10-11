/** What a child can begin with. The grown-up holds the Unity ID. */

export function ease(): { child: string; guardian: string } {
  return {
    child: 'You can look. A grown-up says yes. Your name stays hidden.',
    guardian: 'The grown-up holds the Unity ID. The child does not. The grown-up says yes before a seat is taken. The mark stays sealed. This device cannot check that the grown-up is the parent. Access cannot be bought.',
  }
}

export function easeWords(): string {
  const row = ease()
  return `${row.child} ${row.guardian}`
}
