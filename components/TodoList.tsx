'use client'
import { trpc } from '@/app/_trpc/client'
import { useState } from 'react'
import { serverClient } from '../app/_trpc/serverClient'

export default function TodoList() {
  //   {
  //   initialTodos
  // }: {
  //   initialTodos: Awaited<ReturnType<(typeof serverClient.todo)['getTodos']>>
  // }
  const {
    data: todoList,
    isError,
    error,
    refetch
  } = trpc.todo.getTodos.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false
  })
  const addTodo = trpc.todo.addTodo.useMutation({
    onSettled: () => {
      refetch()
    }
  })
  const setDone = trpc.todo.setDone.useMutation({
    onSettled: () => {
      refetch()
    }
  })

  const [content, setContent] = useState('')

  if (isError) return <div>{error.message}</div>

  return (
    <div>
      <div className="text-black my-5 text-3xl">
        {todoList?.map(todo => (
          <div key={todo.id} className="flex gap-3 items-center">
            <input
              id={`check-${todo.id}`}
              type="checkbox"
              checked={!!todo.done}
              style={{ zoom: 1.5 }}
              onChange={async () => {
                setDone.mutate({
                  id: todo.id,
                  done: todo.done ? 0 : 1
                })
              }}
            />
            <label htmlFor={`check-${todo.id}`}>{todo.content}</label>
          </div>
        ))}
      </div>

      <div className="flex gap-3 items-center">
        <label htmlFor="content">Content</label>
        <input
          id="content"
          name="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          className="flex-grow text-black bg-white rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-4 py-2"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={async () => {
            if (content.length) {
              addTodo.mutate(content)
              setContent('')
            }
          }}
        >
          Add Todo
        </button>
      </div>
    </div>
  )
}
