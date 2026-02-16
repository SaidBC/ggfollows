<p align="center">
  <img src="public/images/logo.svg" alt="GGfollows Logo" width="80" />
</p>

<h1 align="center">GGfollows</h1>

<p align="center">
  <strong>Grow your social media presence — organically and for free.</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#how-it-works">How It Works</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000?logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white" />
</p>

---

## ✨ Features

| Category | Details |
|---|---|
| **🌐 Multi-Platform** | Instagram, YouTube, TikTok, X (Twitter), Facebook |
| **🎯 Task System** | Create & complete follow/like/subscribe tasks to earn points |
| **💰 Points Economy** | Earn points through tasks, daily rewards, campaigns & referrals — spend them on growth services |
| **📦 Services Marketplace** | Order followers, likes, and subscribers using points |
| **🏆 Tiered Plans** | **Free** · **Premium** ($5/mo) · **Pro** ($10/mo) with increasing daily limits & rewards |
| **🎁 Daily Rewards** | Login streaks with escalating point bonuses (20 / 50 / 70 pts by plan) |
| **📊 Dashboard** | Track points balance, active tasks, order history & transaction log |
| **🔐 Auth** | Email/password + Google OAuth via NextAuth with JWT sessions |
| **📧 Email Verification** | OTP-based email confirmation via Nodemailer |
| **💳 Payments** | Stripe, PayPal & crypto payments for plan upgrades |
| **🛡️ Admin Panel** | Manage users, tasks, orders, transactions & adjust points |
| **🧪 E2E Tests** | Playwright test suite for critical user flows |
| **📈 Analytics** | Vercel Analytics integration |
| **🔍 SEO** | Dynamic sitemap & robots.txt generation |

---

## 🚀 How It Works

```
 ┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
 │  1. Sign Up &    │     │  2. Complete      │     │  3. Earn Points  │     │  4. Spend Points │
 │  Get 100 Free    │────▶│  Tasks (Follow,   │────▶│  From Tasks,     │────▶│  On Followers,   │
 │  Points          │     │  Like, Subscribe) │     │  Rewards & More  │     │  Likes & Subs    │
 └──────────────────┘     └──────────────────┘     └──────────────────┘     └──────────────────┘
```

1. **Join & Get Free Points** — Create a free account and receive 100 points instantly.
2. **Follow Other Creators** — Complete tasks by following, liking, or subscribing to other users' content.
3. **Earn & Spend Points** — Accumulate points through engagement and spend them on growth services.
4. **Track Your Growth** — Monitor your social stats from a personalized dashboard.

---

## 🛠️ Tech Stack

### Core

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework (App Router) |
| [React 19](https://react.dev/) | UI library |
| [TypeScript 5](https://www.typescriptlang.org/) | Type safety |
| [Prisma 6](https://www.prisma.io/) | Database ORM |
| [PostgreSQL](https://www.postgresql.org/) | Relational database |

### Auth & Data

| Technology | Purpose |
|---|---|
| [NextAuth.js v4](https://next-auth.js.org/) | Authentication (Credentials + Google OAuth) |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | Password hashing |
| [Zod v4](https://zod.dev/) | Schema validation |
| [TanStack Query v5](https://tanstack.com/query) | Server-state management & caching |
| [Axios](https://axios-http.com/) | HTTP client |

### UI & Styling

| Technology | Purpose |
|---|---|
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [Radix UI](https://www.radix-ui.com/) | Accessible headless components |
| [Tabler Icons](https://tabler.io/icons) | Icon library |
| [Lucide React](https://lucide.dev/) | Additional icons |
| [Sonner](https://sonner.emilkowal.dev/) | Toast notifications |
| [next-themes](https://github.com/pacocoursey/next-themes) | Dark/Light mode |
| [React Hook Form](https://react-hook-form.com/) | Form management |

### Testing & DevOps

| Technology | Purpose |
|---|---|
| [Playwright](https://playwright.dev/) | End-to-End testing |
| [ESLint](https://eslint.org/) | Code linting |
| [Vercel](https://vercel.com/) | Deployment platform |
| [Vercel Analytics](https://vercel.com/analytics) | Usage analytics |

---

## 🏁 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **PostgreSQL** database (local or hosted)
- **npm** (or yarn / pnpm / bun)

### 1. Clone the repository

```bash
git clone https://github.com/SaidBC/ggfollows.git
cd ggfollows
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example env file and fill in your values:

```bash
cp .env.test .env
```

Then update `.env` with your actual credentials:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ggfollows?schema=public"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"     # Generate with: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (optional)
GOOGLE_ID="your-google-client-id"
GOOGLE_SECRET="your-google-client-secret"

# Email (SMTP)
EMAIL_SERVER="smtp://user:pass@smtp.example.com:587"
EMAIL_FROM="noreply@ggfollows.com"
```

### 4. Set up the database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed initial data
npx tsx prisma/seed.ts
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
ggfollows/
├── app/
│   ├── (public)/            # Public pages (home, services, plans, auth)
│   ├── (private)/           # Authenticated pages (dashboard, tasks, orders, admin)
│   ├── api/                 # API routes
│   │   ├── auth/            #   Authentication endpoints
│   │   ├── tasks/           #   Task CRUD & completion
│   │   ├── orders/          #   Order management
│   │   ├── payments/        #   Payment processing
│   │   ├── points/          #   Points balance & transfer
│   │   ├── rewards/         #   Daily rewards & campaigns
│   │   ├── services/        #   Services catalog
│   │   ├── users/           #   User management
│   │   └── webhooks/        #   Payment webhooks
│   ├── globals.css          # Global styles & design tokens
│   ├── layout.tsx           # Root layout
│   ├── sitemap.ts           # Dynamic sitemap generation
│   └── robots.ts            # Robots.txt configuration
├── components/              # Reusable UI components
│   ├── ui/                  #   Base components (Button, Dialog, Tabs, etc.)
│   ├── AdBanner.tsx         #   Ad banners (hidden for Premium/Pro)
│   ├── PaymentDialog.tsx    #   Payment modal
│   └── ...
├── hooks/                   # Custom React hooks
│   ├── useCreateTask.ts     #   Task creation
│   ├── useClaimDailyReward.ts  # Daily reward claim
│   ├── usePointsBalance.ts  #   Points balance query
│   └── ...                  #   18 more hooks
├── lib/
│   ├── auth.ts              # NextAuth configuration
│   ├── prisma.ts            # Prisma client singleton
│   ├── siteConfig.ts        # App-wide configuration & constants
│   ├── schemas/             # Zod validation schemas (27 files)
│   └── payments/            # Payment provider integrations
├── prisma/
│   ├── schema.prisma        # Database schema (13 models)
│   ├── migrations/          # Database migration history
│   └── seed.ts              # Database seeder
├── providers/               # React context providers
├── tests/                   # Playwright E2E tests
├── types/                   # TypeScript type definitions
├── ui/                      # Extended UI components (60 files)
├── utils/                   # Utility functions & env config
└── public/                  # Static assets & images
```

---

## 🧪 Testing

Run the Playwright end-to-end test suite:

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run all E2E tests
npm run test:e2e

# Run tests with UI mode
npx playwright test --ui
```

---

## 🚢 Deployment

The project is configured for **Vercel** deployment:

```bash
# Production build (runs migrations + build)
npm run vercel-build
```

The `vercel-build` script automatically runs `prisma migrate deploy` before building, ensuring your database schema is always in sync.

### Environment Variables on Vercel

Make sure to set all required environment variables in your Vercel project settings:

- `DATABASE_URL` — Your production PostgreSQL connection string
- `NEXTAUTH_SECRET` — A strong random secret
- `NEXTAUTH_URL` — Your production URL (e.g., `https://ggfollows.com`)
- `GOOGLE_ID` / `GOOGLE_SECRET` — Google OAuth credentials
- Email SMTP configuration

---

## 💡 Subscription Plans

| Feature | Free | Premium ($5/mo) | Pro ($10/mo) |
|---|:---:|:---:|:---:|
| Daily Reward | 20 pts | 50 pts | 70 pts |
| Active Tasks | 10 | 50 | Unlimited |
| Daily Task Limit | 3 | 15 | Unlimited |
| Ad-Free | ❌ | ✅ | ✅ |
| Premium Campaigns | ❌ | ✅ | ✅ |
| Advanced Analytics | ❌ | ✅ | ✅ |
| Priority Support | ❌ | ❌ | ✅ |
| Task Boost (24h) | ❌ | ❌ | ✅ |

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** this repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

Please make sure your code passes linting and tests before submitting:

```bash
npm run lint
npm run test:e2e
```

---

## 📄 License

This project is proprietary. All rights reserved.

---

<p align="center">
  Built with ❤️ by the <strong>GGfollows</strong> team
</p>
