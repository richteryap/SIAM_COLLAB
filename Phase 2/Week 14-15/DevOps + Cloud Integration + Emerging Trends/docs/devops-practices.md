# DevOps Practices — Flashcard Master

**Project:** Flashcard Master v1.0 (SIAM Final Project)
**Week:** 14–15 — DevOps + Cloud Integration + Emerging Trends
**Date:** 2026-05-07

---

## 1. CI/CD Pipeline

### Pipeline Summary

| Stage | Tool | Trigger | Outcome |
|-------|------|---------|---------|
| Checkout | `actions/checkout@v4` | All pushes/PRs | Source code available |
| Setup | `actions/setup-node@v4` (Node 18.x) | All pushes/PRs | Reproducible Node environment |
| Install | `npm ci` | All pushes/PRs | Exact dependency lock installed |
| Security audit | `npm audit` (non-blocking) | All pushes/PRs | Vulnerabilities surfaced |
| Lint | ESLint (`react-app` preset) | All pushes/PRs | Code quality gated |
| Test | Jest + RTL (`--coverage`) | All pushes/PRs | Regression safety net |
| Build | `npm run build` (webpack) | All pushes/PRs | Production bundle verified |
| Deploy | Custom via `DEPLOY_TOKEN` | `main` push only | Artifacts shipped to host |
| Smoke test | `curl` HTTP 200 check | After deploy | Live URL verified post-deploy |

### Current Status (as of v1.0)

| Check | Status |
|-------|--------|
| Tests | ✅ 17/17 passing |
| Test suites | ✅ 2/2 passing |
| Build | ✅ Compiles cleanly |
| Lint | ✅ No blocking errors |
| Security audit | ✅ Non-blocking (accepted react-scripts build-time risks documented) |
| CI pipeline | ✅ Defined in `.github/workflows/ci.yml` |
| Deployment pipeline | ✅ Configured (deploys on `main` push via `DEPLOY_TOKEN` secret) |
| Smoke test | ✅ HTTP 200 check post-deploy |

---

## 2. Testing Strategy

### Test Coverage (v1.0)

| File | Statements | Branches | Functions | Lines |
|------|-----------|----------|-----------|-------|
| `flashcardUtils.js` | 75% | 87.5% | 87.5% | 80% |
| `App.js` | 30.8% | 41.7% | 15.4% | 33.3% |
| `CardCounter.jsx` | 83.3% | 50% | 50% | 83.3% |
| `Flashcard.jsx` | 0% | 0% | 0% | 0% |
| `Quiz.jsx` | 0% | 0% | 0% | 0% |
| **Overall** | **23.7%** | **32.2%** | **21.7%** | **23.7%** |

### What is tested

| Test Suite | Tests | Coverage Focus |
|-----------|-------|---------------|
| `flashcardUtils.test.js` | 13 tests | `createFlashcard`, `addFlashcard`, `deleteFlashcard`, `editFlashcard`, `calculateScore` — all core business logic |
| `App.test.js` | 1 test | App renders header correctly (smoke test) |

### Known coverage gaps

| Component | Gap | Priority |
|-----------|-----|----------|
| `Quiz.jsx` | No tests for quiz flow, grade logic, or early exit | High |
| `Flashcard.jsx` | No tests for edit/delete interactions | Medium |
| `FlashcardForm.jsx` | No tests for form submission or validation feedback | Medium |
| `App.js` | Admin login/logout flow not tested | Medium |

> **Recommendation:** Targeting ≥ 80% statement coverage would require adding approximately 15–20 additional tests. Estimated effort: 4 hours.

---

## 3. Security Practices (DevSecOps)

Security was integrated directly into the development workflow rather than treated as an afterthought — a DevSecOps approach.

| Practice | Implementation | Phase |
|----------|---------------|-------|
| Input validation | Type checks + non-empty guards in `createFlashcard()` | Week 6 |
| XSS sanitisation | `<` and `>` escaped before storing card content | Week 10 |
| Secrets management | `DEPLOY_TOKEN` + `PROD_URL` stored in GitHub Secrets | Week 10 |
| RBAC | `isAdmin` state gates all write operations in UI | Week 10 |
| Automated dependency audit | `npm audit` runs on every CI trigger | Week 11 |
| Accepted risk documentation | 26 build-time react-scripts vulnerabilities documented as accepted | Week 11 |
| `.env` gitignore | Local environment variables excluded from version control | Week 10 |

---

## 4. Version Control Practices

| Practice | Implementation |
|----------|---------------|
| Branching strategy | Feature branches → `dev` → `main` via PRs |
| PR template | `.github/pull_request_template.md` |
| Issue templates | Bug report + feature request templates in `.github/ISSUE_TEMPLATE/` |
| Code ownership | `.github/CODEOWNERS` defines review responsibilities |
| Semantic versioning | Tags: `v0.5-ci`, `v0.5-scm`, `v0.8-maintenance`, `v1.0` |
| Commit conventions | Conventional Commits style (e.g., `feat:`, `fix:`, `ci:`, `docs:`) |

---

## 5. Cloud Integration

### Current Cloud Services

| Service | Provider | Purpose | Cost |
|---------|----------|---------|------|
| Source control + CI/CD | GitHub | Version control, Actions pipeline | Free |
| Artifact storage | GitHub Actions artifacts | Build + coverage reports (7-day retention) | Free |
| Static hosting | GitHub Pages / Vercel | Production deployment | Free |
| Secrets vault | GitHub Secrets | `DEPLOY_TOKEN`, `PROD_URL` | Free |

### Cloud Architecture Pattern

Flashcard Master follows the **JAMstack** pattern:
- **J**avaScript — React SPA handles all interactivity
- **A**PIs — None (fully client-side, no API calls)
- **M**arkup — Pre-built static HTML/CSS/JS served from CDN edge

This eliminates server management, scales infinitely for static traffic, and reduces operational cost to near-zero.

---

## 6. Emerging Trends Applied

### React 19
The project uses React 19.2.5, the latest stable release. React 19 introduces the new compiler (automatic memoisation), Server Components foundation, and improved `use()` hook — none of which are yet used in this project, but the upgrade path is clear.

### Infrastructure as Code (IaC)
The entire CI/CD pipeline is defined in `.github/workflows/ci.yml` — a YAML file committed to the repository. This means:
- Pipeline changes go through code review like any other change
- The pipeline is self-documenting and reproducible
- No GUI-only configuration that can drift

### DevSecOps
Security is embedded in the pipeline (automated `npm audit`) rather than bolted on post-deployment. This aligns with the "shift left" security trend: catching vulnerabilities earlier in the SDLC when they are cheaper to fix.

### Observability-First Development
KPI logging (`[KPI] quiz:start`, `[KPI] quiz:complete`, etc.) was added in Week 13, creating an instrumentation layer ready for a future log aggregation service (e.g., Datadog, LogRocket, or Sentry). This follows the emerging practice of building observability in from the start rather than retrofitting it.

### Static Site + CDN Edge Deployment
Deploying a pre-built React bundle to GitHub Pages or Vercel means the app is served from CDN edge nodes globally — no origin server latency. This is the modern standard for frontend performance.

---

## 7. Decisions & Rationale

| Decision | Rationale |
|----------|-----------|
| No backend/database | Scope appropriateness for a student project; eliminates server costs and complexity; acceptable for a local study tool |
| `react-scripts` over Vite | CRA was established at project start; migrating to Vite is a recommended future improvement for faster build times |
| `localStorage` for auth | Sufficient for a demo-grade admin password; not production-grade — acknowledged in ethics and security docs |
| Non-blocking `npm audit` | 26 build-time vulnerabilities in `react-scripts` are transitive and do not appear in production bundle; blocking on them would halt CI for accepted risk |
| No persistence for deck | Out of scope for v1.0; flagged as highest-priority improvement in the cost-benefit and KPI reports |
| Node 18.x in CI matrix | LTS version; stable and supported; avoids bleeding-edge Node risks |
