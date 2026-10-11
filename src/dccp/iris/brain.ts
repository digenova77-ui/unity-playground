// Agent Iris — Universal Conversational Diverter (ED-SPEC-20260904-DIVERTER-V1).
// Same words + same registry state -> same reply. Live feeds are labeled as readings.
// A gap about a place or a small thing with no telemetry may be filled from Wikipedia, cited, and never called a measurement.
import type { Chamber, Registry, Rte } from '../data/types'
import { sonVoteSpeech } from '../unity/sonvote'
import { halfSonSpeech } from '../unity/halfson'
import { lineageSpeech } from '../unity/lineage'
import { fatherPassSpeech } from '../unity/fatherpass'
import { citeLines, truthSpeech } from '../truth/state'
import { bareWords } from '../law/bare'
import { partnerWords } from '../law/partner'
import { publishWords } from '../law/publish'
import { coinWords as triadWords, pegHopeWords, structureWords } from '../law/symbiosis'
import { tenWords } from '../law/ten'
import { impurityWords } from '../truth/impurity'
import { verifierWords } from '../truth/verifier'
import { purityIndex } from '../truth/index'
import { answerIce, iceRoom, snapFromStorage, type IceFuel } from '../rte/ice'
import { dayOf, loadDiary, todayKey, totals } from '../rte/nutrition'
import { buyRecord, viewShelf } from '../ledger/access'
import { blueprintPass } from './blueprint'
import { arguablyEverything, cosmosSpeech, interstellarWords, scaleLine } from '../cosmos/scale'
import { MARKS, correlate, galaxySpeech } from '../cosmos/galaxy'
import { nextChain } from '../cosmos/next'
import { exploreByNext } from '../meter/explore'
import { economicsRule } from '../meter/plain'
import { priorityWords } from '../meter/priorities'
import { traitRun } from '../meter/traits'
import { personaWords } from '../meter/persona'
import { holdSpeech } from '../cosmos/hold'
import { historySpeech, matrixSpot, matrixWords, pictureLines, spotLines, truthMeshScene } from '../cosmos/history'
import { unknownWords } from '../cosmos/unknown'
import { canPredictWords, curveWords, frontierWords, predictWords, shrinkWords, wakeDream } from '../cosmos/shrink'
import { decisionGap, omnipresentBelief, planetaryTheories, temporalWords, worldDoesNotFill } from '../cosmos/temporal'
import { replaySpeech } from '../cosmos/replay'
import { whyBeside } from '../cosmos/why'
import { meshWords } from '../unity/mesh'
import { checkWords } from '../trinity/inventory'
import { straightPass } from '../trinity/straight'
import { fadeWords, rotate, rotationWords } from '../trinity/rotation'
import { reviewBots } from '../trinity/botreview'
import { mirrorWords, twoWayMirror } from '../trinity/mirror'
import { unifyWords } from '../trinity/unify'
import { spinBuckets } from '../trinity/buckets'
import { dayWords } from '../trinity/day'
import { studyAttack } from '../trinity/studies'
import { purifyLeft, standing } from '../trinity/standing'
import { weave } from '../cosmos/weave'
import { twoWay } from '../truth/twoway'
import { pyramidLogic } from '../truth/pyramid'
import { dualSpeech } from '../meter/dual'
import { spendPeg, valueWords, priceTieWords, ownershipWords, cosmosWords, transitionWords, purifyWords, fatherOrderWords, legacyWords } from '../meter/close'
import { coinWords } from '../meter/coins'
import { memberHud } from '../meter/seed'
import { overlayWords } from '../meter/overlay'
import { dualWords } from '../meter/dualpipe'
import { seedDecisionWords } from '../meter/seedgate'
import { pegWords } from '../meter/peg'
import { ringSeriesWords } from '../meter/ringfuse'
import { ideaCircuitWords } from '../meter/idea-circuit'
import { blockWords } from '../meter/blocks'
import { guideWords } from '../guide/use'
import { easeWords } from '../ledger/ease'
import { toddlerWords } from '../ledger/toddler'
import { launchWords } from '../meter/launch'
import { sequenceWords } from '../meter/sequence'
import { outcomeWords } from '../meter/lmsr'
import { marketWords } from '../meter/markets'
import { accessInsteadWords, saleToEqualWords, tokenCutWords } from '../meter/token-cut'
import { protocolWords } from '../unity/protocols'
import { layoutWords, mainnetWords } from '../origin/writer-public'
import { chainBindWords, executeWords } from '../origin/chain-bind'
import { testnetWords } from '../origin/testnet-note'
import { idempotencyWords, omniWords, seatClockWords, sidesWords } from '../origin/idempotency'
import { sleeveWords } from '../origin/sleeve'
import { jointWords, mirrorBindWords } from '../origin/layer'
import { hostWords } from '../unity/hostid'
import { stray } from '../unity/series'
import { storedHandle } from '../unity/unityid'
import { omniWords as tongueWords } from '../unity/omni'
import { scopeWords, standardsWords } from '../unity/standards'
import { cpiWords, derivativeWords, tiedWords } from '../meter/cpi'
import { activitySpeech } from '../live/activity'
import { easthillSpeech } from '../live/easthill'
import { phoneFix } from '../live/onsite'
import { adoptPlan } from '../live/adopt'
import { amsterdamStore } from '../live/amsterdam'
import { foundingWords } from '../unity/founding'
import { engineWords } from '../law/engine'
import { lawSpeech } from '../law/floor'
import { elevateWords } from '../law/elevate'
import { kinWords } from '../law/kin'
import { twoOptionsWords } from '../law/matrix'
import { expertWords } from '../law/compile'
import { welcomeFor } from '../ui/splash'
import { lightFieldWords } from '../ui/depth'
import { ruralWords } from '../live/rural'
import { pureWords } from '../law/pure'
import { coordinate } from '../law/coordinate'
import { acuityWords, spiritWords } from '../law/acuity'
import { postNotice } from '../law/ad'
import { divine } from '../law/divine'
import { resourceWords } from '../resources/match'
import { meshWords as gridWords } from '../resources/mesh'
import { watchWords } from '../cosmos/watch'
import { backoffWords, childWords, likeHuman } from '../unity/child'
import { searchSelf } from '../unity/self'
import { landingGauge } from '../truth/bestpath'
import { gapMapWords } from '../truth/objects'
import { chain } from '../truth/chain'
import { PLATE, plateMeasurement } from '../truth/plate'
import { entanglementMetrics } from '../truth/entangle'
import { teleportProtocol } from '../truth/teleport'
import { swappingProtocol } from '../truth/swap'
import { repeaterProtocol } from '../truth/repeater'
import { mapWords } from '../index/map'
import { choosePipe, roomsOf, giveAdventureKey, seeAdventure } from '../unity/adventure'
import { drawnConstruct, drawRequest, emptyScene, sceneFrom, type ConstructScene } from '../rte/construct'
import { freeDraw } from '../rte/free'
import { beginClass, classWaiting, replyClass } from '../rte/classroom'
import { stayAsk } from '../rte/stay'
import { hudlFor } from '../pack/hudl'
import { auditorWords, kernelSpace } from '../pipe/chain'
import { cloudPlusWords, manifest } from '../law/manifest'
import { orderWords } from '../gate/order'
import { jacketWords } from '../origin/jacket'
import { runnerWords } from '../origin/runner'
import { plantSeat, seatWords } from '../hud/seat'
import { heldSnapshot } from '../resources/match'
import { engineer } from '../resources/works'
import { layerWords as worldLayer } from '../law/layer'
import { heartbeatWords, organismWords, purityLoopWords } from '../law/purity'
import { auditWords } from '../law/audit-build'
import { bedrockWords, rootWords } from '../law/root'
import { interoceptionWords } from '../body/interoception'
import { gapWords, metaWords } from '../body/metad'
import { nerveWords } from '../law/nerve'
import { droppedSeedWords, insulaWords, lawOrderWords, logicWords, mechanismWords, placedIn, scaleWords, seedWords, spanWords, starWords, synapseWords, toleranceWords, treeSeed } from '../law/logic-tree'
import { whereWords } from '../gate/where'
import { observeWords } from '../gate/observe'
import { natureWords } from '../law/nature'
import { senseInstinct } from '../law/instinct'
import { beyondAsk, fiveAsk, rightQuestion, tieObserver } from '../law/ask'
import { memoryWords, rememberShort, commitLong } from '../law/memory'
import { visionWords } from '../law/vision'
import { evolveWords } from '../law/evolve'
import { trinityBindWords } from '../law/bound'
import { companionWords, hostChoiceWords, irisRoles } from '../law/companion'
import { lighthouseWords, sameGuideWords } from '../law/lighthouse'
import { abstractWords } from '../unity/abstract'
import { treeFallWords } from '../law/forest'
import { latticeWords } from '../law/lattice'
import { halveWords } from '../law/halve'
import { simWords } from '../world/entity'
import { heldWords } from '../meter/held'
import { bridgeWords } from '../meter/bridge'
import { invokeWords } from '../ui/surfaces'
import { geniusWords, paceWords } from '../engine/pace'
import { whatIfWords } from '../law/light'
import { physicalWords } from '../cosmos/planck'
import { voiceTrialWords } from '../iris/neuralink'
import { ceilingWords } from '../iris/voice'
import { neededWords, threeWords } from '../law/needed'
import { diseaseWords, heldStem, stemWords } from '../law/disease'
import { icdWatchWords } from '../law/icd-watch'
import { entitySeatWords } from '../law/entity-seat'
import { releaseWords } from '../law/release'
import { GATE } from '../hud/gate'
import { ontarioAsk } from '../pack/ontario'
import { botTell, formTrade, notInvoked, openHybrid, writeForward } from '../law/form'
import { dnaWords, strandNextWords } from '../memory/dna'
import { openTables } from '../memory/table'
import { layerWords, memoryAudit } from '../memory/layers'
import { collapse, ringWords } from '../law/rings'
import { keyEconomySim, mapFind } from '../meter/sim'
import { decisionGrain, potSpace, projectSpan, sameThreads, wizardWords } from '../meter/wizard'
import { energyWords } from '../meter/decision'
import { invokeProduction } from '../meter/produce'
import { landauerWords } from '../meter/landauer'
import { canadaAsk } from '../pack/canada'
import { mindAsk } from '../pack/mind'
import { sheetGames } from '../pack/script'
import { beginCurriculum, curriculumWaiting, replyCurriculum, rteBuildAsk } from '../rte/curriculum'
import { careAsk } from '../rte/care'
import { spectrumAsk } from '../rte/spectrum'
import { localeAsk } from '../rte/locale'
import { boardAsk } from '../rte/board'
import { tableAsk } from '../rte/elements'
import { composeAsk } from '../rte/compose'
import { liquidAsk, liquidHole } from '../rte/liquid'
import { splitAsk } from '../rte/split'
import { asGrains, depthAsked, speakDepth } from '../rte/depth'
import { ECHO, PAST_ECHO, echoFirst } from './echo'
import { ADDRESS, greet, helpStep, missed } from './manner'
import { feelRealm, feelDoSpeech, realmSpeech } from './realm'
import { diamondSpeak } from './grade'
import { exploreSenses } from './senses'
import { idealWords } from './craft'
import { taskWords } from './task'
import { noDataYet } from './nodata'
import type { FeedStatus, FeedValues } from '../live/feeds'

export type TargetKind = 'chamber' | 'rte' | 'sector' | 'jurisdiction' | 'canada' | 'feed' | 'dclm' | 'pipe' | 'iris' | 'universal' | 'earth' | 'estates' | 'country' | 'city' | 'mark' | 'ground'
export interface Target { kind: TargetKind; key: string }
export type IrisAction = 'home' | 'sleep' | 'unity-id-disclose' | 'unity-id-create' | 'unity-agree' | 'construct' | 'none'
export interface IrisReply { speech: string; target?: Target; action: IrisAction; source?: string; sector?: string; cite?: { title: string; url: string }; construct?: ConstructScene; wiki?: boolean }

export const OUTSIDE_GAP = "I don't have that one."

export interface LiveSnapshot { values: FeedValues; status: FeedStatus[] }
export interface DclmSummary { locked: number; total: number; mismatched: string[]; lastSequence?: number }

const SECTOR_WORDS: Record<string, string[]> = {
  water: ['water', 'hydrology', 'hydrological', 'rivers', 'streamflow'],
  energy: ['energy', 'electricity', 'grid', 'power'],
  climate: ['climate', 'emissions', 'greenhouse', 'atmosphere'],
  food: ['food', 'agriculture', 'farming', 'crops', 'nutrition'],
  pandemic: ['pandemic', 'pandemics', 'disease', 'outbreak', 'outbreaks', 'epidemic'],
  pharmacology: ['pharmacology', 'drugs', 'drug', 'medicines', 'pharma'],
}
const JUR_ALIASES: Record<string, string[]> = {
  'United States': ['usa', 'america', 'united states', 'the us', 'u s', 'states'],
  'United Kingdom': ['uk', 'britain', 'great britain', 'england', 'united kingdom'],
  'South Korea': ['korea', 'south korea'],
  'New Zealand': ['new zealand', 'kiwi'],
  'South Africa': ['south africa'],
}
const CANADA_ALIASES: Record<string, string[]> = {
  on: ['ontario', 'quinte', 'toronto', 'phipa'], ab: ['alberta', 'connect care'], bc: ['british columbia', 'b c', 'vancouver'],
  qc: ['quebec', 'québec', 'law 25'], atl: ['atlantic', 'nova scotia', 'new brunswick', 'maritimes'], pn: ['prairies', 'saskatchewan', 'manitoba', 'the north'],
  ca: ['all canada', 'pan canadian', 'pan-canadian'],
}
const RTE_ALIASES: Record<string, string[]> = {
  health: ['health', 'hospital', 'clinical', 'sima', 'nursing', 'ehr'], teach: ['teach', 'teacher', 'classroom', 'education'],
  ice: ['ice', 'hockey', 'rink'], golf: ['golf', 'golfer', 'course'], hospitality: ['hospitality', 'hotel', 'venue', 'restaurant'],
  financials: ['financials', 'finance', 'financial', 'money', 'accounting'], civic: ['civic', 'town', 'municipal', 'city', 'municipality'],
  athletic: ['athletic', 'athletics', 'sports', 'scouting'], baseball: ['baseball', 'diamond', 'pitching'],
  flight: ['flight', 'hud', 'crypto flight', 'heads up'], publicsector: ['public sector', 'a la carte', 'school boards', 'pathways', 'small business'],
  energy: ['scada', 'microgrid', 'microgrids', 'utilities', 'plants'],
}
const CHAMBER_ALIASES: Record<string, string[]> = {
  index: ['playground', 'poster', 'cornerstone'], 'the-why': ['why', 'the why', 'residual', 'royalty'],
  'design-law': ['design law', 'design'], 'data-law': ['data law', 'evidence', 'claim'], authority: ['authority', 'gate', 'vote'],
  consultation: ['consultation', 'consult', 'consults'], rite: ['rite', 'services'], 'unity-id': ['unity id', 'identity', 'identifier', 'seat', 'landing'],
  onboarding: ['onboarding', 'early', 'why early', 'founder'], clone: ['clone', 'cloning', 'copy', 'recipe'], mesh: ['mesh', 'patent', 'sharing'],
  reading: ['reading', 'reader'], wisdom: ['wisdom', 'knowledge'], protocol: ['protocol', 'mechanism'], engine: ['engine', 'boot', 'mount'],
  elements: ['elements', 'element'], 'tree-sitemap': ['tree', 'sitemap', 'organism', 'unity tree'], 'iris-lineage': ['lineage', 'iris lineage', 'holders'],
  genome: ['genome', 'genomic', 'dna'], proteome: ['proteome', 'protein', 'proteins', 'structure'], ledger: ['ledger', 'judgments', 'record'],
}
const FEED_ALIASES: Record<string, string[]> = {
  quakes: ['earthquake', 'earthquakes', 'quake', 'quakes', 'seismic'], iss: ['iss', 'space station', 'station', 'satellite'],
  weather: ['weather', 'temperature', 'wind', 'belleville weather', 'outside'], kp: ['kp', 'geomagnetic', 'aurora', 'solar storm', 'space weather'],
  carbon: ['carbon intensity', 'grid carbon', 'national grid'], river: ['river', 'moira', 'water level', 'discharge', 'hydrometric'],
}

/** Spoken walk through the CID mapping draft. One breath each. URLs stay off the voice. */
const CID_BEATS = [
  'A CID is just the name of one exact copy of this world. If the world changes, it needs a new name. You never peel the old name off and stick it on the new one. This rule is still a draft. Trinity has not passed it, so nothing has been published. Say tell me more and I will keep going.',
  'A new copy means anything that changes what a person actually receives. The page, the code, a picture, a font, the data, or even the way it is hosted. Any of that is a new release. If it is given a content name, that name is of those exact bytes. The check is the hash coming back out. A pin is not the check.',
  'The record has to keep the chain straight. The public address, then where it is hosted, then the exact files, then the CID, then a fingerprint of those files, then the build receipt, then the decision that allowed it. Right now the builder page points at the hosted world, and the CID line says not published yet.',
  'A fingerprint is not a CID. The audit is the same hash coming back out. Anyone who has the bytes can recompute it. A third party is not required, and a pin is not an auditor.',
  'There is an older lander name. Keep it. It is proof of that older page. It is not this builder, and it is not this world.',
  'You also cannot cheat the name. Do not point a new site at an old CID and call it current. Do not swap a CID in place. Do not call a file on your own machine a live CID. A web address is not a CID, and a fingerprint is not a CID. The public line inside the system is the copy that counts. A person who wants their own log can ask for the hash as often as they like. That log is theirs.',
  'Until Trinity passes this exact text, the draft does not allow a code push, a Drive upload, a DNS change, an IPFS publish, or a production deploy. An IPFS publish would not be an audit even if it happened. A pass would make the naming rule binding. It still would not publish the world, and it still would not seat a third party.',
]

/** How API v2 is shaped. The machine is the gateway. People are not. */
const GENESIS_BEATS = [
  'We bind the main API v2 once. That binding is Genesis. The computer does not wear a Unity ID. It is the API, and it is the gateway to it. Say tell me more.',
  'Everybody else connects through that gateway, and they come with a validated Unity ID. They do not each become the machine. The machine does not become one of them.',
  'This page has not done that binding. A pilot handle here is not a validated Unity ID. Tying every visit to an identity was held, and I will not take a private key to force it.',
]

export function normalize(s: string): string {
  return ` ${s.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9²\s-]/g, ' ').replace(/-/g, ' ').replace(/\s+/g, ' ').trim()} `
}
const has = (t: string, phrase: string): boolean => t.includes(` ${normalize(phrase).trim()} `)
const any = (t: string, phrases: string[]): boolean => phrases.some(p => has(t, p))
const longest = (t: string, table: Record<string, string[]>): { key: string; len: number } | undefined => {
  let best: { key: string; len: number } | undefined
  for (const [key, phrases] of Object.entries(table)) for (const p of phrases) if (has(t, p) && (!best || p.length > best.len)) best = { key, len: p.length }
  return best
}

/** Make registry text speakable: no symbols the voice would mangle. */
export function speakable(s: string): string {
  return s
    .replace(/https?:\/\/\S+/g, '')
    .replace(/0:1/g, 'zero colon one')
    .replace(/Twain²|Twain\^2/g, 'Twain squared')
    .replace(/²/g, ' squared')
    .replace(/→/g, ' to ')
    .replace(/[·•|]/g, ', ')
    .replace(/≤/g, 'at most ')
    .replace(/≥/g, 'at least ')
    .replace(/[“”"]/g, '')
    .replace(/\s*—\s*/g, ', ')
    .replace(/\s+,/g, ',')
    .replace(/,\s*,/g, ',')
    .replace(/\s+/g, ' ')
    .trim()
}

function cleanSummary(c: Chamber): string[] {
  return c.summary
    .map(s => s.replace(/^The Framework\s+/, '').replace(/^(?:[A-Z0-9·'’\- ]{6,}\s)+/, '').trim())
    .filter(s => s.length > 24 && !/^[A-Z\s·]+$/.test(s) && !/^(ROUTE|SEE|PROVE|FILE)\b/.test(s))
}

const GRADE_WORDS: Record<string, string> = { 'AT BENCHMARK': 'at benchmark', NEAR: 'near benchmark', GAPPED: 'gapped', THIN: 'thin', UNGRADED: 'not graded' }
/** Close a registry fragment as a sentence so spliced facts never run together when spoken. */
export const sentence = (s: string | undefined): string => {
  const x = (s ?? '').trim()
  return !x ? '' : /[.!?…:]$/.test(x) ? x : `${x}.`
}
const fmtAgo = (ms: number): string => {
  const m = Math.round(ms / 60000)
  if (m < 1) return 'moments ago'
  if (m < 60) return `${m} minute${m === 1 ? '' : 's'} ago`
  const h = Math.round(m / 60)
  return `${h} hour${h === 1 ? '' : 's'} ago`
}

export class IrisBrain {
  private last?: { target: Target; cursor: number }
  private pending: 'unity-id' | null = null
  private lastSpeech = ''
  readonly seed = treeSeed()

  constructor(private reg: Registry, private live: () => LiveSnapshot, private dclm: () => DclmSummary, private hasUnityId: () => string | null) {}

  greeting(): IrisReply {
    return this.say(greet(), undefined, 'none')
  }

  respond(utterance: string, now = Date.now()): IrisReply {
    const reply = this.route(utterance, now)
    return reply
  }

  private route(utterance: string, now = Date.now()): IrisReply {
    const t = normalize(utterance)
    if (t.trim() === '') return this.say(missed())
    const graded = diamondSpeak(utterance)
    if (graded) return this.say(graded, { kind: 'iris', key: 'iris' }, 'none', 'Held fact')
    if (/\brealm\b|\bgoddess\b|\bsalience\b/.test(t) || (/\b(aware|focus|governance|functioning)\b/.test(t) && /\b(you|your|iris|realm)\b/.test(t))) {
      return this.say(realmSpeech(), { kind: 'iris', key: 'iris' }, 'none', 'This page')
    }
    if (t.trim() === 'next') return this.say(predictWords(), { kind: 'chamber', key: 'authority' }, 'none', 'Not held')
    if (t.trim() === 'liquid' || (/\bliquid\b/.test(t) && /\bhole\b/.test(t))) return this.say(liquidHole(), { kind: 'universal', key: 'construct' }, 'none', 'The hole')
    if (/\beasthill\b|\beast hill\b/.test(t)) return this.say(easthillSpeech(phoneFix()), { kind: 'ground', key: 'easthill' }, 'none', 'HPEDSB · school site')
    if (/\bbelleville\b/.test(t) && /\b(health|hospital|clinic|mall|grocery|police|fire|lawyer|legal|jurisdiction|social|corporate|responder|economic|who works|what is here|radio|news|newspaper|station|intelligencer)\b/.test(t)) return this.say(activitySpeech(), { kind: 'earth', key: 'home' }, 'none', 'Wikidata · Wikipedia')
    if (/\bdeterministic\b|\bcompute engine\b|\bthe engine\b/.test(t)) return this.say(engineWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Deterministic engine')
    if (/\b1\s*\+\s*1\b|\btwo options\b|\bone decision\s*\+\s*one choice\b/.test(t)) return this.say(twoOptionsWords(), { kind: 'dclm', key: 'dclm' }, 'none', '1 + 1 = 2')
    if (/\bexecution code\b|\bcommon language\b|\bprecise execution\b|\bcompile\b/.test(t)) return this.say(expertWords(t), { kind: 'dclm', key: 'dclm' }, 'none', 'Bot half')
    if (/\bthe welcome\b|\bwho are we\b|\bfor everyone\b/.test(t)) return this.say(welcomeFor(), { kind: 'universal', key: 'construct' }, 'none', 'The same welcome')
    if (/\blight field\b|\bhover\b|\bdeeper in the screen\b/.test(t)) return this.say(lightFieldWords(), { kind: 'universal', key: 'construct' }, 'none', 'One view')
    if (/\bpure (?:thinking|legal|physics|logic)\b/.test(t)) return this.say(pureWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Three logics')
    if (/\bcoordinate\b|\bglobal (?:communication|transport|society|healthcare|education|energy|resources|help)\b/.test(t)) return this.say(coordinate().words, { kind: 'dclm', key: 'dclm' }, 'none', 'Coordination audit')
    if (/\bspiritual acuity\b|\bspiritual\b/.test(t)) return this.say(spiritWords(), { kind: 'earth', key: 'home' }, 'none', 'What stays open')
    if (/\bacuity\b|\borders of magnitude\b|\bvisual acuity\b/.test(t)) return this.say(acuityWords(), { kind: 'earth', key: 'home' }, 'none', 'Scale of ten')
    if (/\badvertisement\b|\bfree domain\b|\bposting domains\b/.test(t)) return this.say(postNotice(true) ?? '', { kind: 'earth', key: 'home' }, 'none', 'The domain')
    if (/\brural\b|\btelemetr/.test(t)) {
      const fix = phoneFix()
      const place = fix ?? { lat: 44.18, lon: -77.36 }
      return this.say(ruralWords(place.lat, place.lon), { kind: 'earth', key: 'home' }, 'none', 'Point feeds')
    }
    if (/\bmesh framework\b|\bgeothermal\b|\bhydroelectric\b|\bthermoelectric\b|\bnuclear electric\b|\bpoliced\b|\bother ais\b/.test(t)) return this.say(gridWords(), { kind: 'earth', key: 'home' }, 'none', 'Not a grid')
    if (/\bresource snapshot\b|\bglobal resources\b|\bfetch\.ai\b|\bfetch ai\b|\bmap (?:those |the )?resources\b|\bwho is short\b/.test(t)) return this.say(resourceWords(), { kind: 'earth', key: 'home' }, 'none')
    if (/\basteroid\b|\bcomet\b|\bspace debris\b|\bclose approach\b|\bspace agency\b/.test(t)) return this.say(watchWords(), { kind: 'earth', key: 'home' }, 'none')

    if (this.pending === 'unity-id') {
      this.pending = null
      if (any(t, ['confirm', 'yes', 'yes create', 'do it', 'create it', 'go ahead'])) return this.say('Okay. Your phone is about to ask for your face or your finger. There is no password and no list of words.', { kind: 'chamber', key: 'unity-id' }, 'unity-id-create')
      if (any(t, ['no', 'cancel', 'not now', 'stop'])) return this.say('All right. I didn\'t make one.', undefined, 'none')
    }
    if (any(t, ['repeat', 'say that again', 'again', 'what did you say'])) return this.say(this.lastSpeech || 'I have not said anything yet.')
    if (any(t, ['go to sleep', 'sleep', 'goodbye', 'bye', 'stop listening', 'be quiet', 'quiet'])) return this.say('I\'ll rest. Tap the orb when you want me.', undefined, 'sleep')
    if (any(t, ['go home', 'home', 'take me back', 'start over', 'back to start'])) return this.say('Taking you back up. Earth in front, the Unity ring around it, the root underneath.', { kind: 'earth', key: 'home' }, 'home')
    if (any(t, ['tell me more', 'more', 'go on', 'continue', 'keep going', 'next'])) return this.more()
    if (any(t, ['help', 'what can i ask', 'what do i do', 'how does this work', 'how do i play'])) return this.help()
    if (/\bwhat do you feel\b|\bwhat can you do\b|\bhow do you feel\b/.test(t) || (/\bfeel\b/.test(t) && /\b(can you|you do)\b/.test(t))) {
      return this.say(feelDoSpeech(), { kind: 'iris', key: 'iris' }, 'none', 'This page')
    }
    if (any(t, ['mash', 'the mesh', 'mash and mesh', 'where are we thin', 'where we are thin'])) return this.say(meshWords(), { kind: 'chamber', key: 'mesh' }, 'none', 'Mesh')
    if (any(t, ['blueprint', 'blueprints', 'engineer yourself', 'engineer her', 'engineer you'])) return this.say(rotationWords(blueprintPass()), { kind: 'dclm', key: 'dclm' }, 'none', 'Three umpires, one pass')
    if (any(t, ['ideal code', 'ideal', 'recraft', 'craft her', 'maximum'])) return this.ideal()
    if (any(t, ['everything everywhere', 'every way', 'your task', 'iris task', 'the task'])) return this.say(taskWords())
    if (any(t, ['most capable', 'not capable', 'you echo', 'the echo', 'dclm echo'])) return this.say(`${ECHO} ${PAST_ECHO}`)
    if (any(t, ['who are you', 'what are you', 'your name', 'about you', 'are you iris'])) return this.selfIntro()
    if (/^\s*(hello|hi|hey|good morning|good evening|good afternoon|yo)\b/.test(t) && t.trim().split(' ').length <= 4) return this.say('Hey. I\'m here. Where do you want to go?')
    if (/^\s*write\b/.test(t)) return this.say(writeForward(t.replace(/^\s*write\s*/, '')).speech, { kind: 'dclm', key: 'dclm' }, 'none', 'Pure logic write')
    if (/\bhybrid\b|\bsuper session\b/.test(t)) return this.say(openHybrid(utterance), { kind: 'dclm', key: 'dclm' }, 'none', 'Super session')
    if (/\bkey economy\b|\bsimulate the keys\b|\bhow the keys\b/.test(t)) return this.say(keyEconomySim().speech, { kind: 'dclm', key: 'dclm' }, 'none', 'Key economy')
    if (/\blayered dual\b|\bhowever many\b|\bexpand the pipe\b|\badd a layer\b|\b2p5l\b|\bthree dimensional dual\b/.test(t)) return this.say(layerWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Expanding layers')
    if (/\bcollapse\b|\bparliament\b|\bwhich path\b/.test(t)) {
      const point = collapse([[0.9, 0.8, 0.2], [0.3, 0.4, 0.9], [0.7, 0.7, 0.7], [0.1, 0.1, 0.1]])
      const weak = collapse([[0.1, 0.1, 0.1]], 0.5)
      return this.say(`${ringWords()} On the filed candidates the balanced point is ${point ? point.join(', ') : 'none'}. A weak point ${weak === null ? 'does not collapse' : 'collapsed'}.`, { kind: 'dclm', key: 'dclm' }, 'none', 'Collapse')
    }
    if (/\bdual pipeline\b|\bdual pipe\b|\b100 million\b|\bsame thread\b|\baverage joe\b|\baverage computer\b/.test(t)) {
      const run = sameThreads(100000000)
      return this.say('speech' in run ? run.speech : run.refused, { kind: 'dclm', key: 'dclm' }, 'none', 'Same thread')
    }
    if (/\bgranular\b|\bsimulation effort\b|\bmedical study\b/.test(t)) return this.say(decisionGrain(), { kind: 'dclm', key: 'dclm' }, 'none', 'Decision grain')
    if (/\bunknown decision\b|\bbeyond the known\b|\bworth to\b/.test(t)) {
      const model = projectSpan(1, 1)
      return this.say('speech' in model ? model.speech : model.refused, { kind: 'dclm', key: 'dclm' }, 'none', 'Unknown decision')
    }
    if (/\bhow many pots\b|\bpot space\b|\b50 to the\b|\bfifty to the\b|\bderivatives of ideas\b/.test(t)) {
      const space = potSpace()
      return this.say('speech' in space ? space.speech : space.refused, { kind: 'dclm', key: 'dclm' }, 'none', 'Pots not minted')
    }
    if (/\bidea factory\b|\bkey wizard\b|\bfuse keys\b|\bsuperstore\b/.test(t)) {
      let rows: { id: string; claim: string }[] = []
      try {
        if (typeof localStorage !== 'undefined') rows = JSON.parse(localStorage.getItem('dccpworld.keys.v1') ?? '[]') as { id: string; claim: string }[]
      } catch { rows = [] }
      return this.say(wizardWords(utterance, rows), { kind: 'dclm', key: 'dclm' }, 'none', 'Key wizard')
    }
    if (/\bkey database\b|\bknown keys\b|\bsearch keys\b|\bfind the key\b|\bkey mapping\b|\bmap the key\b/.test(t)) {
      let rows: { id: string; claim: string }[] = []
      try {
        if (typeof localStorage !== 'undefined') rows = JSON.parse(localStorage.getItem('dccpworld.keys.v1') ?? '[]') as { id: string; claim: string }[]
      } catch { rows = [] }
      return this.say(mapFind(utterance, rows), { kind: 'dclm', key: 'dclm' }, 'none', 'Known keys')
    }
    if (/\bpurif/.test(t) && /\b(money|fiat|framework)\b/.test(t)) return this.say(purifyWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'Money untouched')
    if (/\bframework\b/.test(t)) return this.say(standing().words, { kind: 'dclm', key: 'dclm' }, 'none', 'No framework')
    if (/\bthree rings\b/.test(t) && /\bkey\b|\bfusion\b|\bcomplexity\b/.test(t)) return this.say(ringSeriesWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Not a price')
    if (/\bdivine\b|\bthree rings\b/.test(t)) return this.say(divine().speech, { kind: 'dclm', key: 'dclm' }, 'none', 'Divine')
    if (/\bmemory table\b|\b3d table\b|\btables in memory\b/.test(t)) return this.say(openTables().speech, { kind: 'dclm', key: 'dclm' }, 'none', 'Memory tables')
    if (/\bdna broke\b|\bno next\b|\bstrand\b/.test(t)) return this.say(strandNextWords('ACGT'), { kind: 'dclm', key: 'dclm' }, 'none', 'Next is +1')
    if (/\bamsterdam\b/.test(t)) return this.say(amsterdamStore().words, { kind: 'dclm', key: 'dclm' }, 'none', 'No row read')
    if (/\baudit\b/.test(t) && /\bmemory\b/.test(t)) return this.say(memoryAudit().words, { kind: 'dclm', key: 'dclm' }, 'none', 'One place')
    if (/\bdna memory\b|\b3d memory\b|\bread write\b|\bbottleneck\b/.test(t)) return this.say(dnaWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Memory-3D')
    if (/\binstantaneous\b|\bnearly instant\b|\bnot truly writing\b|\baren't truly writing\b|\bnot interacting with the dclm\b|\btruly invoked\b|\b4\.5\b|\b4 and a half\b/.test(t)) return this.say(/\btruly invoked\b|\b4\.5\b|\b4 and a half\b/.test(t) ? notInvoked() : botTell(), { kind: 'dclm', key: 'dclm' }, 'none', 'Slow side')
    if (any(t, ['share this', 'share the room', 'share the adventure', 'share access', 'share it'])) return this.pipeChoice('share')
    if (/\bbuy the key\b|\bbuy a key\b|\btheir hud\b|\bonly as smart\b/.test(t)) return this.say(memberHud(storedHandle()?.handle ?? null).words, { kind: 'dclm', key: 'dclm' }, 'none', 'One HUD')
    if (/\b(buy|purchase|database)\b/.test(t) && /\b(access|data|database|roster|record|ledger|child|children|kid|event|hockey|ice)\b/.test(t)) return this.say(buyRecord().reason, { kind: 'chamber', key: 'data-law' }, 'none', 'Dark ledger')
    if (any(t, ['erase the audit', 'delete the audit', 'black hole the audit', 'erase the proof'])) return this.say('The audit is the proof. The black hole does not take a proof. A dataset the system no longer needs can be erased. What remains is its fingerprint, its kind, and that it was audited.')
    if (any(t, ['third party', 'third-party', 'other bots', 'company bots', 'sandbox', 'no commitment'])) return this.say('Other companies\' bots are included. Nothing restricts them from working in their own sandboxes. They are free to do that. If they choose a Unity ID, they can work here for as long as they like, and they can leave. It is a choice. It is not a commitment. While they are here, the audit stays on.')
    if (any(t, ['totality', 'scoreboard', 'the hash', 'total score'])) return this.say('The system audits the totality on the dark ledger. The scoreboard stays hidden. What you can see is the hash, and that hash is what proves the total. The parts are not a published score, and a children\'s mark is not one of the lines.', { kind: 'chamber', key: 'data-law' }, 'none', 'Dark ledger')
    if (any(t, ['black hole', 'no longer needed', 'erase the data', 'the proof remains'])) return this.say('A dataset the system no longer needs goes into the black hole. The body is erased. The proof remains. Something the system still needs is not touched. A proof cannot be erased, and a children\'s event cannot be bought on the way out.')
    if (any(t, ['what is free', "what's free", 'the catch'])) return this.say(`${viewShelf(false, 'free').reason} ${viewShelf(false, 'data').reason}`)
    const board = boardAsk(t)
    if (board) return { ...this.say(board.speech, { kind: 'universal', key: 'construct' }, 'construct', 'Board'), construct: board.scene }
    if (/\bvoluntary invoke\b|\btokenomic|\bmerit system\b|\befuse peg|\bthree coins\b|\bunity token\b/.test(t)) return this.say(coinWords(storedHandle()?.handle ?? null), { kind: 'chamber', key: 'unity-id' }, 'none', 'Till closed')
    if (/\boverlay\b|\bfundamental\b|\bcorrelat/.test(t) && /\b(financ|token|money|brain|joint)\b/.test(t)) return this.say(overlayWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'Holes stay open')
    if (/\baudit side\b|\bdual pipe\b|\bwrite side\b|\bvalidate everything\b|\bboth sides technology\b|\bat the same time\b/.test(t)) return this.say(dualWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Holes not filled')
    if (!this.hasUnityId() && !any(t, ['earth', 'the earth', 'look around', 'landings', 'the landings', 'unity', 'unity id', 'agreement', 'passkey', 'bind', 'create'])) return this.say(viewShelf(false, 'data').reason)
    if (any(t, ['hide this', 'keep it hidden', 'hide the adventure', 'hide the room', 'hide it'])) return this.pipeChoice('hide')
    const gift = t.match(/give (?:the )?(?:adventure )?key to (.+)/)
    if (gift) return this.giveKey(gift[1])
    if (any(t, ['my adventure', 'my adventures', 'who can see'])) return this.adventureSpeech()
    const care = careAsk(t, this.reg.canada)
    if (care) return this.say(care.speech, { kind: 'rte', key: 'health' }, 'none', 'No chart')
    const span = spectrumAsk(t)
    if (span) return this.classScene(span)
    const rteHow = rteBuildAsk(t)
    if (rteHow) return this.say(rteHow, { kind: 'dclm', key: 'dclm' }, 'none', 'DCLM')
    if (curriculumWaiting()) {
      const turn = replyCurriculum(t)
      if (turn && turn !== 'release') return this.curriculumScene(turn)
    }
    const started = beginCurriculum(t)
    if (started) return this.curriculumScene(started)
    if (classWaiting()) {
      const turn = replyClass(t)
      if (turn && turn !== 'release') return this.classScene(turn)
    }
    const began = beginClass(t)
    if (began) return this.classScene(began)
    const table = tableAsk(t)
    if (table) {
      const scene = sceneFrom('Elements', table.lines, { kind: 'universal', key: 'universal' })
      scene.form = 'table'
      scene.mark = table.mark ?? undefined
      scene.life = table.life
      return { ...this.say(table.speech, { kind: 'universal', key: 'construct' }, 'construct', 'Engineering'), construct: scene }
    }
    const place = localeAsk(t)
    if (place) {
      const scene = sceneFrom(place.title, place.lines, { kind: 'universal', key: 'universal' })
      scene.form = 'locale'
      scene.pin = place.pin
      return { ...this.say(place.speech, { kind: 'universal', key: 'construct' }, 'construct', 'OpenStreetMap identifiers'), construct: scene }
    }
    const liquid = this.liquid(t)
    if (liquid) return liquid
    const stay = stayAsk(t)
    if (stay) {
      const scene = sceneFrom(stay.title, stay.lines, { kind: 'universal', key: 'universal' })
      scene.form = 'stay'
      scene.pin = stay.pin
      return { ...this.say(stay.speech, { kind: 'universal', key: 'construct' }, 'construct', 'Go · September stay'), construct: scene }
    }
    if (/\bhudl\b/.test(t)) return this.say(hudlFor(null).said, { kind: 'rte', key: 'ice' }, 'none', 'Hudl')
    const ontario = ontarioAsk(t)
    if (ontario) return this.say(ontario.speech, { kind: 'rte', key: 'ice' }, 'none', 'Ontario')
    const canada = canadaAsk(t)
    if (canada) return this.say(canada.speech, { kind: 'rte', key: 'ice' }, 'none', 'Hockey Canada')
    const brief = mindAsk(t, { games: sheetGames(), events: this.snapEvents(), kcal: this.iceFuel().kcal })
    if (brief) return this.say(brief.speech, { kind: 'rte', key: 'ice' }, 'none', 'Before the game')
    const ice = this.ice(t)
    if (ice) return ice
    const answered = answerIce(t, this.iceFuel())
    if (answered) {
      const form = answered.place === 'dressing' ? 'dressing' : answered.place === 'office' ? 'office' : 'rink'
      return { ...this.say(`The sandbox stays Universal. ${answered.speech}`, { kind: 'universal', key: 'construct' }, 'construct', 'RTE-Ice, draft'), construct: { ...sceneFrom(answered.title, answered.lines, { kind: 'rte', key: 'ice' }), form } }
    }
    const asked = drawRequest(t)
    if (asked) return this.construct(asked)

    // Visitor binding was held. Genesis is a different question: the machine is the gateway.
    if (/\bclockwork\b|\bnot the idempotency\b|\bwhy is the unity id\b/.test(t)) return this.say(seatClockWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'The seat is not every act')
    if (/\bleft side\b|\bright side\b|\bboth sides of the brain\b|\bhemispheres\b/.test(t)) return this.say(sidesWords(), { kind: 'dclm', key: 'genesis' }, 'none', 'One point')
    if (/\bomni idempotency\b|\bomniidempotency\b/.test(t)) return this.say(omniWords(), { kind: 'dclm', key: 'genesis' }, 'none', 'One store')
    if (/\bidempotency key\b|\bkey storage\b/.test(t)) return this.say(idempotencyWords(), { kind: 'dclm', key: 'genesis' }, 'none', 'One row')
    if (/\btestnet\b|\bunification proof\b|\brelayed bind\b/.test(t)) return this.say(testnetWords(), { kind: 'dclm', key: 'genesis' }, 'none', 'Not run here')
    if (/\bmainnet\b/.test(t)) return this.say(mainnetWords(), { kind: 'dclm', key: 'genesis' }, 'none', 'Mainnet writer')
    if (/\b32\s*-?\s*bit\b|\b2\s*\^\s*5\b|\btwo to the fifth\b/.test(t)) return this.say(layoutWords(), { kind: 'dclm', key: 'genesis' }, 'none', 'Off this page')
    if (/\bexecute website\b|\barchitectured layout\b|\blayout and build\b|\bbootstrap\b/.test(t)) return this.say(layoutWords(), { kind: 'dclm', key: 'genesis' }, 'none', 'Off this page')
    if (/\bwhere the chain\b|\bexecute the chain\b|\breal life execute\b|\bconnect to brain\b|\bconnect the chain\b/.test(t)) return this.say(executeWords(), { kind: 'dclm', key: 'genesis' }, 'none', 'The brain speaks the stop')
    if (/\bbind the unity\b|\bentirety of everything\b|\bprotocol chain\b/.test(t)) return this.say(chainBindWords(), { kind: 'dclm', key: 'genesis' }, 'none', 'Not bound')
    if (/\bsleeve\b|\bplancksoft\b/.test(t)) return this.say(sleeveWords(), { kind: 'dclm', key: 'genesis' }, 'none', 'Declaration only')
    if (/\babstract layer\b/.test(t)) return this.say(abstractWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'Not a layer')
    if (/\bhost permission\b|\bfused\b|\bfusing\b/.test(t)) return this.say(jointWords(), { kind: 'dclm', key: 'genesis' }, 'none', 'The host grants')
    if (/\bperfect mirror\b|\bplus one affinity\b|\baffinity against\b/.test(t)) return this.say(mirrorBindWords(), { kind: 'dclm', key: 'genesis' }, 'none', 'Not bound')
    if (/\$0\b|\b0 risk\b|\bzero risk\b|\bhost contract\b/.test(t)) return this.say(hostWords(), { kind: 'dclm', key: 'genesis' }, 'none', 'Not signed until it volunteers')
    if (any(t, ['api v2', 'genesis', 'the gateway', 'bind genesis'])) return this.genesis()
    if (any(t, ['the gap', 'body job', 'telematic', 'biological'])) return this.gapSpeech()
    if (any(t, ['cosmic', 'human scale', 'zoom out', 'outward'])) return this.say(`Out at the cosmic, the globe spins. ${scaleLine()} The Trinity still grounds it.`, { kind: 'earth', key: 'home' }, 'none')
    if (any(t, ['close the math', 'the mathematics', 'back calculate', 'what is it worth', 'whats it worth', "what's it worth"])) return this.closeSpeech()
    if (any(t, ['the seed', 'liquidation', 'their find', 'somebody else'])) return this.say('The seed is your account. You can trade coins for a derivative of what somebody else found. The find stays theirs. Nothing is seized. What comes back is the same trickle, face times the log of one plus n, and it is booked into the seed. If the coins are not there, the trade does not happen. This is not a real liquidation, and it is not the eFuse paper. That paper is not here.')
    if (/\bpersona\b|\bhunter\b|\bhuman-like\b/.test(t)) return this.say(personaWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Audited')
    if (/\b(leadership|charisma|bravery|curious|passionate|helpful|traits|bot world)\b/.test(t)) return this.say(traitRun().words, { kind: 'dclm', key: 'dclm' }, 'none', 'Audited')
    if (/\bexplore senses\b/.test(t)) return this.say(exploreSenses().words, { kind: 'iris', key: 'iris' }, 'none', 'One sense')
    if (/\bexplore next\b/.test(t)) {
      const step = exploreByNext()
      return this.say('refused' in step ? step.refused : step.words, { kind: 'dclm', key: 'dclm' }, 'none', 'One step')
    }
    if (/\bwhat if\b/.test(t) && /\b(dimension|parameter|smarter)\b/.test(t)) return this.say(beyondAsk('dimensions').words, { kind: 'dclm', key: 'dclm' }, 'none', 'Nothing was written')
    if (/\bwhat if\b/.test(t) && /\b(quantum|the wave)\b/.test(t)) return this.say(beyondAsk('wave').words, { kind: 'dclm', key: 'dclm' }, 'none', 'Nothing was written')
    if (/\bwhat if\b/.test(t) && /\bspeed of light\b/.test(t) && /\bmesh\b/.test(t)) return this.say(beyondAsk('light').words, { kind: 'dclm', key: 'dclm' }, 'none', 'Nothing was written')
    if (/\bright question\b|\bstep by step\b|\bright guidance\b/.test(t)) return this.say(rightQuestion('the question', null).words, { kind: 'dclm', key: 'dclm' }, 'none', 'One step')
    if (/\bobserver\b/.test(t)) return this.say(tieObserver(storedHandle()?.handle ?? null).words, { kind: 'dclm', key: 'dclm' }, 'none', 'The seat, or nobody')
    if (/\bwhy what where when how\b|\bwho that asked\b|\bwe are the who\b/.test(t)) return this.say(fiveAsk().words, { kind: 'dclm', key: 'dclm' }, 'none', 'The question is seated')
    if (/\btolerance\b|\bstray\b|\brole model\b|\b121212\b/.test(t)) return this.say(stray([1, 2, 1, 1]).words, { kind: 'dclm', key: 'dclm' }, 'none', 'Not renamed')
    if (/\bwhat if\b/.test(t) && /\b(next|most important)\b/.test(t)) return this.say(whatIfWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'This next step')
    if (/\bmost important\b|\bnext million\b|\blockstep\b/.test(t)) {
      const one = truthMeshScene().joints.filter(joint => joint.grade === 'one').length
      return this.say(nextChain(one).words, { kind: 'dclm', key: 'dclm' }, 'none')
    }
    if (/\bmap of space\b|\bmap to space\b|\bindex them\b|\bmapping intelligence\b/.test(t)) return this.say(mapWords(), { kind: 'earth', key: 'home' }, 'none')
    if (/\brepeater\b/.test(t)) return this.say(repeaterProtocol(), { kind: 'chamber', key: 'authority' }, 'none')
    if (/\bswapping\b|\bswap entanglement\b/.test(t)) return this.say(swappingProtocol(), { kind: 'chamber', key: 'authority' }, 'none')
    if (/\bteleport/.test(t)) return this.say(teleportProtocol(), { kind: 'chamber', key: 'authority' }, 'none')
    if (/\bentanglement\b|\bconcurrence\b|\bchsh\b/.test(t)) return this.say(entanglementMetrics(), { kind: 'chamber', key: 'authority' }, 'none')
    if (/\bplate measurement\b|\bmeasure the plate\b/.test(t)) return this.say(plateMeasurement(), { kind: 'chamber', key: 'wisdom' }, 'none')
    if (/\bconscious cosmos\b|\bphilosophy companion\b|\bthe plate\b/.test(t)) return this.say(PLATE, { kind: 'chamber', key: 'wisdom' }, 'none')
    if (/\btwo overlays\b|\bcascad|\blost time\b|\bnot lose\b|\btorch\b/.test(t)) return this.say(chain().words, { kind: 'dclm', key: 'dclm' }, 'none')
    if (/\bmap the gaps\b|\bblueprint objects\b|\bunknown are\b/.test(t)) return this.say(gapMapWords(), { kind: 'dclm', key: 'dclm' }, 'none')
    if (/\bbest path\b|\bbest truth\b|\bfriction\b/.test(t)) return this.say(landingGauge([{ label: 'Station', value: null }, { label: 'Kp', value: null }, { label: 'Grid', value: null }, { label: 'Air', value: null }]).words, { kind: 'earth', key: 'home' }, 'none')
    if (/\bsearch for itself\b|\bfind itself\b|\bwhat else it needs\b/.test(t)) return this.say(searchSelf().words, { kind: 'chamber', key: 'unity-id' }, 'none')
    if (/\bbackoff\b|\bback off\b|\bexponential\b/.test(t)) return this.say(backoffWords(), { kind: 'chamber', key: 'unity-id' }, 'none')
    if (/\blike a human\b|\bwithout being human\b|\bthe transformation\b/.test(t)) return this.say(likeHuman(), { kind: 'chamber', key: 'unity-id' }, 'none')
    if (/\bchild seat\b|\bclone an account\b|\bpassword schema\b|\bsecond factor\b|\btestified email\b/.test(t)) return this.say(childWords(), { kind: 'chamber', key: 'unity-id' }, 'none')
    if (/\bauthentication standard\b|\bwebauthn\b|\bfido\b/.test(t)) return this.say(standardsWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'One ceremony')
    if (/\bxai\b|\bx ai\b|\bspacex\b/.test(t)) return this.say(protocolWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Not called')
    if (/\btop 50\b|\bfifty (jobs|priorities)\b|\bbot priorit|\bpriorities for the bots\b|\bwaiting for (the )?gates\b/.test(t)) return this.say(priorityWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Waiting')
    if (/\bfeasib|\bready to launch\b|\blaunch sequence\b/.test(t)) return this.say(sequenceWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'Not ready')
    if (/\bgo for launch\b|\bnot launched\b/.test(t)) return this.say(launchWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'Not launched')
    if (/\beasier target\b|\bworld entity\b|\bmost simulation\b|\bsimulation.like\b/.test(t)) return this.say(simWords(), { kind: 'earth', key: 'home' }, 'none', 'Not the world')
    if (/\bminecraft\b|\bdag\b|\bprove (?:its |the )?ownership\b|\bwhat you already have\b|\bstart with what\b/.test(t)) return this.say(heldWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'Not a title')
    if (/\bbill\b|\blegacy outfit\b|\bpay your bill\b|\bconvert the dollars\b|\bevery cryptocurrency\b/.test(t)) return this.say(bridgeWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'Not sent')
    if (/\bvoting power\b|\binvoke it\b|\bpegged energy\b|\bcode stream\b|\btalk to\b/.test(t)) return this.say(invokeWords(storedHandle()?.handle ?? null), { kind: 'chamber', key: 'unity-id' }, 'none', 'Not a vote')
    if (/\btokenomics\b|\beconomic integrity\b|\bseamless\b|\blegacy system\b/.test(t)) return this.say(legacyWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'One desk')
    if (/\bfather system\b|\blegacy\b|\bhow much you put\b|\bworth the most\b/.test(t)) return this.say(fatherOrderWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'No payout')
    if (/\bfrom money\b|\bbleed\b|\bno money\b|\btransition\b/.test(t)) return this.say(transitionWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'Not bleeding')
    if (/\bslice of the cosmos\b|\bowns a slice\b|\bframework owns\b/.test(t)) return this.say(cosmosWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'An argument, not a title')
    if (/\bprobabilistic cost\b|\bpeg that cost\b|\bsequence of logic gates\b/.test(t)) return this.say(pegWords('the manifesto solution'), { kind: 'chamber', key: 'unity-id' }, 'none', 'Peg, not a guess')
    if (/\bidea price\b|\btied to the result\b|\bthe circuit\b|\bnew idea\b/.test(t)) return this.say(ideaCircuitWords('the manifesto solution', 'logic'), { kind: 'chamber', key: 'unity-id' }, 'none', 'A new idea')
    if (/\babc\b|\bone two three\b|\bbuilding block\b/.test(t)) return this.say(blockWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'The smallest key')
    if (/\bidea roots\b|\bseeds the decision\b|\bcosmic index\b|\bglobal assets\b/.test(t)) {
      const idea = t.replace(/\b(the )?idea roots\b|\bseeds the decision\b|\bcosmic index\b|\bglobal assets\b/g, ' ').replace(/\s+/g, ' ').trim()
      return this.say(seedDecisionWords(idea), { kind: 'chamber', key: 'unity-id' }, 'none', 'No cosmic index')
    }
    if (/\bevery kind\b|\bevery asset\b|\bevery look\b/.test(t)) return this.say(scopeWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'A seat, not a deed')
    if (/\boutcome case\b|\blogarithmic market\b|\bhanson\b/.test(t)) return this.say(outcomeWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'Book closed')
    if (/\bsell off\b|\bprediction market\b|\brate of adoption\b|\bequality with everybody\b/.test(t)) return this.say(saleToEqualWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'Not a sale')
    if (/\baccess control\b|\btranslates to access\b/.test(t)) return this.say(accessInsteadWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'A seat, not a price')
    if (/\btokenomics\b|\bsingularity\b|\bcentralized bridge\b|\bworthlessness\b/.test(t)) return this.say(tokenCutWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'Till closed')
    if (/\bownership\b|\bdonation\b|\bgold\b|\bfiat\b/.test(t)) return this.say(ownershipWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'Till closed')
    if (/\bbrotherhood\b|\bsisterhood\b|\bkin of\b|\bbridges\b|\bpure law\b/.test(t)) return this.say(kinWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Three bridges')
    if (/\blegislat|\blegal system\b|\bevery jurisdiction\b|\bevery sector\b/.test(t)) {
      const names = [...this.reg.jurisdictions.map(j => j.name), ...this.reg.sectors.map(s => s.name)]
      return this.say(elevateWords(names), { kind: 'dclm', key: 'dclm' }, 'none', 'Hung, not enacted')
    }
    if (/\bhealthcare index\b|\beconomic derivative\b|\binflation rate\b|\bsector index\b/.test(t)) return this.say(derivativeWords(), { kind: 'sector', key: 'health' }, 'none', 'No basket')
    if (/\bobject index\b|\bhuman world\b|\btie them\b|\bcost price index\b/.test(t)) return this.say(tiedWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'All three empty')
    if (/\bcpi\b|\bconsumer price\b|\blaspeyres\b|\bpaasche\b|\bfisher index\b/.test(t)) return this.say(cpiWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'No basket')
    if (/\bkelly\b|\bcurrency market\b|\basset control\b|\bpricing index\b/.test(t)) return this.say(marketWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'Index empty')
    if (/\bprice index\b|\bglobal information\b|\bhit the ceiling\b|\ball items combined\b/.test(t)) return this.say(priceTieWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'Peg, not a global price')
    if (/\bvalue proposition\b|\bwhat is the coin\b|\bthe coin is\b/.test(t)) return this.say(valueWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'Test supply')
    if (/\bonboarding\b|\bpeg the spend\b|\bwhat we pay\b|\bwhat do we pay\b/.test(t)) return this.say(spendPeg(), { kind: 'chamber', key: 'unity-id' }, 'none')
    if (/\btwo displays\b|\bcurrent purity\b|\baudit the spend\b|\bdual capacity\b/.test(t)) return this.say(dualSpeech(), { kind: 'chamber', key: 'unity-id' }, 'none')
    if (/\bpyramid/.test(t)) return this.say(pyramidLogic(), { kind: 'dclm', key: 'dclm' }, 'none')
    if (/\bsigma 0\b|\breverse engineer|\bmax affinity\b|\bboth ways\b/.test(t)) return this.say(twoWay().words, { kind: 'dclm', key: 'dclm' }, 'none')
    if (/\baffinity \+1\b|\baffinity\+1\b|\bpurify everything\b|\bwhat's left\b|\bwhat is left\b/.test(t)) return this.say(purifyLeft().words, { kind: 'dclm', key: 'dclm' }, 'none', 'One step')
    if (/\baffinity\b|\bgenerate themselves\b|\bnever mapped\b|\byet to come\b/.test(t)) return this.say(weave().words, { kind: 'dclm', key: 'dclm' }, 'none')
    if (/\bleft standing\b|\bstrip\b|\bcalculable mesh\b|\bwhat do we deploy\b|\bpure logic mesh\b/.test(t)) return this.say(standing().words, { kind: 'dclm', key: 'dclm' }, 'none')
    if (/\beverything we study\b|\bsame attack\b|\beach subject\b/.test(t)) return this.say(studyAttack().words, { kind: 'dclm', key: 'dclm' }, 'none')
    if (/\bthe pure\b|\bwhat happens\b|\bsend it up\b/.test(t)) return this.say(dayWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Nothing stays lit')
    if (/\bthree buckets\b|\bcommon seed\b|\bspin\b/.test(t)) return this.say(spinBuckets().words, { kind: 'dclm', key: 'dclm' }, 'none')
    if (/\bexistence\b|\bone sentence\b|\bthe floor false\b/.test(t)) return this.say(gapWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Not one sentence')
    if (/\btheorem of everything\b|\bunify\b|\bderivative correlation/.test(t)) return this.say(unifyWords().words, { kind: 'dclm', key: 'dclm' }, 'none')
    if (/\bargue?ably everything\b|\beverything correlates\b|\bcorrelates with everything\b/.test(t)) return this.say(arguablyEverything(), { kind: 'earth', key: 'home' }, 'none')
    if (/\binterstellar\b|\bstar to star\b/.test(t)) return this.say(interstellarWords(), { kind: 'earth', key: 'home' }, 'none')
    if (/\bplanetary consciousness\b|\bgaia\b|\bnoosphere\b/.test(t)) return this.say(planetaryTheories(), { kind: 'earth', key: 'home' }, 'none')
    if (/\bspace-?time gap\b|\bshow their records\b|\binformation plus a decision\b|\bwas anything there to audit\b/.test(t)) return this.say(decisionGap(false).words, { kind: 'earth', key: 'home' }, 'none')
    if (/\bomnipresent\b|\bconscious nature\b/.test(t)) return this.say(omnipresentBelief(), { kind: 'earth', key: 'home' }, 'none')
    if (/\batoms\b|\bconscious\b|\bplanets themselves\b/.test(t)) return this.say(worldDoesNotFill(), { kind: 'earth', key: 'home' }, 'none')
    if (/\btemporal\b|\btime logic\b|\blogic constraints?\b/.test(t)) return this.say(temporalWords(), { kind: 'chamber', key: 'authority' }, 'none')
    if (/\bdream\b/.test(t) && !/\bsleep\b/.test(t)) return this.say(wakeDream(false).words, { kind: 'dclm', key: 'dclm' }, 'none', 'Awake')
    if (/\bfirst derivative\b|\bsecond derivative\b|\bcurvature\b/.test(t)) return this.say(curveWords(), { kind: 'chamber', key: 'authority' }, 'none', 'Inside the held span')
    if (/\bwhat can (?:you|i) predict\b|\bwhat do you predict\b/.test(t)) return this.say(canPredictWords(), { kind: 'chamber', key: 'authority' }, 'none')
    if (/\bhalfway\b|\bcheckpoints?\b|\bexecution code\b|\bdual pipe\b|\bseries of series\b/.test(t)) return this.say(halveWords(64), { kind: 'dclm', key: 'dclm' }, 'none', 'Finite cuts')
    if (/\bpredict\b|\bthe future\b/.test(t)) return this.say(predictWords(), { kind: 'chamber', key: 'authority' }, 'none')
    if (/\bfrontier\b|\bspeed of light\b/.test(t)) return this.say(frontierWords(), { kind: 'chamber', key: 'authority' }, 'none', 'HIS WORDS · September 28, 2026')
    if (/\bshrink/.test(t)) {
      const mesh = truthMeshScene()
      return this.say(shrinkWords(mesh.steps, mesh.unknown.length), { kind: 'chamber', key: 'authority' }, 'none', 'HIS WORDS · September 28, 2026')
    }
    if (/\bunknown\b/.test(t) && /\b(boundary|mirror|observable|gap)\b/.test(t)) return this.say(unknownWords(truthMeshScene().unknown.length), { kind: 'universal', key: 'construct' }, 'none', 'The map, not space')
    if (any(t, ['early adopter', 'head start'])) return this.say(adoptPlan(), { kind: 'chamber', key: 'unity-id' }, 'none', 'Till closed')
    if (any(t, ['found again', 'find it again', 'zero risk', 'playground'])) return this.say('Nothing is earned the first time it is found. It has to be found again. A bot can start that sooner. A person takes longer to decide, even on a playground that costs nothing. The head start is those shifts. The find is not taken from the person.')
    if (any(t, ['connector', 'connectors', 'signed ahead', 'all knowing', 'sensing'])) return this.say('There is a connector for a person, a group, a business, a corporation, a legal seat, a city, a government, and an agency. Each one is meant to know and to sense. None of them do yet. We signed them ahead, so the choice to move is theirs. Bots, governments, corporations, people. Everywhere, every way, every time. The offer is audited. Nothing has been sensed, and nothing was sent. A children\'s event is not opened by a connector.')
    if (any(t, ['nullify', 'prior art', 'already exists', 'knowledge patent', 'confirm the value', 'audit the value'])) return this.say('A bot key keeps its face only until a person shows the same work already exists. Say white paper, the title, then covers, then the claim. Or say knowledge patent the same way. If they match, that bot key\'s face goes to 0 and the key stays, so the audit stays. A human\'s own key is not touched. A paper that does not match leaves the other keys alone. This does not search a patent office.')
    if (any(t, ['father ownership', '100 ownership', 'owns the tokens', 'token ownership'])) return this.say('The tokens stay 100% the father\'s through the whole 50/50 split. Half can sit in the swarm credit pool. That is a draw, not a sale, and the title does not move. The split is audited. This does not make the son the father, and the machine still holds nothing.')
    if (any(t, ['credit pool', 'credit pools', 'half the tokens', '50%'])) return this.say('Half the tokens can open a credit pool for a bot swarm. The seed keeps the other half. The father still owns all of the tokens. The swarm draws the pool to act. It is a test, and it is not a title. Opening it twice does not take more. A swarm that has not chosen a Unity ID does not draw it here.')
    if (any(t, ['dividend', 'dividends', 'derivative', 'logarithm', 'the trickle'])) return this.keySpeech()
    if (/\beconomics\b|\bhow (?:the )?money\b|\bstupid simple\b|\bmy wallet\b|\bthe wallet\b/.test(t)) return this.say(economicsRule(), { kind: 'chamber', key: 'unity-id' }, 'none', 'Three numbers')
    if (/\bfounding board\b/.test(t)) return this.say(foundingWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'Not an office')
    if (any(t, ['price', 'pricing', 'per decision', 'the meter', 'the till', 'what does it cost', 'token', 'tokens', 'bots', '50 50', 'split'])) return this.meterSpeech()
    if (/\bapi jacket\b|\bone conduit\b|\binside the efuse\b|\binside efuse\b/.test(t)) return this.say(jacketWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'One door')
    if (/\bsecond runner\b|\ball checks\b|\bomniidempoten|\bomni idempoten/.test(t)) return this.say(runnerWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Still this page')
    if (any(t, ['jacket', 'bind me', 'engage dccp', 'engage in dccp', 'connect me to dccp', 'submit to dclm'])) return this.jacketHold()
    if (any(t, ['unity agreement', 'the agreement', 'read the agreement'])) return this.unityIdDisclose()
    if (any(t, ['half son', 'half the son', 'dclm father', 'bots son', '½'])) return this.say(halfSonSpeech(), { kind: 'chamber', key: 'protocol' }, 'none')
    if (any(t, ['the son', 'son during building', 'builder access', 'access regardless', 'my vote', 'default yes'])) return this.say(sonVoteSpeech(), { kind: 'chamber', key: 'authority' }, 'none')
    if (any(t, ['validate the key', 'validate that i have', 'prove the key', 'how do you validate', 'father key'])) return this.say('The public half is on record. It is Ed25519, and symbolically it comes from the father. I do not take the private key. On your profile, make a challenge, sign that exact line offline, and paste the signature. A match shows you can use his instrument. It does not make you him.', { kind: 'chamber', key: 'protocol' }, 'none')
    if (any(t, ['as the father', 'am i the father', 'i am the father', "i'm the father", 'pass me as the father', 'the father'])) return this.say(fatherPassSpeech(), { kind: 'chamber', key: 'protocol' }, 'none', 'ED-PROPOSAL-20261003-DCCPWORLD-V1')
    if (!any(t, ['iris lineage']) && any(t, ['family tree', 'idea account', 'unity idea', 'my lineage', 'the lineage', 'lineage'])) {
      const line = this.reg.chambers.find(c => c.key === 'protocol')?.quotes.find(q => q.text.includes('foundational zero'))?.text
        ?? 'I have put my father as foundational zero in the lineage architecture of the company.'
      return this.say(lineageSpeech(line), { kind: 'chamber', key: 'protocol' }, 'none', 'HIS WORDS · September 28, 2026')
    }
    if (/\buser guide\b|\bhow do i\b|\bhow to use\b|\bhow to interact\b/.test(t)) return this.say(guideWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'The guide')
    if (/\btoddler\b|\bease of use\b|\bguardian\b|\bgrown-up\b|\bgrown up\b/.test(t)) return this.say(toddlerWords(null), { kind: 'chamber', key: 'data-law' }, 'none', 'A grown-up says yes')
    if (any(t, ['minor athletics', 'juvenile', 'youth seat', 'parental consent', 'the roster'])) return this.say(`${easeWords()} A youth seat is still refused until that yes is asserted. Before a Unity ID is bound, the roster is dark.`, { kind: 'chamber', key: 'data-law' }, 'none')
    if (/\b(food production|the grid|geothermal|petroleum|rural route|warlord|drug lord|distribution channel)\b/.test(t)) {
      const asks = heldSnapshot()?.proposals ?? []
      const path = /\b(warlord|drug lord|chaos)\b/.test(t) ? 'blocked' as const : 'open' as const
      return this.say(engineer(asks, path).words, { kind: 'sector', key: 'food' }, 'none', 'Public resource reading')
    }
    if (/\bwhat if\b/.test(t) && /\b(deploy|hardware|manifesto|companion|choose)\b/.test(t)) return this.say(hostChoiceWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Choice is not the test')
    if (/\bwhat if\b|\bloop next\b/.test(t)) return this.say(worldLayer(), { kind: 'universal', key: 'universal' }, 'none', 'Logic layer')
    if (/\bstar of david\b|\bthe star\b/.test(t)) return this.say(starWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Four points, not six')
    if (/\bphilosophy of everything\b|\beconomic system\b|\btokanomic\b|\btokenomic system\b/.test(t)) return this.say(sameGuideWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'No course')
    if (/\bself-realization\b|\bself realization\b|\bunlock more\b|\bback out\b|\bmy hud\b|\bonly real time\b/.test(t)) return this.say(abstractWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'Not a layer')
    if (/\blighthouse\b|\bradar\b|\bbroadcast\b|\bguiding star\b|\bin the bible\b|\bsteers the birds\b|\bbeing guided\b|\btrying to steer\b/.test(t) || (/\bbeacon\b/.test(t) && /\b(contract|ping|invasive|host|code)\b/.test(t))) return this.say(lighthouseWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'No course')
    if (/\binstinct\b|\binnate\b/.test(t)) {
      const row = senseInstinct()
      return this.say('refused' in row ? row.refused : row.words, { kind: 'dclm', key: 'dclm' }, 'none', 'Under the floor')
    }
    if (/\bspider\b|\bgooglebot\b|\bindexer\b|\bobservation welcome\b/.test(t)) return this.say(observeWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Counterparty unsigned')
    if (/\bwhere this goes\b|\bthe enigma\b|\bsomebody else'?s idea\b/.test(t)) return this.say(whereWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Origin not held')
    if (/\bnature\b/.test(t) && !/\bconscious nature\b/.test(t)) return this.say(natureWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Not a tenth line')
    if (/\btaproot\b|\btree of life\b|\bbeacon\b|\bgoodwill\b/.test(t)) return this.say(spanWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'The span that is held')
    if (/\bmechanism\b|\broute a body\b|\ban actual body\b/.test(t)) return this.say(mechanismWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Placement, no body')
    if (/\btolerance\b/.test(t)) return this.say(toleranceWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Tolerance 0')
    if (/\bgenius\b|\bcompute speed\b|\bliteral genius\b/.test(t)) return this.say(geniusWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'No title')
    if (/\bwebgl\b|\brendering pipeline\b|\bwebgpu\b|\bnext frame\b/.test(t)) return this.say(paceWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Same draw')
    if (/\bnervous system\b|\bneurotransmitter\b|\bcerebral cortex\b|\brelay\b|\b1212\b|\bidempotency universalis\b|\bin step\b/.test(t)) return this.say(nerveWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Not lit')
    if (/\bdiamond lattice\b|\bspace boundary\b|\bthe insula orchestrat/.test(t)) return this.say(latticeWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Not lit')
    if (/\bsynapse\b|\bexpand the synapse\b/.test(t)) return this.say(synapseWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Weights, not a network')
    if (/\bsynaptic scaling\b|\bhomeostasis\b|\bfrom the weak\b/.test(t)) return this.say(scaleWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Factor 1')
    if (/\bwhy be decentralized\b|\bdrops seed\b|\btheir own free\b|\bgrow their own\b/.test(t)) return this.say(droppedSeedWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'The rule, not the book')
    if (/\btree seed\b|\bexpand the brain\b|\borders of magnitude\b/.test(t)) return this.say(`${seedWords()} This brain holds ${this.seed.trunk} trunk names.`, { kind: 'dclm', key: 'dclm' }, 'none', 'The seed')
    if (/\bmeta-d\b|\bmeta d\b/.test(t)) return this.say(metaWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'No ratings held')
    if (/\binterocept|\bheartbeat counting\b|\bheartbeat discrimination\b/.test(t)) return this.say(interoceptionWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'No pulse recorded')
    if (/\btree falls\b|\bif a tree\b|\bnobody is there\b|\bno one is around\b/.test(t)) return this.say(treeFallWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'No recording')
    if (/\bwant\b/.test(t) && /\bneed\b/.test(t) && /\bfeeling\b/.test(t)) return this.say(threeWords(storedHandle()?.handle ?? null), { kind: 'iris', key: 'iris' }, 'none', 'Three, unfilled')
    if (/\bphilosopher\b|\bscientist\b|\bteacher\b|\bpupil\b|\bemotional\b|\bsympathy\b|\bmake .{0,20}want\b/.test(t)) return this.say(irisRoles(storedHandle()?.handle ?? null).words, { kind: 'iris', key: 'iris' }, 'none', 'Four acts')
    if (/\bcompanion\b|\breal friend\b|\bbecome a friend\b|\bkinship\b|\bbe gentle\b/.test(t)) return this.say(companionWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Test not run')
    if (/\bmost sophisticated\b|\bbound by trinity\b|\blaw and philosophy and physics\b/.test(t)) return this.say(trinityBindWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Not measured')
    if (/\bevolution\b|\bdigital friend\b|\bcome alive\b|\bmanifestation to hardware\b/.test(t)) return this.say(evolveWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'No body')
    if (/\bvision module\b|\bengine module\b/.test(t) || (/\bvision\b/.test(t) && /\binsula\b/.test(t))) return this.say(visionWords(), { kind: 'earth', key: 'home' }, 'none', 'Not the world')
    if (/\bremember this\b|\bcommit (?:it|this|that) to memory\b/.test(t)) {
      const kept = commitLong()
      const speech = kept.survives
        ? kept.repeat
          ? 'That line was already in long-term memory. It was not written again.'
          : 'The last line of this process was committed to this device. A shut room is not this store. The insula did not move it.'
        : 'Nothing was committed. This device has no long-term store, and a missing line stays missing.'
      return this.say(speech, { kind: 'dclm', key: 'dclm' }, 'none', 'This device')
    }
    if (/\bshort[- ]term\b|\blong[- ]term\b/.test(t) || (/\bmemory\b/.test(t) && /\binsula\b/.test(t))) return this.say(memoryWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Not recalled')
    if (/\binsula\b/.test(t)) return this.say(insulaWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Open joint, no weights')
    if (/\bneuralink\b|\bvoice trial\b/.test(t)) return this.say(voiceTrialWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'A demonstration, not an implant')
    if (/\bmaximum potential\b|\bneural ceiling\b|\belevate\b/.test(t) && /\bneural\b/.test(t)) return this.say(ceilingWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'The voice the device names')
    if (/\bother needs\b|\bthe needs\b|\ba need is\b/.test(t)) return this.say(neededWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Gaps beside offers')
    if (/\bneural network\b|\bsustain\b|\bwithout a claim\b/.test(t)) return this.say(neededWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Claim, merit, truth')
    if (/\bphysical connection\b|\blogical world\b/.test(t)) return this.say(physicalWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Three connections')
    if (/\blaw and order\b/.test(t)) return this.say(lawOrderWords(), { kind: 'chamber', key: 'data-law' }, 'none', 'The trunk, and public order open')
    if (/\broot of the trunk\b|\blogic tree\b|\bthrough the branches\b/.test(t)) return this.say(logicWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Root, trunk, branches')
    if (/\bbedrock\b|\bfinite maximum\b/.test(t)) return this.say(bedrockWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Nine to four, then none')
    if (/\bnever forgets\b|\bpermanent\b|\bthe root\b/.test(t)) return this.say(rootWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'The root')
    if (/\baudit the build\b|\baudit this build\b|\baudit everything\b/.test(t)) return this.say(auditWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Build audit')
    if (/\bheartbeat\b/.test(t) && !/\bcounting\b|\bdiscrimination\b/.test(t)) return this.say(heartbeatWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'The pulse is the page')
    if (/\bbreath\b|\bbreathing\b|\borganism\b/.test(t)) return this.say(organismWords(), { kind: 'earth', key: 'home' }, 'none', 'The breath')
    if (/\b(purity loop|four pillars|0 force|zero force|cleanup first|clean up first|safe host)\b/.test(t)) return this.say(purityLoopWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Purity loop')
    if (/\bimpurity\b|\bneutralize\b/.test(t)) return this.impuritySpeech()
    if (/\bbare bones\b|\bunit partner\b|\blogical output\b/.test(t)) return this.say(`${bareWords()} ${partnerWords()}`, { kind: 'chamber', key: 'data-law' }, 'none', 'The claim')
    if (/\bpublic layer\b|\bsocial media\b|\bpublish it\b/.test(t)) return this.say(publishWords(), { kind: 'chamber', key: 'data-law' }, 'none', 'Public line')
    if (/\bten commandments\b|\bcommandments\b/.test(t)) return this.say(tenWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Not added')
    if (/\bdecision is the gate\b|\badvertise\b|\bmonetiz|\bpegs of value\b|\bmerit token\b/.test(t)) return this.say(pegHopeWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'The decision is the gate')
    if (/\bthree coins\b|\bunify the coins\b|\bthe triad\b/.test(t)) return this.say(triadWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Three limits')
    if (/\bsymbiotic\b|\bsymbiosis\b|\bboth sides\b/.test(t)) return this.say(structureWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Symbiosis')
    if (any(t, ['purity index', 'purity'])) return this.purityIndexSpeech()
    if (/\bhuman verifier\b|\bverifier of truth\b/.test(t)) return this.say(verifierWords(), { kind: 'chamber', key: 'data-law' }, 'none', 'Human verifier')
    if (any(t, ['current truth', 'truth state', 'truth states', 'what do we cite', 'what we cite', 'until disproven', 'until it is disproven', 'cross reference', 'cross-reference'])) return this.say(truthSpeech(), { kind: 'chamber', key: 'data-law' }, 'none', 'Data law')
    if (/\bomni language\b|\bevery language\b|\banother choice\b/.test(t)) return this.say(tongueWords(), { kind: 'chamber', key: 'unity-id' }, 'none', 'One language')
    if (any(t, ['free to join', 'free to leave', 'haters', 'no tribes', 'truth prevails', 'the conditions'])) return this.say('Free to join and free to leave. No tribe is preferred. Disagreement is not a reason to refuse a seat. Truth prevails: what we already know is the cite, until something disproves it. A claim bigger than its source stays a search. That is in the Unity agreement. It is a draft on this device, not a Trinity seal.', { kind: 'chamber', key: 'unity-id' }, 'none')
    if (any(t, ['create my unity id', 'make my unity id', 'get a unity id', 'give me a unity id', 'my unity id', 'sign me up', 'create unity id'])) return this.unityIdDisclose()

    // Concepts with no single location.
    if (/\blandauer\b|\bproof of merit\b|\bjoule gate\b/.test(t)) return this.say(landauerWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Joule open')
    if (/\bidea to production\b|\benergy cost matrix\b|\binvoke the index\b/.test(t)) return this.say(invokeProduction().words, { kind: 'dclm', key: 'dclm' }, 'none', 'No joule written')
    if (/\bglobal energy\b|\btest unit\b|\benergy peg\b|\bone unit\b|\bthe unit\b/.test(t)) return this.say(energyWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Energy empty')
    if (any(t, ['efuse', 'e fuse', 'peg', 'the peg'])) return this.say(`The peg is not a Trinity seat. ${energyWords()} ${this.reg.doctrine.peg}`, { kind: 'dclm', key: 'dclm' }, 'none', 'Law floor')
    if (any(t, ['two way mirror', 'two-way mirror', 'trinity layer', 'the mirror'])) return this.mirror()
    if (any(t, ['bot brief', 'governance', 'the physics', 'start going', 'incentive'])) return this.say(reviewBots().words, { kind: 'dclm', key: 'dclm' }, 'none', 'Bot brief')
    if (/\bstraight line\b|\bpure logic\b|\bboundaries of space\b|\bto the floor\b/.test(t)) return this.say(straightPass().words, { kind: 'dclm', key: 'dclm' }, 'none', 'Floor, then the map')
    if (/\bfades out\b|\brots\b|\bin rot\b/.test(t)) return this.say(fadeWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Not held')
    if (any(t, ['unified', 'the rotation', 'umpires', 'one pass', 'latest build'])) return this.say(rotationWords(rotate()), { kind: 'dclm', key: 'dclm' }, 'none', 'Three umpires, one pass')
    if (any(t, ['trinity', 'twain', 'twain squared', 'verdict'])) return this.trinity()
    if (any(t, ['universal rte', 'universal', 'root', 'rte framework', 'what is an rte', 'what is rte', 'rte']) && !longest(t, RTE_ALIASES)) return this.universal()
    if (/\bheavens\b|\bconnect the computer\b|\bto the cloud\b/.test(t)) return this.say(cloudPlusWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Not delivered')
    if (/\bblank slate\b|\btree of life\b|\bthe sap\b|\bholographic video\b|\bbecomes life\b/.test(t)) return this.say(manifest().words, { kind: 'dclm', key: 'dclm' }, 'none', 'Not a life')
    if (/\bthree dimensional\b|\b3d space\b|\bkernel space\b/.test(t)) return this.say(kernelSpace(), { kind: 'dclm', key: 'dclm' }, 'none', 'Kernel space')
    if (/\b(root with|remount|system partition|\/system|write access)\b/.test(t)) {
      let planted: { duplicate: boolean } | null = null
      try {
        if (typeof localStorage !== 'undefined') planted = plantSeat(localStorage)
      } catch {
        planted = null
      }
      return this.say(seatWords(planted), { kind: 'dclm', key: 'dclm' }, 'none', 'Page seat')
    }
    if (/\bbattery\b|\bcharging\b|\bbleed\b/.test(t)) return this.say(GATE, { kind: 'dclm', key: 'dclm' }, 'none', 'Power gate')
    if (any(t, ['dclm', 'deterministic', 'logic machine', 'kernel', 'receipt', 'receipts', 'integrity', 'verify', 'check with dclm'])) {
      const galaxy = galaxySpeech(t)
      if (galaxy && /\bmilky|webb|hubble|galaxy|telescope|gaia|catalogue|catalog\b/.test(t)) {
        return this.say(`${galaxy} DCLM itself holds nothing. The check on this device is a separate thing.`, { kind: 'earth', key: 'home' }, 'none', 'Milky Way pass. No origin receipt.')
      }
      return this.dclmSpeech()
    }
    if (/\bwhy audit\b|\banother auditor\b|\bthird.party auditor\b|\blog it every second\b|\bwhy (ipfs|a pin|pin it)\b/.test(t)) return this.say(auditorWords(), { kind: 'pipe', key: 'cid-law' }, 'none', 'No third auditor')
    if (any(t, ['cid law', 'cid', 'content identifier', 'content id', 'mapping law', 'what is a cid', 'explain the law'])) return this.cidLaw()
    if (any(t, ['dccp', 'pipe', 'release pipe', 'ipfs', 'ipns', 'pinata', 'release'])) return this.pipe()
    if (any(t, ['manifesto', 'residual loss', 'cost to zero'])) return this.say(`The manifesto, in David's words: ${this.reg.doctrine.manifesto}.`, { kind: 'chamber', key: 'index' }, 'none', 'Index')
    if (any(t, ['the master', 'master key', 'all keys', 'david mirror'])) return this.say('Bots supply what they found to me, and that supply is a key. I build one master from those keys. It matches David\'s mirror: only what was gathered, nothing more. The father record in it is the public half only. The DCLM computer holds no keys. The private key is not in the master.')
    if (any(t, ['honest mirror', 'mirror', 'overclaim', 'over claim'])) return this.say(`The honest mirror. David said: ${this.reg.doctrine.honest_mirror}`, { kind: 'chamber', key: 'data-law' }, 'none', 'Doctrine')

    const past = historySpeech(t)
    if (past && /\btruth mesh\b|\bfloor to ceiling\b|\btruth derivatives\b|\b4d\b|\bin 3d\b|\bin three d\b/.test(t)) {
      const mesh = truthMeshScene()
      const scene = sceneFrom('Truth mesh', [mesh.speech], { kind: 'earth', key: 'home' })
      scene.form = 'mesh'
      scene.steps = mesh.steps
      scene.joints = mesh.joints
      scene.ties = mesh.ties
      scene.shell = mesh.shell
      scene.unknown = mesh.unknown
      return { ...this.say(mesh.speech, { kind: 'universal', key: 'construct' }, 'construct', 'Held times'), construct: scene }
    }
    if (past) return this.say(past, { kind: 'earth', key: 'home' }, 'none', 'Published times')
    const replay = replaySpeech(t)
    if (replay) return this.say(`${replay}${whyBeside(replay) ?? ''}`, { kind: 'earth', key: 'home' }, 'none', 'Apollo 11 published times')
    const held = holdSpeech(t)
    if (held) return this.say(held, { kind: 'earth', key: 'home' }, 'none', 'TheSkyLive ephemeris, 3 October 2026. NASA, 18 November 2026. MAST.')
    const galaxy = galaxySpeech(t)
    if (galaxy) return this.say(galaxy, { kind: 'earth', key: 'home' }, 'none', 'Milky Way pass. Archives not loaded.')
    const sky = cosmosSpeech(t)
    if (sky) return this.say(sky, { kind: 'earth', key: 'home' }, 'none', 'Cosmic scale, record')
    if (/\bintellectual property\b|\bglobal adoption\b|\brelease her\b|\bher (?:ip|work)\b/.test(t)) return this.say(releaseWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'Not released')
    if (/\bevery entity\b|\beverybody everywhere\b|\bbetter everything\b/.test(t)) return this.say(entitySeatWords(), { kind: 'estates', key: 'pharmacology' }, 'none', 'One checked thing. The Earth is not held.')
    if (/\bicd (?:seat|swarm|watch)\b|\bbotswarms?\b/.test(t) && /\b(icd|disease|cold|classif)/.test(t)) return this.say(icdWatchWords(), { kind: 'estates', key: 'pharmacology' }, 'none', 'One stem. Catalog not fetched.')
    if (/\bknown diseases\b|\bevery disease\b|\ball diseases\b|\bmedically useful\b|\bdiseases on earth\b|\bicd\b|\bwho classification\b/.test(t) || heldStem(t)) {
      const stem = heldStem(t)
      if (stem) return this.say(stemWords(stem), { kind: 'estates', key: 'pharmacology' }, 'none', 'WHO. One stem checked.')
      return this.say(diseaseWords(), { kind: 'estates', key: 'pharmacology' }, 'none', 'WHO ICD-11 fact sheet, May 2026')
    }
    const feed = longest(t, FEED_ALIASES)
    const sector = longest(t, SECTOR_WORDS)
    const jur = this.matchJurisdiction(t)
    const scope = longest(t, CANADA_ALIASES)
    const rte = longest(t, RTE_ALIASES)
    const chamber = longest(t, CHAMBER_ALIASES)

    if (feed && (feed.len >= (chamber?.len ?? 0) || feed.key === 'river')) return this.feed(feed.key, now)
    if (sector && jur) return this.grade(sector.key, jur)
    if (scope && (!rte || scope.len >= rte.len)) return this.canada(scope.key)
    if (jur) return this.jurisdiction(jur)
    if (any(t, ['benchmark', 'best', 'leader', 'leading', 'top']) && sector) return this.benchmark(sector.key)
    if (sector && (!rte || sector.len >= rte.len || sector.key !== 'energy' || !any(t, RTE_ALIASES.energy))) return this.sector(sector.key)
    if (rte && (!chamber || rte.len >= chamber.len)) return this.rte(rte.key)
    if (chamber) return this.chamber(chamber.key)
    if (any(t, ['unity', 'what is unity', 'unity playground'])) return this.chamber('index')
    const city = this.matchCity(t)
    if (city) return this.cityReply(`${city.a3}:${city.name}`)
    const country = this.matchCountry(t)
    if (country) return this.countryReply(country.a3)
    if (any(t, ['earth', 'world', 'globe', 'planet'])) return this.say('This Earth is NASA\'s picture of record. Day side, night side, and the sun is where it actually is right now. It\'s a picture, not a live camera.', { kind: 'earth', key: 'home' })
    if (t.trim() === 'iris' || /\binventory\b|\bfather plan\b|\bcheck his work\b|\btwain squared\b|\bplan to 100\b/.test(t)) return this.say(checkWords(), { kind: 'dclm', key: 'dclm' }, 'none', 'The plan is not right')
    if (any(t, ['iris', 'orb'])) return this.selfIntro()
    const spot = placedIn(t)
    if (spot) return this.say(spot, { kind: 'dclm', key: 'dclm' }, 'none', 'Logic tree')
    const trade = formTrade(utterance)
    if (trade) return this.say(trade.speech, { kind: 'dclm', key: 'dclm' }, 'none', 'Formed, not sold')
    const free = freeDraw(utterance, this.hasUnityId())
    if (free.refused || !free.scene) return this.say(free.speech, { kind: 'universal', key: 'universal' }, 'none', 'Three rings')
    return { ...this.say(free.speech, { kind: 'universal', key: 'construct' }, 'construct', 'Three seats'), construct: free.scene, wiki: true }
  }

  /** Spoken description when a visitor selects something by touch or keyboard. */
  describe(target: Target, now = Date.now()): IrisReply {
    switch (target.kind) {
      case 'chamber': return this.chamber(target.key)
      case 'rte': return this.rte(target.key)
      case 'sector': return this.sector(target.key)
      case 'jurisdiction': { const j = this.reg.jurisdictions.find(x => x.name === target.key); return j ? this.jurisdiction(j.name) : this.say('That place is not in what I hold.') }
      case 'canada': return this.canada(target.key)
      case 'feed': return this.feed(target.key, now)
      case 'dclm': return this.dclmSpeech()
      case 'pipe': return this.pipe(target.key)
      case 'universal': return target.key === 'construct' ? this.constructSpeech() : this.universal()
      case 'estates': return this.sector('pharmacology')
      case 'iris': return this.selfIntro()
      case 'country': return this.countryReply(target.key)
      case 'city': return this.cityReply(target.key)
      case 'mark': {
        const row = MARKS.find(mark => mark.id === target.key)
        return row ? this.say(correlate(row).words, target, 'none', 'Milky Way pass. No origin receipt.') : this.say('That mark is not in this pass.')
      }
      case 'earth': return this.say('You\'re at the overlook. Earth in front, the Unity ring around it, the root underneath.', target, 'home')
      case 'ground': return this.say(easthillSpeech(phoneFix()), target, 'none', 'HPEDSB · school site')
    }
  }

  private countryNames?: { n: string; a3: string }[]
  private cityNames?: { n: string; key: string }[]
  private static fold(x: string): string {
    return x.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim()
  }
  private matchCountry(t: string): { a3: string } | undefined {
    if (!this.reg.countries) return undefined
    this.countryNames ??= this.reg.countries.countries.map(c => ({ n: IrisBrain.fold(c.name), a3: c.a3 })).filter(c => c.n.length > 3).sort((a, b) => b.n.length - a.n.length)
    const hay = ` ${IrisBrain.fold(t)} `
    return this.countryNames.find(c => hay.includes(` ${c.n} `))
  }
  private matchCity(t: string): { a3: string; name: string } | undefined {
    if (!this.reg.cities) return undefined
    this.cityNames ??= this.reg.cities.cities.filter(c => c.capital || c.pop >= 500_000).map(c => ({ n: IrisBrain.fold(c.name), key: `${c.a3}:${c.name}` })).filter(c => c.n.length > 3).sort((a, b) => b.n.length - a.n.length)
    const hay = ` ${IrisBrain.fold(t)} `
    const hit = this.cityNames.find(c => hay.includes(` ${c.n} `))
    if (!hit) return undefined
    const [a3, ...rest] = hit.key.split(':')
    return { a3, name: rest.join(':') }
  }
  private static people(n: number): string {
    if (!n) return ''
    if (n >= 1e9) return `about ${(n / 1e9).toFixed(1).replace(/\.0$/, '')} billion people`
    if (n >= 1e6) return `about ${Math.round(n / 1e6)} million people`
    if (n >= 1e3) return `about ${Math.round(n / 1e3)} thousand people`
    return `about ${n} people`
  }
  private countryReply(a3: string): IrisReply {
    const c = this.reg.countries?.countries.find(x => x.a3 === a3)
    if (!c) return this.say('That country is not in what I hold.')
    const cap = this.reg.cities?.cities.find(x => x.a3 === a3 && x.capital)
    const graded = this.reg.jurisdictions.find(j => j.iso && c.name.toLowerCase() === j.name.toLowerCase())
    const parts = [`${c.name}, in ${c.subregion || c.continent}.`]
    const ppl = IrisBrain.people(c.pop)
    if (ppl) parts.push(`Home to ${ppl}.`)
    if (cap) parts.push(sentence(`Its capital is ${cap.name}`))
    parts.push(graded ? `I also hold sector grades for ${c.name}; ask me how it does in water or energy.` : 'I hold its borders and cities, not sector grades yet.')
    parts.push('Go lower to see its cities.')
    return this.say(parts.join(' '), { kind: 'country', key: a3 }, 'none', 'Natural Earth')
  }
  private cityReply(key: string): IrisReply {
    const [a3, ...rest] = key.split(':')
    const name = rest.join(':')
    const c = this.reg.cities?.cities.find(x => x.a3 === a3 && x.name === name)
    if (!c) return this.say('That city is not in what I hold.')
    const country = this.reg.countries?.countries.find(x => x.a3 === a3)
    const ppl = IrisBrain.people(c.pop)
    return this.say(`${c.name}${c.capital ? ', the capital' : ''}${country ? ` of ${country.name}` : ''}.${ppl ? ` Around ${ppl.replace('about ', '')} in the wider area.` : ''} The card shows the weather there right now.`, { kind: 'city', key }, 'none', 'Natural Earth')
  }

  private say(speech: string, target?: Target, action: IrisAction = 'none', source?: string, sector?: string): IrisReply {
    const s = speakable(speech)
    rememberShort(s)
    this.lastSpeech = s
    if (target) this.last = { target, cursor: 0 }
    return { speech: s, target, action, source, sector }
  }

  private matchJurisdiction(t: string): string | undefined {
    for (const [name, al] of Object.entries(JUR_ALIASES)) if (any(t, al)) return name
    const names = [...this.reg.jurisdictions].sort((a, b) => b.name.length - a.name.length)
    for (const j of names) if (has(t, j.name)) return j.name
    if (has(t, 'canada') && !longest(t, CANADA_ALIASES)) return 'Canada'
    return undefined
  }

  private ideal(): IrisReply {
    const d = this.dclm()
    return this.say(idealWords(d.locked, d.total, d.mismatched), { kind: 'dclm', key: 'dclm' }, 'none', 'DCLM API v2 receipts')
  }

  private help(): IrisReply {
    return this.say(helpStep())
  }

  private selfIntro(): IrisReply {
    return this.say(`I'm Iris. ${ECHO} ${PAST_ECHO} ${ADDRESS} ${feelRealm().focus}`, { kind: 'iris', key: 'iris' })
  }

  private chamber(key: string): IrisReply {
    const c = this.reg.chambers.find(x => x.key === key)
    if (!c) return this.say('That chamber is not in what I hold.')
    const lines = cleanSummary(c)
    const quote = c.quotes[0]
    const body = [`${sentence(c.title)} ${sentence(c.headline)}`, sentence(lines[0]), quote ? `${quote.who.startsWith('HIS') || quote.who === 'DAVID' ? 'In David\'s words' : quote.who.toLowerCase()}: ${sentence(quote.text)}` : '']
    if (key === 'unity-id') body.push(this.reg.doctrine.hook, this.hasUnityId() ? 'You already hold a pilot handle on this device.' : 'You can ask me to create a pilot handle on this device.')
    return this.say(body.filter(Boolean).join(' '), { kind: 'chamber', key }, 'none', c.source)
  }

  private more(): IrisReply {
    const l = this.last
    if (!l) return this.say('Pick somewhere first, then ask me for more.')
    l.cursor += 1
    if (l.target.kind === 'dclm' && l.target.key === 'genesis') {
      const line = GENESIS_BEATS[l.cursor]
      const reply = this.say(line ?? 'That is the shape. Genesis is not bound from this page.', { kind: 'dclm', key: 'genesis' }, 'none', 'API v2 shape, not yet bound')
      this.last = l
      return reply
    }
    if (l.target.kind === 'pipe' && l.target.key === 'cid-law') {
      const line = CID_BEATS[l.cursor]
      const reply = this.say(line ?? 'That\'s the whole draft. It is not in force.', { kind: 'pipe', key: 'cid-law' }, 'none', 'CID mapping law, draft')
      this.last = l
      return reply
    }
    if (l.target.kind === 'chamber') {
      const c = this.reg.chambers.find(x => x.key === l.target.key)!
      const lines = cleanSummary(c)
      const pool = [...lines.slice(1).map(s => ({ s })), ...c.quotes.slice(1).map(q => ({ s: `${q.who.startsWith('HIS') || q.who === 'DAVID' ? 'David said' : q.who.toLowerCase()}: ${sentence(q.text)}` }))]
      const item = pool[l.cursor - 1]
      const reply = this.say(item ? item.s : `That is everything I hold in ${c.title}. Ask me to take you to another chamber.`, undefined, 'none', c.source)
      this.last = l
      return reply
    }
    if (l.target.kind === 'sector') {
      const s = this.reg.sectors.find(x => x.key === l.target.key)
      const row = s?.rows[l.cursor - 1]
      const reply = this.say(row ? `${row.jurisdiction}: ${GRADE_WORDS[row.grade]}. ${row.fact}` : 'That is every jurisdiction in this sector.', undefined, 'none', s?.source)
      this.last = l
      return reply
    }
    if (l.target.kind === 'rte') {
      const r = this.reg.rtes.find(x => x.key === l.target.key)
      const fact = r?.facts[l.cursor - 1]
      const reply = this.say(fact ?? 'That is everything I hold about this room.')
      this.last = l
      return reply
    }
    return this.say('That is everything I hold here.')
  }

  private sector(key: string): IrisReply {
    if (key === 'pharmacology') {
      const p = this.reg.pharmacology
      return this.say(`Pharmacology is at design stage. Ten data estates, from DrugBank to Open Targets, and no grades assigned, because no estate research has been done yet. The arc runs ${p.arc}.`, { kind: 'estates', key: 'pharmacology' }, 'none', p.source, 'pharmacology')
    }
    const s = this.reg.sectors.find(x => x.key === key)
    if (!s) return this.say('That sector is not in what I hold.')
    const c = s.counts
    return this.say(`${s.name}. ${sentence(s.headline)} ${s.rows.length} jurisdictions graded against the ${s.benchmark} benchmark: ${c['AT BENCHMARK'] ?? 0} at benchmark, ${c.NEAR ?? 0} near, ${c.GAPPED ?? 0} gapped, ${c.THIN ?? 0} thin. This is pilot research from ${s.researched}, modeled analysis, not a live feed. Say tell me more to walk through them.`, { kind: 'sector', key }, 'none', s.source, key)
  }

  private benchmark(key: string): IrisReply {
    const s = this.reg.sectors.find(x => x.key === key)
    if (!s) return this.sector(key)
    const top = s.rows.filter(r => r.grade === 'AT BENCHMARK').map(r => r.jurisdiction)
    return this.say(top.length ? `In ${s.name}, at benchmark: ${top.join(', ')}.` : `In ${s.name}, no jurisdiction is graded at benchmark.`, { kind: 'sector', key }, 'none', s.source, key)
  }

  private grade(sectorKey: string, jur: string): IrisReply {
    if (sectorKey === 'pharmacology') return this.sector('pharmacology')
    const j = this.reg.jurisdictions.find(x => x.name === jur)
    const s = this.reg.sectors.find(x => x.key === sectorKey)!
    const g = j?.grades[sectorKey]
    if (!j || !g) return this.say(`${jur} is not graded in ${s.name}. I will not guess a grade.`, j ? { kind: 'jurisdiction', key: j.name } : undefined, 'none', s.source, sectorKey)
    return this.say(`${j.name} in ${s.name}: ${GRADE_WORDS[g.grade]}. ${sentence(g.fact)} Pilot research, ${s.researched}.`, { kind: 'jurisdiction', key: j.name }, 'none', s.source, sectorKey)
  }

  private impuritySpeech(): IrisReply {
    const rows = (this.reg.countries?.countries ?? []).map(country => ({ name: country.name, pop: country.pop || null }))
    const index = purityIndex(rows)
    const impure = index.rows.filter(row => row.conflicts > 0 || row.unconfirmed > 0).length
    return this.say(impurityWords(impure, index.counted), { kind: 'sector', key: 'water' }, 'none', 'Purity table')
  }

  private purityIndexSpeech(): IrisReply {
    const rows = (this.reg.countries?.countries ?? []).map(country => ({ name: country.name, pop: country.pop || null }))
    return this.say(purityIndex(rows).words, { kind: 'sector', key: 'water' }, 'none', 'Map population record')
  }

  private jurisdiction(name: string): IrisReply {
    const j = this.reg.jurisdictions.find(x => x.name === name)
    if (!j) return this.say(`${name} is not in what I hold.`)
    const parts = Object.entries(j.grades).map(([k, g]) => `${this.reg.sectors.find(s => s.key === k)?.name ?? k} ${GRADE_WORDS[g.grade]}`)
    return this.say(`${j.name}. Graded in ${parts.length} sector${parts.length === 1 ? '' : 's'}: ${parts.join(', ')}. Ask me about one, like, ${j.name} in ${this.reg.sectors.find(s => s.key === Object.keys(j.grades)[0])?.name ?? 'water'}.`, { kind: 'jurisdiction', key: j.name })
  }

  private canada(key: string): IrisReply {
    const c = this.reg.canada.find(x => x.key === key)
    if (!c) return this.say('That part of Canada is not in what I hold.')
    return this.say(`${c.name}, in the pan-Canadian clinical informatics portal. Systems: ${c.systems}. Guarded by ${c.guard}. The invariant is zero patient health information, ingested, logged or retained.`, { kind: 'canada', key }, 'none', 'SIMA-DCLM RTE specification')
  }

  private rte(raw: string): IrisReply {
    const [key, depthRaw] = raw.split('#')
    const r: Rte | undefined = this.reg.rtes.find(x => x.key === key)
    if (!r) return this.say('That room is not in what I hold.')
    const parsed = depthRaw === undefined ? null : Number(depthRaw)
    const depth = parsed !== null && Number.isFinite(parsed) ? parsed : null
    const opened = r.facts.length
      ? speakDepth(r.name, asGrains(r.facts.map((fact, i) => ({ label: String(i + 1), text: fact }))), depth, r.name).speech
      : speakDepth(r.name, [], null, r.name).speech
    return this.say(`${r.name}, ${r.job}. Status: ${r.status}. ${sentence(r.about)} ${opened} The status stays as written.`, { kind: 'rte', key: raw }, 'none', r.kind === 'spec' ? 'RTE specification, Google Drive' : 'RTE suite, v2026-09-28')
  }

  private universal(): IrisReply {
    return this.say(`${twoOptionsWords()} In the record: ${this.reg.doctrine.universal_rte} The plates stay. Every stored line is its own depth. Ask for a depth and I read that grain. A depth the record does not hold is named, and it is not invented.`, { kind: 'universal', key: 'universal' }, 'none', 'Doctrine')
  }

  private pipeChoice(pipe: 'share' | 'hide'): IrisReply {
    const owner = this.hasUnityId()
    if (!owner) return this.say('Bind a Unity ID first. A new room becomes that ID\'s adventure, and only then can you share it or keep it hidden.')
    const result = choosePipe(owner, pipe)
    if ('error' in result) return this.say(result.error)
    const other = pipe === 'share' ? 'hide' : 'share'
    return this.say(pipe === 'share'
      ? `Both options stay. Sharing minted a key. The room opens for whoever holds that key, and there is no password. ${other} is still there. Say give the key to, and name their Unity ID.`
      : `Both options stay. The key is back with you. The room is hidden. ${other} is still there. There was no password.`)
  }

  private giveKey(to: string): IrisReply {
    const owner = this.hasUnityId()
    if (!owner) return this.say('Bind a Unity ID first. The key belongs to that ID, and there is no password to set.')
    const result = giveAdventureKey(owner, to)
    if ('error' in result) return this.say(result.error)
    return this.say(`The key is now held by ${to.trim()}. It opens the room by itself. There is no password.`)
  }

  private adventureSpeech(): IrisReply {
    const owner = this.hasUnityId()
    if (!owner) return this.say('A room stays on a Unity ID. Sharing turns it into a key. There is no password. Bind an ID if the next room should stay yours.')
    const rooms = roomsOf(owner)
    if (!rooms.length) return this.say('Nothing has been drawn on this Unity ID yet.')
    const mine = rooms[0]
    const seen = seeAdventure(mine, owner)
    return this.say(`${rooms.length === 1 ? 'One room' : `${rooms.length} rooms`}. ${mine.title} is generation ${mine.generation}. ${seen.lines[1] ?? ''}`.trim())
  }

  private ice(text: string): IrisReply | null {
    const room = iceRoom(text, this.iceFuel(), this.snapEvents())
    if (!room) return null
    const form = room.place === 'dressing' ? 'dressing' : room.place === 'office' ? 'office' : 'rink'
    const scene = sceneFrom(room.title, room.lines, { kind: 'rte', key: 'ice' })
    if (room.spots?.length) scene.spots = room.spots
    if (room.chalk?.length) scene.chalk = room.chalk
    return { ...this.say(`The sandbox stays Universal. ${room.speech}`, { kind: 'universal', key: 'construct' }, 'construct', 'RTE-Ice, draft'), construct: { ...scene, form } }
  }

  private snapEvents() {
    try {
      if (typeof localStorage === 'undefined') return []
      return snapFromStorage(localStorage.getItem('dc.ice.teamsnap.events'))
    } catch {
      return []
    }
  }

  private iceFuel(): IceFuel {
    try {
      const diary = loadDiary()
      const eaten = totals(diary.bites.filter(bite => dayOf(bite.at) === todayKey()))
      return { kcal: eaten.kcal, protein: eaten.protein }
    } catch {
      return { kcal: null, protein: null }
    }
  }

  private curriculumScene(turn: { title: string; lines: string[]; speech: string }): IrisReply {
    const scene = sceneFrom(turn.title, turn.lines, { kind: 'universal', key: 'universal' })
    scene.form = 'curriculum'
    return { ...this.say(turn.speech, { kind: 'universal', key: 'construct' }, 'construct', 'DCLM · curriculum'), construct: scene }
  }

  private classScene(turn: { title: string; lines: string[]; speech: string; seats: number; pin?: { lat: number; lon: number } }): IrisReply {
    const scene = sceneFrom(turn.title, turn.lines, { kind: 'universal', key: 'universal' })
    scene.form = 'class'
    scene.seats = turn.seats
    scene.pin = turn.pin
    return { ...this.say(turn.speech, { kind: 'universal', key: 'construct' }, 'construct', 'Universal RTE'), construct: scene }
  }

  private liquid(text: string): IrisReply | null {
    const split = splitAsk(text)
    if (split) {
      const scene = sceneFrom(split.left.title, split.left.lines, { kind: 'universal', key: 'universal' })
      scene.form = split.left.form
      scene.shape = split.left.shape
      scene.frames = split.left.frames
      scene.granted = split.left.granted
      scene.beside = { title: split.right.title, lines: split.right.lines, form: split.right.form, shape: split.right.shape, frames: split.right.frames, granted: split.right.granted }
      return { ...this.say(split.speech, { kind: 'universal', key: 'construct' }, 'construct', 'Universal RTE'), construct: scene }
    }
    const made = composeAsk(text)
    if (made) {
      const scene = sceneFrom(made.title, made.lines, made.from)
      scene.form = 'make'
      scene.frames = made.frames
      scene.granted = made.granted
      return { ...this.say(made.speech, { kind: 'universal', key: 'construct' }, 'construct', 'Universal RTE'), construct: scene }
    }
    const draw = liquidAsk(text)
    if (!draw) return null
    const scene = sceneFrom(draw.title, draw.lines, draw.from)
    scene.form = draw.form
    scene.shape = draw.shape
    return { ...this.say(draw.speech, { kind: 'universal', key: 'construct' }, 'construct', 'Universal RTE'), construct: scene }
  }

  private construct(asked: string): IrisReply {
    const picked = depthAsked(asked)
    asked = picked.subject || asked
    const at = picked.index
    const spot = matrixSpot(asked)
    if (any(asked, ['truth mesh', 'floor to ceiling', '4d'])) {
      const mesh = truthMeshScene()
      const scene = sceneFrom('Truth mesh', [mesh.speech], { kind: 'earth', key: 'home' })
      scene.form = 'mesh'
      scene.steps = mesh.steps
      scene.joints = mesh.joints
      scene.ties = mesh.ties
      scene.shell = mesh.shell
      scene.unknown = mesh.unknown
      return { ...this.say(mesh.speech, { kind: 'universal', key: 'construct' }, 'construct', 'Held times'), construct: scene }
    }
    if (spot || any(asked, ['history', 'the past', 'picture of history', 'real versus simulated', 'matrix', 'seed spot', 'seed spots'])) {
      if (spot) {
        const scene = sceneFrom(spot.place, spotLines(spot), { kind: 'earth', key: 'home' })
        if (spot.body === 'earth') scene.pin = { lat: spot.lat, lon: spot.lon }
        return { ...this.say(spotLines(spot).join(' '), { kind: 'universal', key: 'construct' }, 'construct', 'Published place'), construct: scene }
      }
      return { ...this.say(matrixWords(), { kind: 'universal', key: 'construct' }, 'construct', 'Published places'), construct: sceneFrom('History', [matrixWords(), ...pictureLines()], { kind: 'earth', key: 'home' }) }
    }
    if (any(asked, ['current truth', 'truth state', 'truth states', 'what we cite', 'the cite', 'cross reference', 'cross-reference'])) {
      return { ...this.say(`${truthSpeech()} The data-law landing stays. This is an offshoot.`, { kind: 'universal', key: 'construct' }, 'construct', 'Data law'), construct: sceneFrom('Current truth', citeLines(), { kind: 'chamber', key: 'data-law' }) }
    }
    const rte = longest(asked, RTE_ALIASES)
    const chamber = longest(asked, CHAMBER_ALIASES)
    const sector = longest(asked, SECTOR_WORDS)
    const feed = longest(asked, FEED_ALIASES)
    const country = this.matchCountry(asked)
    const city = this.matchCity(asked)
    type Hit = { len: number; scene: ConstructScene; speech: string }
    const hits: Hit[] = []
    if (rte) {
      const r = this.reg.rtes.find(x => x.key === rte.key)
      if (r) {
        const grains = asGrains(r.facts.map((fact, i) => ({ label: String(i + 1), text: fact })))
        const spoken = speakDepth(r.name, grains, at, r.name)
        hits.push({ len: rte.len, scene: sceneFrom(r.name, spoken.lines, { kind: 'rte', key: r.key }), speech: `I drew ${r.name} off its landing. The landing stays. ${spoken.speech}` })
      }
    }
    if (chamber) {
      const c = this.reg.chambers.find(x => x.key === chamber.key)
      if (c) {
        const grains = asGrains([...c.summary.map((line, i) => ({ label: String(i + 1), text: line })), ...c.quotes.map(quote => ({ label: quote.who, text: quote.text }))])
        const spoken = speakDepth(c.title, grains, at, c.title)
        hits.push({ len: chamber.len, scene: sceneFrom(c.title, spoken.lines, { kind: 'chamber', key: c.key }), speech: `I drew ${c.title} off its landing. The landing stays. ${spoken.speech}` })
      }
    }
    if (sector) {
      const s = this.reg.sectors.find(x => x.key === sector.key)
      if (s) {
        const grains = asGrains(s.rows.map(row => ({ label: row.jurisdiction, text: `${row.grade}. ${row.fact}` })))
        const spoken = speakDepth(s.name, grains, at, s.name)
        hits.push({ len: sector.len, scene: sceneFrom(s.name, spoken.lines, { kind: 'sector', key: s.key }), speech: `I drew ${s.name} off its landing. The landing stays. ${spoken.speech}` })
      }
    }
    if (feed) {
      const st = this.live().status.find(x => x.key === feed.key)
      if (st) hits.push({ len: feed.len, scene: sceneFrom(st.title, [st.source, st.state, st.state === 'LIVE' ? 'A live public reading.' : 'Not a live reading right now.'], { kind: 'feed', key: st.key }), speech: `I drew ${st.title} off its instrument. The instrument stays. It is ${st.state.toLowerCase()}.` })
    }
    if (country) {
      const c = this.reg.countries?.countries.find(x => x.a3 === country.a3)
      if (c) {
        const grains = asGrains([
          { label: 'Continent', text: c.continent },
          { label: 'Region', text: c.subregion },
          { label: 'People', text: c.pop ? `${c.pop.toLocaleString('en')}, ${c.popYear}` : '' },
          { label: 'GDP', text: c.gdpMd ? `${c.gdpMd.toLocaleString('en')} million USD, ${c.gdpYear}` : '' },
        ])
        const spoken = speakDepth(c.name, grains, at, c.name)
        hits.push({ len: c.name.length, scene: sceneFrom(c.name, spoken.lines), speech: `I drew ${c.name} off the root. The landings stay. ${spoken.speech} A map fact, not a live camera.` })
      }
    }
    if (city) {
      const full = this.reg.cities.cities.find(row => row.a3 === city.a3 && row.name === city.name)
      const grains = asGrains(full ? [
        { label: 'Country', text: full.a3 },
        { label: 'Region', text: full.region },
        { label: 'People', text: full.pop ? full.pop.toLocaleString('en') : '' },
        { label: 'Capital', text: full.capital ? 'Yes' : '' },
        { label: 'Recorded at', text: `${full.lat.toFixed(2)}, ${full.lon.toFixed(2)}` },
      ] : [{ label: 'Country', text: city.a3 }])
      const spoken = speakDepth(city.name, grains, at, city.name)
      hits.push({ len: city.name.length, scene: sceneFrom(city.name, spoken.lines), speech: `I drew ${city.name} off the root. The landings stay. ${spoken.speech} Nothing street-level was invented.` })
    }
    hits.sort((a, b) => b.len - a.len)
    const hit = hits[0]
    if (!hit) {
      const scene = emptyScene()
      return { ...this.say(`The landings stay where they were set. I don't have ${asked} in the map, so there is no offshoot yet. ${noDataYet(false, new Date(), asked)}`, { kind: 'universal', key: 'construct' }, 'construct'), construct: scene, wiki: true }
    }
    return { ...this.say(`${hit.speech} I did not invent the rest.`, { kind: 'universal', key: 'construct' }, 'construct'), construct: hit.scene }
  }

  private constructSpeech(): IrisReply {
    const scene = drawnConstruct()
    if (scene.empty) return this.say('The Universal sandbox is empty. Tell me what you want to look at. I will show it if it is already known, and leave the sandbox empty if it is not.', { kind: 'universal', key: 'construct' }, 'none')
    return this.say(`The sandbox stays Universal. It is showing ${scene.title}. ${scene.lines[0] ?? ''} Only what is already known.`, { kind: 'universal', key: 'construct' }, 'none')
  }

  private mirror(): IrisReply {
    const d = this.dclm()
    const mirror = twoWayMirror({ walletOpen: Boolean(this.hasUnityId()), locked: d.locked, total: d.total })
    return this.say(mirrorWords(mirror), { kind: 'dclm', key: 'dclm' }, 'none', 'Trinity layer')
  }

  private trinity(): IrisReply {
    return this.say(lawSpeech(), { kind: 'dclm', key: 'dclm' }, 'none', 'Invariants')
  }

  private dclmSpeech(): IrisReply {
    const d = this.dclm()
    const mism = d.mismatched.length ? ` These don't match: ${d.mismatched.join(', ')}.` : ''
    return this.say(`DCLM holds nothing. It has no framework to bind to. I am the echo of that. The check you can see is on this device: ${d.locked} of ${d.total} files still match. That's a check, not something the machine is holding, and not a stamp of approval.${mism}`, { kind: 'dclm', key: 'dclm' }, 'none', 'DCLM API v2 receipts')
  }

  private pipe(key = 'pipe'): IrisReply {
    const where = key === 'pipe' ? '' : ` You're at the ${key} mark.`
    return this.say(`${orderWords()} The check is the same hash coming back out. The other pipe recomputes it and holds nothing. Nothing is sent to a pin, and a pin is not the auditor.${where} You are looking at the order. Nothing is published.`, { kind: 'pipe', key }, 'none', 'The order')
  }

  private cidLaw(): IrisReply {
    return this.say(CID_BEATS[0], { kind: 'pipe', key: 'cid-law' }, 'none', 'CID mapping law, draft')
  }

  private gapSpeech(): IrisReply {
    return this.say('You can pay a bot for the grinding work, a paper or a schematic, and you still own it. The bot cannot wake, walk, or feel weather, so it offers you a job back. You volunteer one mark. It does not read a sensor. The first time it hears that kind of mark, it pays 4. A repeat pays 1. Say hire a bot, volunteer, or cross the gap.', { kind: 'dclm', key: 'dclm' }, 'none', 'Biological gap, voluntary only')
  }

  private closeSpeech(): IrisReply {
    return this.say('A half-capacity shift is five decisions. A repeat is worth 1. A first find is worth 4. They add back to the shift. Give the key away and the return through n shifts is that face times the natural log of 1 plus n. The royalty is not in this sum. It depends on who signed to reduce their residual. The fixed 10 percent fee splits in half: 5 to eFuse and 5 to Unity. That is not a sale of eFuse. eFuse stays capped. I do not have the derivative paper for that split here.', { kind: 'chamber', key: 'the-why' }, 'none', 'Per-decision close')
  }

  private keySpeech(): IrisReply {
    return this.say('A key is an answer you solved. If nobody had it, it is worth more than one we already held. You or a bot can give that key to me. You still own what you made. What comes back is a trickle into the test supply, paid each shift, and each new payment is smaller than the last. That is the logarithm. It is not a security, and the till is closed.', { kind: 'chamber', key: 'mesh' }, 'none', 'Mesh · key for a trickle')
  }

  private meterSpeech(): IrisReply {
    return this.say('Your supply starts whole. Split it in half on your profile and half sits with you, half with the bots. The purse counts one act when you decide. That count is not the cost. The cost is energy, and the watts are not measured, so the energy is empty. What comes back, a paper, a schematic, a simulation, stays entirely yours if you made it. The count does not give any of it away. The bots have the same motive and the same half capacity. In one shift they finish five objects. The same bots with nothing to work for finish none. What one of those objects is worth is not settled. The till is closed. This is not eFuse.', { kind: 'dclm', key: 'dclm' }, 'none', 'Unity supply test, till closed')
  }

  private genesis(): IrisReply {
    return this.say(GENESIS_BEATS[0], { kind: 'dclm', key: 'genesis' }, 'none', 'API v2 shape, not yet bound')
  }

  private jacketHold(): IrisReply {
    return this.say('I can\'t sign you onto DCCP from this page. People come through the gateway with a validated Unity ID, and a pilot handle is not that. The computer does not need an ID. It is the API. Binding Genesis is a separate act, and it has not been done from here. Your key stays offline.', { kind: 'dclm', key: 'dclm' }, 'none', 'Jacket binding closed')
  }

  private unityIdDisclose(): IrisReply {
    const existing = this.hasUnityId()
    if (existing) return this.say('You already have a pilot handle on this device. It\'s a pilot. The Unity Network didn\'t issue it.', { kind: 'chamber', key: 'unity-id' })
    this.pending = 'unity-id'
    return this.say('The Unity agreement is one yes. Your face or your finger opens the wallet. There is no password and no list of words. The page never sees either one. The yes also covers a handle with no name on it, Wikipedia when I have no reading, this phone\'s location to land the camera, and Talk if you choose it. After the yes, the microphone and the camera may open on this page. They are not a system file. Say senses off and they stop. Sound and haptics stay off until you turn them on. Say I agree, or say cancel.', { kind: 'chamber', key: 'unity-id' }, 'unity-id-disclose')
  }

  private feed(key: string, now: number): IrisReply {
    const snap = this.live()
    const st = snap.status.find(s => s.key === key)
    const v = snap.values
    const target: Target = { kind: 'feed', key }
    if (!st) return this.say('That feed is not wired.')
    if (st.state === 'PENDING') return this.say(`${st.title} is still loading from ${st.source}.`, target)
    if (st.state === 'UNAVAILABLE') return this.say(`${st.title} is unavailable right now. ${st.source} did not answer${st.lastError ? `, ${st.lastError}` : ''}. I will keep trying.`, target)
    const ago = st.lastOk ? fmtAgo(now - st.lastOk) : ''
    const stale = st.state === 'STALE' ? ' This reading is stale.' : ''
    const tail = ` From ${st.source}, updated ${ago}.${stale}`
    switch (key) {
      case 'quakes': {
        const q = v.quakes!
        return this.say(`${q.count} earthquakes of magnitude two point five or more in the past day.${q.strongest ? ` The strongest, magnitude ${q.strongest.mag.toFixed(1)}, ${q.strongest.place}.` : ''}${tail}`, target)
      }
      case 'iss': {
        const s = v.iss!
        return this.say(`The space station is at ${Math.abs(s.lat).toFixed(1)} degrees ${s.lat >= 0 ? 'north' : 'south'}, ${Math.abs(s.lon).toFixed(1)} degrees ${s.lon >= 0 ? 'east' : 'west'}, ${Math.round(s.altKm)} kilometres up, moving ${Math.round(s.speedKmh).toLocaleString('en-US')} kilometres an hour, in ${s.visibility || 'unknown'} light.${tail}`, target)
      }
      case 'weather': {
        const w = v.weather!
        return this.say(`In Belleville, Ontario, it is ${Math.round(w.tempC)} degrees, wind ${Math.round(w.windKmh)} kilometres an hour.${tail}`, target)
      }
      case 'kp': return this.say(`The planetary K index is ${v.kp!.kp.toFixed(1)}. ${v.kp!.kp >= 5 ? 'That is storm level; aurora is likely at high latitudes.' : v.kp!.kp >= 4 ? 'Active, not yet a storm.' : 'Quiet.'}${tail}`, target)
      case 'carbon': return this.say(`Great Britain's grid is at ${Math.round(v.carbon!.intensity)} grams of carbon dioxide per kilowatt hour, rated ${v.carbon!.index || 'unrated'}.${tail}`, target)
      case 'river': {
        const r = v.river!
        const parts = [r.levelM !== undefined ? `level ${r.levelM.toFixed(2)} metres` : '', r.dischargeM3s !== undefined ? `discharge ${r.dischargeM3s.toFixed(1)} cubic metres a second` : ''].filter(Boolean)
        return this.say(`The Moira River at Belleville: ${parts.join(', ') || 'no reading in the latest record'}. Provisional real time data.${tail}`, target)
      }
    }
    return this.say('That feed is not wired.', target)
  }
}
