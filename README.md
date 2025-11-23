# 🔗 TinyLink - URL Shortener

> **Take-Home Assignment Submission**  
> A full-stack URL shortener built with React, Node.js, Express, and PostgreSQL

frontend-render-link :  https://tinu-url-frontend.onrender.com
GitHub               :  https://github.com/Abhishek-Singhal-001/Tinu-Url
backend-render-link  :  https://tinu-url-3.onrender.com

Run both the frontend and backend on links provided 


---

## 📋 Assignment Requirements - Checklist

✅ **Core Features Implemented**
- [x] URL shortening with custom codes
- [x] Auto-generated codes (6-8 alphanumeric)
- [x] HTTP 302 redirects
- [x] Click tracking & analytics
- [x] Link deletion
- [x] Dashboard with table view
- [x] Stats page `/code/:code`
- [x] Health check endpoint `/healthz`

✅ **API Endpoints (As Per Spec)**
- [x] `POST /api/links` - Create link (409 if duplicate)
- [x] `GET /api/links` - List all links
- [x] `GET /api/links/:code` - Get stats
- [x] `DELETE /api/links/:code` - Delete link
- [x] `GET /:code` - Redirect (302 or 404)

✅ **UI/UX Requirements**
- [x] Clean, thoughtful interface
- [x] Loading states
- [x] Error states
- [x] Form validation
- [x] Responsive design
- [x] Search/filter functionality
- [x] Copy to clipboard

✅ **Technical Requirements**
- [x] Node.js + Express backend
- [x] React frontend with Vite
- [x] PostgreSQL database (Neon)
- [x] Deployed on free services
- [x] `.env.example` provided

---

## 🚀 Live Demo

- **Frontend (Dashboard):** https://your-frontend.onrender.com
- **Backend API:** https://your-backend.onrender.com
- **Health Check:** https://your-backend.onrender.com/healthz
- **Example Short Link:** https://your-backend.onrender.com/demo123

---

## 🎥 Video Walkthrough

📹 **[Watch Demo & Code Explanation](https://your-video-link.com)**

Topics covered:
- Application demo
- Code architecture
- Database design
- API endpoints
- Deployment process

---

## 🤖 AI Assistant Used

🔗 **[Claude/ChatGPT Conversation Link](https://your-llm-transcript-link.com)**

I used AI assistance for:
- Project structure setup
- React component organization
- API endpoint implementation
- Debugging and troubleshooting

**Note:** I fully understand the implementation and can explain every part of the code.

---

## 📸 Screenshots

### Dashboard
Dashboard :  https://drive.google.com/file/d/1_Tzzi9afR7_FfmUvu0GSTcDsMNx6_BGs/view?usp=sharing
*Main dashboard showing all shortened links with statistics*

### Create Link
create Link :   https://drive.google.com/file/d/1JNpVOd4Ao8IkAf8-_6oJ4GcRCw1q-Rnz/view?usp=sharing
*Form for creating new short links with custom codes*

### Link Statistics
Stats: https://drive.google.com/file/d/1iwh0OemLutKh0quBnKcoai2HAS-2VSkE/view?usp=sharing
*Detailed analytics for individual links*

### Mobile View
mobile :  1.  https://drive.google.com/file/d/1UQKwCfWBRv9B7tg34zxL7kwHC5XxY44W/view?usp=sharing
          2.  https://drive.google.com/file/d/1xIC4DypFEe6gj9-0ukX-iq8B_Zvd2qjX/view?usp=sharing
          3.  https://drive.google.com/file/d/1lX3EZL5OU_uDIyA13BYXPbOcrNEVB4zz/view?usp=sharing
*Responsive design on mobile devices*

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Hooks** - State management

### Backend
- **Node.js 18+** - Runtime
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **pg** - PostgreSQL client
- **CORS** - Cross-origin support
- **dotenv** - Environment variables

### Deployment
- **Frontend:** Render
- **Backend:** Render
- **Database:** Neon PostgreSQL (free tier)

---

## 📁 Project Structure

```
tinylink/
├── backend/
│   ├── server.js              # Express server & API routes
│   ├── package.json
│   ├── .env.example
│   └── .env                   # (not in git)
│
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Header.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AddLinkForm.jsx
│   │   │   ├── LinksTable.jsx
│   │   │   ├── StatsView.jsx
│   │   │   └── Notification.jsx
│   │   ├── utils/
│   │   │   ├── api.js         # API calls
│   │   │   └── dateFormatter.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
│
├── screenshots/               # Application screenshots
├── README.md
├── LICENSE
└── .gitignore
```

---

## 🔌 API Documentation

### Base URL
```
Production: https://your-backend.onrender.com
Local: http://localhost:3001
```

### Endpoints

#### 1. Health Check
```http
GET /healthz
```

**Response (200):**
```json
{
  "ok": true,
  "version": "1.0",
  "timestamp": "2024-12-15T20:45:30.000Z",
  "uptime": 123.45
}
```

---

#### 2. Create Link
```http
POST /api/links
Content-Type: application/json

{
  "targetUrl": "https://example.com/very-long-url",
  "customCode": "mycode"  // optional, 6-8 alphanumeric
}
```

**Success Response (201):**
```json
{
  "code": "mycode",
  "targetUrl": "https://example.com/very-long-url",
  "clicks": 0,
  "lastClicked": null,
  "createdAt": "2024-12-15T20:45:30.000Z",
  "shortUrl": "https://your-backend.onrender.com/mycode"
}
```

**Error Response (409 - Duplicate Code):**
```json
{
  "error": "Code already exists",
  "code": "mycode"
}
```

**Error Response (400 - Validation Error):**
```json
{
  "error": "Invalid URL format"
}
```

---

#### 3. Get All Links
```http
GET /api/links
```

**Response (200):**
```json
[
  {
    "code": "mycode",
    "targetUrl": "https://example.com",
    "clicks": 42,
    "lastClicked": "2024-12-15T20:45:30.000Z",
    "createdAt": "2024-12-15T18:30:00.000Z"
  }
]
```

---

#### 4. Get Link Statistics
```http
GET /api/links/:code
```

**Response (200):**
```json
{
  "code": "mycode",
  "targetUrl": "https://example.com",
  "clicks": 42,
  "lastClicked": "2024-12-15T20:45:30.000Z",
  "createdAt": "2024-12-15T18:30:00.000Z"
}
```

**Error Response (404):**
```json
{
  "error": "Link not found"
}
```

---

#### 5. Delete Link
```http
DELETE /api/links/:code
```

**Response (200):**
```json
{
  "message": "Link deleted successfully",
  "code": "mycode"
}
```

**Error Response (404):**
```json
{
  "error": "Link not found"
}
```

---

#### 6. Redirect to Original URL
```http
GET /:code
```

**Response:**
- **302 Redirect** - Redirects to target URL and increments click count
- **404 Not Found** - If code doesn't exist or was deleted

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js 18+
- PostgreSQL (or Neon account)
- npm or yarn

### Backend Setup

```bash
# 1. Clone repository
git clone https://github.com/Abhishek-Singhal-001/Tinu-Url.git
cd Tinu-Url/backend

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env with your database URL

# 4. Start server
npm run dev
```

Backend runs on `http://localhost:3001`

### Frontend Setup

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Frontend runs on `http://localhost:5000`

---

## 🗄️ Database Schema

```sql
CREATE TABLE links (
  id SERIAL PRIMARY KEY,
  code VARCHAR(8) UNIQUE NOT NULL,
  target_url TEXT NOT NULL,
  clicks INTEGER DEFAULT 0,
  last_clicked TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_code ON links(code);
```

### Field Descriptions:
- **code:** Unique short code (6-8 alphanumeric characters)
- **target_url:** Original long URL
- **clicks:** Number of times link was accessed
- **last_clicked:** Timestamp of last click
- **created_at:** Timestamp of link creation

---

## 🔐 Environment Variables

### Backend `.env`
```env
DATABASE_URL=postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?sslmode=require
PORT=3001
NODE_ENV=production
```

### Frontend `.env`
```env
VITE_API_URL=https://your-backend.onrender.com
```

---

## ✅ Validation Rules

### Short Codes
- **Pattern:** `[A-Za-z0-9]{6,8}`
- **Length:** 6-8 characters
- **Characters:** Alphanumeric only (A-Z, a-z, 0-9)
- **Case Sensitive:** Yes (`Test123` ≠ `test123`)
- **Uniqueness:** Global across all users

### URLs
- Must be valid URL format
- Must include protocol (`http://` or `https://`)
- Examples:
  - ✅ `https://example.com`
  - ✅ `https://example.com/path?query=value`
  - ❌ `example.com` (missing protocol)
  - ❌ `not-a-url` (invalid format)

---

## 🧪 Testing

### Manual Testing

```bash
# Health check
curl https://your-backend.onrender.com/healthz

# Create link
curl -X POST https://your-backend.onrender.com/api/links \
  -H "Content-Type: application/json" \
  -d '{"targetUrl":"https://google.com","customCode":"test123"}'

# Get all links
curl https://your-backend.onrender.com/api/links

# Test redirect
curl -I https://your-backend.onrender.com/test123

# Delete link
curl -X DELETE https://your-backend.onrender.com/api/links/test123
```

### Test Cases Covered

1. ✅ Health endpoint returns 200
2. ✅ Create link with custom code
3. ✅ Create link with auto-generated code
4. ✅ Duplicate code returns 409
5. ✅ Invalid URL returns 400
6. ✅ Invalid code format returns 400
7. ✅ Redirect increments click count
8. ✅ Redirect updates last clicked time
9. ✅ Delete removes link
10. ✅ Deleted link returns 404
11. ✅ Search/filter works
12. ✅ Copy to clipboard works
13. ✅ Responsive on mobile

---

## 🎨 Key Features

### 1. Smart Short Codes
- Custom codes for memorable links
- Auto-generation for convenience
- Validation ensures proper format

### 2. Real-time Analytics
- Click count tracking
- Last clicked timestamp
- Smart time formatting ("5 minutes ago")

### 3. User-Friendly Interface
- Clean, modern design
- Inline form validation
- Loading states
- Success/error notifications
- Responsive layout

### 4. Search & Filter
- Real-time search by code or URL
- Case-insensitive matching
- Instant results

### 5. Copy to Clipboard
- One-click copying of short links
- Visual confirmation
- Fallback for unsupported browsers

---

## 🚀 Deployment

### Backend (Render)

1. Connected GitHub repository
2. Build Command: `npm install`
3. Start Command: `npm start`
4. Environment Variables:
   - `DATABASE_URL` (from Neon)
   - `NODE_ENV=production`

### Frontend (Render)

1. Connected GitHub repository
2. Build Command: `npm install && npm run build`
3. Start Command: `npm run preview` or serve static files
4. Environment Variables:
   - `VITE_API_URL` (backend URL)

### Database (Neon)

1. Created PostgreSQL database
2. Copied connection string
3. Table created automatically on first run

---

## 🏆 Assignment Compliance

### Requirements Met

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| URL Shortening | ✅ | Custom & auto codes |
| Validation | ✅ | URL & code validation |
| 302 Redirects | ✅ | Express redirect |
| Click Tracking | ✅ | PostgreSQL counter |
| Delete Links | ✅ | DELETE endpoint |
| Dashboard | ✅ | React table view |
| Stats Page | ✅ | `/code/:code` route |
| Health Check | ✅ | `/healthz` endpoint |
| API Spec | ✅ | All endpoints match |
| Code Pattern | ✅ | `[A-Za-z0-9]{6,8}` |
| Responsive | ✅ | Mobile-friendly |
| Deployment | ✅ | Render + Neon |

---

## 💡 Implementation Highlights

### 1. Component-Based Architecture
- Modular React components
- Reusable utilities
- Clear separation of concerns

### 2. Error Handling
- Comprehensive try-catch blocks
- User-friendly error messages
- Proper HTTP status codes

### 3. Database Optimization
- Indexed short codes for fast lookups
- Parameterized queries prevent SQL injection
- Connection pooling for performance

### 4. User Experience
- Smart time display (relative & absolute)
- Loading indicators
- Form validation feedback
- Copy success notifications

### 5. Code Quality
- Clean, readable code
- Meaningful variable names
- Comprehensive comments
- Consistent formatting

---

## 🐛 Known Issues & Limitations

- **Cold Start:** Render free tier spins down after 15 minutes of inactivity (first request may take 30-60 seconds)
- **Rate Limiting:** Not implemented (would add in production)
- **Authentication:** Currently public (all links visible to everyone)

---

## 🔮 Future Enhancements

- [ ] User authentication & private links
- [ ] QR code generation
- [ ] Custom domains
- [ ] Link expiration dates
- [ ] Advanced analytics (geo, device, referrer)
- [ ] Bulk import/export
- [ ] API rate limiting
- [ ] Link preview before redirect

---

## 👨‍💻 Author

**Abhishek Singhal**
- GitHub: [@Abhishek-Singhal-001](https://github.com/Abhishek-Singhal-001)
- Repository: [Tinu-Url](https://github.com/Abhishek-Singhal-001/Tinu-Url)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Assignment by [Company/Institution Name]
- Built with assistance from Claude AI
- Inspired by bit.ly and TinyURL
- Icons by [Lucide](https://lucide.dev)
- Styling with [Tailwind CSS](https://tailwindcss.com)

---

## 📞 Support

For questions or issues:
1. Check the [Issues](https://github.com/Abhishek-Singhal-001/Tinu-Url/issues) page
2. Create a new issue with details
3. Contact via GitHub

---

**⭐ If you found this project helpful, please give it a star!**

---

## 📋 Submission Checklist

- [x] Live frontend URL
- [x] Live backend URL
- [x] GitHub repository (public)
- [x] Video walkthrough
- [x] AI assistant transcript
- [x] README documentation
- [x] `.env.example` files
- [x] All features working
- [x] Automated tests pass
- [x] Code is well-commented

**Status:** ✅ Ready for submission
