-- ============================================
-- NoteVault Database Schema (Day 01)
-- Complete PostgreSQL setup for Supabase
-- ============================================

-- ============================================
-- PHASE 1: Core Tables
-- ============================================

-- Table 1: Profiles (User metadata)
create table profiles (
  id uuid references auth.users(id) primary key,
  username text unique not null,
  created_at timestamptz default now()
);

-- Table 2: Folders (Note organization)
create table folders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  created_at timestamptz default now()
);

-- Table 3: Notes (Core entity)
create table notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  folder_id uuid references folders(id) on delete set null,
  title text not null,
  content text,
  is_deleted boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- PHASE 2: Auto-Update Timestamp Trigger
-- ============================================

-- Function to update timestamp
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger on notes table
create trigger update_notes_timestamp
before update on notes
for each row
execute function update_updated_at();

-- ============================================
-- PHASE 3: Tags System (Many-to-Many)
-- ============================================

-- Table 4: Tags
create table tags (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  unique(user_id, name)
);

-- Table 5: Note-Tag Junction Table
create table note_tags (
  note_id uuid references notes(id) on delete cascade,
  tag_id uuid references tags(id) on delete cascade,
  primary key (note_id, tag_id)
);

-- ============================================
-- PHASE 4: Note History (Version Control)
-- ============================================

-- Table 6: Note History
create table note_history (
  id uuid primary key default gen_random_uuid(),
  note_id uuid references notes(id) on delete cascade,
  old_title text,
  old_content text,
  created_at timestamptz default now()
);

-- Function to save history before updates
create or replace function create_note_history()
returns trigger as $$
begin
  if old.content is distinct from new.content
     or old.title is distinct from new.title then
    insert into note_history(note_id, old_title, old_content)
    values (old.id, old.title, old.content);
  end if;
  return new;
end;
$$ language plpgsql;

-- Trigger to create history on note updates
create trigger note_history_trigger
before update on notes
for each row
execute function create_note_history();

-- ============================================
-- PHASE 5: Full-Text Search
-- ============================================

-- Add tsvector column for search
alter table notes
add column search_vector tsvector
generated always as (
  setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
  setweight(to_tsvector('english', coalesce(content, '')), 'B')
) stored;

-- Create GIN index for fast searching
create index notes_search_idx
on notes using gin(search_vector);

-- ============================================
-- PHASE 6: Row Level Security (RLS)
-- ============================================

-- Enable RLS on all tables
alter table profiles enable row level security;
alter table folders enable row level security;
alter table notes enable row level security;
alter table tags enable row level security;
alter table note_tags enable row level security;
alter table note_history enable row level security;

-- ============================================
-- RLS Policies: Profiles
-- ============================================

create policy "Users can view own profile"
on profiles for select
using (id = auth.uid());

create policy "Users can update own profile"
on profiles for update
using (id = auth.uid());

-- ============================================
-- RLS Policies: Folders
-- ============================================

create policy "Users can view own folders"
on folders for select
using (user_id = auth.uid());

create policy "Users can insert own folders"
on folders for insert
with check (user_id = auth.uid());

create policy "Users can update own folders"
on folders for update
using (user_id = auth.uid());

create policy "Users can delete own folders"
on folders for delete
using (user_id = auth.uid());

-- ============================================
-- RLS Policies: Notes
-- ============================================

create policy "Users can view own notes"
on notes for select
using (user_id = auth.uid());

create policy "Users can insert own notes"
on notes for insert
with check (user_id = auth.uid());

create policy "Users can update own notes"
on notes for update
using (user_id = auth.uid());

create policy "Users can delete own notes"
on notes for delete
using (user_id = auth.uid());

-- ============================================
-- RLS Policies: Tags
-- ============================================

create policy "Users can view own tags"
on tags for select
using (user_id = auth.uid());

create policy "Users can insert own tags"
on tags for insert
with check (user_id = auth.uid());

create policy "Users can update own tags"
on tags for update
using (user_id = auth.uid());

create policy "Users can delete own tags"
on tags for delete
using (user_id = auth.uid());

-- ============================================
-- RLS Policies: Note-Tags Junction
-- ============================================

create policy "Users can view own note tags"
on note_tags for select
using (
  exists (
    select 1 from notes
    where notes.id = note_tags.note_id
    and notes.user_id = auth.uid()
  )
);

create policy "Users can insert own note tags"
on note_tags for insert
with check (
  exists (
    select 1 from notes
    where notes.id = note_tags.note_id
    and notes.user_id = auth.uid()
  )
);

create policy "Users can delete own note tags"
on note_tags for delete
using (
  exists (
    select 1 from notes
    where notes.id = note_tags.note_id
    and notes.user_id = auth.uid()
  )
);

-- ============================================
-- RLS Policies: Note History
-- ============================================

create policy "Users can view own note history"
on note_history for select
using (
  exists (
    select 1 from notes
    where notes.id = note_history.note_id
    and notes.user_id = auth.uid()
  )
);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check all tables exist
-- select table_name from information_schema.tables where table_schema = 'public';

-- Check all triggers
-- select trigger_name, event_object_table from information_schema.triggers where trigger_schema = 'public';

-- Check all RLS policies
-- select tablename, policyname from pg_policies where schemaname = 'public';

-- Check indexes
-- select tablename, indexname from pg_indexes where schemaname = 'public';
