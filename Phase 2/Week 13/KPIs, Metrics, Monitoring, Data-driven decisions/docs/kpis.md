# KPIs — Flashcard Master

**Project:** Flashcard Master v0.8 (SIAM Final Project)
**Week:** 13 — KPIs, Metrics, Monitoring, Data-driven Decisions
**Date:** 2026-05-07

---

## KPI 1: Quiz Score Rate

**Definition:** Percentage of flashcards answered correctly during a single quiz session.

**Formula:** `(correct / total) × 100`

**Target:** ≥ 70%

**Source:** `calculateScore()` in `flashcardUtils.js` — already computes `correct`, `incorrect`, `total`, `percentage`, and `grade` (A/B/C/D/F).

**Why it matters:** Directly measures learning effectiveness. A score below 70% signals the user needs more review time before moving on.

---

## KPI 2: Quiz Completion Rate

**Definition:** Percentage of quiz sessions that are completed (all cards reviewed) versus sessions where the user exits early via the "Exit Quiz" button.

**Formula:** `(completed_sessions / started_sessions) × 100`

**Target:** ≥ 80%

**Source:** Tracked via console logs on `quiz:start` and `quiz:complete` events in `App.js` and `Quiz.jsx`.

**Why it matters:** A low completion rate indicates users are abandoning quizzes midway, suggesting the deck may be too large, too hard, or the UX is causing frustration.

---

## KPI 3: Deck Utilization (Cards at Quiz Start)

**Definition:** The number of cards in the deck when the user clicks "Start Quiz." A deck of fewer than 5 cards is considered under-utilized.

**Formula:** `deck.length` at quiz start

**Target:** ≥ 5 cards per quiz session

**Source:** Logged at `quiz:start` event in `App.js`.

**Why it matters:** A quiz on 1–2 cards has little educational value. This KPI ensures users are building meaningful study sets before testing themselves.

---

## KPI 4: Admin Login Success Rate

**Definition:** Percentage of admin login attempts that result in a successful authentication.

**Formula:** `(successful_logins / total_attempts) × 100`

**Target:** ≥ 90%

**Source:** Tracked via `login:attempt` and `login:success` console logs in `App.js`.

**Why it matters:** A low success rate suggests users are forgetting the admin password or unauthorized access is being attempted. Helps surface auth usability issues.

---

## KPI 5: Card Retention Rate

**Definition:** Percentage of cards marked "Got It" (correct) across a completed quiz session — equivalent to Quiz Score Rate but named distinctly to emphasize the learning/retention dimension.

**Formula:** `(got_it_count / total_cards) × 100`

**Target:** ≥ 75% after 2+ quiz attempts on the same deck

**Source:** Logged at `quiz:complete` event with full score breakdown in `Quiz.jsx`.

**Why it matters:** Tracks whether users are retaining material over repeated sessions. If users score below 75% repeatedly, the deck difficulty or card wording should be revised.
