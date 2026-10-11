import { createFileRoute } from '@tanstack/react-router'
import { capabilitiesBody } from '../../dccp/origin/ingress'

export const Route = createFileRoute('/v2/capabilities')({
  server: { handlers: { GET: async () => Response.json(capabilitiesBody()) } },
})
