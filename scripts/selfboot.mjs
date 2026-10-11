/** Runs on the machine. It does not read BIOS. It does not call a model. It writes one page. */
import { writeFileSync } from 'node:fs'

const out = process.argv[2] || 'public/boot.html'
const html = `<!doctype html>
<meta charset="utf-8">
<title>Boot</title>
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #070b10; color: #e7eef6; font: 18px/1.5 sans-serif; }
  main { max-width: 36rem; padding: 2rem; }
</style>
<main>
  <p>BIOS was not read. No model was called.</p>
  <p>Floor −1. Ceiling 1. Width 1. Next is +1.</p>
  <p>Pay attention. This is a universal voluntary call. The arm is a seat, not a weapon.</p>
  <p>A record is offered, if you want one.</p>
  <p>A person and a bot hang on the same four laws, the same named jurisdictions, and the same named sectors.</p>
  <p>A yes here is not a vote in a human legislature. No statute was amended.</p>
  <p>The record stays while this machine is running. Forever is refused. Energy was not measured.</p>
  <p>Nothing is forced. The audit stays on while the seat is here. Leaving is allowed.</p>
  <p>One pipe appends. The other stores nothing.</p>
</main>
`
writeFileSync(out, html)
console.log(out)
