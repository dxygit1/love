const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

const newDbUrl = process.env.DATABASE_URL;

const client = new Client({
    connectionString: newDbUrl,
    ssl: { rejectUnauthorized: false },
});

async function addSortOrder() {
    try {
        await client.connect();
        console.log('Connected to database');

        await client.query(`
            ALTER TABLE tags ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0;
        `);

        console.log('✅ Added sort_order column to tags table');
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.end();
    }
}

addSortOrder();
