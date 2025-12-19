-- ============================================
-- NoteVault Test & Verification Queries
-- ============================================

-- ============================================
-- VERIFICATION QUERIES (Day 01)
-- ============================================

-- 1. Check all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
-- Expected: folders, note_history, note_tags, notes, profiles, tags

-- 2. Check all triggers
SELECT trigger_name, event_object_table, action_timing, event_manipulation
FROM information_schema.triggers 
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;
-- Expected: update_notes_timestamp, note_history_trigger on notes

-- 3. Check all RLS policies
SELECT tablename, policyname, cmd
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
-- Expected: 4 policies per table (select, insert, update, delete)

-- 4. Check all indexes
SELECT tablename, indexname, indexdef
FROM pg_indexes 
WHERE schemaname = 'public'
  AND tablename IN ('notes', 'folders', 'tags', 'profiles', 'note_tags', 'note_history')
ORDER BY tablename, indexname;
-- Expected: notes_search_idx on notes

-- 5. Check table structures
\d profiles
\d folders
\d notes
\d tags
\d note_tags
\d note_history

-- ============================================
-- SAMPLE QUERIES (For Day 02+)
-- ============================================

-- View all notes with their folders and tags
SELECT 
  n.id,
  n.title,
  n.created_at,
  f.name as folder_name,
  array_agg(t.name) as tags
FROM notes n
LEFT JOIN folders f ON n.folder_id = f.id
LEFT JOIN note_tags nt ON n.id = nt.note_id
LEFT JOIN tags t ON nt.tag_id = t.id
WHERE n.user_id = auth.uid()
  AND n.is_deleted = false
GROUP BY n.id, n.title, n.created_at, f.name
ORDER BY n.updated_at DESC;

-- Full-text search example
SELECT 
  id,
  title,
  content,
  ts_rank(search_vector, query) as rank
FROM notes,
     to_tsquery('english', 'meeting & notes') as query
WHERE search_vector @@ query
  AND user_id = auth.uid()
  AND is_deleted = false
ORDER BY rank DESC;

-- Get note with its version history
SELECT 
  n.id,
  n.title as current_title,
  n.content as current_content,
  n.updated_at,
  json_agg(
    json_build_object(
      'old_title', h.old_title,
      'old_content', h.old_content,
      'changed_at', h.created_at
    ) ORDER BY h.created_at DESC
  ) as history
FROM notes n
LEFT JOIN note_history h ON n.id = h.note_id
WHERE n.user_id = auth.uid()
GROUP BY n.id, n.title, n.content, n.updated_at;

-- Notes count by folder
SELECT 
  f.name as folder_name,
  COUNT(n.id) as note_count
FROM folders f
LEFT JOIN notes n ON f.id = n.folder_id AND n.is_deleted = false
WHERE f.user_id = auth.uid()
GROUP BY f.id, f.name
ORDER BY note_count DESC;

-- Most used tags
SELECT 
  t.name,
  COUNT(nt.note_id) as usage_count
FROM tags t
LEFT JOIN note_tags nt ON t.id = nt.tag_id
WHERE t.user_id = auth.uid()
GROUP BY t.id, t.name
ORDER BY usage_count DESC
LIMIT 10;

-- Notes created per month (for analytics)
SELECT 
  DATE_TRUNC('month', created_at) as month,
  COUNT(*) as note_count
FROM notes
WHERE user_id = auth.uid()
  AND is_deleted = false
GROUP BY month
ORDER BY month DESC;

-- Recycle bin (deleted notes)
SELECT 
  id,
  title,
  updated_at as deleted_at
FROM notes
WHERE user_id = auth.uid()
  AND is_deleted = true
ORDER BY updated_at DESC;

-- ============================================
-- TESTING TRIGGERS (Day 02+)
-- ============================================

-- Test auto-timestamp trigger
-- 1. Create a note
-- 2. Wait a few seconds
-- 3. Update the note
-- 4. Check that updated_at changed but created_at didn't

-- Test history trigger
-- 1. Create a note
-- 2. Update its content
-- 3. Check note_history table
SELECT * FROM note_history WHERE note_id = 'YOUR_NOTE_ID';

-- ============================================
-- TESTING RLS (Day 02+)
-- ============================================

-- These queries should return empty when run by another user
-- (They only work when authenticated as the data owner)

-- Try to view another user's notes (should fail)
SELECT * FROM notes WHERE user_id != auth.uid();

-- Try to view another user's folders (should fail)
SELECT * FROM folders WHERE user_id != auth.uid();

-- ============================================
-- PERFORMANCE QUERIES
-- ============================================

-- Check if GIN index is being used
EXPLAIN ANALYZE
SELECT * FROM notes
WHERE search_vector @@ to_tsquery('english', 'test')
  AND user_id = auth.uid();
-- Look for "Bitmap Index Scan on notes_search_idx"

-- ============================================
-- CLEANUP QUERIES (Use with caution!)
-- ============================================

-- Delete all data for current user (for testing)
-- DELETE FROM note_tags WHERE note_id IN (SELECT id FROM notes WHERE user_id = auth.uid());
-- DELETE FROM note_history WHERE note_id IN (SELECT id FROM notes WHERE user_id = auth.uid());
-- DELETE FROM notes WHERE user_id = auth.uid();
-- DELETE FROM folders WHERE user_id = auth.uid();
-- DELETE FROM tags WHERE user_id = auth.uid();

-- Reset auto-delete test
-- UPDATE notes SET is_deleted = false WHERE user_id = auth.uid();
