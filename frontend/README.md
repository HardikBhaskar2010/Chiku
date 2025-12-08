# Happy Birthday, Chirag · Level 16 Portal

A single-user, neon hacker-style birthday web app handcrafted just for **Chirag**. The experience is fully hard‑wired to his name and birthday lore – there is **no generic name input anywhere**.

> Note: All backend features are **mocked** – this is a design-first, frontend-only prototype.

## Tech Stack

- React (Create React App)
- Tailwind CSS + custom design tokens (HSL-based)
- shadcn/ui primitives (Button, Card, Switch, Slider, Carousel, Toasts)
- `sonner` for toasts
- `html2canvas` for E‑card export (**frontend-only, no server rendering**)

## App Structure (Single-Page App with Internal Screens)

This is a **single-page app** that internally switches between different screens using React state (no URL routing):

- **Home** – Main hacker view with Matrix-style background, hero greeting, HUD, settings preview
- **Gallery** – Placeholder party gallery reserving slots for Chirags real photos
- **Logs** – Inside-joke "chaos logs" about midnight deploys & prod incidents
- **About** – Release notes explaining how the birthday portal works

Navigation is controlled via:
- Header tabs (top-right on desktop)
- HUD tiles in the Birthday HUD card on the Home screen (each tile is a button that opens a different screen)

## Key Features

- Animated hero: **"Happy Birthday, Chirag!"** with neon glow + cycling subtitle lines
- Matrix-style falling code background canvas (throttled when tab is hidden)
- Confetti burst on:
  - Clicking the hero greeting
  - Pressing **C** on the keyboard
- Long-press hero text to "blow out" candles (soft toast-based feedback)
- Easter egg: **Ctrl + K** triggers a secret-toast hint area for a future hidden audio/message
- Birthday HUD with:
  - Age badge: **Level 16 Unlocked.**
  - Four navigation tiles: Home, Gallery, Logs, About
  - Share and Download E‑card actions
- Inside-joke card with three hard-coded jokes specific to Chirag
- Gallery carousel with 3 stylish placeholders (until you wire real URLs)
- Settings panel with 4 toggles (saved in `localStorage`):
  - Falling code stream
  - Music controls
  - Confetti & fireworks
  - Image placeholders
- Share button copies: `Happy Birthday, Chirag! 🎉 — open at: https://example.com/chirag`
- Download E‑card: uses `html2canvas` on the hero section and downloads a PNG snapshot
- JS-disabled fallback in `public/index.html` and inside `App` via `<noscript>` blocks

## Audio

Home screen audio link is wired to:

```text
https://youtu.be/5u4xTa3LR2U?si=RaYdTfUaQ9090pB5
```

Because this is a raw YouTube URL, the app **treats it as an external stream placeholder** and **does not attempt to autoplay it** (browsers will block typical autoplay with sound). The play/pause button and volume slider control an `<audio>` element pointed at this URL – for production, you should replace it with a direct audio file URL (e.g. an `.mp3`) you host yourself.

## Running the App

From the `/app/frontend` directory (this repo is already wired for `yarn` on Emergent):

```bash
yarn start
```

This runs the app in development mode at `http://localhost:3000`.

> Do **not** use `npm` in this environment; stick to `yarn`.

To create a production build:

```bash
yarn build
```

## Customization Notes

- All personalization is for **Chirag** only – there is no mechanism for adding other users.
- If you want to tweak copy, age, or gallery labels without touching React code, you can adjust `public/meta.json` (used as a reference for hard-coded content).
- Image placeholders are in the **Gallery** screen; swap them by wiring your own URLs when you are ready.

## Mocking & Limitations

- Audio is currently **mocked** as an external link (YouTube URL). For a true audio experience, replace it with a self-hosted audio file.
- There is **no backend** or persistence beyond `localStorage` settings.
- All jokes and messages are pre-filled – there are no user input fields, both for simplicity and security.

## Accessibility & Motion

- ARIA live region announces the birthday greeting
- Keyboard shortcuts: `C` for confetti, `Ctrl + K` for Easter egg
- `prefers-reduced-motion` is respected for canvas and timed subtitle transitions
- Focus-visible states are styled using the design system ring tokens
