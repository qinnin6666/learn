import { z } from 'zod'
import { publicProcedure, router } from './trpc'
import { db } from '@/db'
import { todos } from '@/db/schema'

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string()
      })
    )
    .query(opts => {
      return {
        greeting: `hello ${opts.input.text}`
      }
    }),
  getTodos: publicProcedure.query(() => {
    // return [10, 20, 30, 40, 50]
    return db.select().from(todos)
  })
})

// export type definition of API
export type AppRouter = typeof appRouter
