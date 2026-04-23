# Risk Register — Flashcard Quiz App

## Risk Scoring Guide
- **Likelihood:** 1 (Very Low) → 5 (Very High)
- **Impact:** 1 (Negligible) → 5 (Critical)
- **Score:** Likelihood × Impact (max 25)
- **Action Required:** Score 10+ = active monitoring every sprint review

---

## Risk Table

| # | Risk | Likelihood | Impact | Score | Mitigation | Owner |
|---|------|-----------|--------|-------|------------|-------|
| R1 | Team member drops or becomes unavailable mid-semester | 2 | 5 | 10 | Cross-train on all modules; document everything so others can pick up work | Kent John Chavo |
| R2 | Merge conflicts cause code loss or broken builds | 4 | 3 | 12 | Use feature branches, small frequent commits, and PR reviews before merging | Richter Anthony Yap |
| R3 | Flashcard data lost when browser storage is cleared | 3 | 4 | 12 | Implement backend API with database storage as fallback; export/import feature | Koby Atilano |
| R4 | Scope creep — adding features beyond the 10 user stories | 3 | 3 | 9 | Stick to the backlog; new features must go through sprint planning and team vote | Kent John Chavo |
| R5 | Deployment platform (Vercel/Render) goes down or changes free tier | 2 | 4 | 8 | Identify backup platform (GitHub Pages); keep deployment scripts portable | Richter Anthony Yap |
| R6 | Quiz scoring logic has edge cases (0 cards, all correct, all wrong) | 4 | 3 | 12 | Write unit tests for all edge cases; QA lead reviews before merge | Joseph Pendon |
| R7 | Team unfamiliar with React causing slow Sprint 1 progress | 3 | 3 | 9 | Share React crash course resources; pair program on first components; keep components simple | Koby Atilano |
| R8 | CI/CD pipeline fails and blocks PRs from merging | 2 | 4 | 8 | Keep CI config simple (lint + test only); have manual merge as fallback | Richter Anthony Yap |
| R9 | Inadequate test coverage leads to undetected bugs in quiz flow | 3 | 4 | 12 | Set minimum 70% coverage target; QA lead reviews test gaps each sprint | Joseph Pendon |
| R10 | Poor commit messages make git history hard to follow | 3 | 2 | 6 | Enforce commit message conventions in PR template; brief team on format | Precious Gamalo |

---

## Risk Matrix

|                      | Impact 1 | Impact 2 | Impact 3 | Impact 4 | Impact 5 |
|----------------------|----------|----------|----------|----------|----------|
| **Likelihood 5**     |          |          |          |          |          |
| **Likelihood 4**     |          |          | R2, R6   | R9       |          |
| **Likelihood 3**     |          | R10      | R4, R7   | R3       |          |
| **Likelihood 2**     |          |          |          | R5, R8   | R1       |
| **Likelihood 1**     |          |          |          |          |          |

---

## Review Schedule
- Risks with score **10+** (R1, R2, R3, R6, R9) are reviewed every sprint retrospective.
- Risk register is updated whenever a new risk is identified or a change request is submitted.