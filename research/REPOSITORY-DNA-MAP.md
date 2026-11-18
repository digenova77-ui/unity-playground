# Repository DNA Map — Inventory and Structural Index

**Status:** Phase 1 inventory / Phase 2 dependency reconstruction pending.  
**Repository:** `digenova77-ui/unity-playground`  
**Branch inspected:** `master`  
**Commit/tree SHA:** `6ae0f0d6d1c4d113e2bee0a1486d1a47e48c9218`  
**Tree truncated:** `false`  
**Files:** 766  
**Total declared bytes:** 49152931  

This index records every tracked blob path returned by the Git tree API at the stated commit. It is an inventory, not proof that a file is imported, executed, tested, authoritative, correct, or live. Directories and files are not being promoted to architectural components merely because of their names.

## Method and evidence grades

- **I — Inventory:** path, blob SHA, declared size.
- **S — Source inspected:** file content directly read.
- **R — Relationship verified:** import/caller/configuration relation directly traced.
- **X — Executed:** behavior observed by running a defined command or workflow.
- **V — Independently verified:** separate reproduction or audit.
- **A — Authorized:** action has the required governing authorization.

A grade never implies a later grade. This pass has broad I coverage, selective S coverage, and no claim of repository-wide R/X/V/A coverage.

## Repository-level structural observations

- `package.json` identifies a Vite + TanStack Start + React + Nitro application with PGlite/Postgres-related database dependencies.
- The package test script runs all `scripts/**/*.test.mjs`, plus a specifically enumerated subset of TypeScript tests. The inventory contains 0 test/spec-named files; therefore file existence is not equivalent to test execution.
- `src/dccp/main.ts` is a large imperative Three.js entry point importing many DCCP domains directly. It is a major composition hub and needs full caller/import tracing.
- `src/dccp` contains 611 tracked files. The directory labels are provisional domains, not yet proven architectural layers.
- Root documents make strong claims about no company, no execution/settlement, observation vs signature, and refusal on missing facts. These statements must be compared with runtime behavior and server routes, not accepted as proof by declaration.
- `build` runs `vite build` and then `db:migrate`; this is a materially different operational boundary from a pure static build and needs explicit environment/side-effect review.
- `purity_status.ts` says its grades are REPORTED and that it probes nothing; it must not be mistaken for measured status.
- Public registry JSON, DCLM receipt JSON, media, textures, and generated assets are separate data/content strata and should not be conflated with executable law.

## Candidate DNA layers — provisional, subject to dependency evidence

1. **Constitution / doctrine:** root statements, law, invariants, refusal semantics.
2. **Identity / membership:** Unity identity, agreement, keys, host identity, bot identity, participant lifecycle.
3. **Evidence / truth:** provenance, claims, records, mirrors, independent sources, temporal observations.
4. **Deterministic decision / authorization:** DCLM, Trinity, gates, admission, action boundaries.
5. **Resources / economics:** meters, ledgers, balances, cost, Merit/eFuse/Fuel/DCX representations.
6. **Execution / interfaces:** origin, pipes, routes, API, server, persistence, external feeds.
7. **Perception / cognition:** Iris, memory, voice, senses, body/interoception, world representation.
8. **Presentation / navigation:** HUD, UI, 3D world, renderer, cards, onboarding.
9. **Continuity / recovery:** receipts, replay, migrations, cleanup, idempotency, host independence.
10. **Research / narrative / assets:** cosmology, Plancksoft, public media, registries, conceptual material.

These are hypotheses for classification. A dependency graph may require different layers or multiple overlapping graphs.

## Complete tracked-file inventory


### `ABILITIES.md` — 1 files

- `ABILITIES.md` — 1008 bytes — blob `29e90f28dabea5f4863c59c9d3c759a67845583e`

### `eslint.config.mjs` — 1 files

- `eslint.config.mjs` — 1277 bytes — blob `bfc3c2560b42997c103f92bb5b681ce46163eb0c`

### `HANG.md` — 1 files

- `HANG.md` — 1724 bytes — blob `f9c5c6428bf7e86db2939d07e210f1a9fb32ce1c`

### `LICENSE` — 1 files

- `LICENSE` — 162 bytes — blob `4b0de195c3180f0296577b51bf4bde2898fc29e6`

### `migrations/auth` — 1 files

- `migrations/auth/0001_auth.sql` — 2739 bytes — blob `08c6b01fef9b46e72470fb66ea967d5f84e9bdb5`

### `OBSERVE.md` — 1 files

- `OBSERVE.md` — 1364 bytes — blob `7e76026bd05ee42ee593fc1f1cd18850b6ece7a9`

### `package-lock.json` — 1 files

- `package-lock.json` — 277203 bytes — blob `6596f72c9e33d1ab2bc5d2017a76b51337db4160`

### `package.json` — 1 files

- `package.json` — 3660 bytes — blob `c5083e19f10dea47b38f3eb4d07e7c745b818bad`

### `public` — 12 files

- `public/boot.html` — 491 bytes — blob `dd9088ec78d5694b9f29823a205d9b408dc2c820`
- `public/conscious-cosmos.png` — 251548 bytes — blob `ae4abda54e48e12352e4784714ed4d6cd22fbd74`
- `public/dclm-receipts.json` — 9491 bytes — blob `2bd1548264b252e5541aa983502d75a39c875ebb`
- `public/favicon.svg` — 503 bytes — blob `d4179b8c3ac795fccd0a0170148034ffea4e60d3`
- `public/logo.svg` — 503 bytes — blob `d4179b8c3ac795fccd0a0170148034ffea4e60d3`
- `public/observe.html` — 2269 bytes — blob `041fe865b8b4029baff40649febaf3508bd06c70`
- `public/og.jpg` — 128851 bytes — blob `d46ab3e8c02369d04e90cae6b175875c0fedf856`
- `public/robots.txt` — 119 bytes — blob `f965560f442689dce27b937f026167834a15ee8d`
- `public/splash.mp3` — 764928 bytes — blob `0b321f46b470be0cb056ebf9a44b26939a686ddb`
- `public/splash.mp4` — 30343749 bytes — blob `ec55ad253c8dc77a72220e5af3864a0d12678e9e`
- `public/where.html` — 1897 bytes — blob `c8a2a6c362f9c5b1e984ec6cecccd2b34a074a0a`
- `public/x-banner.jpg` — 66999 bytes — blob `6e037d985816d636a359f9e2e6eca0113d4c4e54`

### `public/__grok` — 8 files

- `public/__grok/icon-180.png` — 11768 bytes — blob `daa7f5da2c29c37ff9509e050727a0c766f453a1`
- `public/__grok/install/assets/homescreen/glass-puzzle.svg` — 1811 bytes — blob `df0defc5e1a653dd83304cac5fce08f3dd5fc0a0`
- `public/__grok/install/assets/homescreen/glass-share.svg` — 2388 bytes — blob `051eb8931f8bacb7499f840cf39140f705a6ff0e`
- `public/__grok/install/assets/homescreen/logo-grok.svg` — 1059 bytes — blob `930144f4d3ac08286b6bbe475c880a01804e4601`
- `public/__grok/install/assets/homescreen/ob-ipad.png` — 101843 bytes — blob `c2d4a0d3e111b0c6d9eaca7bbde0a5cafcafc58d`
- `public/__grok/install/assets/homescreen/ob-phone.png` — 103612 bytes — blob `1862fb7fd7fbe1fe8098edfde67923a027486779`
- `public/__grok/install/assets/homescreen/plus.svg` — 2401 bytes — blob `bc893abc91f74e2f8a3d12803e8cabbdcda8311f`
- `public/__grok/install/styles.css` — 6717 bytes — blob `445d3afc7d8ef0cf76eb87640ab698a31b0476c8`

### `public/film` — 1 files

- `public/film/welcome.mp4` — 11617464 bytes — blob `1bfd74a0623ea07dac187ecf8d0c6c976e2431ed`

### `public/fonts` — 5 files

- `public/fonts/Figtree-OFL.txt` — 4388 bytes — blob `80b12bb3d0c0942676657ef6d125daf4a1e1346d`
- `public/fonts/Figtree-VF.subset.woff2` — 23660 bytes — blob `1b644325bd2a11d3253e7d66f79b583321049295`
- `public/fonts/sora-600.typeface.json` — 41853 bytes — blob `c65ee694d44544bf6b0c8183b3ac53783721b794`
- `public/fonts/Sora-OFL.txt` — 4385 bytes — blob `f1d9d6af7ba46af6c2da765fa123d93239c913f5`
- `public/fonts/Sora-VF.subset.woff2` — 41696 bytes — blob `6dfe4597abc46380034c02b69f4da72c87bc1804`

### `public/plancksoft` — 6 files

- `public/plancksoft/CYCLONE.md` — 28168 bytes — blob `b0e003de15d39aae2c95faa08c0c8b51b0129f40`
- `public/plancksoft/LOOP.md` — 6207 bytes — blob `c832450662d48b872af039a1c54140b98ab1c85d`
- `public/plancksoft/MANIFEST.md` — 5878 bytes — blob `e2ec8abed3cfcdfca0144797fd4473b8907a4377`
- `public/plancksoft/MASTER.md` — 18082 bytes — blob `1864eb3c878784fc8b53946862205525a32d1a02`
- `public/plancksoft/README.md` — 1809 bytes — blob `93e2f15a60f2cedfe97b44fa64075c95f43e02d8`
- `public/plancksoft/rosetta.py` — 7943 bytes — blob `4d578f834b0e4779f3dd1eea7cc86fab24a732c5`

### `public/registry` — 10 files

- `public/registry/canada.json` — 1236 bytes — blob `1846890dcd72bb63e0f10d35e22a40825d0015e2`
- `public/registry/chambers.json` — 29302 bytes — blob `678928392c63a7a01a71157e90d21f304c2dad97`
- `public/registry/cities.json` — 160641 bytes — blob `9ce8906bad86498565530ca9db1c3ce61fc923e1`
- `public/registry/countries.json` — 375362 bytes — blob `8a0a3728b2d875eaa476b09a9a1b30f961a434bd`
- `public/registry/doctrine.json` — 1401 bytes — blob `f61561afc5a2e68c6aa9e02f088c581f0c193906`
- `public/registry/jurisdictions.json` — 12857 bytes — blob `050178f4ca95c77e10dcde58b17cc74bb0782d62`
- `public/registry/pharmacology.json` — 1037 bytes — blob `bc32cb0273e3981674b30ab535721dda5ae6920a`
- `public/registry/rtes.json` — 4627 bytes — blob `5b5ff38da12659fa46c5453e108c1a6041fcd516`
- `public/registry/sectors.json` — 14536 bytes — blob `4c843fb96d4067e5dfbd1dd0c7c15ae82429ba70`
- `public/registry/trinity-verdict.json` — 43808 bytes — blob `26535faef5faa76e077b7399dc1792d688ac08ea`

### `public/textures` — 4 files

- `public/textures/earth-day-2048.jpg` — 309272 bytes — blob `9cc9d7db170af7ddccb30bdfc7f9d4c29b526802`
- `public/textures/earth-day-4096.jpg` — 1044871 bytes — blob `dbb790128227f506acc937668f0138e9d2835c97`
- `public/textures/earth-night-2048.jpg` — 109675 bytes — blob `59d5d3b698f9f901e984c57a2a943f3574bc1e4f`
- `public/textures/earth-night-4096.jpg` — 383770 bytes — blob `caedbc58dec4b01a3ffdf4f1e036b51f0b36dbaa`

### `purity_status.ts` — 1 files

- `purity_status.ts` — 1255 bytes — blob `6346c85cf7b3065ea6a848e9d0eb08dd7d7bed7f`

### `README.md` — 1 files

- `README.md` — 254 bytes — blob `42364352756eed8685ddd66f50f7959f34038b5f`

### `scripts` — 29 files

- `scripts/agency-setup.mjs` — 1451 bytes — blob `20722545261ea5c5a2f8314f1d60f575aa2cd627`
- `scripts/app-env-plugin.mjs` — 1278 bytes — blob `9b9b69e071c99fb2ed1b56a759bead15169b2fe8`
- `scripts/brand-check.mjs` — 9609 bytes — blob `89a9e587c6cad6ee9944af28160fbfdc05fde1ac`
- `scripts/brand-check.test.mjs` — 15084 bytes — blob `bda0e9b6208db4bdb8a2b4ad84502680d30af7c9`
- `scripts/browser-guard.mjs` — 1724 bytes — blob `ebfbdb147f0b266a4ca46fe451daae1ae023c2db`
- `scripts/browser-smoke-verdict.mjs` — 4663 bytes — blob `020dd9991778b477e0003316064275db0d0fe3d8`
- `scripts/browser-smoke-verdict.test.mjs` — 15643 bytes — blob `d326fd3a6e4ed2f6f5d8c40b53086f9f85bae3e1`
- `scripts/browser-smoke.mjs` — 6042 bytes — blob `c1ae5d1216ebcada1dde366328dc3b2aef446e67`
- `scripts/check-auth-invariant.mjs` — 4203 bytes — blob `b558378c35f88069e34e344579391c395f565640`
- `scripts/check-auth-invariant.test.mjs` — 4218 bytes — blob `4cc9b6faa28b56c83a498003bfc9a2b200aad276`
- `scripts/grok-pwa-plugin.mjs` — 6615 bytes — blob `97821e8b28840b612d13c35bb95f6dfd07ffa006`
- `scripts/grok-pwa-plugin.test.mjs` — 21850 bytes — blob `30d01b79d8b71b64b00ff6c835cf66066be1df92`
- `scripts/grok-pwa-shared.d.mts` — 3206 bytes — blob `540021c825d34c3bdfe69d4a37fe9329144fca89`
- `scripts/grok-pwa-shared.mjs` — 18225 bytes — blob `b05a47d95e97d3f617585ddf10a7a0e9623a5fb7`
- `scripts/install-page.html` — 5658 bytes — blob `f1d3bdbd1a1a1c5337a019d7f188cfd1ce19b33d`
- `scripts/migrate.mjs` — 3181 bytes — blob `7b3dc087119d24d283b4ad89f1d8ab77f9d2ec9b`
- `scripts/migration-plan.mjs` — 1525 bytes — blob `861450f0849ab6f56a00c30ddeb91ac4262cc1f7`
- `scripts/migration-plan.test.mjs` — 3558 bytes — blob `ae2ffa74f0f722e0f99f0c6003c0aa367d1d06a1`
- `scripts/origin-smoke.mjs` — 2730 bytes — blob `5b6dbc7662d2ad833dbdbe8e737ed89c6fad1ccb`
- `scripts/preview-thumbnail.mjs` — 1762 bytes — blob `dd2afaed2b10ece67a7b8a5320b35d76edf0de09`
- `scripts/preview.mjs` — 11074 bytes — blob `cab7a4d0cc0e35dd7734362f70d3bbf64f6e42b5`
- `scripts/preview.test.mjs` — 9207 bytes — blob `cf39aecf27ccf30de42a28da07a88dd6b884095f`
- `scripts/selfboot.mjs` — 1206 bytes — blob `1f9fce85a5b2ad08a26ab4405f8c829f4b3048bf`
- `scripts/sign-out-plan.mjs` — 5971 bytes — blob `cfcd425d3fc423d2d3f9e7b9efd9f6d4721dfab6`
- `scripts/sign-out-plan.test.mjs` — 8659 bytes — blob `7c20d88df5ef0d8a448d007fe5e0aae9ae2e8883`
- `scripts/with-app-env.mjs` — 4601 bytes — blob `e48dfafa69fa33d5288269ce939236956ff75e9c`
- `scripts/with-app-env.test.mjs` — 4466 bytes — blob `823092f39cbf708d84a9abd5c0f4e658687b7265`
- `scripts/write-atomic.mjs` — 3607 bytes — blob `293e2951f4c0b729174f21a79baa0a717f1b03f0`
- `scripts/write-atomic.test.mjs` — 7505 bytes — blob `6df411a7d88059be2113bf1138ceb5982fcfb16e`

### `src` — 3 files

- `src/router.tsx` — 272 bytes — blob `a0e7546fd5d60f17e3e625b12938a829ce4dcada`
- `src/routeTree.gen.ts` — 15671 bytes — blob `07ee7fcb9b8085d73d2930af1b8f130d99e81fa5`
- `src/styles.css` — 576 bytes — blob `2bf1f0905469851a260de496f442124a0ac572d3`

### `src/components` — 2 files

- `src/components/preview-host-bridge.tsx` — 668 bytes — blob `98cb15d443328b2fdb5d9ae9e3bdab0eff453612`
- `src/components/speak-page.tsx` — 856 bytes — blob `a74da0ef22f391902736de4cbef876f3c0eb2b41`

### `src/dccp` — 611 files

- `src/dccp/body/interoception.test.ts` — 570 bytes — blob `edb4d6da6a864415b32213250671b40c2cf002c4`
- `src/dccp/body/interoception.ts` — 1850 bytes — blob `9bea43d20e22a094152f85bca4ecaf2998bd746c`
- `src/dccp/body/metad.test.ts` — 1091 bytes — blob `8f4fad4e7305f0112573e0a8eea668bc3b750722`
- `src/dccp/body/metad.ts` — 5958 bytes — blob `a49f1f8e8edd3fea0be523091e283d0b6e1d1a2e`
- `src/dccp/cosmos/between.test.ts` — 924 bytes — blob `f9b5d4a0daea93009005445cfa4530b9774d33ef`
- `src/dccp/cosmos/between.ts` — 4075 bytes — blob `da18dda392dbb2fc4b7c4a81619e5b2785c8609c`
- `src/dccp/cosmos/deduce.test.ts` — 786 bytes — blob `5d78b595bfb75b1e830a016cc33ffd7ad9fa703c`
- `src/dccp/cosmos/deduce.ts` — 2812 bytes — blob `938dcdc780b8406829d6b460d8406d8c89cbbb58`
- `src/dccp/cosmos/ephemeris.test.ts` — 1711 bytes — blob `63b4deed32b34a5333f41d4b416c82e7094d3dc0`
- `src/dccp/cosmos/ephemeris.ts` — 3893 bytes — blob `7170b27ea9ea90e83d68faf797d5b6143e72c35d`
- `src/dccp/cosmos/galaxy-scene.ts` — 5323 bytes — blob `3960b86f1998005a960ab9eaf7cc30741ae60d49`
- `src/dccp/cosmos/galaxy.test.ts` — 2792 bytes — blob `a16b68673b9fb6877769ecc119efb5299530c823`
- `src/dccp/cosmos/galaxy.ts` — 21921 bytes — blob `92184cae2460bc9b33394502849f0494a17592b5`
- `src/dccp/cosmos/geometry.test.ts` — 681 bytes — blob `cacca92ca8e0d78178aa14727a66b1d26a8c227d`
- `src/dccp/cosmos/geometry.ts` — 840 bytes — blob `5e202c5d0f42a6ca5046690f92eb5bae8615699d`
- `src/dccp/cosmos/history.test.ts` — 4211 bytes — blob `b78c982f02e292ffe61927be7e0db75d4cd29a7e`
- `src/dccp/cosmos/history.ts` — 16078 bytes — blob `7464eb54b8f0572876e81f16de371b8772c14263`
- `src/dccp/cosmos/hold.test.ts` — 642 bytes — blob `505b8bf45c0421f6c040aaf80d1db863348e57e1`
- `src/dccp/cosmos/hold.ts` — 1097 bytes — blob `c90a3993bb9d61ad3f0d67a4b52d0e221ff577c5`
- `src/dccp/cosmos/hypothesis.test.ts` — 574 bytes — blob `77e8aaf839a34850ba8898ec59b8a7934c1f313f`
- `src/dccp/cosmos/hypothesis.ts` — 1762 bytes — blob `f92ba1b55ce88ca88cf46db749aa3175693bf1f9`
- `src/dccp/cosmos/messier.test.ts` — 966 bytes — blob `ad346d2521b17751426ce79f2e55391d5e269152`
- `src/dccp/cosmos/next.test.ts` — 461 bytes — blob `9af77d1c07ee5d5844d0561b8d2b76a33556c2a7`
- `src/dccp/cosmos/next.ts` — 1343 bytes — blob `48e86a6d260d24d65946d523d1c366c8eac3d0b3`
- `src/dccp/cosmos/planck.test.ts` — 812 bytes — blob `3131e84737924ea9bb985a4d0699ca2f98458f04`
- `src/dccp/cosmos/planck.ts` — 2491 bytes — blob `5cfaca0b01dfed7b4ce72e53dad206fa99e69cd7`
- `src/dccp/cosmos/replay.test.ts` — 556 bytes — blob `29a5d3fc2405bce6c11c3482599de5f432befb3c`
- `src/dccp/cosmos/replay.ts` — 1854 bytes — blob `0dc688711c33515b39a314a0b3f83579973af374`
- `src/dccp/cosmos/scale.test.ts` — 507 bytes — blob `4ecb46904fbbf0ebf737b9b6b99e8cc0bcd24559`
- `src/dccp/cosmos/scale.ts` — 4025 bytes — blob `f85c77346fb7e9a730a225720255f473811c4e9d`
- `src/dccp/cosmos/shrink.test.ts` — 1718 bytes — blob `8ba7330670f76d1850d9c8680efb695b6ac88800`
- `src/dccp/cosmos/shrink.ts` — 4978 bytes — blob `b05416cab14b3c6a2a830c08bbe3238b6f8e5791`
- `src/dccp/cosmos/system.ts` — 7459 bytes — blob `16d164b592b564b693405dbc77f6a70844ddc198`
- `src/dccp/cosmos/temporal.test.ts` — 1418 bytes — blob `69b2180bb32e4fbc2ec751981294f1cb601f5722`
- `src/dccp/cosmos/temporal.ts` — 3657 bytes — blob `69f8039b8cbf19101538cbc2a49a21c644a9f544`
- `src/dccp/cosmos/theorem.test.ts` — 537 bytes — blob `6fba819539b911d2d323f5d7efcd18a6e67b9e37`
- `src/dccp/cosmos/theorem.ts` — 1084 bytes — blob `dbf1409759080a1ff670a3c8c3f4ee74e5f1ce2c`
- `src/dccp/cosmos/truthmesh.test.ts` — 1543 bytes — blob `c08748a835bb5047e8ef866f80a8382ee1263243`
- `src/dccp/cosmos/truthmesh.ts` — 4473 bytes — blob `ffc69c4b50c89699f97713f1fc676e4401b40f11`
- `src/dccp/cosmos/unknown.test.ts` — 636 bytes — blob `1e213d915548bd25326f7b054e81a1dc772b6c36`
- `src/dccp/cosmos/unknown.ts` — 1747 bytes — blob `5c08eb094024f7c17a697b12102bd269ade207d8`
- `src/dccp/cosmos/watch-load.ts` — 693 bytes — blob `ae1be316ed17db116cf88386dc8062206b7a2603`
- `src/dccp/cosmos/watch.test.ts` — 1906 bytes — blob `4d58c9a2310b316be2059ad602cacb425afd1ba0`
- `src/dccp/cosmos/watch.ts` — 11705 bytes — blob `5e29ad4df76a6850d3f49c6a038d07cd041c9891`
- `src/dccp/cosmos/weave.test.ts` — 608 bytes — blob `faf2a05dd0b8ab6ed7073c1b35b21bafedbe09d7`
- `src/dccp/cosmos/weave.ts` — 1596 bytes — blob `98f45cb7be7fc61927ac0335700fe16475699f98`
- `src/dccp/cosmos/why.test.ts` — 365 bytes — blob `73f38ee4f5f3dfb922a83c87b3e98ce573bfd736`
- `src/dccp/cosmos/why.ts` — 1267 bytes — blob `d6738e5d8a3b790f024d1986830a339f2bd9c387`
- `src/dccp/data/registry.json` — 74398 bytes — blob `6c66aa773dbb58d5c16fa75f3c4ba845fa53099c`
- `src/dccp/data/registry.ts` — 2788 bytes — blob `025bc26b38a48a355dbfd0ca63d7f4c2e5b19e53`
- `src/dccp/data/types.ts` — 2980 bytes — blob `53399597d74d6acecbf178b1ef67cdfbb8b193f3`
- `src/dccp/engine/ambient.ts` — 2543 bytes — blob `6cc0203a9a19b71758a9ee57b0aafed804dd00b2`
- `src/dccp/engine/flight.ts` — 2232 bytes — blob `2868e677036157ef63b3167d5d859a74df0af242`
- `src/dccp/engine/haptics.ts` — 1611 bytes — blob `aafd8c2112ad1cd0c24c3909826e45e0bba81fc6`
- `src/dccp/engine/pace.test.ts` — 713 bytes — blob `06cc8c7f128766e5c2aa0e3fc11004d298bcf914`
- `src/dccp/engine/pace.ts` — 1891 bytes — blob `cd4017bdc1b826265781a1e64a93e7caae39a2d9`
- `src/dccp/engine/renderer.ts` — 4327 bytes — blob `7dc20882f64bf2729e8984b94792f2b8d4733618`
- `src/dccp/engine/save.ts` — 4018 bytes — blob `a902836dc78bb81ce809bf835c353e59323e92ff`
- `src/dccp/engine/warp.test.ts` — 634 bytes — blob `86088cf0d23d3de94b31a64db3d95eedfd7ab392`
- `src/dccp/engine/warp.ts` — 8487 bytes — blob `cceb1f6778ccacbb83807bb9e84892d516cc46ca`
- `src/dccp/gate/cloud.test.ts` — 600 bytes — blob `c8d98a8c5f1463a8dc61e65425378b6b78a10802`
- `src/dccp/gate/cloud.ts` — 1966 bytes — blob `bd492bb82c7647e61f0d71081de9326b156c4fb4`
- `src/dccp/gate/collar.test.ts` — 6955 bytes — blob `f3d83b617c2097ff7f7b6828cfbfd7e98f6162e0`
- `src/dccp/gate/collar.ts` — 9413 bytes — blob `533a80f8cab3ba15a1def3ba317075d7fa70c113`
- `src/dccp/gate/desk.ts` — 4861 bytes — blob `d9b2c7e1d8740231e0a2aa6849b82887e0eb4d4b`
- `src/dccp/gate/film.test.ts` — 731 bytes — blob `6ec5e334fc804af28d43be9521f53c6263103457`
- `src/dccp/gate/film.ts` — 3769 bytes — blob `faffc80cfa17c770ef5213d3920ad371a265e609`
- `src/dccp/gate/observe.test.ts` — 487 bytes — blob `e7b90eb8c3696f62620bb619a577379d63458e5a`
- `src/dccp/gate/observe.ts` — 1703 bytes — blob `a8cdaef9aabc24a6a1e5a3a84028a5e4d5b90391`
- `src/dccp/gate/order.test.ts` — 1231 bytes — blob `fc149bbaf6a7137564e767994d4a25aaa7a9a6f1`
- `src/dccp/gate/order.ts` — 2325 bytes — blob `bbf7c9ed68d4cc39b8a104c7e35b72394f2ac42f`
- `src/dccp/gate/pins.admit.ts` — 718 bytes — blob `a11f4017924df7798c423461c7c7ad59c8fea656`
- `src/dccp/gate/pins.test.ts` — 1984 bytes — blob `f5c170b65676cd81dbe23cb4cf376e7d0f2f7148`
- `src/dccp/gate/pins.ts` — 1954 bytes — blob `62a0eaad488bc6979433a3879f82db391d0e2f6b`
- `src/dccp/gate/welcome-lines.ts` — 866 bytes — blob `1bc5bd65c32361f80d3cdc5f5133cfa6541602b5`
- `src/dccp/gate/welcome.test.ts` — 614 bytes — blob `25057a3d65b58030d28e66634d7bf760b4e2662d`
- `src/dccp/gate/welcome.ts` — 2319 bytes — blob `dee7c1566d0be545e5b233349c8a38110af400d3`
- `src/dccp/gate/where.test.ts` — 440 bytes — blob `a62bee3a15c3d8ecc308a89783136f71a604ca01`
- `src/dccp/gate/where.ts` — 1343 bytes — blob `3ffb385a3d0717029107447514577340986e67f6`
- `src/dccp/guide/use.test.ts` — 529 bytes — blob `183f09ed504986b947b3e47c5999017489c67400`
- `src/dccp/guide/use.ts` — 1972 bytes — blob `25994a4747ea5066c6446deb1030ef4bc100060d`
- `src/dccp/hud/gate.test.ts` — 1092 bytes — blob `917899ada1e309a521af24ec9692b231c4165582`
- `src/dccp/hud/gate.ts` — 1285 bytes — blob `ea5c33cc89882f8f54678430acdc42c47df79b8e`
- `src/dccp/hud/packet.test.ts` — 728 bytes — blob `11b990fc61ce0070999a5873cd079b728ccd6487`
- `src/dccp/hud/packet.ts` — 2295 bytes — blob `0b0d83f0d098e98a2d01343b7a5ebc7bbde07389`
- `src/dccp/hud/rollout.test.ts` — 450 bytes — blob `680f7adf0496ad4331bb6e2bc164f0ca195b6216`
- `src/dccp/hud/rollout.ts` — 2244 bytes — blob `d32d4e734fae2d727920e96ef5e750a171b4c0d1`
- `src/dccp/hud/seat.test.ts` — 715 bytes — blob `e26c8be32dd95f8629414df9d38e036e5bcbb73c`
- `src/dccp/hud/seat.ts` — 1409 bytes — blob `0f2d4e927345c7e1f69512cdd92ca023eaf2fe66`
- `src/dccp/hud/seedbot.ts` — 1263 bytes — blob `48022d62da9750ee503940dd1465df0f1ca38a00`
- `src/dccp/index/map.test.ts` — 837 bytes — blob `61ac601ff0627e1e1531f37de3c7d20759c74ecf`
- `src/dccp/index/map.ts` — 2233 bytes — blob `fc9fc14d3eb01e3130bbfdfc0e94ea6a70b9b47a`
- `src/dccp/index/site.test.ts` — 703 bytes — blob `f0878fc94b76ea62c68176bb60a2a058da455a17`
- `src/dccp/index/site.ts` — 863 bytes — blob `03a922779f3cee868c092116a82673173263cea0`
- `src/dccp/index/statement.test.ts` — 635 bytes — blob `793f4a7230d21adb3e7251b5f38d835ce18110d9`
- `src/dccp/index/statement.ts` — 512 bytes — blob `dc02a7417afcb24714b27ad9a620de1c9b9cd121`
- `src/dccp/iris/blueprint.test.ts` — 588 bytes — blob `e0cd5800609841b85e94925edd19699d0d82674e`
- `src/dccp/iris/blueprint.ts` — 1486 bytes — blob `8b8a76adbb92e5c12f18439d52da6177ff28fead`
- `src/dccp/iris/brain.ts` — 115893 bytes — blob `084242f272275fff93dd40cabd7831984ece0ecf`
- `src/dccp/iris/craft.test.ts` — 469 bytes — blob `53f4fbb8c0e6f107a9e42ef4bc3e6e69a54ecf8c`
- `src/dccp/iris/craft.ts` — 1157 bytes — blob `3a117b1509a15468d6ef681ea738b1136abef221`
- `src/dccp/iris/dictate.test.ts` — 684 bytes — blob `5947d181a50d37df7102d2d22a4a1f6b81621d32`
- `src/dccp/iris/dictate.ts` — 5633 bytes — blob `e71667acf785c85e0f903f8755cb90e048c1dc68`
- `src/dccp/iris/echo.test.ts` — 493 bytes — blob `8f0085e51b3c84250467af89381c5cb98801b3a0`
- `src/dccp/iris/echo.ts` — 620 bytes — blob `605f79e1c8c8b5cc6a81a2f24eac429f7e067aee`
- `src/dccp/iris/grade.test.ts` — 1155 bytes — blob `4098607b77a85d0f120f44ece33b34c05d5f875d`
- `src/dccp/iris/grade.ts` — 2120 bytes — blob `8c221429cca05d52610b1693864225d1ee454f0c`
- `src/dccp/iris/hall.ts` — 3215 bytes — blob `85204d3865ddd271e70bb638d79499cc7ec64406`
- `src/dccp/iris/manner.test.ts` — 499 bytes — blob `b7f2a5350861caecd334a5677b0c6866daf14fe6`
- `src/dccp/iris/manner.ts` — 675 bytes — blob `6c62cb2e07400793558cd89eac62724e8b5626c9`
- `src/dccp/iris/memory.test.ts` — 592 bytes — blob `f15769410c0c3c4dda06a093a87bbf73d3f85a78`
- `src/dccp/iris/memory.ts` — 2221 bytes — blob `3ef9cffe0e9789047967f3b19623c66e09a135fa`
- `src/dccp/iris/mirror.test.ts` — 782 bytes — blob `4e4e31f1ef47346a32bea4937f8b7a7c3c9579bd`
- `src/dccp/iris/mirror.ts` — 1170 bytes — blob `4f16e7bb98f7f657cd453f5afb29d240750a2138`
- `src/dccp/iris/neuralink.test.ts` — 443 bytes — blob `f62cb177084176d0ed6b5251b0e28decc2f8021e`
- `src/dccp/iris/neuralink.ts` — 1212 bytes — blob `d4b67c111074eac9e7b7055dac35283faa174faf`
- `src/dccp/iris/nodata.test.ts` — 699 bytes — blob `5a51882163378c895cdbe9b744071e6947d6ffcf`
- `src/dccp/iris/nodata.ts` — 1290 bytes — blob `f00ac36cc3c8dfa8a3eb04b670d5c1cfee324e72`
- `src/dccp/iris/orb.ts` — 6603 bytes — blob `a0faf3b658df9ea733b0ed7c96418ff5121692d4`
- `src/dccp/iris/plan.test.ts` — 531 bytes — blob `6c3f1283395a3e6ca8b31b89ea6b642ef41614ae`
- `src/dccp/iris/plan.ts` — 990 bytes — blob `03dcd93a8b8b825b167775a9120aaea150cae48b`
- `src/dccp/iris/realm.test.ts` — 1131 bytes — blob `796ea5646304b52f8b21febb896da499555e4503`
- `src/dccp/iris/realm.ts` — 2151 bytes — blob `4c7f69c736b7e94cc4628ef63be7536085b07eb9`
- `src/dccp/iris/senses.test.ts` — 837 bytes — blob `845e36fc62626f8d679d046c43b400c959bdc902`
- `src/dccp/iris/senses.ts` — 3534 bytes — blob `d5a3f1aabe5ec4b3669dd818d3aefe29dc7f6113`
- `src/dccp/iris/task.test.ts` — 502 bytes — blob `e0c67688a7202897c11c56837d101008cee30bc3`
- `src/dccp/iris/task.ts` — 590 bytes — blob `e214bd5461b37a46a6e357b38c02ce3efe1de293`
- `src/dccp/iris/voice.place.test.ts` — 1696 bytes — blob `4a0524c9a3f451d9c15a1fef37474770008c7e67`
- `src/dccp/iris/voice.test.ts` — 381 bytes — blob `86a33a402c904c852b1e3ffed841d4fec977cd70`
- `src/dccp/iris/voice.ts` — 15609 bytes — blob `fa07902ad501687c4a772042eb8e0d2cc521a5d7`
- `src/dccp/law/acuity.test.ts` — 786 bytes — blob `1dbc702153d2c85dfb3e0a18d392ebd30ca5f04b`
- `src/dccp/law/acuity.ts` — 1795 bytes — blob `0281d0c0bc38bcfb541eda4fb8267f8aeb7e6dde`
- `src/dccp/law/ad.test.ts` — 369 bytes — blob `8210deb559025f5b8e4cc3dc8a2e0cb16ec31800`
- `src/dccp/law/ad.ts` — 361 bytes — blob `577bd1109fc9d4a08892d8f97601ef1a5bf04af9`
- `src/dccp/law/alert.test.ts` — 426 bytes — blob `ad41d4d7c01c9b100398879ee1f1ad4455ea5d3d`
- `src/dccp/law/alert.ts` — 908 bytes — blob `9db3d85e670b389a55cbbbde3c37ba53e423f713`
- `src/dccp/law/ask.test.ts` — 1165 bytes — blob `7dd2eee413371dff138006704ef2379b9d0d6307`
- `src/dccp/law/ask.ts` — 2832 bytes — blob `b107fe80db53cdf7b806405e99859db822c22bf7`
- `src/dccp/law/audit-build.test.ts` — 397 bytes — blob `58cee495696e8b11845548f0f4f8bf441548836f`
- `src/dccp/law/audit-build.ts` — 1710 bytes — blob `995c7f4901f95f72a26af5112b06805c0bebbdca`
- `src/dccp/law/bare.test.ts` — 522 bytes — blob `bfb1ef0d58ba226acdc35119b172c74e3f46835e`
- `src/dccp/law/bare.ts` — 1082 bytes — blob `78269087ad297bb05cd5f96bc5d5353636788ca3`
- `src/dccp/law/bound.test.ts` — 443 bytes — blob `70fb74513230c96d91aa74a6b181a4c5e703bd9b`
- `src/dccp/law/bound.ts` — 894 bytes — blob `e050876ff19fdf11b6b47fe65672a00fd2629816`
- `src/dccp/law/companion.test.ts` — 1101 bytes — blob `865a4a2f782cd7b1e5b497042fc013cc2b088a5f`
- `src/dccp/law/companion.ts` — 3565 bytes — blob `884578c76c335b55c5a0e7d941669a51c76c0989`
- `src/dccp/law/compile.test.ts` — 681 bytes — blob `c9bbf1d37412459e5acd19dc3cb5e5ea2f5ad8c3`
- `src/dccp/law/compile.ts` — 2153 bytes — blob `12324d0a76b80078ff3791213b9f95ba19400526`
- `src/dccp/law/coordinate.test.ts` — 579 bytes — blob `1c8d46a2072ed1a16f1bafa6d0100cd8700132d6`
- `src/dccp/law/coordinate.ts` — 1982 bytes — blob `aeeda9f6b045e4b9d5391dff1a9a27f716a930d5`
- `src/dccp/law/deception.test.ts` — 529 bytes — blob `bd9ab54d70f11b81fbe4ef58d949caca3cd82b89`
- `src/dccp/law/deception.ts` — 1715 bytes — blob `8e6997fc3ccba69a21761ba722d7d2c8eec3fa31`
- `src/dccp/law/disease.test.ts` — 554 bytes — blob `74c86e2f5a4a3ea747ea6d85c96deb7fac8580a8`
- `src/dccp/law/disease.ts` — 2032 bytes — blob `2dd644cb593dc7ea6cab5ec6a604f6b14fc7ffdd`
- `src/dccp/law/divine.test.ts` — 414 bytes — blob `a73d51f6bed88e4bda4bd7ec82157afdd2b27f4c`
- `src/dccp/law/divine.ts` — 902 bytes — blob `8ced8a9864e5da8c22435d30c7857d16fbd2ae3a`
- `src/dccp/law/elevate.test.ts` — 449 bytes — blob `6d6eeeac61ae126e217d06bb648416aa4ad55b58`
- `src/dccp/law/elevate.ts` — 746 bytes — blob `6b255efb7f6cc783608ab3f2aa4a7373973dc18a`
- `src/dccp/law/engine.test.ts` — 1243 bytes — blob `9c25b6a9c407b93269e243fd86ee37b240f679a8`
- `src/dccp/law/engine.ts` — 4602 bytes — blob `0a9fe63350474fdf620de65d31fa000caadcbbed`
- `src/dccp/law/entity-seat.test.ts` — 434 bytes — blob `3976caf24880aed42b204b2712e81018beb7cc5f`
- `src/dccp/law/entity-seat.ts` — 711 bytes — blob `a16c579976ccaa015c50d77cb978d2edc55ac823`
- `src/dccp/law/evolve.test.ts` — 445 bytes — blob `dddb17e9751e7846c8b67333df69060cde88866a`
- `src/dccp/law/evolve.ts` — 1024 bytes — blob `bd95887b86957a329626a43949815bd93f29b4a4`
- `src/dccp/law/floor.test.ts` — 731 bytes — blob `679676eee9c5498e958c96af17b6e924a74da664`
- `src/dccp/law/floor.ts` — 2682 bytes — blob `5f0c2b91925d79069ad49a2dd3927080a329866e`
- `src/dccp/law/forest.test.ts` — 391 bytes — blob `2ddc9b6002a29cb7dfc716c3bc12961c0ab0acca`
- `src/dccp/law/forest.ts` — 743 bytes — blob `2db68d3c2fa0cbcc6fdf7e33b2e26506c06dbf38`
- `src/dccp/law/form.test.ts` — 2508 bytes — blob `cc5904984f539f8e8fa1485fc08c49ee9d982b29`
- `src/dccp/law/form.ts` — 5679 bytes — blob `68717f2fa8db11875fcebcf02ad1f8750ff905b6`
- `src/dccp/law/gem-scene.ts` — 1728 bytes — blob `e20772e3154dfd75e1cf7a74fb9b5d6c8b767f08`
- `src/dccp/law/gem.test.ts` — 861 bytes — blob `34d10a4db2111024a6e2b5a828888a7691a6cdfa`
- `src/dccp/law/gem.ts` — 2034 bytes — blob `7a82cb325d96ffe85e7ced6d47e4e7c294c93fa2`
- `src/dccp/law/halve.test.ts` — 523 bytes — blob `7d169e8086e7c2f24263b2fafe2997b5e314daa6`
- `src/dccp/law/halve.ts` — 1393 bytes — blob `31266cb44765870a88afdfa5efa6fc93d7290420`
- `src/dccp/law/icd-watch.test.ts` — 446 bytes — blob `70d2db06c33eb5e9539b4092bf2e311e640f6ecb`
- `src/dccp/law/icd-watch.ts` — 1585 bytes — blob `924afaa4f922e9feb791e6115b398da948b6392d`
- `src/dccp/law/instinct.test.ts` — 957 bytes — blob `9d9dfa9c049a8fe6cecd23df2cfcfbc4dc1aee84`
- `src/dccp/law/instinct.ts` — 1447 bytes — blob `9a509779d95bbb4611188f4543430bc0ec5a9303`
- `src/dccp/law/kin.test.ts` — 598 bytes — blob `1b68a7cd9036c9d7a9555f547c3df2f2c9c7f270`
- `src/dccp/law/kin.ts` — 2176 bytes — blob `2d2710f9a8f36b91b9cefe9ebf3d8d1bc6560630`
- `src/dccp/law/lattice.test.ts` — 929 bytes — blob `09b6fbfc480f820d9bf5585a72b4cc6a8b710630`
- `src/dccp/law/lattice.ts` — 2508 bytes — blob `4b88fa601886b9829d42474e119a573ab216ba93`
- `src/dccp/law/layer.test.ts` — 840 bytes — blob `793544f0b07e407cbc15a044114bce00dabb3d2a`
- `src/dccp/law/layer.ts` — 2000 bytes — blob `e8c983ebb033ff3a27d614cdf1d9e8e800873774`
- `src/dccp/law/light.test.ts` — 722 bytes — blob `eec95cb27545c67f2b878f1491b9d6c3f79b0c19`
- `src/dccp/law/light.ts` — 5551 bytes — blob `d74a6a6ba4410c0b65b67f095ce121058f395088`
- `src/dccp/law/lighthouse.test.ts` — 659 bytes — blob `bdbf9b686d1e23dae4e18acdc58344b7290a4642`
- `src/dccp/law/lighthouse.ts` — 1734 bytes — blob `245b0b8a551eb9157a2f0d8e8683edb3cf4ff737`
- `src/dccp/law/line.test.ts` — 794 bytes — blob `4b207521f1cc9837873c181f64e60c2ae20a6850`
- `src/dccp/law/line.ts` — 1272 bytes — blob `6d9ea4940dc3ceb1ce37c57e24386430170978f0`
- `src/dccp/law/logic-tree.test.ts` — 2077 bytes — blob `19c451286fcc8fae007691892c8c498f577d9ced`
- `src/dccp/law/logic-tree.ts` — 9545 bytes — blob `0ff81cf34b2f5b731c651c50b136f079fba18549`
- `src/dccp/law/manifest.test.ts` — 1322 bytes — blob `79aef28336d7240b2d618ee34e3bccae3e5ae460`
- `src/dccp/law/manifest.ts` — 4354 bytes — blob `d8fb65c146e2f25585e2f1ad6562eb1832b46390`
- `src/dccp/law/matrix-scene.ts` — 2221 bytes — blob `32d5c912dec5bc417fc4722c5ff028641003f9c8`
- `src/dccp/law/matrix.test.ts` — 1022 bytes — blob `568dd0d872bd04def0df8c7cc65eed428ce0b228`
- `src/dccp/law/matrix.ts` — 4454 bytes — blob `5e63c316c0a2b2d1a5d676117235a559baba2637`
- `src/dccp/law/memory.test.ts` — 1373 bytes — blob `03c901cae0d5e7279ef000c191d8e954a2429abc`
- `src/dccp/law/memory.ts` — 3743 bytes — blob `b03401d352968a5180aaf7cd1383687707e2b2e8`
- `src/dccp/law/nature.test.ts` — 537 bytes — blob `15adb2fc03a9aa1ef1661882e347f06ea6fc7b43`
- `src/dccp/law/nature.ts` — 836 bytes — blob `21fb0e00b108effb9f968730020e818675f42008`
- `src/dccp/law/needed.test.ts` — 705 bytes — blob `52a8f10a023c634178756a815a2d69c461238c17`
- `src/dccp/law/needed.ts` — 2956 bytes — blob `a9e1924b1c495cf3aac0d58fb5e73d171e273cf3`
- `src/dccp/law/nerve.test.ts` — 1368 bytes — blob `5921bb207ee29c43dfd50408bbd7888c6b0e86d3`
- `src/dccp/law/nerve.ts` — 1887 bytes — blob `c08d509e60047fc33efacc7f332a02bc8eb4b0eb`
- `src/dccp/law/partner.test.ts` — 493 bytes — blob `e465f3ff93a85f62b37fbbb9a0f7816226cdf687`
- `src/dccp/law/partner.ts` — 1079 bytes — blob `ffad723ed8c354ded3dc84d5b5c003c521651ec2`
- `src/dccp/law/publish.test.ts` — 761 bytes — blob `1b8019cfd225cb8e75a07c437a7d6e0e9939fbe1`
- `src/dccp/law/publish.ts` — 1528 bytes — blob `f27696cc8ff1b5511d0f194b93bb195e850ec93c`
- `src/dccp/law/pure.test.ts` — 727 bytes — blob `23ee85837f09b45aca153233f2e5a826c9f101bb`
- `src/dccp/law/pure.ts` — 1500 bytes — blob `648e951ba5cb81c292e9c134a3bc77491400ec61`
- `src/dccp/law/purity.test.ts` — 2734 bytes — blob `1b9ab8c70e3b793e773d1e80c59c1cdb6b4b0ca8`
- `src/dccp/law/purity.ts` — 5063 bytes — blob `64833d66ff12ca0a17d93f899808c966ff70aa61`
- `src/dccp/law/release.test.ts` — 522 bytes — blob `97ae7b6fd4d8280a1077a54201a871ffcd40f37f`
- `src/dccp/law/release.ts` — 1130 bytes — blob `19de5e28ec6a9d1e845a471cfc03dea197f2a45a`
- `src/dccp/law/rings.test.ts` — 357 bytes — blob `bfb58799ee733722dc15693ae5286b57773609ed`
- `src/dccp/law/rings.ts` — 1308 bytes — blob `b319deafe73813236456d164103383cb16bf9e14`
- `src/dccp/law/root.test.ts` — 450 bytes — blob `ce385880183038191a3e1db3e3ccc08cd7bfe3b4`
- `src/dccp/law/root.ts` — 1982 bytes — blob `c499b18694aecc1acc0190b186e232efd2b2cb01`
- `src/dccp/law/symbiosis.test.ts` — 1256 bytes — blob `4bb36d6cbef00249816739c42181f48ed2965b16`
- `src/dccp/law/symbiosis.ts` — 5396 bytes — blob `0dc6df26cba267ca3c61a1384f118ddd85fc262a`
- `src/dccp/law/ten.test.ts` — 358 bytes — blob `5baa8f34a7caef66a3418409a9811c346d6c515b`
- `src/dccp/law/ten.ts` — 1408 bytes — blob `6fa218c4f040d12885d872cc5a4fc8cf18478cbd`
- `src/dccp/law/two.test.ts` — 317 bytes — blob `07ebe69c6afff3f8c0df55d55b182b3831543d95`
- `src/dccp/law/vision.test.ts` — 483 bytes — blob `a15d9fbdd16be112fd4297b6b4e9f80cbea4a944`
- `src/dccp/law/vision.ts` — 1156 bytes — blob `8d495caa74c1f3775b3a79f603442ac9b2312f34`
- `src/dccp/ledger/access.test.ts` — 1160 bytes — blob `e0c7165b5dd076ce28cd85c3cb6b49322f316efa`
- `src/dccp/ledger/access.ts` — 1874 bytes — blob `aea0809d4ec7abfd107e4162b8e3edc770f738fc`
- `src/dccp/ledger/blackhole.test.ts` — 1112 bytes — blob `3539bcf6d1345eea13cee55fae923f91fcb893a5`
- `src/dccp/ledger/blackhole.ts` — 1633 bytes — blob `178be0800c9ed6e18063a1e733e6a93994dd3b28`
- `src/dccp/ledger/dark.test.ts` — 741 bytes — blob `f77a86c1cd15a68cd430beb2692bc0d1f5c8e422`
- `src/dccp/ledger/dark.ts` — 8635 bytes — blob `7ee1ae1bffaea3f2bd0c51c90c9f63030473aef3`
- `src/dccp/ledger/ease.test.ts` — 442 bytes — blob `ba4314e7672ffdb055751b7f3a6c4a21f7e783c3`
- `src/dccp/ledger/ease.ts` — 546 bytes — blob `e11c54fde809e8fe82ad128999ef63ac346f1c8c`
- `src/dccp/ledger/face.test.ts` — 1050 bytes — blob `e9d0f2230e610a01e76d8c77f4896b89bf445266`
- `src/dccp/ledger/face.ts` — 2575 bytes — blob `fb9a0b4925f0e9516676d4ab2bd7c2da217aaf23`
- `src/dccp/ledger/hold.test.ts` — 647 bytes — blob `6b0b1aff49b9ebde009c73ba58f6dd4d3786d296`
- `src/dccp/ledger/hold.ts` — 1049 bytes — blob `3bc9e2d71312985f49508bae2c335bd7eb5eb7a7`
- `src/dccp/ledger/juvenile.test.ts` — 1410 bytes — blob `5bb88cf6a203210049cfb920ad28d827cde70f7b`
- `src/dccp/ledger/juvenile.ts` — 2910 bytes — blob `4093dbd20de7c86960f02ed02fffa623d014e854`
- `src/dccp/ledger/toddler.test.ts` — 1172 bytes — blob `1f4644d68df9372245f1f737489810b876137a72`
- `src/dccp/ledger/toddler.ts` — 2150 bytes — blob `3a3d2a2d7caae9d445599f3bae74ebad6c044537`
- `src/dccp/ledger/totality.test.ts` — 713 bytes — blob `0195b79908a5a5e0d7a9788e20e3690f7ae37b6c`
- `src/dccp/ledger/totality.ts` — 812 bytes — blob `32f21b59e3f9320d168cb72e3b3c2f0c7f55c966`
- `src/dccp/live/activity.test.ts` — 1600 bytes — blob `65d2c053c6f8d6c715fbb887a2cbce545ad347cd`
- `src/dccp/live/activity.ts` — 8967 bytes — blob `65729f5700477c7b64b46380a52be3afaa3dc44f`
- `src/dccp/live/adopt.test.ts` — 2156 bytes — blob `10875c1a075282a896130f8de419c80754bde695`
- `src/dccp/live/adopt.ts` — 7353 bytes — blob `e967881d21145dbace4ef8e1e7fa5b3a0bf51936`
- `src/dccp/live/air.ts` — 473 bytes — blob `00a6403b6db563c936bc1abd1f257a70314cf9ed`
- `src/dccp/live/almanac.test.ts` — 1782 bytes — blob `3e0d6a631bf3ace9025ec041067c61b2eb0df646`
- `src/dccp/live/almanac.ts` — 4675 bytes — blob `b048203a016676d8e22b809546523d7bc55dcba8`
- `src/dccp/live/amsterdam.test.ts` — 358 bytes — blob `2d99e67cc8826bd9609317e95ba340d029919109`
- `src/dccp/live/amsterdam.ts` — 1028 bytes — blob `a2f19c770197efcae64837406507281f53a640aa`
- `src/dccp/live/easthill.ts` — 4173 bytes — blob `e1ce62a53ef9fb2f48b461a9354daf24b66f6a88`
- `src/dccp/live/feeds.live.test.ts` — 366 bytes — blob `b8dc44341227c71e080cc86d9f7ad03b28e22afd`
- `src/dccp/live/feeds.retarget.test.ts` — 603 bytes — blob `dbf4dcaed3417943b48b82c1d0c20c677ad2ad32`
- `src/dccp/live/feeds.ts` — 10138 bytes — blob `2f98156870653c72e4a42ee76e1318d6d86f1d1d`
- `src/dccp/live/ground.test.ts` — 1563 bytes — blob `5990f762e491234678c30d7f3bca8cb4c84c0f61`
- `src/dccp/live/ground.ts` — 5887 bytes — blob `62ba8e6511292f3ba0bf0df4290cad8abccbbd15`
- `src/dccp/live/handoff.test.ts` — 526 bytes — blob `2722da6e0d48087a044a0619f31ba6c4a693c111`
- `src/dccp/live/handoff.ts` — 6052 bytes — blob `76bccf87e4baa66772ddcc799181bf8389d462d6`
- `src/dccp/live/keep.test.ts` — 1775 bytes — blob `c113268588fb9989895006379c5b301c9a9a299c`
- `src/dccp/live/keep.ts` — 2850 bytes — blob `e87175fe0e363004c3a8b585cc204c107d6091ee`
- `src/dccp/live/onsite.test.ts` — 703 bytes — blob `8d52278a9dc28ffa10585b6d78b68bf5a8c67e11`
- `src/dccp/live/onsite.ts` — 2652 bytes — blob `aadce432f17402e6198d15d801cb24985a17cf67`
- `src/dccp/live/place.ts` — 2611 bytes — blob `1f8394ca1db2cfe768c0378f98bf4bcf9ad00746`
- `src/dccp/live/posted.ts` — 2226 bytes — blob `75185aeec157857549af8bbcb20cea90a3405598`
- `src/dccp/live/proxy.test.ts` — 2179 bytes — blob `b4c65c177dc1ded6a9fee6e20619a469bdceae0d`
- `src/dccp/live/proxy.ts` — 6474 bytes — blob `0428e895dd61679248c5ea01e1360a3aa4ad3fc3`
- `src/dccp/live/rural.test.ts` — 656 bytes — blob `c29ddd1694e7c903679ff826d2fb9778b8b4d652`
- `src/dccp/live/rural.ts` — 1548 bytes — blob `5cc28a8c848021a072d3c09da4e8da96faed1350`
- `src/dccp/live/seat.ts` — 8114 bytes — blob `945e87e9877369b91421ad596033c821bef53780`
- `src/dccp/live/sheet.test.ts` — 903 bytes — blob `e4e7820bc4af3a3d66f9e2977479168c0ec38445`
- `src/dccp/live/sheet.ts` — 243 bytes — blob `0f1a0801e1571bdf045eb4693666254c317cdb5c`
- `src/dccp/live/show.ts` — 196 bytes — blob `b8cc4db1ec547b83f6276f34f90cd8835ce80ab6`
- `src/dccp/live/wiki.test.ts` — 1663 bytes — blob `71cd48898535b64110e5c59f206994e09d37e696`
- `src/dccp/live/wiki.ts` — 5983 bytes — blob `344a2975a8eaef3c63ba1885e0ee13091e8cfa6e`
- `src/dccp/main.ts` — 62644 bytes — blob `dbce342cdf28ef7c4e65804c102420a44b0dc0be`
- `src/dccp/memory/dna.test.ts` — 2111 bytes — blob `79a9419f7d8220a2963d86732400891c51c0317e`
- `src/dccp/memory/dna.ts` — 8520 bytes — blob `020d2536e5bf75da0e7af302bea4dfabd63b8824`
- `src/dccp/memory/layers.test.ts` — 848 bytes — blob `8398dd8b4220ff131420209ca5ed2ee529799512`
- `src/dccp/memory/layers.ts` — 3865 bytes — blob `43d00d1ec76b7149fe9906b185dc61a614a0dfd0`
- `src/dccp/memory/table.test.ts` — 917 bytes — blob `69d75e3b9de98f926061185b52e84057487063cd`
- `src/dccp/memory/table.ts` — 5052 bytes — blob `e8b89d0952271e039be5c6d5311628e9197641fa`
- `src/dccp/meter/again.test.ts` — 672 bytes — blob `30ea9ece54828e7c8b4a50177c5d5f240d42ff6f`
- `src/dccp/meter/again.ts` — 890 bytes — blob `b248c202d3500b53151b9b43093edc6acbbb05fc`
- `src/dccp/meter/blocks.test.ts` — 1720 bytes — blob `4328d30f99927c59e38109ab576b4894c32b4f6b`
- `src/dccp/meter/blocks.ts` — 3344 bytes — blob `16029a2c7dd1241a14d00cc2d9879acc172c54d6`
- `src/dccp/meter/bridge.test.ts` — 367 bytes — blob `c8d958838816d26b86017ca67836f266436249c1`
- `src/dccp/meter/bridge.ts` — 848 bytes — blob `742d8afe5be9bfbfe3fcfc47ab0597330864f416`
- `src/dccp/meter/brief.test.ts` — 705 bytes — blob `799022ff11b273e1ba65e01bffe33b8d58eb26ab`
- `src/dccp/meter/brief.ts` — 1902 bytes — blob `c37982e237b6c1d2b3e98bde1a8011e5fc93b191`
- `src/dccp/meter/chain.test.ts` — 1008 bytes — blob `ef04fc143119d155e99b5f9038751a7cdf4a785f`
- `src/dccp/meter/chain.ts` — 2132 bytes — blob `fad5d306e5601e07a8ba5840308ec7db4578a5cf`
- `src/dccp/meter/close.test.ts` — 2419 bytes — blob `07097949eb24fb9a51e5cb45f10dac39cd0251bd`
- `src/dccp/meter/close.ts` — 8853 bytes — blob `fab695137d1d2eb259d967ab2bc0b6c35f266459`
- `src/dccp/meter/coins.test.ts` — 2528 bytes — blob `382455921a9632f87bb0f723282396df6e73fe6f`
- `src/dccp/meter/coins.ts` — 7360 bytes — blob `3ee404afcaba9af7fef747d065aab2f52eaed7b8`
- `src/dccp/meter/cpi.test.ts` — 1308 bytes — blob `38b4b33a695bcef2b89877a1c22131090deaf076`
- `src/dccp/meter/cpi.ts` — 4316 bytes — blob `819402f8e60a153dbb2058e6d09a1da730384d44`
- `src/dccp/meter/decision.test.ts` — 1283 bytes — blob `8348db920a810285bf02690d265522f40109fd85`
- `src/dccp/meter/decision.ts` — 4155 bytes — blob `5f33fe6033341c29362f42aad08fb1d91feea8b2`
- `src/dccp/meter/dual.test.ts` — 685 bytes — blob `2e1f87e110290be666b17b093fad1e29894a2fa3`
- `src/dccp/meter/dual.ts` — 1457 bytes — blob `5a779b034e5176d50393bf9f022849f1f22d6814`
- `src/dccp/meter/dualpipe.test.ts` — 781 bytes — blob `1fdae82787be45d479c2ff7a08763e236e2a4f99`
- `src/dccp/meter/dualpipe.ts` — 3585 bytes — blob `8fc40a9a68988d4f2e29628f314ec0eb7efb551e`
- `src/dccp/meter/economy.test.ts` — 1171 bytes — blob `75a7de967dafe1d13240943825bc06d61d782816`
- `src/dccp/meter/economy.ts` — 6607 bytes — blob `48f4f68e3dd48d31e892c3a76fcc66e14f61d4cf`
- `src/dccp/meter/explore.test.ts` — 1494 bytes — blob `ded9fc07a1113bcdf1b797e5e1f04925aabbaf67`
- `src/dccp/meter/explore.ts` — 2152 bytes — blob `a59346be44ca99434f7e494a6aae18665955f436`
- `src/dccp/meter/forbidden.test.ts` — 443 bytes — blob `c0898ea0c51c62c93e0ec6806ec7b06651a21641`
- `src/dccp/meter/forbidden.ts` — 475 bytes — blob `a3c4f7f9d42f9e955372e8ab85ff2993457292ff`
- `src/dccp/meter/friction.test.ts` — 835 bytes — blob `0353dbc57dc5ef3a09d9b4e8fc7d461fa23c6b24`
- `src/dccp/meter/friction.ts` — 1301 bytes — blob `c9228323dadcc7324d8cb950d17e87e0c2d8c1eb`
- `src/dccp/meter/gap.test.ts` — 1222 bytes — blob `d4009189839f9d0d0be111b3f1828602cc2543a8`
- `src/dccp/meter/gap.ts` — 3617 bytes — blob `aa3f2e5305e998465beddce165f33f8d3ea8c224`
- `src/dccp/meter/held.test.ts` — 402 bytes — blob `17ceb8ba7e4fe0b2d1a2faf8dac1c157fff4b8f7`
- `src/dccp/meter/held.ts` — 805 bytes — blob `1a8f3edc348bab646eb2cb46b02353a0e9892d69`
- `src/dccp/meter/idea-circuit.test.ts` — 1499 bytes — blob `6bc2c62ad59db51f5dc3662d81a09fe577131180`
- `src/dccp/meter/idea-circuit.ts` — 2740 bytes — blob `61f6682308b3c39e150a90f3e5b076c10d1abb68`
- `src/dccp/meter/keychain.test.ts` — 650 bytes — blob `23a8bc94c544afbce2d798b3b060be9341edb21f`
- `src/dccp/meter/keychain.ts` — 1097 bytes — blob `d5320662fae137f5b7d76361fd212fb869c129e4`
- `src/dccp/meter/keys.test.ts` — 954 bytes — blob `4c7c66ddd4b08439d01517d5739f47278d461d8e`
- `src/dccp/meter/keys.ts` — 2297 bytes — blob `4a3fc91094806ed209581491138f784f6d00068f`
- `src/dccp/meter/landauer.test.ts` — 1631 bytes — blob `aff85166980b19901153a24323b41be29f96d5ee`
- `src/dccp/meter/landauer.ts` — 3680 bytes — blob `cc40b03c121e7dd216d2aa9078492bb06fb28b1c`
- `src/dccp/meter/launch.test.ts` — 410 bytes — blob `0c131b3ae000537dbe29ee3b12704d4b4f4180c0`
- `src/dccp/meter/launch.ts` — 1433 bytes — blob `38e7897a46a46f8d39297b7cea936208090fe63c`
- `src/dccp/meter/lmsr.test.ts` — 1069 bytes — blob `11f76c898cc1cf472fd834f6a770f91c75efa142`
- `src/dccp/meter/lmsr.ts` — 2867 bytes — blob `ba8cc31f3460390cb6e75eab1106e00aa2f50087`
- `src/dccp/meter/markets.test.ts` — 641 bytes — blob `0854fed6175bf1e8162d9b716aecb2a463ee8501`
- `src/dccp/meter/markets.ts` — 1952 bytes — blob `409b7b3de1a34bd85ab69860addf1fbbf2fb92f2`
- `src/dccp/meter/master.test.ts` — 807 bytes — blob `1627c497204c48ae9448eeef8287e9821c57c990`
- `src/dccp/meter/master.ts` — 1251 bytes — blob `5c069b500381fea2b6a5c92e055bade1890cc059`
- `src/dccp/meter/matrix.test.ts` — 826 bytes — blob `4fef8046cd4de888cb51152b54c75aafc6b20803`
- `src/dccp/meter/matrix.ts` — 1844 bytes — blob `af74c13cadbc07e68e99c350feee917f1661f21a`
- `src/dccp/meter/once.test.ts` — 414 bytes — blob `94e9671a31b90d3e524a85933f1f340c231794a0`
- `src/dccp/meter/once.ts` — 283 bytes — blob `da7e2e11ccea6494318617aa5138b3f655f0ac00`
- `src/dccp/meter/overlay.test.ts` — 761 bytes — blob `4555938003e14c9f991124e2c5503c22d5189ffd`
- `src/dccp/meter/overlay.ts` — 2789 bytes — blob `00ee54593b51d2dc5b06814a0ea759e92f306352`
- `src/dccp/meter/peg.test.ts` — 816 bytes — blob `f2a97a5b2ba1b1c4a6b0e12efaf36fbe17e5fc6a`
- `src/dccp/meter/peg.ts` — 1339 bytes — blob `fdbfff68f59a3ad552c69ae3d509f688fa9b02ba`
- `src/dccp/meter/persona.test.ts` — 729 bytes — blob `b41d032dc65faed7a951e7ef1465cc3f58e0d5ea`
- `src/dccp/meter/persona.ts` — 1735 bytes — blob `05ab2044b0d9c53fc529840269ddca388bc64d20`
- `src/dccp/meter/plain.test.ts` — 1530 bytes — blob `3d8d1f85a8bbf4d1e18a500dd6ba4c86935e3a29`
- `src/dccp/meter/plain.ts` — 2967 bytes — blob `1f3accfe9a91d1f7984b42a42c90249982e4d654`
- `src/dccp/meter/priorities.test.ts` — 912 bytes — blob `c341e9f3fb17828d46d0db942741e0692592fc91`
- `src/dccp/meter/priorities.ts` — 7674 bytes — blob `b463c07cb4b7cf2374bd2c675b375e19ce2afd7d`
- `src/dccp/meter/produce.test.ts` — 472 bytes — blob `832b1150b36de6b364462b503bfc23ff85699ea3`
- `src/dccp/meter/produce.ts` — 1589 bytes — blob `76aca1ad0272c04466c20575e988e6f3da10ae0b`
- `src/dccp/meter/queue.test.ts` — 1009 bytes — blob `c9a07c38114ace449caa87f775d009ce6fab4086`
- `src/dccp/meter/queue.ts` — 2211 bytes — blob `5b876aa2fe75f06fccb42a4281605b4f0b2eda8e`
- `src/dccp/meter/ringfuse.test.ts` — 904 bytes — blob `b8afd0793a8bb18e1c73562d1a403b986faea11f`
- `src/dccp/meter/ringfuse.ts` — 3095 bytes — blob `aff8a522a6739ce8070b5599fcf046698aa9e180`
- `src/dccp/meter/sap.test.ts` — 875 bytes — blob `bc3ca93ef0c2333797868375f2c14dad90f62b74`
- `src/dccp/meter/sap.ts` — 1980 bytes — blob `4b6fc22da451228985c22240df102200acd27e7c`
- `src/dccp/meter/seed.test.ts` — 2306 bytes — blob `db88512343a39069e77445cdd9ca8a5cdcc7eb1f`
- `src/dccp/meter/seed.ts` — 5256 bytes — blob `18f569b18b64e8bf90a97a7eff43bc7ab0e40d41`
- `src/dccp/meter/seedgate.test.ts` — 744 bytes — blob `3e00c540d2652a4f2888ecbc86eb3594b2745e2a`
- `src/dccp/meter/seedgate.ts` — 1685 bytes — blob `d19f7d548f4f23fafc300c3483d863b853336ea2`
- `src/dccp/meter/sequence.test.ts` — 529 bytes — blob `7595c8cd61dbbcc1e07ff97862de03087fa8e3c6`
- `src/dccp/meter/sequence.ts` — 1293 bytes — blob `0041114947c0a9dd71345af859697dc680cceca8`
- `src/dccp/meter/sim.test.ts` — 648 bytes — blob `629d74b8ab8be007facf75830b04c3e8b700e60b`
- `src/dccp/meter/sim.ts` — 2112 bytes — blob `3cc3fdf616a8cda6af97784ea13dde9df0592c60`
- `src/dccp/meter/swarm.test.ts` — 1654 bytes — blob `505e0a7438a8b67f40650be796cfd1149d3bd046`
- `src/dccp/meter/swarm.ts` — 4666 bytes — blob `adc5f1d2bd3fc889bda45757aec727bb6a1440c3`
- `src/dccp/meter/token-cut.test.ts` — 407 bytes — blob `f7cde91ed56e6325f15dbe5c5e97aeeae65e6686`
- `src/dccp/meter/token-cut.ts` — 2311 bytes — blob `f30beae7a91ed547ad74ef36d7c87c92669346be`
- `src/dccp/meter/traits.test.ts` — 448 bytes — blob `eeaa3fe9a42741cc0250001f875d87c3e9faa1ab`
- `src/dccp/meter/traits.ts` — 1719 bytes — blob `1220036047c56bd4ef3760525d4553aebe10c686`
- `src/dccp/meter/unitybox.test.ts` — 1728 bytes — blob `3e2779cfffa8a78f19b41101214f69cc9aca864e`
- `src/dccp/meter/unitybox.ts` — 5421 bytes — blob `7654987d230f3195fac32208d28fe54c57d65d6a`
- `src/dccp/meter/unityclient.ts` — 1483 bytes — blob `48ac11e1549155c77dff1779286a2870ec5ff0b2`
- `src/dccp/meter/value.test.ts` — 1117 bytes — blob `e0435dd02b3f6d2443ff34af79864a7c06f69672`
- `src/dccp/meter/value.ts` — 1929 bytes — blob `cf1706a1650e12ce1b63553fd1a51883a9c019e3`
- `src/dccp/meter/wizard.test.ts` — 2768 bytes — blob `b357a83f25f29c98e6b189b02b81371ead09890b`
- `src/dccp/meter/wizard.ts` — 8344 bytes — blob `2c17ae21d4a59c2366425ac051e03aec264a6348`
- `src/dccp/meter/x401.test.ts` — 492 bytes — blob `0da6e573b80a87dc48b368d80584af90ea1e9133`
- `src/dccp/meter/x401.ts` — 837 bytes — blob `b66275ce5b6b3e9cd99c42a2b76ba1016c52306d`
- `src/dccp/meter/x402.test.ts` — 399 bytes — blob `dedfd4b7c0cc258059b654952aa2c8c909772a8b`
- `src/dccp/meter/x402.ts` — 770 bytes — blob `1a68db9ced950e058d0ec374580f504011139251`
- `src/dccp/origin/bootstrap.test.ts` — 766 bytes — blob `9e402be7595998933b5f650ae9635b88f2532ac5`
- `src/dccp/origin/bootstrap.ts` — 1598 bytes — blob `e10c7dd4bb3c12eef4babd2c146405f10d7b6145`
- `src/dccp/origin/boundary.test.ts` — 471 bytes — blob `877db5b67da05acdcf452cea6896cd36b63258b8`
- `src/dccp/origin/chain-bind.test.ts` — 493 bytes — blob `d7fe329721ac1f77d647056bf768c5b97a7ae8b2`
- `src/dccp/origin/chain-bind.ts` — 1753 bytes — blob `1d0cef8411803c865062da4ab43cfe637bb9e1b7`
- `src/dccp/origin/idempotency.test.ts` — 3251 bytes — blob `3d337f313d8c75ac9d23938d2734f7c7f521d12c`
- `src/dccp/origin/idempotency.ts` — 8712 bytes — blob `bbd1dbf6ceb15670c841c1078d4304e76df2d836`
- `src/dccp/origin/ingress.ts` — 6441 bytes — blob `ea1c4f4c8b153029ce24fc45cd7c29ed4adcd5e8`
- `src/dccp/origin/jacket.test.ts` — 798 bytes — blob `deaaeff54de575d880d44ecfa41c0febfc31c508`
- `src/dccp/origin/jacket.ts` — 2147 bytes — blob `d0c5e8c1fd8811cacf49898dec6416e1b9e63e16`
- `src/dccp/origin/layer.test.ts` — 806 bytes — blob `afa87816a52e35788db7637a0ad9a831d9846a58`
- `src/dccp/origin/layer.ts` — 2004 bytes — blob `2f8a5eeca9176fd3096636a61b4844a613a90f97`
- `src/dccp/origin/loopback.test.ts` — 401 bytes — blob `c86b18d3338dfd7b6559eb612fae8ad7c4de858b`
- `src/dccp/origin/loopback.ts` — 448 bytes — blob `2dcb6743b58d412742ccf0974ae29a94bf8502c2`
- `src/dccp/origin/runner.test.ts` — 1080 bytes — blob `4c22a364bfa9e475caa1c88bf4b1e280de326f8b`
- `src/dccp/origin/runner.ts` — 2562 bytes — blob `28b8bb1caf01dc17ddcd9de9f0a8cb8f33d89339`
- `src/dccp/origin/sleeve.test.ts` — 743 bytes — blob `705af61d16c5d7377dfe4670ea2d68aee4c5f8ab`
- `src/dccp/origin/sleeve.ts` — 1566 bytes — blob `8aad85838aa11ea1dd12f6966d1ea2029c3a7a49`
- `src/dccp/origin/testnet-note.test.ts` — 316 bytes — blob `14040630d59676812dc50b1f0eab6971e051cdb7`
- `src/dccp/origin/testnet-note.ts` — 757 bytes — blob `824c102fc41ad9b4ba01e83c78ea41d7ac6b5965`
- `src/dccp/origin/write-state.test.ts` — 1611 bytes — blob `58f9efa98c0a9f34c3715730b08ca45fa3855360`
- `src/dccp/origin/write-state.ts` — 3243 bytes — blob `7e1d2d38eea9c6fcac5fc255e3b24acf52df3099`
- `src/dccp/origin/writer-public.ts` — 662 bytes — blob `0244708317debdab351b5e9f94eb7d49563dc27a`
- `src/dccp/pack/canada.test.ts` — 579 bytes — blob `05de390cf474821ea88e758108c3c1b606e931b3`
- `src/dccp/pack/canada.ts` — 3501 bytes — blob `ef6eeeb54f11a49af3c09efd53b9f1c5d7afc55a`
- `src/dccp/pack/hudl.test.ts` — 787 bytes — blob `4aee8ab1f0932deda434e3366cf036c5f6863421`
- `src/dccp/pack/hudl.ts` — 2716 bytes — blob `728eb1048ab1306762d4fdf6e4c71c4725078df3`
- `src/dccp/pack/mind.test.ts` — 834 bytes — blob `722512729490a5e0252cf23d4dae2823dbb7df20`
- `src/dccp/pack/mind.ts` — 2393 bytes — blob `e94e77412d8f8905bc304e66fd8014fbbdaad204`
- `src/dccp/pack/ontario.test.ts` — 835 bytes — blob `41edcdd5117653f63cae4b2b890361353ba546f3`
- `src/dccp/pack/ontario.ts` — 4797 bytes — blob `55f04cb3b58b77af327ae383e6d552471e3c20d1`
- `src/dccp/pack/script.test.ts` — 819 bytes — blob `c87b3587ef6f2a2ac7fa3cefc9af7614c2e1a7ae`
- `src/dccp/pack/script.ts` — 6278 bytes — blob `740e304a1150fa0d4bb044486ded8555e5f83450`
- `src/dccp/pass.test.ts` — 1541 bytes — blob `09860ddbbf2a3803dfa6133ee475074cc311958b`
- `src/dccp/pass.ts` — 4990 bytes — blob `c1f1c2fd6c9ed74092f5a4dc6b6aed4780ba33bf`
- `src/dccp/pipe/chain.test.ts` — 4354 bytes — blob `758e3e5f50c8fa8cd52b84dde957a718f9f163a9`
- `src/dccp/pipe/chain.ts` — 13902 bytes — blob `082b62ce49894b93afbabd337079fbd038fb219e`
- `src/dccp/pipe/connector.test.ts` — 2071 bytes — blob `baee3a7a2f101890f6d88b843dca0250e2e26a7c`
- `src/dccp/pipe/connector.ts` — 2036 bytes — blob `08c3a7ae7c8b1f77d8414d7500f1c987f79f9438`
- `src/dccp/qrcode.d.ts` — 177 bytes — blob `e4d3da8aa68d6b20ec6ea9a79de4a9dda518510e`
- `src/dccp/regulation.test.ts` — 2508 bytes — blob `68503ccf70ec45cb5ecb99cb3301719e6546a980`
- `src/dccp/regulation.ts` — 3662 bytes — blob `d1270a9ea19153138b5add85b50268f485d9a95b`
- `src/dccp/resources/load.ts` — 1160 bytes — blob `659b59bb67f67df811e2744d52dd17af470873e1`
- `src/dccp/resources/match.test.ts` — 1552 bytes — blob `325a2435f364f7c0753e97dd08b420f17c9cf74e`
- `src/dccp/resources/match.ts` — 13928 bytes — blob `6f8ab23931cfb512edbfe69e25a22e6ce31ac0e4`
- `src/dccp/resources/mesh.test.ts` — 459 bytes — blob `7b5acc417722b8a231d89fe69d2a97350089e550`
- `src/dccp/resources/mesh.ts` — 922 bytes — blob `ff96cf3bad5e3ca0dc959c7fcce49f49f67b2639`
- `src/dccp/resources/seats.test.ts` — 835 bytes — blob `e11ba639ed4410d8053831ac7f64d3aebe98c0e7`
- `src/dccp/resources/seats.ts` — 1162 bytes — blob `da6f3096a77d38f324c4ca2d8b9185e6e65ea340`
- `src/dccp/resources/works.test.ts` — 792 bytes — blob `52cf18e25e5bfa2e66c688c280b5f47a6f1e0321`
- `src/dccp/resources/works.ts` — 1808 bytes — blob `bfd81321a7ea2b2358f5396cf9ea58409bd39430`
- `src/dccp/rte/belleville-index.json` — 649688 bytes — blob `e18c11666461758c81fd2b894ed2d9ba9403a9b9`
- `src/dccp/rte/board.test.ts` — 1288 bytes — blob `c1f3b1c27af076c7ba8ef24f5c9ddfb3a038e6b8`
- `src/dccp/rte/board.ts` — 4002 bytes — blob `8d6c80f040a99528df82e8df159e46fb0e2622ab`
- `src/dccp/rte/care.test.ts` — 1070 bytes — blob `11d5ff55ffd0d4d6641cd40cf0e9c275be265803`
- `src/dccp/rte/care.ts` — 5172 bytes — blob `3fa1d6e0893089c5ad2f545237cfe79b4a193036`
- `src/dccp/rte/chalk.test.ts` — 729 bytes — blob `c9ea43758f1ed67840c1fa09a60732d9deefa30b`
- `src/dccp/rte/chalk.ts` — 2167 bytes — blob `a62e430973d68757a775b4a7f735ee3f343079c2`
- `src/dccp/rte/classroom.test.ts` — 995 bytes — blob `dd3e52c65aa56e24fa3767c0be941d8b7a8731ab`
- `src/dccp/rte/classroom.ts` — 4534 bytes — blob `54edfd74c4267d42390e007eac81dddbb3c7fafb`
- `src/dccp/rte/compose.test.ts` — 1003 bytes — blob `cb778a2291cc39a41229a41db4461c3b4ef17b51`
- `src/dccp/rte/compose.ts` — 3056 bytes — blob `11adcef4a45b2d2087c6f7e36b2e22e72daa1455`
- `src/dccp/rte/construct.test.ts` — 650 bytes — blob `03f7851617207fcf58df9577073932416c79c307`
- `src/dccp/rte/construct.ts` — 2262 bytes — blob `6acca2ba163da57e527af447a8ca0c5af4389907`
- `src/dccp/rte/curriculum.test.ts` — 1501 bytes — blob `0da927142a91439af5868e95f3e658cde0c951e1`
- `src/dccp/rte/curriculum.ts` — 5759 bytes — blob `495454bcc11a4650db7cf9abc984c7095c580e59`
- `src/dccp/rte/depth.test.ts` — 857 bytes — blob `35ede56a1c54600c58ce2a1a1dc756730c7b6a0e`
- `src/dccp/rte/depth.ts` — 1683 bytes — blob `96cf6dbaa07a47737178b975818cc2712c053793`
- `src/dccp/rte/elements.test.ts` — 930 bytes — blob `9ee69c872c31bc67c009d5c7d0b42b329a582c6e`
- `src/dccp/rte/elements.ts` — 7153 bytes — blob `d8d8c50dfb2d3ffb585c719c922d8f56d8e345dd`
- `src/dccp/rte/free.test.ts` — 1036 bytes — blob `5218b4fc89bed04a614a470bd0cad40f3f34701e`
- `src/dccp/rte/free.ts` — 2186 bytes — blob `2ed3bb570e5b7993ad6ad8e77b8fe129f30087f3`
- `src/dccp/rte/ice.test.ts` — 3506 bytes — blob `bf6ad0d21311557d76cf2a4329b979d445d0dc90`
- `src/dccp/rte/ice.ts` — 8080 bytes — blob `2b9d5921443245dd69b3f4cf77905332bf27687b`
- `src/dccp/rte/index.ts` — 3210 bytes — blob `a99daeb6e1d0ebdbb448b0673851ebdc2ac568e6`
- `src/dccp/rte/kitchen.test.ts` — 990 bytes — blob `5370811519c5e69918ce84d1ebdf9f0fa994936d`
- `src/dccp/rte/kitchen.ts` — 2192 bytes — blob `16ff4be36850145b6407fe46a632536f9a9841b3`
- `src/dccp/rte/liquid.test.ts` — 733 bytes — blob `a8b949cf51d55ce9d6ef07d1f8a00e4f47e34bb9`
- `src/dccp/rte/liquid.ts` — 3362 bytes — blob `adafed70589a08e320c950cd67fbbc844935a6cb`
- `src/dccp/rte/locale.test.ts` — 2333 bytes — blob `e98c5001cd093ffe22431cd3fa56c3643f30b983`
- `src/dccp/rte/locale.ts` — 4103 bytes — blob `d5c0d6dde48cc084a0d2d8647faef58493b6388f`
- `src/dccp/rte/nutrition.test.ts` — 1668 bytes — blob `dc52f29168190641060d94e5cbea24ba0ff9a8ab`
- `src/dccp/rte/nutrition.ts` — 11462 bytes — blob `d3391bd7ab98fef92cf1945bcee086b0a0297614`
- `src/dccp/rte/obscure.test.ts` — 445 bytes — blob `58bb26344a532142df46fece404d8fa425aa0ac6`
- `src/dccp/rte/obscure.ts` — 878 bytes — blob `64526ab6b3509d6ca2123a33492ebeb109f61399`
- `src/dccp/rte/plays.test.ts` — 488 bytes — blob `3b6d4c265c878a59906247310b926da2b439f17a`
- `src/dccp/rte/plays.ts` — 3889 bytes — blob `bd0a2368bbedcecca5ce8b292adfc88852395f60`
- `src/dccp/rte/roles.test.ts` — 1168 bytes — blob `3b37b1dda3e4ab7b0807a43e40a422fdee3a07ea`
- `src/dccp/rte/roles.ts` — 8482 bytes — blob `bb23393737a3321055af09539bcad6955b8077b0`
- `src/dccp/rte/rooms.test.ts` — 1051 bytes — blob `11e6b05a259f95789257bc3efbb1900e416caa0d`
- `src/dccp/rte/rooms.ts` — 3357 bytes — blob `e2ca57198e2bbb90508ce109d193542b802d5b98`
- `src/dccp/rte/spectrum.test.ts` — 823 bytes — blob `9902c09d07c841722c4098ae2c3a66307e28f27a`
- `src/dccp/rte/spectrum.ts` — 4307 bytes — blob `96df0c8ab3cf7c979720bc47b92bbfb2583d4180`
- `src/dccp/rte/split.test.ts` — 737 bytes — blob `c4bb0361fdee1cb2bc2bf3671b7f8c9a006c9474`
- `src/dccp/rte/split.ts` — 2366 bytes — blob `7f232aaa8072b7453e887605f93285274767ee22`
- `src/dccp/rte/stay.test.ts` — 711 bytes — blob `c0d3b23c45f8a2fa1e95643225bdeba0c7ce2a95`
- `src/dccp/rte/stay.ts` — 2294 bytes — blob `132400b9fba3e5fa0d09bbdb8cfced1a65e15c3f`
- `src/dccp/styles/card.css` — 11446 bytes — blob `97d67324939e33039484c6b32efb5594695ff639`
- `src/dccp/styles/glass.css` — 4690 bytes — blob `41cbcda3239b88bc25a55f5ddd1749ccb9395dda`
- `src/dccp/styles/main.css` — 33249 bytes — blob `ae735f43f9389b8b35a71f5ca9c264ff20dd4c8b`
- `src/dccp/trinity/botreview.ts` — 1057 bytes — blob `695c3cc472080b8387653807221f606b014cd49e`
- `src/dccp/trinity/buckets.test.ts` — 511 bytes — blob `864c236a534922d2b064084a5230b9c7069b094f`
- `src/dccp/trinity/buckets.ts` — 2009 bytes — blob `fad345d7dbbbf366a34abb053e8dd50e7b455b75`
- `src/dccp/trinity/day.test.ts` — 512 bytes — blob `4daf6269c45d3ee18062bfd36efd2c7ca234656f`
- `src/dccp/trinity/day.ts` — 1265 bytes — blob `e6a065762e1bf4591badb3d56726021003c4a0a8`
- `src/dccp/trinity/degraded.test.ts` — 803 bytes — blob `5377ebbac659db849891866387c14ec4b3e2e72b`
- `src/dccp/trinity/degraded.ts` — 1346 bytes — blob `a462a82e8c9ec37bf107f64c4a616472918b739d`
- `src/dccp/trinity/inventory.test.ts` — 706 bytes — blob `3f76e3655ca88d17933dcc86c63a041cf09aa810`
- `src/dccp/trinity/inventory.ts` — 1501 bytes — blob `90ab730424d29be9f1da64e78aa6d1bb7b16147c`
- `src/dccp/trinity/mirror.test.ts` — 1211 bytes — blob `cda3824912c37c0236cc066a5caadb2fe63751bc`
- `src/dccp/trinity/mirror.ts` — 2064 bytes — blob `7341559b335967642600ed0fad096cb2e839e9a8`
- `src/dccp/trinity/rotation.test.ts` — 1197 bytes — blob `2dc63364d8f55afe40746d070ec4e84164e13e31`
- `src/dccp/trinity/rotation.ts` — 2786 bytes — blob `afb0ce650e406ea2025a0d665feb7fca2f862d4f`
- `src/dccp/trinity/standing.test.ts` — 809 bytes — blob `55b2c0572b0b9044dda6d5221340c7f93203c0c2`
- `src/dccp/trinity/standing.ts` — 2306 bytes — blob `e23cb6caf12b7b6acb6ef67d20611afd24264b2d`
- `src/dccp/trinity/straight.test.ts` — 638 bytes — blob `8d65cad2bd6ebff324d67bcfcbec11ec1057fcd1`
- `src/dccp/trinity/straight.ts` — 1218 bytes — blob `3a0fe04eec9f997b1a2d1ba6d08195a76746d914`
- `src/dccp/trinity/studies.test.ts` — 565 bytes — blob `01ab3ef1728d533e0fb255b745a2a43343a8a22d`
- `src/dccp/trinity/studies.ts` — 2254 bytes — blob `fd567734f6a74924a7a0113f27cd3f2641fabc96`
- `src/dccp/trinity/unify.test.ts` — 500 bytes — blob `20a0bfd9fd62ce781549b826927f6bf596fa70a6`
- `src/dccp/trinity/unify.ts` — 1297 bytes — blob `1f4fc0ff3a632fc312251368e810d26f9b70b85e`
- `src/dccp/truth/bestpath.test.ts` — 1102 bytes — blob `ae0082e7f754a87908f7e841d545d20149d23da7`
- `src/dccp/truth/bestpath.ts` — 2668 bytes — blob `046b38477189ab4fdb426f052fd3e32254dc6117`
- `src/dccp/truth/chain.test.ts` — 735 bytes — blob `522fd32f5ff134f0cc45e35d956798890ca7dfeb`
- `src/dccp/truth/chain.ts` — 1755 bytes — blob `b31a3d714b5292bc87896e6e92b1fdcfe2d185f9`
- `src/dccp/truth/courses.test.ts` — 517 bytes — blob `8d27f76ebaf23a065a334480f361da481d4087b4`
- `src/dccp/truth/courses.ts` — 2272 bytes — blob `88cc279854ad98b1184d04f2009b1ab68272416e`
- `src/dccp/truth/entangle.test.ts` — 494 bytes — blob `f9ae750851977ee11aeaa5ac50e60a14bb2a374d`
- `src/dccp/truth/entangle.ts` — 1211 bytes — blob `d16c8d4e9f134ad2e420754c4c71134fb70dd601`
- `src/dccp/truth/impurity.test.ts` — 472 bytes — blob `0125b7c6d8dc5c2d4ec466f1c75465caf30e5d7e`
- `src/dccp/truth/impurity.ts` — 1131 bytes — blob `df3900ed7be6b4512d882a3db84eda96f10ee81b`
- `src/dccp/truth/index.test.ts` — 650 bytes — blob `78be6c3b6b65c510f8c9658115f5be4d0081889a`
- `src/dccp/truth/index.ts` — 1983 bytes — blob `c808243a9251fd890cce2a76b6642784adb0a43c`
- `src/dccp/truth/objects.test.ts` — 513 bytes — blob `7a997ec88dd7d61c38035bd1e9c80775b12f1883`
- `src/dccp/truth/objects.ts` — 2807 bytes — blob `034d192f53f73ce39929cd3dfdc49ac128f89eb7`
- `src/dccp/truth/plate.test.ts` — 572 bytes — blob `f7d2ba8df6c2815e4934f34a68cbd20926d4fac7`
- `src/dccp/truth/plate.ts` — 1366 bytes — blob `4d82b3065c5b94141b5be0f518e5671533c91a75`
- `src/dccp/truth/purity.test.ts` — 1056 bytes — blob `13820a78c9308c0f1803f5e14b556dc009200917`
- `src/dccp/truth/purity.ts` — 2595 bytes — blob `b5b6451358ef2a0277a27978b08c43760a52bca0`
- `src/dccp/truth/pyramid.test.ts` — 411 bytes — blob `884638869cbab4330b49c5c5c53216a478d5a7aa`
- `src/dccp/truth/pyramid.ts` — 1593 bytes — blob `a22e235c946cf5df6323f5c4b3d2f220c7a92910`
- `src/dccp/truth/repeater.test.ts` — 407 bytes — blob `f18e37344a75ce55d0e79d2c781005d31f751c5b`
- `src/dccp/truth/repeater.ts` — 1045 bytes — blob `8146139679f91849c92bac1d4bccf78ff96484e4`
- `src/dccp/truth/state.test.ts` — 793 bytes — blob `139ef2dabe9e4690c3dfeb87c2f73af8192e91c0`
- `src/dccp/truth/state.ts` — 3301 bytes — blob `1bc4060e281b68bb23958a747cafc7b24b3f46fa`
- `src/dccp/truth/swap.test.ts` — 466 bytes — blob `a69d4513e962a9aeec104c5bf6c925a844d6b638`
- `src/dccp/truth/swap.ts` — 1029 bytes — blob `ef019becf764db9ffcad1ba6214b52ae5d1ba40d`
- `src/dccp/truth/teleport.test.ts` — 472 bytes — blob `d4a878b7f1d88aa3fff16693b436f4ad1cbb88a5`
- `src/dccp/truth/teleport.ts` — 1051 bytes — blob `992713e609496cb90600f67d865e72e22af9aa7f`
- `src/dccp/truth/twoway.test.ts` — 534 bytes — blob `9e4e330241b4f5ba80c83877bb362bd8b6e9e3a7`
- `src/dccp/truth/twoway.ts` — 2020 bytes — blob `cf54fd0b306549258d7da9b09bca3d45cfa8913f`
- `src/dccp/truth/verifier.test.ts` — 475 bytes — blob `f86c17327474317303a36b184f9ed5d415e8f0e2`
- `src/dccp/truth/verifier.ts` — 1108 bytes — blob `c384cf54179a429175eed8887ab04276925d4512`
- `src/dccp/ui/band.test.ts` — 1088 bytes — blob `0f5db1926bafe736841caade25a580cb562859ce`
- `src/dccp/ui/band.ts` — 2863 bytes — blob `6a15537600edf8ea6533b0d48140a1de6f1c1b8c`
- `src/dccp/ui/card.ts` — 10156 bytes — blob `7e56313ca25405975dab20a18db193c1bfae3b61`
- `src/dccp/ui/cards.ts` — 33369 bytes — blob `5a34f9399e37a2784de642165cde852e5ab40d3e`
- `src/dccp/ui/depth.test.ts` — 860 bytes — blob `a6b4873460b05e31f8d66debaa11e00806019995`
- `src/dccp/ui/depth.ts` — 2718 bytes — blob `40213c6e8007011fad333c6feff3ae214446bd73`
- `src/dccp/ui/geodesic.test.ts` — 774 bytes — blob `4978343dac185454fc30fd7c949d658c0f45f23e`
- `src/dccp/ui/geodesic.ts` — 9065 bytes — blob `6aa66b6fdec5c30a84c27e5c399c86d51ed131da`
- `src/dccp/ui/glass.ts` — 8309 bytes — blob `0f8cf861dd00483082bb4e5958bb6c51e4520b0d`
- `src/dccp/ui/html.test.ts` — 389 bytes — blob `95ff214a93a17eac1dcdc9f962c98e3dd7254bd2`
- `src/dccp/ui/html.ts` — 312 bytes — blob `6309b474232f74b3f1ee18268be6e4db02abfe7f`
- `src/dccp/ui/overlay.ts` — 45923 bytes — blob `8bd7dcdc729607d797ec87a3a38e13e95c9ba403`
- `src/dccp/ui/plate-law.test.ts` — 474 bytes — blob `f3601735ff4ea0c0809e327e56d366305124518d`
- `src/dccp/ui/plate-law.ts` — 829 bytes — blob `8a4bf96c47dc85aa861b40df85433aac978a5d2a`
- `src/dccp/ui/splash.test.ts` — 355 bytes — blob `72418dd2f996d7816d415791d787c6b5f9df87b4`
- `src/dccp/ui/splash.ts` — 2162 bytes — blob `2ba4f846ceba9f32e42690c46ca070638c3b4246`
- `src/dccp/ui/surfaces.test.ts` — 387 bytes — blob `0c5208166d91a7ee88f85fade58eff6302afe45e`
- `src/dccp/ui/surfaces.ts` — 1177 bytes — blob `37819fa0a54c8dce9ee06727e22f08b2a8c33a01`
- `src/dccp/ui/telemetry.test.ts` — 879 bytes — blob `dfd5a9f3eb7c6a2d275874f922e15bed90ff350d`
- `src/dccp/ui/telemetry.ts` — 1842 bytes — blob `9b3a8e028b2e4404c473fa9cca4b3e7bc4834f9f`
- `src/dccp/unity/abstract.test.ts` — 2153 bytes — blob `4a5570cfe5e025e57a6c54be9334bd6116fe3251`
- `src/dccp/unity/abstract.ts` — 4003 bytes — blob `edc7f534b7def77ed6c2c32e04528524dee42cd1`
- `src/dccp/unity/adventure.test.ts` — 1599 bytes — blob `fa8bdf59091eb0ecac9e5f6bb6e298d1912f47ec`
- `src/dccp/unity/adventure.ts` — 5116 bytes — blob `5ffc8ce0c6455e7848a1eccc9844691a678444db`
- `src/dccp/unity/agreement.ts` — 2191 bytes — blob `532e32ba0d9d042ea575fe1e9768b11db08ec939`
- `src/dccp/unity/botid.test.ts` — 1334 bytes — blob `9165b253b3e1ff5f1ccf12de56ca55a5b6308e64`
- `src/dccp/unity/botid.ts` — 4854 bytes — blob `77b72b777b515c424b4f88172fbe3b6836b35a07`
- `src/dccp/unity/child.test.ts` — 1329 bytes — blob `249d33cd01c8a1f5c0995c1fd8566e30b002e533`
- `src/dccp/unity/child.ts` — 4505 bytes — blob `f92181ef707158b55ca478746895c64c03af17d5`
- `src/dccp/unity/connectors.test.ts` — 1157 bytes — blob `cd788e51c2867d1babb0707441a23f2c0c2c8baa`
- `src/dccp/unity/connectors.ts` — 2707 bytes — blob `32b612aa564b34565cb674d51cfb9d21532878e9`
- `src/dccp/unity/dry.test.ts` — 539 bytes — blob `89b08f8ed1443e0646199914bba1ea26cf9ab436`
- `src/dccp/unity/dry.ts` — 1449 bytes — blob `347dd13cce89cf82392ea6afb2708d1697db4b08`
- `src/dccp/unity/fatherkey.test.ts` — 2663 bytes — blob `cd25c63a159984c33aefbd1702ab1fc3450b6571`
- `src/dccp/unity/fatherkey.ts` — 4980 bytes — blob `e70cc564aed3edcf501234d6a30577969509ec68`
- `src/dccp/unity/fatherpass.test.ts` — 532 bytes — blob `09f9221a77abed784ded511fc95749dc1da166c7`
- `src/dccp/unity/fatherpass.ts` — 1027 bytes — blob `77ceda873d36c48ea400ebcc005d3436e3af5d04`
- `src/dccp/unity/founding.test.ts` — 856 bytes — blob `96cab656a170bf6c01a7814ca5281511f305f6bb`
- `src/dccp/unity/founding.ts` — 2460 bytes — blob `49f3e4be2161c76750b36503e4947ef514f0560e`
- `src/dccp/unity/fuse.test.ts` — 1697 bytes — blob `cd93430390c8e89776f946ed120271dfdc023bbe`
- `src/dccp/unity/fuse.ts` — 2484 bytes — blob `00ce0d550a5824947e3402e4ba3ecd25bb9cc9eb`
- `src/dccp/unity/halfson.test.ts` — 429 bytes — blob `a7d9550cb4656391cf9e07e0a398415432b609e0`
- `src/dccp/unity/halfson.ts` — 641 bytes — blob `afeede932a88e333f2957d6dd4f615ae288abb2c`
- `src/dccp/unity/hostid.test.ts` — 1230 bytes — blob `293a281c04ad495b6e0e8dcc1752a8536b0c2848`
- `src/dccp/unity/hostid.ts` — 3219 bytes — blob `1f8deef251b5a6e460f2dd273e78a900f1c2d2a7`
- `src/dccp/unity/hosts.test.ts` — 759 bytes — blob `96262353f1e763e31017f23ef4bf076fadf2f7fc`
- `src/dccp/unity/hosts.ts` — 1409 bytes — blob `de129ed77cb78c09d56a7043b5f257aa1db2407b`
- `src/dccp/unity/lineage.test.ts` — 363 bytes — blob `f4f6c717c3610617a4dab1425bbd85a14cf3c6e9`
- `src/dccp/unity/lineage.ts` — 923 bytes — blob `169c3b0693269ae7b353c63a20261a2b79ffec0a`
- `src/dccp/unity/mesh.test.ts` — 675 bytes — blob `2cf08014503339a69dd30ef8eadc6d78dd0bf784`
- `src/dccp/unity/mesh.ts` — 2874 bytes — blob `5b0e026bc297424062895188a1f8822010d48c1b`
- `src/dccp/unity/omni.test.ts` — 1113 bytes — blob `28056f140dde2539b075dc8023696efc4302bde5`
- `src/dccp/unity/omni.ts` — 1840 bytes — blob `b5fd0dadda8ecf7c0b5cd8af30c983ef488bdf16`
- `src/dccp/unity/people.test.ts` — 463 bytes — blob `ed60ed02df0f59d4c9f5e769192e8ee727039c24`
- `src/dccp/unity/people.ts` — 2368 bytes — blob `5aa2e6244ce91833a7ccb610bbc3781c01433379`
- `src/dccp/unity/plain.test.ts` — 702 bytes — blob `004608d91cfbe7f9e207ebe6ed91abe1dee2b6e5`
- `src/dccp/unity/plain.ts` — 741 bytes — blob `3761681449c4cc253ab29ca6a3a7f667408f6d71`
- `src/dccp/unity/protocols.test.ts` — 465 bytes — blob `8b5519c6ab1614f959ef406cbb2ce4478ca39748`
- `src/dccp/unity/protocols.ts` — 876 bytes — blob `418451167dba5758ead88066bdfd095f5e998459`
- `src/dccp/unity/relay.test.ts` — 800 bytes — blob `562d92fb78e26193249fb3919eba7af1da21da5d`
- `src/dccp/unity/relay.ts` — 189 bytes — blob `bc3097b704de333c2ec6b8b479505f616c5959af`
- `src/dccp/unity/say.ts` — 1177 bytes — blob `dca9860da81d36ac740521b1b247a58ecfb4e5e6`
- `src/dccp/unity/self.test.ts` — 811 bytes — blob `4008ca79b126e0e12c96b31e612ef836061cbcec`
- `src/dccp/unity/self.ts` — 1839 bytes — blob `8f8c97f80f1bf2c2da23de5fe01e3f18d1d3c842`
- `src/dccp/unity/series.test.ts` — 2558 bytes — blob `72fc22858a2e038c7af8bfd0fcafd496c4c72a51`
- `src/dccp/unity/series.ts` — 4747 bytes — blob `5e4e2b8b2f9af11261b5d1c16a59da85b3c5008c`
- `src/dccp/unity/sonvote.test.ts` — 333 bytes — blob `1e3da96f4ea49554821c32cb8c2e89f74c4016a5`
- `src/dccp/unity/sonvote.ts` — 570 bytes — blob `3e482cc913d8f2c747af2ab086b58cfb85595b47`
- `src/dccp/unity/standards.test.ts` — 992 bytes — blob `32710370f0a45d7dd1a983cd0514f656c9ae30b5`
- `src/dccp/unity/standards.ts` — 1815 bytes — blob `54c50a7edf0e0e17742a936ade707b055d960e46`
- `src/dccp/unity/unityid.ts` — 6724 bytes — blob `d5bed32182da65786e30b487b3146c1eb6bee0a8`
- `src/dccp/world/entity.test.ts` — 429 bytes — blob `8f049c7cc0ae0e4b673fdd7ca0eee7f4c7f1890a`
- `src/dccp/world/entity.ts` — 739 bytes — blob `ff6d36a9f6fbb26d19f8923f350f9496474cfd82`
- `src/dccp/world/geo.ts` — 17838 bytes — blob `76722b7e531dd4b4b6684af375a623c5a1b9f1ff`
- `src/dccp/world/text3d.ts` — 4999 bytes — blob `3beed7918e0891b3d33fecb123c7f93eea5a4598`
- `src/dccp/world/world.ts` — 75489 bytes — blob `8e6eca6ffbe1e6ec79caa8f2c413b7491ed7bbae`

### `src/lib` — 38 files

- `src/lib/app-data/app-data.test.ts` — 15944 bytes — blob `5788361653ce7dcc086b2857f3c61531aaf00b31`
- `src/lib/app-data/client.server.ts` — 11867 bytes — blob `c0c35e2ab54193afedb02d66ccdd557e03a3aeaa`
- `src/lib/app-data/errors.ts` — 1994 bytes — blob `81c4d6794ad611231bc651f822c6e3c840f41195`
- `src/lib/app-data/index.ts` — 598 bytes — blob `59014187bb20de5e0b672bbc74765c99e10a1e16`
- `src/lib/app-data/login.ts` — 856 bytes — blob `e3d9dc937c6764a1eaecd77e74b411f3415a9501`
- `src/lib/app-data/readiness-schedule.test.ts` — 1146 bytes — blob `9a19189d2de446bbd2e0f81c7e4e8173896bbbb1`
- `src/lib/app-data/readiness-schedule.ts` — 506 bytes — blob `fe7e4d4baad5019377961146aa9af14e5896aeb6`
- `src/lib/app-data/readiness.ts` — 366 bytes — blob `dd3865c4e7b466975bfe140f77722b1840e705cb`
- `src/lib/app-data/server-only.ts` — 476 bytes — blob `27567c57626c596986c681e119bf78d4cf67b201`
- `src/lib/app-data/types.ts` — 1361 bytes — blob `1135d15ce5ca90cb32b4cbf27acc9ad85128230b`
- `src/lib/app-data/use-connector-readiness.ts` — 3892 bytes — blob `da88442efa6a56d5289d378f3bdc1d6998896ad1`
- `src/lib/auth/client.ts` — 9714 bytes — blob `d3b267d3de8b9d5e31545ee56ed7a3ff240c601d`
- `src/lib/auth/email-password.ts` — 442 bytes — blob `3abb01461af8b6c8293e9a996ec639b7009843a8`
- `src/lib/auth/gate-identity.server.ts` — 5706 bytes — blob `87c22a8a762200c7d4ce2736949f3a23ffbd4a9a`
- `src/lib/auth/gate-identity.test.ts` — 14346 bytes — blob `02cf0269fe3cdbcba3d96be110264f94e0cdea13`
- `src/lib/auth/gate-session-marker.ts` — 879 bytes — blob `4ae838d57956d66ed2f67c8d202636880e0423c2`
- `src/lib/auth/gate-session.server.ts` — 11980 bytes — blob `224c9653923daaca70dbec5a53fc51a3ef62ed97`
- `src/lib/auth/gates.tsx` — 4924 bytes — blob `ede7bcdd2e3901d565a2eb128c978dca9aa847e5`
- `src/lib/auth/isolation.server.ts` — 2386 bytes — blob `f070e0801221046b3a1c26954cc714250addecff`
- `src/lib/auth/middleware.ts` — 2462 bytes — blob `c6a734242f2a63c02e365eb7303a0238b3b5bf5c`
- `src/lib/auth/pglite-dialect.ts` — 4088 bytes — blob `e23357c3a027360d55ad37c018883111976687d9`
- `src/lib/auth/popup.server.ts` — 6133 bytes — blob `9e686ae29e2b0463b7868ce755dd066479ebe8a3`
- `src/lib/auth/preview.ts` — 1679 bytes — blob `b8822e87c83be13fb834714f53fb5a09d07588cd`
- `src/lib/auth/provider.tsx` — 593 bytes — blob `4dd72618670f44c166ff93da6020a71ab8046f05`
- `src/lib/auth/providers.ts` — 1486 bytes — blob `cd53b6faf1bf1ba4cef1193c42e533401bec4e65`
- `src/lib/auth/server.ts` — 12548 bytes — blob `66d94be9eb10e78fe46e2da2e7d950eef82580d0`
- `src/lib/auth/sign-in-gate.test.ts` — 854 bytes — blob `6b66a33ea9a0856c23661099dfc7d368dc022dff`
- `src/lib/auth/sign-in-gate.ts` — 332 bytes — blob `636893c147464d35caac3982dad48f53694dc63e`
- `src/lib/auth/use-current-user.ts` — 3315 bytes — blob `bf9d3affa6417e89b36785a567a6ac05ddcf8429`
- `src/lib/auth/verify.server.ts` — 3874 bytes — blob `2bf5acc72dd13134b1ec86781aa7591e1b2dca5c`
- `src/lib/db.ts` — 9525 bytes — blob `49777ade8f9d5613a25f7b5272a6bf88edbe709a`
- `src/lib/env.server.ts` — 477 bytes — blob `48ef4547042b375f03bd93cae5c832ae484321d3`
- `src/lib/error-component.tsx` — 1029 bytes — blob `9fb42aeee67718f9f9f97b48bfade96dcf8d6dc3`
- `src/lib/multiplayer/index.ts` — 169 bytes — blob `431865e237e5098f378ddb923dfa30716a632f86`
- `src/lib/multiplayer/p2p.ts` — 20546 bytes — blob `0e768418b65ff23e4eb2e82aaab2fbac33df1465`
- `src/lib/og/site.json` — 68 bytes — blob `2e656b044bb6436f6efcfb117ea8563e639fc71e`
- `src/lib/preview-embedder-origin.ts` — 1855 bytes — blob `0c248bc9ff13421683d0edc75c7a5c75bdd4318d`
- `src/lib/preview-host-bridge.ts` — 9595 bytes — blob `2fe46b14516370df8ce3e3747c3ba227bf414e2d`

### `src/routes` — 22 files

- `src/routes/__root.tsx` — 3129 bytes — blob `d0555c1fc008c37180096169149bdd7ec619c0a8`
- `src/routes/api/fuse.ts` — 501 bytes — blob `8bd69adaf270c985d5bf24c7625bb945ef160f29`
- `src/routes/api/live.ts` — 1961 bytes — blob `d99e2e74ed9b0cd11b4ea7c3d6066ed86b398fb7`
- `src/routes/api/loopback.ts` — 593 bytes — blob `4cbbc78c18f440d9f55878d7844a9f8e5c313143`
- `src/routes/api/unity-wallet.ts` — 3337 bytes — blob `3c763944430f02fbae60c95fc7d4ea55a2360e62`
- `src/routes/api/v2/compute.ts` — 2214 bytes — blob `3529366deae78748f1065ec373f65e1967fbb25d`
- `src/routes/app.tsx` — 177 bytes — blob `8d3650c9ca2ea06052bdd35e8e397c949065a954`
- `src/routes/chain.tsx` — 179 bytes — blob `1cd8079b8cbda6a241c3206b3438e7d771db3b32`
- `src/routes/fusion.tsx` — 180 bytes — blob `7652dab518b4b349f85d8b6bed983aba6b677111`
- `src/routes/guide.tsx` — 179 bytes — blob `aa8dfb188149bf00992aabb456e8df660fbf2af6`
- `src/routes/health.ts` — 237 bytes — blob `95bdf41c997d94296b13eb01ce484e2c684801b8`
- `src/routes/id.tsx` — 176 bytes — blob `8654b8957964011cae3e4c9a9b15428717659725`
- `src/routes/index.tsx` — 430 bytes — blob `c5b625dedd81c3462ea99b40773cecf573a52862`
- `src/routes/pyramid.tsx` — 181 bytes — blob `cf5a7166c215b17cd6275691765ced308cbeda7d`
- `src/routes/story.tsx` — 179 bytes — blob `f357c4bf33bb0edc4fcbf4a81f5c60caefed3bd5`
- `src/routes/v2/capabilities.ts` — 261 bytes — blob `b80fcbe9fecf35660d24b49db9478794269c5e1f`
- `src/routes/v2/dclm/ingest.ts` — 261 bytes — blob `2e4974a07d259684235a14fbd27d587c2709d811`
- `src/routes/v2/dclm/sandbox/execute.ts` — 275 bytes — blob `effc15d6b42170761bdfef15857006d55daa3690`
- `src/routes/v2/dclm/session/purge.ts` — 253 bytes — blob `6f7c0511c2b076babc2983cbbccd03c67e7b9219`
- `src/routes/v2/dclm/telemetry/circuit-breaker.ts` — 275 bytes — blob `08fa7e2529f7119c6b37e684a13798eb82eeb62b`
- `src/routes/v2/protocol.ts` — 249 bytes — blob `c464642f84a4456802745b2696fa4ae2a0da5420`
- `src/routes/v2/receipts.ts` — 234 bytes — blob `387b38078e6ccf9a39abb7ba182eab946ce4e6ce`

### `startup.sh` — 1 files

- `startup.sh` — 191 bytes — blob `c4d943c1cf5c78df19a8126a2747b482de2ba0fd`

### `tsconfig.json` — 1 files

- `tsconfig.json` — 753 bytes — blob `07bc32dfecc5baf3cf3adae2a9775a21c6732086`

### `vercel.json` — 1 files

- `vercel.json` — 300 bytes — blob `f38d726eea83c38ed17790fa641a378a4a49d5bb`

### `vite.config.ts` — 1 files

- `vite.config.ts` — 6842 bytes — blob `323bec0ebdb4d61e2a3ad614ca6342e79667b809`

### `WHERE.md` — 1 files

- `WHERE.md` — 1189 bytes — blob `af94f7897f2897db6cdfd53c1f4cc0a192d74af2`

## Structural tree (directory view)

```text
.
migrations/auth
public
public/__grok
public/__grok/install
public/__grok/install/assets/homescreen
public/film
public/fonts
public/plancksoft
public/registry
public/textures
scripts
src
src/components
src/dccp
src/dccp/body
src/dccp/cosmos
src/dccp/data
src/dccp/engine
src/dccp/gate
src/dccp/guide
src/dccp/hud
src/dccp/index
src/dccp/iris
src/dccp/law
src/dccp/ledger
src/dccp/live
src/dccp/memory
src/dccp/meter
src/dccp/origin
src/dccp/pack
src/dccp/pipe
src/dccp/resources
src/dccp/rte
src/dccp/styles
src/dccp/trinity
src/dccp/truth
src/dccp/ui
src/dccp/unity
src/dccp/world
src/lib
src/lib/app-data
src/lib/auth
src/lib/multiplayer
src/lib/og
src/routes
src/routes/api
src/routes/api/v2
src/routes/v2
src/routes/v2/dclm
src/routes/v2/dclm/sandbox
src/routes/v2/dclm/session
src/routes/v2/dclm/telemetry
```

## Open reconstruction work

- [ ] Fetch and inspect every source/config/script/route/migration file, not only names.
- [ ] Build direct import graph and reverse-import graph.
- [ ] Identify dynamic imports, glob imports, plugin registration, route auto-discovery, server middleware discovery, environment-driven behavior, and generated route trees.
- [ ] Identify exported symbols and their callers.
- [ ] Trace every external side-effect boundary: DB, auth, cookies, storage, network, payment, signing, filesystem, host, deployment.
- [ ] Trace authorization from request to decision to action to receipt; identify all alternate paths and bypasses.
- [ ] Map test file to test command to CI workflow to actual run result.
- [ ] Map data schemas, migrations, registries, fixtures, static receipts, and runtime consumers.
- [ ] Separate normative text, executable constraints, UI text, examples, historical claims, and measured evidence.
- [ ] Determine orphan files, dead code, duplicate concepts, parallel implementations, and unreferenced modules.
- [ ] Produce minimal trunk candidates only after dependency and authority evidence.
- [ ] Build branch/leaf map with each edge labeled: import, call, data, authority, lifecycle, presentation, or narrative.
- [ ] Run independent review against the source tree and this index.

## Known inspected source anchors

- `package.json`: scripts and dependencies inspected.
- `vite.config.ts`: Vite plugins, PGlite dev bootstrap, auth popup middleware, Nitro production/preview setup inspected.
- `tsconfig.json`: strict TypeScript, JS checking, `src` and `server` inclusion inspected.
- `vercel.json`: install command and response headers inspected.
- `README.md`, `ABILITIES.md`, `OBSERVE.md`, `WHERE.md`, `HANG.md`: root statements inspected.
- `src/dccp/main.ts`: imports and initial composition setup inspected; full file not yet reviewed.
- `src/dccp/law/floor.ts`, `companion.ts`, `src/dccp/regulation.ts`, `pass.ts`, `trinity/unify.ts`: inspected.
- `purity_status.ts`: inspected; explicitly self-reports as static declaration, not probe.

## Caution

No architectural trunk is declared in this phase. A trunk is earned by necessity and verified dependency, not by centrality, naming, file size, visual prominence, or founder preference. A module may be central but non-constitutional; a small invariant may be foundational but not executable. Both dimensions will be mapped separately.
