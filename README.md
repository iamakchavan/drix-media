<div align="center">
  <img src="public/Drix Media Logo/web-logo-600.png" alt="Drix Media" width="220" />
  <br /><br />
  <p>Marketing & creative agency website with a full-featured content management dashboard.</p>
</div>

---

## Stack

- **React 18** + TypeScript + Vite
- **Tailwind CSS** — styling
- **Framer Motion** — animations
- **Lenis** — smooth scroll
- **React Router v6** — routing
- **Editor.js** — rich text blog editor
- **Supabase** — database, auth, and image storage

## Pages

| Route | Description |
|---|---|
| `/` | Home |
| `/about` | About |
| `/services` | Services |
| `/projects` | Portfolio grid |
| `/projects/:id` | Project detail |
| `/blog` | Blog listing |
| `/blog/:id` | Blog post detail |
| `/contact` | Contact form |
| `/admin` | CMS dashboard |

## Admin Dashboard

The `/admin` route is a full CMS for managing blog posts, portfolio projects, and contact form submissions. It uses Supabase for auth, data, and image storage.

## Local Setup

**Prerequisites:** Node.js, pnpm

```bash
pnpm install
```

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

```bash
pnpm dev
```

## Deploy (Vercel)

Add the same two environment variables in **Vercel → Project → Settings → Environment Variables**, then deploy.

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```
