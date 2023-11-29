import { TRPCError, initTRPC } from '@trpc/server'
import { Context } from './context'
import { COOKIE_NAME } from '@/lib/constants'
import { verifyToken as verify } from '@/lib/auth'

const t = initTRPC.context<Context>().create()

const isAuthed = t.middleware(async ({ ctx, next }) => {
  const { req } = ctx
  const token = req.cookies.get(COOKIE_NAME)?.value

  if (!token) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: '请先登陆' })
  }

  const verifyToken = await verify(token).catch(err => {
    throw new TRPCError({ code: 'FORBIDDEN', message: err.message })
  })

  const isAdmin = verifyToken?.isAdmin

  if (isAdmin !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: '没有权限' })
  }
  return next()
})

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthed)
