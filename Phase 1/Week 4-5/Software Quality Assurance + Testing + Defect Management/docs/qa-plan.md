# QA Plan — Flashcard Quiz App

## 1. Introduction
This document defines the quality assurance strategy for the Flashcard Quiz App. It covers test levels, entry/exit criteria, severity classification, tools, and responsibilities.

---

## 2. Test Levels

### 2.1 Unit Testing
- **Scope:** Individual functions and React components in isolation
- **Tools:** Jest + React Testing Library
- **Responsible:** All developers (each developer tests their own story)
- **Examples:**
  - `addFlashcard()` correctly adds a card to the array
  - `deleteFlashcard()` removes the correct card by ID
  - `FlashcardForm` component renders input fields and validates empty submissions
  - `calculateScore()` returns correct percentage

### 2.2 Integration Testing
- **Scope:** Multiple components working together
- **Tools:** React Testing Library (render full component trees)
- **Responsible:** QA Lead (Joseph Pendon — Sprint 1)
- **Examples:**
  - Creating a card via the form and seeing it appear in the card list
  - Deleting a card and verifying the list updates
  - Starting a quiz and navigating through cards

### 2.3 System Testing
- **Scope:** The entire application end-to-end
- **Tools:** Manual browser testing (Chrome, Firefox, mobile)
- **Responsible:** QA Lead + entire team before each release
- **Examples:**
  - Full workflow: create 5 cards → start quiz → grade each → view score → retake
  - Test on different screen sizes (desktop, tablet, mobile)
  - Test with edge cases (0 cards, 1 card, 50+ cards)

---

## 3. Entry / Exit Criteria

### Entry Criteria (before testing begins)
- [ ] Feature code is committed to a feature branch
- [ ] Code compiles and runs without errors (`npm start` works)
- [ ] Developer has written at least 1 unit test for their story
- [ ] PR is opened and ready for review

### Exit Criteria (before merging to main)
- [ ] All unit tests pass (`npm test` — 0 failures)
- [ ] No S1 or S2 severity bugs remain open
- [ ] Code reviewed and approved by at least 1 teammate
- [ ] Manual smoke test completed (app loads, core features work)
- [ ] Test evidence screenshot attached to PR

---

## 4. Severity Levels

| Level | Name | Description | Response Time | Example |
|-------|------|-------------|---------------|---------|
| S1 | Critical | App crashes or data is lost; no workaround | Fix within 24 hours | App crashes when starting a quiz with 0 cards |
| S2 | Major | A core feature is broken; no workaround | Fix within current sprint | "Add Card" button does nothing when clicked |
| S3 | Minor | Feature is broken but workaround exists | Fix in next sprint | Edit form doesn't pre-fill the answer field (can delete + recreate) |
| S4 | Cosmetic | Visual or UI issue; no functional impact | Fix when convenient | Button text is slightly misaligned on mobile |

---

## 5. Test Tools & Setup

| Tool | Purpose | Install Command |
|------|---------|----------------|
| Jest | Test runner (comes with create-react-app) | Pre-installed |
| React Testing Library | Component testing | `npm install --save-dev @testing-library/react` |
| @testing-library/jest-dom | Custom matchers | `npm install --save-dev @testing-library/jest-dom` |
| @testing-library/user-event | Simulate user interactions | `npm install --save-dev @testing-library/user-event` |

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage report
npm test -- --coverage

# Run a specific test file
npm test -- --testPathPattern="Flashcard.test"
```

---

## 6. Test Naming Convention
```
describe('[ComponentName or FunctionName]', () => {
  it('should [expected behavior] when [condition]', () => {
    // test code
  });
});
```

---

## 7. Responsibilities

| Role | Person (Sprint 1) | Testing Duties |
|------|-------------------|----------------|
| QA Lead | Joseph Pendon | Maintain QA plan, review all test PRs, manage defect log |
| PM/Scrum | Kent John Chavo | Ensure stories meet Definition of Done before closing |
| DevOps Lead | Richter Anthony Yap | Set up test scripts in CI pipeline |
| Docs Lead | Precious Gamalo | Document test results and update defect log |
| Lead Developer | Koby Atilano | Review test code quality, help debug failures |