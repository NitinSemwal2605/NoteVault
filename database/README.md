# NoteVault Database

This directory contains all database-related SQL files and documentation.

## Files

- **`day01_schema.sql`** - Complete database schema (run this in Supabase SQL Editor)
- **`test_queries.sql`** - Useful queries for testing and verification
- **`sample_data.sql`** - Sample data for testing (create after Day 02)

## Quick Setup (Day 01)

1. Open your Supabase project dashboard
2. Go to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy entire contents of `day01_schema.sql`
5. Paste into SQL Editor
6. Click **RUN** (or press Ctrl+Enter)
7. Wait for success message

## Database Structure

```
profiles (users)
  ↓
  ├── folders (1-to-many)
  │     ↓
  │     └── notes (1-to-many)
  │
  ├── notes (1-to-many)
  │     ↓
  │     ├── note_history (versions)
  │     └── note_tags ←→ tags (many-to-many)
  │
  └── tags (1-to-many)
```

## Key Features

✅ **Row Level Security (RLS)** - Users can only see their own data  
✅ **Full-Text Search** - Fast search using PostgreSQL tsvector  
✅ **Triggers** - Auto-update timestamps and save history  
✅ **Many-to-Many** - Flexible tag system  
✅ **Soft Delete** - Recycle bin functionality  
✅ **Version Control** - Note history tracking  

## PostgreSQL Concepts Used

| Concept | Where Used |
|---------|-----------|
| Primary Keys | All tables (`id uuid primary key`) |
| Foreign Keys | `user_id`, `folder_id`, `note_id`, etc. |
| Composite Keys | `note_tags` table |
| Triggers | Auto-timestamp, history logging |
| Functions | `update_updated_at()`, `create_note_history()` |
| Indexes | GIN index on `search_vector` |
| Generated Columns | `search_vector` on notes |
| Row Level Security | All tables |
| Constraints | `unique`, `not null`, `on delete cascade` |

## RLS Policies Summary

Each table has 4 policies (except junction tables):
- **SELECT** - View own data
- **INSERT** - Create own data
- **UPDATE** - Edit own data
- **DELETE** - Remove own data

All policies use `auth.uid()` to check ownership.

## Verification

After running the schema, use these queries to verify:

```sql
-- Check tables
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Check triggers
SELECT trigger_name, event_object_table FROM information_schema.triggers WHERE trigger_schema = 'public';

-- Check policies
SELECT tablename, policyname FROM pg_policies WHERE schemaname = 'public';

-- Check indexes
SELECT tablename, indexname FROM pg_indexes WHERE schemaname = 'public';
```

## Next Steps

After Day 01 completion:
- **Day 02**: Set up authentication and test RLS
- **Day 03**: Build Express backend API
- **Day 04**: Create React frontend

## Troubleshooting

**Error: "relation already exists"**
- Table was already created. Drop it first: `DROP TABLE tablename CASCADE;`

**Error: "permission denied"**
- Make sure you're logged into the correct Supabase project

**RLS blocking all queries**
- Verify policies exist: `SELECT * FROM pg_policies;`
- Make sure you're authenticated when testing

## Support

For questions or issues, refer to:
- [Supabase Docs](https://supabase.com/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
