# CryptoWeather Nexus

A modern dashboard combining weather, cryptocurrency, and news data with real-time WebSocket updates.

## Setup
1. Clone the repo: `git clone <repo-url>`
2. Install dependencies: `npm install`
3. Add API keys to `.env.local` (see `.env.local` example above).
4. Run locally: `npm run dev`

## Usage
- Visit `/` for the dashboard.
- Navigate to `/city/<city-name>` or `/crypto/<crypto-id>` for details.
- Favorite cities or cryptos with the heart button.
- Real-time price updates via WebSocket appear as toasts.

## Design Decisions
- **Next.js**: For SSR/SSG and file-based routing.
- **Redux**: Global state management with async thunks for API calls.
- **Tailwind CSS**: Rapid, responsive styling.
- **WebSocket**: CoinCap for live crypto prices; simulated weather alerts via Redux.

## Deployment
Deployed on Vercel: [https://crypto-weather-nexus.vercel.app](https://crypto-weather-nexus.vercel.app)