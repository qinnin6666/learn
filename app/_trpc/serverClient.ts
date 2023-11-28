import { httpBatchLink } from '@trpc/client'

import { appRouter } from '@/server/routers'

export const serverClient = appRouter.createCaller({
  // @ts-expect-error
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/api/trpc'
    })
  ]
})
