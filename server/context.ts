import { NextRequest } from 'next/server'
import { db } from '@/db'

export async function createContext(req: NextRequest) {
  return {
    req,
    db
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
