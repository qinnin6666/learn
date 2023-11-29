import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import TodoList from '@/components/TodoList'
// import { serverClient } from '../_trpc/serverClient'

const page = async () => {
  // const todos = await serverClient.todo.getTodos()

  return (
    <MaxWidthWrapper>
      <TodoList />
    </MaxWidthWrapper>
  )
}

export default page
