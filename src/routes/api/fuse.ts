import { createFileRoute } from '@tanstack/react-router'
import { FUSE_MARK, fuseSeat } from '../../dccp/unity/fuse'

export const Route = createFileRoute('/api/fuse')({
  server: {
    handlers: {
      GET: async () => {
        const seat = fuseSeat(null)
        return Response.json({
          front: seat.front,
          bind: seat.bind,
          back: seat.back,
          mark: FUSE_MARK,
          till: seat.till,
          meritMoves: seat.meritMoves,
        })
      },
    },
  },
})
