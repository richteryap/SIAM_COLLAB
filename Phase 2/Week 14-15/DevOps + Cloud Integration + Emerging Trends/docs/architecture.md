# System Architecture — Flashcard Master

**Project:** Flashcard Master v1.0 (SIAM Final Project)
**Week:** 14–15 — DevOps + Cloud Integration + Emerging Trends
**Date:** 2026-05-07

---

## 1. Overview

Flashcard Master is a **client-side single-page application (SPA)** built with React. It has no backend server or database — all state lives in the browser for the duration of a session, with authentication tokens persisted in `localStorage`.

```
┌─────────────────────────────────────────────────┐
│                   Browser (Client)              │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │           React SPA (App.js)             │  │
│  │                                          │  │
│  │  ┌──────────┐  ┌──────────┐             │  │
│  │  │Flashcard │  │Flashcard │             │  │
│  │  │  Form    │  │   List   │             │  │
│  │  └──────────┘  └──────────┘             │  │
│  │  ┌──────────┐  ┌──────────┐             │  │
│  │  │   Quiz   │  │  Card    │             │  │
│  │  │   Mode   │  │ Counter  │             │  │
│  │  └──────────┘  └──────────┘             │  │
│  │                                          │  │
│  │  flashcardUtils.js (pure functions)      │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  localStorage: flashcard_admin_token            │
└─────────────────────────────────────────────────┘
                        │
                        │ served as static files
                        ▼
          ┌─────────────────────────┐
          │   Static Host           │
          │  (GitHub Pages / Vercel)│
          └─────────────────────────┘
                        ▲
                        │ CI/CD deploys build/
          ┌─────────────────────────┐
          │   GitHub Actions        │
          │   CI/CD Pipeline        │
          └─────────────────────────┘
```

---

## 2. Component Architecture

```
App (root state owner)
├── State: deck[], isQuizMode, isAdmin
├── FlashcardForm       → emits: onAddCard
├── CardCounter         → reads: deck[]
├── Flashcard (×n)      → emits: onDelete, onEdit | reads: card, isAdmin
└── Quiz                → reads: deck[] | emits: onExit
```

**Design principle:** All state is lifted to `App`. Child components are stateless or manage only local UI state (e.g., `isFlipped` in Quiz). Data flows down via props; events flow up via callbacks.

---

## 3. Data Flow

```
User Input
    │
    ▼
FlashcardForm → handleAddCard (App.js)
    │
    ▼
createFlashcard() ── validates & sanitises input (XSS-safe)
    │
    ▼
addFlashcard() ── pure function, returns new array (immutable)
    │
    ▼
setDeck() ── React state update triggers re-render
    │
    ▼
Flashcard components re-render with updated deck
```

```
Quiz Start
    │
    ▼
shuffleDeck() ── Fisher-Yates shuffle, non-mutating
    │
    ▼
Quiz renders cards one-by-one
    │
    ▼
handleGrade(gotIt) ── accumulates results[]
    │
    ▼
calculateScore() ── returns { correct, incorrect, percentage, grade, passed }
    │
    ▼
[KPI] quiz:complete logged to console
```

---

## 4. Technology Stack

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| UI Framework | React | 19.2.5 | Component model, hooks, JSX |
| Build Tool | react-scripts (CRA) | 5.0.1 | Zero-config webpack + babel |
| Testing | Jest + React Testing Library | Latest | Unit + integration tests |
| Linting | ESLint (react-app preset) | Built-in | Code quality |
| CI/CD | GitHub Actions | — | Free, integrated with repo |
| Hosting | GitHub Pages / Vercel | — | Free static hosting |
| Auth | localStorage token | — | Simple session persistence |
| Styling | Plain CSS + CSS Variables | — | No framework dependency |
| Fonts | Inter (Google Fonts) | — | Clean, readable UI font |

---

## 5. Security Architecture

| Concern | Mechanism | Location |
|---------|----------|----------|
| XSS prevention | `<`, `>` escaped in all inputs | `createFlashcard()` |
| Input length limit | 200 char max | `FlashcardForm.jsx` |
| Role-based access | `isAdmin` prop gates Edit/Delete/Add UI | `App.js`, `Flashcard.jsx` |
| Session auth | `localStorage` token check on mount | `App.js` useEffect |
| Secrets management | `DEPLOY_TOKEN`, `PROD_URL` in GitHub Secrets | `ci.yml` |
| Dependency audit | `npm audit` on every CI run (non-blocking) | `ci.yml` step 3.5 |

---

## 6. Deployment Architecture

```
Developer pushes to main
        │
        ▼
GitHub Actions: build-and-test job
  ├── npm ci
  ├── npm audit
  ├── eslint
  ├── npm test --coverage
  └── npm run build  ──────────────► build/ artifact uploaded
        │
        ▼ (if build-and-test passes)
GitHub Actions: deploy job
  ├── Download build/ artifact
  ├── Deploy via DEPLOY_TOKEN secret
  │     └── (Vercel CLI or SCP to server)
  └── Smoke test: HTTP GET → PROD_URL
        ├── 200 OK → ✅ Deployment successful
        └── Other  → ❌ Pipeline fails, alert raised
```

**Environment:** Branch `main` → Production only. PRs and `dev` branch run CI (build + test) but do not trigger deployment.

---

## 7. Emerging Technologies & Trends Applied

| Trend | Application in Project |
|-------|------------------------|
| **React 19** | Latest stable React with concurrent features ready |
| **GitHub Actions** | Cloud-native CI/CD — no self-hosted infrastructure |
| **Automated security scanning** | `npm audit` integrated in pipeline (DevSecOps practice) |
| **Static hosting / JAMstack** | Zero-server deployment via GitHub Pages / Vercel |
| **Observability / KPI logging** | `[KPI]` console events instrument all key user actions (Week 13) |
| **Infrastructure as Code** | Pipeline defined in `.github/workflows/ci.yml` — version-controlled |
| **Branch protection + PR workflow** | `CODEOWNERS`, PR template, issue templates in `.github/` |
