// src/__tests__/flashcardUtils.test.js

import {
    createFlashcard,
    addFlashcard,
    deleteFlashcard,
    editFlashcard,
    calculateScore,
} from '../flashcardUtils';

// ============================================
// TEST 1: createFlashcard — valid inputs
// ============================================
describe('createFlashcard', () => {
    it('should create a flashcard with the given question and answer', () => {
        const card = createFlashcard('What is React?', 'A JavaScript library for building UIs');

        expect(card).toHaveProperty('id');
        expect(card).toHaveProperty('createdAt');
        expect(card.question).toBe('What is React?');
        expect(card.answer).toBe('A JavaScript library for building UIs');
    });

    it('should throw an error if question is empty', () => {
        expect(() => createFlashcard('', 'Some answer')).toThrow('Question is required');
    });

    it('should throw an error if answer is empty', () => {
        expect(() => createFlashcard('Some question', '')).toThrow('Answer is required');
    });

    it('should trim whitespace from question and answer', () => {
        const card = createFlashcard('  What is Node?  ', '  A runtime environment  ');
        expect(card.question).toBe('What is Node?');
        expect(card.answer).toBe('A runtime environment');
    });
});

// ============================================
// TEST 2: addFlashcard — adds card to deck
// ============================================
describe('addFlashcard', () => {
    it('should add a flashcard to an empty deck', () => {
        const card = { id: '1', question: 'Q1', answer: 'A1' };
        const result = addFlashcard([], card);

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual(card);
    });

    it('should add a flashcard to an existing deck without modifying the original', () => {
        const existingDeck = [{ id: '1', question: 'Q1', answer: 'A1' }];
        const newCard = { id: '2', question: 'Q2', answer: 'A2' };
        const result = addFlashcard(existingDeck, newCard);

        expect(result).toHaveLength(2);
        expect(result[1]).toEqual(newCard);
        // Original deck should not be mutated
        expect(existingDeck).toHaveLength(1);
    });
});

// ============================================
// TEST 3: deleteFlashcard — removes card by ID
// ============================================
describe('deleteFlashcard', () => {
    const deck = [
        { id: '1', question: 'Q1', answer: 'A1' },
        { id: '2', question: 'Q2', answer: 'A2' },
        { id: '3', question: 'Q3', answer: 'A3' },
    ];

    it('should remove the correct card by ID', () => {
        const result = deleteFlashcard(deck, '2');

        expect(result).toHaveLength(2);
        expect(result.find((c) => c.id === '2')).toBeUndefined();
    });

    it('should return the same deck if ID does not exist', () => {
        const result = deleteFlashcard(deck, '999');
        expect(result).toHaveLength(3);
    });

    it('should not mutate the original deck', () => {
        deleteFlashcard(deck, '1');
        expect(deck).toHaveLength(3);
    });
});

// ============================================
// TEST 4: editFlashcard — updates question/answer
// ============================================
describe('editFlashcard', () => {
    const deck = [
        { id: '1', question: 'Old Question', answer: 'Old Answer' },
        { id: '2', question: 'Q2', answer: 'A2' },
    ];

    it('should update the question and answer of the correct card', () => {
        const result = editFlashcard(deck, '1', 'New Question', 'New Answer');

        expect(result[0].question).toBe('New Question');
        expect(result[0].answer).toBe('New Answer');
        // Other cards should remain unchanged
        expect(result[1].question).toBe('Q2');
    });

    it('should trim whitespace from new values', () => {
        const result = editFlashcard(deck, '1', '  Trimmed Q  ', '  Trimmed A  ');
        expect(result[0].question).toBe('Trimmed Q');
        expect(result[0].answer).toBe('Trimmed A');
    });

    it('should not mutate the original deck', () => {
        editFlashcard(deck, '1', 'Changed', 'Changed');
        expect(deck[0].question).toBe('Old Question');
    });
});

// ============================================
// TEST 5: calculateScore — computes quiz results
// ============================================
describe('calculateScore', () => {
    it('should return 0% when no cards are answered', () => {
        const result = calculateScore(0, 0);

        expect(result.correct).toBe(0);
        expect(result.incorrect).toBe(0);
        expect(result.total).toBe(0);
        expect(result.percentage).toBe(0);
    });

    it('should return 100% when all answers are correct', () => {
        const result = calculateScore(5, 5);

        expect(result.correct).toBe(5);
        expect(result.incorrect).toBe(0);
        expect(result.total).toBe(5);
        expect(result.percentage).toBe(100);
    });

    it('should correctly calculate partial scores', () => {
        const result = calculateScore(3, 5);

        expect(result.correct).toBe(3);
        expect(result.incorrect).toBe(2);
        expect(result.total).toBe(5);
        expect(result.percentage).toBe(60);
    });

    it('should return correct results when only 1 card is correct out of many', () => {
        const result = calculateScore(1, 4);

        expect(result.correct).toBe(1);
        expect(result.incorrect).toBe(3);
        expect(result.total).toBe(4);
        expect(result.percentage).toBe(25);
    });
}); 