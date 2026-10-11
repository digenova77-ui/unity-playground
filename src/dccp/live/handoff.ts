/** What the operating system already handed this page. Nothing else is taken.
 * The seam is the browser. Camera and microphone streams are not opened.
 * Disk and other processes are not read. The kernel is not entered.
 */

export interface Handoff {
  claim: 'REPORTED' | 'UNKNOWN'
  cores: number | null
  memoryGb: number | null
  link: string | null
  downlink: number | null
  visible: boolean | null
  dpr: number | null
  online: boolean | null
  timezone: string | null
  locale: string | null
  touch: number | null
  battery: number | null
  charging: boolean | null
  storageMb: number | null
  geoPermission: string | null
  cameraPermission: string | null
  micPermission: string | null
  note: string
}

export function readHandoff(env: {
  cores?: number
  memoryGb?: number
  link?: string | null
  downlink?: number | null
  hidden?: boolean
  dpr?: number
  online?: boolean
  timezone?: string | null
  locale?: string | null
  touch?: number
  battery?: number | null
  charging?: boolean | null
  storageMb?: number | null
  geoPermission?: string | null
  cameraPermission?: string | null
  micPermission?: string | null
}): Handoff {
  const cores = Number.isFinite(env.cores) ? env.cores! : null
  const memoryGb = Number.isFinite(env.memoryGb) ? env.memoryGb! : null
  const link = env.link ?? null
  const downlink = Number.isFinite(env.downlink) ? env.downlink! : null
  const visible = typeof env.hidden === 'boolean' ? !env.hidden : null
  const dpr = Number.isFinite(env.dpr) ? env.dpr! : null
  const online = typeof env.online === 'boolean' ? env.online : null
  const timezone = env.timezone ?? null
  const locale = env.locale ?? null
  const touch = Number.isFinite(env.touch) ? env.touch! : null
  const battery = Number.isFinite(env.battery) ? env.battery! : null
  const charging = typeof env.charging === 'boolean' ? env.charging : null
  const storageMb = Number.isFinite(env.storageMb) ? env.storageMb! : null
  const geoPermission = env.geoPermission ?? null
  const cameraPermission = env.cameraPermission ?? null
  const micPermission = env.micPermission ?? null
  const any = [cores, memoryGb, link, downlink, visible, dpr, online, timezone, locale, touch, battery, charging, storageMb, geoPermission, cameraPermission, micPermission].some(v => v !== null)
  const bits = [
    cores !== null ? `${cores} cores` : null,
    memoryGb !== null ? `${memoryGb} GB` : null,
    link ? `link ${link}` : null,
    downlink !== null ? `${downlink} Mb/s` : null,
    visible === null ? null : visible ? 'tab visible' : 'tab hidden',
    dpr !== null ? `pixel ratio ${dpr}` : null,
    online === null ? null : online ? 'online' : 'offline',
    timezone,
    locale,
    touch !== null ? `${touch} touch points` : null,
    battery !== null ? `battery ${Math.round(battery * 100)}%` : null,
    charging === null ? null : charging ? 'charging' : 'on battery',
    storageMb !== null ? `storage quota ${storageMb} MB` : null,
    geoPermission ? `location permission ${geoPermission}` : null,
    cameraPermission ? `camera permission ${cameraPermission}` : null,
    micPermission ? `microphone permission ${micPermission}` : null,
  ].filter(Boolean)
  const tail = 'Camera, microphone, and disk were not taken. Streams were not opened. The kernel was not entered.'
  return {
    claim: any ? 'REPORTED' : 'UNKNOWN',
    cores, memoryGb, link, downlink, visible, dpr, online, timezone, locale, touch,
    battery, charging, storageMb, geoPermission, cameraPermission, micPermission,
    note: any ? `OS handoff, reported: ${bits.join(', ')}. ${tail}` : `OS handoff unknown. This page was given nothing to read. ${tail}`,
  }
}

export function readDevice(): Handoff {
  if (typeof navigator === 'undefined') return readHandoff({})
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { effectiveType?: string; downlink?: number } }
  return readHandoff({
    cores: nav.hardwareConcurrency,
    memoryGb: nav.deviceMemory,
    link: nav.connection?.effectiveType ?? null,
    downlink: nav.connection?.downlink,
    hidden: typeof document !== 'undefined' ? document.hidden : undefined,
    dpr: typeof window !== 'undefined' ? window.devicePixelRatio : undefined,
    online: nav.onLine,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    locale: nav.language,
    touch: nav.maxTouchPoints,
  })
}

async function permissionState(name: string): Promise<string | null> {
  try {
    const status = await navigator.permissions.query({ name: name as PermissionName })
    return status.state
  } catch {
    return null
  }
}

/** The rest of the seam, still without opening a stream. */
export async function readSeam(base?: Handoff): Promise<Handoff> {
  const start = base ?? readDevice()
  if (typeof navigator === 'undefined') return start
  let battery: number | null = null
  let charging: boolean | null = null
  try {
    const nav = navigator as Navigator & { getBattery?: () => Promise<{ level: number; charging: boolean }> }
    const cell = await nav.getBattery?.()
    if (cell) {
      battery = cell.level
      charging = cell.charging
    }
  } catch { /* not handed */ }
  let storageMb: number | null = null
  try {
    const est = await navigator.storage?.estimate?.()
    if (est?.quota) storageMb = Math.round(est.quota / (1024 * 1024))
  } catch { /* not handed */ }
  const [geoPermission, cameraPermission, micPermission] = await Promise.all([
    permissionState('geolocation'),
    permissionState('camera'),
    permissionState('microphone'),
  ])
  return readHandoff({
    cores: start.cores ?? undefined,
    memoryGb: start.memoryGb ?? undefined,
    link: start.link,
    downlink: start.downlink,
    hidden: start.visible === null ? undefined : !start.visible,
    dpr: start.dpr ?? undefined,
    online: start.online ?? undefined,
    timezone: start.timezone,
    locale: start.locale,
    touch: start.touch ?? undefined,
    battery,
    charging,
    storageMb,
    geoPermission,
    cameraPermission,
    micPermission,
  })
}
