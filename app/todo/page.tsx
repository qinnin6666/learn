import TodoList from '@/components/TodoList'
import { serverClient } from '../_trpc/serverClient'

const page = async () => {
  const todos = await serverClient.todo.getTodos()

  return (
    <div>
      <TodoList initialTodos={todos} />
    </div>
  )
}

export default page
