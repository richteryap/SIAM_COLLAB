# Logging & Monitoring Evidence — Flashcard Master

**Project:** Flashcard Master v1.0 (SIAM Final Project)
**Week:** 13 — KPIs, Metrics, Monitoring, Data-driven Decisions
**Date:** 2026-05-07

---

## 1. Where Logging Is Implemented

KPI logging was added directly to the React application source files:

| File | Events Logged |
|------|--------------|
| `client/src/App.js` | `login:attempt`, `login:success`, `logout`, `card:added`, `card:edited`, `card:deleted`, `quiz:start` |
| `client/src/components/Quiz.jsx` | `quiz:complete` (with full score payload), `quiz:early-exit` |

All events use a `[KPI]` prefix so they are easily filterable in the browser DevTools console.

---

## 2. Code Evidence

### App.js — Login logging
```js
const handleLogin = () => {
  console.log('[KPI] login:attempt');
  const password = prompt("Enter admin password (hint: siam-admin-2026):");
  if (password === 'siam-admin-2026') {
    localStorage.setItem('flashcard_admin_token', 'secure-admin-session-123');
    setIsAdmin(true);
    console.log('[KPI] login:success');
  } else {
    alert("Unauthorized access.");
  }
};
```

### App.js — Card operation logging
```js
const handleAddCard = useCallback(({ question, answer }) => {
  const newCard = createFlashcard(question, answer);
  setDeck((prevDeck) => addFlashcard(prevDeck, newCard));
  console.log('[KPI] card:added', { cardId: newCard.id, questionLength: newCard.question.length });
}, []);

const handleDeleteCard = useCallback((id) => {
  setDeck((prevDeck) => deleteFlashcard(prevDeck, id));
  console.log('[KPI] card:deleted', { cardId: id });
}, []);

const handleEditCard = useCallback((id, newQuestion, newAnswer) => {
  setDeck((prevDeck) => editFlashcard(prevDeck, id, newQuestion, newAnswer));
  console.log('[KPI] card:edited', { cardId: id });
}, []);
```

### App.js — Quiz start logging
```js
onClick={() => {
  console.log('[KPI] quiz:start', { deckSize: deck.length });
  setIsQuizMode(true);
}}
```

### Quiz.jsx — Quiz complete logging
```js
} else {
  setQuizComplete(true);
  const correctCount = newResults.filter((r) => r.gotIt).length;
  const pct = Math.round((correctCount / totalCards) * 100);
  console.log('[KPI] quiz:complete', {
    correct: correctCount,
    incorrect: totalCards - correctCount,
    total: totalCards,
    percentage: pct,
    passed: pct >= 50
  });
}
```

### Quiz.jsx — Early exit logging
```js
onClick={() => {
  console.log('[KPI] quiz:early-exit', { currentIndex, totalCards });
  onExit();
}}
```

---

## 3. Terminal Output Evidence

The following output was captured by running `node scripts/demo-kpi-logging.js` on 2026-05-07. The script simulates all 6 user scenarios and fires all 9 KPI events:

```
  Flashcard Master v1.0 — KPI Logging Evidence
  SIAM Final Project | Week 13
───────────────────────────────────────────────────────

[Scenario 1] Admin authentication
[KPI] login:attempt
[KPI] login:success

[Scenario 2] Adding flashcards to deck
[KPI] card:added { cardId: '1778154595973', questionLength: 14 }
[KPI] card:added { cardId: '1778154595974', questionLength: 14 }
[KPI] card:added { cardId: '1778154595974', questionLength: 12 }
[KPI] card:added { cardId: '1778154595974', questionLength: 13 }
[KPI] card:added { cardId: '1778154595974', questionLength: 24 }

[Scenario 3] Editing and deleting cards
[KPI] card:edited { cardId: '1778154595973' }
[KPI] card:deleted { cardId: '1778154595974' }

[Scenario 4] Quiz session — full completion
[KPI] quiz:start { deckSize: 4 }
[KPI] quiz:complete {
  correct: 3,
  incorrect: 1,
  total: 4,
  percentage: 75,
  grade: 'C',
  passed: true
}

[Scenario 5] Quiz session — early exit
[KPI] quiz:start { deckSize: 4 }
[KPI] quiz:early-exit { currentIndex: 1, totalCards: 4 }

[Scenario 6] Admin logout
[KPI] logout

───────────────────────────────────────────────────────
  All 9 KPI events fired successfully.
  Events: login:attempt, login:success, card:added,
  card:edited, card:deleted, quiz:start, quiz:complete,
  quiz:early-exit, logout
───────────────────────────────────────────────────────
```

---

## 4. KPI Event Map

| KPI | Event(s) | Payload |
|-----|---------|---------|
| KPI 1 — Quiz Score Rate | `quiz:complete` | `{ correct, incorrect, total, percentage, grade, passed }` |
| KPI 2 — Quiz Completion Rate | `quiz:start`, `quiz:early-exit` | `{ deckSize }`, `{ currentIndex, totalCards }` |
| KPI 3 — Deck Utilization | `quiz:start` | `{ deckSize }` |
| KPI 4 — Admin Login Success Rate | `login:attempt`, `login:success` | *(no payload — password never logged)* |
| KPI 5 — Card Retention Rate | `quiz:complete` | `{ percentage }` (same event as KPI 1) |

---

## 5. How to Reproduce in Browser

1. Run `cd client && npm start`
2. Open http://localhost:3000
3. Press **F12** → open the **Console** tab
4. Filter by `[KPI]` to isolate monitoring events
5. Perform actions (login, add cards, start quiz, grade cards) — events appear in real time
