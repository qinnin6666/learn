import { httpBatchLink } from '@trpc/client'

import { appRouter } from '@/server/routers'
import { db } from '@/db'

export const serverClient = appRouter.createCaller({
  // @ts-expect-error
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/api/trpc'
    })
  ],
  db
})


