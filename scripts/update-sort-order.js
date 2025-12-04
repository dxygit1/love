const { Client } = require('pg');

// Old database credentials
const OLD_DB_URL = 'postgresql://postgres.lkpogdzgvxhbpycibuiw:Z4S38ad!cF_LdWa@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres';

// New database credentials
const NEW_DB_URL = 'postgresql://postgres.frehbtwvovyquohrngot:Z4S38ad!cF_LdWa@aws-0-us-west-2.pooler.supabase.com:6543/postgres';

async function updateTagsSortOrder() {
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

        // Get tags with sort_order from old database
        console.log('\n🏷️  Updating tags sort_order...');
        const tagsResult = await oldClient.query('SELECT id, sort_order FROM tags');

        for (const tag of tagsResult.rows) {
            await newClient.query(
                `UPDATE tags SET sort_order = $1 WHERE id = $2`,
                [tag.sort_order || 0, tag.id]
            );
        }

        console.log(`✅ Updated sort_order for ${tagsResult.rows.length} tags`);

    } catch (err) {
        console.error('❌ Error:', err);
    } finally {
        await oldClient.end();
        await newClient.end();
    }
}

updateTagsSortOrder();
