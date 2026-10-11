import { createFileRoute } from '@tanstack/react-router'
import { listReceipts } from '../../dccp/origin/ingress'

export const Route = createFileRoute('/v2/receipts')({
  server: { handlers: { GET: async () => listReceipts() } },
})
