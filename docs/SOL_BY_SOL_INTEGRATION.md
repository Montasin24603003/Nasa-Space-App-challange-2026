# Sol by Sol integration

- `public/sol-simulator/index.html` preserves the original simulator UI.
- `public/sol-simulator/styles.css` contains its extracted CSS.
- `public/sol-simulator/app.js` contains its extracted JavaScript plus the AI advisor client.
- `/sol-by-sol` is the integrated React route that embeds the original simulator.
- `/api/mars-advisor` is a TanStack Start server API. With `OPENAI_API_KEY`, it calls the OpenAI Responses API server-side; without a key, it uses a transparent local fallback so the demo still works.
- Copy `.env.example` to `.env` and add `OPENAI_API_KEY` to enable the live AI provider. Do not put the key in browser JavaScript.
