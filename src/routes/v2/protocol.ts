import { createFileRoute } from '@tanstack/react-router'
import { protocolBody } from '../../dccp/origin/ingress'

export const Route = createFileRoute('/v2/protocol')({
  server: { handlers: { GET: async () => Response.json(protocolBody()) } },
})
