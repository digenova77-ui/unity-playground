import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/chain')({
  beforeLoad: () => {
    throw redirect({ to: '/' })
  },
})
