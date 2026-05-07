# Cost-Benefit Analysis — Flashcard Master

**Project:** Flashcard Master v1.0 (SIAM Final Project)
**Week:** 14–15 — Cost-Benefit + Cost Estimation Models
**Date:** 2026-05-07
**Analyst:** Joseph Pendon

---

## Assumptions

| Parameter | Value | Basis |
|-----------|-------|-------|
| Developer hourly rate | $20/hr | Junior/student developer market rate |
| Maintenance hourly rate | $20/hr | Same developer performing upkeep |
| Estimated active users | 10 | Course cohort / small team deployment |
| Academic year duration | 40 weeks | Standard semester calendar |
| Student time value | $10/hr | Opportunity cost of manual study effort |
| Commercial alternative | Quizlet Plus @ $35.99/user/year | Direct substitute product |

---

## 1. Development Cost

**Formula: Dev cost = Total hours × Rate**

| Phase | Activity | Hours | Rate | Cost |
|-------|----------|-------|------|------|
| Phase 1 (Wk 1–9) | Core app — components, quiz logic, state management, testing | 45 hrs | $20/hr | $900 |
| Phase 2 (Wk 10–11) | CI/CD pipeline, GitHub Actions, smoke tests | 8 hrs | $20/hr | $160 |
| Phase 2 (Wk 10–11) | Security hardening — auth, RBAC, XSS mitigation, npm audit | 6 hrs | $20/hr | $120 |
| Phase 2 (Wk 12) | Ethics assessment, IP documentation, professional standards | 4 hrs | $20/hr | $80 |
| Phase 2 (Wk 13) | KPI definition, metrics report, logging instrumentation | 4 hrs | $20/hr | $80 |
| Phase 2 (Wk 14–15) | Cost-benefit analysis, architecture docs, final review | 5 hrs | $20/hr | $100 |
| **Total** | | **72 hrs** | **× $20/hr** | **$1,440** |

> Dev cost = 72 hrs × $20/hr = **$1,440**

---

## 2. Operational Cost

**Formula: Ops cost = Hosting cost + Maintenance effort**

| Item | Provider | Annual Cost | Detail |
|------|----------|-------------|--------|
| Hosting | GitHub Pages | $0 | Free static site hosting |
| CI/CD pipeline | GitHub Actions | $0 | Free tier — 2,000 min/month |
| Domain name | Namecheap (optional) | $12 | Only if custom domain is used |
| Dependency maintenance | Developer (self) | 2 hrs/yr × $20 = $40 | `npm update`, audit review |
| Documentation updates | Developer (self) | 1 hr/yr × $20 = $20 | Keeping docs current |

> Ops cost = $0 (hosting) + $60 (maintenance effort) + $12 (domain, optional) = **$60–$72/year**

---

## 3. Tangible Benefits

### Time Saved
Manual flashcard creation (paper or spreadsheet) and self-quizzing take significantly longer without tooling.

- Time saved per user per week: **30 minutes**
- Users: 10 | Academic weeks: 40
- Annual time saved: 10 × 0.5 hr × 40 = **200 hrs/year**
- Value at $10/hr student rate: **$2,000/year**

### Reduced Errors
The app enforces input validation and XSS sanitisation in `createFlashcard()`. This eliminates:
- Malformed card data from missing or blank fields
- Script-injection content stored in the deck
- Inconsistent card formatting (whitespace trimmed automatically)

**Estimated error reduction:** 100% of format/validation errors that would occur in a manual spreadsheet workflow.

### Improved Workflow
The app integrates card creation, deck management, and quiz review into a single interface. Previously separate steps (write card → shuffle deck → self-quiz → score) are automated.

- Quiz shuffle: automated via Fisher-Yates algorithm (no manual shuffling)
- Scoring: instant via `calculateScore()` (no manual counting)
- Role separation: admin vs. read-only enforced automatically (no access-control overhead)

**Estimated workflow efficiency gain:** 40–50% reduction in time-to-quiz from a cold start (no cards) compared to a paper-based system.

### Usability Gains
- Non-admin users can quiz without being able to accidentally edit or delete cards
- Quiz mode shows real-time progress (`Card X of Y`) and instant score with letter grade
- KPI logging (`[KPI]` events) gives the developer observable data on user behaviour without any additional tooling

---

## 4. Intangible Benefits

| Benefit | Description |
|---------|-------------|
| **Technical skill acquisition** | Hands-on React, CI/CD (GitHub Actions), token auth, RBAC, XSS mitigation, Jest testing — directly applicable in industry roles |
| **Academic performance** | Structured study tool supports better retention, potentially improving grades across subjects |
| **Security mindset** | DevSecOps practices (automated audit, secrets management, input sanitisation) instill habits that carry into professional work |
| **Process discipline** | 15-week phased SDLC with weekly deliverables builds professional habits: version control, documentation, risk registers |
| **Reusability** | Component architecture (`Flashcard`, `Quiz`, `FlashcardForm`, `CardCounter`) and `flashcardUtils.js` reusable in future projects |
| **Portfolio value** | Demonstrates full-stack awareness, CI/CD, and security practices to future employers |

---

## 5. ROI Calculation

### Cost Summary (3-Year)

| Category | Amount |
|----------|--------|
| Development (one-time) | $1,440 |
| Operational — Year 1 | $72 |
| Operational — Year 2 | $72 |
| Operational — Year 3 | $72 |
| **Total 3-Year Cost** | **$1,656** |

### Benefit Summary (3-Year, Tangible Only)

| Benefit | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---------|--------|--------|--------|-------------|
| Study time savings | $2,000 | $2,000 | $2,000 | $6,000 |
| Avoided Quizlet subscriptions | $360 | $360 | $360 | $1,080 |
| **Total Tangible** | **$2,360** | **$2,360** | **$2,360** | **$7,080** |

### ROI Formula

```
ROI = (Net Benefit / Total Cost) × 100
ROI = ($7,080 − $1,656) / $1,656 × 100
ROI = $5,424 / $1,656 × 100
ROI ≈ 327%
```

### Break-Even Point

```
Break-even = Dev cost / Monthly benefit
           = $1,440 / ($2,360 ÷ 12)
           = $1,440 / $197
           ≈ 7.3 months
```

> The project breaks even within the same academic year it was built.

---

## 6. Recommendation

**Verdict: PROCEED**

The cost-benefit analysis strongly supports continuing development and deployment of Flashcard Master. The justification is as follows:

- **Total 3-year ROI of ~327%** — every dollar spent on development returns $3.27 in measurable benefit.
- **Break-even in ~7 months** — well within the first year of use.
- **Operational cost is near-zero** ($60–$72/year) — GitHub Pages and GitHub Actions eliminate hosting expenses entirely.
- **Intangible benefits are compounding** — skills, portfolio value, and process discipline continue to yield returns long after v1.0 ships.

There is no justification to revise scope or stop. The highest-priority next investments to extend value are:

| Improvement | Effort | Cost | Expected Gain |
|-------------|--------|------|--------------|
| localStorage deck persistence | 2 hrs | $40 | Eliminates #1 usability gap; enables KPI trending |
| Minimum deck size warning (≥5) | 1 hr | $20 | Improves KPI 3 compliance |
| Test coverage ≥ 80% | 4 hrs | $80 | Reduces long-term regression risk |

Total additional investment: **$140** — less than 10% of original development cost.

---

## 7. Case Study

> *"If this system is used by 30 users, the impact is as follows."*

A course cohort of 30 students using Flashcard Master for one academic year (40 weeks) would collectively save:

- **600 hours of study overhead** (30 users × 30 min/week × 40 weeks)
- Valued at $6,000 in reclaimed study time (at $10/hr)
- **$1,080 in avoided software subscriptions** (30 × $35.99/year Quizlet Plus)
- **Total tangible benefit to cohort: $7,080/year**

Against a one-time development cost of $1,440 and $72/year in operational costs, a 30-user deployment would achieve **break-even in under 3 months** and deliver a **first-year ROI of ~385%**.

If the tool were adopted across an entire department of 120 students, the annual tangible benefit would reach approximately **$28,320** — returning the full development cost within **3 weeks** of first use.
