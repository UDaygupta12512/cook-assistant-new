# CookAssistant 🍳

An AI-powered cooking assistant built with Next.js and Google Gemini. Generate recipes, analyze nutrition, scan ingredients, cook hands-free with voice, and more — all in one app.

## Features

- **AI Recipe Generator** — Generate detailed, step-by-step recipes for any dish instantly using Gemini AI
- **Voice Control** — Cook completely hands-free with speech synthesis and voice navigation
- **Image Scan** — Photograph your fridge or pantry and get recipe suggestions from what you have
- **How to Cook** — Interactive step-by-step cooking guide with text-to-speech in English and Hindi
- **Nutrition Analyzer** — Get a full nutritional breakdown, health score, macros, micronutrients, and diet compatibility for any food
- **Health Check** — Calculate your BMI, daily calorie needs (TDEE), and personalized macro targets
- **Healthy Swaps** — Discover science-backed ingredient substitutions with nutrition comparisons
- **Smart Pantry** — Track your ingredients and reduce food waste with expiry alerts
- **Cuisines Explorer** — Browse dishes from cuisines around the world
- **Chef Chatbot** — Ask any cooking question and get instant AI answers
- **My Recipes** — Save and manage your favourite recipes
- **Meal Planner** — Plan your meals for the week
- **Cooking Timer** — Built-in timer for your recipes
- **Unit Converter** — Convert between cooking measurements instantly
- **Internationalization** — Full English and Hindi language support

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| AI | Google Gemini 2.5 Flash |
| Auth | NextAuth.js |
| i18n | next-intl |
| Animations | Framer Motion |
| Icons | Lucide React |

## Getting Started

### Prerequisites

- Node.js 18+
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)

### Installation

```bash
# Clone the repository
git clone https://github.com/UDaygupta12512/cook-assistant.git
cd cook-assistant

# Install dependencies
npm install

# Create your environment file
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file in the root with the following:

```env
GEMINI_API_KEY=your_gemini_api_key_here
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # All pages (i18n routing)
│   │   ├── generate/      # AI Recipe Generator
│   │   ├── how-to-cook/   # Step-by-step cooking guide
│   │   ├── nutrition-analyzer/
│   │   ├── health-check/
│   │   ├── healthy-swaps/
│   │   ├── scan/          # Image ingredient scanner
│   │   ├── pantry/
│   │   ├── recipes/
│   │   └── ...
│   └── api/               # API routes (Gemini, Auth, etc.)
├── components/
│   ├── home/              # Landing page components
│   ├── layout/            # Navbar, Footer, Chatbot
│   └── ui/                # Reusable UI components
├── lib/                   # AI model, recipe data, auth utils
├── i18n/                  # Translations (en, hi)
└── store/                 # Zustand state management
```

## Deployment

The easiest way to deploy is with [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the repo on Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy

## License

MIT
