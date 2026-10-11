import { createFileRoute } from '@tanstack/react-router'
import { feedUrl, weatherFromMet } from '../../dccp/live/proxy'
import { readSheet } from '../../dccp/live/sheet'
import { readBoard } from '../../dccp/pack/hudl'

export const Route = createFileRoute('/api/live')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const q = new URL(request.url).searchParams
        const feed = q.get('feed') ?? ''
        const id = q.get('id') ?? ''
        const lat = Number(q.get('lat') ?? '44.18')
        const lon = Number(q.get('lon') ?? '-77.36')
        const target = feedUrl(feed, lat, lon, id)
        if (!target) return Response.json({ error: 'that feed is not open' }, { status: 404 })
        const ctrl = new AbortController()
        const timer = setTimeout(() => ctrl.abort(), feed.startsWith('wb') ? 14_000 : 9_000)
        try {
          const res = await fetch(target.url, { signal: ctrl.signal, headers: target.headers, cache: 'no-store' })
          if (!res.ok) return Response.json({ error: `upstream ${res.status}` }, { status: 502 })
          if (feed === 'sheet') {
            const html = await res.text()
            return Response.json(readSheet(html, id, new Date().toISOString()))
          }
          if (feed === 'posted') return Response.json({ status: res.status, url: res.url, at: new Date().toISOString() })
          const json = await res.json()
          if (feed === 'board') return Response.json(readBoard(json, new Date().toISOString()))
          if (feed === 'weather') {
            const shaped = weatherFromMet(json)
            if (!shaped) return Response.json({ error: 'no temperature' }, { status: 502 })
            return Response.json(shaped)
          }
          return Response.json(json)
        } catch {
          return Response.json({ error: 'the feed did not answer' }, { status: 502 })
        } finally {
          clearTimeout(timer)
        }
      },
    },
  },
})
