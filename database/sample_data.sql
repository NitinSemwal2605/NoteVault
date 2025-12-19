-- ============================================
-- Sample Data for Testing (Day 02)
-- ============================================

-- INSTRUCTIONS:
-- 1. First, create 2 test users via Supabase Dashboard or auth-test.html
-- 2. Get their UUIDs from: select id, username from profiles;
-- 3. Replace [alice-uuid] and [bob-uuid] below with actual UUIDs
-- 4. Run this script to populate sample data

-- ============================================
-- FOR USER: Alice
-- ============================================

-- Create folders for Alice
INSERT INTO folders (user_id, name) VALUES
('[alice-uuid]', 'Work'),
('[alice-uuid]', 'Personal'),
('[alice-uuid]', 'Projects');

-- Create tags for Alice
INSERT INTO tags (user_id, name) VALUES
('[alice-uuid]', 'important'),
('[alice-uuid]', 'todo'),
('[alice-uuid]', 'work'),
('[alice-uuid]', 'ideas');

-- Create notes for Alice
INSERT INTO notes (user_id, folder_id, title, content) VALUES
('[alice-uuid]', 
 (SELECT id FROM folders WHERE user_id = '[alice-uuid]' AND name = 'Work' LIMIT 1),
 'Q4 Planning Meeting',
 'Discussed OKRs for Q4. Need to finalize team goals by end of week.'),

('[alice-uuid]', 
 (SELECT id FROM folders WHERE user_id = '[alice-uuid]' AND name = 'Work' LIMIT 1),
 'Project Roadmap',
 'Phase 1: Research (2 weeks)\nPhase 2: Design (3 weeks)\nPhase 3: Development (8 weeks)'),

('[alice-uuid]', 
 (SELECT id FROM folders WHERE user_id = '[alice-uuid]' AND name = 'Personal' LIMIT 1),
 'Grocery List',
 'Milk, eggs, bread, coffee, fruits'),

('[alice-uuid]', 
 (SELECT id FROM folders WHERE user_id = '[alice-uuid]' AND name = 'Personal' LIMIT 1),
 'Vacation Ideas',
 'Potential destinations:\n- Japan (cherry blossoms)\n- Iceland (northern lights)\n- New Zealand (hiking)'),

('[alice-uuid]', 
 (SELECT id FROM folders WHERE user_id = '[alice-uuid]' AND name = 'Projects' LIMIT 1),
 'App Ideas',
 'Build a habit tracker with streak visualization'),

('[alice-uuid]', 
 NULL,
 'Random Thoughts',
 'This is an inbox note without a folder.');

-- Add tags to Alice's notes
DO $$
DECLARE
  important_tag uuid;
  work_tag uuid;
  todo_tag uuid;
  note1 uuid;
  note2 uuid;
BEGIN
  -- Get tag IDs
  SELECT id INTO important_tag FROM tags WHERE user_id = '[alice-uuid]' AND name = 'important';
  SELECT id INTO work_tag FROM tags WHERE user_id = '[alice-uuid]' AND name = 'work';
  SELECT id INTO todo_tag FROM tags WHERE user_id = '[alice-uuid]' AND name = 'todo';
  
  -- Get note IDs
  SELECT id INTO note1 FROM notes WHERE user_id = '[alice-uuid]' AND title = 'Q4 Planning Meeting';
  SELECT id INTO note2 FROM notes WHERE user_id = '[alice-uuid]' AND title = 'Project Roadmap';
  
  -- Link tags to notes
  INSERT INTO note_tags (note_id, tag_id) VALUES
  (note1, important_tag),
  (note1, work_tag),
  (note2, work_tag),
  (note2, todo_tag);
END $$;

-- ============================================
-- FOR USER: Bob
-- ============================================

-- Create folders for Bob
INSERT INTO folders (user_id, name) VALUES
('[bob-uuid]', 'Development'),
('[bob-uuid]', 'Learning'),
('[bob-uuid]', 'Ideas');

-- Create tags for Bob
INSERT INTO tags (user_id, name) VALUES
('[bob-uuid]', 'coding'),
('[bob-uuid]', 'tutorial'),
('[bob-uuid]', 'bug'),
('[bob-uuid]', 'feature');

-- Create notes for Bob
INSERT INTO notes (user_id, folder_id, title, content) VALUES
('[bob-uuid]', 
 (SELECT id FROM folders WHERE user_id = '[bob-uuid]' AND name = 'Development' LIMIT 1),
 'Bug Fix: Login Issue',
 'Fixed infinite loop in auth middleware. Issue was with async/await handling.'),

('[bob-uuid]', 
 (SELECT id FROM folders WHERE user_id = '[bob-uuid]' AND name = 'Development' LIMIT 1),
 'API Endpoint Improvements',
 'Need to add pagination to /api/users endpoint. Current implementation loads all users at once.'),

('[bob-uuid]', 
 (SELECT id FROM folders WHERE user_id = '[bob-uuid]' AND name = 'Learning' LIMIT 1),
 'PostgreSQL Window Functions',
 'ROW_NUMBER(), RANK(), DENSE_RANK() - use cases and examples'),

('[bob-uuid]', 
 (SELECT id FROM folders WHERE user_id = '[bob-uuid]' AND name = 'Learning' LIMIT 1),
 'React Performance Tips',
 'Use React.memo for expensive components. Use useMemo and useCallback wisely.'),

('[bob-uuid]', 
 (SELECT id FROM folders WHERE user_id = '[bob-uuid]' AND name = 'Ideas' LIMIT 1),
 'Project: Task Manager',
 'Build a Kanban-style task manager with drag-and-drop'),

('[bob-uuid]', 
 NULL,
 'Quick Note',
 'Remember to update documentation');

-- Add tags to Bob's notes
DO $$
DECLARE
  coding_tag uuid;
  bug_tag uuid;
  feature_tag uuid;
  note1 uuid;
  note2 uuid;
BEGIN
  -- Get tag IDs
  SELECT id INTO coding_tag FROM tags WHERE user_id = '[bob-uuid]' AND name = 'coding';
  SELECT id INTO bug_tag FROM tags WHERE user_id = '[bob-uuid]' AND name = 'bug';
  SELECT id INTO feature_tag FROM tags WHERE user_id = '[bob-uuid]' AND name = 'feature';
  
  -- Get note IDs
  SELECT id INTO note1 FROM notes WHERE user_id = '[bob-uuid]' AND title = 'Bug Fix: Login Issue';
  SELECT id INTO note2 FROM notes WHERE user_id = '[bob-uuid]' AND title = 'API Endpoint Improvements';
  
  -- Link tags to notes
  INSERT INTO note_tags (note_id, tag_id) VALUES
  (note1, bug_tag),
  (note1, coding_tag),
  (note2, feature_tag),
  (note2, coding_tag);
END $$;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check Alice's data
-- SELECT 'Alice folders' as type, f.name, COUNT(n.id) as note_count
-- FROM folders f
-- LEFT JOIN notes n ON f.id = n.folder_id AND n.is_deleted = false
-- WHERE f.user_id = '[alice-uuid]'
-- GROUP BY f.id, f.name;

-- Check Bob's data
-- SELECT 'Bob folders' as type, f.name, COUNT(n.id) as note_count
-- FROM folders f
-- LEFT JOIN notes n ON f.id = n.folder_id AND n.is_deleted = false
-- WHERE f.user_id = '[bob-uuid]'
-- GROUP BY f.id, f.name;

-- Check notes with tags
-- SELECT n.title, array_agg(t.name) as tags
-- FROM notes n
-- LEFT JOIN note_tags nt ON n.id = nt.note_id
-- LEFT JOIN tags t ON nt.tag_id = t.id
-- WHERE n.user_id = '[alice-uuid]'
-- GROUP BY n.id, n.title;
