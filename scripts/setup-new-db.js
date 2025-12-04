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
  -- Create profiles table
  CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid PRIMARY KEY,
    email text,
    full_name text,
    avatar_url text,
    password_hash text,
    plan text DEFAULT 'free',
    subscription_status text DEFAULT 'active',
    subscription_id text,
    customer_id text,
    current_period_end timestamp with time zone,
    usage_limit integer DEFAULT 30,
    updated_at timestamp with time zone DEFAULT now()
  );

  -- Create bookmarks table
  CREATE TABLE IF NOT EXISTS public.bookmarks (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title text NOT NULL,
    url text NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
  );

  -- Create tags table
  CREATE TABLE IF NOT EXISTS public.tags (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, name)
  );

  -- Create bookmark_tags junction table
  CREATE TABLE IF NOT EXISTS public.bookmark_tags (
    bookmark_id uuid REFERENCES public.bookmarks(id) ON DELETE CASCADE NOT NULL,
    tag_id uuid REFERENCES public.tags(id) ON DELETE CASCADE NOT NULL,
    PRIMARY KEY (bookmark_id, tag_id)
  );

  -- Create ai_usage_logs table
  CREATE TABLE IF NOT EXISTS public.ai_usage_logs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
    endpoint text,
    success text,
    error_message text,
    tokens_used integer,
    created_at timestamp with time zone DEFAULT now()
  );

  -- Create payment_logs table
  CREATE TABLE IF NOT EXISTS public.payment_logs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount integer,
    currency text,
    status text,
    provider_payment_id text,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now()
  );

  -- Enable RLS
  ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.bookmark_tags ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.ai_usage_logs ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.payment_logs ENABLE ROW LEVEL SECURITY;

  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
  DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
  DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;
  DROP POLICY IF EXISTS "Users can view own bookmarks." ON public.bookmarks;
  DROP POLICY IF EXISTS "Users can insert own bookmarks." ON public.bookmarks;
  DROP POLICY IF EXISTS "Users can update own bookmarks." ON public.bookmarks;
  DROP POLICY IF EXISTS "Users can delete own bookmarks." ON public.bookmarks;
  DROP POLICY IF EXISTS "Users can view own tags." ON public.tags;
  DROP POLICY IF EXISTS "Users can insert own tags." ON public.tags;
  DROP POLICY IF EXISTS "Users can update own tags." ON public.tags;
  DROP POLICY IF EXISTS "Users can delete own tags." ON public.tags;
  DROP POLICY IF EXISTS "Users can view own bookmark tags." ON public.bookmark_tags;
  DROP POLICY IF EXISTS "Users can insert own bookmark tags." ON public.bookmark_tags;
  DROP POLICY IF EXISTS "Users can delete own bookmark tags." ON public.bookmark_tags;
  DROP POLICY IF EXISTS "Users can view own AI usage logs." ON public.ai_usage_logs;
  DROP POLICY IF EXISTS "Users can view own payment logs." ON public.payment_logs;

  -- Create policies for profiles
  CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
    FOR SELECT USING (true);

  CREATE POLICY "Users can insert their own profile." ON public.profiles
    FOR INSERT WITH CHECK (true);

  CREATE POLICY "Users can update own profile." ON public.profiles
    FOR UPDATE USING (true);

  -- Create policies for bookmarks
  CREATE POLICY "Users can view own bookmarks." ON public.bookmarks
    FOR SELECT USING (true);

  CREATE POLICY "Users can insert own bookmarks." ON public.bookmarks
    FOR INSERT WITH CHECK (true);

  CREATE POLICY "Users can update own bookmarks." ON public.bookmarks
    FOR UPDATE USING (true);

  CREATE POLICY "Users can delete own bookmarks." ON public.bookmarks
    FOR DELETE USING (true);

  -- Create policies for tags
  CREATE POLICY "Users can view own tags." ON public.tags
    FOR SELECT USING (true);

  CREATE POLICY "Users can insert own tags." ON public.tags
    FOR INSERT WITH CHECK (true);

  CREATE POLICY "Users can update own tags." ON public.tags
    FOR UPDATE USING (true);

  CREATE POLICY "Users can delete own tags." ON public.tags
    FOR DELETE USING (true);

  -- Create policies for bookmark_tags
  CREATE POLICY "Users can view own bookmark tags." ON public.bookmark_tags
    FOR SELECT USING (true);

  CREATE POLICY "Users can insert own bookmark tags." ON public.bookmark_tags
    FOR INSERT WITH CHECK (true);

  CREATE POLICY "Users can delete own bookmark tags." ON public.bookmark_tags
    FOR DELETE USING (true);

  -- Create policies for ai_usage_logs
  CREATE POLICY "Users can view own AI usage logs." ON public.ai_usage_logs
    FOR SELECT USING (true);

  -- Create policies for payment_logs
  CREATE POLICY "Users can view own payment logs." ON public.payment_logs
    FOR SELECT USING (true);
`;

async function migrate() {
    try {
        await client.connect();
        console.log('Connected to new database');
        console.log('Creating schema...');
        await client.query(schema);
        console.log('✅ Schema created successfully in new database!');
    } catch (err) {
        console.error('Error creating schema:', err);
    } finally {
        await client.end();
    }
}

migrate();
