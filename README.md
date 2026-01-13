# DataBender Marketing Website

Marketing website for DataBender, a boutique data analytics and AI consulting firm.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS 4
- **Animations**: Framer Motion, Lottie (DotLottie format)
- **AI Chat**: Claude API (Anthropic)
- **Email**: AWS SES
- **Hosting**: AWS Amplify
- **Database**: AWS DynamoDB (analytics)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run production server
npm run start

# Lint code
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── src/
│   ├── app/                    # Next.js pages and API routes
│   │   ├── api/               # API endpoints (chat, contact, etc.)
│   │   ├── blog/              # Blog pages
│   │   ├── case-studies/      # Interactive case study pages
│   │   ├── industries/        # Industry-specific pages
│   │   ├── services/          # Service pages
│   │   └── assessments/       # Self-assessment tools
│   ├── components/            # React components
│   │   ├── ui/               # Base components (Button, Card, etc.)
│   │   ├── sections/         # Page sections (Hero, CTA, Features)
│   │   ├── layout/           # Header, Footer
│   │   └── case-study-diagrams/  # Interactive diagram system
│   ├── lib/                   # Data and utilities
│   └── types/                 # TypeScript definitions
├── public/
│   ├── images/               # Static images
│   └── animations/           # Lottie files (.json source, .lottie compressed)
├── docs/                      # Development documentation
└── CLAUDE.md                  # AI assistant instructions
```

## Environment Variables

Create a `.env.local` file:

```env
ANTHROPIC_API_KEY=         # Required for AI chatbot
NEXT_PUBLIC_BOOKING_URL=   # Calendar booking link

# AWS Services (optional for local dev)
SES_FROM_EMAIL=            # AWS SES sender email
SES_REGION=                # AWS SES region (us-east-1)
DYNAMODB_REGION=           # DynamoDB region (us-east-1)

# Notifications (optional)
CHAT_NOTIFY_EMAIL=         # Email for chat digests
SLACK_WEBHOOK_URL=         # Slack webhook for alerts
```

## Key Features

- **AI-Powered Chat**: Claude-based chatbot for visitor engagement
- **Interactive Case Studies**: Custom visualizations and diagrams
- **Self-Assessment Tools**: Lead qualification assessments
- **Mobile-Optimized**: Responsive design with touch-friendly interactions
- **Performance**: Static generation where possible, dynamic where needed

## Design System

- **Primary Color**: Teal (`#1A9988`)
- **Typography**: Inter font family
- **Defined in**: `src/app/globals.css` using Tailwind's `@theme`

## Development Notes

- See `CLAUDE.md` for detailed architecture and patterns
- Case studies have custom pages in `src/app/case-studies/[name]/`
- Blog content is in `src/lib/blog-data.ts`
- Navigation structure is in `src/lib/navigation.ts`

## License

Proprietary - DataBender LLC
