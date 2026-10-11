import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/pyramid')({
  beforeLoad: () => {
    throw redirect({ to: '/' })
  },
})
