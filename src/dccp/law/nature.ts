/** Nature is the remainder. It is not a line of the root.
 * The nine lines do not drink. Nature is what drinks when the page is closed.
 */

export function nature(): { concept: 'nature'; root: false; drinks: true; page: false; model: false } {
  return { concept: 'nature', root: false, drinks: true, page: false, model: false }
}

export function natureWords(): string {
  const row = nature()
  if (row.root || row.model || row.page || !row.drinks) return 'Nature was not taught. A model is not the forest.'
  return 'Nature is what still happens when no one is saying it. A root takes water. A leaf pulls the column. Sugar goes to the sink. The taproot on this page is nine lines, and those lines do not drink. A model of a forest is not the forest. Nature is not a tenth line, and it is not an invariant. It is the remainder.'
}
