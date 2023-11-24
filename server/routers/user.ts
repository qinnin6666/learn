import { router, publicProcedure } from '../trpc'
import { z } from 'zod'

export const userRouter = router({
  list: publicProcedure.query(() => {
    return []
  }),
  login: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(opts => {
      console.log(opts.input)
    })
})
