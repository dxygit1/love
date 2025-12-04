const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('DATABASE_URL is not defined in .env.local');
    process.exit(1);
}

const client = new Client({
    connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

const policySQL = `
  -- Add INSERT policy for ai_usage_logs
  DROP POLICY IF EXISTS "Allow insert AI usage logs" ON public.ai_usage_logs;
  
  CREATE POLICY "Allow insert AI usage logs" ON public.ai_usage_logs
    FOR INSERT WITH CHECK (true);

  -- Add INSERT policy for payment_logs (for webhooks)
  DROP POLICY IF EXISTS "Allow insert payment logs" ON public.payment_logs;
  
  CREATE POLICY "Allow insert payment logs" ON public.payment_logs
    FOR INSERT WITH CHECK (true);
`;

async function fixPolicies() {
    try {
        await client.connect();
        console.log('✅ Connected to database');

        console.log('📝 Adding INSERT policies...');
        await client.query(policySQL);

        console.log('✅ INSERT policies added successfully!');
        console.log('');
        console.log('Now AI usage tracking should work correctly.');
    } catch (err) {
        console.error('❌ Error:', err);
    } finally {
        await client.end();
    }
}

fixPolicies();
