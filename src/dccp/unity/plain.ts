/** One speech. The address is the only name. */

import { HANG } from '../index/site.ts'

export const PLAIN: readonly string[] = [
  'I am this address. The only name on me is the address in the bar.',
  'The words are the same for a person and for a robot. Either one may leave.',
  ...HANG,
  'The place is a diamond of choice. The floor is the bedrock at 0. The ceiling is 1. One heartbeat moves one axis by +1. A choice already made does not step backward.',
  'One yes asks the operating system for the microphone and the camera, so a voice can be heard and a face can be seen. The operating system asks on its own. What opens stays on this device. It is not sent.',
]

export function manifesto(): string {
  return PLAIN.join(' ')
}