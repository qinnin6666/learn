import { TRPCError, initTRPC } from '@trpc/server'
import { Context } from './context'

const t = initTRPC.context<Context>().create()

const isAuthed = t.middleware(async ({ ctx, next }) => {
  const req = ctx.req
  console.log(req, 111)

  //   if (!user || !user.id) {
  //     throw new TRPCError({ code: 'UNAUTHORIZED' })
  //   }

  return next({
    ctx: {
      user: 222
    }
  })
})

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthed)
