const BASE = process.env.ORIGIN ?? 'http://127.0.0.1:8080'
const LAW = ['NO_FORCE', 'HOST_SAFE', 'CLEANUP_FIRST', 'TRUTH_OR_NOTHING']

async function call(path, method = 'GET', body) {
  const res = await fetch(BASE + path, {
    method,
    headers: body ? { 'content-type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })
  return [res.status, await res.json()]
}

function check(condition, message) {
  if (!condition) throw new Error(message)
}

const clean = { api_version: '2', law: LAW, authority: 'NONE', pii_coefficient: 0, nodes: 8 }
let [status, body] = await call('/health')
check(status === 200 && body.ok === true && body.pii_coefficient === 0, 'health')
;[status, body] = await call('/v2/dclm/sandbox/execute', 'POST', clean)
check(status === 200 && body.verdict === 'SEE' && body.authority === 'NONE', 'clean request admitted')
check(body.receipt.length === 64 && body.input_hash.length === 64, 'receipt is SHA-256')
;[status, body] = await call('/v2/dclm/sandbox/execute', 'POST', { ...clean, name: 'must-not-be-stored' })
check(status === 400 && body.verdict === 'HOLE', 'PII rejected')
;[status, body] = await call('/v2/dclm/ingest', 'POST', { source: 'unity', payload: { nested: { email: 'must-not-be-stored' } } })
check(status === 400 && body.verdict === 'HOLE', 'nested PII rejected')
;[status, body] = await call('/v2/dclm/ingest', 'POST', { source: 'unity', payload: clean })
check(status === 200 && body.verdict === 'SEE' && body.ingress === 'unity', 'Unity ingress admitted')
;[status, body] = await call('/v2/dclm/ingest', 'POST', { source: 'unknown', payload: clean })
check(status === 422 && body.verdict === 'HOLE', 'unknown ingress rejected')
;[status, body] = await call('/v2/protocol')
check(status === 200 && body.protocol === 'DCLM-MACHINE/2', 'protocol declaration available')
check(body.write_authority === false && body.auth.verifier === 'NOT_DEPLOYED', 'protocol stays fail-closed')
;[status, body] = await call('/v2/dclm/sandbox/execute', 'POST', { ...clean, law: LAW.slice(0, -1) })
check(status === 422 && body.verdict === 'HOLE', 'law drift rejected')
;[status, body] = await call('/v2/dclm/sandbox/execute', 'POST', { ...clean, authority: 'FATHER' })
check(status === 422 && body.verdict === 'HOLE', 'authority is not granted by origin')
;[status, body] = await call('/v2/receipts')
check(status === 200 && body.count >= 4, 'receipts are measurable')
;[status, body] = await call('/v2/dclm/session/purge', 'POST')
check(status === 200 && body.verdict === 'CLEANED', 'purge')
;[status, body] = await call('/v2/receipts')
check(status === 200 && body.count === 0 && body.tip === null, 'purge removes receipts')
console.log('origin smoke: PASS')
