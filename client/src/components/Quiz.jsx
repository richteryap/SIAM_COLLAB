// src/components/Quiz.jsx
import React, { useState } from 'react';
import { calculateScore, shuffleDeck } from '../flashcardUtils';

function Quiz({ deck, onExit }) {
    const [quizCards] = useState(() => shuffleDeck(deck));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [results, setResults] = useState([]);
    const [quizComplete, setQuizComplete] = useState(false);

    const currentCard = quizCards[currentIndex];
    const totalCards = quizCards.length;

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleGrade = (gotIt) => {
        const newResults = [...results, { cardId: currentCard.id, gotIt }];
        setResults(newResults);

        if (currentIndex + 1 < totalCards) {
            setCurrentIndex(currentIndex + 1);
            setIsFlipped(false);
        } else {
            setQuizComplete(true);
        }
    };

    // Quiz Complete — Show Score Summary
    if (quizComplete) {
        const correctCount = results.filter((r) => r.gotIt).length;
        const score = calculateScore(correctCount, totalCards);

        return (
            <div data-testid="quiz-summary" className="quiz-summary">
                <h2>Quiz Complete!</h2>
                <div className="score-card">
                    <p><strong>Total Cards:</strong> {score.total}</p>
                    <p><strong>Correct:</strong> {score.correct}</p>
                    <p><strong>Incorrect:</strong> {score.incorrect}</p>
                    <p className="score-percentage">
                        <strong>Score:</strong> {score.percentage}%
                    </p>
                </div>
                <div className="quiz-actions">
                    <button
                        onClick={() => {
                            setCurrentIndex(0);
                            setIsFlipped(false);
                            setResults([]);
                            setQuizComplete(false);
                        }}
                        data-testid="retake-btn"
                    >
                        Retake Quiz
                    </button>
                    <button onClick={onExit} data-testid="back-to-deck-btn">
                        Back to Deck
                    </button>
                </div>
            </div>
        );
    }

    // Quiz In Progress
    return (
        <div data-testid="quiz-view" className="quiz-view">
            <div className="quiz-header">
                <h2>Quiz Mode</h2>
                <p data-testid="quiz-progress">
                    Card {currentIndex + 1} of {totalCards}
                </p>
            </div>

            <div
                className={`quiz-card ${isFlipped ? 'flipped' : ''}`}
                onClick={handleFlip}
                data-testid="quiz-card"
            >
                {isFlipped ? (
                    <div className="card-back">
                        <span className="card-label">Answer</span>
                        <p>{currentCard.answer}</p>
                    </div>
                ) : (
                    <div className="card-front">
                        <span className="card-label">Question</span>
                        <p>{currentCard.question}</p>
                    </div>
                )}
            </div>

            {!isFlipped && (
                <p className="flip-hint">Click the card to reveal the answer</p>
            )}

            {isFlipped && (
                <div className="grade-buttons" data-testid="grade-buttons">
                    <button
                        onClick={() => handleGrade(true)}
                        className="btn-correct"
                        data-testid="got-it-btn"
                    >
                        Got it ✓
                    </button>
                    <button
                        onClick={() => handleGrade(false)}
                        className="btn-incorrect"
                        data-testid="missed-it-btn"
                    >
                        Missed it ✗
                    </button>
                </div>
            )}

            <button onClick={onExit} className="btn-exit" data-testid="exit-quiz-btn">
                Exit Quiz
            </button>
        </div>
    );
}

export default Quiz;