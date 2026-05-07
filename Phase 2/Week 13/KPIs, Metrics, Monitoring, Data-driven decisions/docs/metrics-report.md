# Metrics Report — Flashcard Master

**Project:** Flashcard Master v0.8 (SIAM Final Project)
**Week:** 13 — KPIs, Metrics, Monitoring, Data-driven Decisions
**Date:** 2026-05-07

---

## 1. Real Measurements (Collected from Codebase)

These measurements were gathered by inspecting the source files directly on 2026-05-07.

| Metric | Measured Value | Notes |
|--------|---------------|-------|
| React components | 5 | `App`, `Flashcard`, `FlashcardForm`, `Quiz`, `CardCounter` |
| Utility functions | 6 | `createFlashcard`, `addFlashcard`, `deleteFlashcard`, `editFlashcard`, `calculateScore`, `shuffleDeck` |
| Source files (client/src) | 11 | Including tests and utilities |
| Test files | 2 | `App.test.js`, `__tests__/flashcardUtils.test.js` |
| Backend / server | 0 | Client-only app — no server-side component |
| Data persistence | 0 | No database; deck resets on page refresh |
| Auth storage | localStorage | Token: `flashcard_admin_token` |
| Quiz pass threshold | 50% | Defined in `calculateScore()` |
| Grade scale | A≥90, B≥80, C≥70, D≥60, F<60 | Defined in `calculateScore()` |
| Input length limit | 200 chars | Enforced in `FlashcardForm` |
| XSS sanitization | Enabled | `<` and `>` escaped in `createFlashcard()` |
| Initial deck size at startup | 0 | App always starts with empty deck |
| KPI logging added | Yes (Week 13) | Console events for all 5 KPIs |

---

## 2. KPI Results Analysis

### KPI 1 — Quiz Score Rate
- **Target:** ≥ 70%
- **Status:** Logic exists. `calculateScore()` computes percentage per session.
- **Gap:** No historical aggregation — each session is independent with no storage.
- **Finding:** The grading scale (A–F) already provides a qualitative signal, but no trend can be tracked across sessions without persistence.

### KPI 2 — Quiz Completion Rate
- **Target:** ≥ 80%
- **Status:** Not measurable before Week 13 — no event logging existed.
- **Gap:** The "Exit Quiz" button (`onExit`) could be pressed at any point; this was never counted.
- **Finding:** With logging added this week, future sessions can compute `completed / started`.

### KPI 3 — Deck Utilization (Cards at Quiz Start)
- **Target:** ≥ 5 cards
- **Status:** The Start Quiz button is disabled when `deck.length === 0`, but there is no lower-bound warning for 1–4 cards.
- **Gap:** A user can start a quiz with a single card — the KPI target of 5 is not enforced in the UI.
- **Finding:** Measured deck at startup = 0. Users must add cards manually each session.

### KPI 4 — Admin Login Success Rate
- **Target:** ≥ 90%
- **Status:** Not measurable before Week 13 — login attempts were not logged.
- **Gap:** Failed attempts triggered only `alert("Unauthorized access.")` with no count.
- **Finding:** With logging added this week, attempt and success counts are now emitted to the console.

### KPI 5 — Card Retention Rate
- **Target:** ≥ 75%
- **Status:** Computed per session by `calculateScore()`. Results logged at `quiz:complete`.
- **Gap:** No cross-session tracking — retention cannot be measured over time without storage.
- **Finding:** The metric is available per session but degrades to zero on page refresh.

---

## 3. Suggested Improvements

### Improvement 1 — Add localStorage Deck Persistence
**Problem:** Deck resets to empty on every page reload. KPI 3 (Deck Utilization) and KPI 5 (Retention) cannot be measured over time.
**Suggestion:** Serialize the deck to `localStorage` on every state change using a `useEffect`. Deserialize on app mount.
**Expected impact:** Users retain their cards between sessions; retention KPI becomes meaningful.

### Improvement 2 — Enforce Minimum Deck Size Before Quiz
**Problem:** KPI 3 target is ≥ 5 cards, but the app allows a quiz to start with just 1 card.
**Suggestion:** Change the "Start Quiz" button guard from `deck.length === 0` to `deck.length < 5`, and display a warning message when 1–4 cards are present (e.g., "Add at least 5 cards for a meaningful quiz").
**Expected impact:** Drives KPI 3 compliance and improves study quality.

### Improvement 3 — Session Summary with KPI Dashboard
**Problem:** KPI metrics are only visible in the browser console — users never see them.
**Suggestion:** After quiz completion, expand the score summary card to display KPI 1 (Score Rate), KPI 5 (Retention Rate), and a streak counter. This reuses data already available in `calculateScore()`.
**Expected impact:** Increases user engagement and makes learning progress visible.

### Improvement 4 — Persistent Login Attempt Counter
**Problem:** KPI 4 (Admin Login Success Rate) logs attempt counts to the console but resets on reload.
**Suggestion:** Store `loginAttempts` and `loginSuccesses` counters in `localStorage`. Display a warning in the UI after 3 failed consecutive attempts.
**Expected impact:** Enables real login success rate calculation and deters brute-force attempts.

### Improvement 5 — Structured Logging with Log Levels
**Problem:** Current Week 13 logging uses `console.log` — no filtering, no levels, no structure.
**Suggestion:** Introduce a lightweight logger utility (`src/logger.js`) with `info`, `warn`, and `error` levels. In production builds, suppress `info` logs. Structure log payloads as JSON objects for future log aggregation.
**Expected impact:** Improves observability and prepares the app for a real monitoring pipeline.

---

## 4. Basic Logging Added (Week 13)

The following console events were added to instrument all 5 KPIs:

| Event Key | Location | Payload |
|-----------|----------|---------|
| `[KPI] quiz:start` | `App.js` — `setIsQuizMode(true)` | `{ deckSize }` |
| `[KPI] quiz:early-exit` | `App.js` — `onExit` callback | `{ deckSize }` |
| `[KPI] card:added` | `App.js` — `handleAddCard` | `{ cardId, questionLength }` |
| `[KPI] card:deleted` | `App.js` — `handleDeleteCard` | `{ cardId }` |
| `[KPI] card:edited` | `App.js` — `handleEditCard` | `{ cardId }` |
| `[KPI] login:attempt` | `App.js` — `handleLogin` | *(no payload — password not logged)* |
| `[KPI] login:success` | `App.js` — `handleLogin` | *(no payload)* |
| `[KPI] logout` | `App.js` — `handleLogout` | *(no payload)* |
| `[KPI] quiz:complete` | `Quiz.jsx` — `setQuizComplete(true)` | `{ correct, incorrect, total, percentage, grade, passed }` |
