# Collectra 🗂️

> **Your personal knowledge vault — save, organize, and rediscover everything that matters.**
>
> 🌐 Live App: [https://collectra.online](https://collectra.online)
> Built by **Piyush Sirolia**

---

## What is Collectra?

Collectra is a full-stack web application that lets you save anything from the internet — articles, videos, PDFs, tweets, images, documents — organize them into collections, generate AI-powered highlights, and rediscover forgotten content through a smart resurfacing engine.

Think of it as your personal second brain: everything you find valuable on the web, stored in one beautiful, searchable vault.

---

## Features

### Save Anything
- Paste any URL and Collectra automatically scrapes the title, description, thumbnail, and content type
- Upload files directly: PDF, Word (.doc/.docx), Excel, PowerPoint, and images (JPG, PNG, WebP, GIF)
- Special YouTube handling via oEmbed API for accurate video titles and thumbnails
- Browser extension support for one-click saving from any page

### Smart Collections
- Create unlimited color-coded collections to organize your content
- Assign items to collections on save or later
- Filter your vault by collection, content type, favorite status, or tags
- Deleting a collection moves its items to "uncategorized" — nothing gets lost

### AI-Powered Features (via Groq / Llama 3.1)
- **Auto-tagging**: Every saved item gets 3–7 semantic tags generated automatically in the background
- **AI Summary**: A 2–3 line summary is generated for each item
- **AI Highlights**: Open any item and let AI extract the most important sentences — pick the ones you want to keep
- **Retag All**: Regenerate tags for your entire vault with one click

### Semantic Search
- Toggle between keyword search and AI semantic search
- Semantic search uses local vector embeddings (`@xenova/transformers`, `all-MiniLM-L6-v2` model)
- Falls back to keyword regex search if the embedding model is unavailable

### Knowledge Graph
- Visual graph of all your saved items connected by shared tags
- Explore unexpected connections between content you've saved
- Navigate to `/graph` from the navbar

### Topic Clusters
- Auto-generated topic buckets based on AI tags
- Shows a 2×2 image mosaic per topic with item count
- Click a topic to filter all items by that tag

### Resurface Engine
- Items saved 7+ days ago and not recently viewed get surfaced again
- Daily cron job (9:00 AM IST) sends a "Time to revisit" email with 3 random items
- Also available on-demand from the dashboard

### Highlights & Notes
- Manually highlight any text from a saved item
- Attach a personal note to each highlight
- AI can suggest highlights automatically

### Favorites
- Star any item to add it to your favorites
- Filter by favorites from the sidebar or query params

### Related Items
- Every item shows up to 5 related items based on shared tags
- Helps you navigate your vault contextually

### Profile & Account
- Update display name, username, and bio
- Upload a custom profile picture (stored on Cloudinary)
- Change password (local accounts only)
- Google account users can log in with one click

### Authentication
- Local email/password login with JWT (stored in HTTP-only cookie + localStorage)
- Google OAuth 2.0 via Passport.js
- Forgot password → email reset link (expires in 15 minutes)
- Reset password with strength indicator
- Chrome extension token sync support

---

## Tech Stack

### Frontend
| Tech | Usage |
|---|---|
| **React** | UI framework |
| **React Router** | Client-side routing |
| **SCSS** | Styling (component-scoped + global variables) |
| **Axios** | HTTP client with instance config |
| **Context API** | State management (Auth, Items, Collections) |
| **Custom Hooks** | `useAuth`, `useItems`, `useCollections` |

### Backend
| Tech | Usage |
|---|---|
| **Node.js + Express 5** | Server framework |
| **MongoDB + Mongoose** | Database & ODM |
| **JWT + bcryptjs** | Auth tokens & password hashing |
| **Passport.js** | Google OAuth 2.0 strategy |
| **Multer** | File upload (memory storage) |
| **Cloudinary** | File & image storage (CDN) |
| **Axios + Cheerio** | Web scraping (OG tags, meta info) |
| **pdfjs-dist** | PDF text extraction |
| **mammoth** | Word (.docx) text extraction |
| **xlsx** | Excel file reading |
| **node-cron** | Daily resurfacing email job |
| **Resend** | Transactional email service |
| **express-validator** | Input validation |
| **express-session + cookie-parser** | Session & cookie handling |

### AI / ML
| Tech | Usage |
|---|---|
| **Groq API** (`llama-3.1-8b-instant`) | Tag generation, summarization, AI highlights |
| **LangChain** (`@langchain/groq`) | Prompt templates & structured output parsing |
| **@xenova/transformers** | Local embedding model (`all-MiniLM-L6-v2`) |
| **Zod** | Schema validation for AI structured outputs |

---

## Project Structure

```
collectra/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── config.js          # Env variable validation & export
│   │   │   ├── database.js        # MongoDB connection
│   │   │   ├── cloudinary.js      # Cloudinary SDK setup
│   │   │   └── passport.js        # Google OAuth strategy
│   │   ├── controllers/
│   │   │   ├── auth.controller.js        # Register, login, logout, forgot/reset password
│   │   │   ├── Profile.controller.js     # Profile update, picture upload/remove, password change
│   │   │   ├── collection.controller.js  # Collection CRUD
│   │   │   └── item.controller.js        # Item CRUD + all advanced features
│   │   ├── models/
│   │   │   ├── user.model.js       # User schema (local + Google)
│   │   │   ├── item.model.js       # Item schema (url, tags, embedding, highlights, etc.)
│   │   │   └── collection.model.js # Collection schema
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── item.routes.js
│   │   │   └── collection.routes.js
│   │   ├── middlewares/
│   │   │   ├── user.middleware.js   # JWT verification (cookie + Bearer)
│   │   │   └── upload.middleware.js # Multer config (10MB, whitelisted types)
│   │   ├── services/
│   │   │   ├── ai.service.js           # Groq tag/summary/highlight generation
│   │   │   ├── item.ai.service.js      # AI highlights, backfill, retag
│   │   │   ├── Item.service.js         # Core item business logic
│   │   │   ├── Item.search.service.js  # Graph, semantic search, topic clusters
│   │   │   ├── Embedding.service.js    # Vector embeddings + cosine similarity
│   │   │   ├── cloudinary.service.js   # Upload/delete from Cloudinary
│   │   │   ├── fileReader.service.js   # PDF/Word/Excel content extraction
│   │   │   ├── scraper.service.js      # Web scraper (Axios + Cheerio)
│   │   │   └── mail.service.js         # Email via Resend
│   │   ├── jobs/
│   │   │   └── resurfaceCron.js    # Daily 9 AM IST resurface email
│   │   ├── validators/
│   │   │   └── auth.validator.js
│   │   └── app.js                  # Express app setup, CORS, routes
│   ├── server.js                   # Entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── features/
    │   │   ├── auth/
    │   │   │   ├── pages/          # Login, Register, ForgotPassword, ResetPassword
    │   │   │   ├── hooks/          # useAuth.js
    │   │   │   ├── context/        # AuthContext.jsx
    │   │   │   └── api/            # auth.api.js
    │   │   ├── items/
    │   │   │   ├── components/     # ItemCard, AddItemModal, TopicClusters
    │   │   │   ├── hooks/          # useItems.js
    │   │   │   ├── context/        # ItemsContext.jsx
    │   │   │   └── api/            # items.api.js
    │   │   └── collections/
    │   │       ├── hooks/          # useCollections.js
    │   │       ├── context/        # CollectionsContext.jsx
    │   │       └── api/            # collections.api.js
    │   ├── pages/
    │   │   ├── Welcome/            # Landing page (Navbar, Hero, Features, HowItWorks, Builder, Footer)
    │   │   ├── Dashboard/          # Main app dashboard
    │   │   ├── ItemDetail/         # Single item view
    │   │   ├── KnowledgeGraph/     # Graph visualization
    │   │   └── Profile/            # User profile settings
    │   ├── shared/
    │   │   ├── components/         # Navbar, Sidebar
    │   │   └── icons/
    │   ├── lib/
    │   │   └── axios.js            # Axios instance with base URL
    │   └── styles/
    │       ├── _variables.scss
    │       ├── global.scss
    │       └── Style.scss          # Auth styles
```

---

## API Endpoints

### Auth — `/api/auth`
| Method | Route | Description |
|---|---|---|
| POST | `/register` | Register new user |
| POST | `/login` | Login with email & password |
| GET | `/me` | Get current user |
| POST | `/logout` | Logout |
| GET | `/google` | Initiate Google OAuth |
| GET | `/google/callback` | Google OAuth callback |
| POST | `/forgot-password` | Send reset email |
| POST | `/reset-password/:id/:token` | Reset password |
| PUT | `/profile` | Update displayName, bio, username |
| POST | `/profile/picture` | Upload profile picture |
| DELETE | `/profile/picture` | Remove profile picture |
| PUT | `/profile/password` | Change password |

### Items — `/api/items`
| Method | Route | Description |
|---|---|---|
| GET | `/` | Get all items (with filters & pagination) |
| POST | `/` | Create item (URL or file upload) |
| GET | `/:id` | Get single item |
| PUT | `/:id` | Update item |
| DELETE | `/:id` | Delete item |
| PATCH | `/:id/favorite` | Toggle favorite |
| POST | `/:id/highlight` | Add highlight |
| DELETE | `/:id/highlight/:highlightId` | Delete highlight |
| GET | `/:id/highlights/generate` | AI-generate highlights |
| GET | `/:id/related` | Get related items |
| PATCH | `/:id/collection` | Remove from collection |
| PATCH | `/:id/add-to-collection` | Add to collection |
| GET | `/resurface` | Get resurface items |
| GET | `/graph` | Get knowledge graph data |
| GET | `/semantic-search` | Semantic search |
| GET | `/topics` | Get topic clusters |
| POST | `/backfill-embeddings` | Backfill missing embeddings |
| POST | `/retag-all` | Retag all items with AI |

### Collections — `/api/collections`
| Method | Route | Description |
|---|---|---|
| GET | `/` | Get all collections (with item count) |
| POST | `/` | Create collection |
| PUT | `/:id` | Update collection |
| DELETE | `/:id` | Delete collection |

---

## Environment Variables

```env
# Database
MONGO_URI=

# Auth
JWT_SECRET=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
GOOGLE_REFRESH_TOKEN=
GOOGLE_USER=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# AI
GROQ_API_KEY=

# Email
RESEND_API_KEY=

# App
FRONTEND_URL=https://collectra.online
PORT=3000
```

---

## Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Cloudinary account
- Groq API key
- Resend API key
- Google OAuth credentials

### Backend Setup
```bash
cd backend
npm install
# Create .env file with variables above
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The backend serves the built frontend from `/dist` in production. For local dev, Vite runs on `http://localhost:5173` and the backend on `http://localhost:3000`.

---

## Deployment

- **Hosting**: Render (backend + frontend served together)
- **Database**: MongoDB Atlas
- **File Storage**: Cloudinary CDN
- **Email**: Resend
- **Domain**: [https://collectra.online](https://collectra.online)

In production, Express serves the React `dist` build as static files and handles all API routes. The `app.js` includes a catch-all route that returns `index.html` for client-side routing.

---

## CORS Configuration

The backend allows requests from:
- `http://localhost:5173` (local dev)
- `https://collectra-ae2v.onrender.com` (Render deployment)
- `https://collectra.online` (production domain)
- `chrome-extension://` (browser extension)

---

## Key Design Decisions

**Background AI processing** — When an item is saved, the response is returned immediately. AI tagging, summarization, and embedding generation run in the background (fire-and-forget) so the user doesn't wait.

**Graceful embedding fallback** — If the `@xenova/transformers` model fails to load (e.g., on low-memory servers), semantic search automatically falls back to keyword regex search.

**Token persistence** — JWT tokens are stored in both HTTP-only cookies (web security) and localStorage (for the Chrome extension). The middleware checks both.

**Resurfacing algorithm** — Items created 7+ days ago that haven't been surfaced recently are picked randomly (MongoDB `$sample`) and sent via daily email. The `lastSurfaced` field prevents the same item from appearing too frequently.

---

## Screenshots & Live Demo

🌐 Visit the live app: **[https://collectra.online](https://collectra.online)**

---

## Author

**Built by Piyush Sirolia**

- 🐙 GitHub: [github.com/piyushh-ai](https://github.com/piyushh-ai)
- 💼 LinkedIn: [linkedin.com/in/piyush-sirolia-070174369](https://linkedin.com/in/piyush-sirolia-070174369)
- 📸 Instagram: [instagram.com/piyush_sirolia](https://instagram.com/piyush_sirolia)

> Collectra was designed, built, and deployed entirely by Piyush Sirolia — from the backend architecture and AI integrations to the frontend UI and landing page.

---

© 2026 Collectra. All rights reserved.