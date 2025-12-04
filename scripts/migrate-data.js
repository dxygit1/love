const { Client } = require('pg');

// Old database credentials
const OLD_DB_URL = 'postgresql://postgres.lkpogdzgvxhbpycibuiw:Z4S38ad!cF_LdWa@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres';

// New database credentials (from .env.local)
const NEW_DB_URL = 'postgresql://postgres.frehbtwvovyquohrngot:Z4S38ad!cF_LdWa@aws-0-us-west-2.pooler.supabase.com:6543/postgres';

async function migrateData() {
    const oldClient = new Client({
        connectionString: OLD_DB_URL,
        ssl: { rejectUnauthorized: false },
    });

    const newClient = new Client({
        connectionString: NEW_DB_URL,
        ssl: { rejectUnauthorized: false },
    });

    try {
        await oldClient.connect();
        await newClient.connect();
        console.log('✅ Connected to both databases');

        // 1. Migrate profiles
        console.log('\n📋 Migrating profiles...');
        const profilesResult = await oldClient.query('SELECT * FROM profiles');
        if (profilesResult.rows.length > 0) {
            for (const profile of profilesResult.rows) {
                await newClient.query(
                    `INSERT INTO profiles (id, email, full_name, avatar_url, password_hash, plan, subscription_status, subscription_id, customer_id, current_period_end, usage_limit, updated_at)
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                     ON CONFLICT (id) DO UPDATE SET
                        email = EXCLUDED.email,
                        full_name = EXCLUDED.full_name,
                        avatar_url = EXCLUDED.avatar_url,
                        password_hash = EXCLUDED.password_hash,
                        plan = EXCLUDED.plan,
                        subscription_status = EXCLUDED.subscription_status,
                        usage_limit = EXCLUDED.usage_limit`,
                    [
                        profile.id,
                        profile.email,
                        profile.full_name,
                        profile.avatar_url,
                        profile.password_hash,
                        profile.plan || 'free',
                        profile.subscription_status || 'active',
                        profile.subscription_id,
                        profile.customer_id,
                        profile.current_period_end,
                        profile.usage_limit || 30,
                        profile.updated_at || new Date()
                    ]
                );
            }
            console.log(`✅ Migrated ${profilesResult.rows.length} profiles`);
        }

        // 2. Migrate tags (before bookmarks, for foreign key)
        console.log('\n🏷️  Migrating tags...');
        const tagsResult = await oldClient.query('SELECT * FROM tags');
        if (tagsResult.rows.length > 0) {
            for (const tag of tagsResult.rows) {
                await newClient.query(
                    `INSERT INTO tags (id, user_id, name, created_at)
                     VALUES ($1, $2, $3, $4)
                     ON CONFLICT (user_id, name) DO NOTHING`,
                    [tag.id, tag.user_id, tag.name, tag.created_at]
                );
            }
            console.log(`✅ Migrated ${tagsResult.rows.length} tags`);
        }

        // 3. Migrate bookmarks
        console.log('\n🔖 Migrating bookmarks...');
        const bookmarksResult = await oldClient.query('SELECT * FROM bookmarks');
        if (bookmarksResult.rows.length > 0) {
            for (const bookmark of bookmarksResult.rows) {
                await newClient.query(
                    `INSERT INTO bookmarks (id, user_id, title, url, description, favicon_url, created_at)
                     VALUES ($1, $2, $3, $4, $5, $6, $7)
                     ON CONFLICT (id) DO UPDATE SET
                        title = EXCLUDED.title,
                        url = EXCLUDED.url,
                        description = EXCLUDED.description,
                        favicon_url = EXCLUDED.favicon_url`,
                    [
                        bookmark.id,
                        bookmark.user_id,
                        bookmark.title,
                        bookmark.url,
                        bookmark.description,
                        bookmark.favicon_url,
                        bookmark.created_at
                    ]
                );
            }
            console.log(`✅ Migrated ${bookmarksResult.rows.length} bookmarks`);
        }

        // 4. Migrate bookmark_tags
        console.log('\n🔗 Migrating bookmark-tag relationships...');
        const bookmarkTagsResult = await oldClient.query('SELECT * FROM bookmark_tags');
        if (bookmarkTagsResult.rows.length > 0) {
            for (const bt of bookmarkTagsResult.rows) {
                await newClient.query(
                    `INSERT INTO bookmark_tags (bookmark_id, tag_id)
                     VALUES ($1, $2)
                     ON CONFLICT (bookmark_id, tag_id) DO NOTHING`,
                    [bt.bookmark_id, bt.tag_id]
                );
            }
            console.log(`✅ Migrated ${bookmarkTagsResult.rows.length} bookmark-tag relationships`);
        }

        // 5. Migrate ai_usage_logs
        console.log('\n📊 Migrating AI usage logs...');
        const logsResult = await oldClient.query('SELECT * FROM ai_usage_logs');
        if (logsResult.rows.length > 0) {
            for (const log of logsResult.rows) {
                await newClient.query(
                    `INSERT INTO ai_usage_logs (id, user_id, endpoint, success, error_message, tokens_used, created_at)
                     VALUES ($1, $2, $3, $4, $5, $6, $7)
                     ON CONFLICT (id) DO NOTHING`,
                    [
                        log.id,
                        log.user_id,
                        log.endpoint,
                        log.success,
                        log.error_message,
                        log.tokens_used,
                        log.created_at
                    ]
                );
            }
            console.log(`✅ Migrated ${logsResult.rows.length} AI usage logs`);
        }

        console.log('\n🎉 Data migration completed successfully!');

    } catch (err) {
        console.error('❌ Migration error:', err);
    } finally {
        await oldClient.end();
        await newClient.end();
    }
}

migrateData();
