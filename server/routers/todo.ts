import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { db } from '@/db'
import { todos } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const todoRouter = router({
  getTodos: publicProcedure.query(async () => {
    return await db.select().from(todos).orderBy(todos.id)
  }),
  addTodo: publicProcedure.input(z.string()).mutation(async opts => {
    await db.insert(todos).values({
      content: opts.input,
      done: 0
    })
    return true
  }),
  setDone: publicProcedure
    .input(z.object({ id: z.number(), done: z.number() }))
    .mutation(async opts => {
      const { id, done } = opts.input
      await db.update(todos).set({ id, done }).where(eq(todos.id, id))
      return true
    })
})
