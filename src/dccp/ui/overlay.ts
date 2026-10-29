import { mountGeodesic, type GeoHandle } from './geodesic'
export type EntryMode = 'talk' | 'listen' | 'read'
export interface Toggles { sound: boolean; haptics: boolean; reducedMotion: boolean; transcript: boolean }
export interface AtlasItem { id: string; group: string; label: string }

const ICONS: Record<string, string> = {
  mic: '<path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  sound: '<path d="M4 10v4h4l5 4V6L8 10H4Z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>',
  haptics: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M3 8v8M21 8v8"/>',
  motion: '<circle cx="12" cy="12" r="3"/><path d="M3 12h3M18 12h3M12 3v3M12 18v3"/>',
  transcript: '<path d="M4 5h16v11H8l-4 4V5Z"/><path d="M8 9h8M8 12h5"/>',
  atlas: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  home: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/>',
  here: '<circle cx="12" cy="10" r="3"/><path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z"/>',
  profile: '<path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"/><path d="M4 20a8 8 0 0 1 16 0"/>',
  wallet: '<rect x="2.5" y="6" width="19" height="13" rx="2"/><path d="M2.5 10h19"/><circle cx="16.5" cy="14.5" r="1.1"/>',
  system: '<circle cx="12" cy="12" r="2.2"/><ellipse cx="12" cy="12" rx="9" ry="4"/><circle cx="21" cy="12" r="1.2"/>',
  resources: '<path d="M3 7 12 3l9 4-9 4L3 7Z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/>',
  watch: '<path d="M3 15a9 9 0 1 1 15-7"/><circle cx="18.5" cy="7.5" r="1.6"/>',
  nutrition: '<path d="M12 3c2.2 2.4 3 4.2 2 6.5"/><path d="M8 8h8l-1 2a4 4 0 0 1-6 0L8 8Z"/><path d="M9 14h6v1.5a3 3 0 0 1-6 0V14Z"/>',
}
const svg = (k: string): string => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[k]}</svg>`

export class Overlay {
  readonly root: HTMLElement
  onEnter: ((mode: EntryMode) => void) | null = null
  onSpeak: (() => void) | null = null
  onToggle: ((key: keyof Toggles | 'mic', value: boolean) => void) | null = null
  onAtlas: ((id: string) => void) | null = null
  onHome: (() => void) | null = null
  onAsk: ((text: string) => void) | null = null
  onUnityId: ((action: 'create' | 'forget') => void) | null = null
  onLook: (() => void) | null = null
  onBind: (() => void) | null = null
  onLand: (() => void) | null = null
  onSystem: (() => void) | null = null
  onSky: ((days: number) => void) | null = null
  onBody: ((name: string) => void) | null = null
  onResources: (() => void) | null = null
  onWatch: (() => void) | null = null
  onNutrition: ((action: string, id?: string) => void) | null = null
  onFace: ((action: string) => void) | null = null
  onPeople: ((handle: string) => void) | null = null
  onRooms: (() => void) | null = null
  onEconomy: ((action: 'split' | 'shift' | 'trade' | 'hire' | 'body' | 'cross' | 'sign-bots' | 'release-bots' | 'derive') => void) | null = null
  onUnity: ((action: 'fund' | 'send' | 'withdraw', to: string, amount: number) => void) | null = null
  onSeed: (() => void) | null = null
  onHideBand: (() => void) | null = null
  onLedger: ((face: 'white' | 'dark', text: string) => void) | null = null
  onFatherChallenge: (() => void) | null = null
  onFatherCheck: ((publicPem: string, signature: string) => void) | null = null
  onSeat: ((kind: string, consent: boolean, mark: string) => void) | null = null
  onToddler: ((thing: string, consent: boolean) => void) | null = null
  onAdventure: ((pipe: 'share' | 'hide') => void) | null = null
  private live: HTMLElement
  private gate: HTMLElement | null
  private dock: HTMLElement
  private atlas: HTMLElement
  private resources: HTMLElement
  private watch: HTMLElement
  private nutrition: HTMLElement
  private face: HTMLElement
  private transcript: HTMLElement
  private profile: HTMLElement
  private wallet: HTMLElement
  private log: HTMLElement
  private chip: HTMLElement
  private geo: GeoHandle | null = null

  constructor(host: HTMLElement, private toggles: Toggles, _speechAvailable: boolean) {
    this.root = host
    host.innerHTML = `
      <p class="pass-frame" hidden></p>
      <p class="abstract-line" hidden></p>
      <nav class="dock depth-near" aria-label="World controls" hidden>
        <div class="geo-stage" tabindex="0"></div>
        <p class="geo-read"></p>
        <p class="logic-layer" hidden></p>
        <p class="purity-line" hidden></p>
      </nav>
      <section class="system-bar" hidden>
        <div class="system-bodies"></div>
        <p class="system-hint">Tap a planet to warp. Scroll to move closer. Space cuts the jump. The Galactic index is the Messier landings.</p>
        <button type="button" data-index="messier" aria-expanded="false">Galactic index</button>
        <div class="messier-index" hidden></div>
        <div class="system-steps">
          <button type="button" data-sky="-365">−1 year</button>
          <button type="button" data-sky="-1">−1 day</button>
          <button type="button" data-sky="0">Now</button>
          <button type="button" data-sky="1">+1 day</button>
        </div>
        <p class="system-read"></p>
      </section>
      <div class="warp-banner" hidden><small>WARPSPEED</small><strong></strong></div>
      <button class="chip" hidden></button>
      <section class="panel depth-mid resources" aria-label="Resources" hidden>
        <header><h2>Resources</h2><button class="close" aria-label="Close resources">×</button></header>
        <p class="hint">A live reading where a public feed has one, and the latest year a publisher printed where it does not. Each offer sits next to a need. That is the match. Nothing is bought, shipped, or escrowed.</p>
        <button type="button" class="res-refresh">Read again</button>
        <div class="res-body"><p class="note">Not read yet.</p></div>
      </section>
      <section class="panel depth-mid watch" aria-label="Close approaches" hidden>
        <header><h2>Watch</h2><button class="close" aria-label="Close watch">×</button></header>
        <p class="hint">Six seats are too many. Four do the loop: gather, calculate, analyze, recalculate. They read NASA/JPL close approaches while this page is open, then they stop. A debris belt is real only because an office already named it. The object count of those belts is not in this feed.</p>
        <button type="button" class="res-refresh watch-refresh">Read JPL again</button>
        <div class="watch-body"><p class="note">Not read yet.</p></div>
      </section>
      <section class="panel depth-mid nutrition" aria-label="Nutrition" hidden>
        <header><h2>Nutrition</h2><button class="close" aria-label="Close nutrition">×</button></header>
        <p class="hint">A diary, in the shape of a calorie tracker. Names match an index. The camera does not name a plate. It runs only while this room is open and you leave it granted. Closing the room stops it. This page cannot watch the kitchen after you leave.</p>
        <div class="nut-sense">
          <video class="nut-video" playsinline muted autoplay hidden></video>
          <div class="nut-sense-row">
            <button type="button" data-nut="camera">Grant the camera</button>
            <button type="button" data-nut="say">Say a food</button>
          </div>
          <p class="nut-sense-note">Microphone words go to this browser's speech service, the same as Talk. The audio is not stored.</p>
          <figure class="sense-floor">
            <svg viewBox="0 0 64 88" aria-hidden="true">
              <polygon points="32,4 60,32 32,60 4,32" />
              <text x="32" y="36">0</text>
              <circle cx="32" cy="74" r="3" />
              <text x="32" y="86">−1</text>
            </svg>
            <figcaption>Floor 0. Nothing felt sits here. The seed sits at −1, under the floor. It is not a line of the root.</figcaption>
          </figure>
          <button type="button" data-nut="kitchen">Watch the empty kitchen</button>
          <p class="kit-read">Off. Motion is the only reading. An occupied frame is dropped, and a picture is not stored.</p>
        </div>
        <div class="nut-controls">
          <label>Goal <input class="nut-goal-input" inputmode="numeric" value="2000" aria-label="Calorie goal"></label>
          <div class="nut-meals">
            <button type="button" data-nut="meal" data-id="breakfast" aria-pressed="true">breakfast</button>
            <button type="button" data-nut="meal" data-id="lunch" aria-pressed="false">lunch</button>
            <button type="button" data-nut="meal" data-id="dinner" aria-pressed="false">dinner</button>
            <button type="button" data-nut="meal" data-id="snack" aria-pressed="false">snack</button>
          </div>
          <label class="nut-find">Find a food<input class="nut-q" placeholder="apple, rice, eggs" aria-label="Find a food"></label>
        </div>
        <div class="nut-body"><p class="note">Not opened.</p></div>
      </section>
      <section class="panel depth-mid face" aria-label="Face pan" hidden>
        <header><h2>Face</h2><button class="close" aria-label="Close face pan">×</button></header>
        <p class="hint">Not a KYC company. No passport is read. You look straight, turn left, turn right, then tilt up. If this browser can see a face box, the box has to move. A coarse sample is sealed in the dark ledger on this device. Iris cannot read it. Nothing is uploaded. The picture is not kept.</p>
        <video class="face-video" playsinline muted autoplay hidden></video>
        <p class="face-step">The camera is off.</p>
        <div class="nut-sense-row">
          <button type="button" data-face="camera">Grant the camera</button>
          <button type="button" data-face="start">Start the pan</button>
          <button type="button" data-face="held">I held it</button>
        </div>
        <p class="face-note">A resemblance, if one is found, is only against a sitting already sealed here.</p>
        <figure class="sense-floor">
          <svg viewBox="0 0 64 88" aria-hidden="true">
            <polygon points="32,4 60,32 32,60 4,32" />
            <text x="32" y="36">0</text>
            <circle cx="32" cy="74" r="3" />
            <text x="32" y="86">−1</text>
          </svg>
          <figcaption>Floor 0. Nothing felt sits here. The seed sits at −1, under the floor. It is not a line of the root.</figcaption>
        </figure>
      </section>
      <section class="panel depth-mid atlas" aria-label="Atlas" hidden>
        <header><h2>Atlas</h2><button class="close" aria-label="Close atlas">×</button></header>
        <p class="hint">Every place in the world. Choose one to fly there and hear Iris. Keys: arrows orbit, + and − zoom, N and P step through places, Space pauses a flight, H goes home.</p>
        <div class="atlas-list"></div>
        <div class="unity-id"></div>
      </section>
      <section class="panel depth-mid profile" aria-label="Profile" hidden>
        <header><h2>Profile <span class="wallet-mark" title="Unity wallet">${svg('wallet')}</span></h2><button class="close" aria-label="Close profile">×</button></header>
        <div class="wallet"></div>
        <form class="unity-pay">
          <h3>Unity wallet</h3>
          <p class="bio">No words to remember. No password. Your face or your finger. The page never sees either one. The phone does.</p>
          <p class="note">Merit only. Test units. Not a dollar. The till is closed. eFuse does not move. Unity is the seat. The swarm pool cannot be sent. A move is refused if a ring does not close.</p>
          <p class="receive note">Nothing to receive until your face or your finger opens it.</p>
          <img class="unity-qr" alt="" hidden />
          <p class="unity-balance note"></p>
          <button type="button" data-fund>Move units in</button>
          <button type="button" data-withdraw>Move units out</button>
          <input name="to" placeholder="Send to a handle" autocomplete="off" />
          <input name="amount" type="number" min="1" step="1" placeholder="How many" />
          <button type="submit">Send</button>
          <button type="button" data-scan>Read a QR</button>
          <input class="unity-file" type="file" accept="image/*" capture="environment" hidden />
          <p class="unity-result note"></p>
          <ol class="unity-log"></ol>
          <h3>Seedbot</h3>
          <p class="note">It compiles the four layers while this page is open. It does not read the phone, and it does not spend.</p>
          <button type="button" data-seed>Compile everything</button>
          <ol class="seed-log"></ol>
        </form>
        <button type="button" class="face-open" data-face="open">Face pan, sealed in the dark ledger</button>
        <form class="people">
          <h3>People</h3>
          <p class="note">A contact is a handle. The figure is a placeholder, not a photograph and not a 3D person. A sealed face pan is not copied into the book.</p>
          <input name="handle" placeholder="Unity handle" autocomplete="off" />
          <button type="submit">Add to the book</button>
          <div class="people-body"></div>
        </form>
        <form class="rooms">
          <h3>Draft rooms</h3>
          <p class="note">A bot drafts a room only when two series on this device move together. Drafts that share a source are meshed. A share stays on this device, and only if a Unity ID is bound.</p>
          <button type="button" data-rooms="draft">Draft from this device</button>
          <div class="rooms-body"><p class="note">Not drafted.</p></div>
        </form>
        <form class="rollout">
          <h3>What will not roll out</h3>
          <div class="rollout-body"></div>
        </form>
        <form class="ledger">
          <h3>Ledger</h3>
          <p class="note">White can be quoted. Dark is sealed on this device and is not read aloud. A private key is refused. Nothing is sent.</p>
          <textarea name="doc" maxlength="8000" placeholder="A document for Iris"></textarea>
          <button type="submit" data-face="white">Take it in white</button>
          <button type="submit" data-face="dark">Take it in dark</button>
          <div class="ledger-list"></div>
          <p class="totality note">Totality is not audited yet.</p>
        </form>
        <form class="father-key">
          <h3>Father key</h3>
          <p class="note">The challenge is the purity of this page. Sign that reading offline with the father key. The public half is already on record. Leave the public box blank, or paste that same block. The private key is refused. A match signs the reading. It does not make you him, and it does not pass the seat.</p>
          <button type="button" data-challenge>Sign the purity</button>
          <pre class="challenge" hidden></pre>
          <textarea name="public" placeholder="-----BEGIN PUBLIC KEY-----"></textarea>
          <textarea name="sig" placeholder="Signature, base64"></textarea>
          <button type="submit">Check the signature</button>
          <p class="father-result note"></p>
        </form>
        <form class="roster">
          <h3>Juvenile seats</h3>
          <div class="roster-list"></div>
          <div class="roster-fields">
            <p class="note">Minor athletics, and every other juvenile competition. You see an event only if you own it or you belong to it. It cannot be bought. A database of record is not for sale. The mark stays sealed in the dark ledger.</p>
            <select name="kind">
              <option value="minor athletics">Minor athletics</option>
              <option value="other juvenile">Other juvenile</option>
            </select>
            <label class="check"><input type="checkbox" name="consent"> Parental consent is asserted for this seat.</label>
            <textarea name="mark" maxlength="500" placeholder="A mark. It stays sealed."></textarea>
            <button type="submit">Take a seat</button>
          </div>
        </form>
        <form class="toddler">
          <h3>Toddler</h3>
          <p class="note">You can look. A grown-up says yes. Your name stays hidden. The grown-up holds the Unity ID.</p>
          <div class="toddler-list"></div>
          <select name="thing">
            <option value="blocks">Blocks</option>
            <option value="a picture">A picture</option>
            <option value="a song">A song</option>
            <option value="a story">A story</option>
          </select>
          <label class="check"><input type="checkbox" name="consent"> A grown-up says yes.</label>
          <button type="submit">Give this</button>
        </form>
        <form class="adventure">
          <h3>Adventure</h3>
          <p class="note">A room opens by a key. There is no password.</p>
          <div class="adventure-list"></div>
          <button type="button" data-pipe="share">Share access</button>
          <button type="button" data-pipe="hide">Keep it hidden</button>
        </form>
        <form class="connectors">
          <h3>Connectors</h3>
          <p class="note">One connector for each kind. It is meant to know and to sense. It does not yet. We signed ahead. The choice to move is theirs. The offer is audited. Nothing is sent.</p>
          <div class="connector-list"></div>
        </form>
        <form class="unified">
          <h3>One pass</h3>
          <p class="note unified-line">The three umpires have not been asked on this view yet.</p>
        </form>
      </section>
      <section class="panel depth-mid transcript" aria-label="Transcript" hidden>
        <header><h2>Transcript</h2><button class="close" aria-label="Close transcript">×</button></header>
        <div class="log" role="log" aria-live="off"></div>
        <form class="ask"><label class="sr" for="ask-input">Ask Iris</label><input id="ask-input" autocomplete="off" placeholder="Tap Speak. Typing is the slow path." /><button type="button" class="speak">Speak</button><button type="submit">Ask</button></form>
      </section>
      <div class="sr" aria-live="polite" role="status"></div>
      <div class="sr scene-text"></div>
      <aside class="scaleband" hidden></aside>
      <aside class="stream" aria-label="Code"><p>Next is +1. It is not written yet.</p></aside>`
    this.gate = host.querySelector('.gate')
    this.dock = host.querySelector('.dock')!
    this.geo = mountGeodesic(host.querySelector('.geo-stage')!, host.querySelector('.geo-read')!)
    this.geo.still(toggles.reducedMotion)
    this.atlas = host.querySelector('.atlas')!
    this.resources = host.querySelector('.resources')!
    this.watch = host.querySelector('.watch')!
    this.nutrition = host.querySelector('.nutrition')!
    this.face = host.querySelector('.face')!
    this.transcript = host.querySelector('.transcript')!
    this.profile = host.querySelector('.profile')!
    this.wallet = host.querySelector('.wallet')!
    this.wallet.addEventListener('click', e => {
      const act = (e.target as HTMLElement).closest('button')?.getAttribute('data-econ')
      if (act === 'split' || act === 'shift' || act === 'trade' || act === 'hire' || act === 'body' || act === 'cross' || act === 'sign-bots' || act === 'release-bots' || act === 'derive') this.onEconomy?.(act)
    })
    const pay = host.querySelector<HTMLFormElement>('.unity-pay')!
    pay.querySelector('[data-fund]')?.addEventListener('click', () => this.onUnity?.('fund', '', 0))
    pay.querySelector('[data-withdraw]')?.addEventListener('click', () => this.onUnity?.('withdraw', '', Number((pay.elements.namedItem('amount') as HTMLInputElement | null)?.value ?? 0)))
    pay.querySelector('[data-seed]')?.addEventListener('click', () => this.onSeed?.())
    pay.querySelector('[data-scan]')?.addEventListener('click', () => this.root.querySelector<HTMLInputElement>('.unity-file')?.click())
    this.root.querySelector<HTMLInputElement>('.unity-file')?.addEventListener('change', () => { void this.readQr() })
    pay.addEventListener('submit', e => {
      e.preventDefault()
      const data = new FormData(pay)
      this.onUnity?.('send', String(data.get('to') ?? ''), Number(data.get('amount') ?? 0))
    })
    const ledger = host.querySelector<HTMLFormElement>('.ledger')!
    ledger.addEventListener('submit', e => {
      e.preventDefault()
      const face = (e.submitter as HTMLButtonElement | null)?.dataset.face
      const text = String(new FormData(ledger).get('doc') ?? '')
      if (face === 'white' || face === 'dark') this.onLedger?.(face, text)
    })
    const father = host.querySelector<HTMLFormElement>('.father-key')!
    father.querySelector('[data-challenge]')?.addEventListener('click', () => this.onFatherChallenge?.())
    father.addEventListener('submit', e => {
      e.preventDefault()
      const data = new FormData(father)
      this.onFatherCheck?.(String(data.get('public') ?? ''), String(data.get('sig') ?? ''))
    })
    const roster = host.querySelector<HTMLFormElement>('.roster')!
    roster.addEventListener('submit', e => {
      e.preventDefault()
      const data = new FormData(roster)
      this.onSeat?.(String(data.get('kind') ?? ''), data.get('consent') === 'on', String(data.get('mark') ?? ''))
    })
    const toddler = host.querySelector<HTMLFormElement>('.toddler')!
    toddler.addEventListener('submit', e => {
      e.preventDefault()
      const data = new FormData(toddler)
      this.onToddler?.(String(data.get('thing') ?? ''), data.get('consent') === 'on')
    })
    const adventure = host.querySelector('.adventure')
    adventure?.addEventListener('click', e => {
      const pipe = (e.target as HTMLElement).closest('button')?.getAttribute('data-pipe')
      if (pipe === 'share' || pipe === 'hide') this.onAdventure?.(pipe)
    })
    this.log = host.querySelector('.log')!
    this.live = host.querySelector('[role="status"]')!
    this.chip = host.querySelector('.chip')!
    host.querySelector('[data-look]')?.addEventListener('click', () => this.onLook?.())
    host.querySelectorAll<HTMLButtonElement>('[data-bind]').forEach(b => b.addEventListener('click', () => this.onBind?.()))
    host.querySelector('[data-land]')?.addEventListener('click', () => this.onLand?.())
    host.querySelectorAll<HTMLButtonElement>('[data-t]').forEach(b => b.addEventListener('click', () => {
      const k = b.dataset.t as keyof Toggles | 'mic'
      const next = b.getAttribute('aria-pressed') !== 'true'
      if (k !== 'mic') this.setToggle(k, next)
      this.onToggle?.(k, next)
    }))
    host.querySelector('[data-p="atlas"]')!.addEventListener('click', () => this.togglePanel('atlas'))
    host.querySelector('[data-p="profile"]')!.addEventListener('click', () => this.toggleProfile())
    host.querySelector('[data-p="wallet"]')!.addEventListener('click', () => this.openWallet())
    host.querySelector('[data-p="home"]')!.addEventListener('click', () => this.onHome?.())
    host.querySelector('[data-p="here"]')!.addEventListener('click', () => this.onLand?.())
    host.querySelector('[data-p="system"]')!.addEventListener('click', () => this.onSystem?.())
    const bodies = host.querySelector('.system-bodies')!
    for (const name of ['Earth', 'Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']) {
      const b = document.createElement('button')
      b.type = 'button'
      b.dataset.body = name
      b.textContent = name
      b.setAttribute('aria-pressed', 'false')
      bodies.append(b)
    }
    host.querySelector('[data-index="messier"]')!.addEventListener('click', () => {
      const box = host.querySelector<HTMLElement>('.messier-index')!
      const open = box.hidden
      box.hidden = !open
      host.querySelector('[data-index="messier"]')!.setAttribute('aria-expanded', String(open))
    })
    host.querySelector('[data-p="resources"]')!.addEventListener('click', () => this.toggleResources())
    host.querySelector('[data-p="watch"]')!.addEventListener('click', () => this.toggleWatch())
    host.querySelector('[data-p="nutrition"]')!.addEventListener('click', () => this.toggleNutrition())
    host.querySelector('[data-p="face"]')!.addEventListener('click', () => this.toggleFace())
    host.querySelector('[data-p="guide"]')!.addEventListener('click', () => { location.assign('/guide') })
    host.querySelector('[data-p="chain"]')!.addEventListener('click', () => { location.assign('/chain') })
    host.querySelector('[data-p="story"]')!.addEventListener('click', () => { location.assign('/story') })
    host.querySelector('[data-p="fusion"]')!.addEventListener('click', () => { location.assign('/fusion') })
    host.querySelector('[data-p="cards"]')!.addEventListener('click', () => { location.assign('/pyramid') })
    host.querySelector('.nutrition')!.addEventListener('click', e => {
      const button = (e.target as HTMLElement).closest<HTMLElement>('[data-nut]')
      if (!button) return
      this.onNutrition?.(button.dataset.nut ?? '', button.dataset.id)
    })
    host.querySelector('.nutrition')!.addEventListener('change', e => {
      const el = e.target as HTMLElement
      if (el.classList.contains('nut-goal-input')) this.onNutrition?.('goal')
    })
    host.addEventListener('click', e => {
      const button = (e.target as HTMLElement).closest<HTMLElement>('[data-face]')
      if (!button?.dataset.face) return
      if (button.dataset.face === 'open') this.toggleFace(true)
      else this.onFace?.(button.dataset.face)
    })
    host.querySelector('.people')!.addEventListener('submit', e => {
      e.preventDefault()
      const form = e.currentTarget as HTMLFormElement
      const handle = (form.elements.namedItem('handle') as HTMLInputElement | null)?.value ?? ''
      this.onPeople?.(handle)
      form.reset()
    })
    host.querySelector('[data-rooms="draft"]')!.addEventListener('click', () => this.onRooms?.())
    host.querySelector('.nutrition')!.addEventListener('input', e => {
      const el = e.target as HTMLElement
      if (el.classList.contains('nut-q')) this.onNutrition?.('query')
    })
    host.querySelector('.res-refresh')!.addEventListener('click', () => this.onResources?.())
    host.querySelector('.watch-refresh')!.addEventListener('click', () => this.onWatch?.())
    host.querySelector('.system-bar')!.addEventListener('click', e => {
      const button = (e.target as HTMLElement).closest('button')
      const body = button?.getAttribute('data-body')
      if (body) { this.onBody?.(body); return }
      const days = button?.getAttribute('data-sky')
      if (days !== null && days !== undefined) this.onSky?.(Number(days))
    })
    host.querySelectorAll('.panel .close').forEach(b => b.addEventListener('click', e => {
      const panel = (e.currentTarget as HTMLElement).closest('.panel') as HTMLElement
      if (panel.classList.contains('transcript')) { this.setToggle('transcript', false); this.onToggle?.('transcript', false) }
      else if (panel.classList.contains('profile')) this.toggleProfile(false)
      else if (panel.classList.contains('resources')) this.toggleResources(false)
      else if (panel.classList.contains('watch')) this.toggleWatch(false)
      else if (panel.classList.contains('nutrition')) this.toggleNutrition(false)
      else if (panel.classList.contains('face')) this.toggleFace(false)
      else this.togglePanel('atlas', false)
    }))
    host.querySelector('.ask')!.addEventListener('submit', e => {
      e.preventDefault()
      const input = host.querySelector<HTMLInputElement>('#ask-input')!
      const text = input.value.trim()
      if (text) { this.onAsk?.(text); input.value = '' }
    })
    host.querySelector('.speak')!.addEventListener('click', () => this.onSpeak?.())
    this.root.querySelector('.scaleband')?.addEventListener('click', e => {
      if ((e.target as HTMLElement).closest('.band-x')) this.onHideBand?.()
    })
    for (const [k, v] of Object.entries(toggles)) this.setToggle(k as keyof Toggles, v)
  }

  ready(): void {
    this.gate?.classList.remove('is-loading')
    if (this.gate) this.gate.hidden = true
    this.dock.hidden = true
  }

  /** HUD closed. The Earth stays, and nothing is pinned on it. */
  closeHud(): void {
    if (this.gate) this.gate.hidden = true
    this.dock.hidden = true
    this.profile.hidden = true
    this.resources.hidden = true
    this.watch.hidden = true
    this.nutrition.hidden = true
    this.face.hidden = true
    this.root.querySelector<HTMLElement>('.system-bar')!.hidden = true
    this.root.querySelector<HTMLElement>('.scaleband')!.hidden = true
  }

  fail(message: string): void {
    this.announce(message)
  }

  setResources(html: string): void {
    const body = this.resources.querySelector('.res-body')
    if (body) body.innerHTML = html
  }

  toggleResources(force?: boolean): void {
    const show = force ?? this.resources.hidden
    this.resources.hidden = !show
    this.dock.querySelector('[data-p="resources"]')?.setAttribute('aria-expanded', String(show))
    if (show) {
      this.profile.hidden = true
      this.watch.hidden = true
      this.nutrition.hidden = true
      this.dock.querySelector('[data-p="profile"]')?.setAttribute('aria-expanded', 'false')
      this.dock.querySelector('[data-p="watch"]')?.setAttribute('aria-expanded', 'false')
      this.dock.querySelector('[data-p="nutrition"]')?.setAttribute('aria-expanded', 'false')
      this.onResources?.()
    }
  }

  setWatch(html: string): void {
    const body = this.watch.querySelector('.watch-body')
    if (body) body.innerHTML = html
  }

  toggleWatch(force?: boolean): void {
    const show = force ?? this.watch.hidden
    this.watch.hidden = !show
    this.dock.querySelector('[data-p="watch"]')?.setAttribute('aria-expanded', String(show))
    if (show) {
      this.profile.hidden = true
      this.resources.hidden = true
      this.nutrition.hidden = true
      this.dock.querySelector('[data-p="profile"]')?.setAttribute('aria-expanded', 'false')
      this.dock.querySelector('[data-p="resources"]')?.setAttribute('aria-expanded', 'false')
      this.dock.querySelector('[data-p="nutrition"]')?.setAttribute('aria-expanded', 'false')
      this.onWatch?.()
    }
  }

  setNutrition(html: string): void {
    const body = this.nutrition.querySelector('.nut-body')
    if (body) body.innerHTML = html
  }

  nutritionVideo(): HTMLVideoElement {
    return this.nutrition.querySelector('.nut-video') as HTMLVideoElement
  }

  nutritionField(kind: 'query' | 'goal' | 'kcal'): string {
    const sel = kind === 'query' ? '.nut-q' : kind === 'goal' ? '.nut-goal-input' : '.nut-custom-kcal'
    return (this.nutrition.querySelector(sel) as HTMLInputElement | null)?.value ?? ''
  }

  setNutritionQuery(value: string): void {
    const input = this.nutrition.querySelector('.nut-q') as HTMLInputElement | null
    if (input && input.value !== value) input.value = value
  }

  setNutritionGoal(value: string): void {
    const input = this.nutrition.querySelector('.nut-goal-input') as HTMLInputElement | null
    if (input && document.activeElement !== input) input.value = value
  }

  setNutritionNote(note: string): void {
    const line = this.nutrition.querySelector('.nut-sense-note')
    if (line) line.textContent = note
  }

  setKitchen(label: string, read: string): void {
    const button = this.nutrition.querySelector<HTMLButtonElement>('[data-nut="kitchen"]')
    if (button) button.textContent = label
    const line = this.nutrition.querySelector('.kit-read')
    if (line) line.textContent = read
  }

  setNutritionMeal(meal: string): void {
    this.nutrition.querySelectorAll<HTMLButtonElement>('[data-nut="meal"]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.id === meal))
    })
  }

  setNutritionCamera(label: string, note: string): void {
    const button = this.nutrition.querySelector<HTMLButtonElement>('[data-nut="camera"]')
    if (button) button.textContent = label
    const line = this.nutrition.querySelector('.nut-sense-note')
    if (line) line.textContent = note
  }

  toggleNutrition(force?: boolean): void {
    const show = force ?? this.nutrition.hidden
    this.nutrition.hidden = !show
    this.dock.querySelector('[data-p="nutrition"]')?.setAttribute('aria-expanded', String(show))
    if (show) {
      this.profile.hidden = true
      this.resources.hidden = true
      this.watch.hidden = true
      this.face.hidden = true
      this.dock.querySelector('[data-p="profile"]')?.setAttribute('aria-expanded', 'false')
      this.dock.querySelector('[data-p="resources"]')?.setAttribute('aria-expanded', 'false')
      this.dock.querySelector('[data-p="watch"]')?.setAttribute('aria-expanded', 'false')
    }
    this.onNutrition?.(show ? 'open' : 'close')
  }

  faceVideo(): HTMLVideoElement {
    return this.face.querySelector('.face-video') as HTMLVideoElement
  }

  setFaceStep(text: string): void {
    const line = this.face.querySelector('.face-step')
    if (line) line.textContent = text
  }

  setFaceNote(text: string): void {
    const line = this.face.querySelector('.face-note')
    if (line) line.textContent = text
  }

  setFaceCamera(label: string): void {
    const button = this.face.querySelector<HTMLButtonElement>('[data-face="camera"]')
    if (button) button.textContent = label
  }

  setPeople(html: string): void {
    const body = this.profile.querySelector('.people-body')
    if (body) body.innerHTML = html
  }

  setRooms(html: string): void {
    const body = this.profile.querySelector('.rooms-body')
    if (body) body.innerHTML = html
  }

  setRollout(html: string): void {
    const body = this.profile.querySelector('.rollout-body')
    if (body) body.innerHTML = html
  }

  toggleFace(force?: boolean): void {
    const show = force ?? this.face.hidden
    this.face.hidden = !show
    if (show) {
      this.profile.hidden = true
      this.nutrition.hidden = true
      this.resources.hidden = true
      this.watch.hidden = true
      this.dock.querySelector('[data-p="profile"]')?.setAttribute('aria-expanded', 'false')
      this.dock.querySelector('[data-p="nutrition"]')?.setAttribute('aria-expanded', 'false')
    }
    this.onFace?.(show ? 'open' : 'close')
  }

  setMessier(rows: readonly { body: string; text: string }[]): void {
    const box = this.root.querySelector('.messier-index')
    if (!box) return
    box.replaceChildren()
    for (const row of rows) {
      const b = document.createElement('button')
      b.type = 'button'
      b.dataset.body = row.body
      b.textContent = row.text
      b.setAttribute('aria-pressed', 'false')
      box.append(b)
    }
  }

  setSystem(on: boolean, text: string): void {
    const bar = this.root.querySelector<HTMLElement>('.system-bar')!
    bar.hidden = !on
    this.dock.querySelector('[data-p="system"]')?.setAttribute('aria-pressed', String(on))
    bar.querySelector('.system-read')!.textContent = text
    if (!on) this.setWarp('', false)
  }

  markBody(name: string | null): void {
    this.root.querySelectorAll<HTMLButtonElement>('[data-body]').forEach(b => {
      b.setAttribute('aria-pressed', String(!!name && b.dataset.body === name))
    })
  }

  setWarp(name: string, on: boolean): void {
    const el = this.root.querySelector<HTMLElement>('.warp-banner')!
    el.hidden = true
    if (on && name) this.announce(`Warpspeed to ${name}`)
  }

  enter(): void {
    if (this.gate) this.gate.hidden = true
    this.dock.hidden = true
  }

  showAbstract(text: string | null): void {
    const el = this.root.querySelector<HTMLElement>('.abstract-line')
    if (!el) return
    el.hidden = !text
    el.textContent = text ?? ''
  }

  setLayer(text: string): void {
    const el = this.dock.querySelector<HTMLElement>('.logic-layer')
    if (!el) return
    el.hidden = !text
    el.textContent = text
  }

  setToggle(k: keyof Toggles, v: boolean): void {
    this.toggles[k] = v
    this.dock.querySelector(`[data-t="${k}"]`)?.setAttribute('aria-pressed', String(v))
    if (k === 'transcript') this.transcript.hidden = !v
    if (k === 'reducedMotion') this.geo?.still(v)
  }

  focusAsk(): void {
    this.setToggle('transcript', true)
    this.transcript.hidden = false
    this.onSpeak?.()
  }

  panels(): { nutrition: boolean } {
    return { nutrition: !this.nutrition.hidden }
  }

  setMic(on: boolean): void {
    this.dock.querySelector('[data-t="mic"]')?.setAttribute('aria-pressed', String(on))
  }

  openWallet(): void {
    this.toggleProfile(true)
    this.root.querySelector('[data-p="wallet"]')?.setAttribute('aria-expanded', 'true')
    this.root.querySelector('.unity-pay')?.scrollIntoView({ block: 'nearest' })
  }

  toggleProfile(force?: boolean): void {
    const show = force ?? this.profile.hidden
    this.profile.hidden = !show
    this.dock.querySelector('[data-p="profile"]')?.setAttribute('aria-expanded', String(show))
    if (!show) this.dock.querySelector('[data-p="wallet"]')?.setAttribute('aria-expanded', 'false')
  }

  setWallet(html: string): void {
    this.wallet.innerHTML = html
  }

  setUnityPay(address: string | null, balance: number | null, lines: string[], result: string): void {
    const receive = this.root.querySelector('.receive')
    const bal = this.root.querySelector('.unity-balance')
    const log = this.root.querySelector('.unity-log')
    const note = this.root.querySelector('.unity-result')
    if (receive) receive.textContent = address ? `Receive ${address}` : 'Nothing to receive until your face or your finger opens it.'
    if (bal) bal.textContent = balance === null ? '' : `${balance} units in the wallet.`
    if (note) note.textContent = result
    if (log) log.innerHTML = lines.map(line => `<li>${escapeHtml(line)}</li>`).join('')
  }

  setQr(dataUrl: string | null, label: string): void {
    const img = this.root.querySelector<HTMLImageElement>('.unity-qr')
    if (!img) return
    if (!dataUrl) {
      img.hidden = true
      img.removeAttribute('src')
      return
    }
    img.src = dataUrl
    img.alt = label
    img.hidden = false
  }

  setBulletin(lines: string[]): void {
    const log = this.root.querySelector('.seed-log')
    if (log) log.innerHTML = lines.map(line => `<li>${escapeHtml(line)}</li>`).join('')
  }

  private async readQr(): Promise<void> {
    const input = this.root.querySelector<HTMLInputElement>('.unity-file')
    const file = input?.files?.[0]
    const note = this.root.querySelector('.unity-result')
    if (!file) return
    const Detector = (window as unknown as { BarcodeDetector?: new (opts: { formats: string[] }) => { detect: (src: ImageBitmap) => Promise<{ rawValue: string }[]> } }).BarcodeDetector
    if (!Detector) {
      if (note) note.textContent = 'This browser cannot read a QR. Paste the Unity handle.'
      return
    }
    const bitmap = await createImageBitmap(file)
    const found = await new Detector({ formats: ['qr_code'] }).detect(bitmap)
    bitmap.close()
    const raw = found[0]?.rawValue?.trim() ?? ''
    const to = this.root.querySelector<HTMLInputElement>('[name="to"]')
    if (to && raw.startsWith('unity:')) to.value = raw.split('|')[0]
    if (note) note.textContent = raw.startsWith('unity:') ? 'The QR is a handle. It is not a settlement.' : 'That QR is not a Unity handle.'
    if (input) input.value = ''
  }

  setLedger(lines: string[]): void {
    const list = this.root.querySelector('.ledger-list')
    if (!list) return
    list.innerHTML = lines.length ? `<ul>${lines.map(line => `<li>${escapeHtml(line)}</li>`).join('')}</ul>` : '<p class="note">Nothing taken in.</p>'
  }

  setTotality(line: string): void {
    const el = this.root.querySelector('.totality')
    if (el) el.textContent = line
  }


  setPassFrame(lines: readonly string[]): void {
    const el = this.root.querySelector<HTMLElement>('.pass-frame')
    if (!el) return
    el.hidden = lines.length === 0
    el.textContent = lines.join(' ')
  }

  setScaleBand(title: string, lines: string[]): void {
    const el = this.root.querySelector('.scaleband')
    if (!el) return
    el.innerHTML = `<header><b>${escapeHtml(title)}</b><button type="button" class="band-x" aria-label="Hide this card">×</button></header>${lines.map(line => `<span>${escapeHtml(line)}</span>`).join('')}`
  }

  hideScaleBand(): void {
    const el = this.root.querySelector<HTMLElement>('.scaleband')
    if (el) el.hidden = true
  }

  showScaleBand(): void {
    const el = this.root.querySelector<HTMLElement>('.scaleband')
    if (el) el.hidden = false
  }

  setPurity(text: string): void {
    const el = this.root.querySelector<HTMLElement>('.purity-line')
    if (!el) return
    el.hidden = !text
    el.textContent = text
  }

  setFatherChallenge(challenge: string): void {
    const el = this.root.querySelector<HTMLElement>('.father-key .challenge')
    if (!el) return
    el.hidden = false
    el.textContent = `printf '%s' '${challenge}' | openssl pkeyutl -sign -inkey father.pem -rawin | openssl base64 -A`
  }

  setFatherResult(text: string): void {
    const el = this.root.querySelector('.father-result')
    if (el) el.textContent = text
  }

  setRoster(dark: boolean, lines: string[]): void {
    const form = this.root.querySelector('.roster')
    const list = form?.querySelector('.roster-list')
    const fields = form?.querySelector<HTMLElement>('.roster-fields')
    if (!list || !fields) return
    fields.hidden = dark
    list.innerHTML = lines.length ? `<ul>${lines.map(line => `<li>${escapeHtml(line)}</li>`).join('')}</ul>` : ''
  }

  setToddler(lines: string[]): void {
    const list = this.root.querySelector('.toddler-list')
    if (!list) return
    list.innerHTML = lines.length ? `<ul>${lines.map(line => `<li>${escapeHtml(line)}</li>`).join('')}</ul>` : ''
  }

  setAdventure(lines: string[]): void {
    const list = this.root.querySelector('.adventure-list')
    if (!list) return
    list.innerHTML = lines.length ? `<ul>${lines.map(line => `<li>${escapeHtml(line)}</li>`).join('')}</ul>` : ''
  }

  setConnectors(lines: string[]): void {
    const list = this.root.querySelector('.connector-list')
    if (!list) return
    list.innerHTML = lines.length ? `<ul>${lines.map(line => `<li>${escapeHtml(line)}</li>`).join('')}</ul>` : ''
  }

  setUnified(line: string): void {
    const el = this.root.querySelector('.unified-line')
    if (el) el.textContent = line
  }

  togglePanel(_which: 'atlas', force?: boolean): void {
    const show = force ?? this.atlas.hidden
    this.atlas.hidden = !show
    this.dock.querySelector('[data-p="atlas"]')?.setAttribute('aria-expanded', String(show))
    if (show) this.atlas.querySelector<HTMLButtonElement>('.atlas-list button')?.focus()
  }

  setAtlas(items: AtlasItem[]): void {
    const groups = new Map<string, AtlasItem[]>()
    for (const it of items) groups.set(it.group, [...(groups.get(it.group) ?? []), it])
    const list = this.atlas.querySelector('.atlas-list')!
    list.innerHTML = [...groups].map(([g, its]) => `<h3>${g}</h3><ul>${its.map(i => `<li><button data-id="${i.id}">${escapeHtml(i.label)}</button></li>`).join('')}</ul>`).join('')
    list.querySelectorAll<HTMLButtonElement>('button[data-id]').forEach(b => b.addEventListener('click', () => this.onAtlas?.(b.dataset.id!)))
  }

  setUnityId(handle: string | null, disclose: string): void {
    const box = this.atlas.querySelector('.unity-id')!
    box.innerHTML = handle
      ? `<h3>Your pilot Unity handle</h3><p class="handle">${escapeHtml(handle)}</p><p class="note">Persistent pseudonymous handle, stored by your authenticator. It can sync. Not issued by the Unity Network. Not a claim that it never leaves a device.</p><button data-u="forget">Forget it on this device</button>`
      : `<h3>Pilot Unity handle</h3><p class="note">${escapeHtml(disclose)}</p><button data-u="create">I understand — create a pilot handle</button>`
    box.querySelector<HTMLButtonElement>('[data-u]')?.addEventListener('click', e => this.onUnityId?.((e.currentTarget as HTMLElement).dataset.u as 'create' | 'forget'))
  }

  /** Mirror Iris for assistive tech; append to the transcript (visible only if opted in). */
  iris(text: string, cite?: { title: string; url: string }): void {
    this.live.textContent = ''
    requestAnimationFrame(() => { this.live.textContent = text })
    this.append('Iris', text, cite)
  }

  visitor(text: string): void {
    this.append('You', text)
  }

  announce(text: string): void {
    this.live.textContent = ''
    requestAnimationFrame(() => { this.live.textContent = text })
  }

  setSceneText(text: string): void {
    const el = this.root.querySelector('.scene-text')
    if (el) el.textContent = text
  }

  private append(who: string, text: string, cite?: { title: string; url: string }): void {
    const p = document.createElement('p')
    p.className = who === 'Iris' ? 'iris' : 'you'
    p.innerHTML = `<b>${who}</b> ${escapeHtml(text)}`
    if (cite && /^https:\/\/en\.wikipedia\.org\/wiki\/\S+$/.test(cite.url)) {
      const a = document.createElement('a')
      a.className = 'cite'
      a.href = cite.url
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
      a.textContent = `Wikipedia — ${cite.title}`
      a.title = 'A Wikipedia cite. From here, what it prints is still being checked.'
      p.append(document.createElement('br'), a)
    }
    this.log.append(p)
    while (this.log.children.length > 120) this.log.firstElementChild?.remove()
    this.log.scrollTop = this.log.scrollHeight
  }

  /** Twain² condition: an explicit, visible fallback when speech fails. */
  speechUnavailable(): void {
    this.append('Iris', 'Microphone or speech is not available in this browser.')
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
}
