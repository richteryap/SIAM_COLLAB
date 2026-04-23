// src/components/FlashcardForm.jsx
import React, { useState } from 'react';

function FlashcardForm({ onAddCard }) {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!question.trim()) {
            setError('Question is required');
            return;
        }
        if (!answer.trim()) {
            setError('Answer is required');
            return;
        }

        onAddCard({ question: question.trim(), answer: answer.trim() });
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
                    placeholder="Enter your question"
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
                    placeholder="Enter the answer"
                    data-testid="answer-input"
                />
            </div>

            <button type="submit" data-testid="add-card-btn">Add Card</button>
        </form>
    );
}

export default FlashcardForm;