import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'
import { todos } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const todoRouter = router({
  getTodos: protectedProcedure.query(async ({ ctx }) => {
    console.log(ctx.db)
    return await ctx.db.select().from(todos).orderBy(todos.id)
  }),
  addTodo: protectedProcedure.input(z.string()).mutation(async ({ctx, input}) => {
    await ctx.db.insert(todos).values({
      content: input,
      done: 0
    })
    return true
  }),
  setDone: protectedProcedure
    .input(z.object({ id: z.number(), done: z.number() }))
    .mutation(async ({ctx, input}) => {
      const { id, done } = input
      await ctx.db.update(todos).set({ id, done }).where(eq(todos.id, id))
      return true
    })
})
