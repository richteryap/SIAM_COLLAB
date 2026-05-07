# Demo Script — Flashcard Master v1.0

**Project:** Flashcard Master v1.0 (SIAM Final Project)
**Week:** 14–15 — DevOps + Cloud Integration + Emerging Trends
**Date:** 2026-05-07
**Duration:** ~10 minutes

---

## Pre-Demo Setup

Before presenting, confirm:
- [ ] App is running locally: `cd client && npm start` → http://localhost:3000
- [ ] Browser DevTools console is open (F12) to show KPI logs
- [ ] Repository is open on GitHub to show CI/CD pipeline
- [ ] Latest commit is on `main` and CI badge shows passing

---

## Part 1 — Application Demo (5 min)

### Step 1: Open the app (30 sec)
> "This is Flashcard Master — a React SPA that lets students create, study, and quiz themselves on flashcard decks. Everything runs in the browser, no server required."

- Point out the header gradient title and the **Admin Login** button in the top-right corner.
- Note the "Read-Only Mode" message in the sidebar — unauthenticated users can only quiz.

---

### Step 2: Admin login & RBAC (1 min)
> "The app uses role-based access control. Only authenticated admins can add, edit, or delete cards."

1. Click **🔐 Admin Login**
2. Enter password: `siam-admin-2026`
3. The sidebar updates to show the **Add Card** form — the role-based UI switch.
4. Open DevTools console → show `[KPI] login:attempt` and `[KPI] login:success` logs.

**What to explain:**
- Token stored in `localStorage` (`flashcard_admin_token`)
- Checked on every page load via `useEffect` — session persists on refresh
- Failed login triggers `[KPI] login:attempt` but NOT `[KPI] login:success` — measurable failure rate

---

### Step 3: Add flashcards (1 min)
> "Let me add some cards to demonstrate the deck."

Add 3 cards quickly:
1. Q: `What is React?` / A: `A JavaScript library for building UIs`
2. Q: `What is CI/CD?` / A: `Automated pipeline for building, testing, and deploying code`
3. Q: `What is XSS?` / A: `Cross-Site Scripting — injecting malicious scripts into web pages`

Show console: `[KPI] card:added` fires each time with `{ cardId, questionLength }`.

**What to explain:**
- `createFlashcard()` validates and XSS-sanitises all input before storing
- Angle brackets are escaped: `<script>` → `&lt;script&gt;`
- Pure function — no side effects, fully testable (13 unit tests cover it)

---

### Step 4: Edit and delete (30 sec)
> "Admins can also edit and delete — non-admins cannot see these buttons at all."

1. Click **Edit** on card 1 → change the answer slightly → **Save**
2. Show `[KPI] card:edited` in console
3. Delete card 3 → show `[KPI] card:deleted`

---

### Step 5: Quiz mode (1.5 min)
> "Now let's quiz on the remaining cards."

1. Click **🚀 Start Quiz** — show `[KPI] quiz:start { deckSize: 2 }` in console
2. Click the card to flip it
3. Click **Got it ✓** on card 1
4. Click the card to flip → **Missed it ✗** on card 2
5. Quiz complete screen shows: 1/2 correct, 50%, grade D, passed: true
6. Show `[KPI] quiz:complete { correct: 1, incorrect: 1, total: 2, percentage: 50, passed: true }` in console

**What to explain:**
- `shuffleDeck()` uses Fisher-Yates algorithm — randomised order every time
- `calculateScore()` returns grade + pass/fail threshold (50%)
- All 5 KPI events now fire correctly — measurable data for future analytics

---

### Step 6: Logout (15 sec)
1. Click **⎋ Log Out** → show `[KPI] logout` in console
2. UI returns to Read-Only Mode — Edit/Delete/Add buttons disappear instantly

---

## Part 2 — DevOps Demo (3 min)

### Step 7: Show the CI/CD pipeline (1.5 min)
> "Every push to main triggers this GitHub Actions pipeline automatically."

Open GitHub → Actions tab → show the most recent workflow run.

Walk through the stages:
1. **Checkout** → **Setup Node 18.x** → **npm ci** (locked deps)
2. **npm audit** — surfaces dependency vulnerabilities non-blocking
3. **ESLint** — code quality gate
4. **npm test --coverage** — 17 tests, 2 suites, all green
5. **npm run build** — production webpack bundle
6. **Deploy** → **Smoke test** (HTTP 200 on PROD_URL)

> "The whole pipeline is defined in one YAML file — `.github/workflows/ci.yml` — committed to the repo. Infrastructure as Code."

---

### Step 8: Show test results (30 sec)
> "The test suite covers all core business logic."

Open `client/src/__tests__/flashcardUtils.test.js` briefly — show the 5 describe blocks covering `createFlashcard`, `addFlashcard`, `deleteFlashcard`, `editFlashcard`, `calculateScore`.

> "Core logic is at 75–87% coverage. Components are lower — that's the identified improvement area."

---

### Step 9: Show git tags / versioning (30 sec)
> "The project follows semantic versioning with annotated tags."

Run in terminal:
```bash
git tag --list
```
Output: `v0.5-ci`, `v0.5-scm`, `v0.8-maintenance`, `v1.0`

> "v1.0 marks the completion of all 15 weeks — the production-ready milestone."

---

### Step 10: Show documentation (30 sec)
> "Every phase produced living documentation alongside the code."

Briefly show the `Phase 2/` folder structure:
```
Phase 2/
├── Week 10-11/   CICD Upgrade, Software Security
├── Week 12/      Ethical, Legal, IP, Professional Issues
├── Week 13/      KPIs, Metrics, Monitoring
└── Week 14-15/   Cost-Benefit, DevOps + Cloud + Emerging Trends
```

---

## Key Questions & Prepared Answers

| Question | Answer |
|----------|--------|
| **Why no backend?** | Scope and cost: a client-side SPA is sufficient for a personal study tool. Adding a backend would introduce hosting, auth, and database costs with no proportional benefit at this scale. |
| **Why not Vite instead of CRA?** | CRA was established at project start. Vite would offer faster dev server and builds — it's documented as a recommended future upgrade. |
| **How is the auth secure?** | It's demo-grade: a hardcoded password with a localStorage token. The security docs acknowledge this and recommend upgrading to JWT + a backend for production use. |
| **What does the smoke test actually check?** | An HTTP GET to `PROD_URL` — if the response is 200, the deployment succeeded. It verifies the app is reachable, not functionally correct. End-to-end testing (Playwright/Cypress) would be the next step. |
| **What would you change with more time?** | (1) localStorage deck persistence, (2) Vite migration, (3) ≥80% test coverage, (4) Playwright E2E smoke tests, (5) JWT-based auth. All costed out in the cost-benefit analysis. |
| **What emerging trend did you apply?** | DevSecOps: security scanning is automated in CI, not manual. Also JAMstack deployment (no server) and observability-first logging for KPI tracking. |
