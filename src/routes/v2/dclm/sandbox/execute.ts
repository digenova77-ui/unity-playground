import { createFileRoute } from '@tanstack/react-router'
import { executeRequest } from '../../../../dccp/origin/ingress'

export const Route = createFileRoute('/v2/dclm/sandbox/execute')({
  server: { handlers: { POST: async ({ request }) => executeRequest(request) } },
})
