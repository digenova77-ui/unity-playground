# THE UNIFIED LOOP — one loop, not many

**David's directive:** "unify the information loops between everything and
create not just paths for travel but paths for logical map communication."

**Date:** 2026-10-05
**Prototype:** `mappath.py` (all assertions PASS)

---

## 1. The loops we had (five, separate)

| Loop | Where it lived | What it did |
|---|---|---|
| Memory-root loop | `memory-roots/` | STATE.md → pin → CID → pull on startup → resume |
| Symbiosis loop | `symbiosis/interface.py` | human estimates → droid proves → human judges → accept/redirect |
| Governance loop | `unity-core/pure.py` | packet → shuffled Trinity verdict → decision |
| Execution loop | `plancksoft/` | verdict → pipeline → cycles |
| Form loop | `cosmos/coordinate.py` | verdict+hash → 3D cube/glyph placement |

Each worked alone. None fed the others. Data traveled; meaning didn't.

## 2. The unified loop (one)

```
INFORMATION → LOGIC → MAP → ACTION → MEMORY ──┐
     ▲                                        │
     └──────── memory enriches next input ────┘
```

**Every stage enriches. Nothing just passes through.**

- **INFORMATION** — raw input arrives. Memory enriches it: prior pins
  narrow, contextualize, link. A transaction that references a sealed
  ancestor arrives already situated (ENRICHED, not NOVEL).
- **LOGIC** — Trinity judges (DCLM / Iris / Twain²). Human guidance
  steers via the symbiosis membrane (bounds, what-if) — guidance in,
  evidence out, minds never merged. Out-of-bounds input is parked
  honestly (SKIP), never judged by theater.
- **MAP** — the judged packet is positioned. DAG parents (the flow of
  value/meaning) + 3D coordinates from the hash (order made visible).
  Settled (PASS) → **cube**. Flow / unsettled → **glyph**.
- **ACTION** — execution against the ledger. Settled cubes only.
  Insufficient funds → honest downgrade (cube back to glyph), no faked
  settlement.
- **MEMORY** — the enriched packet is sealed. The seal is the memory
  reference. In production this is the IPFS pin (`memory-roots/`);
  the prototype's sha256 seal keeps the identical interface.
  **The seal feeds the next INFORMATION stage. The loop closes.**

## 3. Logical map paths vs travel paths

A **travel path** moves bytes: A → B. Data arrives unchanged.

A **logical map path** carries three things, and each hop adds to two:

| Carried | Meaning | Grows at each hop |
|---|---|---|
| `data` | the payload | fixed after INFORMATION (integrity) |
| `logic` | WHY — who judged, what they decided, the reason | every stage appends |
| `map` | WHERE/HOW — parents, DAG position, 3D placement | every stage appends |

**Example (demonstrated in `mappath.py`):** a coin transaction travels
the path and arrives as:
- `data`: `{from: alice, to: bob, amount: 30}` — unchanged.
- `logic`: 9 entries — memory (ENRICHED, 1 prior pin), human-guidance
  (STEERED, bounds), DCLM/Iris/Twain² (PASS ×3), trinity (PASS,
  majority), cartographer (PLACED, settled cube), executor (EXECUTED,
  30 moved), sealer (PINNED).
- `map`: information (parents: [tx1 seal], depth 1), map (DAG parents
  include tx1, cube at x/y/z), memory (seal ref).

The receiver doesn't just get a transaction. It gets the transaction,
**why it's valid, and where it sits in the universe.** That is logical
map communication.

## 4. How the existing systems feed the loop

- **Memory roots** → the MEMORY stage and the INFORMATION enrichment.
  Every bot's IPFS root is a loop participant: pins are seals, pulls
  are information. Persistent self-executed startup = rejoining the
  loop at MEMORY and reading forward.
- **Symbiosis** → the LOGIC stage's guidance input. Human intellect
  stays a guidance layer (bounds, what-if, verdict). The membrane
  pattern from `symbiosis/interface.py` is the contract: guidance
  crosses down, evidence crosses up, nothing else.
- **3D world** → the MAP stage's output surface. Cubes (settled blocks)
  and glyphs (DAG flow) are not decoration — they ARE the map trail
  rendered. The block explorer and DAG explorer read the same `map`
  trail the loop writes. One source of truth.
- **Coin architecture** → ACTION + MEMORY. A transfer is a packet that
  survived LOGIC (Trinity PASS), earned a cube (MAP), executed
  (ACTION), and sealed (MEMORY). The ledger is the loop's running
  account of itself.
- **ROSETTA** → the translation substrate. When the loop must speak
  another language (Python ↔ JS ↔ ISA), the packet's `data` passes
  through the IR; `logic` and `map` ride along untranslated — meaning
  survives the language change.

## 5. The law

> One loop. Every stage enriches. Paths carry logic and map, not just
> data. Memory closes the loop — the seal of this pass is the
> information of the next.

**Binding rules:**
1. No stage may pass a packet through unchanged (except `data` after
   INFORMATION — integrity is not enrichment's enemy).
2. No verdict without a named judge and a stated why (UNKNOWN is never
   PASS; SKIP is honest parking, not failure).
3. No settlement without execution proof (a cube that didn't execute
   is a glyph — downgrade honestly).
4. The loop is one. A subsystem that keeps its own private loop is a
   machine part, not an organism cell — unify or park it as UNBORN.

## 6. Validation

`python3 mappath.py` — all assertions PASS:
- tx2 arrives with data intact, 9-entry logic trail, cube placement,
  DAG parent link to tx1, correct ledger (genesis 900 / alice 70 /
  bob 30), 2 sealed memory pins.
- Out-of-bounds tx parked honestly (SKIP, no faked Trinity verdict).

## 7. Next (UNBORN, labeled)

- Wire MEMORY stage to `memory-roots/daemon.py` (IPFS pin instead of
  sha256 seal) — same interface, real permanence.
- Wire LOGIC judges to real DCLM/Iris/Twain² (the Trinity seam) —
  currently caller-supplied callables; degraded mode is explicit.
- 3D explorer reads the `map` trail live (block cubes + DAG glyphs
  from loop output, not from a separate indexer).
- SYMBOL droid: packets need names/strings before the loop can speak
  human-readable maps (blocked on blueprint Phase 1, Track B).
