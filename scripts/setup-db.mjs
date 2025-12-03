import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lkpogdzgvxhbpycibuiw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrcG9nZHpndnhoYnB5Y2lidWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1NDgyNDgsImV4cCI6MjA4MDEyNDI0OH0.c6hjWwpF8cIuw2AvYr-FxU8ATDEbMlaZeQvObjIrNmQ'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function setupDatabase() {
    console.log('Starting database setup...')

    // Since we're using Supabase, we need to run SQL via the SQL Editor in the Supabase Dashboard
    // Or use the service_role key for admin operations
    // The anon key doesn't have permissions to run DDL statements

    console.log(`
⚠️  Database Setup Required

The database schema needs to be created manually in the Supabase Dashboard.

Please follow these steps:

1. Go to https://supabase.com/dashboard/project/lkpogdzgvxhbpycibuiw
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy and paste the SQL below
5. Click "Run"

--- SQL TO RUN ---

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Create bookmarks table
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create tags table
CREATE TABLE IF NOT EXISTS public.tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, name)
);

-- Create bookmark_tags junction table
CREATE TABLE IF NOT EXISTS public.bookmark_tags (
  bookmark_id UUID REFERENCES public.bookmarks(id) ON DELETE CASCADE NOT NULL,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (bookmark_id, tag_id)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmark_tags ENABLE ROW LEVEL SECURITY;

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

-- Create policies
-- Profiles
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Bookmarks
CREATE POLICY "Users can view own bookmarks." ON public.bookmarks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookmarks." ON public.bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookmarks." ON public.bookmarks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks." ON public.bookmarks
  FOR DELETE USING (auth.uid() = user_id);

-- Tags
CREATE POLICY "Users can view own tags." ON public.tags
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tags." ON public.tags
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tags." ON public.tags
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tags." ON public.tags
  FOR DELETE USING (auth.uid() = user_id);

-- Bookmark Tags
CREATE POLICY "Users can view own bookmark tags." ON public.bookmark_tags
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.bookmarks
      WHERE id = bookmark_tags.bookmark_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own bookmark tags." ON public.bookmark_tags
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.bookmarks
      WHERE id = bookmark_tags.bookmark_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own bookmark tags." ON public.bookmark_tags
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.bookmarks
      WHERE id = bookmark_tags.bookmark_id
      AND user_id = auth.uid()
    )
  );

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

--- END OF SQL ---

After running this SQL, your app will work correctly!
  `)
}

setupDatabase()
