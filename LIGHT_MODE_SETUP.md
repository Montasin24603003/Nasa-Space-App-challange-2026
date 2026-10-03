# Martian Map — Light Mode + Free AI Setup

This build uses a light mission-control interface by default.

## Run

```powershell
npm install
npm run dev
```

## Free AI

Copy `.env.example` to `.env` and set:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
GEMINI_MODEL=gemini-2.5-flash-lite
NASA_API_KEY=DEMO_KEY
```

The AI Mission Advisor endpoint is `/api/mars-advisor` and keeps the Gemini key server-side.

## Sol-by-Sol simulator

The original HTML simulator is preserved as:

- `public/sol-simulator/index.html`
- `public/sol-simulator/styles.css`
- `public/sol-simulator/app.js`

The React route `/sol-by-sol` embeds the simulator while the rest of the application remains React/TanStack Start.
