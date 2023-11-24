import { TRPCError } from '@trpc/server'
import { router, publicProcedure } from '../trpc'
import { z } from 'zod'

export const userRouter = router({
  list: publicProcedure.query(() => {
    return []
  }),
  login: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(opts => {
      console.log(222, opts.input)
      if (opts.input.username !== 'admin') {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: '账号或密码错误'
        })
      }
      return {
        json: 'sssss'
      }
    })
})
