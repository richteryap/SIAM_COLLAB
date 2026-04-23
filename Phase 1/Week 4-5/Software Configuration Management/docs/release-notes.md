# Release Notes — v0.5-scm

**Release Date:** Week 5
**Tag:** `v0.5-scm`
**Released By:** Koby Atilano (Lead Developer — Sprint 1)

---

## Summary
Version 0.5 marks the completion of Sprint 1 for the Flashcard Quiz App. Core flashcard management features are functional, the quiz feature has been added, and our Git branching workflow is established.

---

## New Features

### Flashcard Management (Sprint 1 — Core)
- **US-01: Create a Flashcard** — Form with question/answer fields and validation
- **US-02: View All Flashcards** — Card list showing questions by default
- **US-03: Flip a Flashcard** — Click to flip between question and answer
- **US-04: Delete a Flashcard** — Remove cards with confirmation prompt
- **US-05: Edit a Flashcard** — Inline editing with pre-filled fields

### Quiz Mode (New This Release)
- **US-06: Start a Quiz** — Go through cards one at a time with progress tracking
- Self-grading with "Got it ✓" and "Missed it ✗" buttons
- Score summary showing correct/incorrect count and percentage
- Cards shuffled via Fisher-Yates algorithm each attempt

---

## Bug Fixes
- **BUG-001 (Fixed):** `calculateScore()` divided by 10 instead of `total`, causing incorrect percentages

---

## Technical Improvements
- Established branch naming convention: `feature/<name>`, `bugfix/<name>`, `hotfix/<name>`
- Added CODEOWNERS for automatic PR reviewer assignment
- Practiced and documented merge conflict resolution
- `calculateScore()` now returns both `grade` (A–F) and `passed` (boolean)
- 15 unit tests covering all utility functions

---

## Known Issues
- Flashcards are not persisted — refreshing loses all data (US-10, Sprint 3)
- No search/filter functionality yet (US-11, Sprint 2)

---

## Team Contributions (Sprint 1)
| Member | Role | Contribution |
|--------|------|-------------|
| Kent John Chavo | PM/Scrum Master | US-01, US-06, sprint planning |
| Joseph Pendon | QA Lead | US-02, test reviews, defect log |
| Richter Anthony Yap | DevOps Lead | US-03, branching setup |
| Precious Gamalo | Docs Lead | US-04, documentation |
| Koby Atilano | Lead Developer | US-05, code review, merge conflict resolution |
