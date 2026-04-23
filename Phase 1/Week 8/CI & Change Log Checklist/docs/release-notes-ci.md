# Release Notes — v0.5-ci

**Release Date:** Week 5
**Tag:** `v0.5-ci`
**Released By:** Koby Atilano (Lead Developer — Sprint 1)

---

## Summary
This release adds a Continuous Integration pipeline using GitHub Actions and a new CardCounter component for tracking study progress. All PRs now run automated checks before merging.

---

## New Features

### CI/CD Pipeline (`ci.yml`)
- Triggers on every push and PR to `main` and `dev` branches
- **Pipeline steps:**
  1. Checkout repository
  2. Setup Node.js 18.x
  3. Install dependencies (`npm ci`)
  4. Run linter (`eslint`)
  5. Run unit tests with coverage report (`npm test -- --coverage`)
  6. Build the application (`npm run build`)
  7. Upload coverage report as downloadable artifact
- Broken code can no longer be merged undetected

### CardCounter Component (`CardCounter.jsx`)
- Displays deck statistics: total cards, studied count, mastered count
- Visual progress bar showing mastery percentage
- Updates dynamically based on quiz results

### Changelog (`changelog.md`)
- Full project history from Week 2 through Week 5
- Follows [Keep a Changelog](https://keepachangelog.com/) format

---

## How CI Works for the Team

| Action | What Happens |
|--------|-------------|
| Push to `main` or `dev` | CI runs automatically |
| Open a Pull Request | CI runs and shows ✅ or ❌ on the PR |
| CI fails | PR cannot be merged until the issue is fixed |
| CI passes | Green checkmark — safe to merge |

---

## Team Contributions
| Member | Contribution |
|--------|-------------|
| Koby Atilano | CI pipeline setup, CardCounter component, changelog |
| Richter Anthony Yap | DevOps review, pipeline testing |
| Joseph Pendon | QA review of coverage integration |
| Kent John Chavo | Sprint planning coordination |
| Precious Gamalo | Documentation review |

---

## What's Next
- Week 7: Deployment to Vercel / GitHub Pages
- Sprint 2: US-07 (Self-Grade), US-08 (Score Summary), US-09 (Shuffle), US-11 (Search)