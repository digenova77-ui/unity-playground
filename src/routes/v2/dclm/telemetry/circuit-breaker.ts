import { createFileRoute } from '@tanstack/react-router'
import { breakerBody } from '../../../../dccp/origin/ingress'

export const Route = createFileRoute('/v2/dclm/telemetry/circuit-breaker')({
  server: { handlers: { GET: async () => Response.json(breakerBody()) } },
})
