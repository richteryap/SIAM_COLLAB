# SCM Notes — Merge Conflict Resolution

## Date: Week 5
## Resolved By: Koby Atilano (Lead Developer)

---

## What Happened

We simulated a merge conflict to practice conflict resolution. Two branches modified the same function (`calculateScore()` in `src/flashcardUtils.js`) at the same lines, causing Git to be unable to auto-merge.

### Branch 1: `feature/quiz-component`
Changed `calculateScore()` to add a **letter grade** (A–F):
```javascript
export function calculateScore(correct, total) {
  if (total === 0) {
    return { correct: 0, incorrect: 0, total: 0, percentage: 0, grade: 'N/A' };
  }
  const percentage = Math.round((correct / total) * 100);
  let grade = 'F';
  if (percentage >= 90) grade = 'A';
  else if (percentage >= 80) grade = 'B';
  else if (percentage >= 70) grade = 'C';
  else if (percentage >= 60) grade = 'D';
  return { correct, incorrect: total - correct, total, percentage, grade };
}
```

### Branch 2: `dev`
Changed the same `calculateScore()` to add a **`passed` boolean**:
```javascript
export function calculateScore(correct, total) {
  if (total === 0) {
    return { correct: 0, incorrect: 0, total: 0, percentage: 0, passed: false };
  }
  const percentage = Math.round((correct / total) * 100);
  const passed = percentage >= 50;
  return { correct, incorrect: total - correct, total, percentage, passed };
}
```

---

## The Conflict

When merging `feature/quiz-component` into `dev`, Git showed:

```
Auto-merging src/flashcardUtils.js
CONFLICT (content): Merge conflict in src/flashcardUtils.js
Automatic merge failed; fix conflicts and then commit the result.
```

The conflicting section in the file:
```
<<<<<<< HEAD
  const passed = percentage >= 50;
  return { correct, incorrect: total - correct, total, percentage, passed };
=======
  let grade = 'F';
  if (percentage >= 90) grade = 'A';
  else if (percentage >= 80) grade = 'B';
  else if (percentage >= 70) grade = 'C';
  else if (percentage >= 60) grade = 'D';
  return { correct, incorrect: total - correct, total, percentage, grade };
>>>>>>> feature/quiz-component
```

---

## How We Resolved It

We decided to **keep both features** — the `passed` boolean AND the letter `grade`:

```javascript
export function calculateScore(correct, total) {
  if (total === 0) {
    return { correct: 0, incorrect: 0, total: 0, percentage: 0, grade: 'N/A', passed: false };
  }
  const percentage = Math.round((correct / total) * 100);
  const passed = percentage >= 50;
  let grade = 'F';
  if (percentage >= 90) grade = 'A';
  else if (percentage >= 80) grade = 'B';
  else if (percentage >= 70) grade = 'C';
  else if (percentage >= 60) grade = 'D';
  return { correct, incorrect: total - correct, total, percentage, grade, passed };
}
```

### Resolution Steps:
1. Opened `src/flashcardUtils.js` in VS Code
2. VS Code highlighted the conflict with "Accept Current", "Accept Incoming", "Accept Both" buttons
3. Chose **neither button** — manually edited to combine both changes
4. Removed conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
5. Saved the file
6. Ran `npm test` — all 15 tests still pass
7. Staged and committed:
   ```bash
   git add src/flashcardUtils.js
   git commit -m "resolve: merge conflict in calculateScore — keep both grade and passed"
   ```

---

## Lessons Learned
1. **Communicate before editing shared files** — both branches touched `calculateScore()` without coordinating
2. **Pull from dev frequently** — staying up to date reduces conflicts
3. **Keep PRs small and focused** — smaller changes = fewer conflicts
4. **Don't panic** — conflict markers are just text showing both versions side by side
5. **Always run tests after resolving** — ensures the merge didn't break anything
