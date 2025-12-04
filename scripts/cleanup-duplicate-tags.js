const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

async function cleanupDuplicateTags() {
    try {
        await client.connect();
        console.log('✅ Connected to database\n');

        // Step 1: Fetch all tags with details
        const result = await client.query(`
            SELECT id, name, user_id, sort_order, created_at 
            FROM tags 
            ORDER BY user_id, name, created_at ASC
        `);

        console.log(`📊 Found ${result.rows.length} total tags\n`);

        // Step 2: Group by user_id and name, identify duplicates
        const tagsByUserAndName = {};
        const tagsToDelete = [];

        result.rows.forEach(tag => {
            const key = `${tag.user_id}:${tag.name}`;

            if (!tagsByUserAndName[key]) {
                // First occurrence, keep it
                tagsByUserAndName[key] = tag;
            } else {
                // Duplicate, mark for deletion
                console.log(`🔍 Found duplicate: "${tag.name}" (id: ${tag.id}, created: ${tag.created_at})`);
                tagsToDelete.push(tag.id);
            }
        });

        // Step 3: Delete duplicates
        if (tagsToDelete.length > 0) {
            console.log(`\n🗑️  Deleting ${tagsToDelete.length} duplicate tags...`);

            await client.query(`
                DELETE FROM tags 
                WHERE id = ANY($1)
            `, [tagsToDelete]);

            console.log('✅ Duplicates deleted\n');
        } else {
            console.log('✅ No duplicates found\n');
        }

        // Step 4: Reorder tags by user
        const userTags = {};
        Object.values(tagsByUserAndName).forEach(tag => {
            if (!userTags[tag.user_id]) {
                userTags[tag.user_id] = [];
            }
            userTags[tag.user_id].push(tag);
        });

        console.log('🔄 Reassigning sort_order for each user...\n');

        for (const [userId, tags] of Object.entries(userTags)) {
            // Sort by original sort_order, then by created_at
            tags.sort((a, b) => {
                if (a.sort_order !== b.sort_order) {
                    return parseInt(a.sort_order) - parseInt(b.sort_order);
                }
                return new Date(a.created_at) - new Date(b.created_at);
            });

            // Reassign sequential sort_order
            for (let i = 0; i < tags.length; i++) {
                await client.query(`
                    UPDATE tags 
                    SET sort_order = $1 
                    WHERE id = $2
                `, [i.toString(), tags[i].id]);
            }

            console.log(`  User ${userId}: Reordered ${tags.length} tags`);
        }

        // Step 5: Verify final state
        console.log('\n📋 Final tag order:');
        const finalResult = await client.query(`
            SELECT name, sort_order 
            FROM tags 
            ORDER BY sort_order ASC
        `);

        finalResult.rows.forEach(row => {
            console.log(`  ${row.sort_order}: ${row.name}`);
        });

        console.log('\n✅ Cleanup complete!');

    } catch (err) {
        console.error('❌ Error:', err);
    } finally {
        await client.end();
    }
}

cleanupDuplicateTags();
