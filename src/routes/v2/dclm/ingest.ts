import { createFileRoute } from '@tanstack/react-router'
import { ingestRequest } from '../../../dccp/origin/ingress'

export const Route = createFileRoute('/v2/dclm/ingest')({
  server: { handlers: { POST: async ({ request }) => ingestRequest(request) } },
})
