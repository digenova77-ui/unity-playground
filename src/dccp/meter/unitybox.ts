/** Unity test-unit wallet. A send moves units between handles.
 * Not eFuse. Not a dollar. The swarm pool is not this box.
 * A move is admitted only when the three rings hold and the seed is the one seed.
 */

import { coinSecurity, moveCoin } from './coins.ts'

export function admitRings(security: { rings: number; seed: string | null } = coinSecurity()): { ok: true } | { ok: false; error: string } {
  if (security.rings !== 3 || !security.seed) return { ok: false, error: 'A ring did not close. The coins do not move.' }
  return { ok: true }
}

export const HANDLE = /^unity:[a-z0-9][a-z0-9.-]{6,78}$/
const CAP = 100

export interface UnityTransfer {
  id: string
  from: string
  to: string
  amount: number
  at: string
  receipt: string
}

interface Account {
  balance: number
  seeded: boolean
}

export interface UnityBox {
  accounts: Map<string, Account>
  transfers: UnityTransfer[]
  seq: number
}

export function freshBox(): UnityBox {
  return { accounts: new Map(), transfers: [], seq: 0 }
}

function account(box: UnityBox, handle: string): Account {
  const row = box.accounts.get(handle)
  if (row) return row
  const next = { balance: 0, seeded: false }
  box.accounts.set(handle, next)
  return next
}

export function fundWallet(box: UnityBox, handle: string, offered: number): { ok: true; balance: number; taken: number } | { ok: false; error: string } {
  const gate = moveCoin('Merit')
  if (!gate.ok) return gate
  if (!HANDLE.test(handle)) return { ok: false, error: 'That is not a Unity handle.' }
  const row = account(box, handle)
  if (row.seeded) return { ok: true, balance: row.balance, taken: 0 }
  const taken = Math.max(0, Math.min(CAP, Math.floor(offered)))
  row.balance += taken
  row.seeded = true
  return { ok: true, balance: row.balance, taken }
}

export function sendUnits(box: UnityBox, from: string, to: string, amount: number, at: string, receipt: string): { ok: true; balance: number; transfer: UnityTransfer } | { ok: false; error: string } {
  const gate = moveCoin('Merit')
  if (!gate.ok) return gate
  if (!HANDLE.test(from) || !HANDLE.test(to)) return { ok: false, error: 'Both handles have to be Unity handles.' }
  if (from === to) return { ok: false, error: 'A handle cannot send to itself.' }
  if (!Number.isInteger(amount) || amount < 1) return { ok: false, error: 'The amount is a whole unit, at least 1.' }
  const sender = account(box, from)
  if (sender.balance < amount) return { ok: false, error: 'The wallet does not hold that many units.' }
  const recipient = account(box, to)
  sender.balance -= amount
  recipient.balance += amount
  box.seq += 1
  const transfer: UnityTransfer = { id: `unity.${box.seq}`, from, to, amount, at, receipt }
  box.transfers.push(transfer)
  return { ok: true, balance: sender.balance, transfer }
}

export function withdrawUnits(box: UnityBox, handle: string, amount: number, at: string, receipt: string): { ok: true; balance: number; returned: number; transfer: UnityTransfer } | { ok: false; error: string } {
  const gate = moveCoin('Merit')
  if (!gate.ok) return gate
  if (!HANDLE.test(handle)) return { ok: false, error: 'That is not a Unity handle.' }
  const row = account(box, handle)
  const take = Math.floor(amount)
  if (!Number.isInteger(take) || take < 1) return { ok: false, error: 'Nothing is in the wallet to withdraw.' }
  if (row.balance < take) return { ok: false, error: 'The wallet does not hold that many units.' }
  row.balance -= take
  if (row.balance === 0) row.seeded = false
  box.seq += 1
  const transfer: UnityTransfer = { id: `unity.${box.seq}`, from: handle, to: 'seed', amount: take, at, receipt }
  box.transfers.push(transfer)
  return { ok: true, balance: row.balance, returned: take, transfer }
}

export function dumpBox(box: UnityBox): { seq: number; accounts: [string, Account][]; transfers: UnityTransfer[] } {
  return { seq: box.seq, accounts: [...box.accounts], transfers: box.transfers }
}

export function loadBox(raw: unknown): UnityBox {
  const box = freshBox()
  if (!raw || typeof raw !== 'object') return box
  const row = raw as { seq?: unknown; accounts?: unknown; transfers?: unknown }
  box.seq = typeof row.seq === 'number' && row.seq >= 0 ? Math.floor(row.seq) : 0
  if (Array.isArray(row.accounts)) {
    for (const entry of row.accounts) {
      if (!Array.isArray(entry) || typeof entry[0] !== 'string') continue
      const accountRow = entry[1] as Account
      if (!accountRow || typeof accountRow.balance !== 'number') continue
      box.accounts.set(entry[0], { balance: Math.max(0, Math.floor(accountRow.balance)), seeded: accountRow.seeded === true })
    }
  }
  if (Array.isArray(row.transfers)) {
    for (const item of row.transfers) {
      if (!item || typeof item !== 'object') continue
      const transfer = item as UnityTransfer
      if (typeof transfer.id !== 'string' || typeof transfer.from !== 'string' || typeof transfer.amount !== 'number') continue
      box.transfers.push(transfer)
    }
  }
  return box
}

export function viewWallet(box: UnityBox, handle: string): { balance: number; transfers: UnityTransfer[] } | { error: string } {
  if (!HANDLE.test(handle)) return { error: 'That is not a Unity handle.' }
  const row = box.accounts.get(handle)
  const transfers = box.transfers.filter(item => item.from === handle || item.to === handle).slice(-12).reverse()
  return { balance: row?.balance ?? 0, transfers }
}
