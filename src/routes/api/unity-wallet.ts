import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { createFileRoute } from '@tanstack/react-router'
import { dumpBox, freshBox, fundWallet, loadBox, sendUnits, viewWallet, withdrawUnits, type UnityBox } from '../../dccp/meter/unitybox'

const FILE = join(process.cwd(), '.data', 'unity-wallet.json')

function readBox(): UnityBox {
  try {
    return loadBox(JSON.parse(readFileSync(FILE, 'utf8')))
  } catch {
    return freshBox()
  }
}

function writeBox(box: UnityBox): void {
  mkdirSync(dirname(FILE), { recursive: true })
  writeFileSync(FILE, JSON.stringify(dumpBox(box)))
}

function receipt(body: string): string {
  return createHash('sha256').update(body).digest('hex')
}

export const Route = createFileRoute('/api/unity-wallet')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const handle = new URL(request.url).searchParams.get('handle') ?? ''
        const view = viewWallet(readBox(), handle)
        if ('error' in view) return Response.json(view, { status: 400 })
        return Response.json({ handle, ...view })
      },
      POST: async ({ request }) => {
        const body = await request.json().catch(() => null) as { op?: string; handle?: string; deposit?: number; from?: string; to?: string; amount?: number } | null
        if (!body) return Response.json({ error: 'The wallet did not receive that.' }, { status: 400 })
        const box = readBox()
        if (body.op === 'open') {
          const opened = fundWallet(box, body.handle ?? '', Number(body.deposit ?? 0))
          if (!opened.ok) return Response.json(opened, { status: 400 })
          writeBox(box)
          const view = viewWallet(box, body.handle ?? '')
          return Response.json({ ok: true, handle: body.handle, balance: opened.balance, taken: opened.taken, transfers: 'transfers' in view ? view.transfers : [] })
        }
        if (body.op === 'withdraw') {
          const at = new Date().toISOString()
          const handle = body.handle ?? ''
          const held = viewWallet(box, handle)
          const amount = Number(body.amount) > 0 ? Number(body.amount) : ('balance' in held ? held.balance : 0)
          const line = `${handle}|seed|${amount}|${at}|${box.seq + 1}`
          const drawn = withdrawUnits(box, handle, amount, at, receipt(line))
          if (!drawn.ok) return Response.json(drawn, { status: 400 })
          writeBox(box)
          const view = viewWallet(box, handle)
          return Response.json({ ok: true, handle, balance: drawn.balance, returned: drawn.returned, transfers: 'transfers' in view ? view.transfers : [] })
        }
        if (body.op === 'send') {
          const at = new Date().toISOString()
          const amount = Number(body.amount)
          const line = `${body.from}|${body.to}|${amount}|${at}|${box.seq + 1}`
          const sent = sendUnits(box, body.from ?? '', body.to ?? '', amount, at, receipt(line))
          if (!sent.ok) return Response.json(sent, { status: 400 })
          writeBox(box)
          return Response.json({ ok: true, handle: body.from, balance: sent.balance, transfer: sent.transfer })
        }
        return Response.json({ error: 'That wallet action is not open.' }, { status: 400 })
      },
    },
  },
})
