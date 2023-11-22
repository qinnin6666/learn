import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { db, connection } from './'

async function main() {
  await migrate(db, { migrationsFolder: 'db/migrations' })
  await connection.end()
}

main()
