/** Text that is about to be written into HTML. */
export function html(s: string): string {
  return s.replace(/[&<>"']/g, c => {
    if (c === '&') return '\u0026amp;'
    if (c === '<') return '\u0026lt;'
    if (c === '>') return '\u0026gt;'
    if (c === '"') return '\u0026quot;'
    return '&#39;'
  })
}
