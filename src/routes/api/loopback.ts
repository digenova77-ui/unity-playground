import { createFileRoute } from '@tanstack/react-router'
import { echoBody } from '../../dccp/origin/loopback'

export const Route = createFileRoute('/api/loopback')({
  server: {
    handlers: {
      GET: async () => Response.json({ echo: 'The loopback is open. It returns what was sent. It does not run it.', ran: false }),
      POST: async ({ request }) => {
        const text = await request.text()
        const body = echoBody(text)
        const status = body.error === 'too long' ? 413 : body.error ? 400 : 200
        return Response.json(body, { status })
      },
    },
  },
})
