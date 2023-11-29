import { TRPCError, initTRPC } from '@trpc/server'
import { Context } from './context'

const t = initTRPC.context<Context>().create()

const isAuthed = t.middleware(async ({ ctx, next }) => {
  const { isAdmin } = ctx
  console.log(12, isAdmin)

  if (isAdmin !== 'admin') {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: '没有权限' })
  }
  return next()
})

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthed)
