/** The object and telemetry database is named in Amsterdam.
 * The host below answered on port 80. No row was read.
 * This page holds no login.
 */

export const AMSTERDAM = {
  place: 'Amsterdam',
  host: '45.76.33.16',
  role: 'objects and telemetrics',
  http: 'open',
  tls: 'failed',
  postgres: 'closed',
  rows: 0,
} as const

export function amsterdamStore(): {
  place: 'Amsterdam'
  host: '45.76.33.16'
  role: 'objects and telemetrics'
  connected: false
  rows: 0
  words: string
} {
  return {
    place: AMSTERDAM.place,
    host: AMSTERDAM.host,
    role: AMSTERDAM.role,
    connected: false,
    rows: 0,
    words: `The database for objects and telemetrics is in Amsterdam. The host that answered is ${AMSTERDAM.host}. Port 80 is open and points at https. The TLS handshake failed from here. The database port did not open. No login is held on this page. No object row and no telemetry row were read. A live pass is still not stored here. The New Jersey address is the world hang, not this database.`,
  }
}
