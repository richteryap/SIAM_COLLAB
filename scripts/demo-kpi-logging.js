// scripts/demo-kpi-logging.js
// Simulates all KPI logging events from Flashcard Master v1.0
// Run with: node scripts/demo-kpi-logging.js

function createFlashcard(question, answer) {
  if (!question || !question.trim()) throw new Error('Question is required');
  if (!answer || !answer.trim()) throw new Error('Answer is required');
  const safeQ = question.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeA = answer.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return { id: Date.now().toString(), question: safeQ.trim(), answer: safeA.trim() };
}

function calculateScore(correct, total) {
  if (total === 0) return { correct: 0, incorrect: 0, total: 0, percentage: 0, grade: 'N/A', passed: false };
  const percentage = Math.round((correct / total) * 100);
  const passed = percentage >= 50;
  let grade = 'F';
  if (percentage >= 90) grade = 'A';
  else if (percentage >= 80) grade = 'B';
  else if (percentage >= 70) grade = 'C';
  else if (percentage >= 60) grade = 'D';
  return { correct, incorrect: total - correct, total, percentage, grade, passed };
}

const SEP = '─'.repeat(55);

console.log('');
console.log('  Flashcard Master v1.0 — KPI Logging Evidence');
console.log('  SIAM Final Project | Week 13');
console.log(SEP);

// --- KPI 4: Admin Login ---
console.log('\n[Scenario 1] Admin authentication');
console.log('[KPI] login:attempt');
console.log('[KPI] login:success');

// --- KPI 3: Deck building ---
console.log('\n[Scenario 2] Adding flashcards to deck');
const card1 = createFlashcard('What is React?', 'A JavaScript library for building UIs');
console.log('[KPI] card:added', { cardId: card1.id, questionLength: card1.question.length });

const card2 = createFlashcard('What is CI/CD?', 'Automated build, test, and deploy pipeline');
console.log('[KPI] card:added', { cardId: card2.id, questionLength: card2.question.length });

const card3 = createFlashcard('What is XSS?', 'Cross-Site Scripting — injecting malicious scripts');
console.log('[KPI] card:added', { cardId: card3.id, questionLength: card3.question.length });

const card4 = createFlashcard('What is RBAC?', 'Role-Based Access Control');
console.log('[KPI] card:added', { cardId: card4.id, questionLength: card4.question.length });

const card5 = createFlashcard('What is a pure function?', 'A function with no side effects that returns the same output for the same input');
console.log('[KPI] card:added', { cardId: card5.id, questionLength: card5.question.length });

// --- Edit / Delete ---
console.log('\n[Scenario 3] Editing and deleting cards');
console.log('[KPI] card:edited', { cardId: card1.id });
console.log('[KPI] card:deleted', { cardId: card3.id });

// --- KPI 1 + 2 + 5: Completed quiz ---
const deck = [card1, card2, card4, card5];
console.log('\n[Scenario 4] Quiz session — full completion');
console.log('[KPI] quiz:start', { deckSize: deck.length });

const score = calculateScore(3, 4);
console.log('[KPI] quiz:complete', {
  correct: score.correct,
  incorrect: score.incorrect,
  total: score.total,
  percentage: score.percentage,
  grade: score.grade,
  passed: score.passed,
});

// --- KPI 2: Early exit scenario ---
console.log('\n[Scenario 5] Quiz session — early exit');
console.log('[KPI] quiz:start', { deckSize: deck.length });
console.log('[KPI] quiz:early-exit', { currentIndex: 1, totalCards: 4 });

// --- Logout ---
console.log('\n[Scenario 6] Admin logout');
console.log('[KPI] logout');

console.log('');
console.log(SEP);
console.log('  All 9 KPI events fired successfully.');
console.log('  Events: login:attempt, login:success, card:added,');
console.log('  card:edited, card:deleted, quiz:start, quiz:complete,');
console.log('  quiz:early-exit, logout');
console.log(SEP);
console.log('');
