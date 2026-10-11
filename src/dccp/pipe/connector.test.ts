import assert from 'node:assert/strict'
import { test } from 'node:test'
import { kernelPayload, transmitBoxToDCLM } from './connector.ts'

test('the connector stays inert until it is enabled with an endpoint', async () => {
  const closed = await transmitBoxToDCLM('box')
  assert.equal(closed.state, 'DROPPED')
  if (closed.state === 'DROPPED') assert.equal(closed.reason, 'DISABLED')
  const over = await transmitBoxToDCLM('x'.repeat(257), { enabled: true, endpoint: 'https://kernel.example/api/v2' })
  assert.equal(over.state, 'DROPPED')
  if (over.state === 'DROPPED') assert.equal(over.reason, 'OVERSIZE')
})

test('the kernel body is payload and flags zero, and nothing else', async () => {
  assert.equal(kernelPayload('scene-manifest:demo'), '{"payload":"scene-manifest:demo","flags":0}')
  let sent = ''
  let headers: Record<string, string> = {}
  await transmitBoxToDCLM('scene-manifest:demo', {
    enabled: true,
    endpoint: 'https://kernel.example/api/v2',
    fetchImpl: async (_url, init) => {
      sent = String(init?.body ?? '')
      headers = Object.fromEntries(new Headers(init?.headers).entries())
      return new Response(JSON.stringify({ accepted: true }), { status: 200 })
    },
  })
  assert.equal(sent, '{"payload":"scene-manifest:demo","flags":0}')
  assert.equal(headers['content-type'], 'application/json')
  assert.equal('x-trinity-mode' in headers, false)
})

test('a committed result requires accepted true, and a reject stays dropped', async () => {
  const ok = await transmitBoxToDCLM('dccpworld|module|demo|abc123', {
    enabled: true,
    endpoint: 'https://kernel.example/api/v2',
    fetchImpl: async () => new Response(JSON.stringify({ accepted: true }), { status: 200 }),
  })
  assert.equal(ok.state, 'COMMITTED')
  const no = await transmitBoxToDCLM('dccpworld|module|demo|abc123', {
    enabled: true,
    endpoint: 'https://kernel.example/api/v2',
    fetchImpl: async () => new Response(JSON.stringify({ accepted: false, reason: 'KERNEL_UNAVAILABLE' }), { status: 503 }),
  })
  assert.equal(no.state, 'DROPPED')
})
