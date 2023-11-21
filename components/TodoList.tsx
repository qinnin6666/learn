'use client'
import { trpc } from '@/app/_trpc/client'

export default function TodoList() {
  const getTodos = trpc.getTodos.useQuery()

  if (!getTodos.data) return null

  return <div>{JSON.stringify(getTodos.data)}</div>
}
