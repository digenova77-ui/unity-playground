import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/fusion')({
  beforeLoad: () => {
    throw redirect({ to: '/' })
  },
})
