# NoteVault Backend API

Express.js backend for NoteVault notes application with Supabase integration.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file in the backend directory:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Run the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on `http://localhost:5000`

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── supabase.js          # Supabase client setup
│   ├── controllers/
│   │   ├── noteController.js    # Note request handlers
│   │   ├── folderController.js  # Folder request handlers
│   │   └── tagController.js     # Tag request handlers
│   ├── services/
│   │   ├── noteService.js       # Note business logic
│   │   ├── folderService.js     # Folder business logic
│   │   └── tagService.js        # Tag business logic
│   ├── routes/
│   │   ├── noteRoutes.js        # Note API routes
│   │   ├── folderRoutes.js      # Folder API routes
│   │   └── tagRoutes.js         # Tag API routes
│   └── middleware/
│       ├── auth.js              # JWT authentication
│       ├── errorHandler.js      # Error handling
│       └── validation.js        # Input validation
├── server.js                     # Express app entry point
├── package.json
└── .env                          # Environment variables (create this)
```

---

## 🔌 API Endpoints

### Health Check

```
GET /health
```

### Notes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/notes` | Get all notes (with pagination) | ✅ |
| GET | `/api/notes/:id` | Get single note | ✅ |
| GET | `/api/notes/deleted` | Get deleted notes | ✅ |
| GET | `/api/notes/:id/history` | Get note history | ✅ |
| POST | `/api/notes` | Create note | ✅ |
| PATCH | `/api/notes/:id` | Update note | ✅ |
| DELETE | `/api/notes/:id` | Soft delete note | ✅ |
| DELETE | `/api/notes/:id/permanent` | Permanently delete | ✅ |
| POST | `/api/notes/:id/restore` | Restore deleted note | ✅ |

### Folders

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/folders` | Get all folders | ✅ |
| GET | `/api/folders/:id` | Get single folder | ✅ |
| POST | `/api/folders` | Create folder | ✅ |
| PATCH | `/api/folders/:id` | Update folder | ✅ |
| DELETE | `/api/folders/:id` | Delete folder | ✅ |

### Tags

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/tags` | Get all tags | ✅ |
| POST | `/api/tags` | Create tag | ✅ |
| PATCH | `/api/tags/:id` | Update tag | ✅ |
| DELETE | `/api/tags/:id` | Delete tag | ✅ |

---

## 📝 API Usage Examples

### Authentication

All protected routes require a JWT token in the Authorization header:

```javascript
headers: {
  'Authorization': 'Bearer YOUR_JWT_TOKEN'
}
```

### Create a Note

```bash
POST /api/notes
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN

{
  "title": "My First Note",
  "content": "This is the content",
  "folderId": "uuid-here",
  "tagIds": ["tag-uuid-1", "tag-uuid-2"]
}
```

### Get Notes with Pagination

```bash
GET /api/notes?page=1&limit=20&search=meeting&folderId=uuid
Authorization: Bearer YOUR_TOKEN
```

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
- `search` - Full-text search query
- `folderId` - Filter by folder
- `tagId` - Filter by tag

### Update a Note

```bash
PATCH /api/notes/:id
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN

{
  "title": "Updated Title",
  "content": "Updated content",
  "tagIds": ["new-tag-uuid"]
}
```

---

## 🔒 Security Features

- ✅ JWT authentication on all routes
- ✅ Row Level Security (RLS) via Supabase
- ✅ Input validation with express-validator
- ✅ CORS protection
- ✅ Error handling middleware
- ✅ Environment variable protection

---

## 🧪 Testing the API

### Using cURL

```bash
# Health check
curl http://localhost:5000/health

# Get notes (requires auth)
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:5000/api/notes
```

### Using Postman

1. Import the API endpoints
2. Set Authorization to "Bearer Token"
3. Add your JWT token from Supabase Auth
4. Make requests

### Using Thunder Client (VS Code)

1. Install Thunder Client extension
2. Create new request
3. Add Authorization header
4. Test endpoints

---

## 🛠️ Development Tips

### Enable Detailed Logging

Set `NODE_ENV=development` in `.env` to see request logs.

### Auto-reload on Changes

Use `npm run dev` with nodemon for automatic server restart.

### Database Changes

If you modify the database schema, update the corresponding service files.

---

## 📦 Dependencies

- **express** - Web framework
- **@supabase/supabase-js** - Supabase client
- **cors** - CORS middleware
- **dotenv** - Environment variables
- **express-validator** - Input validation

---

## 🐛 Troubleshooting

**Server won't start:**
- Check `.env` file exists and has correct values
- Verify Supabase credentials
- Ensure port 5000 is not in use

**Authentication errors:**
- Verify JWT token is valid
- Check token is in `Authorization: Bearer TOKEN` format
- Ensure Supabase project is active

**Database errors:**
- Verify RLS policies are set up (Day 01)
- Check Supabase connection
- Ensure tables exist

---

## 🚀 Next Steps

After backend is running:
- **Day 04:** Build React frontend
- **Day 05:** Add advanced features
- **Day 06:** Analytics dashboard
- **Day 07:** Deploy to production

---

## 📄 License

MIT
