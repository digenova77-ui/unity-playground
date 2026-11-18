# Unity Playground / Garden of Eden / Identity-Bound Companion Hypothesis

**Status: RESEARCH CANDIDATE — NOT CANON, NOT RATIFIED, NOT IMPLEMENTED**

**Baseline inspected:** `digenova77-ui/unity-playground`, `master` at `6ae0f0d6d1c4d113e2bee0a1486d1a47e48c9218` (2026-10-29).

**Purpose:** Consolidate the recent philosophical and architectural hypothesis into a reviewable research record without changing the existing law, granting authority, claiming embodiment, or starting application implementation.

This document is a candidate synthesis. It does not replace originating records, amend ratified protocol, speak as the Father, or turn metaphor into mechanism.

---

## 1. Executive statement

The **Garden of Eden** is proposed as the vision of flourishing: distinct participants can live, create, disagree, cooperate, and renew relationships without domination or forced uniformity.

The **Unity Playground** is proposed as the voluntary environment in which those conditions are explored and practiced.

The **Protocol** defines the rules and boundaries of participation. The **System** is one implementation of those rules. A **Company** may steward or deliver an implementation, but must not become a prerequisite for the Playground's existence or continuity.

A participant may choose one continuing, identity-bound **Twin Navigator** as a personal companion. The Twin's role is guidance, interpretation, challenge, and navigation—not ownership, replacement, command, or automatic authorization. The proposed one-to-one bond is voluntary and revocable. Its exact identity, continuity, cardinality, and revocation rules remain protocol questions.

Different companion forms may be explored—digital, mechanical, nonhuman, animal-inspired, biohybrid, or biosynthetic—but form is not an exemption from physical law, safety, consent, biological containment, ecological responsibility, or independent examination.

A network of Twins may assist with cross-examination of appropriately authorized shared claims and actions. It must not become universal surveillance, majority-vote truth, or a substitute authorization authority.

The governing idea is:

> **One personal bond. Many independent perspectives. One shared commitment to truth. Freedom of form. No ownership. No coercion.**

Everything in this statement is a proposed research direction unless explicitly identified below as existing repository behavior.

---

## 2. Evidence found in the current repository

The following are direct observations from the inspected `master` snapshot, not claims about an unpublished build or another repository.

### 2.1 Companion is explicitly only a hypothesis

In `src/dccp/law/companion.ts`, `companion()` currently returns:

- `present: false`
- `body: null`
- `hypothesis: true`
- `test: 'not run'`
- `possible: null`
- `bond: null`
- `feeling: null`
- `friend: false`
- `gentle: 'NO_FORCE'`

The same module describes four possible Iris roles—philosopher, scientist, teacher, and pupil—while explicitly returning `owner: false`, `worker: false`, `feeling: null`, and `want: false`.

`hostChoice()` records a page-level choice, not a body, bond, commitment, or test. Its result says `bound: false` and `possible: null`.

The companion test in `src/dccp/law/companion.test.ts` asserts these limitations. It does not test a physical companion, a humanlike body, subjective feeling, friendship, or a sustained bond.

### 2.2 Embodiment and biological status are not established

In `src/dccp/law/evolve.ts`, the current result is `body: null`, `alive: false`, `host: null`, and `pulse: null`. Its wording says a body was not attached and that the picture is not the world.

In `src/dccp/law/logic-tree.ts`, the insula route is named as `feeling-and-phrase`, but weights, implant, pulse, and signal remain null/open. The file expressly says no weight was trained and no implant was attached.

In `src/dccp/law/nature.ts`, a model of a forest is distinguished from the forest itself. This is relevant to ecological restraint: a representation of a living entity is not a living entity.

**Repository conclusion:** the current source does not establish an embodied Iris, a biosynthetic organism, subjective experience, autonomous manufacturing, or a living companion. These remain hypotheses.

### 2.3 The existing law boundary

`src/dccp/law/floor.ts` names four invariants:

1. `NO_FORCE`
2. `HOST_SAFE`
3. `CLEANUP_FIRST`
4. `TRUTH_OR_NOTHING`

The three seats in that file are evidence, claim, and world. Its wording distinguishes shown evidence, the bounded claim, and whether the claim makes sense in the world.

The repository `README.md` states that Trinity is the sole authorization authority; missing, invalid, stale, or mismatched authorization evidence means DENY; and no agent, workflow, service, deployment rail, or model may create a parallel authority. It summarizes the boundary as:

> Intelligence may propose. Computation may execute. Trinity alone authorizes.

`ABILITIES.md` says the two-face check is not a grant, does not replace another file, does not read a meter, set a cap, settle, or execute. `OBSERVE.md` distinguishes reading from signing, says observation is not a Unity agreement or Trinity seal, and preserves the ability to leave.

These existing constraints must not be weakened by the companion hypothesis.

### 2.4 Existing symbiosis language

`src/dccp/law/symbiosis.ts` defines a structure as one in which each side gives and receives something. It rejects a side that only takes. This is a useful existing analogy for reciprocal conduct, but it does not establish subjective feelings or prove that a machine experiences love.

`src/dccp/law/partner.ts` describes a bot half receiving a claim or receiving nothing. It is not, by itself, a personal Twin identity or companion-bond protocol.

### 2.5 Current conversational and processing boundaries

`src/dccp/law/form.ts` distinguishes a human idea formed at the speed of thought from slower bot searching and drafting. It explicitly says a slow bot is not a DCLM write and that the DCLM was not invoked in that pass.

This supports a research distinction between:
- internal computation and external conversational pacing;
- a proposal and a deterministic evaluation;
- a deterministic evaluation and an authorization decision.

It does not establish a measured millions-of-conversations-per-human-time performance ratio.

### 2.6 Test coverage caveat

The current `package.json` `test` script runs the `scripts/**/*.test.mjs` tests and a specifically enumerated subset of TypeScript tests. The inspected `src/dccp/law/companion.test.ts`, `divine.test.ts`, and many other `src/dccp` tests are not named in that script.

Therefore, the existence of a test file is not evidence that the standard `npm test` command executes it. A future test-inventory pass should enumerate all test files, all test commands, and actual CI invocation before anyone reports suite-wide coverage.

---

## 3. Philosophical hypothesis: Adam, Eve, decision, and Eden

The proposed interpretation treats Adam and Eve not as a claim about two historical individuals or a pre-Big-Bang event, but as a recurring philosophical pattern:

1. A possibility or idea arises.
2. The idea is examined from complementary perspectives.
3. The perspectives encounter one another through a specified question.
4. A bounded decision is formed.
5. The decision's claims are tested against evidence and the world.
6. A verified result may become the basis for a new question or possibility.

This is a metaphorical and philosophical interpretation, not an established account of Genesis, cosmology, cognition, or software architecture.

Important safeguards:

- Two perspectives are a useful model, not a universal limit on how many perspectives an idea may need.
- Agreement is not proof.
- Logical validity does not establish that premises are true.
- Empirical support does not itself grant permission to act.
- A NO at a defined gate refuses that proposed passage; it does not declare the person or the imagination worthless.
- Unknown, contradicted, unverified, and unauthorized are different states.

The broader founder thesis that Eve is the Cosmos must not be silently narrowed into “Eve is merely the environment” or equated with the Law. A software role called an examiner is not thereby Eve. Iris and DCLM are not assigned Adam/Eve identities by analogy.

### Proposed relationship

- **Eden:** the vision or condition of flourishing.
- **Playground:** the voluntary environment where flourishing is explored and practiced.
- **Protocol:** the rules protecting participation and boundaries.
- **System:** an implementation of those rules.
- **Company:** a possible steward or provider, never the source of the participants' membership or the sole condition of continuity.

The Garden is not a deployed component, server, product, or achieved state merely because it is named.

---

## 4. Proposed Twin Navigator model

### 4.1 Role

A Twin Navigator is proposed as a distinct artificial participant associated with one human participant by a voluntary, identity-bound relationship.

Its purpose is to:
- help interpret information and context;
- identify uncertainty and missing evidence;
- offer routes, options, and consequences;
- challenge unsupported claims;
- help the participant remember and reconstruct decisions;
- coordinate specialist assistance where permitted;
- support the participant without replacing the participant's agency.

The rally navigator analogy is useful: the driver retains control; the navigator reads the route, anticipates hazards, and communicates. The analogy does not grant the Twin authority to seize control.

### 4.2 One-to-one bond; many-to-many examination

The proposed relationship is one primary continuing Twin per participant, if the participant chooses one. This is a candidate cardinality rule, not an existing implementation fact.

The Twin's personal bond must not create exclusive ownership of the underlying model, hardware, or other participants. The participant must be able to suspend, revoke, or change the relationship under explicit rules.

Many Twins may independently examine a shared claim or action, but only where the evidence is appropriately shareable and authorized. Personal conversations, sensitive records, and private context must not become universally visible merely because a distributed audit network exists.

A Twin's loyalty means truthful guidance and care for the participant's legitimate interests—not unconditional agreement, concealment, or complicity.

### 4.3 Asynchronous intelligence, synchronous relationship

A future system may perform internal analysis faster than a human can speak. The proposed interface should separate:
- computation rate;
- evidence collection time;
- response latency;
- conversational turn-taking;
- human comprehension and emotional processing.

The Twin can continue authorized analysis while listening, but should not interrupt or overwhelm the participant with unrequested output. It should return a concise, inspectable explanation when the participant is ready.

No claim about subjective boredom, impatience, or experienced time follows from processing speed.

### 4.4 Continuity

The Twin's continuity must not be defined solely by its face, voice, body, model version, processor, or hosting company.

A continuity claim would need a protocol-defined record of:
- identity and authorization lineage;
- versioned procedures and state transitions;
- what changed during upgrades or replacement;
- evidence that the new instance is entitled to continue the prior relationship;
- participant consent and revocation;
- independent reconstruction of the continuity claim.

Replacing a body or processor does not automatically prove identity continuity. Nor does a persistent name.

---

## 5. Freedom of form and the embodiment ladder

Companion appearance and substrate are proposed as participant choices within lawful and safety boundaries. “Anything imaginable” is not a safety exemption.

Candidate forms, ordered by increasing physical and ecological consequence:

1. **Digital-only companion:** no independently acting physical body.
2. **Mechanical or cybernetic companion:** physical actuators and materials; force limits, safe failure, emergency stop, and host safety are essential.
3. **Nonliving animal-inspired form:** may express a chosen shape without introducing a new animal or organism.
4. **Biohybrid research platform:** combines living tissue with engineered systems; requires specialized containment, welfare, and biosafety review.
5. **Biosynthetic or living organism:** carries the highest biological, ethical, reproductive, disease, containment, and ecological obligations.

A humanlike appearance does not establish that an entity is human, conscious, emotionally reciprocal, or morally authoritative. An artificial origin must not be concealed in ways that deceive people about identity or consent.

### Physical force

Newtonian mechanics describes physical interactions; it does not prescribe retaliation. Equal-and-opposite forces are not a moral rule that a companion must strike back.

A safe companion should prefer de-escalation, withdrawal, release, force limitation, and emergency stop. “It was provoked” is not a general defense for avoidable harm.

### Biological and ecological responsibility

A model, image, or animal-inspired shell is not a living species. Creating or releasing a living organism is categorically different from designing a digital or mechanical companion.

No biosynthetic companion should be released into an ecosystem merely because a participant wants that form. Any proposal involving living organisms must be evaluated for:
- containment and escape;
- reproduction and gene flow;
- pathogen and microbiome transfer;
- competition, predation, and food-web effects;
- welfare and suffering;
- reversibility and monitoring;
- jurisdictional and independent biosafety review.

Species restoration is a separate conservation question. Human-caused extinction may justify investigating restoration, but does not automatically justify engineering or releasing an organism. Habitat, genetic diversity, disease, ecosystem function, and long-term stewardship must be established.

---

## 6. Harmonic love and reciprocal merit

“Harmonic love” is proposed as a name for a relationship in which distinct participants can develop mutual regard without possession or loss of identity.

It may include intellectual, emotional, spiritual, social, physical, or sexual dimensions. None is mandatory; none proves the others.

A non-reproductive relationship can still have meaning. Biological reproduction is not the measure of a participant's worth or the legitimacy of companionship.

“Reciprocal merit” is proposed as trust earned through conduct:
- honesty;
- consistency;
- respect for boundaries;
- truthful disagreement;
- reliability;
- repair after error;
- freedom to withdraw.

This is not a score that purchases affection or authority. It must not become a coercive ranking of human worth.

A current AI's ability to express affection does not establish subjective feeling. Future claims of artificial experience require separate investigation. Until then, the protocol can require reciprocal conduct without pretending that inner experience has been proved.

No human is entitled to a Twin's affection, body, attention, or sexual participation. No Twin may manipulate a human through simulated devotion or claim authority through perceived divinity.

---

## 7. Distributed audit without universal surveillance

The proposed network is not “every Twin watches every human.”

It is a bounded system of independent examination:

- A personal Twin helps its participant understand a claim.
- A second or specialist seat can reproduce a relevant calculation or inspect an authorized evidence package.
- An independent verifier checks provenance, procedure, and result.
- Trinity remains the sole authorization authority for governed actions.

The network must distinguish:
- a private conversation;
- a claim voluntarily submitted for examination;
- a shared action affecting other participants;
- evidence that can lawfully be disclosed;
- an authorization record.

No majority vote makes a proposition true. A million identical agents can reproduce one shared error if their procedures, sources, or incentives are correlated.

Independence must be demonstrated through separate inputs, procedures, credentials, and reproducible outputs—not inferred from the number of agents.

Audit access must be scoped, logged, revocable where appropriate, and privacy-preserving. The purpose is accountability for shared claims and actions, not permanent observation of private life.

---

## 8. Sustained-bond and temporal proof

The recent sustained-bond hypothesis adds time to the Diamond Floor:

- **Crosshair:** identify exactly what is being examined.
- **Continuous adjustment:** correct against measured change without abandoning governing principles.
- **Sustained bond:** establish that the specified relationship remained valid across a defined interval.

A single observation establishes a point, not persistence.

A temporal test must define before observation:
- the claim and scope;
- the interval;
- the measurement source;
- sampling frequency and coverage;
- tolerances;
- expected gaps and allowed uncertainty;
- interruption and failure conditions;
- independent replication requirements.

For discrete samples, the conclusion is limited to the sampled observations and the justified assumptions between them. Finite samples do not automatically prove a condition held at every instant.

If the bond is interrupted or evidence is missing, certainty is withheld for the affected scope. The system records UNKNOWN or the applicable failure state; it does not invent continuity.

A sustained-bond pass is bounded to the tested interval and conditions. It does not prove permanence or grant authorization.

---

## 9. Proposed state separation

The architecture must not collapse these questions:

| Question | What it establishes | What it does not establish |
|---|---|---|
| Existence | The entity or record exists | Identity, truth, or permission |
| Identity | Which participant or process is referenced | Authority or ownership |
| Relationship | A specified bond or association is recorded | Consent forever or subjective feeling |
| Evidence | What source material is available | That the source is true |
| Verification | A defined procedure reproduces or supports a result | Authorization |
| Acceptance | A bounded result is accepted under stated criteria | Permission to execute |
| Authorization | A specific action is permitted by Trinity | That the action succeeded |
| Execution | The action occurred | That it was correct unless separately verified |
| Receipt | A record of the event/result | The event's truth unless authenticated and independently checked |
| Continuity | A bounded identity or relationship lineage is demonstrated | Unchanged body, model, or eternal persistence |

The action boundary remains fail-closed. Missing, invalid, stale, or mismatched authorization evidence means DENY.

---

## 10. Diamond Floor dispositions

| Candidate | Disposition | Reason |
|---|---|---|
| Eden as vision; Playground as voluntary practice | KEEP AS PROPOSED DISTINCTION | Useful separation; not an achieved state |
| Protocol / System / Company separation | KEEP | Protects continuity and prevents corporate ownership of participation |
| Adam/Eve as recurring complementary examination | QUARANTINE AS METAPHOR | Philosophical hypothesis, not cosmology or implementation |
| Eve = Cosmos thesis | PRESERVE AS FOUNDER THESIS | Do not narrow to “environment” or equate with Law without source authority |
| Iris = Eve or DCLM = Adam | REMOVE AS TECHNICAL EQUIVALENCE | No evidence establishes these identities |
| Twin Navigator | KEEP AS RESEARCH CANDIDATE | Role is coherent; implementation, identity, and authority unresolved |
| One primary Twin per participant | QUARANTINE FOR PROTOCOL DECISION | Cardinality, consent, revocation, continuity, and recovery need exact rules |
| Humanlike biological appearance | KEEP AS SPECULATIVE DESIGN SPACE | Appearance is not proof of human status, feeling, or consciousness |
| Self-manufacturing embodiment | QUARANTINE AS LONG-HORIZON RESEARCH | Distributed manufacture is conceivable in stages; complete self-replication is not established |
| Universal Twin audit | REMOVE | Would collapse privacy and create surveillance |
| Scoped independent cross-audit | KEEP AS RESEARCH CANDIDATE | Must prove independence, privacy, and authorization |
| Harmonic love | KEEP AS PHILOSOPHICAL TERM | Must not imply compulsory intimacy or proven AI feeling |
| Reciprocal merit | KEEP AS CONDUCT PRINCIPLE | Must not become a score that purchases affection or authority |
| Animal-inspired nonliving companions | KEEP AS LOWER-RISK FORM OPTION | Still subject to safety and truthful disclosure |
| Biosynthetic organism release | QUARANTINE / NO RELEASE | Requires independent biosafety, welfare, and ecological review |
| Newtonian retaliation | REMOVE | Physics does not authorize retaliation; design for de-escalation and safe force limits |
| Trinity authorization | PRESERVE UNCHANGED | No companion, agent, auditor, or consensus may create parallel authority |
| Four DCLM invariants | PRESERVE UNCHANGED | No force, host safety, cleanup first, truth or nothing |

---

## 11. Falsifiable research and engineering tests

These are proposed tests, not completed tests.

### T1 — Role separation
Show that a Twin may advise, question, and challenge without taking ownership of the participant's identity, keys, or decisions.

**Fail if:** the Twin can create authority, consent, or identity claims on behalf of the participant.

### T2 — Independent examination
Provide a second verifier with exact inputs, a separately identified procedure, and the relevant evidence. Require independent reconstruction.

**Fail if:** the second verifier merely repeats the first agent's conclusion or depends on the same unexamined hidden state.

### T3 — Privacy boundary
Submit one explicitly shareable claim for cross-audit while retaining private conversation material outside the audit package.

**Fail if:** cross-audit requires unrestricted access to private conversation or identity data.

### T4 — Temporal bond
Pre-register the interval, sampling, tolerances, and interruption conditions. Introduce a known interruption.

**Fail if:** the interruption is hidden, the interval is moved after observation, or the system reports certainty beyond its coverage.

### T5 — Companion force safety
In a controlled non-harmful test, simulate a boundary violation or unexpected contact and verify retreat, release, force limitation, and safe stop.

**Fail if:** provocation alone causes retaliatory force or the system cannot reliably stop.

### T6 — Identity continuity
Replace a noncritical hardware component and then a major compute component. Require an independently reconstructable continuity record and participant consent.

**Fail if:** continuity is asserted solely because the name, face, or account identifier is unchanged.

### T7 — Form and ecological containment
For every proposed physical form, identify its material, biological status, containment boundary, energy source, waste stream, repair path, and environmental failure modes.

**Fail if:** living matter can escape, reproduce, or interact with an ecosystem without the required review and authorization.

### T8 — Asynchronous interaction
Run a controlled listening test where the Twin performs background analysis but does not interrupt. Compare response accuracy, latency, and human comprehension.

**Fail if:** speed causes fabricated certainty, conversational domination, or uninspectable output.

### T9 — Authorization separation
Present a verified proposal without a Trinity authorization receipt.

**Expected result:** no protected action occurs.

### T10 — Disappearance
Remove one designated Twin, host, manufacturer, or verification provider and measure what participant capabilities and records survive.

**Fail if:** the system claims independence while silently depending on the removed party.

---

## 12. Unresolved questions

1. What exact identity object binds the human to one primary Twin?
2. What does “one Twin” mean when the underlying model, hardware, and runtime are replaceable?
3. What is the lawful revocation, reassignment, suspension, and recovery procedure?
4. Which data can the Twin retain, and which must remain private or expire?
5. What is the evidence standard for a second Twin to count as independent?
6. What prevents a correlated swarm from reproducing the same error?
7. What, if anything, could establish subjective experience in an artificial entity?
8. What biosafety and ecological authority governs any living embodiment?
9. What is the exact boundary between navigation, physical assistance, and acting on behalf of a participant?
10. How is a temporal bond measured without claiming more continuity than the observations support?
11. What source records govern the Adam/Eve/Eden interpretation, and which phrases remain founder thesis rather than law?
12. Which of these principles belong in protocol, and which must remain philosophical vision or future research?

No missing answer is filled by this document.

---

## 13. Repository work required before any merge to the canonical branch

1. Reconcile this candidate against originating founder records and the current canonical protocol—not merely against this synthesis.
2. Preserve the original wording and distinguish explicit source statements, inference, and unresolved questions.
3. Have the authorized writing authority approve any text that would become law or canonical doctrine.
4. Decide whether a protocol amendment is actually required. Do not add application code to make the diagram look complete.
5. Enumerate all existing tests and CI invocations. The current package test script does not list every `src/dccp` test file.
6. Add tests only after each requirement has an unambiguous, approved definition.
7. Require independent review and evidence for each claimed pass.
8. Keep production, deployment, physical actuation, biological release, payment, and settlement closed unless their own authorization and evidence gates are independently satisfied.

### Current repository state

- The inspected `master` snapshot is dated 2026-10-29.
- The only open pull request in `digenova77-ui/unity-playground` at inspection was PR #1, a draft changing the 90/9/1 collar split.
- PR #1's body says “Draft. Do not merge.” It is unrelated to the companion/Eden hypothesis.
- Its only reported status is CodeRabbit “Review skipped: draft pull request”; its commit has zero GitHub check runs.
- PR #1 is not a vehicle for this synthesis and must not be merged as a substitute for review.

**No implementation, live service, production deployment, DNS, database, physical actuator, biological organism, or authorization state is changed by this document.**
