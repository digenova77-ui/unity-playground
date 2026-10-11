import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { mountDesk } from '@/dccp/gate/desk'
import '@/dccp/styles/main.css'

export const Route = createFileRoute('/')({ component: Front })

function Front() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    if (root.current) mountDesk(root.current)
  }, [])
  return <main className="desk-root" ref={root} />
}
