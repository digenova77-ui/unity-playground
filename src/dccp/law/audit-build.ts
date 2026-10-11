/** What this build holds, and what it does not. A hole is not filled. */

import { postNotice } from './ad.ts'
import { emits, OLED_FLOOR, spirit } from './acuity.ts'
import { breath } from './purity.ts'
import { isNeural, pickVoice } from '../iris/voice.ts'
import { liveOnly } from '../live/show.ts'

export function auditBuild(): { holds: string[]; holes: string[] } {
  const holds: string[] = []
  const holes: string[] = []
  const check = (ok: boolean, hold: string, hole: string) => {
    if (ok) holds.push(hold)
    else holes.push(hole)
  }
  check(liveOnly('STALE', '12') === null, 'A stale reading is not shown.', 'A stale reading is shown.')
  check(spirit(0)?.force === 0 && spirit(4)?.invented === 0, 'Force stays zero. A missing fact stays open.', 'Force moved.')
  check(breath(true, true).exhale === 0, 'A repeat is held.', 'A repeat is written again.')
  check(postNotice(false) === null, 'A notice is not sent where no one is looking.', 'A notice is sent unasked.')
  check(!emits(OLED_FLOOR), 'A dark pixel emits nothing.', 'A dark pixel emits.')
  const picked = pickVoice([
    { name: 'English (Canada)', lang: 'en-CA' },
    { name: 'Microsoft Aria Online (Natural) - English (Canada)', lang: 'en-CA' },
  ])
  check(!!picked && isNeural(picked), 'A neural Canadian voice is taken when one is named.', 'A plain voice was taken over a neural one.')
  holes.push('The till is closed. The coins are a test. That is not absolute purity.')
  holes.push('This page cannot replace the live domain. No host credential is here.')
  return { holds, holes }
}

export function auditWords(): string {
  const a = auditBuild()
  return `Holds. ${a.holds.join(' ')} Holes. ${a.holes.join(' ')}`
}
