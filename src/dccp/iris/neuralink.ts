/** What Neuralink has shown, and what this page can run.
 * An implant is not attached. A decoder is not here.
 */

export function voiceTrial(): {
  shown: '2026-09-18'
  participant: 'Terry'
  order: 3
  metrics: null
  implant: null
  endpoint: null
  launched: false
  page: 'device speech'
} {
  return { shown: '2026-09-18', participant: 'Terry', order: 3, metrics: null, implant: null, endpoint: null, launched: false, page: 'device speech' }
}

export function voiceTrialWords(): string {
  const row = voiceTrial()
  return `Neuralink's VOICE trial showed a demonstration on ${row.shown}. ${row.participant} is the third participant, with bulbar-onset ALS. The company says the implant reads speech signals, words are decoded, and a voice rebuilt from his earlier recordings says them. No word rate, no latency, and no vocabulary size were published, so those numbers are not held. The 140 words a minute from January is still a goal. No public Neuralink endpoint is held, so nothing was called and the launch was not made. This page has no implant and no decoder. The speech it can run is the voice this device already names. Iris can say this. She cannot perfect a device she is not connected to.`
}
