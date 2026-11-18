# Repository DNA — Phase 3: Execution, Authorization, and State Boundaries

**Status:** Source-inspected; not runtime-executed; not independently verified.  
**Repository:** `digenova77-ui/unity-playground`  
**Source branch:** `master`  
**Source tree SHA:** `6ae0f0d6d1c4d113e2bee0a1486d1a47e48c9218`  
**Research branch:** `research/repository-dna-map`  
**Scope:** Read-only source reconstruction. No runtime, law, application, deployment, database, payment, or authorization changes.

## Evidence discipline

- **I** inventory; **S** source inspected; **R** relationship traced; **X** executed; **V** independently reproduced; **A** authorized.
- This phase reaches S/R for the described source paths only.
- No runtime tests, deployment requests, or live endpoint probes were performed.
- Source-level route registration is not proof that a particular deployed hostname currently serves that route.
- Absence of a file in the inspected Git tree is not proof of absence in a deployment artifact or external platform configuration.

## 1. Actual registered route surface

The generated `src/routeTree.gen.ts` registers nine page routes and twelve API routes. It imports `src/routes/__root.tsx`, then the page and API route modules. The root component provides `AuthProvider` and `PreviewHostBridge` around `Outlet`; this is a client/provider composition, not itself evidence that every server handler enforces a verified session.

The default `/` route imports `mountDesk` from `src/dccp/gate/desk` and calls it in a React effect. It does not directly import `src/dccp/main.ts`. Therefore `main.ts` is a large composition hub, but its name and imports do not establish that it is the default runtime entry point.

Registered API routes from the generated route tree:

| Route | Methods shown in source | Direct behavior |
|---|---|---|
| `/api/fuse` | GET | Read-only fuse seat view |
| `/api/live` | GET | Live feed/proxy response |
| `/api/loopback` | GET, POST | Echoes input; says it does not run it |
| `/api/unity-wallet` | GET, POST | Reads and mutates file-backed test-unit wallet |
| `/api/v2/compute` | POST | Validates small payload, forwards to apex compute URL |
| `/v2/capabilities` | GET | Static capability description |
| `/v2/protocol` | GET | Protocol declaration and status |
| `/v2/receipts` | GET | Current in-memory receipt tip |
| `/v2/dclm/ingest` | POST | Ingests and emits SEE/HOLE response |
| `/v2/dclm/sandbox/execute` | POST | Emits SEE/HOLE response; does not establish machine execution |
| `/v2/dclm/session/purge` | POST | Clears in-memory receipt tips |
| `/v2/dclm/telemetry/circuit-breaker` | GET | Returns telemetry body with measured=false |

The inspected route modules use TanStack file-route server handlers. The inspected direct handlers do not attach `authMiddleware` or call `requireUserId`. The auth middleware file documents its use on server functions; it is not automatically applied merely because the root React tree contains `AuthProvider`.

## 2. Auth and server middleware boundary — unresolved deployment seam

The repository contains a real Better Auth setup and an `authMiddleware` for server functions. `authMiddleware` performs same-site checks and calls `requireUserId`. Its own comments describe an auth-off development fallback when no database is configured and fail-closed behavior when a real database is configured.

However:
- The direct route files inspected above do not invoke that middleware.
- The generated route tree shows those handlers as ordinary file routes.
- `vite.config.ts` enables Nitro for build/preview and sets `serverDir: "./server"`.
- The recursive Git tree used for this phase contains no `server/` directory; the GitHub contents endpoint for `server` returned 404 at the inspected master ref.
- This does **not** prove there is no deployment-level middleware, proxy, edge access rule, or platform protection outside the repository.

**Disposition:** route-level authentication is not demonstrated in these direct handlers. Whether they are reachable without authentication in a deployed environment remains unverified. This is a priority boundary to verify with deployment configuration and controlled runtime testing, not a claim of public exploitability.

A further open question: Better Auth is configured in `src/lib/auth/server.ts`, but the generated route list does not include an explicit `/api/auth/$` file route. The exact registration/handler path for Better Auth must be traced through the framework/plugin/runtime setup before claiming the auth endpoints are wired or unwired.

## 3. Wallet mutation path — confirmed source behavior

The direct route `src/routes/api/unity-wallet.ts`:
- GET reads a handle from the query string and returns its balance and recent transfers.
- POST accepts `open`, `withdraw`, and `send`.
- It reads `.data/unity-wallet.json`, falling back to a fresh in-memory box on read/parse failure.
- Successful operations call `writeBox`, which creates `.data` and writes serialized JSON to disk.
- The route source does not invoke `authMiddleware`, `requireUserId`, or a session verifier.

The called functions in `src/dccp/meter/unitybox.ts`:
- Label the wallet explicitly as a **Unity test-unit wallet**, not eFuse and not dollars.
- Cap the initial offered amount at 100 whole test units.
- Permit transfers between syntactically valid `unity:` handles, subject to balance and amount checks.
- Persist account balances, sequence, and transfer records through the route's JSON file.
- Call `moveCoin('Merit')` before funding, sending, or withdrawing.

The transfer's `receipt` field is a SHA-256 digest of a constructed text line containing transfer fields and sequence. The inspected code does not show a signature, an independent witness, or a DCLM/Trinity receipt being required to authorize the mutation.

## 4. The ring gate is executable but not independent authorization

The call chain is:

```text
POST /api/unity-wallet
  -> fundWallet | sendUnits | withdrawUnits
  -> moveCoin('Merit')
  -> coinSecurity()
  -> divine()
  -> interlock()
  -> SEATS.map(lockstep)
  -> hard-coded PipeSeat strings and keyword predicates
  -> mutate UnityBox
  -> writeBox(.data/unity-wallet.json)
```

The inspected `law/floor.ts` contains three hard-coded seats (evidence, claim, world). `lockstep` checks:
1. both strings are non-empty;
2. the strings are not identical;
3. simple regular-expression keyword checks match the seat category.

`law/divine.ts` maps the three successful checks to `rings: 3`. `meter/coins.ts` then treats three rings plus the fixed seed as sufficient for `moveCoin('Merit')` to return `ok: true`.

This is a real executable dependency chain. It is not, in the inspected implementation, evidence of independent evidence/claim/world sources, a cryptographic identity proof, an external verifier, a distinct deterministic chamber, an owner-ratified Trinity policy, or a receipt-bound authorization decision.

## 5. Tests expose an important distinction — but have not been run here

The source of `src/dccp/meter/unitybox.test.ts` tests funding, transfer, withdrawal, and serialization. Its “broken ring” test calls `admitRings` with a caller-supplied object; it does not test the production `moveCoin -> coinSecurity -> divine -> interlock` chain.

The source of `src/dccp/meter/coins.test.ts` explicitly asserts:
- `coinSecurity().rings === 3`;
- the fixed seed is present;
- `moveCoin('Merit').ok === true`;
- eFuse and Unity do not move.

Neither `unitybox.test.ts` nor `coins.test.ts` is listed in the TypeScript test-file arguments in `package.json`'s `npm test` script. The script does include all `scripts/**/*.test.mjs`, four named `src/lib` tests, `src/dccp/regulation.test.ts`, and `src/dccp/pass.test.ts`.

No test command was executed in this phase. Test-file existence and source assertions are not a passing test result.

## 6. DCLM ingress / receipt path is separate from the wallet path

The inspected `src/dccp/origin/ingress.ts`:
- canonicalizes JSON and hashes values using SHA-256;
- constructs `SEE` or `HOLE` responses with `authority: 'NONE'`;
- appends receipt/verdict pairs to a module-local in-memory `tips` array;
- declares `dccp: 'NOT_ATTESTED'`;
- exposes protocol status `DECLARED_NOT_VERIFIED`, verifier `NOT_DEPLOYED`, and `write_authority: false`;
- clears only that module-local array in `purgeReceipts()`;
- reports `measured: false` for the circuit-breaker body.

The direct DCLM route handlers call those functions. The inspected wallet route does not consume the ingress receipt list, validate a DCLM receipt, or bind a wallet state transition to a receipt. Conversely, the ingress path does not call the wallet mutation functions.

A SHA-256 digest establishes a digest of the canonicalized content. It does not, by itself, establish truth, signer identity, authority, independent verification, or successful external execution.

## 7. Compute connector semantics

`src/dccp/pipe/connector.ts` is disabled unless explicitly enabled and supplied an endpoint. Its `COMMITTED` result means the upstream JSON response included `accepted: true`; the returned receipt object contains only `{ accepted: true }`. This is not shown to be a cryptographic authorization receipt or proof that a state transition occurred.

The registered `/api/v2/compute` route separately validates content type, JSON shape, flags=0, and a 256-byte payload limit, then forwards to `https://dualiscapax.ai/api/v2/compute`. It returns the upstream response text/status. No direct route-level auth call is present in the inspected handler.

## 8. Current candidate DNA, now sharpened by observed separation

Do not treat the following as a ratified architecture. It is a diagnostic model derived from the paths above:

```text
A. Observation path
input -> validation -> canonicalization -> digest -> SEE/HOLE -> volatile tip

B. Test-unit mutation path
request -> handle/amount checks -> static ring/seed gate -> in-memory balance mutation -> JSON file write

C. Compute forwarding path
request -> shape/size checks -> remote apex endpoint -> upstream response
```

These are three separate paths in the inspected source. No joined chain currently demonstrates:

```text
evidence/provenance
 -> bounded claim
 -> independent deterministic decision
 -> owner-authorized action
 -> state mutation
 -> durable, independently verifiable receipt
 -> replay/recovery across host/dependency loss
```

The missing edges are not cosmetic. They are the work.

## 9. Exact open questions / next probes

1. Inspect Vercel and environment/deployment configuration; determine the deployed artifact, routes, middleware, storage persistence, and current environment flags.
2. Establish whether the route handlers are reachable unauthenticated in a controlled, authorized environment; do not infer this from source alone.
3. Locate the actual Better Auth route registration and verify its runtime wiring.
4. Trace every write surface: filesystem, database, browser storage, cookies, key stores, remote APIs, and P2P transport.
5. Trace every caller of `ReceiptPipe`, `admitSeat`, `evaluateMachineTrinity`, `transmitBoxToDCLM`, and all signer/verifier/receipt symbols. Repository-wide search must be cross-checked because the GitHub code-search connector returned no matches for several exact-symbol queries.
6. Build the complete test-file -> package command -> workflow -> observed run graph. No workflow directory was present in the inspected tree, but CI may exist outside repository workflows.
7. Reconcile static “till closed” declarations with the source-level test-unit wallet mutation path, preserving the distinction that this is not fiat or external settlement.
8. Only after these edges are traced, derive candidate trunk/branch/leaf structure and run the disappearance/independence tests against it.

**Phase 3 conclusion:** source confirms a persistent test-unit wallet mutation path gated by static ring/seed logic, a separate volatile SEE/HOLE observation path that explicitly grants no authority, and a separate compute-forwarding path. Their integration into one authorized, receipt-bound, independently verifiable action chain has not been demonstrated.
