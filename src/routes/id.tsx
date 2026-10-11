import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/id')({
  beforeLoad: () => {
    throw redirect({ to: '/' })
  },
})
