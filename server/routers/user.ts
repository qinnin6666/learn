import { TRPCError } from '@trpc/server'
import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { hash, verify } from 'argon2'
import { db } from '@/db'
import { user } from '@/db/schema'
import { sign } from 'jsonwebtoken'
import { COOKIE_NAME, MAX_AGE } from '../constants'
import { cookies } from 'next/headers'
import { eq } from 'drizzle-orm'
import { TRPC_ERROR_CODE_KEY } from '@trpc/server/rpc'

export const userRouter = router({
  list: publicProcedure.query(() => {
    return []
  }),
  register: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
        role: z.union([z.literal('admin'), z.literal('customer')])
      })
    )
    .mutation(async opts => {
      const { username, password, role } = opts.input
      const passwordHash = await hash(password)
      try {
        const backData = await db
          .insert(user)
          .values({
            name: username,
            password: passwordHash,
            role
          })
          .returning({
            id: user.id,
            name: user.name,
            role: user.role
          })

        const u = backData[0]
        const token = generateToken(u.name as string)
        setCookie(token)
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
  login: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async opts => {
      const { username, password } = opts.input

      const findUsers = await db.select().from(user).where(eq(user.name, username))
      if (findUsers.length === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: '未找到账号'
        })
      }

      const findUser = findUsers[0]
      if (await await verify(findUser.password as string, password)) {
        const token = generateToken(findUser.name as string)
        setCookie(token)
        return {
          id: findUser.id,
          name: findUser.name,
          role: findUser.role
        }
      }
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: '账号或密码错误'
      })
    })
})

function generateToken(username: string) {
  return sign({ sub: username }, process.env.JWT_SECRET, { expiresIn: MAX_AGE })
}

function setCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: MAX_AGE,
    path: '/'
  })
}
