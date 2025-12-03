import { pgTable, text, timestamp, uuid, primaryKey, unique } from 'drizzle-orm/pg-core'

// Profiles Table
export const profiles = pgTable('profiles', {
    id: uuid('id').primaryKey().notNull(),
    email: text('email'),
    full_name: text("full_name"),
    avatar_url: text("avatar_url"),
    password_hash: text("password_hash"),
    updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
})

// Bookmarks Table
export const bookmarks = pgTable('bookmarks', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    userId: uuid('user_id').notNull().references(() => profiles.id, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    url: text('url').notNull(),
    description: text('description'),
    faviconUrl: text('favicon_url'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

// Tags Table
export const tags = pgTable('tags', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    userId: uuid('user_id').notNull().references(() => profiles.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    sortOrder: text('sort_order'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
    uniqueUserTag: unique().on(table.userId, table.name),
}))

// Bookmark Tags Junction Table
export const bookmarkTags = pgTable('bookmark_tags', {
    bookmarkId: uuid('bookmark_id').notNull().references(() => bookmarks.id, { onDelete: 'cascade' }),
    tagId: uuid('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
}, (table) => ({
    pk: primaryKey({ columns: [table.bookmarkId, table.tagId] }),
}))

// AI Usage Logs Table
export const aiUsageLogs = pgTable('ai_usage_logs', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    userId: uuid('user_id').notNull().references(() => profiles.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    endpoint: text('endpoint').notNull(), // 'classify', 'summary', etc.
    success: text('success').notNull(), // 'true' or 'false' as text
    errorMessage: text('error_message'),
    tokensUsed: text('tokens_used'), // stored as text, parse to int when needed
})

// User Metadata Table
export const userMetadata = pgTable('user_metadata', {
    userId: uuid('user_id').primaryKey().notNull().references(() => profiles.id, { onDelete: 'cascade' }),
    isAdmin: text('is_admin').default('false').notNull(), // 'true' or 'false' as text
    monthlyAiLimit: text('monthly_ai_limit').default('30').notNull(), // stored as text
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

