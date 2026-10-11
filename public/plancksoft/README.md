# ROSETTA-GROUND — rebuilt from the ground up on ROSETTA

Not a retrofit. The three system cores re-expressed through the transitional
abstract layer: source -> parse -> IR -> emit -> validate. Emitted files were
written by Rosetta emitters, never hand-written.

## The three rebuilds

1. **governance** — Trinity majority collapse. PASS=1/FAIL=0;
   `maj(a,b,c) = ab+ac+bc-2abc`, branch-free arithmetic. The verdict-resolution
   core of unity-core/pure.py, no conditionals.
   IR: 18 ops -> py, js, isa. Validated on 5 vote vectors, all 3 targets agree.

2. **pipeline** — the plancksoft 32-bit benchmark program (r3=r1+r2; r4=r3*r1)
   parsed from raw ISA words -> IR -> re-emitted to ISA (lossless round-trip:
   2 words in, 2 words out) and to Python/JS. Validated on 3 input vectors;
   ISA silicon-sim, Python, and Node all agree.

3. **cosmos** — verdict-gated execution. The coordinate.py branch
   (`if verdict != PASS: executed=False`) rebuilt as ONE multiply: `v * cyc`.
   Branch eliminated entirely. Validated on 3 flag/cycle pairs, all targets agree.

## Simplification (David's criterion)
- Cosmos: a conditional branch became a single multiply. Fewer, simpler.
- Pipeline: one 8-op vocabulary now carries the program in 3 languages; zero extra ops.
- Governance: ~40 lines of dict/loop/majority logic -> 6 compute IR ops.
- Honest note: the parser emits redundant `mov x tN` pairs (see GAPS.md) —
  next ROSETTA pass should peephole them out.

## Files
- `build.py` — the rebuild script (parse/emit/validate/count)
- `*.ir.txt` — the intermediate representations
- `governance.{py,js,isa.txt}` `pipeline.{py,js,isa.txt}` `cosmos.{py,js,isa.txt}` — emitter output
- `VALIDATION.json` — machine-readable proof
- `GAPS.md` — what the IR cannot yet express

All checks: PASS.
