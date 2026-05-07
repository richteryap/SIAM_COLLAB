# Ethics Impact Assessment — Flashcard Quiz App

## Overview

This document identifies the stakeholders affected by the Flashcard Quiz App and assesses the ethical risks associated with its development and use.

---

## Stakeholders

### Primary Stakeholders

| Stakeholder | Role | Interest |
|-------------|------|----------|
| **Students / End Users** | Primary users of the app | Reliable, fair, and secure study tool |
| **Development Team** | Designers and builders of the app | Delivering a quality, ethical product |
| **Instructors / Educators** | May use or recommend the tool | Pedagogical value; academic integrity |

### Secondary Stakeholders

| Stakeholder | Role | Interest |
|-------------|------|----------|
| **Educational Institutions** | Context in which the app is used | Data privacy compliance; integrity |
| **Open-Source Community** | Providers of libraries and frameworks used | Proper attribution and license compliance |
| **Future Maintainers** | Developers who extend or maintain the app | Clean, well-documented codebase |

---

## Ethical Risks

### ER-01: Data Privacy
- **Description:** The app currently stores flashcard data in `localStorage`, which persists in the user's browser. If the app were extended to sync data to a backend or cloud service, user data could be exposed without informed consent.
- **Likelihood:** Low (current scope is local only)
- **Severity:** High (if backend added without proper consent flows)
- **Mitigation:** Document clearly in privacy notes that no data leaves the device. Require explicit opt-in for any future cloud sync feature.

### ER-02: Accessibility Exclusion
- **Description:** The app currently lacks ARIA labels, keyboard navigation, and screen reader support (see TD-07 in tech-debt register). This excludes users with visual or motor impairments.
- **Likelihood:** Certain (accessibility gaps are confirmed)
- **Severity:** Medium
- **Mitigation:** Prioritise TD-07 in a future sprint. Apply WCAG 2.1 AA guidelines.

### ER-03: Academic Integrity
- **Description:** The app could be misused to share pre-made answer sets that give some students an unfair advantage in assessed quizzes.
- **Likelihood:** Low (no sharing features exist)
- **Severity:** Low
- **Mitigation:** If a sharing/export feature is ever added, include a terms-of-use reminder that content must comply with institutional academic integrity policies.

### ER-04: Algorithmic Fairness in Quiz Mode
- **Description:** The current quiz shuffles cards using `Math.random()`. This is not cryptographically fair and could, over many sessions, produce systematic bias in which cards are shown first.
- **Likelihood:** Low (casual study use; bias impact is minimal)
- **Severity:** Low
- **Mitigation:** Acceptable for this use case. If used in formal assessment, replace with a seeded, statistically uniform shuffle.

### ER-05: Misleading Feedback
- **Description:** The app relies entirely on self-reported correct/incorrect answers. Users could inflate their own scores, creating a false sense of readiness.
- **Likelihood:** Medium (inherent to self-study tools)
- **Severity:** Low (self-study context; no high-stakes decisions made from results)
- **Mitigation:** Add a disclaimer that quiz scores are self-assessed and intended only as a personal study guide.

---

## Summary

| Risk ID | Risk | Likelihood | Severity | Mitigation Status |
|---------|------|-----------|----------|-------------------|
| ER-01 | Data privacy (future backend) | Low | High | Documented |
| ER-02 | Accessibility exclusion | Certain | Medium | Tracked as TD-07 |
| ER-03 | Academic integrity misuse | Low | Low | N/A (no sharing) |
| ER-04 | Quiz shuffle fairness | Low | Low | Acceptable |
| ER-05 | Misleading self-assessment | Medium | Low | Recommended disclaimer |

---

*Last updated: 2026-05-07*
