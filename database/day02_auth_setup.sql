-- ============================================
-- Day 02: Authentication & Profile Setup
-- ============================================

-- ============================================
-- STEP 1: Profile Auto-Creation Trigger
-- ============================================

-- Function to auto-create profile when user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger that runs after user creation in auth.users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================
-- STEP 2: Additional RLS Policy for Profile Creation
-- ============================================

-- Allow authenticated users to insert their own profile if needed
create policy "Users can insert own profile"
on profiles for insert
with check (auth.uid() = id);

-- ============================================
-- TESTING QUERIES
-- ============================================

-- Check if trigger exists
-- select trigger_name, event_object_table, action_timing, event_manipulation
-- from information_schema.triggers
-- where trigger_name = 'on_auth_user_created';

-- Check if function exists
-- select routine_name from information_schema.routines
-- where routine_name = 'handle_new_user';

-- View all profiles
-- select id, username, created_at from profiles;

-- View all auth users
-- select id, email, created_at from auth.users;

-- ============================================
-- RLS TESTING (After creating users)
-- ============================================

-- Test as User 1 (replace with actual UUID)
-- select set_config('request.jwt.claims', '{"sub":"USER_1_UUID_HERE"}', true);
-- select * from notes; -- Should only show User 1's notes
-- select * from folders; -- Should only show User 1's folders

-- Test as User 2 (replace with actual UUID)
-- select set_config('request.jwt.claims', '{"sub":"USER_2_UUID_HERE"}', true);
-- select * from notes; -- Should only show User 2's notes

-- Try to access another user's data (should return 0 rows)
-- select set_config('request.jwt.claims', '{"sub":"USER_1_UUID_HERE"}', true);
-- select * from notes where user_id = 'USER_2_UUID_HERE'; -- Should be empty!
