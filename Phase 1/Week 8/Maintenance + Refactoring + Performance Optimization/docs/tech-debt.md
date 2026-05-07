# Technical Debt Register — Flashcard Quiz App

## What is Technical Debt?
Technical debt is code or design shortcuts that work now but will cause problems later. Like financial debt, it accumulates "interest" — the longer you wait, the harder it is to fix.

---

## Tech Debt Items

### TD-01: No Data Persistence
- **Location:** `src/App.js` — state stored in `useState` only
- **Problem:** All flashcards are lost when the user refreshes or closes the browser. Users must re-create their entire deck every session.
- **Impact:** High — makes the app unusable for real studying
- **Suggested Fix:** Save deck to `localStorage` on every state change, load on startup
- **Effort:** 2 story points
- **Status:** Open — planned for US-10

### TD-02: Missing Edit Functionality ⬅️ SELECTED FOR REFACTOR
- **Location:** `src/App.js` and `src/components/Flashcard.jsx`
- **Problem:** The app imports `deleteFlashcard` but not `editFlashcard` from the utility file. There is no way for users to edit a card's question or answer after creating it — they must delete and re-create the card. The `editFlashcard()` function exists in `flashcardUtils.js` but is never used.
- **Impact:** Medium — poor user experience; forces unnecessary delete + recreate workflow
- **Suggested Fix:** Import `editFlashcard`, add `handleEditCard` to `App.js`, pass it to `Flashcard` component, and add edit UI to the Flashcard component
- **Effort:** 2 story points
- **Status:** ✅ Fixed this sprint (see refactor PR)

### TD-03: No Loading States or Error Boundaries
- **Location:** All components
- **Problem:** If any component throws an error, the entire app crashes with a white screen. No user-friendly error messages or fallback UI.
- **Impact:** Medium — poor UX on errors
- **Suggested Fix:** Add React Error Boundary wrapper component
- **Effort:** 3 story points
- **Status:** Open

### TD-04: No useCallback Memoization on Handlers
- **Location:** `src/App.js` — `handleAddCard`, `handleDeleteCard`
- **Problem:** Handler functions are recreated on every render. This causes child components (`FlashcardForm`, `Flashcard`, `Quiz`) to re-render unnecessarily even when their props haven't changed.
- **Impact:** Low — negligible now with a small deck, but becomes noticeable with 50+ cards
- **Suggested Fix:** Wrap handlers in `useCallback`; use functional `setState` pattern
- **Effort:** 1 story point
- **Status:** ✅ Fixed this sprint (combined with TD-02 refactor)

### TD-05: No Input Length Validation
- **Location:** `src/components/FlashcardForm.jsx`
- **Problem:** Users can paste extremely long text (thousands of characters) into the question or answer fields, breaking the card layout. No character limit enforced.
- **Impact:** Low — cosmetic/layout issues
- **Suggested Fix:** Add `maxLength={500}` to inputs; show character count; truncate display with ellipsis
- **Effort:** 1 story point
- **Status:** Open

### TD-06: Quiz Doesn't Track History
- **Location:** `src/components/Quiz.jsx`
- **Problem:** Quiz results disappear after exiting quiz mode. No way to see past scores or track improvement over time.
- **Impact:** Low — reduces study effectiveness
- **Suggested Fix:** Store quiz history in state/localStorage; add "Quiz History" view
- **Effort:** 5 story points
- **Status:** Open

### TD-07: No Accessibility (a11y) Support
- **Location:** All components
- **Problem:** Missing ARIA labels, incomplete keyboard navigation, screen readers can't interpret card interactions.
- **Impact:** Low — not accessible to users with disabilities
- **Suggested Fix:** Add `aria-label`, `role`, `tabIndex`; ensure keyboard focus management
- **Effort:** 3 story points
- **Status:** Open

---

## Summary

| ID | Debt | Impact | Effort | Status |
|----|------|--------|--------|--------|
| TD-01 | No data persistence | High | 2 pts | Open |
| TD-02 | Missing edit functionality | Medium | 2 pts | ✅ Fixed |
| TD-03 | No error boundaries | Medium | 3 pts | Open |
| TD-04 | No useCallback memoization | Low | 1 pt | ✅ Fixed |
| TD-05 | No input length validation | Low | 1 pt | Open |
| TD-06 | Quiz doesn't track history | Low | 5 pts | Open |
| TD-07 | No accessibility support | Low | 3 pts | Open |

**Total remaining debt:** 14 story points across 5 items