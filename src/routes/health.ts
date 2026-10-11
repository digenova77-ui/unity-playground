import { createFileRoute } from '@tanstack/react-router'
import { healthBody } from '../dccp/origin/ingress'

export const Route = createFileRoute('/health')({
  server: { handlers: { GET: async () => Response.json(healthBody()) } },
})
