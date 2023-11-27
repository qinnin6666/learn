import { serial, text, timestamp, pgTable } from 'drizzle-orm/pg-core'

export const user = pgTable('users', {
  id: serial('id').primaryKey().notNull(),
  name: text('name').unique(),
  password: text('password'),
  role: text('role').$type<'admin' | 'customer'>(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
})
