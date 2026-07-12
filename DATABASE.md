# Database & Auth (Phase 4a)

Sparklyn uses **PostgreSQL** via **Drizzle ORM**, with **Auth.js** (credentials +
optional Google) for authentication. Schema lives in `src/db/schema.ts`;
migrations are committed under `drizzle/`.

## Local development

1. Run a local PostgreSQL and create a database + role:
   ```sql
   CREATE ROLE sparklyn WITH LOGIN PASSWORD 'sparklyn_dev';
   CREATE DATABASE sparklyn OWNER sparklyn;
   ```
2. Copy `.env.example` to `.env` and set:
   ```
   DATABASE_URL="postgresql://sparklyn:sparklyn_dev@127.0.0.1:5432/sparklyn"
   AUTH_SECRET="<openssl rand -base64 32>"
   AUTH_TRUST_HOST=true
   ```
3. Apply migrations and seed:
   ```bash
   npm run db:migrate   # applies drizzle/*.sql
   npm run db:seed      # loads the catalog + a demo account
   ```
4. `npm run dev` and sign in.

### Seeded accounts
| Account | Email | Password |
|---------|-------|----------|
| Demo (populated dashboard) | `demo@sparklyn.ng` | `password123` |
| Admin (for Phase 4c) | `admin@sparklyn.ng` | `admin123` |

New sign-ups are written to the `users` table with a bcrypt-hashed password and
start with an empty dashboard.

## Scripts
| Script | Purpose |
|--------|---------|
| `npm run db:generate` | Generate a new migration from schema changes |
| `npm run db:migrate` | Apply pending migrations |
| `npm run db:seed` | Reset + seed catalog and demo data |
| `npm run db:studio` | Open Drizzle Studio to browse the data |

## Production (Vercel + hosted Postgres)

The app and its API run on Vercel; the database is a **separate hosted Postgres**
(Neon, Supabase, Railway, etc.).

1. Create a Postgres instance and copy its **pooled** connection string.
2. In Vercel → Project → Settings → Environment Variables, set:
   - `DATABASE_URL` (the hosted connection string)
   - `AUTH_SECRET` (`openssl rand -base64 32`)
   - `AUTH_TRUST_HOST=true`
   - optional `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET`
3. Run migrations and seed against the hosted DB once (from your machine with
   `DATABASE_URL` pointed at production):
   ```bash
   npm run db:migrate
   npm run db:seed        # optional: only if you want the demo catalog in prod
   ```

> The Next.js build does **not** touch the database (all DB-backed pages are
> dynamic), so a deploy succeeds even before the DB is provisioned. The homepage
> renders, but `/browse`, `/login` and `/dashboard` need `DATABASE_URL` and
> `AUTH_SECRET` set to work at runtime.

## Notes
- Marketing homepage sections and the nav mega-menu still read the static
  catalog in `src/lib/data.ts`; the dynamic pages (`/browse`, `/search`,
  `/resource/[id]`, `/dashboard`) read from the database. Both are seeded from
  the same source, so they stay consistent. Moving the homepage onto the DB is a
  later cleanup.
- Email verification (`/verify`) and password reset are UI-only until an email
  provider is wired; registration currently signs the user straight in.
