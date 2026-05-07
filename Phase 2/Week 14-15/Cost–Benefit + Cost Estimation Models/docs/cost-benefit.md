# Cost-Benefit Analysis — Flashcard Master

**Project:** Flashcard Master v0.8 (SIAM Final Project)
**Week:** 14–15 — Cost-Benefit Analysis
**Date:** 2026-05-07
**Analyst:** Joseph Pendon

---

## Assumptions

| Parameter | Value | Basis |
|-----------|-------|-------|
| Developer hourly rate | $20/hr | Junior/student developer market rate |
| Student time value | $10/hr | Opportunity cost of study time |
| Academic year duration | 40 weeks | Standard semester-based calendar |
| Estimated active users | 10 | Course cohort / small team deployment |
| Commercial alternative | Quizlet Plus | $35.99/year per user |
| Project lifespan assessed | 3 years | Until graduation / career transition |

---

## 1. Development Cost

These are one-time sunk costs incurred during the 15-week development lifecycle.

| Phase | Activity | Estimated Hours | Rate | Cost |
|-------|----------|----------------|------|------|
| Phase 1 (Wk 1–9) | Core app: components, quiz logic, state management, testing | 45 hrs | $20/hr | $900 |
| Phase 2 (Wk 10–11) | CI/CD pipeline, GitHub Actions, smoke tests | 8 hrs | $20/hr | $160 |
| Phase 2 (Wk 10–11) | Security hardening, token auth, RBAC, npm audit | 6 hrs | $20/hr | $120 |
| Phase 2 (Wk 12) | Ethics assessment, IP research, professional docs | 4 hrs | $20/hr | $80 |
| Phase 2 (Wk 13) | KPI definition, metrics report, logging instrumentation | 4 hrs | $20/hr | $80 |
| Phase 2 (Wk 14–15) | Cost-benefit analysis, documentation, final review | 5 hrs | $20/hr | $100 |
| **Total** | | **72 hrs** | | **$1,440** |

> **Note:** Hours reflect realistic student-paced development including research, debugging, and iteration — not idealized estimates.

---

## 2. Operational Cost (Annual)

These are recurring costs to keep the application running per year after development.

| Item | Provider | Cost/Year | Notes |
|------|----------|-----------|-------|
| Hosting | GitHub Pages | $0 | Free static hosting |
| CI/CD pipeline | GitHub Actions | $0 | Free tier (2,000 min/month) |
| Domain name | Optional (e.g., Namecheap) | $12 | If custom domain is used |
| Dependency maintenance | — | $0 | Open-source dependencies; occasional npm update |
| Security audits | npm audit (automated) | $0 | Integrated into CI/CD pipeline |
| **Total** | | **$12/year** | *(~$0 if no custom domain)* |

---

## 3. Tangible Benefits

Tangible benefits are measurable, quantifiable gains produced by the application.

### 3a. Study Time Savings

The app replaces manual flashcard creation (paper or spreadsheet) and provides an immediate quiz mode.

- Estimated time saved per user per week: **30 minutes**
- Users: 10
- Academic weeks per year: 40
- **Annual time saved:** 10 × 0.5 hr × 40 = **200 hours/year**
- Value at student time rate ($10/hr): **$2,000/year**

### 3b. Avoided Commercial Tool Subscriptions

The app replaces paid alternatives such as Quizlet Plus or Anki Pro.

- Commercial alternative cost: $35.99/user/year
- Users: 10
- **Annual savings:** 10 × $35.99 = **$359.90/year**

### 3c. Developer Portfolio Value (One-time)

The completed project serves as a portfolio artifact demonstrating full-stack awareness, CI/CD implementation, and security practices — directly increasing career employability.

- Estimated salary impact (entry-level): +$2,000–$5,000/year in starting salary
- **Conservative estimate used:** **$2,000 (one-time career boost)**

### Tangible Benefits Summary

| Benefit | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---------|--------|--------|--------|-------------|
| Study time savings | $2,000 | $2,000 | $2,000 | $6,000 |
| Avoided subscriptions | $360 | $360 | $360 | $1,080 |
| Portfolio / career value | $2,000 | — | — | $2,000 |
| **Total Tangible** | **$4,360** | **$2,360** | **$2,360** | **$9,080** |

---

## 4. Intangible Benefits

Intangible benefits are real but difficult to assign a precise dollar value to.

| Benefit | Description |
|---------|-------------|
| **Technical skill acquisition** | Developer gained hands-on experience in React, CI/CD (GitHub Actions), token-based auth, RBAC, XSS mitigation, automated testing, and software ethics — skills directly applicable in industry. |
| **Academic performance** | Structured flashcard study tool may improve retention and quiz scores for users, contributing to better academic outcomes. |
| **Security awareness** | Implementing OWASP-aligned security practices (input sanitisation, least-privilege, secrets management) builds a security-conscious mindset in the developer. |
| **Process discipline** | Following a phased SDLC with weekly deliverables builds professional habits: version control, documentation, risk registers, and CI/CD. |
| **Reusability** | The component architecture (`Flashcard`, `Quiz`, `FlashcardForm`, `CardCounter`) and utility module (`flashcardUtils.js`) are reusable in future education-adjacent projects. |
| **Open-source readiness** | The project is structured for open-source release — MIT-licensed, documented, and CI-validated — enabling community contribution at zero additional cost. |

---

## 5. ROI Calculation

### 5a. Total Cost

| Cost Category | Amount |
|---------------|--------|
| Development (one-time) | $1,440 |
| Operational — Year 1 | $12 |
| Operational — Year 2 | $12 |
| Operational — Year 3 | $12 |
| **Total 3-Year Cost** | **$1,476** |

### 5b. Total Benefit (3-Year Tangible Only)

| Benefit | 3-Year Total |
|---------|-------------|
| Study time savings | $6,000 |
| Avoided subscriptions | $1,080 |
| Portfolio / career value | $2,000 |
| **Total 3-Year Benefit** | **$9,080** |

### 5c. ROI Formula

$$
\text{ROI} = \frac{\text{Net Benefit}}{\text{Total Cost}} \times 100
$$

$$
\text{ROI} = \frac{\$9{,}080 - \$1{,}476}{\$1{,}476} \times 100 = \frac{\$7{,}604}{\$1{,}476} \times 100 \approx \textbf{515\%}
$$

### 5d. Break-Even Point

| Metric | Value |
|--------|-------|
| Total development cost | $1,440 |
| Monthly benefit (Year 1) | $363/month ($4,360 ÷ 12) |
| **Break-even point** | **≈ 4 months** |

> The project recoups its development cost within the same academic semester it was built.

---

## 6. Recommendation

**Verdict: Strongly Recommended — High Value, Low Cost, Fast Break-even**

Flashcard Master demonstrates an exceptional return on investment for an educational software project. With a **total 3-year ROI of ~515%** and a break-even point of approximately **4 months**, the cost structure is low-risk and the benefits are immediate.

Key factors supporting continued investment:

1. **Near-zero operational cost** — GitHub Pages and GitHub Actions keep running costs to $0–$12/year indefinitely.
2. **Compounding intangible returns** — The developer's skills, portfolio standing, and security mindset continue to yield career value well beyond the project's lifespan.
3. **Scalable architecture** — The component-based React design scales to larger user groups or additional features (persistence, sharing, analytics) with marginal additional cost.
4. **Suggested next investments** (in priority order):
   - Add `localStorage` deck persistence (~2 hrs, $40 cost) → eliminates the biggest usability gap identified in the KPI report.
   - Add a minimum deck size warning (~1 hr, $20) → directly improves KPI 3 compliance.
   - Expand test coverage to ≥80% (~4 hrs, $80) → reduces long-term maintenance risk.

The total cost of all three suggested improvements ($140) represents less than **10% of the original development cost** while meaningfully extending the product's educational value and measurability.
