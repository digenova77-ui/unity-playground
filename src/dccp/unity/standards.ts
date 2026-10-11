/** One ceremony. Every conformant authenticator.
 * A second protocol that holds a secret or a document is not added.
 */

import { UNITY_PROTOCOL, WALLET_DOOR } from './unityid.ts'

export const ADOPTED = ['W3C WebAuthn'] as const

export const NOT_A_SECOND_DOOR = ['passwords', 'OAuth 2.0 bearer tokens', 'OpenID Connect tokens', 'SAML assertions'] as const

export function authStandards(): { adopted: readonly string[]; secondDoor: readonly string[]; stored: false } {
  return { adopted: ADOPTED, secondDoor: NOT_A_SECOND_DOOR, stored: false }
}

export function scope(): { seat: 'W3C WebAuthn / FIDO2'; assets: null } {
  return { seat: UNITY_PROTOCOL, assets: null }
}

export function scopeWords(): string {
  return 'The ceremony titles a seat on this device. It does not title an asset. You own what you made. The test-unit title stays with the father through the split, and the split is a draw. The unit is not a dollar. Fiat, gold, land, a security, and every other kind are not titled here. A look that is not held stays open. A time that was not witnessed is not filled. One ceremony does not become a deed for everything.'
}

export function standardsWords(): string {
  return `${WALLET_DOOR} The universal standard is one stack, and a bound Unity ID carries that name. The phone checks your face or your finger. This page does not store a password, a word list, or the check itself. W3C WebAuthn is the browser API. FIDO CTAP is how that browser talks to the phone. WebAuthn Level 3 became a W3C Recommendation on 25 August 2026. This page calls that API and asks the phone to verify you. The private key is not stored here. Passwords, OAuth bearer tokens, OpenID Connect tokens, and SAML assertions are a second door, because each one holds a secret or a document. A second door is not added.`
}
