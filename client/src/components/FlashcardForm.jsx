// src/components/FlashcardForm.jsx
import React, { useState } from 'react';

function FlashcardForm({ onAddCard }) {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const trimmedQuestion = question.trim();
        const trimmedAnswer = answer.trim();

        // 1. Empty state validation
        if (!trimmedQuestion) {
            setError('Question is required');
            return;
        }
        if (!trimmedAnswer) {
            setError('Answer is required');
            return;
        }

        // 2. Boundary limits
        if (trimmedQuestion.length > 200 || trimmedAnswer.length > 500) {
            setError('Input exceeds maximum character limits.');
            return;
        }

        // 3. XSS Mitigation: Block explicit HTML tags
        const htmlTagRegex = /<[^>]*>?/gm;
        if (htmlTagRegex.test(trimmedQuestion) || htmlTagRegex.test(trimmedAnswer)) {
            setError('Special characters like < and > are not allowed.');
            return;
        }

        onAddCard({ question: trimmedQuestion, answer: trimmedAnswer });
        setQuestion('');
        setAnswer('');
    };

    return (
        <form onSubmit={handleSubmit} data-testid="flashcard-form">
            <h2>Add New Flashcard</h2>
            {error && <p data-testid="error-message" style={{ color: 'red' }}>{error}</p>}
            
            <div>
                <label htmlFor="question">Question:</label>
                <input
                    id="question"
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Enter your question (max 200 chars)"
                    data-testid="question-input"
                />
            </div>

            <div>
                <label htmlFor="answer">Answer:</label>
                <input
                    id="answer"
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Enter the answer (max 500 chars)"
                    data-testid="answer-input"
                />
            </div>

            <button type="submit" data-testid="add-card-btn">Add Card</button>
        </form>
    );
}

export default FlashcardForm;