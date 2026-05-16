# Venarium — Job Application Tracker

A focused kanban-style job application tracker built for job seekers who want clarity over chaos. Track every opportunity from wishlist to offer in one clean dashboard.


![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better_Auth-5603AD?style=for-the-badge&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinarylogoColor=white)

## Features

- **Kanban board** — drag and drop job applications across 5 pipeline stages
- **Job cards** — store company, position, location, salary, description, notes, tags and job URL
- **Slide-over panel** — read-only detail view for any job card
- **Authentication** — email/password with verification, Google OAuth, forgot password flow
- **Profile settings** — update avatar via Cloudinary, change password
- **Dark / light mode** — persisted to localStorage
- **Mobile responsive** — stacked columns on mobile, hamburger nav
- **Delete account** — wipes all user data from the database

## Tech Stack

| Layer         | Technology                 |
| ------------- | -------------------------- |
| Framework     | Next.js 16 (App Router)    |
| Language      | TypeScript                 |
| Styling       | Tailwind CSS + shadcn/ui   |
| Database      | MongoDB + Mongoose         |
| Auth          | Better Auth                |
| Drag and Drop | dnd-kit                    |
| Email         | Nodemailer + Gmail SMTP    |
| Image Upload  | Cloudinary                 |
| Fonts         | Geist Sans, Dancing Script |

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Gmail account with App Password enabled
- Cloudinary account
- Google Cloud project with OAuth credentials

### Installation

```bash
git clone https://github.com/solodevx/venarium-job-application-tracker.git
cd venarium-job-application-tracker
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Better Auth
BETTER_AUTH_SECRET=your_random_secret
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Gmail SMTP
GMAIL_USER=your@gmail.com
GMAIL_APP_PASSWORD=your_16_char_app_password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Architecture

```
app/
├── sign-in/              # Email + Google sign in
├── sign-up/              # Email + Google sign up
├── verify-email/         # Post-signup verification screen
├── forgot-password/      # Request reset link
├── reset-password/       # Set new password via token
├── dashboard/            # Protected kanban board page
├── settings/             # Profile picture, password, delete account
└── api/
    ├── auth/             # Better Auth handler
    ├── upload/           # Cloudinary image upload
    └── delete-account/   # Full account + data deletion

components/
├── kanban-board.tsx          # Board, columns, drag and drop logic
├── job-application-card.tsx  # Card UI + slide-over panel + edit dialog
├── create-job-dialog.tsx     # Add new job form
├── navbar.tsx                # Desktop + mobile navigation
├── footer.tsx                # Links, socials, back to top
├── theme-provider.tsx        # Dark/light mode context
└── hero-slideshow.tsx        # Auto-rotating hero images

lib/
├── auth/                 # Better Auth config + client
├── models/               # Mongoose schemas
├── actions/              # Server actions for DB operations
└── hooks/                # useBoard — client state management
```

## Key Design Decisions

**Server Actions over API routes** — job CRUD operations use Next.js server actions for simpler data fetching without separate endpoint boilerplate.

**useBoard hook** — all kanban state lives in a single hook that handles optimistic updates so the UI responds instantly without waiting for the database.

**Client-only DnD rendering** — dnd-kit requires a mounted client to work, so the board renders `null` on the server and mounts after hydration to avoid mismatches.

**Token-based CSS** — all colors are CSS custom properties mapped to Tailwind tokens, making dark mode a single class swap on the `html` element.

## Deployment

Deployed on Vercel. Set all environment variables in the Vercel dashboard and add your production URL to:

- `NEXT_PUBLIC_BETTER_AUTH_URL`
- Google Cloud Console → Authorized redirect URIs

## License

MIT — see [LICENSE](./LICENSE)

---

Built by [solo.devx](https://github.com/solodevx/) · [Twitter](https://x.com/_solodevx) · [LinkedIn](https://www.linkedin.com/in/chukwunnoso-isu/) · [Dev.to](https://dev.to/solodevx)
