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

const schema = `
  -- Update profiles table
  ALTER TABLE profiles ADD COLUMN IF NOT EXISTS plan text DEFAULT 'free';
  ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_status text DEFAULT 'active';
  ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_id text;
  ALTER TABLE profiles ADD COLUMN IF NOT EXISTS customer_id text;
  ALTER TABLE profiles ADD COLUMN IF NOT EXISTS current_period_end timestamp with time zone;
  ALTER TABLE profiles ADD COLUMN IF NOT EXISTS usage_limit integer DEFAULT 30;

  -- Create payment_logs table
  CREATE TABLE IF NOT EXISTS payment_logs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES profiles(id),
    amount integer,
    currency text,
    status text,
    provider_payment_id text,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now()
  );

  -- Enable RLS for payment_logs
  ALTER TABLE payment_logs ENABLE ROW LEVEL SECURITY;

  -- Policy: Users can view their own payment logs
  DO $$
  BEGIN
      IF NOT EXISTS (
          SELECT 1 FROM pg_policies WHERE tablename = 'payment_logs' AND policyname = 'Users can view own payment logs'
      ) THEN
          CREATE POLICY "Users can view own payment logs" ON payment_logs
          FOR SELECT USING (auth.uid() = user_id);
      END IF;
  END
  $$;
`;

async function migrate() {
    try {
        await client.connect();
        console.log('Connected to database');
        await client.query(schema);
        console.log('Migration applied successfully');
    } catch (err) {
        console.error('Error applying migration:', err);
    } finally {
        await client.end();
    }
}

migrate();
