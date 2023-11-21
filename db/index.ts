import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

const host = process.env.PGHOST
const user = process.env.PGUSER
const password = process.env.PGPASSWORD
const database = process.env.PGPASSWORD

if (!host || !user || password || !database) {
  throw new Error('环境变量获取失败!')
}

const connectionString = `postgres://${user}:${password}@${host}/${database}`

// const connectionString = 'postgres://postgres:123@0.0.0.0:5434/nest'
const sql = postgres(connectionString, { max: 1 })
const db = drizzle(sql)

// await migrate(db, { migrationsFolder: 'drizzle' })
