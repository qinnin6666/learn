import TodoList from '@/components/TodoList'
import { AuthRequiredError } from '@/lib/exceptions'
import { serverClient } from './_trpc/serverClient'

const session = null

export default async function Home() {
  const todos = await serverClient.todo.getTodos()

  if (session === '333') throw new AuthRequiredError()
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {/* <p>hello world!</p> */}
      <TodoList initialTodos={todos} />
    </main>
  )
}
