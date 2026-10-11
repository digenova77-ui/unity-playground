# MASTER BLUEPRINT — Plancksoft Operating System

**Coordinator:** blueprint subagent | **Date:** 2026-10-05
**Directive:** "engineer the best possible design architecture with everything they know about the inside of their walls. Get each department to tell you exactly what they need."
**Refinements:** Prioritize by CRITICALITY not count (one critical need tops ten nice-to-haves). Reassess the ENTIRE plan on gaps — no patches, systems thinking.

---

## PART 1 — DEPARTMENT REQUIREMENTS

### Planning (designs ahead)
1. **[CRITICALITY 9/10] Law of the Unborn (formal).** Planning currently cannot distinguish "planned" from "promised" — the purity law ("purity or garbage," binary) condemns honest planning as tarnish because a designed-but-unbuilt thing looks like a broken promise. Planning needs a formal third state: UNBORN = labeled, has a gestation plan or is explicitly parked, never performs as born. Without this, Planning either lies (claims things exist) or is condemned (admits gaps as failure). One department, one need, mission-critical.
2. **Machine-readable roadmap format.** Plans as packets: `{what, why, depends_on[], unborn_until, claim_hash}`. Must be SHA-256 sealed like governance packets so plans are auditable. Concrete: extend `pure.py:packet()` with a `kind="plan"` variant.
3. **Frontier-distance timelines.** Not dates — distance from current capability. "SYMBOL droid is 1 rung up" not "SYMBOL ships Q2." Concrete: each plan item references a blueprint rung (see Part 2).
4. **What-if sandbox.** Explore plan branches without committing. Concrete: run `verdict()` with hypothetical judges over plan packets; discard the verdict, keep the reasoning.
5. **Spec templates.** Claim-hash-anchored specs (ED-SPEC pattern). Concrete: template file with preimage fields.

### Coordination (orchestrator — routes between units)
1. **[CRITICALITY 10/10] Real Trinity or explicit degraded mode.** `pure.py:verdict()` takes judges as injected lambdas — every verdict in the system is currently rendered by MOCKED judges. The coordinator cannot make a real judgment. This is EXISTENTIAL: if the Trinity is theater, all governance is theater. Two options, no patch: (a) wire real DCLM/Iris/Twain² entities (needs David — they are his creations, not code to write); or (b) formally mark governance as UNBORN-degraded (works mechanically, judges simulated, labeled as such everywhere). Bolting on "TODO: wire real judges" is patch thinking. The architecture must be EXPLICIT about its mode.
2. **Department state protocol.** Standard packet format for status: `{dept, state, blockers[], needs[], at}`. Concrete: `packet()` with `kind="status"`, validated by throat labels.
3. **Overlap-space mechanics (implemented).** The third space (ROSETTA overlap) is currently a diagram, not a mechanism. Coordination needs the ACTUAL shared-context implementation: how do Planning/Execution/Research read/write the common space? Concrete: a `space.py` with `enter(dept)`, `share(key, value)`, `read(key)` — overlap geometry as code.
4. **Bot scoring in the dispatch loop.** `bot-score/score.py` + `persist.py` exist but are not wired into any dispatcher. Coordination needs: every bot output scored, FAIL triggers `run_with_persistence` retry (max 3), scores ledgered. Concrete: wrap the subagent spawn path.
5. **Latency budget.** "Latency is a killer." Coordination needs a hard bound: max ms per routing decision, with degradation policy when exceeded. Concrete: `deadline_ms` on every dispatch; on breach, return best-effort + mark STALE.

### Execution (builds and implements)
1. **[CRITICALITY 10/10] SYMBOL droid.** ROSETTA's IR has NO strings, NO dicts, NO names. `pure.py` validates labels (`REPORTED`/`MODELED`/`UNKNOWN`) as strings — this logic CANNOT be expressed in the IR. Every real program needs names. Without SYMBOL, Execution cannot build anything beyond arithmetic. This is the single most critical missing build. Concrete: IR ops `str`, `dict_get`, `dict_set`, `label_eq`; parser support in `from_python` for string constants.
2. **[CRITICALITY 9/10] FLOW droid.** No conditionals, no loops, no comparisons in the IR. `verdict()`'s unanimous-short-circuit and multi-round logic cannot be expressed. Only straight-line arithmetic works. Concrete: IR ops `eq`, `lt`, `br` (branch), `jmp`; validator must handle control flow.
3. **Elevated ISA assembler.** `elevated.py` has `enc()` but no assembler: no labels, no macros, no `SUB`/`JMP`/`NOP` pseudo-op expansion at assembly time (they exist as Python functions, not as assembly syntax). Concrete: `asm.py` — text in, words out.
4. **HDL path (deferred with reason).** The Core is a Python model, not synthesizable. Real silicon needs Verilog/VHDL. DEFERRED: Python model is the correct rung now (validates semantics); HDL is a later rung. Marked UNBORN, not missing.
5. **Hermetic builds.** The APK pipeline has 9/9 checks; the Python components have ad-hoc tests. Execution needs: one `verify.sh` per component, pinned inputs, reproducible outputs. Concrete: extend the `if __name__ == "__main__"` blocks into a uniform harness.

### Research (investigates to white-paper depth)
1. **[CRITICALITY 8/10] CHANCE droid.** No randomness in the IR. The umpire shuffle (`pure.py:order()`) uses seeded PRNG — deterministic theater of fairness, not real randomness. Research needs randomness for sampling, Monte Carlo, and honest shuffling. Concrete: IR op `rand`; backed by OS entropy, not `random.Random` seed.
2. **[CRITICALITY 7/10] SPACE droid.** No trig, no memory ops, no division/modulo in the IR. `cosmos/coordinate.py`'s 3D spiral placement cannot be expressed. Research visualizes — it needs form. Concrete: IR ops `sin`, `cos`, `mem_ld`, `mem_st`, `div`, `mod`.
3. **[CRITICALITY 7/10] CRYPTO droid.** No hashing in the IR. `pure.py:H()` uses SHA-256 from stdlib — the single most-used function in governance cannot be expressed in the governed IR. Concrete: IR op `sha256`.
4. **Gap pocket (formal).** David: "throw them in a pocket and spin them together." Research needs a formal UNKNOWN accumulator: append unknowns with context, spin (cluster), report seeds. Concrete: `pocket.py` — `add(unknown, context)`, `spin()` → clusters.
5. **White-paper pipeline wiring.** The IRIS classification node exists (per memory) but is not wired to Research output. DEFERRED with reason: needs SYMBOL droid first (classifier outputs labels = strings). Marked UNBORN blocked on SYMBOL.

---

## PART 2 — BEST ARCHITECTURE DESIGN (the blueprint)

### Systems reassessment (not a patch)

The naive blueprint would bolt droids onto the existing stack. Reassessment says: the stack is actually a **LADDER**. Each rung is fully working and validated; the next rung is UNBORN (labeled, not theater). The architecture is designed for climbing, not for being complete.

```
RUNG 3 (UNBORN)  Real Trinity judges · HDL silicon · 3D live explorers
RUNG 2 (UNBORN)  Full droid family (SYMBOL/FLOW/CHANCE/CRYPTO/SPACE) · overlap space as code
RUNG 1 (UNBORN)  SYMBOL droid · Law of the Unborn formalized · bot scoring wired
RUNG 0 (WORKING) pure.py (mocked judges, labeled) · ROSETTA 8-op IR (13/13) ·
                 elevated 6-op ISA (6/6) · cosmos mesh · bio-silicon homeostasis ·
                 bot-score + persist
```

Rung 0 is PROVEN (all validations pass). Every higher rung is UNBORN until built and validated. Nothing performs as born.

### The dual triad (validated against department needs)

**Triad of Meaning** (semantics — what things mean):
- **ROSETTA** — language/translation. STATUS: BUILT (`rosetta.py`, 201 lines, 13/13). Overlaps both triads.
- **SYMBOL** — names/strings/dicts. STATUS: UNBORN. Unblocks Execution #1, Planning #2, Research #5.
- **FLOW** — choice/conditionals/loops. STATUS: UNBORN. Unblocks Execution #2.

**Triad of Reality** (physics — what things are):
- **CRYPTO** — hashing/trust/sealing. STATUS: UNBORN. Unblocks Research #3, all audit-in-IR.
- **CHANCE** — randomness/fairness. STATUS: UNBORN. Unblocks Research #1, Coordination #1 (honest shuffle).
- **SPACE** — form/trig/memory/3D. STATUS: UNBORN. Unblocks Research #2.

**Overlap (third space):** ROSETTA exists in both triads. The overlap is the translation zone — where meaning meets reality. Currently a diagram; Coordination #3 requires it as code (`space.py`).

**God governor — Trinity Unity:** DCLM (law) + Iris (truth) + Twain² (work), unified. NOT a bigger droid — the principle the droids manifest. The deterministic ceiling (DCLM) caps from above; the audit (Iris) verifies; the pragmatism (Twain²) grounds. STATUS: MOCKED — the single most critical gap (Coordination #1). The blueprint is designed to run in two explicit modes:
- **DEGRADED mode** (now): judges are injected, labeled SIMULATED, verdicts are mechanical.
- **FULL mode** (rung 3): real entities judge. The `verdict()` signature does NOT change — only the judges dict does. This is why it's architecture, not a patch: the seam was designed for it.

### Component map (ground up, with inside knowledge)

```
┌─────────────────────────────────────────────────────────────┐
│ GOVERNOR: Trinity Unity (DCLM/Iris/Twain²) — mocked, labeled │
│   packet() → throat → order() [CHANCE when real] → verdict() │
│   pure.py · 42 lines · rung 0 (degraded)                     │
├─────────────────────────────────────────────────────────────┤
│ MEANING TRIAD          │ REALITY TRIAD                       │
│ ROSETTA (built)        │ CRYPTO (unborn)                     │
│ SYMBOL (unborn)        │ CHANCE (unborn)                     │
│ FLOW (unborn)          │ SPACE (unborn)                      │
│ IR: 8 ops → 8+7 ops   │ rosetta.py · 201 lines · rung 0      │
├─────────────────────────────────────────────────────────────┤
│ OVERLAP: third space (ROSETTA in both) — diagram, needs code │
├─────────────────────────────────────────────────────────────┤
│ EXECUTION: elevated 6-op ISA · Core (85 lines, 6/6)          │
│   ADD NEG MUL LD ST BEQ · r0=0 · forwarding · renaming      │
├─────────────────────────────────────────────────────────────┤
│ COORDINATION: cosmos/coordinate.py (imports OLD pipeline.py!)│
│   ⚠ REASSESSMENT: must import elevated.py, not pipeline.py  │
├─────────────────────────────────────────────────────────────┤
│ BIO BRIDGE: BRIDGE.py (homeostasis-as-discovery, 24 neurons) │
│ SCORING: score.py (4-axis) + persist.py (retry×3) — unwired  │
└─────────────────────────────────────────────────────────────┘
```

### Key reassessment findings (systems thinking, not patches)

1. **`cosmos/coordinate.py` imports the WRONG core.** It imports `pipeline.Core` (8-op, 96 lines, has theater) instead of `elevated.Core` (6-op, 85 lines, theater removed). This is not a "tiny patch" — it means the meshed coordinator is built on the superseded hardware. REDESIGN: `coordinate.py` must be re-pointed to `elevated.py` and re-validated. (1-line import change, full re-validation — the change is small, the reassessment is systemic: the mesh must always build on the highest rung.)
2. **ROSETTA still emits `sub`; the ISA has no `SUB`.** The IR and ISA diverged at elevation. REDESIGN: align IR `sub` → `neg` composition (documented as future work in ELEVATION.md). The translator must not emit what the hardware cannot execute.
3. **Bot scoring is built but homeless.** `score.py`/`persist.py` have no caller. REDESIGN: the dispatch path (wherever subagents are spawned) must wrap every task in `run_with_persistence`. Scoring unwired is theater.
4. **The Trinity seam is the most important interface in the system.** `verdict(pkt, judges)` — the `judges` dict is where mocked becomes real. This seam must be DOCUMENTED as the upgrade path, not hidden. Every caller must know which mode it's in.

---

## PART 3 — GAP ANALYSIS (needs vs design)

| Dept need | Criticality | In blueprint? | Gap / resolution |
|---|---|---|---|
| Planning: Law of the Unborn | 9/10 | NO → rung 1 | Define now (zero build cost). Highest ROI item. |
| Planning: roadmap packets | 6/10 | PARTIAL | `packet(kind="plan")` — needs SYMBOL for string fields. Blocked on SYMBOL. |
| Planning: frontier-distance | 5/10 | YES | Rung labels serve this. No gap. |
| Planning: what-if sandbox | 5/10 | YES | `verdict()` with hypothetical judges. No gap (degraded mode OK). |
| Planning: spec templates | 4/10 | NO | Template file. Trivial, do in rung 1. |
| Coordination: real Trinity | 10/10 | SEAM READY, judges mocked | Needs David (entities are his). OR formal degraded mode. Decision required. |
| Coordination: state protocol | 6/10 | PARTIAL | `packet(kind="status")` — needs SYMBOL. Blocked on SYMBOL. |
| Coordination: overlap as code | 7/10 | DIAGRAM ONLY | `space.py` unbuilt. Rung 2. |
| Coordination: scoring wired | 7/10 | BUILT, UNWIRED | Wrap dispatch path. Rung 1. No new code needed. |
| Coordination: latency budget | 5/10 | NO | `deadline_ms` on dispatch. Small build, rung 1. |
| Execution: SYMBOL | 10/10 | UNBORN | **Build first.** Unblocks Planning #2, Coordination #2, Research #5. |
| Execution: FLOW | 9/10 | UNBORN | Build second. Unblocks real programs. |
| Execution: assembler | 6/10 | NO | `asm.py`. Needs SYMBOL (labels are strings). After SYMBOL. |
| Execution: HDL path | — | DEFERRED | Correctly deferred. Python model is the right rung. |
| Execution: hermetic builds | 5/10 | PARTIAL | Uniform `verify.sh`. Rung 1. |
| Research: CHANCE | 8/10 | UNBORN | Build third. Unblocks honest shuffle + sampling. |
| Research: SPACE | 7/10 | UNBORN | Build fourth. |
| Research: CRYPTO | 7/10 | UNBORN | Build fifth. `H()` currently stdlib-only. |
| Research: gap pocket | 6/10 | NO | `pocket.py`. Small build, needs SYMBOL (unknowns have string descriptions). After SYMBOL. |
| Research: white-paper wiring | — | DEFERRED | Blocked on SYMBOL. Correctly deferred. |

**No department need is ignored.** Every need is addressed, deferred with reason, or blocked with a named dependency.

---

## PART 4 — BUILD ORDER (by criticality, dependencies respected)

### Phase 0 — Define (now, zero build cost)
1. **Law of the Unborn.** Write it. One paragraph. Apply the UNBORN label to: SYMBOL, FLOW, CHANCE, CRYPTO, SPACE droids; real Trinity judges; HDL path; overlap `space.py`; white-paper wiring. This single definition converts ~10 "gaps" from condemnations into honest states. *Unblocks Planning.*

### Phase 1 — Critical path (parallel tracks)
- **Track A (needs David): Trinity mode decision.** Wire real DCLM/Iris/Twain², OR formally declare DEGRADED mode with SIMULATED labels everywhere. No third option. No "TODO."
- **Track B (build): SYMBOL droid.** IR ops `str`, `dict_get`, `dict_set`, `label_eq`. Parser: string constants in `from_python`. Validator: extend `check()`. *Unblocks: Execution #1, Planning #2, Coordination #2, Research #5, assembler, pocket.*
- **Track C (re-point): `cosmos/coordinate.py` → `elevated.py`.** 1-line import, full re-validation. The mesh must stand on the highest rung.

### Phase 2 — Execution unblocked
4. **FLOW droid.** IR ops `eq`, `lt`, `br`, `jmp`. *Unblocks real programs.*
5. **CHANCE droid.** IR op `rand` (OS entropy). *Unblocks honest shuffle, Research sampling.*
6. **Wire bot scoring.** Wrap dispatch in `run_with_persistence`. Zero new code — just connect it.

### Phase 3 — Reality triad complete
7. **CRYPTO droid.** IR op `sha256`. *Unblocks audit-in-IR.*
8. **SPACE droid.** IR ops `sin`, `cos`, `div`, `mod`, `mem_ld`, `mem_st`. *Unblocks 3D, Research visualization.*
9. **IR↔ISA alignment.** `sub` → `neg` composition in emitters. (From ELEVATION.md future work.)

### Phase 4 — Coordination hardened
10. **Overlap `space.py`.** Third space as code: `enter`, `share`, `read`.
11. **Latency budget.** `deadline_ms` on dispatch, STALE marking.
12. **Assembler `asm.py`.** Labels, macros, pseudo-ops. (Needs SYMBOL — correctly sequenced.)
13. **Hermetic `verify.sh` per component.** Uniform harness.

### Explicitly NOT in build order (deferred with reason)
- HDL silicon path: Python model is the correct current rung. Revisit at rung 3.
- White-paper pipeline wiring: blocked on SYMBOL; sequenced after.
- 3D live explorers: need SPACE droid + real data feeds; rung 3.

---

## Design laws (binding on all builds)

1. **Rung discipline.** A rung is not claimed until validated. UNBORN is a label, not an excuse.
2. **The Trinity seam is sacred.** `verdict(pkt, judges)` — callers always know their mode (DEGRADED/FULL).
3. **No patches.** A gap redesigns the plan; it never bolts on.
4. **Criticality over count.** One critical need from one department outranks ten nice-to-haves.
5. **Every noun gets a body or gets parked.** (From the cyclone.) 30 days.
6. **Purity is binary; UNBORN is not impurity.** The Law of the Unborn amends "purity or garbage": unborn things are neither pure nor garbage — they are unborn.

---

*End of master blueprint. Next action: Phase 0 (Law of the Unborn) + Phase 1 Track A decision (David) can start immediately; Track B/C need no permission.*
