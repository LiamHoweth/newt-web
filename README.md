# All4One Exterior Solutions

A conversion-focused website for **All4One Exterior Solutions**, a local exterior cleaning business. Visitors can browse services and request free quotes. The owner manages leads and site settings from a password-protected admin dashboard.

## Features

- **Public pages**: Home, Services, Quote form, Contact
- **Lead capture**: Validates and stores quote requests
- **Owner notifications**: Email via [Resend](https://resend.com), optional SMS via [Twilio](https://twilio.com)
- **Admin dashboard** (`/admin`): View/update leads, edit business settings
- **Flexible storage**: Supabase in production, local JSON fallback for development
- **Optional photo uploads**: Supabase Storage when configured

## Tech Stack

- [Next.js 15](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase](https://supabase.com) (optional)
- [Resend](https://resend.com) (optional)
- [Twilio](https://twilio.com) (optional)
- [Lucide React](https://lucide.dev) icons

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy the example env file and fill in values:

```bash
cp .env.example .env.local
```

At minimum, set:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public URL (used in email/SMS dashboard links) |
| `ADMIN_PASSWORD` | Password for `/admin` dashboard |

For production lead storage, add Supabase credentials. For email notifications, add Resend keys.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without Supabase configured, leads and settings are stored in `./data/` as JSON files — fine for local development.

### 4. Set up Supabase (recommended for production)

1. Create a [Supabase](https://supabase.com) project
2. Run `supabase/schema.sql` in the SQL editor
3. Create a public storage bucket named `quote-photos`
4. Add `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`

### 5. Configure notifications

**Email (Resend)**

1. Create a [Resend](https://resend.com) account and API key
2. Set `RESEND_API_KEY` and `OWNER_NOTIFICATION_EMAIL`
3. Optionally set `RESEND_FROM_EMAIL` with a verified domain

**SMS (Twilio — optional)**

1. Create a [Twilio](https://twilio.com) account
2. Set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`, and `OWNER_SMS_NUMBER`
3. The app works fully without Twilio — SMS is skipped when env vars are missing

## Admin Dashboard

Visit `/admin` and sign in with your `ADMIN_PASSWORD`.

From the dashboard you can:

- View and filter quote requests
- Update lead status (New → Contacted → Quoted → Scheduled → Won/Lost)
- View full lead details
- Edit business phone, email, service area, hours, announcement, and enabled services

## Project Structure

```
app/                  # Pages and API routes
components/           # UI components (layout, home, services, quote, admin)
lib/                  # Storage, notifications, auth, validation, types
supabase/schema.sql   # Database schema
data/                 # Local JSON fallback (gitignored)
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

## Deployment

Deploy to [Vercel](https://vercel.com) or any Node.js host:

1. Push to GitHub
2. Connect the repo to Vercel
3. Add all env vars from `.env.example`
4. Set `NEXT_PUBLIC_SITE_URL` to your production domain

## Important Notes

- Phone, email, service area, and hours are **editable placeholders** — update them in the admin dashboard
- No unverified claims (licensing, pricing, city) are hard-coded
- Work photos live on Instagram — the site links there instead of hosting a gallery
- Photo upload requires Supabase Storage configuration

## Instagram

Follow the business: [@all4one.exteriorsolutions](https://www.instagram.com/all4one.exteriorsolutions/)
