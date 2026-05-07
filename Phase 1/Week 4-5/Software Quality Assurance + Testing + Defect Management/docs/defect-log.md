# Defect Log — Flashcard Quiz App

## Defect Table

| Bug ID | Description | Severity | Status | Found By | PR Link |
|--------|-------------|----------|--------|----------|---------|
| BUG-001 | `calculateScore()` divides by 10 instead of `total`, causing incorrect percentage for decks that don't have exactly 10 cards. E.g., 3 correct out of 5 returns 30% instead of 60%. | S2 — Major | Closed (Fixed) | Joseph Pendon | PR #3 |

---

## BUG-001: Incorrect Score Percentage Calculation

### Description
The `calculateScore()` function in `src/flashcardUtils.js` has a hardcoded divisor of `10` instead of using the `total` parameter. This means:
- A deck of 5 cards with 3 correct shows **30%** instead of **60%**
- A deck of 20 cards with 10 correct shows **100%** instead of **50%**
- Only decks with exactly 10 cards show the correct percentage

### Steps to Reproduce
1. Create 5 flashcards
2. Start a quiz
3. Mark 3 cards as "Got it" and 2 as "Missed it"
4. View the score summary
5. **Expected:** 60% — **Actual:** 30%

### Root Cause
In `src/flashcardUtils.js`, line 55:
```javascript
// BUGGY CODE:
const percentage = Math.round((correct / 10) * 100);

// FIXED CODE:
const percentage = Math.round((correct / total) * 100);
```

### Fix Applied
Changed `/10` to `/total` in the `calculateScore()` function.

### Test That Catches This Bug
```javascript
it('should correctly calculate partial scores', () => {
  const result = calculateScore(3, 5);
  expect(result.percentage).toBe(60); // FAILS with bug (returns 30)
});
```

### Status: ✅ Closed
- **Found date:** Week 4
- **Fixed date:** Week 4
- **Fixed by:** Richter Anthony Yap
- **Verified by:** Joseph Pendon (QA Lead)