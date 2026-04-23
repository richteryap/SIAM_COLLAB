// src/flashcardUtils.js (FIXED VERSION)
// Pure utility functions for flashcard operations

/**
 * Creates a new flashcard object
 */
export function createFlashcard(question, answer) {
    if (!question || !question.trim()) {
        throw new Error('Question is required');
    }
    if (!answer || !answer.trim()) {
        throw new Error('Answer is required');
    }
    return {
        id: Date.now().toString(),
        question: question.trim(),
        answer: answer.trim(),
        createdAt: new Date().toISOString(),
    };
}

/**
 * Adds a flashcard to the deck
 */
export function addFlashcard(deck, flashcard) {
    return [...deck, flashcard];
}

/**
 * Deletes a flashcard from the deck by ID
 */
export function deleteFlashcard(deck, id) {
    return deck.filter((card) => card.id !== id);
}

/**
 * Edits a flashcard's question and/or answer
 */
export function editFlashcard(deck, id, newQuestion, newAnswer) {
    return deck.map((card) => {
        if (card.id === id) {
            return {
                ...card,
                question: newQuestion.trim(),
                answer: newAnswer.trim(),
            };
        }
        return card;
    });
}

/**
 * Calculates quiz score
 * @param {number} correct - number of correct answers
 * @param {number} total - total number of cards
 * @returns {object} - { correct, incorrect, total, percentage }
 */
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

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
export function shuffleDeck(deck) {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}