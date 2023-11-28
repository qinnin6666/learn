import { serial, text, timestamp, pgTable } from 'drizzle-orm/pg-core'

export const user = pgTable('users', {
  id: serial('id').primaryKey().notNull(),
  name: text('name').unique().notNull(),
  password: text('password').notNull(),
  role: text('role').$type<'admin' | 'customer'>().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow()
})
