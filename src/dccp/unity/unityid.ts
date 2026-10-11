// Pilot Unity handle (Trinity P17, with conditions). Not an issuance by the Unity Network.
// handle = "unity:pilot." + the first 2⁵ hex of SHA-256(SPKI public key). Stored only on this device.

import { TWO_FIFTH } from '../pipe/chain.ts'

const KEY = 'dccpworld.unity-pilot.v1'

export interface PilotHandle { handle: string; credentialId: string; createdAt: string; rpId: string; digest: string; protocol: 'W3C WebAuthn / FIDO2' }

export const UNITY_PROTOCOL = 'W3C WebAuthn / FIDO2' as const

/** The phone checks the body. This page does not store a face, a finger, a password, or a word list. */
export const BIO = {
  authenticatorAttachment: 'platform',
  residentKey: 'preferred',
  userVerification: 'required',
} as const

export const WALLET_DOOR = 'No words to remember. No password. Your face or your finger opens it. The page never sees either one. The phone does.'

export function storedHandle(): PilotHandle | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const row = JSON.parse(raw) as Partial<PilotHandle>
    if (!row.handle || !row.credentialId || !row.createdAt || !row.rpId || !row.digest) return null
    if (!/^[0-9a-f]{64}$/.test(row.digest)) return null
    return { handle: row.handle, credentialId: row.credentialId, createdAt: row.createdAt, rpId: row.rpId, digest: row.digest, protocol: UNITY_PROTOCOL }
  } catch {
    return null
  }
}

export function forgetHandle(): void {
  try { localStorage.removeItem(KEY) } catch { /* storage unavailable */ }
}

export async function handleFromPublicKey(spki: ArrayBuffer): Promise<string> {
  const hex = await publicDigest(spki)
  return `unity:pilot.${hex.slice(0, TWO_FIFTH)}`
}

export async function publicDigest(spki: ArrayBuffer): Promise<string> {
  const d = await crypto.subtle.digest('SHA-256', spki)
  return [...new Uint8Array(d)].map(b => b.toString(16).padStart(2, '0')).join('')
}

const b64url = (buf: ArrayBuffer): string => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

const fromB64url = (value: string): ArrayBuffer => {
  const pad = value.replace(/-/g, '+').replace(/_/g, '/')
  const bin = atob(pad + '='.repeat((4 - (pad.length % 4)) % 4))
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
  return bytes.buffer
}

export type CreateResult = { ok: true; handle: PilotHandle; digest: string } | { ok: false; reason: 'unsupported' | 'insecure' | 'framed' | 'cancelled' | 'no-public-key' | 'failed' }

export async function createPilotHandle(): Promise<CreateResult> {
  if (!window.isSecureContext || !crypto?.subtle) return { ok: false, reason: 'insecure' }
  if (!('credentials' in navigator) || typeof PublicKeyCredential === 'undefined') return { ok: false, reason: 'unsupported' }
  const rpId = location.hostname
  try {
    const cred = (await navigator.credentials.create({
      publicKey: {
        rp: { name: rpId, id: rpId },
        user: { id: crypto.getRandomValues(new Uint8Array(16)), name: 'unity-id', displayName: 'Unity ID' },
        challenge: crypto.getRandomValues(new Uint8Array(32)),
        pubKeyCredParams: [{ type: 'public-key', alg: -7 }, { type: 'public-key', alg: -257 }],
        authenticatorSelection: { ...BIO },
        attestation: 'none',
        timeout: 90_000,
      },
    })) as PublicKeyCredential | null
    if (!cred) return { ok: false, reason: 'cancelled' }
    const resp = cred.response as AuthenticatorAttestationResponse & { getPublicKey?: () => ArrayBuffer | null }
    const spki = resp.getPublicKey?.()
    if (!spki) return { ok: false, reason: 'no-public-key' }
    const digest = await publicDigest(spki)
    const handle: PilotHandle = { handle: `unity:pilot.${digest.slice(0, TWO_FIFTH)}`, credentialId: b64url(cred.rawId), createdAt: new Date().toISOString(), rpId, digest, protocol: UNITY_PROTOCOL }
    try { localStorage.setItem(KEY, JSON.stringify(handle)) } catch { /* still return it for this session */ }
    return { ok: true, handle, digest }
  } catch (err) {
    const name = err instanceof DOMException ? err.name : ''
    if (name === 'NotAllowedError' || name === 'AbortError') return { ok: false, reason: window.top !== window.self ? 'framed' : 'cancelled' }
    if (name === 'SecurityError') return { ok: false, reason: window.top !== window.self ? 'framed' : 'insecure' }
    if (name === 'NotSupportedError') return { ok: false, reason: 'unsupported' }
    return { ok: false, reason: 'failed' }
  }
}

/** The same phone confirms the body again. A new face or finger is asked only when this device has no public check. */
export async function confirmBody(): Promise<{ ok: true; digest: string } | { ok: false; reason: Exclude<CreateResult, { ok: true }>['reason'] }> {
  const saved = storedHandle()
  if (!saved) {
    const made = await createPilotHandle()
    if (!made.ok) return made
    return { ok: true, digest: made.digest }
  }
  if (!window.isSecureContext || !crypto?.subtle) return { ok: false, reason: 'insecure' }
  if (!('credentials' in navigator) || typeof PublicKeyCredential === 'undefined') return { ok: false, reason: 'unsupported' }
  try {
    const cred = await navigator.credentials.get({
      publicKey: {
        challenge: crypto.getRandomValues(new Uint8Array(32)),
        rpId: saved.rpId,
        allowCredentials: [{ type: 'public-key', id: fromB64url(saved.credentialId) }],
        userVerification: 'required',
        timeout: 90_000,
      },
    })
    if (!cred) return { ok: false, reason: 'cancelled' }
    return { ok: true, digest: saved.digest }
  } catch (err) {
    const name = err instanceof DOMException ? err.name : ''
    if (name === 'NotAllowedError' || name === 'AbortError') return { ok: false, reason: window.top !== window.self ? 'framed' : 'cancelled' }
    if (name === 'SecurityError') return { ok: false, reason: window.top !== window.self ? 'framed' : 'insecure' }
    if (name === 'NotSupportedError') return { ok: false, reason: 'unsupported' }
    return { ok: false, reason: 'failed' }
  }
}

export const FAILURE_SPEECH: Record<Exclude<CreateResult, { ok: true }>['reason'], string> = {
  unsupported: 'This phone cannot ask for your face or your finger. You can keep looking. Nothing was saved.',
  insecure: 'Your face or your finger needs a secure page. You can keep looking.',
  framed: 'This preview cannot ask for your face or your finger. Open the world in its own tab.',
  cancelled: 'You did not confirm. Nothing was saved.',
  'no-public-key': 'The phone did not share a public check, so there is no handle. Nothing was saved.',
  failed: 'The phone did not confirm. Nothing was saved.',
}
