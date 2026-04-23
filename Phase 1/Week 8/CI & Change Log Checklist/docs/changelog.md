# Changelog — Flashcard Quiz App

All notable changes to this project will be documented in this file.
Format based on [Keep a Changelog](https://keepachangelog.com/).

---

## [v0.5-ci] — Week 5 (CI & Change Log)

### Added
- **CI/CD Pipeline** — GitHub Actions workflow (`.github/workflows/ci.yml`)
  - Triggers on every push and PR to `main` and `dev` branches
  - Pipeline steps: checkout → install → lint → test (with coverage) → build → upload artifact
  - Node.js 18.x on Ubuntu latest runner
  - Coverage report uploaded as downloadable artifact
- **CardCounter component** (`src/components/CardCounter.jsx`)
  - Displays total cards, studied count, mastered count
  - Visual progress bar showing mastery percentage
  - Integrates with quiz results data
- **This changelog** (`docs/changelog.md`)
- **Release notes** (`docs/release-notes-ci.md`) for v0.5-ci

### Changed
- All PRs now require CI pipeline to pass before merging
- Project structure updated to include `.github/workflows/`

---

## [v0.5-scm] — Week 5 (Software Configuration Management)

### Added
- **Quiz component** (`src/components/Quiz.jsx`) — US-06
  - Quiz mode showing one card at a time with progress indicator
  - Self-grading: "Got it ✓" / "Missed it ✗" buttons
  - Score summary with correct/incorrect count and percentage
  - Fisher-Yates shuffle on every quiz start
- **CODEOWNERS** file — auto-assigns PR reviewers by file path
- **Release notes** (`docs/release-notes.md`) for v0.5-scm
- **SCM notes** (`docs/scm-notes.md`) — merge conflict documentation

### Changed
- `calculateScore()` now returns `grade` (A–F) and `passed` (boolean) fields
- Established branch naming: `feature/<name>`, `bugfix/<name>`, `hotfix/<name>`

### Resolved
- Merge conflict in `calculateScore()` — combined grade + passed from two branches

---

## [v0.4] — Week 4 (QA & Testing)

### Added
- **QA Plan** (`docs/qa-plan.md`)
  - Test levels: unit, integration, system
  - Entry/exit criteria for testing
  - Severity levels: S1 (Critical) through S4 (Cosmetic)
- **Unit tests** — 15 test cases across 5 describe blocks
  - `createFlashcard` — 4 tests (valid input, empty question, empty answer, whitespace trim)
  - `addFlashcard` — 2 tests (empty deck, existing deck)
  - `deleteFlashcard` — 3 tests (remove by ID, non-existent ID, immutability)
  - `editFlashcard` — 3 tests (update fields, trim whitespace, immutability)
  - `calculateScore` — 4 tests (zero cards, all correct, partial, single correct)
- **Defect log** (`docs/defect-log.md`) with BUG-001
- **Source code:**
  - `flashcardUtils.js` — utility functions for all card operations
  - `FlashcardForm.jsx` — create flashcard form with validation
  - `Flashcard.jsx` — card display with flip, edit, delete

### Fixed
- **BUG-001:** `calculateScore()` divided by `10` instead of `total`, causing wrong percentages for decks ≠ 10 cards

---

## [v0.3] — Week 3 (Risk Management & Team Workflow)

### Added
- **Risk register** (`docs/risk-register.md`) — 10 risks with likelihood, impact, score, mitigation, and owner
- **PR template** (`.github/pull_request_template.md`)
- **Issue templates:**
  - Bug report (`.github/ISSUE_TEMPLATE/bug_report.md`)
  - Feature request (`.github/ISSUE_TEMPLATE/feature_request.md`)
- **Change request simulation** — added US-11 (Search/Filter Flashcards)
- **Change request log** (`docs/change-request-log.md`)

### Changed
- Updated `backlog.md` — added US-11, total story points 31 → 34

---

## [v0.2] — Week 2 (Planning & Backlog)

### Added
- **Product backlog** (`docs/backlog.md`) — 10 user stories with priority, story points, acceptance criteria
- **Sprint 1 plan** (`docs/sprint-1-plan.md`) — 6 stories selected, 18 total points
- **Project schedule** (`docs/schedule.md`) — 15-week timeline with milestones
- **Team roles** (`docs/team-roles.md`) — 5 members, 5 rotating roles (PM, QA, DevOps, Docs, Lead Dev)
- Initialized React frontend (`client/`) and Node.js backend (`server/`)
- Created GitHub repository