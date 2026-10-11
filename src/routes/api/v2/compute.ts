import { createFileRoute } from '@tanstack/react-router'
import { DEFAULT_MAX_PAYLOAD_BYTES, kernelPayload } from '../../../dccp/pipe/connector'

/** Same call the gateway console makes. JSON only. payload string. flags 0. */

const KERNEL_COMPUTE = 'https://dualiscapax.ai/api/v2/compute'

export const Route = createFileRoute('/api/v2/compute')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const type = request.headers.get('content-type') ?? ''
        if (!type.includes('application/json')) {
          return Response.json({ accepted: false, reason: 'JSON_CONTENT_TYPE_REQUIRED' }, { status: 415 })
        }
        let parsed: unknown
        try {
          parsed = await request.json()
        } catch {
          return Response.json({ accepted: false, reason: 'INVALID_JSON' }, { status: 400 })
        }
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
          return Response.json({ accepted: false, reason: 'PAYLOAD_REQUIRED' }, { status: 400 })
        }
        const row = parsed as { payload?: unknown; flags?: unknown }
        if (typeof row.payload !== 'string' || row.payload.length === 0) {
          return Response.json({ accepted: false, reason: 'PAYLOAD_REQUIRED' }, { status: 400 })
        }
        if (row.flags !== 0) {
          return Response.json({ accepted: false, reason: 'FLAGS_MUST_BE_ZERO' }, { status: 400 })
        }
        if (new TextEncoder().encode(row.payload).length > DEFAULT_MAX_PAYLOAD_BYTES) {
          return Response.json({ accepted: false, reason: 'PAYLOAD_TOO_LARGE', maxPayloadBytes: DEFAULT_MAX_PAYLOAD_BYTES }, { status: 413 })
        }
        try {
          const upstream = await fetch(KERNEL_COMPUTE, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: kernelPayload(row.payload),
          })
          const answered = await upstream.text()
          return new Response(answered, { status: upstream.status, headers: { 'content-type': 'application/json; charset=utf-8' } })
        } catch {
          return Response.json({ accepted: false, reason: 'KERNEL_UNAVAILABLE' }, { status: 503 })
        }
      },
    },
  },
})