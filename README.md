# 🔥 VIT Gossips

> The unfiltered, anonymous Reddit for VIT students — Vellore, Bhopal, Chennai & AP campuses.

**Live App:** [vit-gossips-app.vercel.app](https://vit-gossips-app.vercel.app)

---

## What is VIT Gossips?

VIT Gossips is a Reddit-style anonymous community platform built exclusively for VIT students. Post gossip, placement updates, professor reviews, hostel complaints, memes, and more — anonymously or with your username.

---

## Features

- 🔐 **VIT Email Only** — Only `@vitbhopal.ac.in`, `@vitvellore.ac.in`, `@vitchennai.ac.in`, `@vitap.ac.in` emails allowed
- 👤 **Anonymous Posting** — Post as "VITian" — no one knows it's you
- 🏠 **Campus Boards** — r/Gossip, r/Placements, r/Hostel, r/ProfReviews, r/Memes, r/ExamHelp and more
- 🔥 **Hot / New / Top** — Reddit-style feed ranking
- 💬 **Threaded Comments** — Nested comments with anonymous mode
- 📸 **Photo & Video Upload** — Share media with your posts
- 🗑️ **Delete Posts/Comments** — Full control over your content
- 🌙 **Dark / Light Mode** — Toggle from the menu
- 🔍 **Search** — Search posts across all boards
- 📜 **Rules & User Agreement** — Community guidelines enforced

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) + Tailwind CSS |
| Backend | Next.js API Routes |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (Magic Link) |
| Storage | Supabase Storage |
| Deploy | Vercel |

---

## Local Setup

```bash
# Clone the repo
git clone https://github.com/sagarshuklaa/vit-gossips-app.git
cd vit-gossips-app

# Install dependencies
npm install

# Create .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Run dev server
npm run dev
```

---

## Database Schema

- `profiles` — User profiles linked to Supabase auth
- `boards` — Community boards (subreddits)
- `posts` — Posts with anonymous mode, media, flair
- `comments` — Nested comments
- `votes` — Upvote/downvote system
- `board_members` — Board memberships

---

## Community Rules

1. VIT students only
2. No personal attacks
3. No private information
4. No fake news
5. Keep it VIT related
6. No NSFW content
7. Respect anonymity

---

## Disclaimer

VIT Gossips is an independent student platform and is **not affiliated with or endorsed by VIT University**.

---

## Author

Built by a VIT Bhopal CS student 🚀

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sagarshuklaa/vit-gossips-app)
