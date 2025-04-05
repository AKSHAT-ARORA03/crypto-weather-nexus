# CryptoWeather Nexus

## Features
- **Dashboard**: Displays weather, crypto prices, and news in a responsive grid layout.
- **City Details**: Shows current weather and a 4-day temperature history chart (mock data).
- **Crypto Details**: Displays current metrics, a 7-day price history chart, and a table.
- **Real-Time Updates**: WebSocket for crypto price notifications (with fallback).
- **Favorites**: Toggle favorite cities and cryptocurrencies.
- **UI/UX**: Dark mode support, hover effects, and toast notifications.

## Setup Instructions

### Clone the Repository
```powershell
git clone https://github.com/your-username/crypto-weather-nexus.git
cd crypto-weather-nexus

### 📦 Install Dependencies

```bash
npm install
```

---

### 🔐 Set Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_COINGECKO_API=https://api.coingecko.com/api/v3
NEXT_PUBLIC_COINGECKO_API_KEY=CG-S9fUEYMWJNe31T4cTyTcvmMK
NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=your-openweathermap-key
NEXT_PUBLIC_NEWSDATA_API_KEY=your-newsdata-key
```

> 🛠️ Replace `your-openweathermap-key` and `your-newsdata-key` with your actual API keys.

---

### 💻 Run Locally

```bash
npm run dev
```

Then open your browser and visit:  
[http://localhost:3000](http://localhost:3000)

---

## ☁️ Deploy to Vercel (Optional)

1. Push the project to GitHub.
2. Import the repository into [Vercel](https://vercel.com/).
3. Add the same environment variables in the Vercel dashboard.
4. Deploy and go live 🚀

---

## 🛠️ Challenges & Resolutions

### 1. API Key and URL Misconfiguration
- **Issue**: 404 errors from CoinGecko.
- **Fix**: Separated base URL and API key in `.env.local`.

### 2. 401 Unauthorized from CoinGecko
- **Issue**: API key invalid or not activated.
- **Fix**: Made API key optional; free tier works without it (50 calls/minute).

### 3. WebSocket Failure
- **Issue**: WebSocket to `wss://ws.coincap.io` failed.
- **Fix**: Added logging, fallback using `setInterval` to simulate real-time updates.

### 4. Missing Weather History Data
- **Issue**: OpenWeatherMap’s free tier lacks historical data.
- **Fix**: Used mock data for charts. Suggest Weatherbit (paid) for real data.

### 5. Module Not Found Error
- **Issue**: Import error from `../../redux/weatherSlice`.
- **Fix**: Removed `src/pages`, reinstalled dependencies after cleaning `.next` and `node_modules`.

### 6. UI/UX Consistency
- **Issue**: Poor layout.
- **Fix**: Redesigned using Tailwind CSS grid layout, dark mode, and responsive cards.

---

## 🔄 API Alternatives

### 🔸 Weather APIs

| API             | Free Tier      | Features                  |
|------------------|----------------|----------------------------|
| OpenWeatherMap   | 60 calls/min   | ✅ Used in project         |
| WeatherAPI.com   | 1M calls/month | Historical data (limited) |
| Tomorrow.io      | 500 calls/day  | Hyperlocal forecast       |
| Weatherbit       | 500 calls/day  | 7-day historical (free)   |

### 🔸 Crypto APIs

| API             | Free Tier        | Features                      |
|------------------|------------------|------------------------------|
| CoinGecko        | 50 calls/min     | ✅ Used in project           |
| CoinMarketCap    | 10K calls/month  | Historical data              |
| CryptoCompare    | 100K calls/month | Real-time + Historical       |
| Nomics (⚠️)      | Discontinued     | ❌ Do not use                |

### 🔸 News APIs

| API             | Free Tier        | Features                    |
|------------------|------------------|------------------------------|
| NewsData.io      | 200 req/day      | ✅ Used in project           |
| NewsAPI          | 100 req/day      | Crypto + keyword filter      |
| Currents         | 100 req/day      | General news                 |
| Google News RSS  | Unlimited        | Requires custom parsing      |

---

## 📦 Dependencies

Install the following with a single command:

```bash
npm install next redux @reduxjs/toolkit react-redux axios react-chartjs-2 chart.js react-toastify tailwindcss
```

---

## 🔮 Future Improvements

- Add real historical weather using paid API.
- Create a favorites page for cities and cryptos.
- Add WebSocket retry logic.
- Search functionality for crypto/city names.

---

## 🙌 Acknowledgments

- Built with guidance from Grok (xAI) on April 5, 2025.
- Uses public APIs: CoinGecko, OpenWeatherMap, and NewsData.io.

---

## 📤 Add to GitHub

### 1. Create README

Save this file as `README.md` in the root of your project folder.

### 2. Stage, Commit & Push

```bash
git add README.md
git commit -m "Added project documentation"
git push origin main
```

### 3. Verify

Go to your repo:  
`https://github.com/your-username/crypto-weather-nexus`

> ✏️ Replace `your-username` with your actual GitHub username.

---

✅ That’s it! Your project now looks clean and professional on GitHub.
