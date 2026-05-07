# Deployment Plan — Flashcard Quiz App

## 1. Project Information

| Field | Value |
|-------|-------|
| **Project** | Flashcard Quiz App |
| **Version** | v0.5-ci |
| **Deployed By** | Koby Atilano (Lead Developer) |
| **Date** | Week 7 |
| **Repository** | `https://github.com/YOUR_USERNAME/siam_final` |

---

## 2. Target Environment

| Property | Details |
|----------|---------|
| **Platform** | Vercel (free tier) |
| **URL** | `https://flashcard-quiz-app.vercel.app` (auto-generated) |
| **Type** | Production (static site + serverless) |
| **Framework** | React (Create React App) |
| **Node Version** | 18.x |
| **Build Command** | `cd client && npm run build` |
| **Output Directory** | `client/build` |
| **Root Directory** | `client` |

### Why Vercel?
- Free tier supports React apps with zero config
- Auto-deploys from GitHub on every push to `main`
- Provides preview deployments for every PR
- Built-in SSL (HTTPS) and CDN
- No server management required

### Backup Platform
If Vercel is unavailable: **GitHub Pages** (static hosting)
- Build command: `npm run build`
- Deploy folder: `client/build`
- URL: `https://YOUR_USERNAME.github.io/siam_final`

---

## 3. Rollout Strategy

### Strategy: **Blue-Green Deployment (via Vercel)**

Vercel handles this automatically:

1. **Current version (Blue)** stays live at the production URL
2. **New version (Green)** is built and deployed to a preview URL
3. Team verifies the preview deployment works correctly
4. Vercel promotes the new version to production
5. If issues are found, rollback to the previous deployment instantly

```
[GitHub Push to main]
        │
        ▼
[Vercel builds new version]
        │
        ▼
[Preview URL generated] ──── Team verifies ──── OK? ──── Promote to production
                                                  │
                                                  └── NOT OK? ──── Stay on current version
```

### Pre-Deployment Checks
- [ ] All unit tests pass locally (`npm test`)
- [ ] CI pipeline passes on GitHub (green checkmarks)
- [ ] Build succeeds locally (`npm run build`)
- [ ] No S1 or S2 bugs open in defect log
- [ ] Release version is tagged in Git
- [ ] Team has reviewed and approved the latest PR

---

## 4. Rollback Steps

If the deployment has issues, follow these steps to rollback:

### Option A: Instant Rollback via Vercel Dashboard
1. Go to `https://vercel.com/dashboard`
2. Click on the Flashcard Quiz App project
3. Go to **"Deployments"** tab
4. Find the **previous working deployment**
5. Click the **three dots (⋮)** → **"Promote to Production"**
6. The previous version is now live again (takes ~10 seconds)

### Option B: Git Rollback
```powershell
# 1. Find the last working commit
git log --oneline -10

# 2. Revert to the last good commit
git revert HEAD

# 3. Push — Vercel auto-deploys the reverted version
git push origin main
```

### Option C: Emergency — Redeploy from Tag
```powershell
# 1. Checkout the last stable tag
git checkout v0.5-ci

# 2. Create a hotfix branch
git checkout -b hotfix/rollback-v0.5

# 3. Push and merge via PR
git push -u origin hotfix/rollback-v0.5
# Open PR on GitHub, merge to main
```

### Rollback Decision Matrix

| Severity | Action | Who Decides |
|----------|--------|-------------|
| S1 — App crashes | Immediate rollback (Option A) | Any team member |
| S2 — Feature broken | Rollback within 1 hour | DevOps Lead + PM |
| S3 — Minor issue | Fix forward in next PR | QA Lead |
| S4 — Cosmetic | Fix in next sprint | Docs Lead logs it |

---

## 5. Environment Variables

| Variable | Value | Notes |
|----------|-------|-------|
| `CI` | `true` | Required for React builds in CI |
| `NODE_VERSION` | `18` | Set in Vercel project settings |
| `REACT_APP_VERSION` | `v0.5-ci` | (Optional) Show version in footer |

> No API keys or secrets are needed for this project (frontend-only).

---

## 6. Deployment Diagram

```
Developer Machine          GitHub                 Vercel
┌──────────────┐    push   ┌──────────────┐  webhook  ┌──────────────┐
│ git push     │ ────────► │ main branch  │ ────────► │ Build & Deploy│
│ origin main  │           │              │           │              │
└──────────────┘           │ CI Pipeline  │           │ Preview URL  │
                           │ (Actions)    │           │ → Production │
                           └──────────────┘           └──────────────┘
```