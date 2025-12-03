const { Client } = require('pg');

const connectionString = 'postgresql://postgres.lkpogdzgvxhbpycibuiw:Z4S38ad!cF_LdWa@aws-1-ap-northeast-1.pooler.supabase.com:6543/bookmark';

const client = new Client({
    connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

const schema = `
  -- Create profiles table that references auth.users
  create table if not exists public.profiles (
    id uuid references auth.users on delete cascade not null primary key,
    email text,
    full_name text,
    avatar_url text,
    updated_at timestamp with time zone
  );

  -- Create bookmarks table
  create table if not exists public.bookmarks (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    title text not null,
    url text not null,
    description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

  -- Create tags table
  create table if not exists public.tags (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    name text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id, name)
  );

  -- Create bookmark_tags junction table
  create table if not exists public.bookmark_tags (
    bookmark_id uuid references public.bookmarks(id) on delete cascade not null,
    tag_id uuid references public.tags(id) on delete cascade not null,
    primary key (bookmark_id, tag_id)
  );

  -- Enable RLS
  alter table public.profiles enable row level security;
  alter table public.bookmarks enable row level security;
  alter table public.tags enable row level security;
  alter table public.bookmark_tags enable row level security;

  -- Create policies
  -- Profiles
  create policy "Public profiles are viewable by everyone." on public.profiles
    for select using (true);

  create policy "Users can insert their own profile." on public.profiles
    for insert with check (auth.uid() = id);

  create policy "Users can update own profile." on public.profiles
    for update using (auth.uid() = id);

  -- Bookmarks
  create policy "Users can view own bookmarks." on public.bookmarks
    for select using (auth.uid() = user_id);

  create policy "Users can insert own bookmarks." on public.bookmarks
    for insert with check (auth.uid() = user_id);

  create policy "Users can update own bookmarks." on public.bookmarks
    for update using (auth.uid() = user_id);

  create policy "Users can delete own bookmarks." on public.bookmarks
    for delete using (auth.uid() = user_id);

  -- Tags
  create policy "Users can view own tags." on public.tags
    for select using (auth.uid() = user_id);

  create policy "Users can insert own tags." on public.tags
    for insert with check (auth.uid() = user_id);

  create policy "Users can update own tags." on public.tags
    for update using (auth.uid() = user_id);

  create policy "Users can delete own tags." on public.tags
    for delete using (auth.uid() = user_id);

  -- Bookmark Tags
  create policy "Users can view own bookmark tags." on public.bookmark_tags
    for select using (
      exists (
        select 1 from public.bookmarks
        where id = bookmark_tags.bookmark_id
        and user_id = auth.uid()
      )
    );

  create policy "Users can insert own bookmark tags." on public.bookmark_tags
    for insert with check (
      exists (
        select 1 from public.bookmarks
        where id = bookmark_tags.bookmark_id
        and user_id = auth.uid()
      )
    );

  create policy "Users can delete own bookmark tags." on public.bookmark_tags
    for delete using (
      exists (
        select 1 from public.bookmarks
        where id = bookmark_tags.bookmark_id
        and user_id = auth.uid()
      )
    );
    
  -- Function to handle new user signup
  create or replace function public.handle_new_user()
  returns trigger as $$
  begin
    insert into public.profiles (id, email, full_name, avatar_url)
    values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
    return new;
  end;
  $$ language plpgsql security definer;

  -- Trigger for new user signup
  drop trigger if exists on_auth_user_created on auth.users;
  create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();
`;

async function setup() {
    try {
        await client.connect();
        console.log('Connected to database');

        // Split schema by statement to execute one by one (simple split)
        // Actually pg driver can handle multiple statements in one query usually, 
        // but for safety let's try running it all.
        await client.query(schema);

        console.log('Schema applied successfully');
    } catch (err) {
        console.error('Error applying schema:', err);
    } finally {
        await client.end();
    }
}

setup();
