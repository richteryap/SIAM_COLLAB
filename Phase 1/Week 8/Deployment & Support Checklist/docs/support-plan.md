# Support Plan — Flashcard Quiz App

## 1. Overview
This document defines how the team handles bug reports, user issues, and support requests after deployment.

---

## 2. Issue Reporting Process

### How to Report an Issue
1. Go to the GitHub repository
2. Click **"Issues"** → **"New Issue"**
3. Select the appropriate template:
   - **Bug Report** — for broken functionality
   - **Feature Request** — for new ideas or improvements
4. Fill in all required fields (description, steps to reproduce, severity)
5. Submit the issue

### Issue Labels
| Label | Meaning |
|-------|---------|
| `bug` | Something is broken |
| `enhancement` | New feature request |
| `S1-critical` | App crashes or data loss |
| `S2-major` | Core feature broken, no workaround |
| `S3-minor` | Feature broken, workaround exists |
| `S4-cosmetic` | Visual/UI issue only |
| `in-progress` | Someone is actively working on it |
| `resolved` | Fix has been merged |

---

## 3. Response Times

| Severity | First Response | Resolution Target | Escalation |
|----------|---------------|-------------------|------------|
| S1 — Critical | Within 2 hours | Within 24 hours | Immediate — all team members notified |
| S2 — Major | Within 12 hours | Within 3 days | DevOps Lead + Lead Developer |
| S3 — Minor | Within 24 hours | Next sprint | QA Lead assigns to backlog |
| S4 — Cosmetic | Within 48 hours | When convenient | Docs Lead logs it |

> **Note:** Response times are based on team availability during the semester.

---

## 4. Escalation Process

```
Level 1: QA Lead (Joseph Pendon)
   │      Triages the issue, assigns severity, assigns to developer
   │
   ▼
Level 2: Lead Developer (Koby Atilano)
   │      Investigates root cause, implements fix
   │
   ▼
Level 3: DevOps Lead (Richter Anthony Yap)
   │      Handles deployment issues, rollbacks, infrastructure
   │
   ▼
Level 4: PM/Scrum Master (Kent John Chavo)
          Decides on priority changes, sprint adjustments, communication
```

### When to Escalate
- **Level 1 → 2:** Issue requires code changes
- **Level 2 → 3:** Issue is related to deployment, CI, or infrastructure
- **Level 3 → 4:** Issue affects sprint timeline or requires team decision

---

## 5. Common Issues & Solutions

### Issue: App shows blank white screen
- **Cause:** JavaScript error preventing React from rendering
- **Solution:**
  1. Open browser DevTools (F12) → Console tab
  2. Check for red error messages
  3. If build error: run `npm run build` locally to reproduce
  4. Fix the error, push, redeploy

### Issue: Flashcards disappear after refresh
- **Cause:** Data not persisted (localStorage not yet implemented — US-10)
- **Solution:** This is a known limitation. Flashcards are stored in memory only. Persistence is planned for Sprint 3.
- **Workaround:** Don't refresh the page during a study session.

### Issue: Quiz shows wrong score percentage
- **Cause:** Previously BUG-001 (fixed in Week 4). If reappears, check `calculateScore()`.
- **Solution:** Run `npm test` — the unit tests will catch this.

### Issue: CI pipeline fails on GitHub
- **Cause:** Test failure, build error, or dependency issue
- **Solution:**
  1. Go to GitHub → Actions tab → click the failed run
  2. Read the error log
  3. Fix locally, commit, push — CI re-runs automatically

### Issue: Vercel deployment fails
- **Cause:** Build error or misconfigured root directory
- **Solution:**
  1. Check Vercel dashboard → Deployments → click failed build
  2. Verify Root Directory is set to `client`
  3. Verify Build Command is `npm run build`
  4. Check that `package.json` exists in `client/`

---

## 6. Support Schedule

| Day | On-Call Person | Backup |
|-----|---------------|--------|
| Monday | Kent John Chavo | Koby Atilano |
| Tuesday | Joseph Pendon | Richter Anthony Yap |
| Wednesday | Richter Anthony Yap | Precious Gamalo |
| Thursday | Precious Gamalo | Kent John Chavo |
| Friday | Koby Atilano | Joseph Pendon |

> Rotate weekly if needed. On-call person checks GitHub Issues once daily.

---

## 7. Communication Channels

| Channel | Purpose |
|---------|---------|
| GitHub Issues | Bug reports and feature requests (primary) |
| Group Chat (Messenger/Discord) | Quick questions, urgent alerts |
| In-class standup | Status updates, blockers |
| Email | Formal communication with instructor |

---

## 8. Post-Incident Review

After resolving any S1 or S2 issue:
1. Document what happened in `docs/defect-log.md`
2. Identify root cause
3. Add preventive measures to `docs/risk-register.md`
4. Discuss in next standup — what can we do differently?