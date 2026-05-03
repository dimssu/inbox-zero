# Inbox Zero - Acceptance Test Report

Date: 2026-05-04
Build: production (`npm run build`)
Server: `npm run start` on port 3005

## Acceptance Checks

- [x] `npm run build` exit 0 - **PASS** (Next.js 16.2.4, 33 static pages including 28 SSG email/[id])
- [x] Route `/` returns 200 - **PASS** (90491 bytes)
- [x] Route `/debrief` returns 200 - **PASS** (62829 bytes)
- [x] Route `/email/em-001` returns 200 - **PASS** (56601 bytes; first id from src/data/emails.ts)
- [x] All routes >= 5000 chars - **PASS**
- [x] No stub strings (Lorem ipsum / Item 1 / TODO) - **PASS** (only product `lane: "todo"` enum value, which is a real inbox lane)
- [x] At least one `<main>` per route - **PASS** (3/3)
- [x] At least one `<h1>` per route - **PASS** (3/3)
- [x] Identity hygiene (no claude/anthropic/co-authored-by leaks) - **PASS**

## Screenshots Captured

- `public/screenshots/hero.png` - `/` (Smart inbox)
- `public/screenshots/dashboard.png` - `/debrief`
- `public/screenshots/detail.png` - `/email/em-001`

Viewport 1440x900 @ 2x DPR via puppeteer.
