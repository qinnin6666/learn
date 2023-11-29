import { TRPCError } from '@trpc/server'
import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { hash, verify } from 'argon2'
import { user } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { TRPC_ERROR_CODE_KEY } from '@trpc/server/rpc'
import { generateToken } from '@/lib/auth'
import { loginSetCookie, logoutClearCookie } from '@/lib/cookie'

const Role = z.union([z.literal('admin'), z.literal('customer')])

const userProcedure = publicProcedure
  .input(
    z.object({
      username: z.string(),
      password: z.string()
    })
  )
  .output(
    z.object({
      id: z.number(),
      name: z.string(),
      role: Role
    })
  )

export const userRouter = router({
  list: publicProcedure.query(() => {
    return []
  }),
  register: userProcedure
    .input(
      z.object({
        role: Role
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { username, password, role } = input
      const passwordHash = await hash(password)
      try {
        const backData = await ctx.db
          .insert(user)
          .values({
            name: username,
            password: passwordHash,
            role
          })
          .returning()

        const u = backData[0]
        const token = await generateToken(u.name, u.role)
        loginSetCookie(token)
        return u
      } catch (err) {
        const e = err as Error
        const errRes: {
          code: TRPC_ERROR_CODE_KEY
          message: string
        } = {
          code: 'CONFLICT',
          message: e.message
        }

        if (e.message.includes('users_name_unique')) {
          errRes.code = 'INTERNAL_SERVER_ERROR'
          errRes.message = '账号已注册'
        }
        throw new TRPCError(errRes)
      }
    }),
  login: userProcedure.mutation(async ({ input, ctx }) => {
    const { username, password } = input

    const findUsers = await ctx.db.select().from(user).where(eq(user.name, username))
    if (findUsers.length === 0) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: '未找到账号'
      })
    }

    const findUser = findUsers[0]
    if (await await verify(findUser.password as string, password)) {
      const token = await generateToken(findUser.name, findUser.role)
      loginSetCookie(token)
      return findUser
    }
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: '账号或密码错误'
    })
  }),
  logout: publicProcedure.mutation(() => {
    logoutClearCookie()
  })
})
