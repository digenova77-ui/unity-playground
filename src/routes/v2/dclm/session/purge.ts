import { createFileRoute } from '@tanstack/react-router'
import { purgeReceipts } from '../../../../dccp/origin/ingress'

export const Route = createFileRoute('/v2/dclm/session/purge')({
  server: { handlers: { POST: async () => purgeReceipts() } },
})
