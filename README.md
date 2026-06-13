# Journal App - Frontend

React-based UI for the journal application with dashboards, weather widgets, sentiment tracking, and responsive design.

## Tech Stack

- React 18 + Vite 5
- React Router v6 — routing
- Axios — HTTP client with JWT interceptor
- Framer Motion — animations
- Tailwind CSS — styling
- React Icons — icon library

## Prerequisites

- Node.js 18+
- npm or yarn
- Backend API server running (see [journal-backend](https://github.com/anasmks/journal-backend))

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `VITE_API_BASE_URL` | No | `http://localhost:8080` | Backend API base URL |

## Run Locally

```bash
# Clone the repo
git clone https://github.com/anasmks/journal-frontend.git
cd journal-frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

The app starts at `http://localhost:5173`. It proxies `/api` requests to `http://localhost:8080` via Vite's built-in proxy.

## Build for Production

```bash
npm run build
```

Output is in the `dist/` directory.

## Deployment

### Vercel (recommended)

1. Push code to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Framework preset: **Vite**
4. Set env var: `VITE_API_BASE_URL` = your deployed backend URL
5. Deploy

### Docker

```bash
# Build
docker build -t journal-frontend .

# Run
docker run -p 5173:80 \
  -e VITE_API_BASE_URL=https://your-backend-url.com \
  journal-frontend
```

## Pages

| Route | Access | Description |
|---|---|---|
| `/` | Public | Landing page (redirects to dashboard if logged in) |
| `/login` | Public | Sign in |
| `/register` | Public | Create account (with sentiment analysis toggle) |
| `/dashboard` | Protected | Stats, recent entries, weather, streak |
| `/journals` | Protected | Searchable journal grid |
| `/create` | Protected | New journal entry form |
| `/edit/:id` | Protected | Edit existing entry |
| `/profile` | Protected | Update username/password, delete account |
| `/*` | Public | 404 page |

## Project Structure

```
src/
├── api/              # Axios instance with JWT interceptor
├── components/       # Reusable UI components
│   ├── Navbar.jsx
│   ├── WeatherWidget.jsx
│   ├── JournalCard.jsx
│   ├── ProtectedRoute.jsx
│   └── ...
├── context/          # Auth and Toast React contexts
├── hooks/            # Custom hooks (useAuth, useToast)
├── layouts/          # MainLayout with Navbar + Outlet
├── pages/            # Page components
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── JournalList.jsx
│   └── ...
├── routes/           # Route definitions
├── services/         # API service modules
└── utils/            # Helper functions
```

## Features

- **JWT Authentication** — token stored in localStorage, auto-attached to requests, 401 redirect
- **Dashboard** — entry stats, writing streak, word count, top mood
- **Weather Widget** — live weather from WeatherStack (cached in Redis)
- **Sentiment Analysis** — optional mood tagging per entry
- **Search** — filter journal entries by title/content
- **Responsive** — fully responsive with mobile navigation
- **Animations** — Framer Motion page transitions

## License

MIT
