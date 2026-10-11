/** What you already have stays outside this page. Naming it is not a title. No DAG drives time here. */

export function heldClaim(): { minted: false; title: false; dag: null; time: 'not driven here'; both: true } {
  return { minted: false, title: false, dag: null, time: 'not driven here', both: true }
}

export function heldWords(): string {
  const row = heldClaim()
  return `You start with what you already have. This page does not mint it, and naming it does not prove it. A chain of title is ${row.title ? 'held' : 'not held'}. A DAG that drives time is ${row.dag === null ? 'not held' : 'held'}. The next step is +1, and it is not written yet. A generated world you take from is not this. A thing you did not make is not yours because you said so. The till is closed. Both halves name this.`
}
