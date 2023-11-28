import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

export async function createContext(opts: FetchCreateContextFnOptions) {
  return {
    token: 111
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
