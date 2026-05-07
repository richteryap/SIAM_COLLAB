# Release Checklist — Flashcard Quiz App

Use this checklist before every deployment to production.

---

## Pre-Release

### Code Quality
- [ ] All features for this release are merged to `main`
- [ ] No open PRs blocking the release
- [ ] Code reviewed by at least 1 teammate
- [ ] No `console.log()` debug statements left in code

### Testing
- [ ] All unit tests pass (`npm test -- --watchAll=false`)
- [ ] CI pipeline passes (green checkmarks on GitHub)
- [ ] Manual smoke test completed:
  - [ ] App loads without errors
  - [ ] Can create a flashcard
  - [ ] Can view all flashcards
  - [ ] Can flip a card (question ↔ answer)
  - [ ] Can edit a flashcard
  - [ ] Can delete a flashcard (with confirmation)
  - [ ] Can start a quiz
  - [ ] Quiz score displays correctly
- [ ] No S1 or S2 bugs open in `docs/defect-log.md`

### Build
- [ ] `npm run build` completes without errors
- [ ] Build output folder (`client/build`) is generated
- [ ] No build warnings that could cause issues

### Version & Documentation
- [ ] Version tagged in Git (e.g., `v0.5-ci`)
- [ ] Tag pushed to GitHub (`git push origin <tag>`)
- [ ] `docs/changelog.md` updated with this version's changes
- [ ] `docs/release-notes-*.md` created for this version
- [ ] README.md is up to date

### Backup & Rollback
- [ ] Previous deployment is accessible on Vercel (for rollback)
- [ ] Rollback steps are documented in `docs/deployment-plan.md`
- [ ] Team knows who to contact if deployment fails

---

## Deployment

- [ ] Push to `main` branch triggers Vercel auto-deploy
- [ ] Vercel build log shows success
- [ ] Preview URL is accessible and working
- [ ] Production URL is accessible and working

---

## Post-Release

- [ ] Verify app works at production URL
- [ ] Test core features one more time on live site
- [ ] Check browser console for errors
- [ ] Notify team in group chat that deployment is live
- [ ] Update sprint board — move stories to "Done"
- [ ] Screenshot the deployed app for course evidence

---

## Sign-Off

| Role | Name | Approved? |
|------|------|-----------|
| PM/Scrum Master | Kent John Chavo | ☐ |
| QA Lead | Joseph Pendon | ☐ |
| DevOps Lead | Richter Anthony Yap | ☐ |
| Docs Lead | Precious Gamalo | ☐ |
| Lead Developer | Koby Atilano | ☐ |