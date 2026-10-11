/** Five pins, one CID, hung on GitHub and the world. Cloudflare is not in the hang.
 * The CID is the spare lander recorded in AGENT/IPFS-5-PINS.md on 2026-09-29.
 * Retrieval from a gateway was a hole then. It is still a hole here. No name was minted.
 * The same five files and the same CID are one row. A different set is refused.
 * This file is read by the page. It does not hash, and it does not import a server module.
 */

export const PINS = [
  '404.html',
  'alacarte.html',
  'index.html',
  'manifold.html',
  'rtesimadclm/manifold.html',
] as const

export const PIN_CID = 'bafybeian5fkku2cu47iusk3iyt3piwbpms7ri4grkneqiyxtqlzoxag2uy'
export const PIN_TOKEN = 'ipfs-5-pins'

export const HANG = {
  ipfs: PIN_CID,
  ipns: null,
  github: 'https://github.com/digenova77-ui/dualiscapax-landing',
  world: 'http://108.61.17.141',
} as const

export function pinSet(): { act: 'pins'; pins: readonly string[]; cid: typeof PIN_CID } {
  return { act: 'pins', pins: PINS, cid: PIN_CID }
}

export function cidGroups(cid: string = PIN_CID): string[] {
  return cid.match(/.{1,8}/g) ?? [cid]
}

export function pinLines(): { k: string; v: string }[] {
  return [
    { k: 'Files', v: PINS.join(' · ') },
    { k: 'IPFS', v: cidGroups().join(' ') },
    { k: 'IPNS', v: 'HOLE' },
    { k: 'Retrieval', v: 'HOLE' },
    { k: 'GitHub', v: HANG.github },
    { k: 'World', v: HANG.world },
  ]
}
export function pinBody(): { pins: readonly string[]; ipfs: string; ipns: null; retrieval: 'HOLE'; github: string; world: string } {
  return { pins: PINS, ipfs: HANG.ipfs, ipns: HANG.ipns, retrieval: 'HOLE', github: HANG.github, world: HANG.world }
}

export function pinWords(): string {
  return `IPFS holds five pins: ${PINS.join(', ')}. The CID is ${PIN_CID}. The same five are the same pin. A different set is refused. IPNS is not held, so the name is HOLE. Retrieval is HOLE. They hang on GitHub and on the world. Cloudflare is not in the hang.`
}
